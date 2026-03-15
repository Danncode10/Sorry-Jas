"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "./config";

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
      <div className={`flex min-h-screen flex-col items-center justify-center gap-8 ${CONFIG.colors.background} px-4 text-center`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <img
            src={CONFIG.assets.successGif}
            alt="Success"
            width={500}
            height={500}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
        <h1 className="text-4xl font-bold text-pink-600 drop-shadow-sm">
          {CONFIG.successMessage}
        </h1>
      </div>
    );
  }

  return (
    <main className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden ${CONFIG.colors.background} px-4 py-12`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={noClicks}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="relative w-full max-w-[85vw] md:max-w-xl aspect-square">
            <img
              src={memePath}
              alt={`Meme ${currentMemeIndex + 1}`}
              className="h-full w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>

          <h1 className="max-w-md text-3xl font-extrabold text-zinc-800 md:text-5xl">
            {CONFIG.apologyMessages[Math.min(noClicks, CONFIG.apologyMessages.length - 1)]}
          </h1>
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-20">
        <motion.button
          ref={yesButtonRef}
          style={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.1 }}
          whileTap={{ scale: yesScale * 0.9 }}
          onClick={handleYesClick}
          className={`relative z-40 ${CONFIG.colors.yesButton} rounded-full px-12 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:bg-green-600`}
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ scale: noScale }}
            onClick={() => teleportNoButton(false)}
            onTouchStart={() => teleportNoButton(false)}
            className={`${hasMoved ? "fixed" : "relative"} ${CONFIG.colors.noButton} z-50 rounded-full px-12 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:bg-red-600`}
          >
            No 💔
          </motion.button>
        )}
      </div>

    </main>
  );
}



