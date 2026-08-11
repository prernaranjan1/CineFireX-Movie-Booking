const express = require("express");
const path = require("path");
const chatHandler = require("./api/chat");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/chat", chatHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`CineFireX local server running at http://localhost:${port}`);
});
