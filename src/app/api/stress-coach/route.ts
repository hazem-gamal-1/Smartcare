import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface StressCoachResponse {
  status: string;
  summary: string;
  recommendation: string;
  exercise: {
    type: string;
    duration: string;
    steps: string[];
  };
  lifestyleTips: string[];
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const {
      stressLevel,
      emotions,
      symptoms,
      sleepHours,
      caffeineIntake,
      activityLevel,
      timeOfDay,
    } = await req.json();

    if (!stressLevel || !sleepHours || !activityLevel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Act as a compassionate AI stress coach.
    User data:
    - Stress level: ${stressLevel}/10
    - Emotions: ${emotions || "not specified"}
    - Symptoms: ${symptoms || "not specified"}
    - Sleep hours: ${sleepHours}
    - Caffeine intake: ${caffeineIntake || "not specified"}
    - Activity level: ${activityLevel}
    - Time of day: ${timeOfDay || "not specified"}

    Respond strictly in JSON format:
    {
      "status": "stressed | calm | moderate",
      "summary": "Short overview of current state",
      "recommendation": "Personalized stress advice",
      "exercise": {
        "type": "breathing | meditation | journaling | stretching",
        "duration": "e.g. 5 minutes",
        "steps": ["step 1", "step 2", "step 3"]
      },
      "lifestyleTips": ["tip 1", "tip 2", "tip 3"]
    }
    `;

    const result = await model.generateContent(prompt);
    const raw: string = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    let data: StressCoachResponse;
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
