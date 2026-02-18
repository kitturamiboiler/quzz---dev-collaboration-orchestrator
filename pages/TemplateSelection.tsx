import React, { useState } from 'react';

interface TemplateSelectionProps {
  onNext: (template: { structure: string; conventions: string[] }) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onNext }) => {
  const [selectedStructure, setSelectedStructure] = useState('atomic');
  const [conventions, setConventions] = useState<string[]>(['eslint', 'prettier']);

  const structures = [
    {
      id: 'atomic',
      name: 'Atomic Design',
      desc: 'Component-driven hierarchical structure',
      color: 'bg-blue-500'
    },
    {
      id: 'feature',
      name: 'Feature-based',
      desc: 'Structure with folders isolated by feature units',
      color: 'bg-green-500'
    },
    {
      id: 'standard',
      name: 'Standard MVC',
      desc: 'Traditional layered architecture',
      color: 'bg-purple-500'
    }
  ];

  const convs = [
    {
      id: 'eslint',
      name: 'ESLint / Prettier',
      desc: 'Code formatting and syntax linting'
    },
    {
      id: 'gitflow',
      name: 'Git-Flow Strategy',
      desc: 'Branch management strategy (Main, Develop, Feature)'
    },
    {
      id: 'commit',
      name: 'Conventional Commits',
      desc: 'Semantic commit message rules'
    }
  ];

  const toggleConv = (id: string) => {
    if (conventions.includes(id)) setConventions(conventions.filter(c => c !== id));
    else setConventions([...conventions, id]);
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fadeIn">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Templates & Conventions</h2>
        <p className="text-slate-500">Define the folder structure and development rules that will serve as your project's backbone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {structures.map(s => (
          <div
            key={s.id}
            onClick={() => setSelectedStructure(s.id)}
            className={`cursor-pointer p-6 rounded-3xl border-2 transition-all ${selectedStructure === s.id ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-slate-100 bg-white hover:border-indigo-200'
              }`}
          >
            <div className={`w-10 h-10 rounded-xl mb-4 ${s.color}`}></div>
            <h3 className="font-bold text-slate-900 mb-1">{s.name}</h3>
            <p className="text-sm text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Additional Convention Settings</h3>
        <div className="space-y-4">
          {convs.map(c => (
            <div
              key={c.id}
              onClick={() => toggleConv(c.id)}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div>
                <h4 className="font-bold text-slate-800">{c.name}</h4>
                <p className="text-sm text-slate-500">{c.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${conventions.includes(c.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200'
                }`}>
                {conventions.includes(c.id) && <span className="text-white text-xs">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onNext({ structure: selectedStructure, conventions: conventions })}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg"
        >
          Review Final Summary
        </button>
      </div>
    </div>
  );
};