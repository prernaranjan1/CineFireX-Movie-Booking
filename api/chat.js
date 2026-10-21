let dotenv;
try {
    dotenv = require("dotenv");
} catch (err) {
    dotenv = null;
}

if (dotenv) {
    dotenv.config();
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 10;
const MAX_HISTORY_TEXT_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

// Simple per-IP limiter. On serverless hosts each instance keeps its own
// counts, so this is best effort; it still stops one client hammering an instance.
const requestLog = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const recent = (requestLog.get(ip) || []).filter(
        (time) => now - time < RATE_LIMIT_WINDOW_MS
    );

    recent.push(now);
    requestLog.set(ip, recent);

    // Drop idle entries so the map doesn't grow forever
    if (requestLog.size > 1000) {
        for (const [key, times] of requestLog) {
            if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
                requestLog.delete(key);
            }
        }
    }

    return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req) {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
        return String(forwarded).split(",")[0].trim();
    }
    return req.socket?.remoteAddress || "unknown";
}

// Keep only well-formed user/model text turns from the client's history,
// so callers can't send huge payloads or arbitrary request fields.
function cleanHistory(history) {
    if (!Array.isArray(history)) {
        return [];
    }

    return history
        .filter((turn) =>
            turn &&
            (turn.role === "user" || turn.role === "model") &&
            Array.isArray(turn.parts) &&
            typeof turn.parts[0]?.text === "string"
        )
        .slice(-MAX_HISTORY_TURNS)
        .map((turn) => ({
            role: turn.role,
            parts: [
                {
                    text: turn.parts[0].text.slice(0, MAX_HISTORY_TEXT_LENGTH)
                }
            ]
        }));
}

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        if (isRateLimited(getClientIp(req))) {
            return res.status(429).json({
                error: "Too many messages. Please wait a minute and try again."
            });
        }

        const { message, history } = req.body || {};

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less`
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Gemini API key is not configured"
            });
        }

        const contents = [
            ...cleanHistory(history),
            {
                role: "user",
                parts: [
                    {
                        text: message
                    }
                ]
            }
        ];

            const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [
                            {
                                text: `
You are CineFireX Assistant, an AI assistant for the CineFireX movie booking website.

Your job is to help users with:
- Movie recommendations
- Movie genres
- Movie searching
- Movie booking
- Seat selection
- Show times
- Snacks
- Booking instructions
- Navigation around CineFireX

Keep responses short, clear and helpful.

CineFireX currently has these seat categories:
- Platinum: ₹250
- Gold: ₹200
- Silver: ₹150

Available show times are:
- 10:00 AM
- 1:00 PM
- 4:00 PM
- 7:00 PM
- 10:00 PM

Available snacks include:
- Popcorn: ₹120
- Cold Drink: ₹40
- Combo Pack: ₹150
- Nachos: ₹80
- Candy Mix: ₹50
- Hot Dog: ₹100

Never invent movie availability, seats, show times or booking information.

If you do not know something about CineFireX, say so.

If the user asks something unrelated to movies or CineFireX,
politely tell them that you are the CineFireX Assistant and can
help with movie booking and related questions.

Do not claim that you have completed a booking.
The user must complete the booking through the CineFireX website.
`
                            }
                        ]
                    },
                    contents
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);

            return res.status(response.status).json({
                error: "Gemini API request failed"
            });
        }

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        return res.status(200).json({
            reply
        });

    } catch (error) {
        console.error("Chat error:", error);

        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}