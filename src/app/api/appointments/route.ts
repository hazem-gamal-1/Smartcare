import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, clerkClient } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role: "patient" | "doctor" =
      (user?.unsafeMetadata?.role as "patient" | "doctor") || "patient";

    let data;

    if (role === "doctor") {
      // ✅ Doctor should see their appointments + all patients
      const appointments = await prisma.appointment.findMany({
        where: { doctorId: userId },
        include: { Patient: true },
        orderBy: { date: "desc" },
      });

      const patients = await prisma.patient.findMany({
        orderBy: { name: "asc" },
      });

      data = { role, appointments, patients };
    } else {
      // ✅ Patient should see their appointments + all doctors
      const appointments = await prisma.appointment.findMany({
        where: { patientId: userId },
        include: { doctor: { include: { specialty: true } } },
        orderBy: { date: "desc" },
      });

      const doctors = await prisma.doctor.findMany({
        include: { specialty: true },
        orderBy: { name: "asc" },
      });

      data = { role, appointments, doctors };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role: "patient" | "doctor" =
      (user?.unsafeMetadata?.role as "patient" | "doctor") || "patient";

    if (role !== "patient") {
      return new NextResponse(
        "Forbidden: Only patients can create appointments",
        { status: 403 }
      );
    }

    const body = await req.json();
    const { doctorId, date, time } = body;

    if (!doctorId || !date || !time)
      return new NextResponse("Missing required fields", { status: 400 });

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return new NextResponse("Doctor not found", { status: 404 });

    const conflict = await prisma.appointment.findFirst({
      where: { doctorId, date: new Date(date), time },
    });
    if (conflict)
      return new NextResponse("Time slot already booked", { status: 409 });

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        userId,
        patientId: userId,
        date: new Date(date),
        time,
      },
      include: { doctor: { include: { specialty: true } } },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
