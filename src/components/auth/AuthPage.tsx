"use client"
import React, { useState } from "react";
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
import { Checkbox } from "../ui/Checkbox";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Phone,
  Stethoscope,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<string>("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {

    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <Button variant="ghost" onClick={() => {}} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mx-auto mb-4">
                <Stethoscope className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {mode === "signin" ? "Welcome Back" : "Join AI-Clinic"}
              </CardTitle>
              <p className="text-primary-foreground/90 mt-2">
                {mode === "signin"
                  ? "Sign in to access your account"
                  : "Create your account to get started"}
              </p>
            </CardHeader>

            <CardContent className="p-8">
              {mode === "signup" && (
                <div className="mb-6">
                  <Label className="text-sm font-semibold">I am a:</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button
                      type="button"
                      variant={userType === "patient" ? "default" : "outline"}
                      onClick={() => setUserType("patient")}
                      className="py-3"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Patient
                    </Button>
                    <Button
                      type="button"
                      variant={userType === "doctor" ? "default" : "outline"}
                      onClick={() => setUserType("doctor")}
                      className="py-3"
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Doctor
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === "signup" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {mode === "signup" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          placeholder="••••••••"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+1 (555) 000-0000"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {userType === "patient" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) =>
                                  handleInputChange(
                                    "dateOfBirth",
                                    e.target.value
                                  )
                                }
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                              value={formData.gender}
                              onValueChange={(value) =>
                                handleInputChange("gender", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">
                                  Prefer not to say
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {userType === "doctor" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Medical Specialty</Label>
                          <Select
                            value={formData.specialty}
                            onValueChange={(value) =>
                              handleInputChange("specialty", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your specialty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiology">
                                Cardiology
                              </SelectItem>
                              <SelectItem value="neurology">
                                Neurology
                              </SelectItem>
                              <SelectItem value="dermatology">
                                Dermatology
                              </SelectItem>
                              <SelectItem value="orthopedics">
                                Orthopedics
                              </SelectItem>
                              <SelectItem value="pediatrics">
                                Pediatrics
                              </SelectItem>
                              <SelectItem value="general">
                                General Medicine
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="licenseNumber">
                              License Number
                            </Label>
                            <Input
                              id="licenseNumber"
                              value={formData.licenseNumber}
                              onChange={(e) =>
                                handleInputChange(
                                  "licenseNumber",
                                  e.target.value
                                )
                              }
                              placeholder="MD123456"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">
                              Years of Experience
                            </Label>
                            <Input
                              id="experience"
                              type="number"
                              value={formData.experience}
                              onChange={(e) =>
                                handleInputChange("experience", e.target.value)
                              }
                              placeholder="5"
                              min="0"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("acceptTerms", checked as boolean)
                        }
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </button>
                      </Label>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 text-lg rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>
                        {mode === "signin"
                          ? "Signing in..."
                          : "Creating account..."}
                      </span>
                    </div>
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "signin"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={() =>
                      mode === "signin" ? setMode("signup") : setMode("signin")
                    }
                    className="text-primary hover:underline font-medium"
                  >
                    {mode === "signin" ? "Sign up here" : "Sign in here"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
