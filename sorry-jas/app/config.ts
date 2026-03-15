// =============================================================
// 🌸 config.ts — Customize your "Sorry na Jas" page here!
// =============================================================
// Place this file in the `app/` folder (or `src/` if you use a src layout).
// This is the ONLY file you need to edit to personalize the apology page.
// =============================================================

export const CONFIG = {
  // ── The person you're apologizing to ──────────────────────
  targetName: "Jas",

  // ── Messages shown on the page ────────────────────────────
  apologyMessage: "Sorry na, patawarin mo na ako 🥺",
  successMessage: "Yey! I love you! ❤️",

  // ── Number of memes (must match files in public/assets/) ──
  // Memes should be named: meme1.jpg, meme2.jpg, ... meme8.jpg
  memeCount: 8,

  // ── Button & background colors (Tailwind CSS class names) ─
  colors: {
    yesButton: "bg-green-500",
    noButton: "bg-red-500",
    background: "bg-pink-50",
  },

  // ── Asset paths (relative to the /public folder) ──────────
  assets: {
    memePrefix: "meme",            // memes named meme1.jpg, meme2.jpg, etc.
    successGif: "/assets/success-gif.gif",
  },
};
