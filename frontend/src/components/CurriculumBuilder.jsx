import React, { useState } from "react";
import axios from "axios";

const CurriculumBuilder = () => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [curriculum, setCurriculum] = useState("");

  const handleGenerate = async () => {
    if (!goal) return alert("Please enter a career goal!");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/curriculum/generate", {
        goal,
      });

      setCurriculum(res.data.curriculum);
    } catch (error) {
      console.error("Error fetching curriculum:", error);
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧠 Auto Curriculum Synthesizer</h2>
      <input
        type="text"
        placeholder="e.g. Full-stack Web Developer"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        {loading ? "Generating..." : "Generate Curriculum"}
      </button>

      {curriculum && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded-md text-sm font-mono">
          {curriculum}
        </div>
      )}
    </div>
  );
};

export default CurriculumBuilder;
