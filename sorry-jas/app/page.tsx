"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "./config";

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 5 + 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            bottom: "-50px",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [noClicks, setNoClicks] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  // Scaling factors
  const yesScale = 1 + noClicks * 0.25;
  const noScale = Math.max(0.1, 1 - noClicks * 0.1);

  // Constants based on config
  const MEME_LIST = CONFIG.assets.memes;
  const MEME_COUNT = MEME_LIST.length;
  const FINAL_STAGE = CONFIG.apologyMessages.length - 1;

  // Automatically move the button in the very last stage
  useEffect(() => {
    if (noClicks >= FINAL_STAGE && !isAccepted) {
      const interval = setInterval(() => {
        teleportNoButton(true); // pass 'true' to indicate auto-teleport
      }, 600);
      return () => clearInterval(interval);
    }
  }, [noClicks, isAccepted]);

  // Randomly teleport the "No" button
  const teleportNoButton = (isAuto = false) => {
    // If it's a manual click and we are already at the final stage, do nothing
    if (!isAuto && noClicks >= FINAL_STAGE) return;
    
    // Stop manual clicks after meme list is exhausted
    if (noClicks > FINAL_STAGE) return;

    // 1. Get the current occupied space of the YES button
    let forbiddenMinX = 30, forbiddenMaxX = 70, forbiddenMinY = 30, forbiddenMaxY = 70;
    
    if (yesButtonRef.current) {
      const rect = yesButtonRef.current.getBoundingClientRect();
      const buffer = 40; // Extra padding pixels for safety
      
      forbiddenMinX = ((rect.left - buffer) / window.innerWidth) * 100;
      forbiddenMaxX = ((rect.right + buffer) / window.innerWidth) * 100;
      forbiddenMinY = ((rect.top - buffer) / window.innerHeight) * 100;
      forbiddenMaxY = ((rect.bottom + buffer) / window.innerHeight) * 100;
    }

    let newX, newY;
    let attempts = 0;
    do {
      newX = Math.random() * 80 + 10;
      newY = Math.random() * 80 + 10;
      attempts++;
    } while (attempts < 100 && (newX > forbiddenMinX && newX < forbiddenMaxX && newY > forbiddenMinY && newY < forbiddenMaxY));

    setNoButtonPos({ x: newX, y: newY });
    if (!isAuto) setNoClicks((prev) => prev + 1);
    setHasMoved(true);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  // The current meme to display Based on progress
  const currentMemeIndex = Math.min(noClicks, MEME_COUNT - 1);
  const memePath = MEME_LIST[currentMemeIndex];

  if (isAccepted) {
    return (
      <div className={`flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-pink-100 to-rose-200 px-4 text-center overflow-hidden`}>
        <FloatingHearts />
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="relative z-10 glass-card p-8 rounded-3xl shadow-2xl"
        >
          <img
            src={CONFIG.assets.successGif}
            alt="Success"
            width={500}
            height={500}
            className="rounded-2xl shadow-xl mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-black text-pink-600 drop-shadow-md animate-pulse-slow">
            {CONFIG.successMessage}
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 px-4 py-12">
      <FloatingHearts />
      
      <div className="relative z-10 w-full max-w-4xl glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-white/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={noClicks}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="relative">
              {/* Decorative Hearts */}
              <motion.span 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -left-6 text-4xl hidden md:block"
              >❤️</motion.span>
              <motion.span 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 text-4xl hidden md:block"
              >💖</motion.span>

              <div className="relative w-full max-w-[85vw] md:max-w-xl aspect-square overflow-hidden rounded-3xl shadow-2xl ring-8 ring-white/30">
                <img
                  src={memePath}
                  alt={`Meme ${currentMemeIndex + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            <h1 className="max-w-md text-3xl font-black text-zinc-800 md:text-5xl leading-tight drop-shadow-sm">
              {CONFIG.apologyMessages[Math.min(noClicks, CONFIG.apologyMessages.length - 1)]}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20 w-full">
          <motion.button
            ref={yesButtonRef}
            style={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={handleYesClick}
            className={`relative z-40 ${CONFIG.colors.yesButton} rounded-full px-16 py-6 text-2xl font-black text-white shadow-2xl transition-all duration-300 ring-4 ring-white/50 hover:ring-green-300`}
          >
            Yes 💖
          </motion.button>

          {!isAccepted && (
            <motion.button
              animate={hasMoved ? { 
                left: `${noButtonPos.x}%`, 
                top: `${noButtonPos.y}%`,
                translateX: "-50%",
                translateY: "-50%"
              } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ scale: noScale }}
              onClick={() => teleportNoButton(false)}
              onTouchStart={() => teleportNoButton(false)}
              className={`${hasMoved ? "fixed" : "relative"} ${CONFIG.colors.noButton} z-50 rounded-full px-12 py-4 text-xl font-bold text-white shadow-xl transition-all duration-300 ring-4 ring-white/40 hover:brightness-110`}
            >
              No 💔
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
