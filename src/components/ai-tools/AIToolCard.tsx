import React, { memo, useCallback } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

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
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <Card
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-transform transition-shadow duration-500 hover:-translate-y-2 cursor-pointer rounded-2xl bg-card h-[380px] will-change-transform,box-shadow"
      onClick={handleClick}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

      {/* Top badges */}
      {category && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-xs font-semibold text-white px-3 py-2 rounded-full border border-white/20 bg-black/60">
            {category}
          </span>
        </div>
      )}

      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
        <div className="flex items-center space-x-1 border border-white/30 rounded-full px-3 py-1 bg-white/20 backdrop-blur-md group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="text-white text-xs font-semibold">AI-Powered</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="relative z-10 h-full flex flex-col justify-between p-6">
        <div className="space-y-4 flex-1">
          <h3 className="text-white font-[Plus_Jakarta_Sans] font-bold text-xl leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-white/20">
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 py-2.5 rounded-lg font-medium group-hover:shadow-lg transform group-hover:scale-[1.02]"
            onClick={handleClick}
          >
            Try Now
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Floating dots animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex space-x-1">
          {[0.6, 0.4, 0.2].map((opacity, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: `rgba(255,255,255,${opacity})`,
                animationDelay: `${idx * 75}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default memo(
  AIToolCard,
  (prev, next) =>
    prev.title === next.title &&
    prev.description === next.description &&
    prev.category === next.category &&
    prev.imageUrl === next.imageUrl &&
    prev.onClick === next.onClick
);
