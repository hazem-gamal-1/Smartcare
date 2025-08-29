// components/ai-tools/HydrationCoach.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Droplet } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface HydrationResponse {
  hydrationScore: number;
  status: string;
  dailyGoal: string;
  currentIntake: string;
  summary: string;
  todayPlan: string[];
  hydrationTips: string[];
  hydrationTimeline: {
    time: string;
    action: string;
    amount: number;
  }[];
}

export default function HydrationCoach() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    weight: "",
    activityLevel: "moderate",
    climate: "moderate",
    intake: "",
    caffeineIntake: "",
    alcoholIntake: "",
    workoutMinutes: "",
    otherFluidsDescription: "",
  });

  const [result, setResult] = useState<HydrationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const setField = (name: string, value: string) => {
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleTrack = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/hydration-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        alert(data.error);
      } else {
        if (typeof data.hydrationScore === "string") {
          data.hydrationScore = Number(data.hydrationScore);
        }
        setResult(data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Failed to fetch hydration advice. See console.");
    }
  };

  return (
    <main className="bg-gradient-to-br from-background via-muted/20 to-background py-12">
      <div className="container mx-auto max-w-3xl px-4 space-y-8">
        <div className="text-center space-y-3">
          <Droplet className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <h1 className="text-3xl font-bold">AI Hydration Coach</h1>
          <p className="text-muted-foreground">
            Personalized hydration score, daily plan and hydration timeline.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Gender</label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setField("gender", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Weight (kg)</label>
                <Input
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Activity level</label>
                <Select
                  value={form.activityLevel}
                  onValueChange={(v) => setField("activityLevel", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="very-active">Very active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Climate</label>
                <Select
                  value={form.climate}
                  onValueChange={(v) => setField("climate", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select climate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Water intake today (ml)
                </label>
                <Input
                  name="intake"
                  type="number"
                  value={form.intake}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Caffeine (cups/day)
                </label>
                <Input
                  name="caffeineIntake"
                  type="number"
                  value={form.caffeineIntake}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Alcohol (drinks/day)
                </label>
                <Input
                  name="alcoholIntake"
                  type="number"
                  value={form.alcoholIntake}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-2 font-medium">
                  Workout minutes today
                </label>
                <Input
                  name="workoutMinutes"
                  type="number"
                  value={form.workoutMinutes}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-2 font-medium">
                  Other fluids (juice, soup, etc.)
                </label>
                <Input
                  name="otherFluidsDescription"
                  value={form.otherFluidsDescription}
                  onChange={handleChange}
                  placeholder="e.g. 200ml orange juice at noon"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleTrack} disabled={loading}>
                {loading ? "Analyzing..." : "Get Hydration Plan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="summary">
                <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="progress">Today Plan</TabsTrigger>
                  <TabsTrigger value="trend">Timeline</TabsTrigger>
                </TabsList>

                {/* Summary */}
                <TabsContent value="summary">
                  <div className="grid gap-6 md:grid-cols-2 items-center">
                    {/* Circular Hydration Score */}
                    <ResponsiveContainer width="100%" height={220}>
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        barSize={20}
                        data={[
                          {
                            name: "Hydration",
                            value: result.hydrationScore,
                            fill: "#06b6d4",
                          },
                        ]}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          background
                          dataKey="value"
                          cornerRadius={10}
                        />
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xl font-bold fill-current"
                        >
                          {result.hydrationScore}%
                        </text>
                      </RadialBarChart>
                    </ResponsiveContainer>

                    {/* Hydration Details */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{result.status}</h3>
                      <p className="text-muted-foreground">{result.summary}</p>
                      <p>
                        <strong>Daily goal:</strong> {result.dailyGoal}
                      </p>
                      <p>
                        <strong>Current intake:</strong> {result.currentIntake}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Today Plan Tab */}
                <TabsContent value="progress">
                  <h3 className="text-lg font-semibold mb-3">
                    Todays Hydration Plan
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    {result.todayPlan.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Quick Tips</h4>
                    <ul className="list-disc pl-6">
                      {result.hydrationTips.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {/* Hydration Timeline Tab */}
                <TabsContent value="trend">
                  <h3 className="text-lg font-semibold mb-3">
                    Hydration Timeline
                  </h3>

                  {/* Chart of intake per time */}
                  <div style={{ width: "100%", height: 250 }}>
                    <ResponsiveContainer>
                      <LineChart
                        data={result.hydrationTimeline}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis unit="ml" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          dot
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* List view */}
                  <ol className="list-decimal pl-6 space-y-2 mt-4">
                    {result.hydrationTimeline.map((step, i) => (
                      <li key={i}>
                        <strong>{step.time}:</strong> {step.action} (
                        {step.amount} ml)
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
