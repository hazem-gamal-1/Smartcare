import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface SlotInput {
  date: string;
  time: string;
}

export async function GET(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  const prisma = new PrismaClient(); // direct client
  try {
    const doctorId = params.doctorId;
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get("date"); // optional filter by day

    const where = {
      doctorId,
      isBooked: false,
      ...(dateFilter
        ? {
            date: {
              gte: new Date(new Date(dateFilter).setHours(0, 0, 0, 0)),
              lte: new Date(new Date(dateFilter).setHours(23, 59, 59, 999)),
            },
          }
        : {}),
    };

    const slots = await prisma.availability.findMany({
      where,
      orderBy: { date: "asc", time: "asc" },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  const prisma = new PrismaClient(); // direct client
  try {
    const body = await req.json();
    const { slots } = body as { slots: SlotInput[] };

    const created = await prisma.availability.createMany({
      data: slots.map((slot) => ({
        doctorId: params.doctorId,
        date: new Date(slot.date),
        time: slot.time,
        isBooked: false,
      })),
      // skipDuplicates: true, // Removed due to Prisma schema constraints
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating availability:", error);
    return NextResponse.json(
      { error: "Failed to create availability" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
