import express from "express";
import fetch from "node-fetch"; // Ako koristiš Node 18+, možeš koristiti global fetch

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint za frontend
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) return res.json({ error: "Poruka prazna" });

  try {
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
  } catch (err) {
    console.error("Greška API-ja:", err);
    res.status(500).json({ error: "Došlo je do greške na serveru" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
