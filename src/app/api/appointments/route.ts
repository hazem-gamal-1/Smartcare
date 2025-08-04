import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        doctor: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const appointment = await prisma.appointment.create({
      data,
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
