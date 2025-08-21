"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Plus, Calendar, Clock, Activity } from "lucide-react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import Loader from "../ui/Loader";

// Extend types
interface DoctorWithSpecialty {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  specialty: { title: string };
}

interface PatientInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  imageUrl?: string;
}

interface AppointmentWithRelations {
  id: number;
  date: string;
  time: string;
  doctor?: DoctorWithSpecialty;
  Patient?: PatientInfo;
}

export default function DashboardPage() {
  const { handleNavigation } = useHandleNavigation();
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [allDoctors, setAllDoctors] = useState<DoctorWithSpecialty[]>([]);
  const [allPatients, setAllPatients] = useState<PatientInfo[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();

        const userRole = data?.role || "patient";
        setRole(userRole);

        setAppointments(data?.appointments || []);

        if (userRole === "patient" && data?.doctors) {
          setAllDoctors(data.doctors);
        }
        if (userRole === "doctor" && data?.patients) {
          setAllPatients(data.patients);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT: Tabs Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              {role === "patient" && (
                <TabsTrigger value="doctors">All Doctors</TabsTrigger>
              )}
              {role === "doctor" && (
                <TabsTrigger value="patients">All Patients</TabsTrigger>
              )}
            </TabsList>

            {/* ✅ Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    {role === "patient" && (
                      <Button
                        size="sm"
                        onClick={() => handleNavigation("/specialties")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Book New
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          {/* If patient: show doctor info */}
                          {role === "patient" && appointment.doctor && (
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={appointment.doctor.imageUrl}
                                />
                                <AvatarFallback>
                                  {appointment.doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">
                                  {appointment.doctor.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.doctor.specialty.title}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* If doctor: show patient info */}
                          {role === "doctor" && appointment.Patient && (
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={
                                    appointment.Patient.imageUrl || undefined
                                  }
                                />
                                <AvatarFallback>
                                  {appointment.Patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">
                                  {appointment.Patient.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.Patient.email}
                                </p>
                                {appointment.Patient.phone && (
                                  <p className="text-sm text-muted-foreground">
                                    {appointment.Patient.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Appointment Meta */}
                          <div className="text-right space-y-2">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ✅ Doctors Tab (for patients) */}
            {role === "patient" && (
              <TabsContent value="doctors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Doctors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {allDoctors.map((doctor) => (
                      <Card
                        key={doctor.id}
                        className="p-4 flex items-center space-x-4"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctor.imageUrl} />
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty?.title}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* ✅ Patients Tab (for doctors) */}
            {role === "doctor" && (
              <TabsContent value="patients" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Patients</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {allPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className="p-4 flex items-center space-x-4"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={undefined} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {patient.email}
                          </p>
                          {patient.phone && (
                            <p className="text-sm text-muted-foreground">
                              {patient.phone}
                            </p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* RIGHT: Quick Actions (only for patients) */}
        {role === "patient" && (
          <div className="space-y-6">
            {/* Book Appointment */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => {
                handleNavigation("/specialties");
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Book Appointment</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule with doctors
                </p>
              </CardContent>
            </Card>

            {/* AI Tools */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => {
                handleNavigation("/ai-tools");
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">AI Health Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant insights
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
