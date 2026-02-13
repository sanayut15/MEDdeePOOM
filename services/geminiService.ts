
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getHealthAdvice(userPrompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {
          systemInstruction: "You are 'MEDdee Assistant', a professional health consultant for MEDdee POOM. Provide helpful, polite, and encouraging health advice in the language the user speaks (Thai or English). Always include a disclaimer that users should consult a real doctor for serious medical conditions.",
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับผู้ช่วยอัจฉริยะ โปรดลองอีกครั้งภายหลัง";
    }
  }
}

export const geminiService = new GeminiService();
