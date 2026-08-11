let dotenv;
try {
    dotenv = require("dotenv");
} catch (err) {
    dotenv = null;
}

if (dotenv) {
    dotenv.config();
}

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message, history = [] } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Gemini API key is not configured"
            });
        }

        const contents = [
            ...history,
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