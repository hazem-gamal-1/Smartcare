"use client";
import React, { useState, useEffect } from "react";
import { Specialty } from "@prisma/client";
import SpecialtyCard from "./SpecialtyCard";
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
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";
import ComponentLoader from "../ui/ComponentLoader";

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
const SpecialtiesPage = () => {
  const router = useRouter();
  const [, setSelectedSpecialty] = useState<string | null>(null);
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
        {loading ? (
          <ComponentLoader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <SpecialtyCard
                key={specialty.id}
                title={specialty.title}
                description={specialty.description}
                imageUrl={specialty.imageUrl}
                icon={iconMap[specialty.title]}
                doctorCount={specialty.doctorCount}
                buttonText="View Doctors"
                onClick={() => {
                  setSelectedSpecialty(specialty.id);
                  router.push("/specialties/doctors");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesPage;
