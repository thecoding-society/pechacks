import React from 'react';
import { cn } from '@/app/lib/utils';
import GlassContainer from './GlassContainer';

interface CosmicCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'feature' | 'highlight';
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function CosmicCard({ 
  children, 
  variant = 'default',
  className,
  hover = true,
  glow = false
}: CosmicCardProps) {
  const variantStyles = {
    default: "bg-white/5 border-white/10",
    feature: "bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-cyan-500/10 border-blue-500/20",
    highlight: "bg-gradient-to-br from-cyan-500/10 via-green-500/10 to-teal-500/10 border-cyan-500/20"
  };

  const glowEffect = glow ? "shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40" : "";

  return (
    <GlassContainer
      variant="primary"
      blur="md"
      className={cn(
        "p-6 border transition-all duration-500",
        variantStyles[variant],
        hover && "hover:scale-105 hover:border-opacity-40",
        glowEffect,
        className
      )}
    >
      {children}
    </GlassContainer>
  );
}

interface CosmicCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CosmicCardHeader({ children, className }: CosmicCardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface CosmicCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CosmicCardTitle({ children, className }: CosmicCardTitleProps) {
  return (
    <h3 className={cn("text-xl font-michroma font-bold text-white mb-2", className)}>
      {children}
    </h3>
  );
}

interface CosmicCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CosmicCardContent({ children, className }: CosmicCardContentProps) {
  return (
    <div className={cn("text-gray-300 font-rajdhani", className)}>
      {children}
    </div>
  );
}
