"use client";

import Image from "next/image";
import { SpaceSectionHeader } from "../SpaceSectionHeader";

export default function PatronsSection() {
  const patrons = [
    {
      name: "Dr. P Chinnadurai",
      title: "Secretary & Correspondent",
      img: "/chinna-durai.jpg",
    },
    {
      name: "Dr. C Sakthi Kumar",
      title: "Director",
      img: "/sakthi-kumar.jpg",
    },
    {
      name: "Mrs. C Vijayarajeswari",
      title: "Director",
      img: "/rajeswari-1.jpg",
    },
    {
      name: "Dr. Saranya Sree Sakthi Kumar",
      title: "Director",
      img: "/saranya-sree-sakthi-kumar.jpg",
    },
  ];

  // New COA entry - corrected path
  const coa = {
    name: "Dr.S.Prasanna Devi",
    title: "Chief Academic Officer",
    img: "/coa.png", // Changed to a proper public directory path
  };

  return (
    <div id="patrons" className="min-h-screen bg-transparent text-white p-8">
      <div className="max-w-8xl mx-auto">
        <SpaceSectionHeader title="Our Patrons" />

        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {/* Left Section - Patrons */}
          <div className="flex flex-col items-center md:w-2/5 z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {patrons.map((p, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-40 h-40 relative">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover rounded-full border-4 border-gray-200 shadow-md"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {p.name}
                  </h3>
                  <p className="text-gray-300">{p.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Section - COA */}
          <div className="flex flex-col items-center text-center my-12 md:my-0 md:w-1/5 z-10">
            <div className="w-40 h-40 relative">
              <Image
                src={coa.img}
                alt={coa.name}
                fill
                className="object-cover rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {coa.name}
            </h3>
            <p className="text-gray-300">{coa.title}</p>
          </div>

          {/* Right Section - Organized By - Increased sizes */}
          <div className="md:w-2/5 flex flex-col items-center text-center z-10">
            <div className="relative w-60 h-60 mb-6">
              {" "}
              {/* Increased from w-28 h-28 to w-40 h-40 */}
              <Image
                src="/image (1).png"
                alt="College Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xl font-medium text-white mb-2">Organized By</p>{" "}
            {/* Increased from text-lg to text-xl */}
            <p className="font-bold text-white text-2xl mb-1">
              {" "}
              {/* Increased font size and weight */}
              Panimalar Engineering College
            </p>
            <p className="text-gray-300 text-lg">
              (An Autonomous Institution)
            </p>{" "}
            {/* Increased from default to text-lg */}
            <div className="mt-12">
              {" "}
              {/* Increased margin from mt-10 to mt-12 */}
              <p className="text-xl font-medium mb-3 text-white">
                {" "}
                {/* Increased from text-lg to text-xl */}
                In-association with
              </p>
              <div className="relative w-80 h-32 ">
                {" "}
                {/* Increased from w-60 h-12 to w-80 h-16 */}
                <Image
                  src="/gdg-bg-remove.png"
                  alt="Google Developer Student Clubs"
                  fill
                  className="object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
