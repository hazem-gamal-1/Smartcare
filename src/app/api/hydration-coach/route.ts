import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface HydrationCoachResponse {
  hydrationScore: number;
  status: string;
  dailyGoal: string;
  currentIntake: string;
  summary: string;
  todayPlan: string[];
  hydrationTips: string[];
  hydrationTimeline: {
    time: string;
    action: string;
    amount: number;
  }[];
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Act as a hydration coach.
    User data:
    ${JSON.stringify(form, null, 2)}

    Respond strictly in JSON format:
    {
      "hydrationScore": 0-100,
      "status": "short hydration status",
      "dailyGoal": "Recommended daily intake in ml",
      "currentIntake": "Today's current intake",
      "summary": "Short overview",
      "todayPlan": ["step 1", "step 2"],
      "hydrationTips": ["tip 1", "tip 2"],
      "hydrationTimeline": [
        { "time": "08:00", "action": "Drink water", "amount": 250 },
        { "time": "10:00", "action": "Have green tea", "amount": 200 }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const raw: string = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    let data: HydrationCoachResponse;
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
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
