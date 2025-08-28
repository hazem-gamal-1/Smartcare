"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "../ui/Button";
import AIToolCard from "./AIToolCard";
import { Zap, ChevronRight } from "lucide-react";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { AITool } from "@prisma/client";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";

export default function AIToolsPage() {
  const { handleNavigation } = useHandleNavigation();
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tools
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("/api/ai-tools");
        const data = await res.json();
        setAiTools(data);
      } catch (error) {
        console.error("Failed to load AI tools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  // Stable click handler
  const handleToolClick = useCallback(
    (id: string) => {
      router.push(`/ai-tools/${id}`);
    },
    [router]
  );

  // Memoized cards
  const toolCards = useMemo(
    () =>
      aiTools.map((tool) => (
        <AIToolCard
          key={tool.id}
          title={tool.title}
          description={tool.description}
          category={tool.category}
          imageUrl={tool.imageUrl}
          onClick={() => handleToolClick(tool.id)}
        />
      )),
    [aiTools, handleToolClick]
  );

  if (loading) return <Loader />;

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
            Leverage cutting-edge AI to get instant health insights, analyze
            symptoms, and understand your medical reports.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {toolCards}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Need More Personalized Care?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While our AI tools provide valuable insights, nothing replaces
            professional medical care. Connect with our certified doctors for
            consultations.
          </p>
          <Button
            size="lg"
            onClick={() => handleNavigation("/specialties")}
            className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Find a Doctor
            <ChevronRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
