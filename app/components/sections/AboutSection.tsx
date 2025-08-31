"use client";
import React, { useEffect, useRef } from "react";
import { SpaceSectionHeader } from "../SpaceSectionHeader"; // Import the component

// LordIcon wrapper component with proper initialization
interface LordIconProps {
  src: string;
  trigger?: string;
  colors?: string;
  style?: React.CSSProperties;
  delay?: string | number;
  state?: string;
  className?: string;
}

const LordIcon: React.FC<LordIconProps> = ({
  src,
  trigger = "hover",
  colors,
  style,
  delay,
  state,
  className = "",
}) => {
  const iconRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize the icon when the component mounts
    const initializeIcon = () => {
      if (iconRef.current) {
        // @ts-ignore
        if (window.lordIcon) {
          // @ts-ignore
          window.lordIcon.create(iconRef.current);
        }
      }
    };

    // Check if Lordicon is already loaded
    if ((window as any).lordIcon) {
      initializeIcon();
    } else {
      // Wait for Lordicon to load
      window.addEventListener("lordiconloaded", initializeIcon);
    }

    return () => {
      window.removeEventListener("lordiconloaded", initializeIcon);
    };
  }, []);

  return React.createElement("lord-icon", {
    ref: iconRef,
    src,
    trigger,
    colors,
    style,
    delay,
    state,
    class: className,
  });
};

export function AboutSection() {
  return (
    <div id="about" className="min-h-screen bg-transparent text-white p-8">
      <div className="max-w-6xl mx-auto">
        <SpaceSectionHeader
          title="About"
          
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-cyan-300">
                Welcome, Innovators and Change-Makers!
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                "Introducing{" "}
                <span className="font-semibold text-cyan-300 tracking-wide">
                  PEC HACKS 3.0
                </span>
                – where boundless creativity meets game-changing innovation!
                Hosted by
                <span className="font-semibold text-white">
                  {" "}
                  PANIMALAR ENGINEERING COLLEGE, CHENNAI, TAMILNADU,
                </span>{" "}
                this hackathon is your golden ticket to transform ideas into
                impactful solutions. Team up, tackle real-world challenges, and
                push the boundaries of technology."
              </p>
            </div>

            {/* Buttons have been removed as requested */}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Hackers Count */}
              <div className="text-center p-4 bg-transparent rounded-xl">
                <div className="flex justify-center mb-2">
                  <LordIcon
                    src="https://cdn.lordicon.com/srupsmbe.json"
                    trigger="loop"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div className="text-3xl font-mono text-cyan-400 mb-1">
                  300+
                </div>
                <p className="text-gray-300 text-sm">Hackers</p>
              </div>

              {/* Projects Count */}
              <div className="text-center p-4 bg-transparent rounded-xl">
                <div className="flex justify-center mb-2">
                  <LordIcon
                    src="https://cdn.lordicon.com/ogjpwrxe.json"
                    trigger="loop"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div className="text-3xl font-mono text-cyan-400 mb-1">60+</div>
                <p className="text-gray-300 text-sm">Projects</p>
              </div>

              {/* Prizes Count */}
              <div className="text-center p-4 bg-transparent rounded-xl">
                <div className="flex justify-center mb-2">
                  <LordIcon
                    src="https://cdn.lordicon.com/vttzorhw.json"
                    trigger="loop"
                    delay="1500"
                    state="in-reveal"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div className="text-3xl font-mono text-yellow-400 mb-1">8</div>
                <p className="text-gray-300 text-sm">Prizes</p>
              </div>

              {/* Prize Pool */}
              <div className="text-center p-4 bg-transparent rounded-xl">
                <div className="flex justify-center mb-2">
                  <LordIcon
                    src="https://cdn.lordicon.com/ytklkgsc.json"
                    trigger="loop"
                    delay="1500"
                    state="in-reveal"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div className="text-3xl font-mono text-green-400 mb-1">
                  ₹ 19 Lakhs
                </div>
                <p className="text-gray-300 text-sm">Prize Pool</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load Lordicon script */}
      <script src="https://cdn.lordicon.com/lordicon.js" async />
    </div>
  );
}
