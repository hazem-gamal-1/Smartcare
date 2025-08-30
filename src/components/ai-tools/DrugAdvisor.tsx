"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { FaCapsules } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface DrugAdvisorResponse {
  summary: string;
  interactions: string[];
  alternativeMedications: string[];
  correctDosage: string[];
  usageInstructions: string[];
  sideEffects: string[];
  monitoringAdvice: string[];
}

export default function DrugAdvisor() {
  const [form, setForm] = useState({
    medications: "",
    age: "",
    sex: "female",
    weight: "",
    height: "",
    conditions: "",
    allergies: "",
    previousReactions: "",
    liverFunction: "normal",
    kidneyFunction: "normal",
    pregnancyStatus: "not pregnant",
    smoking: "no",
    alcohol: "no",
    exercise: "light",
  });

  const [result, setResult] = useState<DrugAdvisorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckDrugs = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/drug-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch drug advice. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-background via-muted/20 to-background py-12">
      <div className="container mx-auto max-w-4xl px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <FaCapsules className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            AI Pharma Assistant
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your medications and health details to receive AI-guided
            advice on interactions, dosage, usage instructions, side effects,
            and personalized monitoring recommendations.
          </p>
        </div>

        {/* Input Card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block mb-2 font-medium">
                  Current Medications
                </label>
                <Input
                  type="text"
                  name="medications"
                  value={form.medications}
                  onChange={handleChange}
                  placeholder="Separate with commas"
                />
              </div>
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
                <label className="block mb-2 font-medium">Sex</label>
                <Select
                  value={form.sex}
                  onValueChange={(v) => setForm({ ...form, sex: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
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
                <label className="block mb-2 font-medium">Height (cm)</label>
                <Input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Medical Conditions
                </label>
                <Input
                  name="conditions"
                  value={form.conditions}
                  onChange={handleChange}
                  placeholder="e.g., Diabetes"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Allergies</label>
                <Input
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Previous Adverse Reactions
                </label>
                <Input
                  name="previousReactions"
                  value={form.previousReactions}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Liver Function</label>
                <Select
                  value={form.liverFunction}
                  onValueChange={(v) => setForm({ ...form, liverFunction: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="impaired">Impaired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Kidney Function
                </label>
                <Select
                  value={form.kidneyFunction}
                  onValueChange={(v) => setForm({ ...form, kidneyFunction: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="impaired">Impaired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Pregnancy / Breastfeeding
                </label>
                <Select
                  value={form.pregnancyStatus}
                  onValueChange={(v) =>
                    setForm({ ...form, pregnancyStatus: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not pregnant">Not Pregnant</SelectItem>
                    <SelectItem value="pregnant">Pregnant</SelectItem>
                    <SelectItem value="breastfeeding">Breastfeeding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Smoking</label>
                <Select
                  value={form.smoking}
                  onValueChange={(v) => setForm({ ...form, smoking: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Alcohol Intake</label>
                <Select
                  value={form.alcohol}
                  onValueChange={(v) => setForm({ ...form, alcohol: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Exercise Level</label>
                <Select
                  value={form.exercise}
                  onValueChange={(v) => setForm({ ...form, exercise: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleCheckDrugs} disabled={loading}>
              {loading ? "Analyzing..." : "Check Interactions"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="summary" className="space-y-6">
                <div className="overflow-x-auto">
                  <TabsList className="inline-flex min-w-max gap-2 px-2">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                    <TabsTrigger value="dosage">Dosage & Usage</TabsTrigger>
                    <TabsTrigger value="sideeffects">Side Effects</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="summary" className="space-y-4">
                  <p className="text-muted-foreground">{result.summary}</p>
                </TabsContent>

                <TabsContent value="interactions" className="space-y-2">
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.interactions.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="alternatives" className="space-y-2">
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.alternativeMedications.map((alt, idx) => (
                      <li key={idx}>{alt}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="dosage" className="space-y-2">
                  <h4 className="font-semibold">Correct Dosage</h4>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.correctDosage.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold mt-2">Usage Instructions</h4>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.usageInstructions.map((u, idx) => (
                      <li key={idx}>{u}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="sideeffects" className="space-y-2">
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.sideEffects.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-2">
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {result.monitoringAdvice.map((m, idx) => (
                      <li key={idx}>{m}</li>
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
