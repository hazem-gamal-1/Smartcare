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
      className="group relative overflow-hidden cursor-pointer rounded-2xl bg-card shadow-md hover:shadow-2xl transition-shadow duration-300"
      onClick={handleClick}
    >
      {/* Image with fixed aspect ratio */}
      {imageUrl && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            fill
          />
        </div>
      )}

      {/* Category badge */}
      {category && (
        <div className="absolute top-4 right-4">
          <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-black/50">
            {category}
          </span>
        </div>
      )}

      {/* AI-Powered badge */}
      <div className="absolute top-4 left-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-xs font-semibold text-white">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 flex flex-col justify-between min-h-[150px]">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-card-foreground line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {description}
          </p>
        </div>

        <Button
          size="sm"
          variant="default"
          className="mt-4 w-full flex justify-center items-center gap-2"
          onClick={handleClick}
        >
          Try Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
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
