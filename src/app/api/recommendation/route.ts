// /api/recommendation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    // Fetch all doctors and AI tools from DB
    const doctors = await prisma.doctor.findMany();
    const tools = await prisma.aITool.findMany();

    // Convert objects to AI-readable strings
    const doctorList = doctors.map((d) => JSON.stringify(d)).join("\n");
    const toolList = tools.map((t) => JSON.stringify(t)).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant helping users find relevant doctors and AI tools based on their description.

User description: ${description}

Available doctors (all fields included):
${doctorList}

Available AI tools (all fields included):
${toolList}

Instructions:
- Recommend up to 5 doctors and 5 AI tools.
- Return JSON with full objects, not just IDs.
- Include a summary explaining your choices.
- Include actionable next steps.

Return JSON like this:
{
  "summary": "...",
  "nextSteps": ["...", "..."],
  "doctors": [{...}, {...}],
  "tools": [{...}, {...}]
}
`;

    const result = await model.generateContent(prompt);
    const raw: string = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    let data: {
      summary: string;
      nextSteps: string[];
      doctors: typeof doctors;
      tools: typeof tools;
    };
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
    console.error("AI Recommendation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
