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

Recent changes (round 14 — v14, Phase 2: the Parent Console)
------------------------
- The Admin Console is now the PARENT CONSOLE — one PIN-gated place
  with four tabs: Setup (cloud sync, restore, PIN - everything that
  was there before), Insights, Signals and This week's plan.
- Insights: per child and per champ, every topic is graded from the
  last attempts on the device — Strong / Needs practice / Struggling
  / Just starting — with accuracy, average time vs target, attempt
  count and a trend arrow showing whether practice is working.
  (Maths is grouped by topic, quest line and drills; science by
  world from quiz scores; Mind-Champ by case with stars.)
- Signals: his own words — doubt-jar notes, guru notes and journal
  entries — with possible confusion/frustration words highlighted.
  Explicitly labelled as signals to interpret, not a verdict.
- This week's plan: three concrete recommendations (focus, stretch,
  curiosity, or gently re-invite) each with an India-friendly home
  activity, plus a weekly digest (questions, XP, accuracy this week
  vs last, notes, streak).

Recent changes (round 15 — v15, profiles + Melbourne time)
------------------------
- FIXED: changing the name now starts a SEPARATE profile, exactly as
  designed. Previously the hub renamed the current player in place,
  so a new name still showed the old child's progress. Now:
    * the current child's progress is parked under their own name,
    * the typed name loads that child's profile if it exists, or
      starts a fresh empty one if it does not,
    * science-champ does the same (it used to keep the old profile
      when the name was unknown).
  So "Atharv" and a test name each keep their own XP, stars, cases,
  doubts and streaks, and typing "Atharv" again brings his back.
- Science's pencil (rename) now explains that renaming keeps the
  player's progress, and points to "Add player" for a separate child.
- Version badge times are now shown in Melbourne time (AEST/AEDT).

Recent changes (round 16 — v16, Phase 3: Samskritam-Champ)
------------------------
- NEW CHAMP: Samskritam-Champ (संस्कृतम्-चैम्प) — learn Sanskrit the way
  it is really learned: by talking. A guru character holds a guided
  conversation; the child (or a parent!) answers by tapping or by
  SPEAKING into the mic (speech is matched generously against the
  expected phrase). Every line shows Devanagari + transliteration +
  a pronunciation key + meaning, and every known word is tappable for
  its stem, its meaning and its cousins in Hindi/English (mātṛ→maa,
  trayas→three, daśa→decade).
- Five scenes, easy to story: First Words (greetings) → Who Is in Your
  Family? → At the Table (water, food, "-āmi = I do") → How Many?
  (numbers + cognates) → The Thirsty Crow (a Panchatantra tale and its
  moral, buddhiḥ balāt śreṣṭhā).
- Grammar arrives as DISCOVERY: after the child uses a pattern it is
  named ("PATTERN DISCOVERED! pibāmi, vāñchāmi — both end in -āmi").
  No tables first.
- FAMILY MISSIONS: every scene ends with two lines for the child and
  the parent to say to each other ("jalam vāñchasi?" / "ām, jalam
  vāñchāmi"). Both are learners — type a name on the home page and
  each keeps their own progress, XP and streak.
- Shabda-Kosha: a personal word treasury with a quiz. Wrong taps are
  never scolded — the guru simply repeats the line, slowly.
- Cloud sync: the locker is now champSync:5 and carries Sanskrit
  progress (sk + per-learner sks) alongside maths, science and mind.
  Older locker files still load.

Recent changes (round 17 — v17, Phase 4 begins: Investigations + nav fix)
------------------------
- FIXED NAVIGATION: the Parent Guide and the Progress Passport were
  borrowing Math-Champ's menu, whose links are relative to the maths
  folder — so "Gurukool" (and the other links) threw a GitHub 404.
  Both pages now have their own menu with a proper HOME button, plus
  Parent Console and the four champs.
- NEW: Science-Champ INVESTIGATIONS (linked from the science home
  page) — hands-on mysteries in the Phase-4 style: predict first,
  find the proving clue, run a home experiment, DRAW it, then answer
  with evidence. Three investigations:
    * Why does the charger get hot? (electricity & electrical basics)
    * Why does the ball bounce lower each time? (physics: energy)
    * How does a computer know what to do? (programming: algorithms,
      with a bug-hunt ordering puzzle and the literal-sandwich test)
  Progress is stored on the science profile and XP goes to science;
  the keypad + mic work on the number step. Safety rules are stated
  (never open a plug, never touch metal pins).

Recent changes (round 18 — v18, Samskritam speaker fixed)
------------------------
- BUG FIXED: in Samskritam-Champ the 🔊 speaker did nothing when
  tapped. Two causes, both fixed:
    * the button's click handler was built with double quotes inside
      a double-quoted HTML attribute, so the tap never fired at all;
    * and even when it fired, the device's voice was not chosen, so
      some devices stayed silent.
  Now the speaker picks a Hindi/Sanskrit voice when the device has
  one, otherwise it reads the transliteration with an Indian-English
  voice (still very understandable), and if there is no voice at all
  it shows the pronunciation key instead of leaving silence. The home
  page also tells a parent how to add a Hindi voice (iPad Settings ->
  Accessibility -> Spoken Content -> Voices -> Hindi).

Recent changes (round 19 — v19, Phase 4: Eureka moments + book recommendations)
------------------------
- MATHS — EUREKA MOMENTS: when a topic is genuinely mastered (6+ tries
  at 80%+ accuracy, or a quest line finished), a popup shows once —
  and only once per topic per month — explaining how that maths lives
  in the real world, with a "go see it yourself" micro-mission
  (cricket overs for fractions, discount tags for percentages, egg
  trays for multiplication, timetables for time, sharing a roti for
  division). Rare on purpose. It never interrupts a mission — only
  the maths home and dashboard show it.
- SCIENCE — FOR CURIOUS MINDS: book recommendations that appear only
  when a world is truly mastered (quiz 80%+) or the child has asked
  3+ questions in that world, once per world per month, and each one
  says WHY that book. Picks are widely available and age-right (DK,
  Horrible Science, The Way Things Work, George's Secret Key...).
- Maths training areas now say plainly: this is not a test — practice
  is how a discovered trick becomes fast.

Recent changes (round 20 — v20, speaker hardened + Phase 4 complete)
------------------------
- SANSKRIT SPEAKER, hardened for iPad Safari:
    * voices are primed on the first touch (Safari often reports NO
      voices until the speech engine has been used once);
    * it listens for voiceschanged and caches the list;
    * voice order: Hindi/Sanskrit -> Indian English -> any English ->
      the device's default voice (before, a device with none of the
      first three stayed silent);
    * if nothing starts within a second it retries once with the device
      default, and only then shows the pronunciation key;
    * a "Test the speaker" button on the Samskritam home (top of the
      page) reports which voice was found and reminds a parent that a
      muted iPad (side switch) or low volume silences speech.
- PHASE 4 COMPLETE: the maths training areas are now framed as
  Technique Training (not a test) — Mission, Word Problems Lab and
  Speed Lab all say plainly what they are for.

Recent changes (round 21 — v21, ordering bug + a Krishna-like voice)
------------------------
- BUG FIXED (science investigations): ordering questions had NO Check
  button, so after placing all the cards there was nothing to press and
  the page looked hung. Now:
    * there is a "Check my order" button;
    * the answer is ALSO checked automatically when the last card is
      placed (so it can never feel stuck);
    * a wrong order says so kindly and suggests tapping undo and
      thinking about which step comes first.
- SANSKRIT VOICE, two improvements:
    * it now sounds like a young boy (Krishna-like): pitch raised to
      1.5 and a slightly gentler pace;
    * VISARGA is now spoken clearly: ḥ is a soft breath, so the app
      spells it out for the device (धन्यवादः -> धन्यवादह, dhanyavādaḥ ->
      "dhanyavaadaha"). Anusvara (ं) is spoken as "m".
  The Test-the-speaker button now says "namaste! dhanyavādaḥ. aham
  guruḥ asmi." so a parent can hear the visarga fix immediately.

Recent changes (round 22 — v22, delete a learner)
------------------------
- NEW: a Delete button in the Parent Console's "Players on this device"
  card. Deleting removes that learner from EVERY champ on the device
  (maths, science, mind and Sanskrit), so a test name or a wrongly
  typed name can be cleaned up.
- Deletion is guarded: the parent must type the name exactly, and the
  console warns that it cannot be undone.
- If the deleted learner was the active player, the device hands over
  to another player (or clears the name so the home page asks again).
- IMPORTANT, because progress MERGES from the cloud: a plain delete
  would have been resurrected by the next sync. So a deletion now
  writes a "tombstone" that travels inside the locker (champSync 5
  gains a del field). Every champ's merge skips tombstoned names, and
  the push never re-uploads them, so the deletion spreads to the other
  devices on their next sync and stays deleted.

Recent changes (round 23 - v23, Phase 5: the learning rhythm)
------------------------
- SUCCESS SANDWICH: never two hard questions in a row. Two wrong
  answers in a row now serves one easy, always-winnable warm-up
  question, with technique-praise ("you took your time and checked it")
  rather than talent-praise. It is a gift, not a gate - the child is
  never blocked, and the warm-up hands them straight back to their
  real question. Wired into maths word problems, the science quiz and
  practice questions, the Mind-Champ puzzles and the Sanskrit word quiz.
- STREAK INSURANCE: one missed day is forgiven per calendar month, in
  every champ. A longer gap still restarts the streak honestly. The
  console digest reports whether the shield is ready or used.
- NATURAL STOPPING POINTS: after about 20 minutes of real work a
  friendly wrap-up is offered once a day ("stopping here is a smart
  move"), with a keep-going option that snoozes it for 10 minutes.
  Learning ends on a high rather than on exhaustion.
- WEEKLY DIGEST in the Parent Console: minutes of real work (from the
  new learning clock, kept on this device only), maths questions and
  XP for the week, accuracy against last week, Sanskrit scenes and
  treasury words, day streak, a seven-day activity strip, and a short
  written summary naming what is strong, what needs a hand, and whether
  the streak shield was used.
- MIND-CHAMP "THE DETECTIVE FILES": five new cases (25 puzzles) on
  inference - reading between the lines. The techniques are the small
  words (only, except, never), comparing two statements, checking the
  times, noticing what is NOT said, and cross-off-then-conclude. They
  follow the five Minecraft cases and appear under a "Detective Files"
  heading on the Mind-Champ home screen.
- Also: Sanskrit learners now appear in the Parent Console player list
  (they were missing before), so they can be renamed or deleted like
  every other player.

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
