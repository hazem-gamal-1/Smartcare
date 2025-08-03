"use client";
import React, { useState } from "react";
import SpecialtyCard from "../ui/SpecialtyCard";
import {
  Heart,
  Brain,
  Eye,
  Stethoscope,
  Baby,
  Bone,
  Wind,
  Users,
} from "lucide-react";

const SpecialtiesPage = () => {
  const [, setSelectedSpecialty] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Find Your Perfect
            <span className="block text-primary">Healthcare Provider</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse by medical specialty to find the right doctor for your needs.
            All our doctors are board-certified professionals with verified
            credentials and excellent patient reviews.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">
              Certified Doctors
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">
              Support Available
            </div>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <SpecialtyCard
              key={specialty.id}
              title={specialty.title}
              description={specialty.description}
              imageUrl={specialty.imageUrl}
              icon={specialty.icon}
              doctorCount={specialty.doctorCount}
              buttonText="View Doctors"
              onClick={() => setSelectedSpecialty(specialty.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
