import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface DrugAdvisorResponse {
  summary: string;
  interactions: string[];
  alternativeMedications: string[];
  correctDosage: string[];
  usageInstructions: string[];
  sideEffects: string[];
  monitoringAdvice: string[];
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      medications,
      age,
      sex,
      weight,
      height,
      conditions,
      allergies,
      previousReactions,
      liverFunction,
      kidneyFunction,
      pregnancyStatus,
      smoking,
      alcohol,
      exercise,
    } = body;

    if (!medications || !age || !sex) {
      return NextResponse.json(
        { error: "Missing required fields: medications, age, or sex" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an AI medical assistant. Analyze the following patient data and their medications. Provide **detailed advice**. Respond ONLY in JSON format.

Patient data:
- Medications: ${medications}
- Age: ${age}
- Sex: ${sex}
- Weight: ${weight || "not provided"} kg
- Height: ${height || "not provided"} cm
- Conditions: ${conditions || "none"}
- Allergies: ${allergies || "none"}
- Previous Adverse Reactions: ${previousReactions || "none"}
- Liver function: ${liverFunction || "normal"}
- Kidney function: ${kidneyFunction || "normal"}
- Pregnancy/Breastfeeding: ${pregnancyStatus || "not pregnant"}
- Smoking: ${smoking || "no"}
- Alcohol: ${alcohol || "no"}
- Exercise: ${exercise || "light"}

Return a JSON object with the following keys:
{
  "summary": "Brief overview of safety, interactions, and general advice",
  "interactions": ["List any drug-drug or drug-condition interactions"],
  "alternativeMedications": ["Safer or alternative medications if applicable"],
  "correctDosage": ["Recommended doses for each medication"],
  "usageInstructions": ["How and when to take each medication"],
  "sideEffects": ["Common or serious side effects to watch"],
  "monitoringAdvice": ["Recommended follow-ups, lab checks, or monitoring"]
}
`;

    const result = await model.generateContent(prompt);
    const raw: string = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    let data: DrugAdvisorResponse;
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
    console.error("Drug Advisor API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
