"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Separator } from "../ui/Separator";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Languages,
  Video,
  MessageSquare,
  Stethoscope,
  Users,
  Heart,
  Shield,
  CheckCircle,
  ThumbsUp,
  ChevronRight,
} from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  image?: string;
  specialty: string;
  location: string;
  reviews: number;
  bio: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  languages: string[];
  consultationTypes: {
    type: "Video Call" | "In-Person" | "Phone Call";
    duration: string;
    price: string;
  }[];
  availableSlots: string[];
  stats: {
    totalPatients: number;
    yearsExperience: number;
    successRate: number;
    avgRating: number;
  };
}

const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  title: "Senior Cardiologist",
  specialty: "Cardiology",
  rating: 4.9,
  reviewCount: 127,
  reviews: 127,
  experience: "15+ years",
  location: "New York, NY",
  imageUrl:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
  image:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
  bio: "Specialized in interventional cardiology and heart disease prevention with extensive experience in complex cardiac procedures.",
  verified: true,
  availableToday: true,
  nextAvailable: "Today 2:00 PM",
};

export default function DoctorProfile() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Sample data for demonstration
  const doctorDetails = {
    ...doctor,
    bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in interventional cardiology and heart failure management. She specializes in complex cardiac procedures and preventive cardiology.",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2008" },
      {
        degree: "Residency",
        institution: "Johns Hopkins Hospital",
        year: "2012",
      },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2014" },
    ],
    certifications: [
      "Board Certified in Cardiology",
      "Board Certified in Internal Medicine",
      "Fellow of American College of Cardiology",
    ],
    languages: ["English", "Spanish", "French"],
    consultationTypes: [
      { type: "Video Call", duration: "30 min", price: "$150" },
      { type: "In-Person", duration: "45 min", price: "$200" },
      { type: "Phone Call", duration: "20 min", price: "$100" },
    ],
    availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "4:30 PM"],
    stats: {
      totalPatients: 2500,
      yearsExperience: 15,
      successRate: 98,
      avgRating: 4.9,
    },
  };

  const reviews = [
    {
      id: 1,
      patient: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Dr. Johnson was incredibly thorough and compassionate. She explained my condition clearly and provided excellent care.",
      verified: true,
    },
    {
      id: 2,
      patient: "Michael R.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Outstanding cardiologist! Very knowledgeable and made me feel comfortable throughout the entire process.",
      verified: true,
    },
    {
      id: 3,
      patient: "Emily D.",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great doctor with excellent bedside manner. Highly recommend for any cardiac concerns.",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => {}}
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
                    <AvatarImage src={doctorDetails.image} />
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                      {doctorDetails.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold font-[Plus_Jakarta_Sans]">
                          {doctorDetails.name}
                        </h1>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-lg text-primary font-medium">
                        {doctorDetails.specialty}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {doctorDetails.location}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {doctorDetails.stats.avgRating}
                          </span>
                          <span className="text-sm ml-1">
                            ({doctorDetails.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {doctorDetails.stats.yearsExperience}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Years Exp.
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {doctorDetails.stats.totalPatients}+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Patients
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {doctorDetails.stats.successRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Success Rate
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {doctorDetails.stats.avgRating}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                      About Dr. {doctorDetails.name?.split(" ")[1]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {doctorDetails.bio}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-primary" />
                          Certifications
                        </h4>
                        <ul className="space-y-2">
                          {doctorDetails.certifications.map((cert, index) => (
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
                          {doctorDetails.languages.map((lang, index) => (
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
                      {doctorDetails.education.map((edu, index) => (
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
                            <p className="text-sm text-muted-foreground">
                              Graduated {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 mr-2 text-primary" />
                        Patient Reviews
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">
                          {doctorDetails.stats.avgRating}
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {review.patient[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">
                                    {review.patient}
                                  </span>
                                  {review.verified && (
                                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-3 w-3 ${
                                          star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground pl-13">
                            {review.comment}
                          </p>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Available Time Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {doctorDetails.availableSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={
                              selectedTimeSlot === slot ? "default" : "outline"
                            }
                            className="justify-center"
                            onClick={() => setSelectedTimeSlot(slot)}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {slot}
                          </Button>
                        ))}
                      </div>

                      {selectedTimeSlot && (
                        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-muted-foreground mb-3">
                            Selected:{" "}
                            <span className="font-medium text-foreground">
                              {selectedTimeSlot}
                            </span>
                          </p>
                          <Button className="w-full" onClick={() => {}}>
                            Book This Appointment
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}
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
                  {doctorDetails.consultationTypes.map((type, index) => (
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
                <div className="space-y-3">
                  <Button className="w-full" onClick={() => {}}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>

                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
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
