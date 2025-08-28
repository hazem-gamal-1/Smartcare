"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
} from "react";
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Optimized fetch with error handling and caching headers
  useEffect(() => {
    let isCancelled = false;

    const fetchTools = async () => {
      try {
        const res = await fetch("/api/ai-tools", {
          // Add caching headers for better performance
          headers: {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Only update state if component is still mounted
        if (!isCancelled) {
          setAiTools(data);
        }
      } catch (error) {
        console.error("Failed to load AI tools:", error);
        // You might want to set an error state here
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchTools();

    // Cleanup function to prevent memory leaks
    return () => {
      isCancelled = true;
    };
  }, []);

  // Stable navigation callback using useTransition for better performance
  const handleToolClick = useCallback(
    (id: string) => {
      startTransition(() => {
        router.push(`/ai-tools/${id}`);
      });
    },
    [router]
  );

  // Stable navigation callback for "Find a Doctor" button
  const handleFindDoctorClick = useCallback(() => {
    startTransition(() => {
      handleNavigation("/specialties");
    });
  }, [handleNavigation]);

  // Memoized tool cards with stable key generation
  const toolCards = useMemo(() => {
    return aiTools.map((tool) => (
      <AIToolCard
        key={tool.id}
        title={tool.title}
        description={tool.description}
        category={tool.category}
        imageUrl={tool.imageUrl}
        onClick={() => handleToolClick(tool.id)}
      />
    ));
  }, [aiTools, handleToolClick]);

  // Early return for loading state
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
        {/* Header - Memoized content */}
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

        {/* Tools Grid - Use CSS Grid for better performance */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          style={{
            // Optimize rendering with CSS containment
            contain: "layout style paint",
          }}
        >
          {toolCards}
        </div>

        {/* CTA - Stable component */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            Need More Personalized Care?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While our AI tools provide valuable insights, nothing replaces
            professional medical care. Connect with our certified doctors for
            consultations.
          </p>
          <Button
            size="lg"
            onClick={handleFindDoctorClick}
            disabled={isPending}
            className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Find a Doctor"}
            {!isPending && <ChevronRight className="ml-3 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
