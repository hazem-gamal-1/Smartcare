"use client";
import React from "react";
import { Button } from "../ui/Button";
import SpecialtyCard from "../Specialties/SpecialtyCard";
import {
  Heart,
  Brain,
  Eye,
  Stethoscope,
  ChevronRight,
  Star,
} from "lucide-react";

import { useHandleNavigation } from "@/hooks/useHandleNavigation";
const MedicalSpecialtiesSection = () => {
  const { handleNavigation } = useHandleNavigation();
  const specialties = [
    {
      title: "Cardiology",
      description:
        "Heart and cardiovascular system specialists providing comprehensive cardiac care and advanced diagnostics",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=500&fit=crop",
      icon: <Heart className="h-8 w-8" />,
      doctorCount: 24,
    },
    {
      title: "Neurology",
      description:
        "Brain and nervous system experts specializing in neurological disorders and cognitive health",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=500&fit=crop",
      icon: <Brain className="h-8 w-8" />,
      doctorCount: 18,
    },
    {
      title: "Ophthalmology",
      description:
        "Eye care and vision specialists offering comprehensive eye examinations and treatments",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=500&fit=crop",
      icon: <Eye className="h-8 w-8" />,
      doctorCount: 12,
    },
    {
      title: "General Medicine",
      description:
        "Primary care physicians providing comprehensive health management and preventive care",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=500&fit=crop",
      icon: <Stethoscope className="h-8 w-8" />,
      doctorCount: 36,
    },
  ];
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Top-Rated Specialists
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Find Your Perfect
            <span className="block text-primary">Medical Specialist</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with board-certified doctors across various medical
            specialties. Book appointments instantly and get expert care when
            you need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {specialties.map((specialty, index) => (
            <SpecialtyCard
              key={index}
              title={specialty.title}
              description={specialty.description}
              imageUrl={specialty.imageUrl}
              icon={specialty.icon}
              doctorCount={specialty.doctorCount}
              onClick={() => {
                handleNavigation("/specialties");
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 rounded-xl border-2 hover:shadow-xl transition-all duration-300"
            onClick={() => {
              handleNavigation("/specialties");
            }}
          >
            View All Specialties
            <ChevronRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MedicalSpecialtiesSection;
