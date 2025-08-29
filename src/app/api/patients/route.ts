import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, name, email, phone, imageUrl } = data;

    if (!id || !name || !email)
      return new NextResponse("Missing required fields", { status: 400 });

    const patient = await prisma.patient.create({
      data: { id, name, email, phone, imageUrl },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
