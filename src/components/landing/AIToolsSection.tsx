"use client";
import React from "react";
import { Button } from "../ui/Button";
import AIToolCard from "../ui/AIToolCard";
import { Camera, MessageSquare, FileText, Zap, Sparkles } from "lucide-react";

const AIToolsSection = () => {
  const aiTools = [
    {
      title: "Skin Health Analyzer",
      description:
        "Upload photos to get AI-powered analysis of skin conditions, moles, and rashes with personalized recommendations and treatment suggestions",
      icon: <Camera className="h-8 w-8" />,
      category: "Dermatology",
      imageUrl:
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=400&fit=crop",
    },
    {
      title: "Symptom Checker",
      description:
        "Chat with our advanced AI to understand your symptoms, get preliminary health insights, and receive guidance on next steps",
      icon: <MessageSquare className="h-8 w-8" />,
      category: "General",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop",
    },
    {
      title: "Report Summarizer",
      description:
        "Upload medical reports and get clear, understandable summaries with key insights highlighted and explained in simple terms",
      icon: <FileText className="h-8 w-8" />,
      category: "Analysis",
      imageUrl:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=400&fit=crop",
    },
  ];

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

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <AIToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              imageUrl={tool.imageUrl}
              onClick={() => true}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => true}
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
