import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const tool = await prisma.aITool.findUnique({ where: { id } });
    return NextResponse.json(tool);
  } catch (error) {
    console.error("Error fetching AI tool:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const data = await req.json();
    const tool = await prisma.aITool.update({ where: { id }, data });
    return NextResponse.json(tool);
  } catch (error) {
    console.error("Error updating AI tool:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.aITool.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting AI tool:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
