# 🌸 Sorry-Jas: The Ultimate Apology Web App

A beautiful, interactive, and playful web application built with **Next.js**, **Tailwind CSS v4**, and **Framer Motion**. Designed to win back "Jas" (or anyone special) through the power of memes, interactive "No" buttons, and a whole lot of rizz.

![Preview](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3Amb3A9Zw/On79ZizA_8AAAAAd/happy-happy-happy-cat/giphy.gif)

## 🚀 Quick Start (One-Liner)

Want to see it in action immediately? Run this in your terminal:

```bash
git clone https://github.com/Danncode10/Sorry-Jas.git && cd Sorry-Jas/sorry-jas && npm install && npm run dev
```

---

## 🛠️ Customization Guide

All personalizable content lives in a **single config file**. You don't need to touch any component code!

### Edit `sorry-jas/app/config.ts`

```ts
export const CONFIG = {
  targetName: "Jas", // Pwede mong palitan kahit anong pangalan
  
  apologyMessages: [
    "Sorry na Jas, patawarin mo na ako 🥺",
    "Joke lang! click Yes na please? 👉👈",
    // Add as many as you want!
  ],

  successMessage: "Yey! bati na kami ❤️ ", // The text on the final screen

  assets: {
    memes: [
      "/assets/meme1.gif",  // Local file from public/assets/
      "https://media.tenor.com/.../cat.gif" // OR External URL!
    ],
    successGif: "/assets/success.gif", // Final celebration GIF
  },

  sounds: {
    teleport: "/assets/sounds/rizz.mp3", // Sound when button escapes
    success: "/assets/sounds/happy.mp3",  // Lops on success screen
    lastSlide: "/assets/sounds/last_slide_sound.mp3", // Loops on final plea
  }
};
```

---

## ✨ Interactive Features

- **🎮 Anti-No Logic**: The "No" button teleports away and shrinks, while the "Yes" button grows bigger with every click!
- **💓 Wiggle Animation**: The "Yes" button vigorously wiggles and pulses to attract attention.
- **🛡️ Collision Detection**: The "No" button is smart—it never teleports on top of the "Yes" button or the message text.
- **🎹 Sound FX System**: Includes "Rizz" sounds, slap effects, and looping background music for the final plea and success.
- **🐱 Happy Cat Invasion**: A celebratory screen with a "Cat Army" animation that fills the view when you're forgiven.
- **📱 Mobile Optimized**: Uses `onPointerDown` and `touch-none` for smooth, responsive interactions on any phone.

---

## 💻 Tech Stack

- **Next.js 15+** (App Router)
- **Tailwind CSS v4** (Modern CSS-first approach)
- **Framer Motion** (Smooth & springy animations)
- **HTML5 Audio API** (Interactive SFX & Looping Music)

---

## 📂 Folder Structure

```text
Sorry-Jas/
├── sorry-jas/
│   ├── app/
│   │   ├── config.ts       ← ✏️ CUSTOMIZE HERE
│   │   ├── globals.css     ← 🎨 THEME COLORS
│   │   └── page.tsx        ← Core Logic
│   ├── public/
│   │   └── assets/         ← 🖼️ PUT MEMES & SOUNDS HERE
│   └── next.config.ts      ← Next.js settings
└── README.md
```

---

## 🤝 Contributing & Deployment

1. **GitHub**: [Danncode10/Sorry-Jas](https://github.com/Danncode10/Sorry-Jas)
2. **Deploy**: The easiest way is via [Vercel](https://vercel.com/). Connect your repo and set the **Root Directory** to `sorry-jas`.

**Made with ❤️ by [Danncode10](https://github.com/Danncode10)**