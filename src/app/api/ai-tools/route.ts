import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tools = await prisma.aITool.findMany({
      orderBy: { title: "asc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("Error fetching AI tools:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const tool = await prisma.aITool.create({ data });
    return NextResponse.json(tool);
  } catch (error) {
    console.error("Error creating AI tool:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
