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

  // Responsive scaling
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scaling factors - Slightly toned down for mobile
  const growthFactor = isMobile ? 0.15 : 0.25;
  const maxYesScale = isMobile ? 2 : 4;
  const yesScale = Math.min(maxYesScale, 1 + noClicks * growthFactor);
  const noScale = Math.max(0.1, 1 - noClicks * 0.1);

  // Constants based on config
  const MEME_LIST = CONFIG.assets.memes;
  const MEME_COUNT = MEME_LIST.length;
  const FINAL_STAGE = CONFIG.apologyMessages.length - 1;

  // Automatically move the button in the very last stage
  useEffect(() => {
    if (noClicks >= FINAL_STAGE && !isAccepted) {
      const interval = setInterval(() => {
        teleportNoButton(true);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [noClicks, isAccepted]);

  // Randomly teleport the "No" button
  const teleportNoButton = (isAuto = false) => {
    if (!isAuto && noClicks >= FINAL_STAGE) return;
    if (noClicks > FINAL_STAGE) return;

    let forbiddenMinX = 20, forbiddenMaxX = 80, forbiddenMinY = 20, forbiddenMaxY = 80;
    
    if (yesButtonRef.current) {
      const rect = yesButtonRef.current.getBoundingClientRect();
      const buffer = 30;
      
      forbiddenMinX = ((rect.left - buffer) / window.innerWidth) * 100;
      forbiddenMaxX = ((rect.right + buffer) / window.innerWidth) * 100;
      forbiddenMinY = ((rect.top - buffer) / window.innerHeight) * 100;
      forbiddenMaxY = ((rect.bottom + buffer) / window.innerHeight) * 100;
    }

    let newX, newY;
    let attempts = 0;
    do {
      // Stay away from extreme edges (10% to 90%)
      newX = Math.random() * 80 + 10;
      newY = Math.random() * 80 + 10;
      attempts++;
    } while (attempts < 50 && (newX > forbiddenMinX && newX < forbiddenMaxX && newY > forbiddenMinY && newY < forbiddenMaxY));

    setNoButtonPos({ x: newX, y: newY });
    if (!isAuto) setNoClicks((prev) => prev + 1);
    setHasMoved(true);
  };

  const currentMemeIndex = Math.min(noClicks, MEME_COUNT - 1);
  const memePath = MEME_LIST[currentMemeIndex];

  if (isAccepted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 px-4 text-center overflow-hidden">
        <FloatingHearts />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative z-10 glass-card p-6 md:p-12 rounded-3xl shadow-2xl max-w-full"
        >
          <img
            src={CONFIG.assets.successGif}
            alt="Success"
            className="rounded-2xl shadow-xl mb-6 w-full max-w-[300px] md:max-w-[500px] mx-auto"
          />
          <h1 className="text-3xl md:text-6xl font-black text-pink-600 animate-pulse-slow">
            {CONFIG.successMessage}
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-pink-50 to-rose-100 px-4 py-8 md:py-12">
      <FloatingHearts />
      
      <div className="relative z-10 w-full max-w-[95vw] md:max-w-4xl glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-white/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={noClicks}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6 md:gap-8 text-center w-full"
          >
            <div className="relative w-full flex justify-center">
              <div className="relative w-full max-w-[280px] md:max-w-xl aspect-square overflow-hidden rounded-3xl shadow-2xl ring-4 md:ring-8 ring-white/30">
                <img
                  src={memePath}
                  alt="Meme"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <h1 className="w-full text-2xl font-black text-zinc-800 md:text-5xl leading-tight">
              {CONFIG.apologyMessages[Math.min(noClicks, CONFIG.apologyMessages.length - 1)]}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-20 w-full relative min-h-[150px]">
          <motion.button
            ref={yesButtonRef}
            style={{ scale: yesScale }}
            onClick={() => setIsAccepted(true)}
            className={`relative z-40 ${CONFIG.colors.yesButton} rounded-full px-10 md:px-16 py-4 md:py-6 text-xl md:text-2xl font-black text-white shadow-2xl ring-4 ring-white/50`}
          >
            Yes 💖
          </motion.button>

          {!isAccepted && (
            <motion.button
              animate={hasMoved ? { 
                left: `${noButtonPos.x}%`, 
                top: `${noButtonPos.y}%`,
                position: 'fixed' as const,
                translateX: "-50%",
                translateY: "-50%"
              } : {
                position: 'relative' as const
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ scale: noScale }}
              onClick={() => teleportNoButton(false)}
              onTouchStart={(e) => {
                e.preventDefault();
                teleportNoButton(false);
              }}
              className={`${CONFIG.colors.noButton} z-50 rounded-full px-10 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold text-white shadow-xl ring-4 ring-white/40`}
            >
              No 💔
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}

