"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import {
  Calendar,
  Clock,
  FileText,
  Activity,
  Bell,
  Settings,
  MessageSquare,
  Video,
  Phone,
  Download,
  Eye,
  Plus,
  TrendingUp,
  Heart,
  Thermometer,
} from "lucide-react";



export default function PatientDashboard() {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
      },
      date: "2025-08-05",
      time: "10:30 AM",
      type: "Video",
      status: "confirmed",
      reason: "Follow-up consultation",
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Dermatology",
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
      },
      date: "2025-08-08",
      time: "2:00 PM",
      type: "Chat",
      status: "confirmed",
      reason: "Skin condition check",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: {
        name: "Dr. Emily Rodriguez",
        specialty: "General Medicine",
        image:
          "https://images.unsplash.com/photo-1594824475280-bbd5093c5ba7?w=100&h=100&fit=crop",
      },
      date: "2025-07-25",
      time: "11:00 AM",
      type: "Video",
      status: "completed",
      reason: "Annual checkup",
      notes: "Everything looks good. Continue current medication.",
    },
  ];

  const aiToolHistory = [
    {
      id: 1,
      tool: "Skin Health Analyzer",
      date: "2025-08-01",
      result: "Mild dermatitis detected",
      confidence: 78,
      status: "completed",
    },
    {
      id: 2,
      tool: "Symptom Checker",
      date: "2025-07-28",
      result: "Suggest consultation for headaches",
      confidence: 85,
      status: "completed",
    },
  ];

  const healthMetrics = [
    {
      name: "Heart Rate",
      value: "72 bpm",
      trend: "stable",
      icon: <Heart className="h-5 w-5" />,
      color: "text-red-500",
    },
    {
      name: "Blood Pressure",
      value: "120/80",
      trend: "good",
      icon: <Activity className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      name: "Temperature",
      value: "98.6°F",
      trend: "normal",
      icon: <Thermometer className="h-5 w-5" />,
      color: "text-green-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Chat":
        return <MessageSquare className="h-4 w-4" />;
      case "Phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
             
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold font-[Plus_Jakarta_Sans]">
                  Welcome back, !
                </h1>
                <p className="text-muted-foreground">
                  Manage your health journey
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => {}}
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

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => {}}
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

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Health Records</h3>
              <p className="text-sm text-muted-foreground">View your history</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Health Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Track your progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="appointments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="ai-history">AI Tools</TabsTrigger>
                <TabsTrigger value="records">Records</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Upcoming Appointments</span>
                      <Button size="sm" onClick={() => {}}>
                        <Plus className="h-4 w-4 mr-2" />
                        Book New
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">

                    {/* Show demo appointments */}
                    {upcomingAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="border-l-4 border-l-primary"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.doctor.image} />
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
                                  {appointment.doctor.specialty}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.reason}
                                </p>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {appointment.date}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {appointment.time}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(appointment.type)}
                                <Badge
                                  className={getStatusColor(appointment.status)}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button size="sm">Join Call</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="border-l-4 border-l-muted"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.doctor.image} />
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
                                  {appointment.doctor.specialty}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.reason}
                                </p>
                                {appointment.notes && (
                                  <p className="text-sm text-primary mt-1">
                                    Notes: {appointment.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {appointment.date}
                                </span>
                              </div>
                              <Badge
                                className={getStatusColor(appointment.status)}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Tools History Tab */}
              <TabsContent value="ai-history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>AI Tools History</span>
                      <Button size="sm" onClick={() => {}}>
                        <Plus className="h-4 w-4 mr-2" />
                        Use AI Tools
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiToolHistory.map((item) => (
                      <Card
                        key={item.id}
                        className="border-l-4 border-l-secondary"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{item.tool}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.result}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.date}
                              </p>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">
                                  Confidence: {item.confidence}%
                                </span>
                              </div>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Records Tab */}
              <TabsContent value="records" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      No health records available yet. Records will appear here
                      after your appointments.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Metrics Tab */}
              <TabsContent value="metrics" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {healthMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-3 ${metric.color} bg-opacity-10`}
                        >
                          {metric.icon}
                        </div>
                        <h3 className="font-semibold">{metric.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-2">
                          {metric.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {metric.trend}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Health Score</span>
                    <span className="font-bold text-primary">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full w-4/5 bg-primary rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Last checkup:</span>
                    <span>July 25, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next appointment:</span>
                    <span>Aug 5, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Check Symptoms
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Doctor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
