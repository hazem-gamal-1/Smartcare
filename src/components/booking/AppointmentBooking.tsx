"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Calendar } from "../ui/Calendar";
import { Badge } from "../ui/Badge";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  FileText,
  CreditCard,
  CheckCircle,
  Video,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Specialty, Doctor } from "@prisma/client";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
type Education = { degree: string; institution: string; year: string };
interface DoctorWithSpecialty extends Doctor {
  specialty: Specialty;
  languages: string[];
  certifications: string[];
  stats: {
    totalPatients: number;
    yearsExperience: number;
    successRate: number;
    avgRating: number;
  };
  education: Education[];
}
import Loader from "../ui/Loader";

import { useParams } from "next/navigation";
export default function AppointmentBooking() {
  const { handleNavigation } = useHandleNavigation();
  const params = useParams();
  const id = params.doctorid as string;
  console.log(id);
  const specialtyId = params.specialtyid as string;
  const [doctor, setDoctor] = useState<DoctorWithSpecialty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch(`/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (error) {
        console.error("Failed to load specialties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, [id]);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState({
    patientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
    },
    symptoms: "",
    currentMedications: "",
  });

  const availableTimes = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const consultationTypes = [
    {
      id: "video",
      name: "Video Consultation",
      description: "Face-to-face video call with the doctor",
      icon: <Video className="h-5 w-5" />,
      price: 150,
      duration: "30 minutes",
    },
    {
      id: "chat",
      name: "Chat Consultation",
      description: "Text-based consultation with quick responses",
      icon: <MessageSquare className="h-5 w-5" />,
      price: 100,
      duration: "20 minutes",
    },
    {
      id: "phone",
      name: "Phone Call",
      description: "Traditional phone consultation",
      icon: <Phone className="h-5 w-5" />,
      price: 120,
      duration: "25 minutes",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [field]: value,
      },
    }));
  };

  const handleBookingSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: id,
          date: selectedDate?.toISOString(),
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const result = await response.json();
      console.log("Appointment created:", result);

      setCurrentStep(6); // Success step
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`
            flex items-center justify-center w-10 h-10 rounded-full font-medium text-sm
            ${
              currentStep >= step
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }
          `}
          >
            {step}
          </div>
          {step < 5 && (
            <div
              className={`
              h-1 w-12 mx-2 rounded
              ${currentStep > step ? "bg-primary" : "bg-muted"}
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Date & Time Selection
  const DateTimeStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Select Date & Time</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Choose Date
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Available Times
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="justify-start"
                  disabled={!selectedDate}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={nextStep}
            disabled={!selectedDate || !selectedTime}
            className="px-8"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 2: Patient Information
  const PatientInfoStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Patient Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={bookingData.patientInfo.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={bookingData.patientInfo.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={bookingData.patientInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={bookingData.patientInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={bookingData.patientInfo.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={bookingData.patientInfo.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
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

        <div className="space-y-2">
          <Label htmlFor="symptoms">Primary Symptoms/Concerns</Label>
          <Textarea
            id="symptoms"
            value={bookingData.symptoms}
            onChange={(e) =>
              setBookingData((prev) => ({ ...prev, symptoms: e.target.value }))
            }
            placeholder="Please describe your symptoms or health concerns..."
            rows={3}
            required
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} className="px-8">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 3: Medical History & Documents
  const MedicalHistoryStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Medical History & Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentMedications">Current Medications</Label>
          <Textarea
            id="currentMedications"
            value={bookingData.currentMedications}
            onChange={(e) =>
              setBookingData((prev) => ({
                ...prev,
                currentMedications: e.target.value,
              }))
            }
            placeholder="List any medications you're currently taking..."
            rows={2}
          />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} className="px-8">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 4: Consultation Type
  const ConsultationTypeStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Select Consultation Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {consultationTypes.map((type) => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 ${
                consultationType === type.id
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => setConsultationType(type.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Duration: {type.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ${type.price}
                    </p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={!consultationType}
            className="px-8"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 5: Payment & Confirmation
  const PaymentStep = () => {
    const selectedConsultation = consultationTypes.find(
      (t) => t.id === consultationType
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment & Confirmation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Doctor:</span>
                <span className="font-medium">
                  {doctor?.name || "Dr. Sarah Johnson"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {selectedDate?.toDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Consultation Type:</span>
                <span className="font-medium">
                  {selectedConsultation?.name}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-primary">
                  ${selectedConsultation?.price}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button
              onClick={handleBookingSubmit}
              disabled={isLoading}
              className="px-8"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Confirm & Pay $${selectedConsultation?.price}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Step 6: Confirmation
  const ConfirmationStep = () => (
    <Card className="text-center">
      <CardContent className="p-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
        <p className="text-muted-foreground mb-8">
          Your appointment has been successfully booked. You will receive a
          confirmation email shortly.
        </p>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">Appointment Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {selectedDate?.toDateString()}
            </p>
            <p>
              <span className="font-medium">Time:</span> {selectedTime}
            </p>
            <p>
              <span className="font-medium">Type:</span>{" "}
              {consultationTypes.find((t) => t.id === consultationType)?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              handleNavigation("/dashboard");
            }}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              handleNavigation("/");
            }}
          >
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Loader></Loader>;
  }

  if (!doctor) {
    return <div className="">Error</div>;
  }
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => {
                handleNavigation(`/specialties/${[specialtyId]}`);
              }}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </Button>

            {doctor && currentStep < 6 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-muted relative">
                      <Image
                        src={doctor.imageUrl}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{doctor.name}</h2>
                      <p className="text-muted-foreground">{doctor.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">
                          {doctor.specialty.title}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep < 6 && (
              <>
                <h1 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-2">
                  Book Appointment
                </h1>
                <p className="text-muted-foreground">
                  Complete the steps below to schedule your consultation
                </p>
              </>
            )}
          </div>

          {currentStep < 6 && <StepIndicator />}

          {/* Step Content */}
          {currentStep === 1 && <DateTimeStep />}
          {currentStep === 2 && <PatientInfoStep />}
          {currentStep === 3 && <MedicalHistoryStep />}
          {currentStep === 4 && <ConsultationTypeStep />}
          {currentStep === 5 && <PaymentStep />}
          {currentStep === 6 && <ConfirmationStep />}
        </div>
      </div>
    </div>
  );
}
