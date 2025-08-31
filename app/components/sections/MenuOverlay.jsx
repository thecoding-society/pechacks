"use client";

import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaGlobe,
  FaHandshake,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const topMenus = [
    { name: "Home", icon: <FaHome size={24} /> },
    { name: "About", icon: <FaInfoCircle size={24} /> },
    { name: "Domain", icon: <FaGlobe size={24} /> },
  ];

  const bottomMenus = [
    { name: "Partners", icon: <FaHandshake size={24} /> },
    { name: "Contact", icon: <FaEnvelope size={24} /> },
    { name: "Help", icon: <FaQuestionCircle size={24} /> },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg"
      >
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-between py-8 transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top 3 icons */}
        <div className="flex flex-col items-center space-y-6">
          {topMenus.map((item, index) => (
            <div key={item.name} className="relative flex items-center">
              <button
                onMouseEnter={() => setActive(item.name)}
                onMouseLeave={() => setActive("")}
                className="p-3 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                style={{ transitionDelay: open ? `${index * 100}ms` : "0ms" }}
              >
                {item.icon}
              </button>
              {active === item.name && (
                <div className="absolute left-16 bg-gray-800 px-3 py-1 rounded-md whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
        >
          <FaTimes size={24} />
        </button>

        {/* Bottom 3 icons */}
        <div className="flex flex-col items-center space-y-6">
          {bottomMenus.map((item, index) => (
            <div key={item.name} className="relative flex items-center">
              <button
                onMouseEnter={() => setActive(item.name)}
                onMouseLeave={() => setActive("")}
                className="p-3 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                style={{ transitionDelay: open ? `${index * 100}ms` : "0ms" }}
              >
                {item.icon}
              </button>
              {active === item.name && (
                <div className="absolute left-16 bg-gray-800 px-3 py-1 rounded-md whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
