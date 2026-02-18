import { GoogleGenAI, Type } from "@google/genai";
import { TeamData, RecommendedRole, TechnicalBlueprint } from "../types";

export const getRoleRecommendations = async (teamData: TeamData): Promise<RecommendedRole[]> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  // 프롬프트 업그레이드: 초보자 수준에서 전문가 수준의 역할 분담으로 변경
  const prompt = `As an expert Project Architect, suggest 3 to 5 specialized roles for the following project:
    Project Name: ${teamData.name}
    Goal: ${teamData.goal}
    Tech Stack: ${teamData.techStack.join(", ")}
    Description: ${teamData.description}

    Requirements:
    1. Analyze the Tech Stack and suggest roles specifically tailored to it (e.g., "Game Engine Developer" for C++, "AI/Data Engineer" for Python, "Unity Programmer" for C#).
    2. For each role, provide:
       - Title: Professional and clear.
       - Responsibilities: 3-4 specific technical tasks.
       - Required Skills: 3-4 skills directly from the chosen Tech Stack.
    3. Ensure the roles are balanced for a collaborative team environment.
    
    All responses must be in English.`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash", // 최신 모델 권장
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            responsibilities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            requiredSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "responsibilities", "requiredSkills"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as RecommendedRole[];
  } catch (error) {
    console.error("Failed to parse roles:", error);
    return [];
  }
};

export const getTechnicalBlueprint = async (teamData: TeamData): Promise<TechnicalBlueprint> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  // 프롬프트 업그레이드: Spring Boot/React 고정이 아닌, 선택한 언어에 맞는 구조 생성
  const prompt = `Generate a professional technical scaffold for the following project:
    Name: ${teamData.name}
    Goal: ${teamData.goal}
    Selected Tech Stack: ${teamData.techStack.join(", ")}

    Instructions:
    1. Identify the primary languages from the Tech Stack.
    2. If C++/C# is selected for Games, provide a Game Engine/Scripting structure.
    3. If Python is selected for AI/Web, provide a Django/FastAPI/Data Science structure.
    4. If Web technologies are selected, provide the appropriate Framework structure.
    
    Provide:
    1. Backend: A core logic file, an entity/model file, and a controller/service file in the chosen language.
    2. Frontend: A main UI component/page and a utility/API helper in the chosen language/framework.
    3. Database: A detailed DDL (SQL) script for the primary database.

    All responses must be in English. Output as JSON matching the TechnicalBlueprint interface.`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          backend: {
            type: Type.OBJECT,
            properties: {
              directory: { type: Type.STRING },
              files: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    path: { type: Type.STRING },
                    content: { type: Type.STRING }
                  }
                }
              }
            }
          },
          frontend: {
            type: Type.OBJECT,
            properties: {
              directory: { type: Type.STRING },
              files: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    path: { type: Type.STRING },
                    content: { type: Type.STRING }
                  }
                }
              }
            }
          },
          database: {
            type: Type.OBJECT,
            properties: {
              schema: { type: Type.STRING }
            }
          }
        },
        required: ["backend", "frontend", "database"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as TechnicalBlueprint;
  } catch (error) {
    throw new Error("Failed to generate technical blueprint");
  }
};