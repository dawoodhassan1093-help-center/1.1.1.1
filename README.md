# SHADOW CASE: THE MYSTERY FILES

An immersive, cinematic HTML5 detective mystery game built with modern React, Tailwind CSS, TypeScript, and procedural Web Audio API sound synthesis.

---

## 🔍 Overview
**Shadow Case: The Mystery Files** puts players in the shoes of a Scotland Yard consulting detective solving **100 genuinely distinct criminal cases** across Victorian manors, foggy urban docks, grand opera houses, vintage express trains, alpine retreats, and subterranean vaults.

### Difficulty Breakdown
- **Easy (Levels 1–30):** Direct motives, clear physical evidence, 3 suspects, introductory forensics.
- **Hard (Levels 31–70):** 4 suspects, forged alibis, deceptive red herrings, forensic trace matching.
- **Impossible (Levels 71–100):** Complex locked-room puzzles, delayed chemical and barometric mechanisms, airtight witness alibis, master criminal conspiracies.

---

## 🎮 Key Features & Investigation Gameplay Loop
1. **Crime Scene Examination:**
   - Detailed visual scene with interactive yellow police evidence markers (#1, #2, #3, #4).
   - Hotspot zoom and forensic discovery inspection popups.
2. **Forensic Evidence Locker:**
   - Cataloged photographic evidence cards (Physical, Document, Forensic, Testimony).
   - High-magnification microscope inspection modal with official laboratory pathology reports.
3. **Suspect Interrogation Room:**
   - Authentic police mugshot / portrait cards.
   - Interactive dialogue questioning tree with dynamic suspect responses.
   - Forensic contradiction alerts when suspect statements conflict with weather or timeline logs.
4. **Detective Conspiracy Corkboard:**
   - Photographic vintage corkboard pinned with suspect portraits, evidence Polaroids, and custom notes.
   - Interactive **Red String yarn connections** linking clues and suspects.
5. **Investigation Casebook (Notebook):**
   - Chronological timeline with verified timestamps and witness verifications.
   - Alibi matrix comparison table.
   - Auto-saved player scratchpad.
6. **Formal Accusation & Verdict System:**
   - Accuse the primary culprit, designate the smoking-gun evidence that breaks their alibi, and confirm the method.
   - Detailed post-case forensic breakdown revealing the complete sequence of events, debunking red herrings, and awarding 1 to 3 gold stars.
7. **Procedural Web Audio Engine:**
   - Ambient noir rain and distant thunder generator (synthesized via Web Audio API noise buffer + low-pass filtering).
   - Typewriter key clicks, clue discovery chimes, camera shutter clicks, and victory fanfare without external audio files.
8. **Settings & Low-End PC Optimization:**
   - Toggle audio and ambient rain with master volume slider.
   - Low-End PC / Mobile mode (disables heavy blur effects for 60fps performance on 4GB RAM devices).
   - Master Detective Pass (unlock all 100 cases for instant review/testing).

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Noir Aesthetic typography (Cinzel & Courier Prime)
- **Audio:** Web Audio API Procedural Synthesizer (Zero external dependencies)
- **State & Storage:** React hooks + `localStorage` persistence with corruption fallback
- **Icons:** Lucide React
- **Test Runner:** Built-in Node.js Test Runner (`node:test`, `node:assert/strict`, `tsx`)

---

## 🚀 Setup & Execution

### 1. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 2. Run Test Suite
All 100 cases and scoring rules are validated using automated unit tests:
```bash
npx --yes tsx --test src/game/rules.test.ts
```

### 3. Build for Production / CrazyGames
```bash
npm run build
```
The compiled static assets are output to the `dist/` directory, ready to deploy or bundle.

---

## 🕹️ CrazyGames Integration Readiness
- **Zero intrusive prompts or blockers:** Game launches smoothly without forced popups.
- **Audio handling:** Gracefully suspends Web Audio context when the browser tab loses focus.
- **Aspect ratio & responsiveness:** Fully responsive container scaling from mobile portrait (390px) to ultra-wide desktop displays (1440px+).
- **Clean modular hooks:** Ready for seamless integration with `window.CrazyGames.SDK` gameplay start/stop events if ad monetization is enabled.

---

## 📋 Quality & Validation Report
- **Asset Integrity:** Flagship cases feature custom AI-generated artwork (title banner, crime scenes, suspect mugshots, evidence photos, corkboard background). Dynamic procedural SVG fallbacks ensure 100% asset coverage with zero broken images or missing files.
- **Case Database Solvability:** 100% of all 100 cases have been validated through automated test assertions, verifying suspect IDs, evidence links, non-empty alibis, and correct deduction logic.
- **Known Limitations:** Client-side local storage can be cleared by private browsing mode; players can re-unlock all cases anytime via the in-game Settings menu.
