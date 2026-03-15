# 💖 Sorry-Jas: The Ultimate Apology Web App

A beautiful, interactive, and playful web application designed to help you say sorry in the most charming way possible. Features dynamic animations, sound effects, and the legendary "Happy Cat Army"!

![Preview](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3p4Z3Amb3A9Zw/On79ZizA_8AAAAAd/happy-happy-happy-cat/giphy.gif)

## 🚀 Quick Start (One-Liner)

Run this command to clone, install, and start the app instantly:

```bash
git clone https://github.com/Danncode10/Sorry-Jas.git && cd Sorry-Jas/sorry-jas && npm install && npm run dev
```

---

## 🛠️ Customization Guide

The entire app is controlled via `app/config.ts`. You don't need to touch the core logic to personalize it!

### 1. Edit Names & Messages
Open `sorry-jas/app/config.ts` and update the following:
- `targetName`: The name of the person you're apologizing to.
- `apologyMessages`: An array of messages that appear as they click "No".
- `successMessage`: The final message shown after they click "Yes".

### 2. Change Assets (Memes & Sounds)
- **Memes**: Add your own GIFs to `public/assets/` and update the `memes` array in `config.ts`. You can also use external URLs!
- **Sounds**: 
  - `rizz.mp3`: Plays when the "No" button teleports.
  - `happy.mp3`: Loops on the success screen.
  - `last_slide_sound.mp3`: Loops during the final plea slide.

### 3. Theme Colors
Change the `colors` object in `config.ts` using standard Tailwind CSS classes to match her favorite color!

---

## ✨ Features

- **🛡️ Anti-No Engine**: The "No" button teleports away from the cursor and automatically avoids the "Yes" button and text area!
- **📈 Infinite "Yes" Growth**: The "Yes" button grows larger with每 click of "No" until it's impossible to miss.
- **🐱 Happy Cat Invasion**: A celebratory explosion of bouncing happy cats when the apology is accepted.
- **🔊 Interactive Audio**: Custom sounds for "Rizz" moments and a looping celebratory theme.
- **📱 Mobile Responsive**: Fully optimized for phones with smart teleportation logic.
- **🌫️ Glassmorphism UI**: High-end modern design with soft gradients and floating heart animations.

---

## 💻 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons/Graphics**: Custom CSS + SVG Animations

---

## 🤝 Contributing

Feel free to fork this project and add your own creative twists! If you have better "rizz" sounds or cooler animations, pull requests are welcome.

**Made with ❤️ by [Danncode10](https://github.com/Danncode10)**
