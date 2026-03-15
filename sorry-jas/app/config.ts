// =============================================================
// 🌸 config.ts — Customize your "Sorry na Jas" page here!
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
    "Patawarin mo na kasi ako 😝",
  ],
  successMessage: "Yey! bati na kami ❤️ ",

  // ── Button & background colors (Tailwind CSS class names) ─
  colors: {
    yesButton: "bg-green-500",
    noButton: "bg-red-500",
    background: "bg-pink-50",
  },

  // ── Asset paths (Local /assets/ folder OR External URLs) ──
  assets: {
    memes: [
      "/assets/meme1.gif",
      "/assets/meme2.gif",
      "/assets/meme3.gif",
      "/assets/meme4.gif",
      "/assets/meme5.gif",
      "/assets/meme6.gif",
      "/assets/meme7.gif",
      "/assets/meme8.gif",
      "/assets/meme9.gif",
    ],
    successGif: "/assets/success.gif",
  },

  // ── Sound Effects ─────────────────────────────────────────
  sounds: {
    teleport: "/assets/sounds/rizz.mp3", // Rizz sound
    success: "/assets/sounds/happy.mp3",  // Happy song (looping)
  },
};
