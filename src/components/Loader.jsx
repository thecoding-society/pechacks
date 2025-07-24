import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Preloader = () => {
  // Loader styles
  const loaderStyle = {
    width: "fit-content",
    fontSize: "clamp(40px, 7vw, 75px)",
    fontFamily: "system-ui, sans-serif",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "transparent",
    WebkitTextStroke: "1px white",
    "--l": "transparent 45%, white 0 55%, transparent 0",
    "--g": "0 / 300% 100% no-repeat",
    background: `
      linear-gradient(-60deg, var(--l)) var(--g),
      linear-gradient(60deg, var(--l)) var(--g)
    `,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    animation: "l7 4s linear infinite",
    position: "relative",
    zIndex: 20,
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
      {/* Text loader */}
      <div className="relative z-10">
        <style>
          {`
            @keyframes l7 {
              0%  { background-position: 100%, 0; }
              50% { background-position: 0, 0; }
              100% { background-position: 0, 100%; }
            }
          `}
        </style>
        <div className="loader" style={loaderStyle}>
          PEC HACKS 3.0
        </div>
      </div>
    </div>
  );
};

export default Preloader;
