import { motion } from "framer-motion";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { TitleSection } from "./components/TitleSection";
import { CTAButtons } from "./components/CTAButtons";
import { SocialLinks } from "./components/SocialLinks";
import { useEffect, useState } from "react";

export const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleWheel = (e) => {
      if (!isMobile) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleWheel);
    };
  }, [isMobile]);

  return (
    <div
      className={`${
        isMobile ? "overflow-y-auto" : "fixed inset-0 overflow-hidden"
      }`}
    >
      <BackgroundEffects>
        <header className="w-full fixed top-0 z-50 bg-transparent">
          <motion.nav
            className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:py-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <a href="#" className="flex items-center cursor-default">
              <img
                src="/pechacks-01.png"
                alt="Logo"
                className="h-6 sm:h-8 lg:ml-2 lg:mt-10 hover:scale-110 transition-transform duration-300"
              />
            </a>
          </motion.nav>
        </header>

        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center pt-20 pb-10 px-4 min-h-screen">
          <div className="max-w-4xl w-full mx-auto">
            <TitleSection />
            <CTAButtons />
            <SocialLinks />
          </div>
        </div>
      </BackgroundEffects>
    </div>
  );
};
