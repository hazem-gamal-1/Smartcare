"use client";

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
      className="group relative overflow-hidden border cursor-pointer rounded-2xl bg-card min-h-[380px] hover:shadow-2xl transition-transform transition-shadow duration-300 hover:-translate-y-3"
      onClick={handleClick}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 right-4">
          <span className="text-xs font-semibold text-white px-3 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
            {category}
          </span>
        </div>
      )}

      {/* AI Powered Badge */}
      <div className="absolute top-4 left-4">
        <div className="border border-white/30 rounded-full px-3 py-1 bg-white/20 backdrop-blur-md">
          <span className="text-white text-xs font-semibold flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div className="space-y-4 flex-1">
          <h3 className="font-[Plus_Jakarta_Sans] font-bold text-xl text-card-foreground line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mt-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-border/50">
          <Button
            size="sm"
            variant="default"
            onClick={handleClick}
            className="font-medium px-6 py-2 rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transform group-hover:scale-105"
          >
            Try Now
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
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
