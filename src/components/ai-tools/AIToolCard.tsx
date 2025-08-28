import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface AIToolCardProps {
  title: string;
  description: string;
  onClick: () => void;
  category?: string;
  isComingSoon?: boolean;
  imageUrl?: string;
}

function AIToolCard({
  title,
  description,
  onClick,
  category,
  isComingSoon = false,
  imageUrl,
}: AIToolCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border hover:shadow-2xl transition-transform duration-700 hover:-translate-y-3 cursor-pointer rounded-2xl bg-card min-h-[380px] will-change-transform,box-shadow"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl && (
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            fill
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
      </div>

      {/* Floating Badges */}
      {category && (
        <div className="absolute top-4 right-4">
          <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
            {category}
          </span>
        </div>
      )}

      <div className="absolute top-4 left-4">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <span className="text-white text-xs font-semibold flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </span>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
        <div className="flex space-x-1">
          {[0.6, 0.4, 0.2].map((opacity, idx) => (
            <div
              key={idx}
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: `rgba(255,255,255,${opacity})`,
                animationDelay: `${idx * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div className="space-y-4 flex-1">
          <h3 className="font-[Plus_Jakarta_Sans] font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mt-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          {isComingSoon && (
            <span className="text-xs text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full mb-2 self-start">
              Coming Soon
            </span>
          )}
          <Button
            size="sm"
            variant={isComingSoon ? "outline" : "default"}
            onClick={onClick}
            disabled={isComingSoon}
            className={`font-medium px-6 py-2 rounded-xl transition-all duration-500 ${
              !isComingSoon
                ? "group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transform group-hover:scale-105"
                : "opacity-60"
            }`}
          >
            {isComingSoon ? "Available Soon" : "Try Now"}
            {!isComingSoon && (
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </Card>
  );
}

export default React.memo(
  AIToolCard,
  (prev, next) =>
    prev.title === next.title &&
    prev.description === next.description &&
    prev.imageUrl === next.imageUrl &&
    prev.isComingSoon === next.isComingSoon
);
