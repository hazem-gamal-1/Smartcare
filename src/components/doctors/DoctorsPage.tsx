"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import Loader from "../ui/Loader";

export default function DoctorsPage() {
  const { handleNavigation } = useHandleNavigation();
  const params = useParams();
  const specialtyId = params.specialtyid?.toString();

  const [specialty, setSpecialty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!specialtyId) return;

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/specialties/${specialtyId}`);
        const data = await res.json();
        setSpecialty(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialtyId]);

  if (loading) {
    return <Loader />;
  }

  if (!specialty) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-destructive">Specialty not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-muted"
          onClick={() => handleNavigation("/specialties")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Specialties
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-[Plus_Jakarta_Sans] mb-4">
            {specialty?.title} Specialists
          </h1>
        </div>

        {/* Doctor List */}
        {specialty?.doctors?.length > 0 ? (
          <div className="space-y-6">
            {specialty.doctors.map((doctor: any) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p>No doctors available for this specialty.</p>
        )}
      </div>
    </div>
  );
}
