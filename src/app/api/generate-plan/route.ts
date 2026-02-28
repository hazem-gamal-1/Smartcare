// app/api/generate-plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Meal {
  name: string;
  items: string[];
}

interface DayPlan {
  day: string;
  meals: Meal[];
  workout: string;
}

interface WeeklyPlan {
  week: DayPlan[];
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { weight, height, age, activity, goal } = await req.json();

    if (!weight || !height || !age || !activity || !goal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Create a 7-day structured weekly diet and fitness plan in strict JSON format based on:
    - Weight: ${weight}kg
    - Height: ${height}cm
    - Age: ${age}
    - Activity Level: ${activity}
    - Goal: ${goal}

    Respond ONLY with valid JSON:
    {
      "week": [
        {
          "day": "Day 1",
          "meals": [
            {"name": "Breakfast", "items": ["..."]},
            {"name": "Lunch", "items": ["..."]},
            {"name": "Dinner", "items": ["..."]},
            {"name": "Snacks", "items": ["..."]}
          ],
          "workout": "..."
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    let raw = result.response.text();

    // 🔹 Strip code fences if present
    raw = raw.replace(/```json|```/g, "").trim();

    let data: WeeklyPlan;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      console.log(error);
      console.error("AI response parsing error:", raw);
      return NextResponse.json(
        { error: "Invalid AI response", raw },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
