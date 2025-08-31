import React from "react";
import { cn } from "@/app/lib/utils";

interface SpaceSubheadingProps {
  children: React.ReactNode;
  level?: 2 | 3 | 4 | 5 | 6;
  accent?: boolean;
  className?: string;
}

export function SpaceSubheading({ 
  children, 
  level = 3, 
  accent = false, 
  className 
}: SpaceSubheadingProps) {
  const baseStyles = accent ? "font-accent" : "font-primary";
  const weightStyles = "font-semibold tracking-wide";
  
  const sizeStyles = {
    2: "text-2xl md:text-3xl lg:text-4xl",
    3: "text-xl md:text-2xl lg:text-3xl",
    4: "text-lg md:text-xl lg:text-2xl",
    5: "text-base md:text-lg lg:text-xl",
    6: "text-sm md:text-base lg:text-lg"
  };
  
  const className_combined = cn(
    baseStyles,
    weightStyles,
    sizeStyles[level],
    "text-gray-200",
    className
  );
  
  return React.createElement(`h${level}`, { className: className_combined }, children);
}