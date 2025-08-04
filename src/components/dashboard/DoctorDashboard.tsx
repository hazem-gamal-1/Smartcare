"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import {
  Calendar,
  Clock,
  Users,
  Bell,
  Settings,
  MessageSquare,
  Video,
  Phone,
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  Send,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react";


export default function DoctorDashboard() {

  const [messageText, setMessageText] = useState("");

  const todayAppointments = [
    {
      id: 1,
      patient: {
        name: "John Smith",
        age: 34,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      time: "09:00 AM",
      type: "Video",
      status: "upcoming",
      reason: "Follow-up consultation",
      duration: 30,
      notes: "Patient reported improvement in symptoms",
    },
    {
      id: 2,
      patient: {
        name: "Sarah Johnson",
        age: 28,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1db?w=100&h=100&fit=crop",
      },
      time: "10:30 AM",
      type: "Chat",
      status: "upcoming",
      reason: "Skin condition check",
      duration: 20,
      notes: "New patient - first consultation",
    },
    {
      id: 3,
      patient: {
        name: "Michael Brown",
        age: 45,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      time: "02:00 PM",
      type: "Video",
      status: "upcoming",
      reason: "Annual checkup",
      duration: 45,
      notes: "Regular checkup - no current concerns",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "John Smith",
      age: 34,
      lastVisit: "2025-07-30",
      condition: "Hypertension",
      status: "stable",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 28,
      lastVisit: "2025-07-28",
      condition: "Acne treatment",
      status: "improving",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1db?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 45,
      lastVisit: "2025-07-25",
      condition: "Routine checkup",
      status: "healthy",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  ];

  const messages = [
    {
      id: 1,
      patient: "John Smith",
      message:
        "Doctor, I wanted to update you on my blood pressure readings...",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      message: "Thank you for the prescription. The cream is working well.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      patient: "Michael Brown",
      message: "Can we reschedule tomorrow's appointment?",
      time: "1 day ago",
      unread: false,
    },
  ];

  const stats = [
    {
      title: "Today's Appointments",
      value: "8",
      change: "+2 from yesterday",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: "Total Patients",
      value: "247",
      change: "+12 this week",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: "Pending Reviews",
      value: "5",
      change: "3 urgent",
      icon: <FileText className="h-5 w-5" />,
      color: "text-orange-600",
    },
    {
      title: "Messages",
      value: "12",
      change: "7 unread",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-purple-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "stable":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "improving":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
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
                  Dr.
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold font-[Plus_Jakarta_Sans]">
                  Dr. 
                </h1>
                <p className="text-muted-foreground">
                   Specialist
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500 text-white">3</Badge>
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
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.color} opacity-60`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="appointments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appointments">Schedule</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Today&apos;s Schedule</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        August 2, 2025
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.patient.avatar} />
                                <AvatarFallback>
                                  {appointment.patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">
                                  {appointment.patient.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Age: {appointment.patient.age}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.reason}
                                </p>
                                {appointment.notes && (
                                  <p className="text-xs text-primary mt-1">
                                    {appointment.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {appointment.time}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(appointment.type)}
                                <span className="text-sm">
                                  {appointment.duration} min
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
                              <FileText className="h-4 w-4 mr-2" />
                              View Records
                            </Button>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Start Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Patients</span>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search patients..."
                            className="pl-9 w-64"
                          />
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={patient.avatar} />
                                <AvatarFallback>
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">
                                  {patient.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Age: {patient.age}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Last visit: {patient.lastVisit}
                                </p>
                                <p className="text-sm">{patient.condition}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge className={getStatusColor(patient.status)}>
                                {patient.status}
                              </Badge>
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {messages.map((message) => (
                      <Card
                        key={message.id}
                        className={`border-l-4 ${
                          message.unread
                            ? "border-l-primary bg-primary/5"
                            : "border-l-muted"
                        } hover:shadow-md transition-shadow cursor-pointer`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold">
                                  {message.patient}
                                </h4>
                                {message.unread && (
                                  <Badge className="bg-primary text-primary-foreground text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.time}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Quick Reply */}
                    <Card className="border-dashed">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold">Quick Reply</h4>
                          <Textarea
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            rows={3}
                          />
                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Template
                              </Button>
                            </div>
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      No pending reports at this time.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Patient Satisfaction</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="font-medium text-green-600">
                      &lt; 5 mins
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consultations This Week</span>
                    <span className="font-medium">42</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+15% from last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Urgent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Urgent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        High Priority
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-300">
                        Patient John Smith reported severe symptoms
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        Follow-up Required
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-300">
                        3 patients need test result reviews
                      </p>
                    </div>
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
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Block Time Slot
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Consultation Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
