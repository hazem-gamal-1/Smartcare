"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { User, Stethoscope } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type DoctorFormData = {
  name: string;
  title: string;
  specialtyId: string;
  experience: string;
  location: string;
  bio: string;
  education: string[];
  certifications: string[];
  languages: string[];
  availability: { date: string; time: string }[];
};



export default function CompleteProfilePage() {
  const { user } = useUser();
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [specialties, setSpecialties] = useState<
    { id: string; title: string }[]
  >([]);
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    title: "",
    specialtyId: "",
    experience: "",
    location: "",
    bio: "",
    education: [],
    certifications: [],
    languages: [],
    availability: [],
  });

  useEffect(() => {
    fetch("/api/specialties")
      .then((res) => res.json())
      .then((data) => setSpecialties(data))
      .catch(console.error);
  }, []);

  const handleInputChange = <K extends keyof DoctorFormData>(
    field: K,
    value: DoctorFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Array helpers
  const addArrayItem = (
    field: "education" | "certifications" | "languages",
    value: string
  ) => {
    handleInputChange(field, [
      ...formData[field],
      value,
    ] as DoctorFormData[typeof field]);
  };

  const removeArrayItem = (
    field: "education" | "certifications" | "languages",
    index: number
  ) => {
    handleInputChange(
      field,
      formData[field].filter(
        (_, i) => i !== index
      ) as DoctorFormData[typeof field]
    );
  };

  const addAvailability = (date: string, time: string) => {
    handleInputChange("availability", [
      ...formData.availability,
      { date, time },
    ]);
  };

  const removeAvailability = (index: number) => {
    handleInputChange(
      "availability",
      formData.availability.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("User not found");

    setIsLoading(true);
    try {
      // Update Clerk metadata
      await user.update({
        unsafeMetadata: { role: userType, completeProfile: true },
      });

      if (userType === "doctor") {
        const res = await fetch("/api/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, imageUrl: user.imageUrl || "" }),
        });
        if (!res.ok) throw new Error("Failed to create doctor");
        await res.json();
      }

      alert("Profile completed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error completing profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mx-auto mb-4">
                <Stethoscope className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Complete Profile
              </CardTitle>
              <p className="text-primary-foreground/90 mt-2">
                Please provide your details to continue
              </p>
            </CardHeader>

            <CardContent className="p-8">
              <UserTypeSelector userType={userType} setUserType={setUserType} />

              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {userType === "doctor" && (
                  <>
                    <InputSection
                      label="Full Name"
                      value={formData.name}
                      onChange={(v) => handleInputChange("name", v)}
                    />
                    <InputSection
                      label="Title"
                      value={formData.title}
                      placeholder="Dr."
                      onChange={(v) => handleInputChange("title", v)}
                    />
                    <SelectSection
                      label="Specialty"
                      options={specialties.map((s) => ({
                        value: s.id,
                        label: s.title,
                      }))}
                      value={formData.specialtyId}
                      onChange={(v) => handleInputChange("specialtyId", v)}
                    />
                    <InputSection
                      label="Years of Experience"
                      type="number"
                      value={formData.experience}
                      onChange={(v) => handleInputChange("experience", v)}
                    />
                    <InputSection
                      label="Location"
                      value={formData.location}
                      onChange={(v) => handleInputChange("location", v)}
                    />
                    <TextareaSection
                      label="Short Bio"
                      value={formData.bio}
                      onChange={(v) => handleInputChange("bio", v)}
                    />

                    <ArrayFieldSection
                      label="Education"
                      items={formData.education}
                      addItem={(v) => addArrayItem("education", v)}
                      removeItem={(i) => removeArrayItem("education", i)}
                    />
                    <ArrayFieldSection
                      label="Certifications"
                      items={formData.certifications}
                      addItem={(v) => addArrayItem("certifications", v)}
                      removeItem={(i) => removeArrayItem("certifications", i)}
                    />
                    <ArrayFieldSection
                      label="Languages"
                      items={formData.languages}
                      addItem={(v) => addArrayItem("languages", v)}
                      removeItem={(i) => removeArrayItem("languages", i)}
                    />

                    <AvailabilitySection
                      availability={formData.availability}
                      addAvailability={addAvailability}
                      removeAvailability={removeAvailability}
                    />
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 text-lg rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Complete Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Helper Components ---------------------- */

function UserTypeSelector({
  userType,
  setUserType,
}: {
  userType: "patient" | "doctor";
  setUserType: (type: "patient" | "doctor") => void;
}) {
  return (
    <div className="mb-6">
      <Label className="text-sm font-semibold">I am a:</Label>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Button
          variant={userType === "patient" ? "default" : "outline"}
          onClick={() => setUserType("patient")}
        >
          <User className="h-4 w-4 mr-2" /> Patient
        </Button>
        <Button
          variant={userType === "doctor" ? "default" : "outline"}
          onClick={() => setUserType("doctor")}
        >
          <Stethoscope className="h-4 w-4 mr-2" /> Doctor
        </Button>
      </div>
    </div>
  );
}

function InputSection({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

function TextareaSection({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SelectSection({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ArrayFieldSection({
  label,
  items,
  addItem,
  removeItem,
}: {
  label: string;
  items: string[];
  addItem: (v: string) => void;
  removeItem: (i: number) => void;
}) {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={item} readOnly />
          <Button variant="outline" onClick={() => removeItem(i)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add ${label.toLowerCase()}`}
        />
        <Button
          onClick={() => {
            addItem(input);
            setInput("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

function AvailabilitySection({
  availability,
  addAvailability,
  removeAvailability,
}: {
  availability: { date: string; time: string }[];
  addAvailability: (date: string, time: string) => void;
  removeAvailability: (i: number) => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="space-y-2">
      <Label>Availability</Label>
      {availability.map((slot, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={slot.date} readOnly type="date" />
          <Input value={slot.time} readOnly type="time" />
          <Button variant="outline" onClick={() => removeAvailability(i)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button
          onClick={() => {
            addAvailability(date, time);
            setDate("");
            setTime("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
