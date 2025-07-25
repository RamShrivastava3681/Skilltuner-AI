const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  const { goal } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or "gemini-1.0-pro" / use available models
    });

    const prompt = `Create a 5-10 hour micro-course for someone who wants to become a ${goal}. Break it down into lessons with the following format:
    
    1. Title
    2. Type (video, article, exercise)
    3. Link (if possible)
    4. Estimated Time

    Format it in a readable JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ curriculum: text });
  } catch (error) {
    console.error("Error generating curriculum:", error);
    res.status(500).json({ error: "Failed to generate curriculum" });
  }
});

module.exports = router;
