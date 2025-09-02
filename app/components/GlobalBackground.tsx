"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

interface GlobalBackgroundProps {
  onGlobeLoad?: () => void;
}

// Dynamically import the globe component with SSR disabled
const GlobeDemo = dynamic(
  () => import("./ui/GlobeComponent").then((m) => ({ default: m.GlobeDemo })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    ),
  }
);

export function GlobalBackground({ onGlobeLoad }: GlobalBackgroundProps) {
  React.useEffect(() => {
    if (onGlobeLoad) {
      // Simulate globe loading
      setTimeout(onGlobeLoad, 1500);
    }
  }, [onGlobeLoad]);

  // Button handlers with URLs
  const handleVisitClick = () => {
    window.open("https://two.pechacks.org/", "_blank");
  };

  const handleCommunityClick = () => {
    window.open("https://chat.whatsapp.com/FtFHlapbGqPBxtZomqR5Km", "_blank"); // Replace with actual community URL
  };

  const handlePreregisterClick = () => {
    window.open("https://forms.office.com/r/quWQDSF8BS", "_blank"); // Replace with actual preregister URL
  };

  return (
    <div className="relative w-full min-h-screen md:mt-10 lg:h-screen">
      {/* Add font import in style tag */}
      <style>
        {`@import url('https://fonts.cdnfonts.com/css/transformers-2');`}
      </style>

      {/* Main hero section */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">
        {/* Mobile globe section - positioned at top on mobile */}
        <div className="lg:hidden mt-14 w-full h-80 flex items-center justify-center order-1 py-4 px-4">
          <div className="w-full max-w-xs aspect-square">
            <GlobeDemo onLoad={onGlobeLoad} />
          </div>
        </div>

        {/* Hero content - takes full width on mobile, left half on desktop */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full flex items-center justify-center lg:justify-start px-6 md:px-12 lg:px-20 order-2 lg:order-1 py-2 lg:py-0">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent tracking-wider"
              style={{ fontFamily: "'Transformers', sans-serif" }}
            >
              PEC HACKS 3.0
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-4xl font-bold font-electrolize text-white mb-8 uppercase
              tracking-wider"
            >
              National Level Hackathon
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col gap-4"
            >
              {/* Top row with two buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Visit 2.0 Button */}
                <button
                  onClick={handleVisitClick}
                  className="group px-6 py-3 border-2 border-cyan-500 hover:border-cyan-400 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden flex-1"
                >
                  <span>Visit 2.0</span>
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Join Our Community Button */}
                <button
                  onClick={handleCommunityClick}
                  className="group px-6 py-3 border-2 border-teal-500 hover:border-teal-400 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30 relative overflow-hidden flex-1"
                >
                  <span>Join Our Community</span>
                  <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Pre-register Here Button - full width below */}
              <button
                onClick={handlePreregisterClick}
                className="group px-6 py-3 border-2 border-purple-500 hover:border-purple-400 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden"
              >
                <span>Pre-register Here</span>
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Globe section for desktop - right half */}
        <div className="hidden lg:flex lg:w-1/2 h-full items-center justify-center order-3 lg:order-2 p-8">
          <div className="w-full aspect-square max-w-lg">
            <GlobeDemo onLoad={onGlobeLoad} />
          </div>
        </div>
      </div>
    </div>
  );
}
