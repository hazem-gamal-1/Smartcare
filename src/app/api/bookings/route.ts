import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const booking = await prisma.booking.create({ data });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
