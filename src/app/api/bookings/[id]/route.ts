import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
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
    const booking = await prisma.booking.update({
      where: { id },
      data,
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
