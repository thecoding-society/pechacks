import React from 'react';
import { cn } from '@/app/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function ResponsiveContainer({ 
  children, 
  className,
  size = 'lg' 
}: ResponsiveContainerProps) {
  const sizeStyles = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizeStyles[size],
      className
    )}>
      {children}
    </div>
  );
}

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function Spacer({ size = 'md', className }: SpacerProps) {
  const sizeStyles = {
    xs: 'h-2',
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-16',
    xl: 'h-24',
    '2xl': 'h-32'
  };

  return <div className={cn(sizeStyles[size], className)} />;
}

interface GridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export function Grid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3 },
  gap = 6,
  className 
}: GridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const gapStyles = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12'
  };

  const buildGridClasses = () => {
    let classes = ['grid'];
    
    if (cols.default) classes.push(gridCols[cols.default as keyof typeof gridCols]);
    if (cols.sm) classes.push(`sm:${gridCols[cols.sm as keyof typeof gridCols]}`);
    if (cols.md) classes.push(`md:${gridCols[cols.md as keyof typeof gridCols]}`);
    if (cols.lg) classes.push(`lg:${gridCols[cols.lg as keyof typeof gridCols]}`);
    if (cols.xl) classes.push(`xl:${gridCols[cols.xl as keyof typeof gridCols]}`);
    
    classes.push(gapStyles[gap as keyof typeof gapStyles] || 'gap-6');
    
    return classes.join(' ');
  };

  return (
    <div className={cn(buildGridClasses(), className)}>
      {children}
    </div>
  );
}
