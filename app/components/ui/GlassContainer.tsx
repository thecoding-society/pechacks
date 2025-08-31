import React from 'react';
import { cn } from '@/app/lib/utils';

export interface GlassContainerProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  variant = 'primary',
  blur = 'md',
  opacity,
  className,
}) => {
  // Glass morphism variant styles
  const variantStyles = {
    primary: {
      background: opacity ? `rgba(255, 255, 255, ${opacity})` : 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    secondary: {
      background: opacity ? `rgba(255, 255, 255, ${opacity})` : 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    accent: {
      background: opacity ? `rgba(0, 191, 255, ${opacity})` : 'rgba(0, 191, 255, 0.1)',
      border: '1px solid rgba(0, 191, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 191, 255, 0.2)',
    },
  };

  // Blur intensity classes
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  const selectedVariant = variantStyles[variant];

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-300 ease-in-out',
        blurClasses[blur],
        className
      )}
      style={{
        background: selectedVariant.background,
        border: selectedVariant.border,
        boxShadow: selectedVariant.boxShadow,
        WebkitBackdropFilter: `blur(${blur === 'sm' ? '4px' : blur === 'md' ? '10px' : '16px'})`,
        backdropFilter: `blur(${blur === 'sm' ? '4px' : blur === 'md' ? '10px' : '16px'})`,
      }}
    >
      {children}
    </div>
  );
};

export default GlassContainer;