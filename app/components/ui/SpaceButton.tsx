import React from 'react';
import { cn } from '@/app/lib/utils';

export interface SpaceButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

const SpaceButton: React.FC<SpaceButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  // Size variants
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant styles with glass morphism and space theme
  const variantStyles = {
    primary: {
      base: 'bg-gradient-to-r from-blue-600 to-teal-600 text-white border border-blue-500/30 shadow-lg shadow-blue-500/25',
      hover: 'hover:from-blue-500 hover:to-teal-500 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105',
      focus: 'focus:ring-blue-500',
      active: 'active:scale-95',
    },
    secondary: {
      base: 'bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-lg shadow-black/25',
      hover: 'hover:bg-white/20 hover:border-white/30 hover:shadow-xl hover:shadow-black/40 hover:scale-105',
      focus: 'focus:ring-white/50',
      active: 'active:scale-95',
    },
    ghost: {
      base: 'bg-transparent text-white border border-transparent',
      hover: 'hover:bg-white/10 hover:border-white/20 hover:backdrop-blur-sm hover:scale-105',
      focus: 'focus:ring-white/30',
      active: 'active:scale-95',
    },
  };

  const selectedVariant = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        baseStyles,
        sizeStyles[size],
        selectedVariant.base,
        selectedVariant.hover,
        selectedVariant.focus,
        selectedVariant.active,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SpaceButton;