'use client';

import { useState, useEffect } from 'react';
import { GlobalBackground } from './components/GlobalBackground';
import { FloatingNavbar } from './components/ui/FloatingNavbar';
import { AboutSection } from './components/sections/AboutSection';
import { ProblemStatementSection } from './components/sections/ProblemStatementSection';
import { PartnerSection } from './components/sections/PartnerSection';
import { FooterSection } from './components/sections/FooterSection';
import { LoadingScreen } from './components/ui/CosmicLoader';
import { Vortex } from './components/ui/VortexBackground';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false);

  useEffect(() => {
    // Only end loading when globe is loaded and minimum time has passed
    if (isGlobeLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Additional 1 second delay after globe loads
      
      return () => clearTimeout(timer);
    }
  }, [isGlobeLoaded]);

  const handleGlobeLoad = () => {
    setIsGlobeLoaded(true);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Domains", href: "#Domains" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      <div className="relative min-h-screen bg-black text-white">
        {/* Global Vortex Background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <Vortex
            customColors={[
              "#cad6f2",
              "#72a1de",
              "#1db6d9",
              "#9dddea",
              "#74cce0",
            ]}
            backgroundColor="#000000" // Dark background to make colors pop
            particleCount={500}
            rangeY={800}
            baseSpeed={0.1}
            rangeSpeed={1}
            baseRadius={1}
            rangeRadius={2}
            containerClassName="w-full h-full"
            className="w-full h-full"
          />
        </div>

        {/* Floating Navigation - Only show when not loading */}
        {!isLoading && <FloatingNavbar navItems={navItems} />}

        {/* Content */}
        <div className="relative z-10">
          
          <section id="home">
            <GlobalBackground onGlobeLoad={handleGlobeLoad} />
          </section>

          
          <AboutSection />

          <ProblemStatementSection/>

          
          <PartnerSection />

          {/* Footer Section */}
          <FooterSection/>
        </div>
      </div>
    </>
  );
}
