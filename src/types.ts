
export enum Step {
  LANDING = 'LANDING',
  CREATE_TEAM = 'CREATE_TEAM',
  ROLE_RECO = 'ROLE_RECO',
  TEMPLATE = 'TEMPLATE',
  DASHBOARD = 'DASHBOARD'
}

export interface TeamData {
  name: string;
  goal: string;
  techStack: string[];
  description: string;
}

export interface RecommendedRole {
  title: string;
  responsibilities: string[];
  requiredSkills: string[];
}

export interface TechnicalBlueprint {
  backend: {
    directory: string;
    files: Array<{ name: string; path: string; content: string }>;
  };
  frontend: {
    directory: string;
    files: Array<{ name: string; path: string; content: string }>;
  };
  database: {
    schema: string;
  };
}

export interface ProjectBlueprint {
  team: TeamData;
  roles: RecommendedRole[];
  template: {
    structure: string;
    conventions: string[];
  };
  techSpec: TechnicalBlueprint;
}
