/**
 * Centralized Color System for PEC HACKS 3.0
 * Space-themed color palette without purple/violet colors
 */

export const colors = {
  // Primary space colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Secondary space colors (cyan/aqua)
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee', // Main cyan
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  
  // Accent colors (teal/green)
  accent: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf', // Main teal
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
} as const;

/**
 * Gradient combinations for consistent theming
 */
export const gradients = {
  primary: 'from-cyan-600 via-blue-600 to-teal-500',
  primaryHover: 'from-cyan-500 via-blue-500 to-teal-400',
  text: 'from-cyan-400 via-blue-500 to-teal-500',
  background: 'from-cyan-900/5 via-blue-900/5 to-teal-900/5',
  glow: 'from-cyan-400/20 via-blue-400/20 to-teal-400/20',
  shimmer: 'from-cyan-600/0 via-white/20 to-cyan-600/0',
} as const;

/**
 * Shadow colors for consistent glow effects
 */
export const shadows = {
  primary: 'rgba(0, 191, 255, 0.5)', // Cyan shadow
  primaryStrong: 'rgba(0, 191, 255, 0.8)',
  accent: 'rgba(45, 212, 191, 0.3)', // Teal shadow
  selection: 'rgba(0, 191, 255, 0.3)',
} as const;

/**
 * CSS custom properties for dynamic theming
 */
export const cssVariables = {
  '--color-primary': '#06b6d4',
  '--color-secondary': '#22d3ee', 
  '--color-accent': '#2dd4bf',
  '--color-success': '#10b981',
  '--color-warning': '#f59e0b',
  '--color-error': '#ef4444',
  '--shadow-primary': shadows.primary,
  '--shadow-accent': shadows.accent,
} as const;

/**
 * Utility function to get color with opacity
 */
export const withOpacity = (color: string, opacity: number) => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

/**
 * Type-safe color picker
 */
export type ColorScale = keyof typeof colors.primary;
export type ColorGroup = 'primary' | 'secondary' | 'accent' | 'neutral';
export type GradientType = keyof typeof gradients;
