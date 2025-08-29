"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Sparkles } from "lucide-react";

interface StressCoachResponse {
  status: string;
  summary: string;
  recommendation: string;
  exercise: {
    type: string;
    duration: string;
    steps: string[];
  };
  lifestyleTips: string[];
}

export default function StressCoach() {
  const [form, setForm] = useState({
    stressLevel: "",
    emotions: "",
    symptoms: "",
    sleepHours: "",
    caffeineIntake: "",
    activityLevel: "Sedentary",
    timeOfDay: "",
  });

  const [result, setResult] = useState<StressCoachResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckIn = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/stress-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);
    if (data.error) {
      alert(data.error);
    } else {
      setResult(data);
    }
  };

  return (
    <main className="bg-gradient-to-br from-background via-muted/20 to-background py-12">
      <div className="container mx-auto max-w-3xl px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            AI Stress & Meditation Coach
          </h1>
          <p className="text-muted-foreground">
            Track your stress, get advice, and follow guided exercises.
          </p>
        </div>

        {/* Input Card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium">
                  Stress Level (1-10)
                </label>
                <Input
                  name="stressLevel"
                  type="number"
                  value={form.stressLevel}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Emotions</label>
                <Input
                  name="emotions"
                  value={form.emotions}
                  onChange={handleChange}
                  placeholder="e.g., anxious"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Symptoms</label>
                <Input
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  placeholder="e.g., headache"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Sleep Hours</label>
                <Input
                  name="sleepHours"
                  type="number"
                  value={form.sleepHours}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Caffeine Intake (cups/day)
                </label>
                <Input
                  name="caffeineIntake"
                  type="number"
                  value={form.caffeineIntake}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Activity Level</label>
                <Input
                  name="activityLevel"
                  value={form.activityLevel}
                  onChange={handleChange}
                  placeholder="Sedentary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 font-medium">Time of Day</label>
                <Input
                  name="timeOfDay"
                  value={form.timeOfDay}
                  onChange={handleChange}
                  placeholder="Morning, Evening..."
                />
              </div>
            </div>
            <Button onClick={handleCheckIn} disabled={loading}>
              {loading ? "Analyzing..." : "Check In"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="summary" className="space-y-6">
                <TabsList className="grid grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="exercise">Exercise</TabsTrigger>
                  <TabsTrigger value="tips">Lifestyle</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    Status: {result.status}
                  </h2>
                  <p>{result.summary}</p>
                  <p className="text-muted-foreground">
                    {result.recommendation}
                  </p>
                </TabsContent>

                <TabsContent value="exercise" className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {result.exercise.type} ({result.exercise.duration})
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {result.exercise.steps.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="tips" className="space-y-3">
                  <h3 className="text-lg font-semibold">Lifestyle Tips</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {result.lifestyleTips.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
