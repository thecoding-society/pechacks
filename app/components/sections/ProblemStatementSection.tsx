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
      image: "/images/healthcare.jpg", // Replace with actual image path
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
      image: "/images/fintech.jpg", // Replace with actual image path
    },
    {
      id: "edutech",
      title: "Education Technology",
      icon: "📚",
      description:
        "Transform learning experiences through technology to make education more accessible and effective.",
      color: "from-purple-500 to-indigo-500",
      challenges: [
        "Personalized Learning",
        "Remote Education",
        "Skill Development",
      ],
      difficulty: "Intermediate",
      image: "/images/edutech.jpg", // Replace with actual image path
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
      image: "/images/sustainability.jpg", // Replace with actual image path
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      icon: "💡",
      description:
        "Develop groundbreaking solutions without constraints in this creative free-for-all category.",
      color: "from-blue-500 to-cyan-500",
      challenges: [
        "Creative Freedom",
        "Cross-Disciplinary",
        "Disruptive Ideas",
      ],
      difficulty: "All Levels",
      image: "/images/innovation.jpg", // Replace with actual image path
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
      case "All Levels":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <CosmicSection id="problem-statement" className="relative">
      {/* Animated background */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative z-10">
        <SpaceSectionHeader
          title="Problem Statements"
          subtitle="Choose your mission and solve challenges that matter to the universe"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 -mt-20">
          {problemTracks.map((track) => (
            <CosmicCard
              key={track.id}
              variant="feature"
              hover
              glow
              className="group cursor-pointer relative overflow-hidden p-0"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  {/* Placeholder for image - replace with actual Image component */}
                  <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                    <span className="text-6xl">{track.icon}</span>
                  </div>
                  {/* Uncomment when you have actual images */}
                  {/* <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}

                  {/* Difficulty badge */}
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(
                      track.difficulty
                    )} z-20`}
                  >
                    {track.difficulty}
                  </span>
                </div>

                {/* Content area */}
                <div className="flex-1 p-6 flex flex-col">
                  <CosmicCardHeader className="p-0 mb-4">
                    <CosmicCardTitle className="text-xl mb-3">
                      {track.title}
                    </CosmicCardTitle>
                  </CosmicCardHeader>

                  <CosmicCardContent className="p-0 flex-1">
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {track.description}
                    </p>

                    <div className="space-y-3 mt-auto">
                      <h4 className="text-sm font-bold font-electrolize text-cyan-300 uppercase tracking-wider">
                        Key Challenges
                      </h4>
                      <ul className="space-y-1">
                        {track.challenges.map((challenge, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-400 flex items-center"
                          >
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CosmicCardContent>
                </div>
              </div>
            </CosmicCard>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <CosmicCard variant="highlight" className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold font-bungee text-white">
                Ready to Take on the Challenge?
              </h3>
              <p className="text-lg text-gray-300 font-rajdhani">
                Register now to access detailed problem statements, starter
                code, and resources to help you build winning solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CosmicButton variant="primary" size="lg" glow>
                  Register for{" "}
                  <span className="font-transformers tracking-wide">
                    PEC HACKS 3.0
                  </span>
                </CosmicButton>
                <CosmicButton variant="ghost" size="lg">
                  Download Problem Pack
                </CosmicButton>
              </div>
            </div>
          </CosmicCard>
        </div>
      </div>
    </CosmicSection>
  );
}