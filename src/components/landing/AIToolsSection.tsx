"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import AIToolCard from "../ai-tools/AIToolCard";
import { Zap, Sparkles } from "lucide-react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { AITool } from "@prisma/client";
import Loader from "../ui/Loader";

const AIToolsSection = () => {
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

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              AI-Powered Innovation
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Smart Health Tools
            <span className="block text-secondary">Available 24/7</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get instant health insights with our advanced AI tools. Quick,
            accurate, and always available to support your health journey.
          </p>
        </div>
        {
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {aiTools.slice(0, 3).map((tool, index) => (
              <AIToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                category={tool.category}
                imageUrl={tool.imageUrl}
                onClick={() => {
                  handleNavigation("/ai-tools");
                }}
              />
            ))}
          </div>
        }
        <div className="text-center">
          <Button
            size="lg"
            className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              handleNavigation("/ai-tools");
            }}
          >
            Explore All AI Tools
            <Sparkles className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
