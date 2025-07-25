

# 🎯 SkillTuner – AI-Powered Micro-Curriculum Generator

SkillTuner is a full-stack application that leverages AI (OpenAI or Google Gemini) to help users generate tailored learning roadmaps based on their career goals. Enter your ambition, and SkillTuner returns a curated list of skills you should master—wrapped in a beautiful UI and powered by intelligent backend logic.

---

## 🚀 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Setup (React + Tailwind)](#frontend-setup-react--tailwind)
- [Backend Setup (Node + Express + AI API)](#backend-setup-node--express--ai-api)
- [Environment Variables](#environment-variables)
- [AI Integration](#ai-integration-openai--gemini)
- [Deployment Tips](#deployment-tips)
- [Known Issues](#known-issues)
- [Credits](#credits)

---

## 🧩 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- dotenv
- CORS
- Google Generative AI SDK (or OpenAI)

---

## 🗂 Project Structure

skilltuner/
├── backend/
│ ├── routes/
│ │ ├── skills.js
│ │ └── curriculum.js
│ ├── index.js
│ ├── .env
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── CurriculumBuilder.jsx
│ │ │ └── FancyCard.jsx
│ │ ├── App.jsx
│ │ └── index.css
│ ├── .env
│ └── package.json


---

## 🌐 Frontend Setup (React + Tailwind)

### 1. Navigate to the frontend directory:
```bash
cd frontend
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
🧙 Tailwind Setup Notes:
Make sure you have:

tailwind.config.js

postcss.config.js

"type": "module" in package.json

Also, ensure your index.css includes:

css
Copy
Edit
@tailwind base;
@tailwind components;
@tailwind utilities;
🛠️ Backend Setup (Node + Express + Gemini)
1. Navigate to backend:
cd backend
2. Install dependencies:
npm install
3. Create .env file:
PORT=5000
GOOGLE_API_KEY=your_gemini_api_key
MODEL_NAME=gemini-1.5-pro  # or any available Gemini model
If you're using OpenAI instead:

OPENAI_API_KEY=your_openai_api_key
MODEL_NAME=gpt-3.5-turbo  # or gpt-4 if accessible
4. Start the server:
npm run dev
The server will be available at: http://localhost:5000

🔌 Environment Variables
Variable	Description
PORT	Port for the backend server (default: 5000)
GOOGLE_API_KEY or OPENAI_API_KEY	API Key for Gemini or OpenAI
MODEL_NAME	Name of the model (e.g. gemini-pro, gpt-4)

🧠 AI Integration (OpenAI / Gemini)
You can easily switch between providers by updating the .env and logic in skills.js or curriculum.js.

Example Gemini Usage:
const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
const result = await model.generateContent([{ parts: [{ text: prompt }] }]);
Example OpenAI Usage:
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
const completion = await openai.createChatCompletion({ model, messages: [{ role: "user", content: prompt }] });
✨ Features You Can Add (Enhancements)
Feature	Description
✅ Fancy cards	Display skills as visually appealing cards instead of a plain list
✅ Loading spinner	Show a spinner while skills are being fetched
🔄 Retry logic	Automatically retry failed requests in case of 503
💾 Save Roadmap	Allow users to download or email their roadmap
📚 Curriculum builder	Expand skills into a structured course outline
🔍 Search history	Keep past searches with timestamps
🌙 Dark mode	Because developers love it
🌐 Multi-language support	For a broader audience
💡 Tooltips	Tiny explanations on hover for skills

☁️ Deployment Tips
Frontend: Host on Netlify, Vercel, or GitHub Pages

Backend: Deploy on Render, Railway, or your own VPS

Use environment-specific .env.production files

🐞 Known Issues
Issue	Fix
503 Service Unavailable from Gemini	Add retry logic or try again after a few minutes
Tailwind PostCSS error	Ensure correct versions and module syntax
gpt-4 model not found	Use gpt-3.5-turbo unless you have GPT-4 access

✨ Credits
👨‍💻 Created by Ram Shrivastava
