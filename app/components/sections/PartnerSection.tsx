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
import Image from "next/image";

export function PartnerSection() {
  const partnershipTiers = [
    {
      title: "Title Sponsor",
      level: "Stellar",
      investment: "₹10,00,000+",
      icon: "👑",
      color: "from-yellow-500 to-orange-500",
      benefits: [
        "Exclusive title branding across all materials",
        "Prime booth space and exhibition area",
        "Speaking slot in opening ceremony",
        "Access to all participant resumes",
        "Custom workshop hosting opportunity",
        "Dedicated recruitment sessions",
      ],
    },
    {
      title: "Platinum Partner",
      level: "Cosmic",
      investment: "₹5,00,000+",
      icon: "💎",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Logo placement on all event materials",
        "Premium booth space allocation",
        "Branded swag distribution rights",
        "Judge panel participation",
        "Technical workshop opportunity",
        "Hiring booth and interview space",
      ],
    },
    {
      title: "Gold Sponsor",
      level: "Galactic",
      investment: "₹2,50,000+",
      icon: "🏆",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Brand visibility on event platforms",
        "Standard booth space",
        "Prize category sponsorship",
        "Networking session access",
        "Talent pool access",
        "Social media mentions",
      ],
    },
  ];

  // Partner data organized by category
  const partnersByCategory = {
    gold: [
      {
        name: "Devfolio",
        logo: "/Devfolio.png",
        website: "https://devfolio.co/",
      },
      {
        name: "ETH-india",
        logo: "/ETH - india.png",
        website: "https://ethindia2024.devfolio.co/",
      },
    ],
  };

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
    const link = document.createElement("a");
    link.href = "/Pec Hacks 3.0 Sponsorship Deck.pdf";
    link.download = "PEC-Hacks-3.0-Sponsorship-Deck.pdf";
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

  // Function to handle partner logo click
  const handlePartnerClick = (website) => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  // Function to render partner category section
  const renderPartnerCategory = (category, partners, title, colorClass) => {
    if (!partners || partners.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="text-center mb-8">
          <h3
            className={`text-2xl md:text-3xl font-bold font-bungee ${colorClass}`}
          >
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handlePartnerClick(partner.website)}
            >
              <div className="bg-white/5 rounded-xl  flex items-center justify-center h-32 w-56 backdrop-blur-sm border border-white/10">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain rounded-xl "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              {/* Removed the partner name display as requested */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <CosmicSection id="partners" className="relative">
      <div className="relative z-10">
        <SpaceSectionHeader
          title="Join Our Cosmic Alliance"
          subtitle="Partner with us to shape the future of technology and innovation"
        />

        {/* Why Partner Section */}
        <div className="mb-20 -mt-20">
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

        {/* Partnership Tiers */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold font-bungee text-center text-purple-300 mb-12">
            Partnership Opportunities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <CosmicCard
                key={index}
                variant="feature"
                hover
                glow
                className="relative overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <CosmicCardHeader className="text-center">
                    <div className="text-5xl mb-4">{tier.icon}</div>
                    <div className="space-y-2">
                      <CosmicCardTitle className="text-2xl">
                        {tier.title}
                      </CosmicCardTitle>
                      <div className="text-lg font-electrolize text-gray-300">
                        {tier.level}
                      </div>
                      <div className="text-xl font-bold font-major-mono text-cyan-400">
                        {tier.investment}
                      </div>
                    </div>
                  </CosmicCardHeader>
                  <CosmicCardContent>
                    <div className="space-y-4">
                      <h4 className="font-bold font-electrolize text-white text-center">
                        Partnership Benefits
                      </h4>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-300 flex items-start"
                          >
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CosmicCardContent>
                </div>
              </CosmicCard>
            ))}
          </div>
        </div>

        {/* Partners by Category */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold font-bungee text-center text-white mb-12">
            Our Amazing Partners
          </h3>

          {/* Gold Partners */}
          {renderPartnerCategory(
            "gold",
            partnersByCategory.gold,
            "GOLD SPONSORS",
            "text-yellow-300"
          )}
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
                  className="border-white border-2"
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
                    +91 9345404933
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
