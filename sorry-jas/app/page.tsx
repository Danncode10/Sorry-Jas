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

const Confetti = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; size: number; duration: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            top: "-20px",
          }}
        />
      ))}
    </div>
  );
};

const FloatingCats = () => {
  const [cats, setCats] = useState<{ id: number; left: string; top: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newCats = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setCats(newCats);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {cats.map((cat) => (
        <motion.img
          key={cat.id}
          src={CONFIG.assets.successGif}
          alt="Happy Cat"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.5, 1.2, 1, 0.5],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: cat.duration, 
            repeat: Infinity, 
            delay: cat.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{
            left: cat.left,
            top: cat.top,
            width: `${cat.size}px`,
          }}
        />
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
  const textRef = useRef<HTMLHeadingElement>(null);
  const lastSlideAudioRef = useRef<HTMLAudioElement | null>(null);

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
      // Play last slide sound in loop
      if (!lastSlideAudioRef.current) {
        lastSlideAudioRef.current = new Audio(CONFIG.sounds.lastSlide);
        lastSlideAudioRef.current.loop = true;
        lastSlideAudioRef.current.play().catch(() => {});
      }

      const interval = setInterval(() => {
        teleportNoButton(true);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [noClicks, isAccepted, FINAL_STAGE]);

  // Randomly teleport the "No" button
  const teleportNoButton = (isAuto = false) => {
    if (!isAuto && noClicks >= FINAL_STAGE) return;
    if (noClicks > FINAL_STAGE) return;

    // Define forbidden zones for BOTH Yes button and Message Text
    const forbiddenZones: { minX: number; maxX: number; minY: number; maxY: number }[] = [];
    
    // Zone 1: Yes Button
    if (yesButtonRef.current) {
      const rect = yesButtonRef.current.getBoundingClientRect();
      const buffer = 30;
      forbiddenZones.push({
        minX: ((rect.left - buffer) / window.innerWidth) * 100,
        maxX: ((rect.right + buffer) / window.innerWidth) * 100,
        minY: ((rect.top - buffer) / window.innerHeight) * 100,
        maxY: ((rect.bottom + buffer) / window.innerHeight) * 100,
      });
    }

    // Zone 2: Apology Text
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const buffer = 40;
      forbiddenZones.push({
        minX: ((rect.left - buffer) / window.innerWidth) * 100,
        maxX: ((rect.right + buffer) / window.innerWidth) * 100,
        minY: ((rect.top - buffer) / window.innerHeight) * 100,
        maxY: ((rect.bottom + buffer) / window.innerHeight) * 100,
      });
    }

    let newX, newY;
    let attempts = 0;
    let isInsideAnyZone = true;

    while (attempts < 100 && isInsideAnyZone) {
      newX = Math.random() * 80 + 10;
      newY = Math.random() * 80 + 10;
      
      isInsideAnyZone = forbiddenZones.some(zone => 
        newX! > zone.minX && newX! < zone.maxX && 
        newY! > zone.minY && newY! < zone.maxY
      );
      
      attempts++;
    }

    setNoButtonPos({ x: newX!, y: newY! });
    if (!isAuto) {
      setNoClicks((prev) => prev + 1);
      // Play slap sound
      new Audio(CONFIG.sounds.teleport).play().catch(() => {});
    }
    setHasMoved(true);
  };

  const handleYesClick = () => {
    // Stop last slide audio if it's playing
    if (lastSlideAudioRef.current) {
      lastSlideAudioRef.current.pause();
      lastSlideAudioRef.current = null;
    }

    setIsAccepted(true);
    // Play happy sound in a loop
    const audio = new Audio(CONFIG.sounds.success);
    audio.loop = true;
    audio.play().catch(() => {});
  };

  const currentMemeIndex = Math.min(noClicks, MEME_COUNT - 1);
  const memePath = MEME_LIST[currentMemeIndex];

  if (isAccepted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center success-bg px-4 text-center overflow-hidden relative">
        <Confetti />
        <FloatingHearts />
        <FloatingCats />
        
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", damping: 10, stiffness: 100 }}
           className="relative z-10 flex flex-col items-center"
        >
          <img
            src={CONFIG.assets.successGif}
            alt="Success"
            className="w-full max-w-[300px] md:max-w-[500px] mx-auto relative z-10 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
          />
          <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(219,39,119,0.8)] animate-pulse-slow">
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

            <h1 ref={textRef} className="w-full text-2xl font-black text-zinc-800 md:text-5xl leading-tight">
              {CONFIG.apologyMessages[Math.min(noClicks, CONFIG.apologyMessages.length - 1)]}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-20 w-full relative min-h-[150px]">
          <motion.button
            ref={yesButtonRef}
            style={{ scale: yesScale }}
            animate={{ 
              rotate: [0, -3, 3, -3, 3, 0],
              scale: [yesScale, yesScale * 1.1, yesScale]
            }}
            transition={{ 
              rotate: { duration: 0.4, repeat: Infinity },
              scale: { duration: 0.8, repeat: Infinity }
            }}
            whileHover={{ scale: yesScale * 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={handleYesClick}
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
              onPointerDown={(e) => {
                // onPointerDown handles both touch and mouse without passive listener issues
                teleportNoButton(false);
              }}
              className={`${CONFIG.colors.noButton} z-50 rounded-full px-10 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold text-white shadow-xl ring-4 ring-white/40 touch-none select-none`}
            >
              No 💔
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}

