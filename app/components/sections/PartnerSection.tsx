"use client";
import React from "react";
import { CosmicSection } from "../ui/CosmicSection";
import { SpaceSectionHeader } from "../SpaceSectionHeader";
import {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardContent,
} from "../ui/CosmicCard";
import { CosmicButton } from "../ui/CosmicButton";

export function PartnerSection() {
  // Data for the "Why Partner With Us" section
  const whyPartner = [
    {
      icon: "🎯",
      title: "Targeted Reach",
      description:
        "Connect with 500+ highly skilled developers, designers, and innovators from top institutions.",
    },
    {
      icon: "🌟",
      title: "Brand Visibility",
      description:
        "Gain exposure across multiple channels including social media, campus networks, and tech communities.",
    },
    {
      icon: "💼",
      title: "Talent Acquisition",
      description:
        "Direct access to emerging talent and the opportunity to recruit the best minds in technology.",
    },
    {
      icon: "🚀",
      title: "Innovation Access",
      description:
        "Get first-hand access to cutting-edge solutions and innovative ideas from the hackathon.",
    },
  ];

  // Function to handle the download
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "/PEC Hacks 2.0 - Sponsor Deck.pdf"; // Path to your PDF file in the public folder
    link.download = "PEC-Hacks-3.0-Sponsorship-Deck.pdf"; // The filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle email click
  const handleEmailClick = () => {
    window.location.href = "mailto:team@pechacks.org";
  };

  // Function to handle phone number click
  const handlePhoneClick = () => {
    window.location.href = "tel:+916374723471";
  };

  return (
    <CosmicSection id="partners" className="relative">
      {/* Background overlay */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative z-10">
        <SpaceSectionHeader
          title="Join Our Cosmic Alliance"
          subtitle="Partner with us to shape the future of technology and innovation"
        />

        {/* Why Partner Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold font-bungee text-center text-cyan-300 mb-12">
            Why Partner With{" "}
            <span className="font-transformers tracking-wide">
              PEC HACKS 3.0
            </span>
            ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPartner.map((reason, index) => (
              <CosmicCard
                key={index}
                variant="default"
                hover
                className="text-center"
              >
                <CosmicCardHeader>
                  <div className="text-4xl mb-4">{reason.icon}</div>
                  <CosmicCardTitle className="text-lg">
                    {reason.title}
                  </CosmicCardTitle>
                </CosmicCardHeader>
                <CosmicCardContent>
                  <p className="text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </CosmicCardContent>
              </CosmicCard>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <CosmicCard variant="highlight" className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold font-bungee text-white">
                Ready to Join Our Mission?
              </h3>
              <p className="text-lg text-gray-300 font-rajdhani">
                Be part of the most exciting hackathon in the region. Let's
                create something extraordinary together and shape the future of
                technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CosmicButton
                  variant="ghost"
                  size="lg"
                  onClick={handleDownload}
                  className="border-white border-2" // Added white border
                >
                  Download Sponsorship Deck
                </CosmicButton>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 font-electrolize">
                  Contact us:{" "}
                  <span
                    className="text-cyan-300 hover:text-cyan-200 cursor-pointer underline"
                    onClick={handleEmailClick}
                  >
                    team@pechacks.org
                  </span>{" "}
                  |{" "}
                  <span
                    className="text-cyan-300 hover:text-cyan-200 cursor-pointer underline"
                    onClick={handlePhoneClick}
                  >
                    +91 63747 23471
                  </span>
                </p>
              </div>
            </div>
          </CosmicCard>
        </div>
      </div>
    </CosmicSection>
  );
}
