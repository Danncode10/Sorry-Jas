"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "./config";

export default function Home() {
  const [noClicks, setNoClicks] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Scaling factors
  const yesScale = 1 + noClicks * 0.25;
  const noScale = Math.max(0.1, 1 - noClicks * 0.1);

  // Randomly teleport the "No" button
  const teleportNoButton = () => {
    if (noClicks >= CONFIG.memeCount) return;

    // Use percentages (10% to 90%) to ensure the button 
    // stays strictly within the visible viewport on any screen size.
    const newX = Math.random() * 80 + 10; 
    const newY = Math.random() * 80 + 10; 

    setNoButtonPos({ x: newX, y: newY });
    setNoClicks((prev) => prev + 1);
    setHasMoved(true);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  // The current meme to display Based on progress
  const currentMemeIndex = Math.min(noClicks + 1, CONFIG.memeCount);
  const memePath = `/assets/${CONFIG.assets.memePrefix}${currentMemeIndex}.jpg`;

  if (isAccepted) {
    return (
      <div className={`flex min-h-screen flex-col items-center justify-center gap-8 ${CONFIG.colors.background} px-4 text-center`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Image
            src={CONFIG.assets.successGif}
            alt="Success"
            width={400}
            height={400}
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
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <Image
              src={memePath}
              alt={`Meme ${currentMemeIndex}`}
              fill
              className="rounded-3xl object-cover shadow-xl"
              priority
            />
          </div>

          <h1 className="max-w-md text-3xl font-extrabold text-zinc-800 md:text-4xl">
            {CONFIG.targetName}, {CONFIG.apologyMessage}
          </h1>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
        <motion.button
          style={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.1 }}
          whileTap={{ scale: yesScale * 0.9 }}
          onClick={handleYesClick}
          className={`${CONFIG.colors.yesButton} rounded-full px-12 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:bg-green-600`}
        >
          Yes 💖
        </motion.button>

        {noClicks < CONFIG.memeCount && (
          <motion.button
            animate={hasMoved ? { 
              left: `${noButtonPos.x}%`, 
              top: `${noButtonPos.y}%`,
              translateX: "-50%",
              translateY: "-50%"
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ scale: noScale }}
            onClick={teleportNoButton}
            onTouchStart={teleportNoButton}
            className={`${hasMoved ? "fixed" : "relative"} ${CONFIG.colors.noButton} z-50 rounded-full px-12 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:bg-red-600`}
          >
            No 💔
          </motion.button>
        )}
      </div>
    </main>
  );
}

