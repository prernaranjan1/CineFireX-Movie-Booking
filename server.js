const express = require("express");
const path = require("path");
const chatHandler = require("./api/chat");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50kb" }));

// Serve only the site's own files, not server code or config
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

const pages = ["index", "booking", "snacks", "payment", "ticket"];
pages.forEach((page) => {
  app.get(`/${page}.html`, (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

app.post("/api/chat", chatHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`CineFireX local server running at http://localhost:${port}`);
});
