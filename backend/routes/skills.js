const express = require('express');
const router = express.Router();
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route: POST /api/skills/generate
router.post('/generate', async (req, res) => {
  try {
    const { goal } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            { text: `Generate a list of essential micro-skills needed to achieve the goal: ${goal}. Respond with a list only.` }
          ]
        }
      ]
    });

    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";
    const skills = responseText.split('\n').filter(line => line.trim() !== '');

    res.json({ skills });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate skills from Gemini.' });
  }
});

module.exports = router;
