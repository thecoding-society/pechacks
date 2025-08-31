import { cn } from "@/app/lib/utils";

interface SpaceCaptionProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "mono";
  className?: string;
}

export function SpaceCaption({ 
  children, 
  variant = "default", 
  className 
}: SpaceCaptionProps) {
  const baseStyles = "text-xs md:text-sm leading-tight";
  
  const variantStyles = {
    default: "font-secondary text-gray-400",
    accent: "font-accent text-gray-300 uppercase tracking-wider",
    mono: "font-mono text-gray-500"
  };
  
  return (
    <span 
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}