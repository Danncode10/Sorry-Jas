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
export const CONFIG = {
  targetName: "Jas",                          // 💬 Change to her name
  apologyMessage: "Sorry na, patawarin mo na ako 🥺",  // 💬 Your apology text
  successMessage: "Yey! I love you! ❤️",     // 💬 Message shown on forgiveness

  memeCount: 8,                               // 🖼️ Number of meme files (meme1.jpg … meme8.jpg)

  colors: {
    yesButton: "bg-green-500",  // 💚 Tailwind class for the "Yes" button
    noButton: "bg-red-500",     // ❤️ Tailwind class for the "No" button
    background: "bg-pink-50",   // 🌸 Tailwind class for the page background
  },

  assets: {
    memePrefix: "meme",                       // 🖼️ Prefix of meme filenames
    successGif: "/assets/success-gif.gif",    // 🎉 Path to the success gif
  },
};
```

> **Tip:** All color values use standard [Tailwind CSS utility classes](https://tailwindcss.com/docs/background-color).  
> You can use any `bg-*` class, e.g. `bg-purple-400`, `bg-rose-600`, etc.

---

## 🎨 Tailwind CSS v4 — Theme Configuration

> ⚠️ **This project uses Tailwind CSS v4**, which uses a **CSS-first configuration** approach.  
> There is **no `tailwind.config.js`** file. All custom theme tokens are defined in `app/globals.css` using the `@theme` block.

To customize the design system (colors, fonts, spacing), edit the `@theme` section in `app/globals.css`:

```css
/* app/globals.css */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-pink-500: #ec4899;   /* ← change brand pink here */
  --color-yes: #22c55e;        /* ← yes button color */
  --color-no:  #ef4444;        /* ← no button color */
}
```

> **Note:** The `@theme` at-rule is a Tailwind v4 feature. Your IDE may show an "unknown at-rule" warning — this is a **false positive** and can be safely ignored. The project compiles correctly.

---

## 📂 Folder Structure

```text
sorry-jas/
├── app/
│   ├── config.ts       ← ✏️  YOUR customization file (create this!)
│   ├── globals.css     ← 🎨  Tailwind v4 theme tokens
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── assets/
│       ├── meme1.jpg
│       ├── meme2.jpg
│       ├── ...
│       ├── meme8.jpg
│       └── success-gif.gif
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🖼️ Adding Your Memes

Place your meme images inside `public/assets/` and name them sequentially:

```
public/assets/meme1.jpg
public/assets/meme2.jpg
...
public/assets/meme8.jpg
public/assets/success-gif.gif
```

> If you have more or fewer memes, update `memeCount` in `config.ts` to match.

---

## 🚀 Deployment (Vercel)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com/) and import the repository
3. Set the **Root Directory** to `sorry-jas` (the inner folder)
4. Click **Deploy** — Vercel handles everything automatically ✅