import express from "express";
import fetch from "node-fetch"; // ako koristiš OpenAI ili neki API

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Ovde ide tvoj API zahtev
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
