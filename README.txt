GURUKOOL — one home for every champ
====================================
A self-contained, offline-first training site for an 11-year-old
olympiad hopeful. No accounts, no server, no tracking — everything
lives in the browser (and moves via save codes or a private GitHub
repo when you want it to).

Recent changes
--------------
- iPad readability pass: all HTML text in Math-Champ and
  Science-Champ (questions, options, lessons, buttons) bumped ~15%.
  SVG diagrams were left as-is (they already scale to the screen).
- Digits instead of spelled-out numbers in every quiz question and
  mission generator (e.g. "two propellers" -> "2 propellers"), so
  young readers never have to decode number words mid-question.
- Science missions now teach ALL lessons of a world before any quiz
  or boss questions — a first-time player who jumps straight into
  Mission Mode can no longer meet concepts (e.g. kinetic energy)
  before they are taught. The "Got it" button reads "next lesson!"
  while lessons remain, then "quiz me!".
- Math mission: subtraction questions never produce negative answers
  (bigger number is always first).

Recent changes (round 3)
------------------------
- No repeated questions: the math mission never serves the same
  question text twice in one session (it re-generates until fresh);
  science missions track asked questions so the quiz, boss battle
  and recap never repeat one, and recent missions avoid recently
  asked questions across sessions.
- Explain-simply dictionary doubled (154 to 300+ entries): kinetic
  energy, oxygen, bacteria, ISRO missions, quantum computing and
  many more. Selecting a single word (like "kinetic") now finds its
  concept, and Sanskrit terms with diacritics match too.
- Diagram readability: all 132 science diagrams audited; every
  diagram's canvas now auto-expands so labels are never cut off at
  the edge, and the 7 worst text-collision diagrams (electricity
  circuits, Kalam timeline, zero/thermos, heart, energy staircase,
  Newton's laws) were re-laid out by hand.
- Fixed a word-problem generator that asked for change from a note
  smaller than the price.

Recent changes (round 4)
------------------------
- Kid Keypad redesigned as a horizontal bar docked at the base of
  the screen (mission, word problems, speed lab): 1-9, 0, decimal,
  sign, plus, backspace in one row, wide Check button, and it wraps
  neatly on narrower screens.
- New mic button (voice typing): tap and speak the answer or an
  equation. Speech is converted to math on the fly - "forty three"
  becomes 43, "five plus four" becomes 5+4, "two lakh" becomes
  200000, "three point five" becomes 3.5. Works in Safari (needs
  internet); shows a friendly note otherwise.

Recent changes (round 5 — v5)
------------------------
- Version badge: every page now shows a small pill at the bottom
  right: "Gurukool v5 · 30 Sep 2026, 7:45 pm IST". Compare it with
  the version you were told about to confirm the site is current.
  version.js at the repo root is the single file to bump on each
  release.
- progress.json (the cloud-locker file) can now be imported directly
  on a new device TWO ways: the Progress Passport's file picker and
  the Admin Console's "Restore a backup file" both accept it, plus
  the old GK1 codes and gurukool-progress-DATE.txt backups. The
  Passport error message now names progress.json too.

Recent changes (round 6 — v6)
------------------------
- Cloud sync now runs every 3 minutes (was 10) on every open champ
  page: pulls the family's latest progress, merges it, pushes it back.
  Pulled progress is adopted live on screen (dashboards also quietly
  refresh every 3 minutes) unless a mission or quiz is in progress.
- Per-child progress: maths now keeps a separate profile for every
  child, keyed by the name you enter. The cloud file (progress.json,
  format champSync:3) carries EVERY child's maths progress, and each
  device makes the child named on it the active one. Enter "Atharv"
  on a laptop and you see Atharv's maths + science progress; enter
  another child's name and theirs loads instead. Science profiles
  are also auto-selected by the entered name. Older champSync:2
  cloud files still load fine.
- To use on a new laptop: open the Admin Console there once, set up
  cloud sync with the same GitHub locker (owner/repo/token), then
  enter the child's name on the Gurukool home page.

Recent changes (round 7 — v7)
------------------------
- NEW force-sync cloud button (☁️): Math-Champ has it in the top nav on
  every page (after Dashboard); Science-Champ has it in the home top bar
  (next to the sound button). One tap pulls the latest progress from the
  family cloud, merges it, shows it on screen and pushes everything back.
  The button shows ⏳ while syncing, ✅ when done, ⚠️ if cloud sync is not
  set up on that device (a parent can set it up in the Admin Console).

Recent changes (round 8 — v8)
------------------------
- Math-Champ dashboard: the speed curve now tracks ALL timed activity —
  word problems (dots) AND Training Mission questions (squares) — so it
  updates with everything the child does. Speed-Lab drills are left out
  because they time a whole 10-question round, not one question. The top
  KPI cards ("Questions solved", "Question accuracy", "Avg solve time")
  also count both word problems and missions now.

Recent changes (round 9 — v9)
------------------------
- NEW CHAMP: Mind-Champ (🧠) replaces the LR-Champ placeholder — hands-on
  reasoning through story cases instead of learn-then-test. World 1 is
  "Minecraft Quests": 5 quest levels x 5 puzzles (25 total), easy -> boss.
  Puzzle types: number/word answers, multiple choice, two-part answers
  (conclusion + the clue that PROVES it), tap-to-order sequences, tap-to-fill
  logic grids, an interactive balance scale, and a sketch pad for drawing
  routes. Wrong answers get Socratic hints; "how a champion thinks" shows the
  worked technique. Each closed case unlocks a named TECHNIQUE into the
  child's toolkit, plus a guru-note ("how I cracked it") saved to the case
  file. Same XP + rank ladder, streaks, per-child profiles by name.
- Cloud sync locker format is now champSync:4 — it carries Mind-Champ
  progress too (mc + per-child mcs), alongside maths (oc/ocs) and science
  (sq). Older locker files still load fine.

Recent changes (round 10 — v10, Gurukool 2.0 begins)
------------------------
- Math-Champ: NEW "Technique Quests" page — The Equation Forge: 25
  hands-on puzzles across 5 levels teaching equations the right way:
  = as a balance beam, BODMAS as recipe order, moving terms across
  the equals sign (with the sign-flip "river toll"), undoing multiply
  with divide (splitting bags), and taking out common factors. Two-
  part evidence puzzles train reading between the lines. Full keypad
  + mic on the answers. XP counts toward Math-Champ ranks and the
  speed curve (diamonds).
- Cloud sync: oc_state now carries quest progress (merged per quest
  line on every sync, all 4 engine copies).
- This starts the Gurukool 2.0 rebuild: uniform hands-on technique
  quests across all three champs. Next: parent intelligence console,
  then science investigations + physics/electronics/programming
  basics + inference (Sherlock) world.

Recent changes (round 11 — v11, Math-Champ rebuild: shell)
------------------------
- Uniform Gurukool header on EVERY Math-Champ page (same bar as
  Mind-Champ): level badge, XP bar, learner name chip, XP, streak,
  cloud-sync button and the Gurukool home link. One shared function
  (buildNav) drives all 7 math pages, so the whole champ looks and
  behaves the same everywhere.
- Math home page now opens with a "Technique quests" banner linking
  to The Equation Forge, so hands-on discovery is front and centre
  before the training grounds.
- Next in the math rebuild: Training Ground reskin + a second quest
  line (word-problem inference: reading between the lines).

Recent changes (round 12 — v12, Math-Champ rebuild: second quest line)
------------------------
- NEW quest line: "The Riddle Bazaar" — 5 levels x 5 word-problem
  inference puzzles, aimed at reading between the lines: Read Every
  Word, Spot the Hidden Fact, Ignore the Distraction, Draw the
  Situation, Check What's Asked. Two-part evidence answers ("which
  fact proves it?"), the classic traps (all but 9, pen + notebook,
  the marble jar) and a sketch pad for the drawing level.
- The quests page now has TABS for both quest lines (The Equation
  Forge / The Riddle Bazaar), each with its own level chain and its
  own technique shelf. Both feed the same XP, ranks and speed curve.
- Math home banner updated to point at both lines.

Recent changes (round 13 — v13, Phase 1 complete: Science-Champ unified)
------------------------
- Science-Champ now wears the SAME uniform Gurukool header as
  Math-Champ and Mind-Champ, on EVERY view (home, world, mission,
  journey, quiz): level badge, XP bar, player chip, XP, streak,
  doubts, badges, cloud sync, mute, Dashboard, Parents and the
  Gurukool home link.
- Science-Champ practice questions now use the horizontal KID KEYPAD
  + MIC at the bottom of the screen (same pad as maths), so the iPad
  keyboard is no longer needed to answer. The pad's Check button
  presses Enter on the focused answer box.
- Phase 1 (uniform look, keypad/mic everywhere, kid dashboards) is
  now COMPLETE across all three champs.

What lives here
---------------
index.html            The hub. One name for the whole family, the XP
                     scoreboard for both champs, the shared Passport,
                     and the door to the Admin Console.
admin.html            The ONE central parent console (PIN-gated):
                     cloud sync settings, disconnect, backup/restore,
                     PIN change. Champs carry zero cloud/settings UI.
passport.html        Shared Progress Passport: both champs on one
                     page, one combined code (GK1.) to move both,
                     PIN-gated import, file download/load.
parent-guide.html    The plain-language manual for parents.
mind-champ/          Mind-Champ: hands-on reasoning cases (Minecraft Quests world).
icon.png              The Gurukool ॐ app icon (also used for the
                     iPad home screen and browser tab).
manifest.json        Home-screen app metadata (standalone, full screen).

math-champ/          Math-Champ — the maths coach
  index.html         Home: greeting by name, rank, XP, next rank,
                     streaks, journal, mission banner, drills.
  mission.html       Training Mission: adaptive practice engine.
                     Pick a 10/30/60-minute mission; it poses
                     questions across 9 topics (arithmetic,
                     fractions, percentages, word problems with
                     ratios, multi-leg average speed, number
                     sense, Pattern Detective...), measures
                     accuracy AND speed, climbs
                     difficulty when cruising, re-teaches and
                     re-tests weak spots until they improve, ends
                     with a per-topic report. Kid Keypad works here
                     too. Same XP/badges as everywhere. Pattern
                     Detective trains olympiad-style shape
                     sequences: find the step, anchor it at shape 1,
                     then work backwards to big numbers.
  word-problems.html Core trainer: 13 word problems in 3 levels;
                     timers, step-by-step solutions, journal.
  speed-lab.html     Timed drills (multiplication, divisibility,
                     primes) with score history.
  toolbox.html       Parent/child tools: journal, reference sheets.
  dashboard.html     Progress: XP chart, time-vs-target scatter,
                     badge wall, history, reset zone.
  assets/app.js      The shared engine (state, XP, badges, ranks,
                     PIN gate, save codes, cloud sync module).
  assets/style.css   The design language (cream/terracotta/teal).

science-champ/       Science-Champ — the science coach
  index.html         The game shell: world grid, lesson views,
                     ICAS-style quiz ladder, Chaos Arena,
                     missions (Professor Chaos), practice
                     challenges, glossary, doubt jar. Slim page —
                     loads the engine and content from assets/.
  dashboard.html     Progress page in the same style as Math's.
  assets/content.js The content bank: 29 worlds of lessons,
                     132 hand-drawn animated SVG diagrams, quiz
                     questions, glossary, stories.
  assets/app.js     The game engine: state, XP, shared rank
                     ladder, missions, profiles, PIN gate, cloud
                     sync module (byte-identical to Math's).
  assets/style.css  The design language — same fonts, palette and
                     shared topnav as Math-Champ.

2026 rebuild notes: Science-Champ was re-housed in the Math-Champ
structure (multi-file, shared topnav, elevated cards, one design
language) and the 14 weakest diagrams were fully redesigned —
labeled, colored and animated.

Quick start (parent)
--------------------
1. Open index.html — set the child's name (asked once, shared by
   both champs) and a 4-6 digit PARENT PIN (also asked once; it
   protects both champs, the console and the passport).
2. Bookmark or Add to Home Screen on the iPad — the app runs full
   screen with the ॐ icon.
3. On a second device, open the Admin Console → Sync: enter the
   same GitHub repo details; progress flows silently both ways
   (auto-save every 10 minutes, instant local saves).

Moving progress
---------------
- Save codes: Math (OC1.), Science (SQ1./SQ2./SQ3.) and the
  combined Passport code (GK1.). Codes MERGE — loading never
  destroys progress.
- Cloud sync: private GitHub repo, JSON backups, dated. The
  console lists every backup; restore picks one.
- The engine keeps working fully offline — codes/cloud are
  optional extras.

Kid Keypad (touch devices)
--------------------------
On iPads and phones, Math-Champ shows its OWN big-button number pad
under the answer box (7 8 9 / 4 5 6 / 1 2 3 / 0 . minus, backspace,
GO) instead of the system keyboard. Partial answers like "72."
survive mid-typing, a second decimal point is ignored, and GO
submits. Desktops with a real keyboard are untouched.

Rank ladder (shared, both champs)
---------------------------------
Rookie 0 XP -> Explorer 120 -> Challenger 300 -> Bronze Olympian 550
-> Silver Olympian 900 -> Gold Olympian 1350 -> Gurukool Champion
2000. Science badges/stars sit on top of the same ladder.

Storage (for the curious)
-------------------------
cc_name            the child's name (shared)
cc_pin             the parent PIN (shared)
oc_state           Math-Champ progress
sq_v3              Science-Champ progress

Engineering notes
-----------------
- Zero dependencies; every page works from file:// or any static
  host (GitHub Pages works well).
- Automated test suites in the dev-tests zip (fullscreen, keypad,
  polish, mission) — 181 checks, all green at delivery.
- To add a new champ: copy math-champ's structure, reuse the
  engine patterns (state/XP/badges/PIN/cloud module), then link it
  from index.html. See "ADDING A NEW CHAMP" below.

ADDING A NEW CHAMP
------------------
1. New folder lr-champ/ (already stubbed) with index.html +
   assets/app.js + assets/style.css following math-champ.
2. Reuse the shared key names (cc_name, cc_pin) and the ChampSync
   cloud module verbatim from math-champ/assets/app.js.
3. Link the new champ from index.html's grid; add its XP to the
   scoreboard and the Passport (passport.html reads oc_state and
   sq_v3 today; extend the pattern for a third champ).
4. Add tests to the dev-tests suite (boot, PIN gate, cloud-safe).

* Built by Gurukool for Atharv. Free to fork and adapt for your
  own classroom or household.
