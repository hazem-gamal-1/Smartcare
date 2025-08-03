"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Badge } from "../ui/Badge";
import AIToolCard from "./AIToolCard";
import {
  Camera,
  MessageSquare,
  FileText,
  Upload,
  Send,
  Sparkles,
  Brain,
  Stethoscope,
  Activity,
  Zap,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const aiTools = [
    {
      title: "Skin Health Analyzer",
      description:
        "Upload photos to get AI-powered analysis of skin conditions, moles, and rashes with personalized recommendations and treatment suggestions from our advanced dermatology AI.",
      icon: <Camera className="h-8 w-8" />,
      category: "Dermatology",
      imageUrl:
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=400&fit=crop",
      id: "skin-analyzer",
    },
    {
      title: "Symptom Checker",
      description:
        "Chat with our advanced AI to understand your symptoms, get preliminary health insights, and receive guidance on next steps for your healthcare journey.",
      icon: <MessageSquare className="h-8 w-8" />,
      category: "General Health",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop",
      id: "symptom-checker",
    },
    {
      title: "Medical Report Summarizer",
      description:
        "Upload medical reports and get clear, understandable summaries with key insights highlighted and explained in simple, easy-to-understand terms.",
      icon: <FileText className="h-8 w-8" />,
      category: "Analysis",
      imageUrl:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=400&fit=crop",
      id: "report-summarizer",
    },
    {
      title: "Heart Rate Monitor",
      description:
        "Use your device camera to monitor your heart rate and get insights into your cardiovascular health with real-time analysis.",
      icon: <Activity className="h-8 w-8" />,
      category: "Cardiology",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop",
      id: "heart-monitor",
      isComingSoon: true,
    },
    {
      title: "Mental Health Assistant",
      description:
        "AI-powered mental health support providing mood tracking, stress analysis, and personalized wellness recommendations.",
      icon: <Brain className="h-8 w-8" />,
      category: "Mental Health",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=400&fit=crop",
      id: "mental-health",
      isComingSoon: true,
    },
    {
      title: "Drug Interaction Checker",
      description:
        "Check for potential drug interactions and get safety information about medication combinations with AI analysis.",
      icon: <Stethoscope className="h-8 w-8" />,
      category: "Pharmacy",
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=400&fit=crop",
      id: "drug-checker",
      isComingSoon: true,
    },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    setResult(null);
    setInputText("");
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      let mockResult = "";

      switch (selectedTool) {
        case "skin-analyzer":
          mockResult =
            "Based on the uploaded image, the AI analysis suggests a mild dermatitis condition. The affected area shows signs of inflammation and redness consistent with contact dermatitis. Recommendation: Apply a gentle moisturizer and avoid potential irritants. If symptoms persist for more than a week, consider consulting a dermatologist.";
          break;
        case "symptom-checker":
          mockResult =
            "Based on your symptoms description, you may be experiencing a common viral infection or seasonal allergies. The combination of fatigue, mild headache, and congestion suggests an upper respiratory condition. Recommendation: Get adequate rest, stay hydrated, and monitor symptoms. If fever develops or symptoms worsen, consult a healthcare provider.";
          break;
        case "report-summarizer":
          mockResult =
            "Summary of uploaded medical report: Blood work shows normal white blood cell count (7,200/μL), slightly elevated cholesterol (220 mg/dL), and normal kidney function. Key findings: Overall health is good with minor attention needed for cholesterol management. Recommendation: Consider dietary modifications and regular exercise to manage cholesterol levels.";
          break;
        default:
          mockResult =
            "Analysis complete. Please consult with a healthcare professional for personalized medical advice.";
      }

      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const SkinAnalyzerTool = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-primary" />
          <span>Skin Health Analyzer</span>
          <Badge className="bg-primary/10 text-primary">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-12 w-12 mx-auto text-primary/60 mb-4" />
          <h3 className="font-semibold mb-2">Upload Skin Photo</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Take a clear photo of the skin area you'd like to analyze. Ensure
            good lighting and focus.
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="skin-upload"
          />
          <label htmlFor="skin-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose Photo
            </Button>
          </label>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">
            Additional Information (Optional)
          </label>
          <Textarea
            placeholder="Describe any symptoms, duration, or concerns about the skin condition..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            "Analyze Skin Health"
          )}
        </Button>

        {result && (
          <Card className="border-l-4 border-l-primary bg-primary/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                AI Analysis Result
              </h4>
              <p className="text-sm leading-relaxed">{result}</p>
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-xs text-orange-800 dark:text-orange-200">
                  <strong>Disclaimer:</strong> This AI analysis is for
                  informational purposes only and should not replace
                  professional medical advice.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );

  const SymptomCheckerTool = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span>Symptom Checker</span>
          <Badge className="bg-primary/10 text-primary">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Describe Your Symptoms</label>
          <Textarea
            placeholder="Please describe your symptoms in detail. Include when they started, severity, and any relevant information..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputText.trim()}
          className="w-full"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              <span>Analyzing Symptoms...</span>
            </div>
          ) : (
            "Check Symptoms"
          )}
        </Button>

        {result && (
          <Card className="border-l-4 border-l-primary bg-primary/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                AI Analysis Result
              </h4>
              <p className="text-sm leading-relaxed">{result}</p>
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-xs text-orange-800 dark:text-orange-200">
                  <strong>Disclaimer:</strong> This AI analysis is for
                  informational purposes only and should not replace
                  professional medical diagnosis.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );

  const ReportSummarizerTool = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span>Medical Report Summarizer</span>
          <Badge className="bg-primary/10 text-primary">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-12 w-12 mx-auto text-primary/60 mb-4" />
          <h3 className="font-semibold mb-2">Upload Medical Report</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your medical reports, lab results, or test documents for
            AI-powered summarization.
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            id="report-upload"
          />
          <label htmlFor="report-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose Document
            </Button>
          </label>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">
            Additional Questions (Optional)
          </label>
          <Textarea
            placeholder="Any specific questions about your report or areas you'd like the AI to focus on..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              <span>Summarizing Report...</span>
            </div>
          ) : (
            "Summarize Report"
          )}
        </Button>

        {result && (
          <Card className="border-l-4 border-l-primary bg-primary/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                AI Summary
              </h4>
              <p className="text-sm leading-relaxed">{result}</p>
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-xs text-orange-800 dark:text-orange-200">
                  <strong>Disclaimer:</strong> This AI summary is for
                  informational purposes only. Always discuss results with your
                  healthcare provider.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedTool(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Tools
          </Button>

          {selectedTool === "skin-analyzer" && <SkinAnalyzerTool />}
          {selectedTool === "symptom-checker" && <SymptomCheckerTool />}
          {selectedTool === "report-summarizer" && <ReportSummarizerTool />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Health Tools
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Advanced AI Health
            <span className="block text-primary">Analysis Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge artificial intelligence to get instant health
            insights, analyze symptoms, and understand your medical reports with
            confidence.
          </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <AIToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              imageUrl={tool.imageUrl}
              isComingSoon={tool.isComingSoon}
              onClick={() =>
                tool.isComingSoon ? null : handleToolSelect(tool.id)
              }
            />
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold font-[Plus_Jakarta_Sans] mb-6">
            Need More Personalized Care?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While our AI tools provide valuable insights, nothing replaces
            professional medical care. Connect with our certified doctors for
            comprehensive consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {}}
              className="px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Find a Doctor
              <ChevronRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {}}
              className="px-8 py-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
