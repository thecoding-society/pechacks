"use client";
import React from 'react';
import { CosmicCard } from '../ui/CosmicCard';
import { CosmicButton } from '../ui/CosmicButton';

export function FooterSection() {
  const footerSections = [
    {
      title: "Participate",
      links: [
        { name: "Register Now", href: "#register" },
        { name: "Team Formation", href: "#teams" },
        { name: "Mentorship", href: "#mentors" },
        { name: "Workshops", href: "#workshops" },
        { name: "Resources", href: "#resources" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Discord Community", href: "#discord" },
        { name: "LinkedIn", href: "#linkedin" },
        { name: "Twitter", href: "#twitter" },
        { name: "Instagram", href: "#instagram" },
        { name: "YouTube", href: "#youtube" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#contact" },
        { name: "Technical Help", href: "#help" },
        { name: "Partnerships", href: "#partners" },
        { name: "Media Kit", href: "#media" },
        { name: "Privacy Policy", href: "#privacy" }
      ]
    }
  ];

  const socialIcons = [
    { name: "Discord", icon: "💬", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Instagram", icon: "📸", href: "#" },
    { name: "YouTube", icon: "📺", href: "#" },
    { name: "GitHub", icon: "⚡", href: "#" }
  ];

  return (
    <footer className="relative bg-black/5 backdrop-blur-2xl border-t border-white/10 py-8 shadow-2xl shadow-black/20">
      {/* Enhanced translucent background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-teal-900/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 via-green-500/2 to-teal-500/2 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - More compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand Section - Simplified */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold font-transformers bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 bg-clip-text text-transparent mb-2 tracking-wide">
              PEC HACKS 3.0
            </h3>
            <p className="text-gray-300 font-rajdhani text-sm leading-relaxed mb-3">
              The ultimate hackathon experience bringing brilliant minds together.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400 font-electrolize">
              <span>📅 March 15-17, 2024</span>
              <span>📍 PEC University</span>
            </div>
          </div>

          {/* Footer Links - Compact */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-base font-bold font-electrolize text-white mb-2">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="flex items-center space-x-2">
                    <span className="text-cyan-400 text-xs">•</span>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-300 transition-all duration-200 font-rajdhani text-sm hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Streamlined */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            {/* Copyright - Compact */}
            <div className="text-center sm:text-left">
              <p className="text-gray-400 font-rajdhani text-sm">
                © 2025 <span className="font-transformers tracking-wide text-cyan-300">PEC HACKS 3.0</span> • All rights reserved
              </p>
            </div>

            {/* Credits */}
            <div className="flex items-center">
              <p className="text-xs text-gray-500 font-rajdhani">
                Made with ❤️ by <span className="font-transformers tracking-wide text-cyan-400">PEC HACKS</span> Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
