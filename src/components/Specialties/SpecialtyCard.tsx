import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface SpecialtyCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonText?: string;
  doctorCount?: number;
}

export default function SpecialtyCard({
  title,
  description,
  imageUrl,
  icon,
  onClick,
  buttonText = "Find Specialists",
  doctorCount,
}: SpecialtyCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer rounded-2xl bg-card h-[360px]"
      onClick={onClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

      {/* Floating elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-primary/20 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 shadow-lg">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>

          {doctorCount && (
            <div className="text-right">
              <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg px-3 py-2 group-hover:bg-white/25 transition-all duration-300">
                <p className="text-white text-lg font-bold leading-none">
                  {doctorCount}
                </p>
                <p className="text-white/90 text-xs">doctors</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-white font-[Plus_Jakarta_Sans] font-bold text-xl leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            size="sm"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 py-2.5 rounded-lg font-medium group-hover:shadow-lg transform group-hover:scale-[1.02]"
            variant="outline"
          >
            {buttonText}
            <svg
              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
    </Card>
  );
}
