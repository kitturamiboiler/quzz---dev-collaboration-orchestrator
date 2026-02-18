
import React, { useState } from 'react';
import { Step, TeamData, RecommendedRole, ProjectBlueprint, TechnicalBlueprint } from './types';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { CreateTeam } from './pages/CreateTeam';
import { RoleRecommendation } from './pages/RoleRecommendation';
import { TemplateSelection } from './pages/TemplateSelection';
import { Dashboard } from './pages/Dashboard';
import { getTechnicalBlueprint } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.LANDING);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [roles, setRoles] = useState<RecommendedRole[]>([]);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getStepNumber = () => {
    switch (currentStep) {
      case Step.LANDING: return 0;
      case Step.CREATE_TEAM: return 1;
      case Step.ROLE_RECO: return 2;
      case Step.TEMPLATE: return 3;
      case Step.DASHBOARD: return 4;
      default: return 0;
    }
  };

  const handleStart = () => setCurrentStep(Step.CREATE_TEAM);
  
  const handleTeamCreated = (data: TeamData) => {
    setTeamData(data);
    setCurrentStep(Step.ROLE_RECO);
  };

  const handleRolesConfirmed = (confirmedRoles: RecommendedRole[]) => {
    setRoles(confirmedRoles);
    setCurrentStep(Step.TEMPLATE);
  };

  const handleTemplateSelected = async (template: { structure: string; conventions: string[] }) => {
    if (teamData) {
      setIsGenerating(true);
      try {
        const techSpec = await getTechnicalBlueprint(teamData);
        setBlueprint({
          team: teamData,
          roles: roles,
          template: template,
          techSpec: techSpec
        });
        setCurrentStep(Step.DASHBOARD);
      } catch (err) {
        console.error(err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const renderPage = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-900">기술 설계를 생성 중입니다...</h2>
          <p className="text-slate-500">Backend, Frontend, Database 코드를 작성하고 있습니다.</p>
        </div>
      );
    }

    switch (currentStep) {
      case Step.LANDING:
        return <Landing onStart={handleStart} />;
      case Step.CREATE_TEAM:
        return <CreateTeam onSubmit={handleTeamCreated} />;
      case Step.ROLE_RECO:
        return <RoleRecommendation teamData={teamData!} onNext={handleRolesConfirmed} />;
      case Step.TEMPLATE:
        return <TemplateSelection onNext={handleTemplateSelected} />;
      case Step.DASHBOARD:
        return <Dashboard blueprint={blueprint!} />;
      default:
        return <Landing onStart={handleStart} />;
    }
  };

  return (
    <Layout step={getStepNumber()}>
      {renderPage()}
    </Layout>
  );
};

export default App;
