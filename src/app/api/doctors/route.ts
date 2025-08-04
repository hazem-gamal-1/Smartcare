import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { specialty: true }, // Optional: eager-load related specialty
      orderBy: { name: "asc" },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const doctor = await prisma.doctor.create({ data });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
