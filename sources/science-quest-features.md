# ScienceQuest — Complete Feature List (v11 "Level Ladder" edition)

**What it is:** a single self-contained HTML file (`ScienceQuest.html`, ~520 KB, by Gurukool) — a gamified science-tutoring game for an 11-year-old preparing for ICAS / science olympiads. Works fully offline on iPad and laptop; progress moves between devices. Theme matches the "Olympiad Champ" maths app (cream / terracotta / teal). Science only — the maths app is a separate project.

---

## 1. Content — 29 Worlds
Each world (except Trivia) has **4 lessons, 2 practice challenges, and a 3-level quiz ladder**.

1. ⚡ Physics Lab
2. ✈️ Flight & Space
3. 🧪 Chemistry Corner
4. 🌿 The Living World
5. 🧩 Logic Dojo
6. 🔌 Electricity & Magnetism
7. 🌈 Light & Sound
8. 🌡️ Heat & Energy Flow
9. 🫀 Human Body Factory
10. 🌏 Earth & Weather
11. 🌐 Internet & AI
12. 💎 Materials Lab
13. 🔭 Skywatcher's Guide
14. 👨‍🔬 Great Scientists' Hall
15. 🍳 Kitchen Science
16. 💻 Coding Camp
17. 🤖 Robots & Drones
18. ⚛️ Quantum Realm
19. 🧬 Genetics Gateway
20. 🕉️ Vedic Science
21. 🧫 Acids & Bases
22. 🚢 Sinking & Floating
23. 🚀 ISRO & Space Missions
24. 🌌 Stars & Black Holes
25. 🌳 Eco Web
26. 🌋 Restless Earth
27. 🔍 Light Machines
28. 🦠 Micro World
29. 🏆 Trivia Arena (mixed questions from every world + bonus pool)

- Explanations are kid-friendly, story-driven, and use Indian context (₹ / lakh / crore, ISRO, NCERT-aligned topics).
- ~90 Sanskrit twin-words connect science terms to Indian-language roots (in the glossary and the Vedic Science world).

## 2. Animated Diagrams (132 total)
- Every diagram is a hand-drawn inline SVG — **no internet images anywhere**.
- **Every single diagram animates** (a permanent automated test enforces zero static diagrams).
- All animations are CSS-based (SMIL is banned — it doesn't run on iPad Safari when injected via innerHTML). Animation library: flow arrows, bobbing, pulsing, falling apple, energy bars, levers, spinning questions, bubbles, liquid/gas particles, nerve signals, electron march, orbiting electrons, twinkling, waves, heat columns, DNA, radiation, and more.

## 3. ICAS-Style Quizzes + Level Ladder
Every quiz question follows the ICAS shape: a **scenario/data stimulus** → 4-option multiple choice → full explanation of the answer. Each world's Quiz tab shows a ladder:

- **🥉 Level 1 — Foundation:** the world's scenario-question pool. Best score saved, ⭐ ratings (70% = ⭐⭐, 100% = ⭐⭐⭐).
- **🥈 Level 2 — Olympiad Challenge:** 75 brand-new harder questions (multi-step calculations, data interpretation, experiment design — one set per world). Score **100% to unlock the next rung** (strict olympiad discipline, chosen by the parent).
- **⚔️ Level 3 — Chaos Arena:** endless timed streak mode. 15 seconds per question, questions reshuffle infinitely, **one wrong answer ends the run**. The score is your best streak. +5 XP per correct answer.
- Perfect runs trigger unlock celebrations (confetti, "🔓 LEVEL 2 UNLOCKED", "⚔️ CHAOS ARENA UNLOCKED").

## 4. 🗺️ Journey Map (progress tracking)
A home-screen page showing every section as a row: `L1 ✅ · L2 🔓/🔒 · Arena best streak`, with locked rungs greyed out, a summary count at the top ("Level 1 cleared: X/28 · Level 2 cleared: Y · Arena streaks set: Z"), and next targets — so it's always visible what's done, what's unlocked, and what's left.

## 5. Prerequisites (soft recommendations)
18 dependency links between worlds — e.g. Quantum Realm → Physics Lab first; Optics → Light & Sound; Micro World → Human Body; ISRO → Physics + Skywatcher; Robotics → Coding + Electricity. Worlds with unfinished prerequisites show "🧭 Suggested first: …" but the learner can jump anyway (soft, not enforced — parent's choice).

## 6. Mission Mode — 1-hour adaptive sessions
- Big banner on the home screen starts a session; a session clock shows x/60 minutes.
- Session flow: **recap** (quick questions on concepts from the last session — tracks the last 8 lessons read) → **story** (Professor Chaos episode) → **teach** → **quiz** → adaptive step (score < 50% → reteach; ≥ 80% → skip the second teaching pass) → **boss battle** → done.
- Mission picks the world with the fewest lessons done, else the weakest quiz area.

## 7. Professor Chaos — villain story mode
- Story premise: Professor Chaos is "un-teaching" the universe; the player restores concepts.
- Intro and outro sequences; a hook + cliffhanger tale for every one of the 29 worlds; taunts when the player answers wrong (shown in red during quizzes); cheers for good runs.

## 8. Practice Challenges
Two typed-answer challenge problems per world with a "Show steps" walkthrough (steps always available), worth 20 XP each.

## 9. Glossary
154 science terms, each with a simple definition + everyday example, plus Sanskrit twin-words on Indian-rooted terms.

## 10. Doubt Jar
The learner can save any doubt that comes up; a parent view (behind the PIN) collects them for follow-up.

## 11. Progress, Rewards & Profiles
- XP for lessons, quizzes (10 XP per new best point), practice (20 XP), arena (5 XP per correct), +30 XP per level-unlock bonus.
- Level titles as XP grows; daily streak tracking.
- **12 badges:** First Steps 🌱, Bullseye 🎯, Streak 🔥, World Explorer 🧭, Olympiad Contender 🏅, Body Expert 🫀, Skywatcher 🔭, Drone Pilot 🛸, Quantum Curious ⚛️, Vedic Scholar 🕉️, Perfect 3 💯, Grand Scientist 🏆.
- **Multi-child profiles** with per-child XP, progress, doubts, and level ladders.
- **Parent PIN** protects settings/sync/doubt-jar areas.

## 12. Portability & Sync (iPad ↔ laptop)
- **Save Codes:** copy/paste a code to move progress between devices.
- **GitHub cloud sync:** save/load progress to a GitHub repo (stub-tested; real-device test pending).
- **Merge semantics — progress is never destroyed:** loading a code or cloud save merges (max XP/scores, union of badges/visited, per-world max level & best streak, union of doubts). Codes from all older versions (SQ1/SQ2/SQ3) still load. Existing perfect quiz scores from earlier versions are auto-migrated to count as Level 1 cleared.

## 13. Sound & Feel
- Bansuri (Indian flute) sound effects for correct/wrong/level-up/time-up.
- Confetti celebrations, kid-friendly copy, story-driven suspense.

## 14. Engineering & Quality
- Single self-contained file, zero external dependencies, works offline.
- Automated test suite: **37 checks, all passing** — world/lesson/question structure, ladder unlock logic (100% rule), arena streak logic, journey map, prerequisites, migration of old saves, cloud-merge safety, mission-mode flow, no SMIL anywhere, zero static diagrams.
- Design constraints: no internet images; every diagram self-drawn SVG with CSS animation; Indian context throughout.

## Known limitations (honest notes)
- Cloud sync is stub-tested only — a real-device GitHub sync test is pending.
- Two minor session fields (recent-lessons list, mission count) don't yet carry through cloud merge — accepted as cosmetic.
- No offline AI — all tutoring content is pre-authored.

---

*Carry this document into a new chat to give full context: "This is the feature spec of ScienceQuest.html — continue development from here." The current file is v11 (515 KB, 29 worlds, 132 animated diagrams, 75 Level-2 questions, 37 passing tests).*
