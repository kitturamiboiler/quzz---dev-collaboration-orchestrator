import React, { useState } from 'react';
import { ProjectBlueprint } from '../types';

interface DashboardProps {
  blueprint: ProjectBlueprint;
}

const CodeBlock: React.FC<{ code: string; title: string; filename?: string }> = ({ code, title, filename }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg mb-6">
      <div className="bg-slate-800 px-5 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400">{title}</span>
          {filename && <span className="text-xs text-indigo-400 font-mono">{filename}</span>}
        </div>
        <button onClick={copy} className="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center">
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-indigo-100 leading-relaxed scrollbar-hide">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ blueprint }) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'backend' | 'frontend' | 'database'>('roles');

  const tabs = [
    { id: 'roles', label: 'Roles & Team', icon: '👥' },
    { id: 'backend', label: 'Backend (Spring Boot)', icon: '☕' },
    { id: 'frontend', label: 'Frontend (React)', icon: '⚛️' },
    { id: 'database', label: 'Database (MySQL)', icon: '🗄️' },
  ] as const;

  return (
    <div className="w-full animate-fadeIn pb-20">
      <div className="mb-10 text-center">
        <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">Architected by AI</div>
        <h2 className="text-4xl font-bold text-slate-900 mb-2">{blueprint.team.name} Blueprint</h2>
        <p className="text-slate-500">Detailed implementation guides and folder structures for each part are ready.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Project Info</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-indigo-200 uppercase block">Tech Stack</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {blueprint.team.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-indigo-500/50 rounded text-[10px] font-medium border border-indigo-400/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-200 uppercase block">Structure</span>
                <p className="text-sm font-semibold">{blueprint.template.structure.toUpperCase()}</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Development Rules</h3>
            <ul className="space-y-3">
              {blueprint.template.conventions.map(c => (
                <li key={c} className="flex items-center text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'roles' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                <span className="mr-3">👥</span> Detailed Role Descriptions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blueprint.roles.map((role, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-indigo-600 text-lg mb-3">{role.title}</h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Responsibilities</span>
                        <ul className="text-sm text-slate-600 space-y-1.5">
                          {role.responsibilities.map((r, i) => <li key={i} className="flex items-start">
                            <span className="text-indigo-400 mr-2">/</span> {r}
                          </li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Required Skills</span>
                        <div className="flex flex-wrap gap-1">
                          {role.requiredSkills.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-xs border border-slate-100">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Java Spring Boot Structure</h3>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-mono">{blueprint.techSpec.backend.directory}</span>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8">
                <h4 className="text-sm font-bold text-slate-700 mb-4">📁 Folder Architecture</h4>
                <div className="font-mono text-xs text-slate-600 leading-relaxed whitespace-pre">
                  {`src/main/java/com/project/
├── controller/
│   └── ${blueprint.techSpec.backend.files.find(f => f.name.includes('Controller'))?.name}
├── service/
│   └── ${blueprint.techSpec.backend.files.find(f => f.name.includes('Service'))?.name}
├── repository/
│   └── ${blueprint.techSpec.backend.files.find(f => f.name.includes('Repository'))?.name || 'ItemRepository.java'}
└── entity/
    └── ${blueprint.techSpec.backend.files.find(f => f.name.includes('Entity'))?.name || 'Item.java'}`}
                </div>
              </div>

              {blueprint.techSpec.backend.files.map((file, i) => (
                <CodeBlock key={i} title="Spring Boot File" filename={file.path} code={file.content} />
              ))}
            </div>
          )}

          {activeTab === 'frontend' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-900">React + Tailwind Structure</h3>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-mono">{blueprint.techSpec.frontend.directory}</span>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8">
                <h4 className="text-sm font-bold text-slate-700 mb-4">📁 Folder Architecture</h4>
                <div className="font-mono text-xs text-slate-600 leading-relaxed whitespace-pre">
                  {`src/
├── components/
│   └── common/
├── pages/
│   └── ${blueprint.techSpec.frontend.files.find(f => f.name.includes('Page'))?.name || 'MainPage.tsx'}
├── services/
│   └── api.ts
└── types/
    └── index.ts`}
                </div>
              </div>

              {blueprint.techSpec.frontend.files.map((file, i) => (
                <CodeBlock key={i} title="React Component" filename={file.path} code={file.content} />
              ))}
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-slate-900">MySQL Schema Design</h3>
              <p className="text-slate-500">Initial database design to support the project's core business logic.</p>

              <CodeBlock title="SQL Definition Language (DDL)" filename="schema.sql" code={blueprint.techSpec.database.schema} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                  <h4 className="font-bold text-blue-800 mb-2">DB Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
                    <li>Include createdAt and updatedAt in all tables</li>
                    <li>Follow Snake Case naming conventions</li>
                    <li>Configure Foreign Keys for index optimization</li>
                  </ul>
                </div>
                <div className="p-6 bg-purple-50 border border-purple-100 rounded-2xl">
                  <h4 className="font-bold text-purple-800 mb-2">Recommended Tools</h4>
                  <p className="text-sm text-purple-700">Use MySQL Workbench or DBeaver to visualize the schema.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};