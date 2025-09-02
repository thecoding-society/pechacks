"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import GlassContainer from "./GlassContainer";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNavbar({ navItems, className }: FloatingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4",
          isScrolled ? "top-2" : "top-6",
          className
        )}
      >
        <GlassContainer
          variant="primary"
          blur="lg"
          opacity={isScrolled ? 0.15 : 0.1}
          className={cn(
            "transition-all duration-500 rounded-full",
            isScrolled ? "px-4 py-2" : "px-6 py-3"
          )}
        >
          <nav className="flex items-center justify-between">
            {/* Logo/Brand on the left */}
            <div className="flex-shrink-0">
              <Image
                src="/pechacks-01.png" // Place your image in public folder
                alt="PEC HACKS 3.0 Logo"
                width={160} // Adjust based on your logo's aspect ratio
                height={40}
                className="object-contain"
              />
            </div>

            {/* Desktop navigation items on the right */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "relative text-sm font-electrolize font-medium transition-all duration-300 hover:scale-105",
                    "before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5",
                    "before:bg-gradient-to-r before:from-cyan-400 before:to-purple-500",
                    "before:scale-x-0 before:origin-left before:transition-transform before:duration-300",
                    "hover:before:scale-x-100 hover:text-cyan-300",
                    activeSection === item.href.replace("#", "")
                      ? "text-cyan-300 before:scale-x-100"
                      : "text-gray-200"
                  )}
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-cyan-300 transition-colors"
                title="Open navigation menu"
                aria-label="Open navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </GlassContainer>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4">
            <GlassContainer
              variant="primary"
              blur="lg"
              opacity={0.2}
              className="rounded-3xl"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-all duration-200",
                      "flex items-center space-x-3 font-electrolize",
                      activeSection === item.href.replace("#", "")
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-gray-200 hover:bg-white/10 hover:text-cyan-300"
                    )}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </GlassContainer>
          </div>
        </div>
      )}
    </>
  );
}
