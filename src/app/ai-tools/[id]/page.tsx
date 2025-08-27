"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import ChatBot from "@/components/ai-tools/Chabot";

interface Tool {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

interface ClassificationResult {
  label: string;
  confidence: number;
}

export const metadata = {
  title: "tool",
};

export default function CVToolPage() {
  const { id } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<ClassificationResult[]>([]);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await fetch(`/api/ai-tools/${id}`);
        const data = await res.json();
        setTool(data);
      } catch (error) {
        console.error("Failed to fetch tool:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleClassify = () => {
    // 🔥 Mock classification results
    setResults([
      { label: "Healthy Skin", confidence: 0.92 },
      { label: "Acne", confidence: 0.05 },
      { label: "Other", confidence: 0.03 },
    ]);
  };

  if (loading) return <Loader />;

  if (!tool) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Tool not found.
      </div>
    );
  }

  if (tool.title === "Medical Chatbot") return <ChatBot></ChatBot>;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Tool Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>

        {/* Upload Card */}
        <Card className="mb-12">
          <CardContent className="p-6 flex flex-col items-center space-y-6">
            <div className="w-full flex flex-col items-center space-y-4">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Uploaded"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md object-cover"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <span className="text-muted-foreground">
                    No image uploaded
                  </span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload">
                <Button variant="outline" asChild>
                  <span>Select Image</span>
                </Button>
              </label>
            </div>

            <Button
              className="mt-4"
              disabled={!selectedImage}
              onClick={handleClassify}
            >
              Analyze Image
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Classification Results
              </h2>
              <div className="space-y-3">
                {results.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-border pb-2"
                  >
                    <span className="text-lg">{r.label}</span>
                    <span className="font-medium text-primary">
                      {(r.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
