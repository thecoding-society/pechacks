import React from 'react';
import { cn } from '@/app/lib/utils';

interface CosmicLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CosmicLoader({ size = 'md', className }: CosmicLoaderProps) {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn("relative", sizeStyles[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin animate-reverse animation-delay-150"></div>
      <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-green-400 animate-spin animation-delay-300"></div>
    </div>
  );
}

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative">
          <CosmicLoader size="lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold font-transformers bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 bg-clip-text text-transparent tracking-wider">
            PEC HACKS 3.0
          </h1>
          <p className="text-gray-400 font-electrolize">
            Initializing cosmic systems...
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce animation-delay-150"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
