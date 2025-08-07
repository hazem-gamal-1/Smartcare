import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
      },
      include: {
        doctor: {
          include: {
            specialty: true, 
          },
        },
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
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { doctorId, date, time } = await req.json();

    if (!doctorId || !date || !time) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        userId,
        date: new Date(date),
        time,
      } as Prisma.AppointmentUncheckedCreateInput,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
