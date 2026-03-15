// =============================================================
// 🌸 config.ts — Customize your "Sorry na Jas" page here!
// =============================================================
// Place this file in the `app/` folder (or `src/` if you use a src layout).
// This is the ONLY file you need to edit to personalize the apology page.
// =============================================================

const TARGET_NAME = "Jas";

export const CONFIG = {
  // ── The person you're apologizing to ──────────────────────
  targetName: TARGET_NAME,

  // ── Messages shown on the page (Progressive) ────────────────
  apologyMessages: [
    `Sorry na ${TARGET_NAME}, patawarin mo na ako 🥺`,
    "Hala, bakit mo pinindot yung No? 👉👈",
    `Sige na ${TARGET_NAME}, bati na tayo please? 🍎`,
    "Sendan na lang kita ng maraming cute vids, bati na tayo? 🐱",
    "Isang smile lang diyan, okay na ako... Sige na? 😔",
    "Galit ka pa ba? Sorry na nga eh... Huhu 😭",
    "Huy stop! Pinapahirapan mo lang ako eh! 😰",
    "Last chance na 'to... Bati na tayo? ❤️",
    "Bleh! Hindi niya ma-click yung No! Patawarin mo na kasi ako 😝",
  ],
  successMessage: "Yey! I love you! ❤️ ",

  // ── Button & background colors (Tailwind CSS class names) ─
  colors: {
    yesButton: "bg-green-500",
    noButton: "bg-red-500",
    background: "bg-pink-50",
  },

  // ── Asset paths (Local /assets/ folder OR External URLs) ──
  // You can use direct links from Tenor, Giphy, or any image URL here!
  assets: {
    memes: [
      "/assets/meme1.jpg",      // Local
      "https://media.tenor.com/7123T9b_kYsAAAAC/cat-cute.gif", // Remote GIF example
      "/assets/meme3.jpg",
      "/assets/meme4.jpg",
      "/assets/meme5.jpg",
      "/assets/meme6.jpg",
      "/assets/meme7.jpg",
      "/assets/meme8.jpg",
      "https://media.tenor.com/p_T5G-2qJmMAAAAC/cat-dance.gif", // Another remote GIF
    ],
    successGif: "https://media.tenor.com/gO_S-9_v9_MAAAAC/peach-goma-peach-and-goma.gif",
  },
};
