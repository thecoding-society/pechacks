import React from 'react';
import { cn } from '@/app/lib/utils';

interface CosmicSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export function CosmicSection({ 
  children, 
  id,
  className,
  containerClassName
}: CosmicSectionProps) {
  return (
    <section 
      id={id}
      className={cn("py-20 px-4 sm:px-6 lg:px-8", className)}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle,
  titleClassName,
  subtitleClassName,
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2 className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
        "bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 bg-clip-text text-transparent",
        "font-major-mono",
        titleClassName
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
          "font-electrolize",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
