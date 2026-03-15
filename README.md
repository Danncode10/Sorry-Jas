# 🌸 Project: "Sorry na Jas" 🌸

A playful, interactive "Apology Landing Page" built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. Designed specifically to win back "Jas" through the power of memes and an unclickable "No" button.

## 🚀 The Concept
The site presents a simple question. If she tries to click **"No"**, the button shrinks and teleports around the screen while the **"I forgive you"** button grows exponentially. After 8 attempts, the "No" button becomes virtually impossible to catch, and a sequence of memes displays her progress.

## 🛠️ Tech Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Deployment:** Optimized for Vercel

## 📂 Folder Structure (Assets)
To make the meme logic work, ensure your images are placed in the `public` folder as follows:

```text
public/
└── assets/
    ├── meme1.jpg
    ├── meme2.jpg
    ├── ...
    ├── meme8.jpg
    └── success-gif.gif