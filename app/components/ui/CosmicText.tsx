import React from 'react';
import { cn } from '@/app/lib/utils';

interface CosmicTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'accent';
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
  glow?: boolean;
}

export function CosmicText({ 
  variant = 'body',
  className,
  children,
  gradient = false,
  glow = false
}: CosmicTextProps) {
  const baseStyles = "transition-all duration-300";
  
  const variants = {
    h1: "text-4xl md:text-6xl lg:text-7xl font-bold font-major-mono",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold font-bungee",
    h3: "text-2xl md:text-3xl font-bold font-michroma",
    h4: "text-xl md:text-2xl font-semibold font-electrolize",
    body: "text-base md:text-lg font-rajdhani",
    caption: "text-sm font-electrolize",
    accent: "text-lg font-audiowide font-bold tracking-wide"
  };

  const gradientStyle = gradient 
    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 bg-clip-text text-transparent"
    : "";

  const glowStyle = glow 
    ? "drop-shadow-[0_0_20px_rgba(0,191,255,0.5)]"
    : "";

  const classes = cn(
    baseStyles,
    variants[variant],
    gradient && gradientStyle,
    glow && glowStyle,
    className
  );

  switch (variant) {
    case 'h1':
      return <h1 className={classes}>{children}</h1>;
    case 'h2':
      return <h2 className={classes}>{children}</h2>;
    case 'h3':
      return <h3 className={classes}>{children}</h3>;
    case 'h4':
      return <h4 className={classes}>{children}</h4>;
    default:
      return <p className={classes}>{children}</p>;
  }
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  duration = 2000,
  prefix = "",
  suffix = "",
  className
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(easeOutQuad * end));

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span className={cn("font-major-mono", className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
