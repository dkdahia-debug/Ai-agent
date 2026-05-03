import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAo6oSA4p-dTHP25KZvZgZTvOxMlflwPrk";

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMsg }] }]
      })
    }
  );

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("AI Server Running ✅");
});

app.listen(3000, () => console.log("Server running"));
