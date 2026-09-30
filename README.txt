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
lr-champ/            Logical Reasoning (in construction).
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
