"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import SpecialtyCard from "../Specialties/SpecialtyCard";
import {
  Heart,
  Brain,
  Eye,
  Stethoscope,
  Baby,
  Bone,
  Wind,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

import { Specialty } from "@prisma/client";

import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import Loader from "../ui/Loader";
const iconMap: Record<string, React.ReactNode> = {
  Cardiology: <Heart className="h-5 w-5" />,
  Neurology: <Brain className="h-5 w-5" />,
  Ophthalmology: <Eye className="h-5 w-5" />,
  "General Medicine": <Stethoscope className="h-5 w-5" />,
  Pediatrics: <Baby className="h-5 w-5" />,
  Orthopedics: <Bone className="h-5 w-5" />,
  Pulmonology: <Wind className="h-5 w-5" />,
  Dermatology: <Users className="h-5 w-5" />,
};

const MedicalSpecialtiesSection = () => {
  const { handleNavigation } = useHandleNavigation();

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // <- loading state

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch("/api/specialties");
        const data = await res.json();
        setSpecialties(data);
      } catch (error) {
        console.error("Failed to load specialties:", error);
      } finally {
        setLoading(false); // <- stop loading
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) {
    return <Loader />;
  }
  
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
        {
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {specialties.slice(0, 4).map((specialty) => (
              <SpecialtyCard
                key={specialty.id}
                title={specialty.title}
                description={specialty.description}
                imageUrl={specialty.imageUrl}
                icon={iconMap[specialty.title]}
                doctorCount={specialty.doctorCount}
                onClick={() => {
                  handleNavigation("/specialties");
                }}
              />
            ))}
          </div>
        }

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
