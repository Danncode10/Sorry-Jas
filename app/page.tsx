"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { CONFIG } from "./config";

// --- Visual Effect Components ---

const FallingRain = () => {
  const [drops, setDrops] = useState<{ id: number; left: string; delay: number; duration: number; height: number; opacity: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
      height: Math.random() * 28 + 14,
      opacity: Math.random() * 0.35 + 0.15,
    }));
    setDrops(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            top: "-30px",
          }}
        />
      ))}
    </div>
  );
};

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
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/assets/meme1.gif";
          }}
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
  // ── View Mode: 'sad' (default) or 'cute' (old website) ──
  const [viewMode, setViewMode] = useState<"sad" | "cute">("sad");

  // ── Elapsed Time Counter (Breakup started August 24, 2026) ──
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // ── Cute Apology State ──
  const [noClicks, setNoClicks] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Audio Refs ──
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lastSlideAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastNoInteractionTime = useRef(0);

  const MEME_LIST = CONFIG.assets.memes;
  const MEME_COUNT = MEME_LIST.length;
  const FINAL_STAGE = CONFIG.apologyMessages.length - 1;

  // ── Live Counter Effect ──
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(CONFIG.breakupDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Stop All Audio Utility ──
  const stopAllAudio = () => {
    if (successAudioRef.current) {
      successAudioRef.current.pause();
      successAudioRef.current.currentTime = 0;
      successAudioRef.current = null;
    }
    if (lastSlideAudioRef.current) {
      lastSlideAudioRef.current.pause();
      lastSlideAudioRef.current.currentTime = 0;
      lastSlideAudioRef.current = null;
    }
  };

  // ── Back to Reality Action ──
  const handleBackToReality = () => {
    stopAllAudio();
    setViewMode("sad");
    setNoClicks(0);
    setIsAccepted(false);
    setHasMoved(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Switch to Old Cute Website ──
  const handleViewOldWebsite = () => {
    stopAllAudio();
    setNoClicks(0);
    setIsAccepted(false);
    setHasMoved(false);
    setViewMode("cute");
  };

  // ── Teleport No Button ──
  const teleportNoButton = (isAuto: boolean = false) => {
    if (!isAuto && noClicks >= FINAL_STAGE) return;
    if (!isAuto) lastNoInteractionTime.current = Date.now();

    const forbiddenZones: { minX: number; maxX: number; minY: number; maxY: number }[] = [];
    
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

    let nX = 0, nY = 0;
    let attempts = 0;
    let isBad = true;

    while (attempts < 100 && isBad) {
      nX = Math.random() * 80 + 10;
      nY = Math.random() * 80 + 10;
      
      isBad = forbiddenZones.some(z => 
        nX > z.minX && nX < z.maxX && 
        nY > z.minY && nY < z.maxY
      );
      
      attempts++;
    }

    setNoButtonPos({ x: nX, y: nY });
    if (!isAuto) {
      setNoClicks((p: number) => p + 1);
      new Audio(CONFIG.sounds.teleport).play().catch(() => {});
    }
    setHasMoved(true);
  };

  const handleYesClick = () => {
    if (Date.now() - lastNoInteractionTime.current < 400) return;

    if (lastSlideAudioRef.current) {
      lastSlideAudioRef.current.pause();
      lastSlideAudioRef.current = null;
    }

    setIsAccepted(true);
    const audio = new Audio(CONFIG.sounds.success);
    audio.loop = true;
    audio.play().catch(() => {});
    successAudioRef.current = audio;
  };

  // Responsive scaling check
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Asset Preloading Logic for Cute View (graceful timeout)
  useEffect(() => {
    let isMounted = true;
    const preloadAssets = async () => {
      const imageAssets = [...CONFIG.assets.memes, CONFIG.assets.successGif];
      const soundAssets = [CONFIG.sounds.teleport, CONFIG.sounds.success];

      const imagePromises = imageAssets.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      const soundPromises = soundAssets.map((src) => {
        return new Promise((resolve) => {
          const audio = new Audio();
          audio.src = src;
          audio.oncanplaythrough = resolve;
          audio.onerror = resolve;
          audio.load();
        });
      });

      await Promise.race([
        Promise.all([...imagePromises, ...soundPromises]),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      if (isMounted) {
        setIsAssetsLoaded(true);
      }
    };

    preloadAssets();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto move in final stage of Cute View
  useEffect(() => {
    if (viewMode === "cute" && noClicks >= FINAL_STAGE && !isAccepted && isAssetsLoaded) {
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
    return () => {};
  }, [viewMode, noClicks, isAccepted, FINAL_STAGE, isAssetsLoaded]);

  // Clean up audio on unmount or view change
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [viewMode]);

  // Scaling factors for cute mode buttons
  const growthFactor = isMobile ? 0.15 : 0.25;
  const maxYesScale = isMobile ? 2 : 4;
  const yesScale = Math.min(maxYesScale, 1 + noClicks * growthFactor);
  const noScale = Math.max(0.1, 1 - noClicks * 0.1);
  const memePath = MEME_LIST[Math.min(noClicks, MEME_COUNT - 1)];

  // =========================================================================
  // RENDER 1: SAD THEMED UI (Default view when opening website)
  // Simplified, poignant, without walls of text or excess buttons
  // =========================================================================
  if (viewMode === "sad") {
    return (
      <main id="sad-reality-view" className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 px-4 py-12 overflow-x-hidden">
        {/* Melancholic Rain Backdrop */}
        <FallingRain />

        {/* Subtle Ambient Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950/90 to-slate-950 z-0" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full glass-card-dark p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800/80 flex flex-col items-center text-center"
          >
            {/* Breakup date indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 mb-6">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Since {CONFIG.breakupFormattedDate}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-6">
              Days Since We Broke Up
            </h1>

            {/* Time Elapsed Counter */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-md mb-8">
              <div className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                  {elapsed.days}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
                  Days
                </span>
              </div>

              <div className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                  {String(elapsed.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
                  Hours
                </span>
              </div>

              <div className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                  {String(elapsed.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
                  Mins
                </span>
              </div>

              <div className="flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-slate-300 tracking-tight">
                  {String(elapsed.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
                  Secs
                </span>
              </div>
            </div>

            {/* Direct Honest Statement */}
            <div className="w-full py-4 px-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 mb-8">
              <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
                &ldquo;We are not together anymore. I chose my dreams, and I am sorry.&rdquo;
              </p>
            </div>

            {/* Option to look at the old website */}
            <button
              id="view-old-website-button"
              onClick={handleViewOldWebsite}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-rose-600/20 active:scale-98"
            >
              <span>Look at the old website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // RENDER 2: CUTE APOLOGY UI (The original website with memes & buttons)
  // Clean: NO TOP BAR, NO EXTRA BUTTONS WHILE BROWSING
  // =========================================================================

  // Loading State in Cute Mode
  if (!isAssetsLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 text-center relative px-4">
        <FloatingHearts />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="text-7xl animate-bounce">💖</div>
          <p className="text-sm font-bold text-pink-600 tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  // Success Screen (Apology Accepted - with ONE single "Back to Reality" button at the end)
  if (isAccepted) {
    return (
      <div id="cute-success-view" className="flex min-h-screen flex-col items-center justify-center success-bg px-4 py-8 text-center overflow-hidden relative">
        <Confetti />
        <FloatingHearts />
        <FloatingCats />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="relative z-10 flex flex-col items-center max-w-lg mx-auto"
        >
          <img
            src={CONFIG.assets.successGif}
            alt="Success"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/meme1.gif";
            }}
            className="w-full max-w-[260px] md:max-w-[380px] mx-auto relative z-10 mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
          />

          <h1 className="text-4xl md:text-7xl font-black text-white drop-shadow-[0_5px_15px_rgba(219,39,119,0.8)] animate-pulse-slow mb-8">
            {CONFIG.successMessage}
          </h1>

          {/* Single clean Back to Reality button */}
          <motion.button
            id="back-to-reality-button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            onClick={handleBackToReality}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-950/90 hover:bg-slate-950 text-white text-sm sm:text-base font-semibold border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Back to reality</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Active Interactive Apology Main Screen - COMPLETELY UNCLUTTERED (no top bar)
  return (
    <main id="cute-apology-view" className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-pink-50 to-rose-100 px-4 py-8 md:py-12">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-[95vw] md:max-w-2xl glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-white/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={noClicks}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6 md:gap-7 text-center w-full"
          >
            <div className="relative w-full flex justify-center">
              <div className="relative w-full max-w-[240px] md:max-w-sm aspect-square overflow-hidden rounded-3xl shadow-2xl ring-4 md:ring-8 ring-white/40">
                <img
                  src={memePath}
                  alt="Apology Meme"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/assets/meme1.gif";
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <h1 ref={textRef} className="w-full text-2xl font-black text-zinc-800 md:text-3xl leading-tight">
              {CONFIG.apologyMessages[Math.min(noClicks, CONFIG.apologyMessages.length - 1)]}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-24 w-full min-h-[160px]">
          {/* Growing Yes Button Slot */}
          <div className="flex-1 flex justify-center items-center">
            <motion.button
              id="cute-yes-button"
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
              className={`relative z-40 ${CONFIG.colors.yesButton} rounded-full px-10 md:px-14 py-4 md:py-5 text-xl md:text-2xl font-black text-white shadow-2xl ring-4 ring-white/50 cursor-pointer`}
            >
              Yes 💖
            </motion.button>
          </div>

          {/* Elusive Teleporting No Button Slot */}
          {!isAccepted && (
            <div className="flex-1 flex justify-center items-center">
              <motion.button
                id="cute-no-button"
                animate={hasMoved ? { 
                  left: `${noButtonPos.x}%`, 
                  top: `${noButtonPos.y}%`,
                  position: "fixed" as const,
                  translateX: "-50%",
                  translateY: "-50%"
                } : {
                  position: "relative" as const
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ scale: noScale }}
                onPointerDown={() => teleportNoButton(false)}
                className={`${CONFIG.colors.noButton} z-50 rounded-full px-10 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold text-white shadow-xl ring-4 ring-white/40 touch-none select-none cursor-pointer`}
              >
                No 💔
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
