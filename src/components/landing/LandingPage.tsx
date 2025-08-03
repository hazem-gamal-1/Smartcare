import React from "react";
import HeroSection from "./HeroSection";
import MedicalSpecialtiesSection from "./MedicalSpecialtiesSection";
import AIToolsSection from "./AIToolsSection";
import TrustSection from "./TrustSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <HeroSection></HeroSection>

      {/* Medical Specialties Section */}
      <MedicalSpecialtiesSection></MedicalSpecialtiesSection>

      {/* AI Tools Section */}
      <AIToolsSection></AIToolsSection>

      {/* Trust Section */}
      <TrustSection></TrustSection>
    </div>
  );
}
