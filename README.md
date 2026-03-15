# 🌸 Project: "Sorry na Jas" 🌸

A playful, interactive **Apology Landing Page** built with **Next.js**, **Tailwind CSS v4**, and **Framer Motion**. Designed to win back "Jas" through the power of memes and an unclickable "No" button.

## 🚀 The Concept

The site presents a simple question. Every time she tries to click **"No"**, the button shrinks and teleports around the screen while the **"I forgive you"** button grows exponentially. After 8 attempts, the "No" button becomes virtually impossible to catch, and a sequence of memes marks her progress.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Framework |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling (CSS-first config) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Vercel](https://vercel.com/) | Deployment |

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sorry-jas.git
cd sorry-jas/sorry-jas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the page.

---

## ✏️ Customization Guide

All personalizable content lives in a **single config file**. You don't need to touch any component code.

### Step 1 — Create `config.ts`

Place this file inside the `app/` folder:

```
sorry-jas/
└── app/
    └── config.ts   ← create this file here
```

### Step 2 — Edit the config values

```ts
// app/config.ts
const TARGET_NAME = "Jas";

export const CONFIG = {
  targetName: TARGET_NAME,
  
  apologyMessages: [
    `Sorry na ${TARGET_NAME}, patawarin mo na ako 🥺`,
    "Hala, bakit mo pinindot yung No? 👉👈",
    // ... add as many as you want!
  ],

  successMessage: "Yey! I love you! ❤️",

  colors: {
    yesButton: "bg-green-500",
    noButton: "bg-red-500",
    background: "bg-pink-50",
  },

  assets: {
    // You can use LOCAL paths (from public/assets/) 
    // OR EXTERNAL URLs (Tenor, Giphy, etc.)
    memes: [
      "/assets/meme1.jpg", 
      "https://media.tenor.com/7123T9b_kYsAAAAC/cat-cute.gif",
      "https://example.com/your-image.png"
    ],
    successGif: "https://media.tenor.com/gO_S-9_v9_MAAAAC/peach-goma-peach-and-goma.gif",
  },
};
```

---

## 🖼️ How to use Tenor GIFs

1. Go to [Tenor.com](https://tenor.com/) and find a GIF.
2. **Right-click** the GIF and select **"Copy Image Address"**.
   - The link should look like: `https://media.tenor.com/.../anything.gif`
3. Paste that link directly into the `memes` array in your `config.ts`.

---

## 📂 Folder Structure

```text
sorry-jas/
├── app/
│   ├── config.ts       ← ✏️  YOUR customization file
│   ├── globals.css     ← 🎨  Tailwind v4 theme tokens
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── assets/         ← 🖼️  Place local images here
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Deployment (Vercel)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com/) and import the repository
3. Set the **Root Directory** to `sorry-jas` (the inner folder)
4. Click **Deploy** — Vercel handles everything automatically ✅