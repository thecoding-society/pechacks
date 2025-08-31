"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Define interfaces for the component props
interface NavItem {
  name: string;
  href: string;
}

interface FloatingNavbarProps {
  navItems: NavItem[];
  logoImage?: string;
}

export function FloatingNavbar({ navItems, logoImage }: FloatingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Check if we're at the top of the page (home section)
      const atTop = window.scrollY < 50;
      setIsHome(atTop);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "w-[90%]" : "w-[85%]"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isOpen
            ? "rounded-xl bg-black/30 backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
            : scrolled
            ? "rounded-full bg-black/30 backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
            : isHome
            ? "rounded-full bg-transparent border-transparent"
            : "rounded-full bg-black/20 backdrop-blur-md border border-gray-700/30"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Fixed with proper image container */}
            <div className="flex-shrink-0">
              <Link href="#home" className="flex items-center">
                <div className="relative h-10 w-40">
                  {" "}
                  {/* Proper container with dimensions */}
                  <Image
                    src={logoImage || "/pechacks bgr.png"}
                    alt="PEC HACKS 3.0 Logo"
                    fill
                    className="object-contain" // Maintains aspect ratio
                    sizes="(max-width: 768px) 160px, 160px"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex space-x-8 mx-auto">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Positioned on the right */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Spacer to balance the logo on the left for desktop */}
            <div className="hidden md:block flex-shrink-0">
              <div className="h-8 w-8"></div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden px-4 pt-2 pb-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 py-2 text-center font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Example usage in a page
export default function DemoPage() {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Domains", href: "#domains" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <FloatingNavbar navItems={navItems} logoImage="/hackathon-logo.png" />

      {/* Home Section */}
      <section id="home" className="min-h-screen pt-32 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-cyan-400">PEC HACKS 3.0</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          A 36-hour hackathon where developers, designers, and innovators come
          together to build the future.
        </p>
      </section>

      {/* Other Sections */}
      {["About", "Domains", "Partners", "Contact"].map((section) => (
        <section
          key={section}
          id={section.toLowerCase()}
          className="min-h-screen pt-32 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-8 text-center">
              {section}
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <p className="text-gray-400 text-center">
                Content for the {section} section would appear here.
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
