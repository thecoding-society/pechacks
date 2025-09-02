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

export function ProblemStatementSection() {
  const problemTracks = [
    {
      id: "healthcare",
      title: "Digital Healthcare",
      icon: "🏥",
      description:
        "Revolutionize healthcare with digital solutions for better patient care and medical research.",
      color: "from-red-500 to-rose-500",
      challenges: ["Telemedicine", "Health Analytics", "Medical IoT"],
      difficulty: "Intermediate",
    },
    {
      id: "fintech",
      title: "Financial Technology",
      icon: "💰",
      description:
        "Innovate in digital payments, banking, and financial services for the next generation.",
      color: "from-yellow-500 to-orange-500",
      challenges: ["Digital Payments", "Micro-lending", "Investment Tools"],
      difficulty: "Advanced",
    },
    {
      id: "edutech",
      title: "Education Technology",
      icon: "🎓",
      description:
        "Transform learning experiences through technology to make education more accessible and effective.",
      color: "from-blue-500 to-cyan-500",
      challenges: [
        "Personalized Learning",
        "Remote Education",
        "Skill Development",
      ],
      difficulty: "Intermediate",
    },
    {
      id: "sustainability",
      title: "Sustainability & Green Tech",
      icon: "🌱",
      description:
        "Create eco-friendly solutions to combat climate change and promote sustainable living.",
      color: "from-green-500 to-emerald-500",
      challenges: ["Carbon Tracking", "Renewable Energy", "Waste Management"],
      difficulty: "Intermediate",
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      icon: "💡",
      description:
        "Develop groundbreaking solutions without constraints - the future is what you imagine.",
      color: "from-purple-500 to-pink-500",
      challenges: [
        "Wildcard Projects",
        "Experimental Tech",
        "Boundary-pushing Ideas",
      ],
      difficulty: "Any Level",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-orange-500";
      case "Expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <CosmicSection id="problem-statement" className="relative">
      {/* Animated background */}

      <div className="relative z-10">
        <SpaceSectionHeader
          title="Problem Statements"
          subtitle="Choose your mission and solve challenges that matter to the universe"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-20">
          {problemTracks.map((track, index) => (
            <CosmicCard
              key={track.id}
              variant="feature"
              hover
              glow
              className="group cursor-pointer relative overflow-hidden"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <CosmicCardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{track.icon}</div>
                  </div>
                  <CosmicCardTitle className="text-xl mb-3">
                    {track.title}
                  </CosmicCardTitle>
                </CosmicCardHeader>

                <CosmicCardContent>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {track.description}
                  </p>
                </CosmicCardContent>
              </div>
            </CosmicCard>
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}
