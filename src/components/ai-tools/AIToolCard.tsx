import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Sparkles } from "lucide-react";

interface AIToolCardProps {
  title: string;
  description: string;
  onClick: () => void;
  category?: string;
  imageUrl?: string;
}

function AIToolCard({
  title,
  description,
  onClick,
  category,
  imageUrl,
}: AIToolCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-transform transition-shadow duration-500 hover:-translate-y-2 cursor-pointer rounded-2xl bg-card h-[360px] will-change-transform,box-shadow"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={imageUrl || ""}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          fill
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

      {/* Floating elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <div className="flex space-x-1">
          {[0.6, 0.4, 0.2].map((opacity, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: `rgba(59,130,246,${opacity})`,
                animationDelay: `${idx * 75}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        <div className="flex justify-between items-start mb-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          {/* Category badge */}
          {category && (
            <div className="text-xs font-semibold text-white px-3 py-2 rounded-full border border-white/20 bg-white/20 backdrop-blur-sm group-hover:bg-primary/80 group-hover:border-primary/60 transition-colors duration-300">
              {category}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-[Plus_Jakarta_Sans] font-bold text-xl leading-tight">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          <Button
            size="sm"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 py-2.5 rounded-lg font-medium group-hover:shadow-lg transform group-hover:scale-[1.02]"
            variant="outline"
          >
            Try Now
            <svg
              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </Card>
  );
}

export default React.memo(
  AIToolCard,
  (prev, next) => prev.title === next.title && prev.imageUrl === next.imageUrl
);
