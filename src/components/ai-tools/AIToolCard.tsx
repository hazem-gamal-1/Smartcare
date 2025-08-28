import React, { memo, useCallback, useState, useEffect } from "react";
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

// Hook to detect scrolling state
function useScrollDetection() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return isScrolling;
}

function AIToolCard({
  title,
  description,
  onClick,
  category,
  imageUrl,
}: AIToolCardProps) {
  const isScrolling = useScrollDetection();

  // Stable click handler
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  // Optimized class names based on scroll state
  const cardClasses = `
    group relative overflow-hidden border cursor-pointer rounded-2xl bg-card min-h-[380px]
    ${
      isScrolling
        ? "transition-none" // Disable transitions during scroll
        : "hover:shadow-2xl transition-transform transition-shadow duration-300 hover:-translate-y-3"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  const imageClasses = `
    object-cover w-full h-full
    ${
      isScrolling
        ? "" // No scaling during scroll
        : "transition-transform duration-500 group-hover:scale-105"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  // Simplified gradient overlay - no backdrop blur during scroll
  const overlayClasses = `
    absolute inset-0 transition-opacity duration-300
    ${
      isScrolling
        ? "bg-black/50" // Solid overlay during scroll
        : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  // Badge classes optimized for scroll
  const badgeBaseClasses = `
    text-xs font-semibold text-white px-3 py-2 rounded-full border border-white/20
    ${
      isScrolling
        ? "bg-black/60" // Solid background during scroll
        : "bg-black/40 backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  const aiPoweredClasses = `
    border border-white/30 rounded-full px-3 py-1
    ${
      isScrolling
        ? "bg-white/30" // Solid background during scroll
        : "bg-white/20 backdrop-blur-md group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  const buttonClasses = `
    font-medium px-6 py-2 rounded-xl
    ${
      isScrolling
        ? "" // No effects during scroll
        : "transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transform group-hover:scale-105"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  const accentClasses = `
    absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 origin-center
    ${
      isScrolling
        ? "scale-x-0" // Keep hidden during scroll
        : "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
    }
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <Card
      className={cardClasses}
      onClick={handleClick}
      style={{
        contain: "layout style paint",
        willChange: isScrolling ? "auto" : "transform",
      }}
    >
      {/* Background Image */}
      {imageUrl && (
        <div
          className="relative h-48 overflow-hidden"
          style={{ willChange: isScrolling ? "auto" : "transform" }}
        >
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={imageClasses}
            fill
          />
          <div className={overlayClasses} />
        </div>
      )}

      {/* Badges */}
      {category && (
        <div className="absolute top-4 right-4">
          <span className={badgeBaseClasses}>{category}</span>
        </div>
      )}

      <div className="absolute top-4 left-4">
        <div className={aiPoweredClasses}>
          <span className="text-white text-xs font-semibold flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 relative z-10 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div className="space-y-4 flex-1">
          <h3
            className={`
            font-[Plus_Jakarta_Sans] font-bold text-xl text-card-foreground line-clamp-2
            ${
              isScrolling
                ? ""
                : "group-hover:text-primary transition-colors duration-300"
            }
          `}
          >
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
            className={buttonClasses}
          >
            Try Now
            <ArrowRight
              className={`
              ml-2 h-4 w-4
              ${
                isScrolling
                  ? ""
                  : "transform group-hover:translate-x-1 transition-transform duration-300"
              }
            `}
            />
          </Button>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className={accentClasses} />
    </Card>
  );
}

// Enhanced memoization with scroll state consideration
export default memo(
  AIToolCard,
  (prev, next) =>
    prev.title === next.title &&
    prev.description === next.description &&
    prev.category === next.category &&
    prev.imageUrl === next.imageUrl &&
    prev.onClick === next.onClick
);
