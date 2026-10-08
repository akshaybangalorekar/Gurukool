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

Recent changes (round 24 - v24, The Olympiad Ladder)
------------------------
- NEW PAGE: math-champ/olympiad.html - "The Olympiad Ladder". Real
  Olympiad-style questions starting at Grade 5 (age 11) and climbing to
  Grade 7. 32 problems to begin with, across fractions, ratio, percentage,
  prime numbers, balancing equations, adding and subtracting, logic and
  multiples, average speed, profit and loss, time, counting, geometry and
  data. Linked from the maths navigation bar and the maths home page.
- HOW EACH PROBLEM TEACHES (built to the rule "do not give the answer
  until he starts thinking"):
    1. "What do we know?" pulls the DATA out of the words - the facts
       only, never the method.
    2. "Guide me step by step" runs a Socratic ladder: one small question
       at a time, each checked. The ladder never states the final answer.
    3. Nudges appear after a wrong try; the full worked solution is
       offered only after a real attempt, and even then he must still
       type the final answer himself.
- No problem ever repeats: solved problems are marked and the "Next
  problem" button serves the next unsolved one at the same grade.
- Accurate diagrams drawn as SVG (a 10-part bar for the car park, a bar
  model for the linked-age ratio, and the four congruent 3-4-5 triangles
  inside a square of side 5, where the shaded area is exactly 1/25).
- XP for each problem (20 first try, 10 after help, 5 after the worked
  solution) is recorded through the normal maths log, so it shows on the
  dashboard and syncs like everything else.
- Also wired into the learning rhythm: the success sandwich can fire here
  too, so two hard wrong answers in a row still earns a friendly warm-up.

Recent changes (round 25 - v25, a calmer Maths front door)
------------------------
- NEW LAYOUT: the maths home is now one simple question - "What shall we
  do today?" - with a single suggested first button (Today's plan) and
  four plain choices:
      Teach me a topic  - learn one idea properly, step by step
      Test me today     - ten mixed questions, private to the child
      Practise a skill  - short drills on one technique
      Something harder  - the Olympiad ladder
  Every choice has a one-line explanation in plain English. Nothing else
  is on the screen.
- NEW LEFT RAIL: a slim vertical index down the left (Home, Teach, Test,
  Practise, Progress, More) so nothing needs scrolling to get somewhere.
  Mission, Quests, Word problems, Olympiad, Toolbox and the dashboard now
  live behind "More". The top bar is reduced to identity and progress
  (name, rank, XP, streak, save, home) - no navigation clutter.
- NEW "TEACH ME A TOPIC" (teach.html + assets/teach.js): six topics so far
  (fractions, ratio, percentages, balancing equations, average speed,
  primes). Each is taught the way a tutor does it - one small idea, then
  one small check that must be answered before moving on - followed by six
  fresh practice questions at easy, medium and hard.
- NEW "TEST ME TODAY" (test.html): ten mixed questions built from the
  topics he has actually met, fixed for the day so it cannot be gamed by
  refreshing. Two nudges, then the worked solution rather than a dead end.
  Ends with a score, stars and a per-topic breakdown. Results are kept on
  the device for the child only - the Parent Console deliberately ignores
  them.
- NEW QUESTION GENERATORS (assets/gen.js): eight topics x three levels,
  built with random numbers so practice never repeats. Every generated
  question carries its data, two nudges and a worked solution, and the
  test suite verifies the answers by re-deriving them (it caught a badly
  built equation and a "greater than" that was not greater).
- The learning rhythm still applies here: two hard wrong answers in a row
  earns a friendly warm-up.

Recent changes (round 26 - v26, one navigation and a session that plans itself)
------------------------
- EVERY maths page now shares ONE navigation, grouped by what the child
  wants to do rather than by app feature:
      Today      - one prepared session, about an hour
      Learn      - understand a topic, step by step
      Practise   - word problems, training mission, and the daily test
      Play       - technique quests, riddle bazaar, speed lab
      Challenge  - Olympiad ladder and the hardest word problems
      Progress   - the dashboard
  Mission, Quests, Word problems, Speed Lab, Olympiad, Toolbox and the
  dashboard are all still there - they now sit inside those groups or
  behind "More". The old pages (mission, quests, word-problems, speed-lab,
  toolbox, olympiad, dashboard) were remapped onto the same rail, so the
  whole champ feels like one app instead of eight pages.
- NEW "TODAY'S SESSION" (session.html + assets/session.js): for the days a
  child arrives with no agenda. It reads his own history - skill estimates,
  accuracy per topic and which lessons he has done - and prepares about an
  hour in five familiar parts: warm up, learn the weakest topic, practise
  it with fresh questions plus one NEW topic, a short mixed check, and an
  optional hard Olympiad problem.
- The next session is prepared the moment he finishes this one, so when he
  comes back he presses one button. Leaving the page mid-session does not
  lose his place.
- The maths home now leads with "Start today's session", with the reason
  in plain English underneath ("Built from fractions, the one that most
  needs work, plus one new topic: ratio"), and four plain choices below:
  Teach me a topic, Test me today, Play a game, Something harder.
- Session answers are recorded as kind 'session' so the work still counts
  towards XP, skills and the dashboard.

Recent changes (round 27 - v27, four boxes and the first real projects)
------------------------
- FOUR BOXES ONLY, grouped by what the child wants to do. Practice is no
  longer a separate choice: it lives inside Learn, and the questions rise
  with his level on that topic.
      Learn a new trick   - a lesson, then practice at his level
      Games & puzzles     - riddles, quests and timed games, no marks
      Beat the hard ones  - the Olympiad ladder and the level 3 problems
      Build something real- the projects below
  Plus "Today" (the prepared hour) as the first button, and Progress now
  opens from the XP chip in the top bar. The old practice.html was removed;
  nothing appears in two places any more.
- Each box now carries a hook, a plain-English promise and a "what is
  inside" line, so a child who will not read a description can still see
  what he is choosing.
- TOPIC LEVELS (assets/levels.js): every topic has a level - not started,
  getting it, solid, mastered - worked out from his own accuracy and how
  many questions he has answered. Learn shows the level on each card, and
  the practice questions are chosen to match it.
- THE HOME BUTTON now behaves as asked: on the maths home it goes to the
  Gurukool hub; on every page inside the champ it goes back to the maths
  home. The Gurukool hub is also in the More sheet.
- NEW: BUILD SOMETHING REAL (projects.html + assets/projects.js). Real
  projects, visible from the start but locked until the skills they need
  reach Level 2, with the prerequisite checklist shown on every card:
      ROCKET to the Moon and Mars - throw a ball hard enough that it never
        lands (an animation with a speed slider), why a rocket is nearly
        all fuel, the launch window with Earth and Mars actually orbiting,
        and why Mars is 150 times the journey
      THE PIZZA TRICK - prove whether two 8-inch pizzas beat one 12-inch,
        with the real areas drawn to scale
      plus F1 corner speed, roller coaster, bridge and tennis, marked as
        being built, each showing the skills it will need.
  Every step teaches one idea, shows an animation, then asks one question.
- Animations are hand-drawn SVG (no libraries, works offline).

Recent changes (round 28 - v28, all six projects built)
------------------------
- BUILD SOMETHING REAL now has all six projects fully built, each with
  its own animations:
      ROCKET to the Moon and Mars  - the ball-throw slider, the launch
        window with Earth and Mars orbiting, fuel fractions, Mars distance
      THE PIZZA TRICK              - real areas drawn to scale
      F1 CORNER SPEED              - a radius slider showing the maximum
        speed, the square-root secret (double the radius, only 1.4x the
        speed), the racing line, and worn tyres costing 11 per cent
      ROLLER COASTER               - the first hill as the energy budget,
        speed at the bottom (v = square root of 2gh), friction losses, and
        designing the second hill
      BRIDGE                       - why triangles never wobble (press push
        and the square falls over), and how two supports share a load in a
        ratio (2:1 off centre, 3:1 at a quarter)
      TENNIS                       - the 45 degree best angle, why topspin
        dips, aiming 3/4 deep, and a 200 km/h serve giving 0.43 seconds
  Every step teaches one idea, shows an animation, then asks one question.
  All six are locked until the skills they need reach Level 2.

Recent changes (round 29 - v29, the parent view of levels and batches)
------------------------
- PARENT CONSOLE now shows, under Insights:
    "Topic levels and pace" - for every topic in the current batch: his
      level (not started / getting it / solid / mastered), how many
      questions, his accuracy, and how many days it took him to reach the
      level he is on. So a parent can see not just where he is but how
      fast he is moving.
    "Topic batches" - a progress bar for the current batch of eight
      topics, which ones are still to master, and a clear message when the
      batch is complete: "Time to ask for the next batch". The next batch
      of eight topics is listed underneath, so it is obvious what comes
      next.
- assets/batches.js holds the batch plan (three batches of eight topics)
  and the topic names, used by both the console and the app.

Recent changes (round 30 - v30, batch 1 is complete at eight topics)
------------------------
- Two more topics added so the first batch really is eight teachable
  topics, each with a lesson AND questions:
      TIME  - sixties counting, adding hours then minutes, carrying past
              60, and 24-hour times
      MONEY - equal items as multiplication, change as subtraction,
              discounts, and the classic trap that profit is measured
              against the cost price
- The money generator had a real bug: a "how much change is left"
  question could ask for change from a purchase that cost more than the
  money he had, giving a negative answer. Fixed, and swept over 6000
  generated questions to confirm.
- Batch 1 (in the app now): fractions, ratio, percentages, primes,
  balancing equations, average speed, time, money. When all eight reach
  Level 3 the parent console says "Time to ask for the next batch", and
  lists the next eight topics.

Recent changes (round 31 - v31, the site was not deploying)
------------------------
- FOUND THE REAL REASON THE APP LOOKED OLD: the GitHub Pages build was
  failing ("Page build failed"), so Pages kept serving an older deploy.
  The site had no .nojekyll file, so Pages was running Jekyll over the
  whole site on every push and choking on something in it.
  Fix: .nojekyll added at the root, so Pages now serves the files exactly
  as they are.
- Also added a version stamp to every local script and stylesheet
  (?v=31). That defeats both the Pages CDN cache and the iPad Home Screen
  app cache, so a new push shows up on the next reload.

Recent changes (round 32 - v32, batch 2: eight more topics)
------------------------
- BATCH 2 IS IN THE APP: eight new topics, each with a tutor-style lesson
  AND its own questions, so it can genuinely be mastered:
      LENGTH     - metres, centimetres, kilometres; which way to multiply
      WEIGHT     - grams and kilograms, and adding weights
      CAPACITY   - litres and millilitres, and how many glasses fit
      SQUARE ROOTS - the backwards question, and area as a square root
      ANGLES     - 180 in a triangle, 360 in a quadrilateral, 540 in a
                   pentagon
      AREA       - rectangle, triangle (half), circle (pi r squared)
      PERIMETER  - a walk round the edge, and the 2 x (l + w) shortcut
      DECIMALS   - tenths and hundredths, and moving the point
  That makes 16 topics with lessons, and 17 with questions.
- The parent console's batch tracker now shows batch 1 AND batch 2, so
  when both are mastered it will point at batch 3.
- Two more generator bugs found by sweeping thousands of questions:
  the angles question could ask for a fourth angle when the first three
  already added to more than 360 (giving a negative answer), and the
  money change question could cost more than the money he had. Both fixed
  and guarded.

Recent changes (round 33 - v33, the deployment is fixed)
------------------------
- WHY THE APP LOOKED OLD: GitHub Pages had stopped deploying. Its legacy
  builder was failing ("Page build failed") and then got stuck, so the
  live site stayed on an older version no matter how often the page was
  reloaded. It was never the browser cache.
- FIX: the Pages source was switched to GitHub Actions (the "Static HTML"
  starter), which creates its own deploy workflow and skips the broken
  builder. The deploy now runs on every push.
- Also added .nojekyll, and a version stamp (?v=33) on every local script
  and stylesheet, so neither the Pages CDN nor an iPad Home Screen app can
  serve a stale file after a push.
- HOW TO TELL IT WORKED: the badge in the bottom right of every page shows
  "Gurukool v33". If it shows an older number, the device is still on a
  cached copy.

Recent changes (round 34 - v34, batch 3: the last eight topics)
------------------------
- BATCH 3 IS IN THE APP: eight more topics, each with a lesson AND its
  own questions, so all three batches are now complete:
      VOLUME      - length x width x height, cubic units, and cubic metres
                    into litres
      SYMMETRY    - lines of symmetry, the regular-shape shortcut, and
                    turning symmetry
      COORDINATES - (x, y) order, midpoints as averages, and distance when
                    one coordinate matches
      MEAN AND MEDIAN - sharing the total out equally versus the middle
                    value, and working backwards from a mean
      READING GRAPHS - with a real bar chart drawn in the question
      PROBABILITY - favourable over total, simplified
      SUBSTITUTION - putting numbers into letters, and 3x meaning 3 times x
      USING A FORMULA - P = 2(l + w), A = (b x h) / 2, v = d / t
- THE LADDER IS NOW 24 TOPICS WITH LESSONS (25 with questions): batch 1,
  batch 2 and batch 3, all reachable from Learn a new trick, with practice
  that rises as his level rises.
- Graph questions now draw the bar chart in the question itself, on the
  lesson page, the daily test and inside a session.
- Bugs caught by sweeping thousands of generated questions this round: the
  reading-graphs question could have a TIE for the tallest bar (so "the
  most" had two right answers), and some means and midpoints came out as
  awkward decimals. All fixed and guarded.

Recent changes (round 35 - v35, a device can no longer get stuck on an old version)
------------------------
- WHY A DEVICE COULD SHOW AN OLD VERSION EVEN AFTER A SUCCESSFUL DEPLOY:
  the version stamp covered the scripts but not the PAGE itself, and both
  Safari and an iPad Home Screen app cache pages hard. So a device could
  keep showing v33 while the server was already serving v34.
- FIX (gk-fresh.js, on every page): the page now asks the server for the
  real version, bypassing the cache. If the page it is running is behind,
  it jumps once to a fresh copy - a different URL, which the browser
  cannot answer from its cache. So from v35 onwards, any device that is
  behind catches itself up the next time it opens.
- Also added no-cache hints to every page.
- NOTE: the very first time a device that is stuck on v33 or older needs
  a manual clear (the old page cannot contain the new check). After that
  it heals itself.

Recent changes (round 36 - v36, Science-Champ gets the same four boxes)
------------------------
- SCIENCE-CHAMP now has the same navigation as Maths, built from the 29
  worlds it already had:
      Learn     - all 29 worlds, each with the stars earned so far, and the
                  rule that reading comes before testing
      Games     - the hands-on Investigations, the rapid-fire arena and the
                  bonus trivia
      Challenge - the Olympiad-style Level 2 questions and the endless arena
      Build     - real projects: code a bouncing ball, build a torch
                  circuit, run a fair test, design a paper rocket, grow a
                  seed under three conditions, explain a machine in a page
  The rail mounts itself from the page filename, so every science page
  (including Investigations and the dashboard) now wears it.
- The Build projects are shown as cards with the skills each one needs,
  marked as being built, so the choice of which to build first is visible
  in the app.

Recent changes (round 37 - v37, Mind-Champ four boxes + the reasoning ladder)
------------------------
- MIND-CHAMP (logical reasoning) now has the same four boxes:
      Learn     - the reasoning ladder AND the ten cases
      Games     - the Minecraft quests, the Detective Files, shape patterns,
                  rotations
      Challenge - the hardest inference, two-rule number series, shifting
                  codes
      Build     - real logic problems: the school timetable clash, the
                  wedding seating plan, the power cut, the bus route puzzle
- THE REASONING LADDER (mind-champ/assets/reason.js) covers the exam skills
  that EduTest, AAS, ICAS and Olympiad papers test and that no other champ
  had:
      VERBAL       - analogies, odd one out, letter codes
      QUANTITATIVE - number series (arithmetic, doubling, squares, and the
                     two-rule alternating kind)
      NON-VERBAL   - shape patterns and rotations, DRAWN as SVG diagrams
  Six topics, each with a lesson taught in pieces with checks, then six
  fresh questions that never repeat. Answers are verified by independent
  recomputation (3000 checks this round).
- The non-verbal questions carry real diagrams, so the child sees the
  shapes and arrows rather than reading about them.

Recent changes (round 38 - v38, the science projects are built)
------------------------
- THREE SCIENCE PROJECTS, one for each way of doing science, each with
  its own animation or simulation:
      CODE IT     - Code a bouncing ball. A falling-speed slider (9.8 m/s
                    every second), bouncing heights that shrink by a
                    percentage, the program loop itself, and tuning it.
      WIRE IT     - Build a torch circuit. Press the switch and watch the
                    bulb light only when the loop is complete; see why one
                    broken bulb kills a series circuit but not a parallel
                    one; add up battery voltages.
      RESEARCH IT - Run a fair test. Change exactly one thing, use a
                    control group, read a real results table, and write a
                    conclusion that does not overreach.
  Each opens when the worlds it needs have earned a star, and the cards
  show which worlds those are. Three more are listed as being built: the
  paper rocket, seeds under three conditions, and explaining a machine.

Recent changes (round 39 - v39, Science and Mind get the same door as Maths)
------------------------
- The old multi-option home screens in Science and Mind are GONE. Both now
  open on the same calm door as Maths:
      a greeting with his name,
      ONE button at the top, and
      four plain boxes: Learn a new trick, Games and puzzles, Beat the hard
      ones, Build something real.
  Nothing else is on the screen, so there is no "which one do I pick?".
- The session button is themed, as asked:
      SCIENCE - "Start today's investigation", with a detective/investigation
                look, and a five-part session: warm up, learn, investigate,
                check yourself, one hard one.
      MIND    - "Start today's match", with a tennis-court look, and a
                five-part match: warm up, learn, practise, check yourself,
                match point.
  Both sessions tick off as he goes and remember where he is.
- All four champs now share the same shape: one door, four boxes, one
  prepared session at the top. Sanskrit is the last one to convert.

Recent changes (round 40 - v40, all champs made to match Maths exactly)
------------------------
- FOUND AND FIXED THE REAL REASON SCIENCE AND MIND LOOKED WRONG: their pages
  never loaded the shared rail at all (an earlier wiring step silently
  missed because the script tags carry a version stamp). So Science showed
  its OLD crowded 11-item bar, and Mind showed NO navigation whatsoever.
  Every champ page now loads the rail.
- Science and Mind now have EXACTLY the same five rail items as Maths:
      Today | Learn | Games | Challenge | Build
  (Science and Mind were missing Today, and their Learn pointed at the
  world grid instead of the Learn hub.)
- The old science top bar (level badge, XP bar, and eleven buttons) and the
  old mind header are gone. There is ONE bar, the same compact one Maths
  uses: name, XP, streak, sync, progress, home.
- The doors in Science and Mind are now byte-for-byte the same markup as
  the Maths door, with the door styles copied from Maths, and real emoji
  rather than HTML codes.
- MATHS TODAY'S SESSION now has a basketball scheme: a basketball on the
  heading and an orange court-coloured banner. Science keeps its
  investigation theme and Mind keeps its tennis theme.

Recent changes (round 43 - v43, sessions now ASK questions instead of sending him to a picker)
------------------------
- THE BUG: in Science and Mind, tapping "Warm up" (or any part) opened
  another page that asked the child to CHOOSE A TOPIC. That is a picker,
  and it defeats the whole point of a prepared session. Maths never did
  this - it asks the questions right there, on the page.
- Science and Mind now work EXACTLY like maths, question for question:
    * a plan of five parts, with a progress bar and "Part n of 5"
    * every part that asks questions asks them HERE, one at a time
    * a "What do we know?" button when he wants help
    * after two misses the working is shown, so there is never a dead end
    * XP is awarded (12 for a first-try, 6 for a second-try)
    * the finish screen reports how many were right and says tomorrow's
      session is already prepared
- Science parts: Warm up (5 quick ones from every world) / Learn (the
  world that most needs it, read right there) / Practise / Check yourself /
  One hard one (a real Level 2 problem, asked on the page).
- Mind parts: Warm up / Learn (the technique shown as a worked example
  BEFORE anything is asked) / Practise / Check yourself / Match point.
- Questions come from each champ's own bank - Science from its 29 worlds
  and its Level 2 set, Mind from its reasoning ladder - so nothing is
  invented and nothing repeats inside one session.
- Tested: 65 checks across the two new session engines (all passing), and
  14,000 generated questions swept across 800 sessions for empty text,
  missing answers, wrong option counts and bad answer keys. Zero problems.

Recent changes (round 44 - v44, the Sanskrit speaker fixed)
------------------------
- THE SPEAKER BUG: on an iPad whose Hindi voice is LISTED but not really
  installed, iOS cannot pronounce the Devanagari, so it read out only the
  punctuation - which is why the speaker said "exclamation" for नमस्ते!
  and "question mark" on the next page. The words were reaching the
  speaker correctly; the device voice was silently dropping them.
- Fixed three ways, so the child always hears the word:
    1. If what we are about to say has no letters in it at all (only
       punctuation), we say the Latin line instead. Never read "!" aloud.
    2. A watchdog: if the Devanagari reading finishes impossibly fast for
       the text it was given, the voice is not really there - so the app
       immediately says the Latin line, e.g. "namaste!".
    3. With no Hindi voice at all, it says the Latin line as before.
- A working Hindi voice still reads the Devanagari, once, as before.
- Tested against four device situations: broken Hindi voice (reads
  नमस्ते! then namaste!), working Hindi voice (reads once), English-only
  (reads namaste!), and punctuation-only input (never spoken).

Recent changes (round 45 - v45, Samskritam-Champ joins the other three)
------------------------
- Samskritam-Champ now looks and works exactly like Maths, Science and Mind.
  It had NO rail at all (the file was never created), still drew its own
  crowded eight-item bar, had no door, and had no session. All four fixed.
- One shared bar and a five-item rail: Today | Learn | Games | Challenge |
  Build, plus More.
- A calm door: greeting, one button - "Start today's abhyasa" - and exactly
  four boxes:
      Learn a new trick   -> the five conversations with the guru
      Games & puzzles     -> the word treasury and speaking practice
      Beat the hard ones  -> The Thirsty Crow, told in full sentences
      Build something real-> the family missions, two lines to say together
- Today's abhyasa asks IN PLACE, like the other champs - never a picker:
      Warm up    five words he has met, asked back to him
      Learn      the next conversation, opened by name
      Practise   the guru's OWN lines from that conversation
      Check      a mixed set of words and lines
      Family     the scene's mission, with the speaker on each line
- The family missions now have their own page (Build something real).
- Two real bugs found while testing:
    * Some conversation turns accept MORE THAN ONE right answer. Grading
      only the first would have marked a legitimate answer wrong. The runner
      now accepts every answer the content marks as correct.
    * The Science and Mind top bars showed "0 XP" because they read a
      variable that was never global. They now read the child's saved
      progress from the device, so name, XP and streak are right.
- Tested: 21 checks on the new Sanskrit engine (all passing) and 2,600
  questions swept across 200 abhyasas - no malformed questions.

Recent changes (round 46 - v46, the Sanskrit "Learn a new trick" box)
------------------------
- THE BUG: on the Sanskrit door, tapping "Learn a new trick" did nothing.
  When I renamed the old home into the scene list, I pointed that box back
  at the door itself, so it simply redrew the same screen. The list of
  conversations had no view of its own and could never be reached.
- Fixed: "Learn a new trick" now opens the five conversations
  (First Words, Who Is in Your Family?, At the Table, How Many?,
  The Thirsty Crow), with a "Back to the four boxes" button at the end.
- The other three boxes were checked at the same time and all work:
  Games opens the word treasury, Beat the hard ones opens The Thirsty
  Crow, Build opens the family missions.
- Verified by rendering each destination and looking at it: the scene list
  shows the five conversations, and the missions page shows the missions
  with their Child and Parent lines.

Recent changes (round 47 - v47, closing gaps: hub layout, all the projects)
------------------------
- GURUKOOL HUB: all four champs now sit on ONE line. The grid was set to
  three columns, so the fourth champ wrapped onto a second row. It is now
  four across on a wide screen, two-by-two on a tablet, one on a phone.
  Samskritam also gets its own card colour instead of borrowing the
  reasoning card's.
- THE SANSKRIT TILE: the deployed code was tested with real clicks and all
  four tiles work (Learn opens the five conversations, Games the treasury,
  Challenge the Thirsty Crow, Build the family missions). If a device still
  shows the old behaviour it is holding a cached copy, so the freshness
  check now tries harder and, if the browser still refuses to let go, shows
  a one-tap "A new version is ready - Tap to refresh" bar.
- SCIENCE PROJECTS: the three that said "soon" are now fully built -
  Design a paper rocket (with a launch-angle animation that really does peak
  at 45 degrees), Grow a seed under three conditions (with the bar chart,
  and the truth that a seed does NOT need light to sprout), and Explain a
  machine in one page (with a lever animation that trades force for
  distance). All six science projects are now real.
- MIND PROJECTS: the four cards that said "being built" are now real
  step-by-step projects with their own runner - the school timetable clash,
  the wedding seating plan, the power cut, and the bus route puzzle.
- Verified by working the answers out independently, not by trusting the
  text: the timetable was solved, the seating deduced, the power cut
  brute-forced over every possible world (exactly one fits), and the bus
  times recomputed. 28 checks, all passing.

Recent changes (round 48 - v48, angles: diagrams first, then none)
------------------------
- NEW ANGLE QUESTIONS in Maths, on the angles topic:
    vertically opposite angles (equal across a crossing)
    adjacent angles on a straight line (add to 180)
    complementary angles inside a right angle (add to 90)
    congruent angles (equal in size)
    angles meeting at a point (add to 360)
    two equal angles of a triangle
- DIAGRAMS, AS ASKED: the early questions (easy level) ALWAYS carry a
  picture; the middle ones (medium) are a mix, so the picture fades away;
  the later ones (hard) NEVER carry a picture. So a child sees the picture
  while the idea is new, and has to hold it in his head once he is sure.
- The pictures are real geometry, not decoration: they are drawn from the
  same numbers as the question, so the angle in the picture really is the
  angle in the question.
- The Angles lesson now TEACHES all of these first - vertically opposite,
  adjacent, complementary, congruent, at a point - so nothing is tested
  before it is taught.
- Tested: 2,400 questions swept for well-formed text, answers, hints and
  pictures (no missing diagrams at easy, none at hard), every answer checked
  against its angle rule, and the diagrams checked by measuring the drawn
  wedges from their own coordinates - the two 45-degree wedges really do
  fill 90 degrees, the three at a point really do fill 360.

Recent changes (round 49 - v49, the Mind-Champ answer bugs)
------------------------
- THE ODD ONE OUT BUG: the answer key always pointed at the FOURTH item,
  whatever the set said. So in "Monday, Tuesday, March, Friday" the app
  expected FRIDAY and marked the right answer (March) wrong. Worse, the odd
  item was always in last place, so the position gave the game away.
  Now each set states its own odd item, and the four are SHUFFLED, so the
  answer is always the genuinely odd one and its position varies.
- THE ANALOGY BUG: the question asked for ONE WORD but the key was
  "a chicken", so a child typing "chicken" was marked wrong - and then the
  working told him the answer was "a chicken". The keys are now single
  words, and the checker ignores a leading "a"/"an"/"the", capitals,
  stray spaces and a plural, so any fair way of writing it is accepted.
- A fair second answer is no longer punished. Some number sets can be read
  two ways (in "2, 4, 6, 9", 2 is also the only prime), so those sets now
  list every defensible answer, accept them all, and say so in the working.
- The answer checker now lives in ONE file (mind-champ/assets/answers.js)
  used by both the reasoning ladder and today's match, so they can never
  disagree again.
- Tested: 13 checks including both reported cases, 900 odd-one-out
  questions (key always among the four shown; the odd item lands in all
  four positions), 900 analogies (every one that asks for a single word has
  a single-word key), and all 6 topics x 3 tiers - every key accepted
  however it is typed, and still NO to a genuinely wrong answer.

Recent changes (round 52 - v52: the "2, 4, 6, 8" bug, and a full solve of every question)
------------------------
WHAT AKSHAY FOUND: "what comes next: 2, 4, 6, 8?" and the right answer, 10,
was marked wrong. He was right, and it was my fault.
- ROOT CAUSE: when I gave the champs one shared answer-checker, Mind's session
  was left passing the whole QUESTION object where the checker expects the
  ANSWER. So every typed answer was compared against the text "[object Object]"
  and marked wrong. One line to fix, but it meant the Mind session could not
  accept ANY correct answer.
- Verified by driving the real page with real answers: "8, 10, 12, 14 -> 16"
  and "A=1, B=2, C=3 ... what number is F? -> 6" are both CORRECT now.
- WORSE, AND ALSO FIXED: the Mind reasoning ladder (Learn) was COMPLETELY DEAD.
  An edit of mine in v49 had removed the opening <script> tag from that page,
  so none of its code ran at all. The same fault was found in passport.html.
  Every page in the app is now checked automatically for this: 48 inline
  script blocks, all parse cleanly, no code sitting outside a script tag.

EVERY QUESTION SOLVED, AS ASKED:
- MATHS: 112,500 generated questions examined -> 18,043 distinct questions.
  5,967 answers re-derived by independent calculation and compared with the
  app's answer. The rest have answers that are judgement calls (a name, an
  order) and were checked for structure and against their own working.
  Mismatches: 0. Structural faults: 0.
- MIND: 54,000 generated questions -> 788 distinct, every one solved and
  compared. Plus all 25 Minecraft quest puzzles. Mismatches: 0. Faults: 0.
- SCIENCE: all 362 bank questions (325 multiple choice, 37 written), every
  one checked, including that each explanation supports its marked answer.
  Mismatches: 0. Faults: 0.
- Also fixed: three "fair second answer" notes I had written in Mind were
  simply WRONG (they claimed 1 was the only odd number when 9 is odd too).

Recent changes (round 53 - v53: two Mind quest puzzles had wrong answers)
------------------------
- Found by working every quest puzzle out from scratch instead of trusting it:
    * The Minecart Path puzzle "pass through the fuel station" said its two legs
      were 4 moves and 8 moves, then stored the answer as 10. 4 + 8 = 12.
      Worse, the fuel was drawn ABOVE the cart, and the cart can only move
      across or down - so the puzzle could not be solved as drawn at all.
      The map is rebuilt (the fuel is now on the cart's own row), the hints
      and working now say 3 + 7 = 10, and 10 is the true fewest moves.
    * The first Minecart puzzle claimed "3 across + 5 down = 8" for a map where
      the cart is 6 columns and 4 rows from the chest. Its map is rebuilt too,
      and 10 is the true fewest moves.
- HOW THEY WERE CHECKED: a breadth-first search over the actual grid, counting
  the fewest moves the cart can make without entering lava - the same thing the
  child has to do by eye. Both puzzles now agree with the search.
- Every other quest picture was worked out the same way: the wall-count puzzles
  by adding their rows, the path puzzles by searching the map. All correct.
- MIND in full: 54,000 generated questions -> 788 distinct, every one solved
  and compared (number series, letter codes, rotations and shape patterns all
  re-derived by rule, not by eye). Plus all 25 Minecraft quest puzzles.
  Answer mismatches: 0. Structural faults: 0.
- MATHS: 18,118 distinct questions, 5,963 answers re-derived independently.
  SCIENCE: all 362 bank questions. Both: 0 mismatches, 0 faults.

Recent changes (round 54 - v54: the final full check of every question, all five champs)
------------------------
- Found by checking the TEN detective cases, which my earlier pass had missed
  (I had loaded the quest bank without the detective file, so 25 puzzles were
  never checked at all):
    * "The Locked Chest" grid said "two villagers, one searcher each" but its
      answer deliberately leaves Mira with no search - the wording contradicted
      the puzzle. The question now says only ONE of them searched, which is what
      the clue is really proving.
    * "The Final Deduction" grid had the same contradiction, now worded right.
    * Two Sanskrit options accepted answers that are actually wrong: "three
      fruits" where the scene shows five, and "strength" for the crow that used
      cleverness. Both removed.
- EVERY QUESTION IN EVERY CHAMP, worked out and compared:
    MATHS    18,046 distinct generated questions (5,964 answers re-derived),
             plus 32 Olympiad problems and their 125 step answers, 25 riddles,
             25 Equation Forge puzzles, 95 lesson questions, 6 projects.
    MIND     788 distinct generated questions, all re-derived by rule, plus all
             50 quest puzzles (paths by search, walls by addition, grids and
             orders for consistency).
    SCIENCE  all 362 bank questions, 15 investigation questions, 6 projects.
    SANSKRIT 20 conversation turns, 33 treasury words, 5 scenes.
    WORD     108 distinct questions across its five topics.
  Answer mismatches: 0.  Structural faults: 0.

Recent changes (round 55 - v55: THE HOMEWORK CLUB)
------------------------
NEW: Homework Club, a new item in the maths rail (Today | Learn | Homework |
Games | Challenge | Build). It holds ONLY the kinds of question the teacher
actually sets - nothing else ever goes in here.

Built from Atharv's sheet of 1 Oct 2026 ("HW - Atharv - Plickers", 12
questions). The five types he needed help with (questions 4, 5, 6, 11, 12):
  1. Fractions on both sides      (2x + 1) / 3 = (x + 5) / 2
  2. Two fractions of x added     x / 3 + x / 4 = 7
  3. A word problem hiding an equation   "5 added to 3x = 3 less than 5x"
  4. Adjacent angles on a straight line  (4x + 10) + (2x - 10) = 180
  5. Two fractions subtracted     (x - 1) / 2 - (x - 3) / 3 = 2
The other seven questions on the sheet were the same kinds of equation
practice, so they are covered by these five shapes too.

HOW IT WORKS
- Opens with a choice: 15 minutes, 30 minutes, or 1 hour. The five types are
  mixed together, just like the sheet.
- Every card shows the TEACHER'S OWN QUESTION with its answer and the four
  steps of the method, so he can see the kind before practising it.
- "Practise this type" drills one kind on its own, for when one feels slippery.
- Endless fresh questions: same shape, different numbers, four choices each
  (A-D, exactly like the sheet). The wrong choices are the mistakes children
  really make, so the wrong answer is a teaching moment.
- Every question shows "how this type works" on request, and the full working
  after answering.
- Progress is kept per type and feeds the Parent Console.

VERIFIED: 15,000 generated questions across the five types, every one solved
independently and compared - 0 wrong. Then a real 15-minute session driven in
a browser: 40 questions answered, 40 graded correct.

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
