const CHATBOT = {

    history: [],

    init() {
        this.createChatbot();
        this.bindEvents();
    },

    createChatbot() {

        const chatbotHTML = `

            <button id="chatbot-button">
                🤖
            </button>

            <div id="chatbot">

                <div class="chatbot-header">

                    <div>
                        <div class="chatbot-title">
                            🎬 CineFireX Assistant
                        </div>

                        <div class="chatbot-status">
                            AI Movie Assistant
                        </div>
                    </div>

                    <button id="chatbot-close">
                        ×
                    </button>

                </div>


                <div id="chatbot-messages">

                    <div class="chat-message bot">

                        <div class="message-content">
                            👋 Hi! I'm the CineFireX Assistant.
                            <br><br>
                            I can help you with movies, booking,
                            seats, show times and snacks.
                        </div>

                    </div>

                </div>


                <div class="chatbot-quick-buttons">

                    <button class="quick-btn"
                        data-message="How do I book a movie ticket?">
                        🎟️ Booking
                    </button>

                    <button class="quick-btn"
                        data-message="Tell me about seat prices">
                        💺 Seats
                    </button>

                    <button class="quick-btn"
                        data-message="What snacks are available?">
                        🍿 Snacks
                    </button>

                    <button class="quick-btn"
                        data-message="Recommend me a movie">
                        🎬 Recommend
                    </button>

                </div>


                <div class="chatbot-input-area">

                    <input
                        type="text"
                        id="chatbot-input"
                        placeholder="Ask about movies..."
                    />

                    <button id="chatbot-send">
                        ➤
                    </button>

                </div>

            </div>
        `;

        document.body.insertAdjacentHTML(
            "beforeend",
            chatbotHTML
        );
    },


    bindEvents() {

        const button =
            document.getElementById("chatbot-button");

        const close =
            document.getElementById("chatbot-close");

        const send =
            document.getElementById("chatbot-send");

        const input =
            document.getElementById("chatbot-input");


        button.addEventListener("click", () => {

            document.getElementById("chatbot")
                .style.display = "flex";

            input.focus();
        });


        close.addEventListener("click", () => {

            document.getElementById("chatbot")
                .style.display = "none";
        });


        send.addEventListener("click", () => {

            this.sendMessage();
        });


        input.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                this.sendMessage();
            }
        });


        document
            .querySelectorAll(".quick-btn")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const message =
                        button.dataset.message;

                    this.sendMessage(message);
                });
            });
    },


    async sendMessage(customMessage = null) {

        const input =
            document.getElementById("chatbot-input");

        const message =
            customMessage || input.value.trim();

        if (!message) {
            return;
        }


        this.addMessage(
            message,
            "user"
        );


        input.value = "";


        const typingId =
            this.showTyping();


        try {

            const response =
                await fetch("/api/chat", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        message: message,

                        history: this.history

                    })
                });


            const data =
                await response.json();


            this.removeTyping(typingId);


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Something went wrong"
                );
            }


            const reply =
                data.reply;


            this.addMessage(
                reply,
                "bot"
            );


            this.history.push({

                role: "user",

                parts: [
                    {
                        text: message
                    }
                ]

            });


            this.history.push({

                role: "model",

                parts: [
                    {
                        text: reply
                    }
                ]

            });


        } catch (error) {

            console.error(error);

            this.removeTyping(typingId);

            this.addMessage(
                "Sorry, I'm having trouble connecting to the AI right now.",
                "bot"
            );
        }
    },


    addMessage(message, type) {

        const container =
            document.getElementById(
                "chatbot-messages"
            );


        const messageDiv =
            document.createElement("div");


        messageDiv.className =
            `chat-message ${type}`;


        const content =
            document.createElement("div");


        content.className =
            "message-content";


        content.textContent =
            message;


        messageDiv.appendChild(content);


        container.appendChild(
            messageDiv
        );


        container.scrollTop =
            container.scrollHeight;
    },


    showTyping() {

        const container =
            document.getElementById(
                "chatbot-messages"
            );


        const id =
            "typing-" + Date.now();


        const div =
            document.createElement("div");


        div.id = id;

        div.className =
            "chat-message bot";


        div.innerHTML = `
            <div class="message-content typing">
                CineFireX AI is typing...
            </div>
        `;


        container.appendChild(div);


        container.scrollTop =
            container.scrollHeight;


        return id;
    },


    removeTyping(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.remove();
        }
    }
};


document.addEventListener(
    "DOMContentLoaded",
    () => CHATBOT.init()
);