// =============================================================
// 🌸 config.ts — Customize your "Sorry na Jas" page here!
// =============================================================
// Place this file in the `app/` folder (or `src/` if you use a src layout).
// This is the ONLY file you need to edit to personalize the apology page.
// =============================================================

export const CONFIG = {
  // ── The person you're apologizing to ──────────────────────
  targetName: "Jas",

  // ── Messages shown on the page (Progressive) ────────────────
  apologyMessages: [
    "Sorry na, patawarin mo na ako 🥺",
    "Hala, bakit mo pinindot yung No? 👉👈",
    "Sige na Jas, bati na tayo please? 🍎",
    "Libre kita ng favorite food mo, bati na tayo? 🍕",
    "Isang hug lang, okay na ako... Sige na? 🤗",
    "Galit ka pa ba? Sorry na nga eh... Huhu 😭",
    "Wag mo na pindutin yan, lalo akong kinakabahan! 😰",
    "Last chance na 'to... Bati na tayo? ❤️",
    "Bleh! Hindi niya ma-click yung No! Patawarin mo na kasi ako 😝",
  ],
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
