"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import AIToolCard from "./AIToolCard";
import DoctorCard from "../doctors/DoctorCard";
import { Doctor, AITool } from "@prisma/client";

export default function RecommendationTool() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [tools, setTools] = useState<AITool[]>([]);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setSummary("");
    setNextSteps([]);
    setDoctors([]);
    setTools([]);

    try {
      // Fetch full recommendations directly from API
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSummary(data.summary);
      setNextSteps(data.nextSteps);
      setDoctors(data.doctors);
      setTools(data.tools);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-12 bg-background">
      <div className="container mx-auto max-w-4xl space-y-8 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            AI-Powered Doctor & Tool Recommendation Engine
          </h1>
          <p className="text-muted-foreground">
            Use this AI-powered tool to get personalized suggestions for doctors
            and AI tools based on your health concerns or requirements.
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Describe your condition or requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Analyzing..." : "Get Recommendations"}
          </Button>
        </div>

        {summary && (
          <div className="space-y-4">
            <p className="font-medium">{summary}</p>
            {nextSteps.length > 0 && (
              <ul className="list-disc pl-5 text-muted-foreground">
                {nextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {doctors.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended Doctors</h2>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {doctors.map((doc) => (
                <div key={doc.id} className="min-w-[300px]">
                  <DoctorCard doctor={doc} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tools.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended AI Tools</h2>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {tools.map((tool) => (
                <div key={tool.id} className="min-w-[280px]">
                  <AIToolCard
                    title={tool.title}
                    description={tool.description}
                    imageUrl={tool.imageUrl}
                    onClick={() => alert("Open AI Tool: " + tool.title)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
