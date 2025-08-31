import React from "react";
import { cn } from "@/app/lib/utils";

interface SpaceHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
  className?: string;
}

export function SpaceHeading({ 
  children, 
  level = 1, 
  gradient = false, 
  className 
}: SpaceHeadingProps) {
  const baseStyles = "font-primary font-bold tracking-wide";
  
  const sizeStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl",
    5: "text-lg md:text-xl lg:text-2xl",
    6: "text-base md:text-lg lg:text-xl"
  };
  
  const gradientStyles = gradient 
    ? "bg-gradient-to-r from-blue-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent"
    : "text-white";

  const className_combined = cn(
    baseStyles,
    sizeStyles[level],
    gradientStyles,
    className
  );
  
  return React.createElement(`h${level}`, { className: className_combined }, children);
}