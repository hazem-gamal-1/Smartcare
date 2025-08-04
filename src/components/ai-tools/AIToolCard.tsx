import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface AIToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  category?: string;
  isComingSoon?: boolean;
  imageUrl?: string;
}

export default function AIToolCard({
  title,
  description,
  icon,
  onClick,
  category,
  isComingSoon = false,
  imageUrl,
}: AIToolCardProps) {
  // Default images for AI tools if not provided
  const getDefaultImage = (toolTitle: string) => {
    switch (toolTitle.toLowerCase()) {
      case "skin health analyzer":
        return "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop";
      case "symptom checker":
        return "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop";
      case "report summarizer":
        return "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop";
    }
  };

  const finalImageUrl = imageUrl || getDefaultImage(title);

  return (
    <Card
      className="group relative overflow-hidden border hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 cursor-pointer rounded-2xl bg-card min-h-[380px]"
      onClick={onClick}
    >
      {/* Background Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${finalImageUrl})`,
          }}
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

        {/* Floating AI badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
            <span className="text-white text-xs font-semibold flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </span>
          </div>
        </div>

        {/* Category badge */}
        {category && (
          <div className="absolute top-4 right-4">
            <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
              {category}
            </span>
          </div>
        )}

        {/* Icon in center of image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-125 shadow-lg border border-white/30">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-100"></div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="font-[Plus_Jakarta_Sans] font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mt-2">
              {description}
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex flex-col">
            {isComingSoon && (
              <span className="text-xs text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full mb-2 self-start">
                Coming Soon
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={isComingSoon ? "outline" : "default"}
            onClick={onClick}
            disabled={isComingSoon}
            className={`
              font-medium px-6 py-2 rounded-xl transition-all duration-500
              ${
                !isComingSoon
                  ? "group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transform group-hover:scale-105 group-hover:shadow-primary/25"
                  : "opacity-60"
              }
            `}
          >
            {isComingSoon ? "Available Soon" : "Try Now"}
            {!isComingSoon && (
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </CardContent>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
    </Card>
  );
}
