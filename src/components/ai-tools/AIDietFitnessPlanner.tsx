"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Dumbbell, Apple, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface Meal {
  name: string;
  items: string[];
  calories?: number;
}

interface DayPlan {
  day: string;
  meals: Meal[];
  workout: string;
}

interface WeeklyPlan {
  week: DayPlan[];
}

export default function AIDietFitnessPlanner() {
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("lose");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [activity, setActivity] = useState<string>("Sedentary");
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generatePlan = async () => {
    setLoading(true);
    setPlan(null);

    const res = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height, age, activity, goal }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.plan) {
      setPlan(data.plan as WeeklyPlan);
    } else {
      alert(data.error || "Failed to generate plan");
    }
  };

  return (
    <main className="bg-gradient-to-br from-background via-muted/20 to-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            AI Diet & Fitness Planner
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Enter your stats and goals, and let AI create a personalized{" "}
            <strong>weekly</strong> meal & workout plan.
          </p>
        </div>

        {/* Content */}
        <Card className="rounded-3xl shadow-xl border border-muted/30 bg-card">
          <CardContent className="p-8">
            <Tabs defaultValue="input" className="space-y-10">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto rounded-xl">
                <TabsTrigger value="input" className="text-lg">
                  Your Stats
                </TabsTrigger>
                <TabsTrigger value="plan" className="text-lg">
                  Weekly Plan
                </TabsTrigger>
              </TabsList>

              {/* Input */}
              <TabsContent value="input">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Weight */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Current Weight (kg)
                    </label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 72"
                      className="h-12"
                    />
                  </div>
                  {/* Height */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Height (cm)
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g., 175"
                      className="h-12"
                    />
                  </div>
                  {/* Age */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Age
                    </label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 28"
                      className="h-12"
                    />
                  </div>
                  {/* Activity */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Activity Level
                    </label>
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Sedentary">Sedentary</SelectItem>
                          <SelectItem value="Lightly Active">
                            Lightly Active
                          </SelectItem>
                          <SelectItem value="Moderately Active">
                            Moderately Active
                          </SelectItem>
                          <SelectItem value="Very Active">
                            Very Active
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Goal */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold">
                      Goal
                    </label>
                    <div className="flex gap-4">
                      {["lose", "maintain", "gain"].map((g) => (
                        <Button
                          key={g}
                          variant={goal === g ? "default" : "outline"}
                          className="flex-1 py-6"
                          onClick={() =>
                            setGoal(g as "lose" | "maintain" | "gain")
                          }
                        >
                          {g === "lose"
                            ? "Lose Weight"
                            : g === "gain"
                            ? "Gain Muscle"
                            : "Maintain"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold rounded-xl"
                    onClick={generatePlan}
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate My Plan"}
                  </Button>
                </div>
              </TabsContent>

              {/* Weekly Plan */}
              <TabsContent value="plan">
                {!plan ? (
                  <p className="text-center text-muted-foreground text-lg">
                    No plan yet. Generate one from Your Stats.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {plan.week.map((day: DayPlan, index: number) => (
                      <Card
                        key={index}
                        className="rounded-2xl shadow-sm border border-muted/30 hover:shadow-md transition"
                      >
                        <CardContent className="p-6 space-y-5">
                          <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-primary">
                              {day.day}
                            </h3>
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-3 text-lg">
                              <Apple className="w-5 h-5 text-green-500" />
                              Meals
                            </h4>
                            <ul className="space-y-2 text-muted-foreground text-base leading-relaxed">
                              {day.meals.map((meal: Meal, i: number) => (
                                <li key={i} className="flex justify-between">
                                  <div>
                                    <strong className="text-foreground">
                                      {meal.name}:
                                    </strong>{" "}
                                    {meal.items.join(", ")}
                                  </div>
                                  {meal.calories && (
                                    <span className="bg-primary/10 text-primary text-sm font-semibold px-2 py-1 rounded-lg">
                                      {meal.calories} kcal
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-3 text-lg">
                              <Dumbbell className="w-5 h-5 text-blue-500" />
                              Workout
                            </h4>
                            <p className="text-muted-foreground text-base">
                              {day.workout}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
