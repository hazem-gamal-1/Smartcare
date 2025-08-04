import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specialties = await prisma.specialty.findMany({
      orderBy: { title: "asc" },
    });

    return NextResponse.json(specialties);
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
