"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Plus, Calendar, Clock, Activity } from "lucide-react";
import { Appointment, Doctor, Specialty } from "@prisma/client";
import Loader from "../ui/Loader";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
interface DoctorWithspecialty extends Doctor {
  specialty: Specialty;
}
interface AppointmentWithDoctor extends Appointment {
  doctor: DoctorWithspecialty;
}

export default function DashboardPage() {
  const { handleNavigation } = useHandleNavigation();
  const [upcomingAppointments, setData] = useState<AppointmentWithDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT: Appointments Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    <Button
                      size="sm"
                      onClick={() => handleNavigation("/specialties")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Book New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          {/* Doctor Info */}
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.doctor.imageUrl} />
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
          </Tabs>
        </div>

        {/* RIGHT: Quick Actions */}
        <div className="space-y-6">
          {/* Book Appointment Card */}
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

          {/* AI Tools Card */}
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

          {/* Health Message Card */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mx-auto mb-3">
                ❤️
              </div>
              <h3 className="font-semibold">Your health is our priority</h3>
              <p className="text-sm text-muted-foreground">
                Stay on track with regular checkups and AI insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
