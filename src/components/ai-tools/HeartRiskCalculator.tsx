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
import { HeartPulse } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface HeartRiskResponse {
  riskScore: number;
  riskCategory: string;
  summary: string;
  recommendations: string[];
  lifestylePlan: {
    diet: string;
    exercise: string;
    monitoring: string;
  };
}

export default function HeartRiskCalculator() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    smoker: "",
    systolic: "",
    cholesterol: "",
    familyHistory: "",
    exercise: "",
    diet: "",
  });

  const [result, setResult] = useState<HeartRiskResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckRisk = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/heart-risk", {
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
          <HeartPulse className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            AI Heart Health Risk Assessment
          </h1>
          <p className="text-muted-foreground">
            Get an AI-powered evaluation of your heart health with tailored
            insights and actionable lifestyle recommendations
          </p>
        </div>

        {/* Input Card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Age */}
              <div>
                <label className="block mb-2 font-medium">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-2 font-medium">Gender</label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setForm({ ...form, gender: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight */}
              <div>
                <label className="block mb-2 font-medium">Weight (kg)</label>
                <Input
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>

              {/* Height */}
              <div>
                <label className="block mb-2 font-medium">Height (cm)</label>
                <Input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                />
              </div>

              {/* Smoker */}
              <div>
                <label className="block mb-2 font-medium">Do you smoke?</label>
                <Select
                  value={form.smoker}
                  onValueChange={(v) => setForm({ ...form, smoker: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Systolic */}
              <div>
                <label className="block mb-2 font-medium">
                  Systolic Blood Pressure
                </label>
                <Input
                  name="systolic"
                  type="number"
                  value={form.systolic}
                  onChange={handleChange}
                />
              </div>

              {/* Cholesterol */}
              <div>
                <label className="block mb-2 font-medium">Cholesterol</label>
                <Input
                  name="cholesterol"
                  type="number"
                  value={form.cholesterol}
                  onChange={handleChange}
                />
              </div>

              {/* Family history */}
              <div>
                <label className="block mb-2 font-medium">
                  Family History of Heart Disease
                </label>
                <Select
                  value={form.familyHistory}
                  onValueChange={(v) => setForm({ ...form, familyHistory: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exercise */}
              <div>
                <label className="block mb-2 font-medium">
                  Physical Activity Level
                </label>
                <Select
                  value={form.exercise}
                  onValueChange={(v) => setForm({ ...form, exercise: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Diet */}
              <div>
                <label className="block mb-2 font-medium">Diet Quality</label>
                <Select
                  value={form.diet}
                  onValueChange={(v) => setForm({ ...form, diet: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleCheckRisk} disabled={loading}>
              {loading ? "Analyzing..." : "Check Risk"}
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
                  <TabsTrigger value="plan">Plan</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>

                {/* Summary */}
                <TabsContent value="summary" className="space-y-4">
                  <h2 className="text-xl font-semibold text-center">
                    Risk Category: {result.riskCategory}
                  </h2>

                  {/* Radial Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        barSize={20}
                        data={[
                          {
                            name: "Risk",
                            value: result.riskScore,
                            fill: "#ef4444",
                          },
                        ]}
                        startAngle={180}
                        endAngle={0}
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
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-center font-medium">
                    <strong>Risk Score:</strong> {result.riskScore}/100
                  </p>
                  <p className="text-muted-foreground text-center">
                    {result.summary}
                  </p>
                </TabsContent>

                {/* Lifestyle Plan */}
                <TabsContent value="plan" className="space-y-4">
                  <h3 className="text-lg font-semibold">Lifestyle Plan</h3>
                  <p>
                    <strong>Diet:</strong> {result.lifestylePlan.diet}
                  </p>
                  <p>
                    <strong>Exercise:</strong> {result.lifestylePlan.exercise}
                  </p>
                  <p>
                    <strong>Monitoring:</strong>{" "}
                    {result.lifestylePlan.monitoring}
                  </p>
                </TabsContent>

                {/* Tips */}
                <TabsContent value="tips" className="space-y-3">
                  <h3 className="text-lg font-semibold">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {result.recommendations.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
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
