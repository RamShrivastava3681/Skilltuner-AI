import { useState } from 'react';
import axios from 'axios';
import CurriculumBuilder from "./components/CurriculumBuilder";

function App() {
  const [goal, setGoal] = useState('');
  const [skills, setSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/skills/generate', { goal });
      setSkills(res.data.skills);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while generating the roadmap!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-indigo-800">🎯 SkillTuner</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-4 flex-wrap justify-center">
        <input
          className="p-3 w-80 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="e.g., I want to become a UX designer"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Generate Roadmap
        </button>
      </form>

      {skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {skills.map((skill, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">🔹 {skill}</h3>
            </div>
          ))}
        </div>
      )}
      {skills.map((skill, idx) => (
  <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        {getIcon(skill.type)} {skill.name}
      </h3>
      <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
        {skill.estimated_time}
      </span>
    </div>
    <p className="text-gray-700">{skill.description}</p>
    {skill.resources && skill.resources.length > 0 && (
      <div className="mt-2">
        <h4 className="font-medium text-indigo-600 mb-1">📚 Resources:</h4>
        <ul className="list-disc list-inside text-blue-600">
          {skill.resources.map((res, rIdx) => (
            <li key={rIdx}>
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {res.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
))}


      {/* Curriculum Builder Section */}
      <div className="w-full max-w-4xl mt-12">
        <CurriculumBuilder />
      </div>
    </div>
  );
}
function getIcon(type) {
  switch (type) {
    case 'reading': return '📖';
    case 'video': return '🎥';
    case 'practice': return '🧪';
    case 'project': return '🚀';
    case 'quiz': return '🧠';
    default: return '🛠';
  }
}


export default App;
