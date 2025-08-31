import { cn } from "@/app/lib/utils";

interface SpaceBodyProps {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg";
  variant?: "primary" | "secondary" | "muted";
  className?: string;
}

export function SpaceBody({ 
  children, 
  size = "base", 
  variant = "primary", 
  className 
}: SpaceBodyProps) {
  const baseStyles = "font-secondary leading-relaxed";
  
  const sizeStyles = {
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl"
  };
  
  const variantStyles = {
    primary: "text-white",
    secondary: "text-gray-200",
    muted: "text-gray-400"
  };
  
  return (
    <p 
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </p>
  );
}