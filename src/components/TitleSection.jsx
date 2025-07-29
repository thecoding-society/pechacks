import { motion } from "framer-motion";

export const TitleSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="space-y-3 w-full px-4"
    >
      <div className="space-y-2 sm:space-y-1">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Main heading with enhanced glow effect */}
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black relative leading-[1.1] cursor-default font-[Poppins]">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent blur-sm animate-pulse">
              PEC&nbsp;HACKS
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
              PEC&nbsp;HACKS
            </span>
            <span className="relative bg-gradient-to-r from-white via-cyan-200 via-purple-200 via-pink-200 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
              PEC&nbsp;HACKS
            </span>
          </h1>
        </motion.div>

        {/* Version number with rotating circles */}
        <motion.div
          className="relative flex justify-center mt-2 sm:mt-4"
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
        >
          <div className="relative group">
            {/* Spinner Circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[clamp(8rem,20vw,16rem)] h-[clamp(6rem,10vw,10rem)] border-2 border-cyan-400/30 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div
                  className="absolute inset-[0.5rem] border border-purple-500/50 rounded-full animate-spin"
                  style={{
                    animationDuration: "6s",
                    animationDirection: "reverse",
                  }}
                >
                  <div
                    className="absolute inset-[0.5rem] border border-pink-500/30 rounded-full animate-spin"
                    style={{ animationDuration: "4s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Version number with same glow effect as PEC HACKS */}
            <h2 className="relative text-[clamp(3.5rem,8vw,6rem)] font-black cursor-default">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent blur-sm animate-pulse">
                3.0
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                3.0
              </span>
              <span className="relative bg-gradient-to-r from-white via-cyan-200 via-purple-200 via-pink-200 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                3.0
              </span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Subtitle */}
      <motion.div
        className="text-[clamp(1.3rem,1.8vw,1.8rem)] font-light max-w-[90vw] md:max-w-3xl mx-auto leading-relaxed space-y-2 sm:space-y-2 font-[Poppins]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          ease: "easeOut",
        }}
      >
        <p className="cursor-default">
          <span className="text-gray-300 font-semibold">Tamil Nadu's </span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold animate-gradient bg-[length:200%_200%]">
            Largest Hackathon
          </span>
        </p>
        <p>
          <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold text-4xl sm:text-5xl cursor-default animate-blink">
            Coming Soon
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
