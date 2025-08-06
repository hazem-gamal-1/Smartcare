import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const specialty = await prisma.specialty.findUnique({
      where: { id },
      include: {
        doctors: true,
      },
    });

    if (!specialty) {
      return new NextResponse("Specialty not found", { status: 404 });
    }

    return NextResponse.json(specialty);
  } catch (error) {
    console.error("Error fetching specialty with doctors:", error);
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
    const specialty = await prisma.specialty.update({ where: { id }, data });
    return NextResponse.json(specialty);
  } catch (error) {
    console.error("Error updating specialty:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.specialty.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting specialty:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
