import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { specialty: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.id) {
      return new NextResponse("Missing doctor id (Clerk userId)", {
        status: 400,
      });
    }

    // Upsert: update if exists, create if not
    const doctor = await prisma.doctor.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        title: data.title,
        specialtyId: data.specialtyId,
        location: data.location,
        imageUrl: data.imageUrl,
        bio: data.bio,
        education: data.education || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
      },
      create: {
        id: data.id, // Clerk userId
        name: data.name,
        title: data.title,
        specialtyId: data.specialtyId,
        location: data.location,
        imageUrl: data.imageUrl,
        bio: data.bio,
        education: data.education || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error creating/updating doctor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
