import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface HeartRiskResponse {
  riskScore: number;
  riskCategory: string;
  summary: string;
  recommendations: string[];
  lifestylePlan: {
    diet: string;
    exercise: string;
    monitoring: string;
  };
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      age,
      gender,
      weight,
      height,
      smoker,
      systolic,
      cholesterol,
      familyHistory,
      exercise,
      diet,
    } = body;

    if (!age || !gender || !weight || !height) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are an AI medical assistant. Analyze this patient's data and assess heart health risk.
    Respond ONLY in JSON format, no extra text.

    Patient data:
    - Age: ${age}
    - Gender: ${gender}
    - Weight: ${weight} kg
    - Height: ${height} cm
    - Smoker: ${smoker}
    - Systolic BP: ${systolic || "not provided"}
    - Cholesterol: ${cholesterol || "not provided"}
    - Family History: ${familyHistory}
    - Exercise: ${exercise || "not provided"}
    - Diet: ${diet || "not provided"}

    JSON format:
    {
      "riskScore": number (0-100),
      "riskCategory": "Low | Moderate | High",
      "summary": "Short overview of risk factors",
      "recommendations": ["tip 1", "tip 2", "tip 3"],
      "lifestylePlan": {
        "diet": "Personalized diet advice",
        "exercise": "Personalized exercise plan",
        "monitoring": "Checkups, tests, or follow-up actions"
      }
    }
    `;

    const result = await model.generateContent(prompt);
    const raw: string = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    let data: HeartRiskResponse;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      console.error("AI response parsing error:", error);
      return NextResponse.json(
        { error: "Invalid AI response", raw },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Heart Risk API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
