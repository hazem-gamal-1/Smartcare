"use client";
import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Star, Calendar, MapPin, CheckCircle, Award, User } from "lucide-react";

export interface Doctor {
  id: number;
  name: string;
  title: string; // e.g., "Dermatologist"
  imageUrl: string; // Profile image URL
  rating: number; // e.g., 4.8
  reviewCount: number; // e.g., 120
  experience: string; // e.g., "10 years"
  location: string; // e.g., "Cairo, Egypt"
  specialty: string; // e.g., "Cardiology"
  bio: string; // Short biography text
  nextAvailable: string; // e.g., "Tomorrow, 10:30 AM"
  availableToday: boolean; // Availability flag
  verified: boolean; // Verification badge flag
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <Card
    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg"
    onClick={() => {}}
  >
    <CardContent className="p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Doctor Image Section */}
        <div className="relative lg:w-64 h-48 lg:h-auto bg-gradient-to-br from-primary/10 to-secondary/10">
          <ImageWithFallback
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />

          {/* Overlay with status */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              {doctor.verified && (
                <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}

              {doctor.availableToday && (
                <Badge className="bg-green-500/20 backdrop-blur-sm border-green-400/30 text-green-100 hover:bg-green-500/30">
                  Available Today
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Info Section */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-bold font-[Plus_Jakarta_Sans] group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({doctor.reviewCount})
                  </span>
                </div>
              </div>

              <p className="text-primary font-medium">{doctor.title}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.location}</span>
                </div>
                <Badge variant="outline">{doctor.specialty}</Badge>
              </div>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {doctor.bio}
            </p>

            {/* Availability */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium">Next Available</p>
                <p className="text-sm text-muted-foreground">
                  {doctor.nextAvailable}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    doctor.availableToday ? "bg-green-500" : "bg-orange-500"
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {doctor.availableToday ? "Available Today" : "Next Available"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 group-hover:shadow-lg transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button
                variant="outline"
                className="flex-1 group-hover:border-primary group-hover:text-primary transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DoctorCard;
