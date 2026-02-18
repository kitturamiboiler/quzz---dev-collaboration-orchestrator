import React, { useEffect, useState } from 'react';
import { TeamData, RecommendedRole } from '../types';
import { getRoleRecommendations } from '../services/geminiService';

interface RoleRecommendationProps {
  teamData: TeamData;
  onNext: (roles: RecommendedRole[]) => void;
}

export const RoleRecommendation: React.FC<RoleRecommendationProps> = ({ teamData, onNext }) => {
  const [roles, setRoles] = useState<RecommendedRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      const data = await getRoleRecommendations(teamData);
      setRoles(data);
      setLoading(false);
    };
    fetchRoles();
  }, [teamData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900">AI is analyzing team structure...</h2>
        <p className="text-slate-500">Selecting the optimal roles for your project.</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-fadeIn">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900">AI-Recommended Roles</h2>
        <p className="text-slate-500">Recommended team composition based on project scope and tech stack.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {roles.map((role, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col hover:border-indigo-200 transition-all">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">{role.title}</h3>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Responsibilities</h4>
              <ul className="space-y-1">
                {role.responsibilities.map((res, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start">
                    <span className="text-indigo-400 mr-2">•</span> {res}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1">
                {role.requiredSkills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onNext(roles)}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg"
        >
          Confirm these Roles
        </button>
      </div>
    </div>
  );
};