"use client";
import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import {  Calendar, MapPin, Award, User } from "lucide-react";
import { Doctor } from "@prisma/client";

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
              </div>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {doctor.bio}
            </p>

      
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
