"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import AIToolCard from "./AIToolCard";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";
import { AITool } from "@prisma/client";

export default function AIToolsPage() {
  const router = useRouter();
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

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

  // Stable card click
  const handleToolClick = useCallback(
    (id: string) => () => {
      startTransition(() => router.push(`/ai-tools/${id}`));
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
          onClick={handleToolClick(tool.id)}
        />
      )),
    [aiTools, handleToolClick]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader />
      </div>
    );
  }

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Advanced AI Health
            <span className="block text-primary">Analysis Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI to get instant health insights, analyze
            symptoms, and understand your medical reports.
          </p>
        </div>

        {/* Tools Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          style={{ contain: "layout style paint" }}
        >
          {toolCards}
        </div>
      </div>
    </div>
  );
}
