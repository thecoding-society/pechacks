import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const BackgroundEffects = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center p-0">
      <div className="w-full flex-1 flex flex-col items-center justify-start relative">
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 animate-gradient-shift" />

        
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(30px, 3vw, 50px) clamp(30px, 3vw, 50px)",
            animation: "gridMove 15s linear infinite",
          }}
        />

        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[clamp(100px,12vw,200px)] h-[clamp(100px,12vw,200px)] bg-cyan-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse animate-float" />
          <div
            className="absolute top-3/4 right-1/4 w-[clamp(120px,15vw,240px)] h-[clamp(120px,15vw,240px)] bg-purple-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse animate-float-reverse"
            style={{ animationDelay: "2s", animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-[clamp(80px,10vw,160px)] h-[clamp(80px,10vw,160px)] bg-pink-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse animate-float"
            style={{ animationDelay: "4s", animationDuration: "7s" }}
          />
          <div
            className="absolute top-1/3 right-1/5 w-[clamp(60px,8vw,120px)] h-[clamp(60px,8vw,120px)] bg-blue-500/15 rounded-full blur-[clamp(15px,2vw,30px)] animate-pulse animate-float"
            style={{ animationDelay: "1s", animationDuration: "9s" }}
          />
        </div>

        
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(clamp(250px,30vw,600px) circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 217, 255, 0.4), 
              rgba(168, 85, 247, 0.3), 
              transparent 70%)`,
            transition: "background 0.1s ease-out",
          }}
        />

        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${
                  Math.random() * 10 + 10
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>

        {children}
      </div>
    </div>
  );
};
