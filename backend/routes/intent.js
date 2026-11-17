require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (typeof query !== "string" || !query.trim()) {
  return res.status(400).json({
    success: false,
    message: "A valid query is required",
  });
} {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",

      contents: `Identify the user's intent from this query.

Return ONLY valid JSON in this format:
{
  "intent": "string",
  "keywords": ["string"]
}

User query:
${query}`,

      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    res.json({
      success: true,
      data: result,
    });
  }catch (error) {
    console.error("FULL GEMINI ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Intent detection failed",
      error: error.message,
    });
  }
});

module.exports = router;