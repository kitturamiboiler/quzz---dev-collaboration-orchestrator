import React from 'react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
        Collaborate Smarter, <br />
        Start with <span className="text-indigo-600">Quzz</span>
      </h1>
      <p className="text-xl text-slate-600 mb-12 max-w-2xl">
        Preparing for a bootcamp team project? <br />
        Automate team creation, AI-driven role recommendations, and project structuring in just a few clicks.
      </p>
      <button
        onClick={onStart}
        className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-indigo-200"
      >
        Get Started
      </button>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          {
            title: "AI Role Recommendations",
            desc: "AI suggests optimal roles based on your tech stack and project goals.",
            icon: "🤖"
          },
          {
            title: "Standard Templates",
            desc: "Stop worrying about conventions. We provide structures based on best practices.",
            icon: "📂"
          },
          {
            title: "Streamlined Workflow",
            desc: "Optimized guides for Spring Boot and React development environments.",
            icon: "🚀"
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 transition-colors text-left">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};