"use client";

import React, { useState, useEffect, useCallback } from "react";
import AIToolCard from "./AIToolCard";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";
import { AITool } from "@prisma/client";

export default function AIToolsPage() {
  const router = useRouter();
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch AI tools
  useEffect(() => {
    let isCancelled = false;
    const fetchTools = async () => {
      try {
        const res = await fetch("/api/ai-tools", {
          headers: {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!isCancelled) setAiTools(data);
      } catch (err) {
        console.error("Failed to fetch AI tools:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };
    fetchTools();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleToolClick = useCallback(
    (id: string) => () => {
      router.push(`/ai-tools/${id}`);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Health Tools
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Explore Our Advanced
            <span className="block text-primary">AI Health Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI to get instant health insights, analyze
            symptoms, and understand your medical reports with precision and
            clarity.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">30+</div>
            <div className="text-sm text-muted-foreground">AI Tools</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">100k+</div>
            <div className="text-sm text-muted-foreground">Users Assisted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">
              Support Available
            </div>
          </div>
        </div>

        {/* Tools Grid - mobile optimized, wider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {aiTools.map((tool) => (
            <AIToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              category={tool.category}
              imageUrl={tool.imageUrl}
              onClick={handleToolClick(tool.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
