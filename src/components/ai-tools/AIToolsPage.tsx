"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import AIToolCard from "./AIToolCard";
import { Camera, MessageSquare, Zap, ChevronRight } from "lucide-react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { AITool } from "@prisma/client";
import ComponentLoader from "../ui/ComponentLoader";
const iconMap: Record<string, React.ReactNode> = {
  Dermatology: <Camera className="h-5 w-5" />,
  Pharmacy: <MessageSquare className="h-5 w-5" />,
};
export default function AIToolsPage() {
  const { handleNavigation } = useHandleNavigation();
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // <- loading state

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch("/api/ai-tools");
        const data = await res.json();
        setAiTools(data);
      } catch (error) {
        console.error("Failed to load specialties:", error);
      } finally {
        setLoading(false); // <- stop loading
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Health Tools
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Advanced AI Health
            <span className="block text-primary">Analysis Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge artificial intelligence to get instant health
            insights, analyze symptoms, and understand your medical reports with
            confidence.
          </p>
        </div>

        {/* AI Tools Grid */}
        {loading ? (
          <ComponentLoader></ComponentLoader>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {aiTools.map((tool, index) => (
              <AIToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={iconMap[tool.category]}
                category={tool.category}
                imageUrl={tool.imageUrl}
                onClick={() => {}}
              />
            ))}
          </div>
        )}

        
        {/* Call-to-Action Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Need More Personalized Care?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While our AI tools provide valuable insights, nothing replaces
            professional medical care. Connect with our certified doctors for
            comprehensive consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                handleNavigation("/specialties");
              }}
              className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Find a Doctor
              <ChevronRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
