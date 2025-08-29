"use client";
import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Calendar, MapPin, User } from "lucide-react";
import { Doctor } from "@prisma/client";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { useParams } from "next/navigation";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const { handleNavigation } = useHandleNavigation();
  const params = useParams();
  const specialtyId = params.specialtyid?.toString();

  return (
    <Card className="group hover:shadow-lg transition-transform transition-shadow duration-300 hover:-translate-y-1 cursor-pointer  shadow-lg">
      <CardContent className="p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-64 h-48 lg:h-auto bg-gradient-to-br from-primary/10 to-secondary/10">
            <ImageWithFallback
              src={doctor.imageUrl || "/images/fallback.svg"}
              alt={doctor.name}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Info Section */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xl lg:text-2xl font-bold font-[Plus_Jakarta_Sans] group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <p className="text-primary font-medium">{doctor.title}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{doctor.location}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {doctor.bio}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 group-hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  handleNavigation(`/specialties/${specialtyId}/${doctor.id}`)
                }
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button
                variant="outline"
                className="flex-1 group-hover:border-primary group-hover:text-primary transition-all duration-300"
                onClick={() =>
                  handleNavigation(
                    `/specialties/${specialtyId}/${doctor.id}/booking`
                  )
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(
  DoctorCard,
  (prev, next) => prev.doctor.id === next.doctor.id
);
