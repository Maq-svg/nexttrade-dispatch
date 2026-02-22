import { GoogleGenAI } from "@google/genai";

export const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const VEO_MODEL = "veo-3.1-fast-generate-preview";
