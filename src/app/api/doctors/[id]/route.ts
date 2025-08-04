import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { specialty: true },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
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
    const doctor = await prisma.doctor.update({
      where: { id },
      data,
    });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.doctor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
