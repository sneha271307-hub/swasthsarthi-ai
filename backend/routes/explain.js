require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { scheme, language = "en" } = req.body;

if (!["en", "hi"].includes(language)) {
  return res.status(400).json({
    success: false,
    message: "Language must be 'en' or 'hi'",
  });
}

    if (!scheme) {
      return res.status(400).json({
        success: false,
        message: "Scheme information is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",

      contents: `Explain the following government scheme in very simple language for a normal user.
      Write the explanation in ${language === "hi" ? "Hindi" : "English"}.

Scheme:
${JSON.stringify(scheme)}

Include:
1. What the scheme is
2. Who can benefit
3. Main benefits
4. Important documents
5. Basic application steps

Do not invent information. Use only the information provided in the scheme data.`,

      config: {
        responseMimeType: "text/plain",
      },
    });

    res.json({
      success: true,
      explanation: response.text,
    });
  } catch (error) {
    console.error("Scheme explanation failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Scheme explanation failed",
    });
  }
});

module.exports = router;