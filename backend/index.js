const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Firebase Init
const { db } = require('./firebase/firebaseInit');

const app = express();
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('🔥 SkillTuner API is running!');
});

// Test Firestore Route
app.post('/api/test-firestore', async (req, res) => {
  try {
    const { message } = req.body;

    const docRef = await db.collection('test').add({
      message,
      createdAt: new Date()
    });

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    res.status(500).json({ error: 'Could not write to Firestore' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

app.use('/api/skills', require('./routes/skills'));
const curriculumRoutes = require("./routes/curriculum");
app.use("/api/curriculum", curriculumRoutes);
