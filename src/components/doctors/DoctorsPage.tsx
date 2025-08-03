"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Heart,
  Brain,
  Eye,
  Stethoscope,
  Baby,
  Bone,
  Wind,
  Users,
  ArrowLeft,
} from "lucide-react";

import DoctorCard from "./DoctorCard";

export default function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );

  const specialties = [
    {
      title: "Cardiology",
      description:
        "Heart and cardiovascular system specialists providing comprehensive cardiac care",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=500&fit=crop",
      icon: <Heart className="h-5 w-5" />,
      doctorCount: 24,
      id: "cardiology",
    },
    {
      title: "Neurology",
      description:
        "Brain and nervous system experts specializing in neurological disorders",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=500&fit=crop",
      icon: <Brain className="h-5 w-5" />,
      doctorCount: 18,
      id: "neurology",
    },
    {
      title: "Ophthalmology",
      description:
        "Eye care and vision specialists offering comprehensive examinations",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=500&fit=crop",
      icon: <Eye className="h-5 w-5" />,
      doctorCount: 12,
      id: "ophthalmology",
    },
    {
      title: "General Medicine",
      description:
        "Primary care physicians providing comprehensive health management",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=500&fit=crop",
      icon: <Stethoscope className="h-5 w-5" />,
      doctorCount: 36,
      id: "general",
    },
    {
      title: "Pediatrics",
      description:
        "Child healthcare specialists focusing on infant and adolescent care",
      imageUrl:
        "https://images.unsplash.com/photo-1666214280577-909daa15876c?w=600&h=500&fit=crop",
      icon: <Baby className="h-5 w-5" />,
      doctorCount: 20,
      id: "pediatrics",
    },
    {
      title: "Orthopedics",
      description:
        "Bone and joint specialists treating musculoskeletal conditions",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=500&fit=crop",
      icon: <Bone className="h-5 w-5" />,
      doctorCount: 15,
      id: "orthopedics",
    },
    {
      title: "Pulmonology",
      description:
        "Respiratory system specialists treating lung and breathing disorders",
      imageUrl:
        "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&h=500&fit=crop",
      icon: <Wind className="h-5 w-5" />,
      doctorCount: 14,
      id: "pulmonology",
    },
    {
      title: "Dermatology",
      description:
        "Skin, hair, and nail specialists providing comprehensive dermatological care",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=500&fit=crop",
      icon: <Users className="h-5 w-5" />,
      doctorCount: 18,
      id: "dermatology",
    },
  ];

  const sampleDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Cardiologist",
      specialty: "Cardiology",
      rating: 4.9,
      reviewCount: 127,
      reviews: 127,
      experience: "15+ years",
      location: "New York, NY",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      bio: "Specialized in interventional cardiology and heart disease prevention with extensive experience in complex cardiac procedures.",
      verified: true,
      availableToday: true,
      nextAvailable: "Today 2:00 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Interventional Cardiologist",
      specialty: "Cardiology",
      rating: 4.8,
      reviewCount: 94,
      reviews: 94,
      experience: "12+ years",
      location: "Los Angeles, CA",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      bio: "Expert in cardiac catheterization and coronary interventions, pioneering minimally invasive cardiac procedures.",
      verified: true,
      availableToday: false,
      nextAvailable: "Tomorrow 10:30 AM",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Pediatric Cardiologist",
      specialty: "Cardiology",
      rating: 4.9,
      reviewCount: 156,
      reviews: 156,
      experience: "18+ years",
      location: "Chicago, IL",
      imageUrl:
        "https://images.unsplash.com/photo-1594824475280-bbd5093c5ba7?w=300&h=300&fit=crop",
      image:
        "https://images.unsplash.com/photo-1594824475280-bbd5093c5ba7?w=300&h=300&fit=crop",
      bio: "Specializes in congenital heart defects and pediatric heart surgery with a focus on family-centered care.",
      verified: true,
      availableToday: true,
      nextAvailable: "Today 4:30 PM",
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      title: "Cardiac Surgeon",
      specialty: "Cardiology",
      rating: 4.7,
      reviewCount: 89,
      reviews: 89,
      experience: "20+ years",
      location: "Boston, MA",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
      bio: "Leading cardiac surgeon specializing in complex heart surgeries and heart transplantation procedures.",
      verified: true,
      availableToday: false,
      nextAvailable: "Monday 9:00 AM",
    },
  ];

  if (true) {
    const specialty = specialties.find((s) => s.id === selectedSpecialty);

    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedSpecialty(null)}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Specialties
          </Button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-[Plus_Jakarta_Sans] mb-4">
              {specialty?.title} Specialists
            </h1>
            <p className="text-lg text-muted-foreground">
              {specialty?.doctorCount} board-certified doctors available in{" "}
              {specialty?.title.toLowerCase()}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Available Today
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Highest Rated
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Most Experience
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Nearest Location
            </Badge>
          </div>

          {/* Doctor List */}
          <div className="space-y-6">
            {sampleDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
