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
import { useRouter } from "next/navigation";
type Education = { degree: string; institution: string; year: string };

type DoctorFormData = {
  name: string;
  title: string;
  specialtyId: string;
  location: string;
  bio: string;
  education: Education[];
  certifications: string[];
  languages: string[];
  phone: string;
};

export default function CompleteProfilePage() {
  const router = useRouter();
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
    location: "",
    bio: "",
    education: [],
    certifications: [],
    languages: [],
    phone: "",
  });

  // Redirect if profile already complete
  useEffect(() => {
    if (user?.unsafeMetadata?.completeProfile) router.push("/");
  }, [user, router]);

  // Fetch specialties for doctor select
  useEffect(() => {
    fetch("/api/specialties")
      .then((res) => res.json())
      .then(setSpecialties)
      .catch(console.error);
  }, []);

  // Pre-fill name for patients
  useEffect(() => {
    if (user && userType === "patient") {
      setFormData((prev) => ({ ...prev, name: user.fullName || "" }));
    }
  }, [user, userType]);

  const handleInputChange = <K extends keyof DoctorFormData>(
    field: K,
    value: DoctorFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (
    field: "education" | "certifications" | "languages",
    value: string
  ) => {
    if (!value.trim()) return;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("User not found");

    // Basic validation
    if (userType === "doctor" && (!formData.name || !formData.specialtyId)) {
      return alert("Please fill in all required fields (name & specialty).");
    }
    if (userType === "patient" && !formData.phone) {
      return alert("Please provide a phone number.");
    }

    setIsLoading(true);

    try {
      await user.update({
        unsafeMetadata: { role: userType, completeProfile: true },
      });

      if (userType === "doctor") {
        const res = await fetch("/api/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            ...formData,
            imageUrl: user.imageUrl || "",
          }),
        });
        if (!res.ok) throw new Error("Failed to create doctor");
      } else {
        const res = await fetch("/api/patients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: formData.name,
            email: user.emailAddresses[0]?.emailAddress || "",
            phone: formData.phone,
            imageUrl: user.imageUrl || "",
          }),
        });
        if (!res.ok) throw new Error("Failed to create patient");
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
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
                {userType === "doctor" ? (
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
                      label="Location"
                      value={formData.location}
                      onChange={(v) => handleInputChange("location", v)}
                    />
                    <InputSection
                      label="Phone"
                      value={formData.phone}
                      onChange={(v) => handleInputChange("phone", v)}
                    />
                    <TextareaSection
                      label="Short Bio"
                      value={formData.bio}
                      onChange={(v) => handleInputChange("bio", v)}
                    />
                    <EducationFieldSection
                      items={formData.education}
                      addItem={(v) =>
                        handleInputChange("education", [
                          ...formData.education,
                          v,
                        ])
                      }
                      removeItem={(i) =>
                        handleInputChange(
                          "education",
                          formData.education.filter((_, idx) => idx !== i)
                        )
                      }
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
                  </>
                ) : (
                  <>
                    <InputSection
                      label="Full Name"
                      value={formData.name}
                      onChange={(v) => handleInputChange("name", v)}
                    />
                    <InputSection
                      label="Phone"
                      value={formData.phone}
                      onChange={(v) => handleInputChange("phone", v)}
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
          type="button"
          onClick={() => setUserType("patient")}
        >
          <User className="h-4 w-4 mr-2" /> Patient
        </Button>
        <Button
          variant={userType === "doctor" ? "default" : "outline"}
          type="button"
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
          <Button type="button" variant="outline" onClick={() => removeItem(i)}>
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
          type="button"
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

function EducationFieldSection({
  items,
  addItem,
  removeItem,
}: {
  items: Education[];
  addItem: (v: Education) => void;
  removeItem: (i: number) => void;
}) {
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");

  const handleAdd = () => {
    if (!degree || !institution || !year) return;
    addItem({ degree, institution, year });
    setDegree("");
    setInstitution("");
    setYear("");
  };

  return (
    <div className="space-y-2">
      <Label>Education</Label>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span>
            {item.degree}, {item.institution}, {item.year}
          </span>
          <Button type="button" variant="outline" onClick={() => removeItem(i)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Degree"
        />
        <Input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="Institution"
        />
        <Input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
        />
        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>
    </div>
  );
}
