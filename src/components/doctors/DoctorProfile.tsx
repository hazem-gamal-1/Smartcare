"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Separator } from "../ui/Separator";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Languages,
  Video,
  Stethoscope,
  Users,
  Heart,
  Shield,
  CheckCircle,
} from "lucide-react";
import Loader from "../ui/Loader";
import { useParams } from "next/navigation";

import { Specialty, Doctor } from "@prisma/client";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
type Education = { degree: string; institution: string; year: string };
interface DoctorWithSpecialty extends Doctor {
  specialty: Specialty;
  languages: string[];
  certifications: string[];
  education: Education[];
}

export default function DoctorProfile() {
  const { handleNavigation } = useHandleNavigation();
  const params = useParams();
  const id = params.doctorid as string;
  const specialtyId = params.specialtyid as string;
  const [doctor, setDoctor] = useState<DoctorWithSpecialty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch(`/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (error) {
        console.error("Failed to load specialties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }
  if (doctor === null) {
    return <div>No Doctors availalble in this specialty</div>;
  }
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => {
            handleNavigation(`/specialties/${[specialtyId]}`);
          }}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Header */}
            <Card className="overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-primary to-secondary">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-16"></div>
              </div>
              <CardContent className="relative -mt-16 pt-16">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarImage src={doctor.imageUrl} />
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                      {doctor.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold font-[Plus_Jakarta_Sans]">
                          {doctor.name}
                        </h1>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-lg text-primary font-medium">
                        {doctor.title}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{doctor.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                      About Dr. {doctor.name?.split(" ")[1]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {doctor.bio}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-primary" />
                          Certifications
                        </h4>
                        <ul className="space-y-2">
                          {doctor.certifications?.map((cert, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Languages className="h-4 w-4 mr-2 text-primary" />
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages?.map((lang, index) => (
                            <Badge key={index} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                      Education & Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg"
                        >
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-muted-foreground">
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="space-y-6">
            {/* Quick Booking Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">Book Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Consultation Types */}
                <div className="space-y-3">
                  {[
                    { type: "Video Call", duration: "30 min", price: "$150" },
                    { type: "In-Person", duration: "45 min", price: "$200" },
                    { type: "Phone Call", duration: "20 min", price: "$100" },
                  ].map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {type.type === "Video Call" && (
                          <Video className="h-5 w-5 text-primary" />
                        )}
                        {type.type === "Phone Call" && (
                          <Phone className="h-5 w-5 text-primary" />
                        )}
                        {type.type === "In-Person" && (
                          <Users className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">{type.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {type.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{type.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Contact Options */}
                <div className="space-y-3 h-25">
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleNavigation(
                        `/specialties/${[specialtyId]}/${id}/booking`
                      );
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Board Certified</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
