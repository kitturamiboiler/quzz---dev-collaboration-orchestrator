import React, { useState } from 'react';
import { TeamData } from '../types';

interface CreateTeamProps {
  onSubmit: (data: TeamData) => void;
}

export const CreateTeam: React.FC<CreateTeamProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [currentTech, setCurrentTech] = useState('');

  const availableTech = [
    "React", "Next.js", "TypeScript", "JavaScript",
    "Java", "Spring Boot", "JPA",
    "Python", "Django", "FastAPI", "PyTorch",
    "C", "C++", "C#", "Unity", "Unreal Engine",
    "Go", "Rust", "Swift", "Kotlin", "Flutter",
    "MySQL", "PostgreSQL", "MongoDB", "Redis",
    "Docker", "Kubernetes", "AWS", "GCP", "Azure",
    "Tailwind CSS", "ESLint"
  ];

  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter(t => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && goal && techStack.length > 0) {
      onSubmit({ name, goal, description, techStack });
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full animate-fadeIn">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Project Details</h2>
        <p className="text-slate-500">Provide the core project information to start the AI analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Team / Project Name</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g., Quzz Orchestrator"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Project Goal</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g., Building an MSA-based backend for a commerce platform"
            value={goal}
            onChange={e => setGoal(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Description</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32"
            placeholder="What features are you implementing? Describe the background of your project."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Tech Stack</label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 border border-slate-50 rounded-2xl bg-slate-50/30 no-scrollbar">
            {availableTech.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${techStack.includes(tech)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg"
        >
          Get AI Role Recommendations
        </button>
      </form>
    </div>
  );
};