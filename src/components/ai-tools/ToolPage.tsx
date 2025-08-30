"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import ChatBot from "@/components/ai-tools/Chabot";
import AIDietFitnessPlanner from "./AIDietFitnessPlanner";
import HeartRiskCalculator from "./HeartRiskCalculator";
import StressCoach from "./StressCoach";
import HydrationCoach from "./HydrationCoach";
import DrugAdvisor from "./DrugAdvisor";
import CvTool from "./CvTool";
import RecommendationTool from "./RecommendationTool";

export interface Tool {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

export default function ToolPage() {
  const { id } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await fetch(`/api/ai-tools/${id}`);
        const data = await res.json();
        setTool(data);
      } catch (error) {
        console.error("Failed to fetch tool:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id]);

  if (loading) return <Loader />;

  if (!tool) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Tool not found.
      </div>
    );
  }

  if (tool.title === "Medical Chatbot") return <ChatBot />;

  if (tool.title === "AI Diet & Fitness Planner")
    return <AIDietFitnessPlanner />;

  if (tool.title === "AI Heart Health Risk Assessment")
    return <HeartRiskCalculator />;

  if (tool.title === " AI Stress & Meditation Coach") return <StressCoach />;

  if (tool.title === "AI Hydration Coach") return <HydrationCoach />;

  if (tool.title === "AI Pharma Assistant") return <DrugAdvisor />;

  if (tool.title === "AI-Powered Doctor & Tool Recommendation Engine")
    return <RecommendationTool />;
  return <CvTool title={tool.title} description={tool.description} />;
}
