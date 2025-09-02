"use client";
import React, { useEffect, useRef } from "react";
import { CosmicSection } from "../ui/CosmicSection";
import { SpaceSectionHeader } from "../SpaceSectionHeader";
import {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardContent,
} from "../ui/CosmicCard";
import { CosmicButton } from "../ui/CosmicButton";
import { CosmicText, AnimatedCounter } from "../ui/CosmicText";
import Image from "next/image";

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
  // Patrons data
  const patrons = [
    {
      id: 1,
      name: "Dr. P Chinnadurai",
      title: "Secretary & Correspondent",
      image: "/chinna-durai.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Dr. C Sakthi Kumar",
      title: "Director",
      image: "/sakthi-kumar.jpg", // Replace with actual image path
    },
    {
      id: 3,
      name: "Mrs.C Vijayarajeswari",
      title: "Director",
      image: "/rajeswari-1.jpg", // Replace with actual image path
    },
    {
      id: 4,
      name: "Dr. Saranya Sree Sakthi Kumar",
      title: "Director",
      image: "/saranya-sree-sakthi-kumar.jpg", // Replace with actual image path
    },
    {
      id: 5,
      name: "Dr.S.Prasanna Devi",
      title: "Chief Academic Officer",
      image: "/coa.png", // Replace with actual image path
    },
  ];

  return (
    <CosmicSection id="about" className="relative back_about not-selectable">
      {/* Background gradient overlay */}

      <div className="relative z-10 container abo-pat">
        {/* Particle Background - This would need a proper implementation */}
        <div id="particles-about" className="absolute inset-0"></div>

        <div className="aos-init" data-aos="fade-down" data-aos-once="true">
          {/* HEADING */}
          <SpaceSectionHeader title="About" />
          {/* end of heading */}

          <div className="about-section flex flex-col lg:flex-row items-center justify-between -mt-20 ">
            <div
              className="col-lg-5 self-center aos-init mb-10 lg:mb-0"
              data-aos="zoom-in"
              data-aos-once="true"
              style={{ fontFamily: "'Passion One', sans-serif" }}
            >
              <br />
              <CosmicText
                variant="h3"
                className="text-cyan-300 mb-6 text-center"
              >
                Welcome, Innovators and Change-Makers!
              </CosmicText>
              <br />
              <CosmicText
                variant="body"
                className="about-para text-gray-300 leading-relaxed mb-8 text-xl "
              >
                "Introducing{" "}
                <span className="font-semibold text-cyan-300 tracking-wide">
                  PEC HACKS 3.0
                </span>
                – where boundless creativity meets game-changing innovation!
                Hosted by
                <span className="font-semibold text-white ">
                  {" "}
                  PANIMALAR ENGINEERING COLLEGE, CHENNAI, TAMILNADU,
                </span>{" "}
                this hackathon is your Golden-ticket to transform bold ideas
                into impactful solutions. Join us on this electrifying journey
                as you team up with brilliant minds, tackle real-world
                challenges, and push the boundaries of technology."
              </CosmicText>

              <div className="icon-container grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="icon-man text-center">
                  <span className="center flex justify-center">
                    <LordIcon
                      src="https://cdn.lordicon.com/srupsmbe.json"
                      trigger="loop"
                      colors="primary:#7ee3ff,secondary:#7ee3ff"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </span>
                  <p className="text-gray-300 mt-2">300+ Hackers</p>
                </div>

                <div className="icon-projects text-center">
                  <span className="center flex justify-center">
                    <LordIcon
                      src="https://cdn.lordicon.com/ogjpwrxe.json"
                      trigger="loop"
                      colors="primary:#7ee3ff,secondary:#7ee3ff"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </span>
                  <p className="text-gray-300 mt-2">60+ Projects</p>
                </div>

                <div className="icon-projects text-center">
                  <span className="center flex justify-center">
                    <LordIcon
                      src="https://cdn.lordicon.com/vttzorhw.json"
                      trigger="loop"
                      delay="1500"
                      state="in-reveal"
                      colors="primary:#f0abfc,secondary:#f0abfc"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </span>
                  <p className="text-gray-300 mt-2">8 Prizes</p>
                </div>

                <div className="icon-projects text-center">
                  <span className="center flex justify-center">
                    <LordIcon
                      src="https://cdn.lordicon.com/ytklkgsc.json"
                      trigger="loop"
                      delay="1500"
                      state="in-reveal"
                      colors="primary:#86efac,secondary:#86efac"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </span>
                  <p className="text-gray-300 mt-2">
                    Prize Pool - ₹ 19 Lakhs <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* Patrons Section */}
        <SpaceSectionHeader title="Our Patrons" />

        <div className="flex flex-col gap-8 -mt-20">
          {/* First row with 2 boxes - increased size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
            {patrons.slice(0, 2).map((patron) => (
              <CosmicCard
                key={patron.id}
                variant="default"
                hover
                className="p-8 h-full min-h-[180px] flex items-center"
              >
                <div className="flex items-center gap-6 w-full">
                  {/* Patron Image - increased size */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/50">
                      <Image
                        src={patron.image}
                        alt={patron.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Patron Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">
                      {patron.name}
                    </h3>
                    <p className="text-gray-400">{patron.title}</p>
                  </div>
                </div>
              </CosmicCard>
            ))}
          </div>

          {/* Second row with 3 boxes - increased size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-8xl">
            {patrons.slice(2, 5).map((patron) => (
              <CosmicCard
                key={patron.id}
                variant="default"
                hover
                className="p-6 h-full min-h-[160px] flex items-center"
              >
                <div className="flex items-center gap-4 w-full">
                  {/* Patron Image - increased size */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/50">
                      <Image
                        src={patron.image}
                        alt={patron.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Patron Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-cyan-300 mb-1">
                      {patron.name}
                    </h3>
                    <p className="text-sm text-gray-400">{patron.title}</p>
                  </div>
                </div>
              </CosmicCard>
            ))}
          </div>

          {/* Modified last row with 2 boxes - college logo and GDG logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
            {/* College logo box */}
            <CosmicCard
              variant="default"
              hover
              className="p-6 h-full min-h-[140px] flex items-center"
            >
              <div className="flex items-center gap-6 w-full">
                {/* College Logo - no rounded corners */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 overflow-hidden">
                    <Image
                      src="/image (1).png" // Replace with actual college logo path
                      alt="Panimalar Engineering College"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Organised By text */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    Organised By
                  </h3>
                  <p className="text-sm text-gray-400">
                    Panimalar Engineering College
                  </p>
                </div>
              </div>
            </CosmicCard>

            {/* GDG logo box */}
            <CosmicCard
              variant="default"
              hover
              className="p-2 h-full min-h-[140px] flex items-center"
            >
              <div className="flex items-center gap-6 w-full">
                {/* GDG Logo - no rounded corners */}
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-40 overflow-hidden">
                    <Image
                      src="/gdg-bg-remove.png" // Replace with actual GDG logo path
                      alt="Google Developer Groups"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* GDG Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-cyan-300 mb-1">
                    In Association With
                  </h3>
                  <p className="text-sm text-gray-400">
                    Google Developer Groups
                  </p>
                </div>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>

      {/* Load Lordicon script */}
      <script src="https://cdn.lordicon.com/lordicon.js" async />
    </CosmicSection>
  );
}
