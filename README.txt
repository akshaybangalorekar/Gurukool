GURUKOOL — a personal training universe for a young champion
================================================================

Made for an 11-year-old working through olympiad-style practice, who
wanted one home page to pick a mission. Two worlds are now open:
Math-Champ and Science-Champ (ScienceQuest). LR-Champ launches later.

WHAT'S INSIDE
-------------
parent-guide.html         FOR PARENTS — behind the one parent PIN: plain
                          instructions for every feature, cloud-sync setup
                          steps, the email fallback, routines, troubleshooting.
admin.html                ADMIN CONSOLE — behind the parent PIN: the ONE
                          place to set up cloud sync (applies to every
                          coach on the device), sync, restore backups,
                          change the PIN, and see both champs at a glance.
index.html                GURUKOOL — the main page. Shows both open
                          champs, greets the champion by name, and shows
                          combined XP, maths rank, science level and best
                          day streak.
math-champ/               MATHS — THE COMPLETE TRAINER.
    index.html           Home — greeting, daily warm-up, missions,
                         Ramanujan & Shakuntala Devi stories
    word-problems.html   Core trainer: 13 word problems in 3 levels;
                         Understand → Plan → Solve with side-by-side
                         champion's method, per-problem timer and
                         reflection journal. Problems unlock one by one
                         (no skipping ahead), and each level opens when
                         the previous one is fully solved.
    speed-lab.html       Timed drills: lightning multiplication,
                         divisibility detective, prime patrol, mixed
    toolbox.html         Cheat-sheet: word-problem translator,
                         divisibility rules, prime toolkit, tricks
    dashboard.html       XP, ranks, streak, speed-curve chart, badges,
                         journal, training log, cloud-status card (sync
                         is AUTOMATIC — see below), progress passport
    assets/app.js        Shared engine (progress, XP, badges, timer,
                         parent PIN, ChampSync cloud engine)
    assets/style.css     Shared design
science-champ/           SCIENCE — SCIENCEQUEST, the full game.
    index.html           29 worlds (Physics Lab to ISRO Missions), 132
                         animated diagrams (electronics set redesigned
                         for first-time learners), ICAS-style quiz
                         ladder, Professor Chaos story mode, 1-hour
                         mission sessions, glossary with Sanskrit
                         twin-words, doubt jar, bansuri sounds,
                         multi-child profiles with parent PIN. NO cloud
                         or save buttons — saving is automatic (see
                         AUTO-SAVE). The 📊 button opens the dashboard.
    dashboard.html       NEW — uniform with Math-Champ: XP, rank,
                         streak, world-by-world progress, badge shelf,
                         doubt jar, CLOUD SYNC (one tap, both champs),
                         progress passport (SQ save codes — the app's
                         codes work here too). Also fixes a bug where
                         pasting an SQ3. save code in the game failed.
lr-champ/                "Launching soon" page with a teaser logic
                         puzzle (the three mislabelled boxes)

HOW TO OPEN
-----------
Open index.html in any browser — the hub. Click a champ card.
Everything works offline; fonts load from Google when online and fall
back gracefully.

HOW TO HOST (GitHub Pages)
--------------------------
Upload the CONTENTS of this folder to your repo root so the repo has:
  index.html, math-champ/, science-champ/, lr-champ/, README.txt
Delete any old files already in the repo root from the previous
version (word-problems.html, speed-lab.html, toolbox.html,
dashboard.html, assets/) so only the new structure remains.
Settings -> Pages -> Deploy from a branch -> main -> /(root).
The hub is then at  https://<username>.github.io/<repo>/

WHERE IS PROGRESS STOREED?
--------------------------
In the browser's localStorage — per device, per browser.
  math-champ      -> key "oc_state"
  science-champ   -> key "sq_v3"   (plus older sq_v2/sq_v1, still read)
The hub reads both, so it can greet him with everything.

CLOUD SYNC — ONE TAP FOR BOTH CHAMPS (recommended)
--------------------------------------------------
Set up once per device (a parent's job, 5 minutes):
  1. On github.com, create a PRIVATE repo (any name, e.g.
     champs-progress). This is your family's progress locker.
  2. Create a token: Settings -> Developer settings -> Personal access
     tokens -> Fine-grained tokens -> Generate. Select ONLY that repo,
     permission "Contents: Read and write", expiration "No expiration"
     (so it never runs out). Copy the token (it starts github_pat_).
  3. Open the ADMIN CONSOLE: Gurukool home page -> bottom link
     "Admin console" -> parent PIN -> enter your username, repo name
     and token -> Save settings & sync. ONE setup powers every coach
     (Math-Champ, Science-Champ and future ones). Quick sync without
     the console: tap the cloud button on the Science home page or
     the Maths Dashboard.
Then, on ANY champ, one tap on ☁️ Sync:
  - saves BOTH maths and science progress to your GitHub locker,
  - merges it with whatever is already there (progress is never
    destroyed — best scores, all badges and doubts are unioned), and
  - downloads a dated backup file
    (gurukool-progress-YYYY-MM-DD.txt) to this device.
On a new device: set up once, tap ☁️, and everything arrives.
If a token ever expires or is lost, nothing is lost — the progress
still lives on each device and in the repo; just paste a new token.

EMAIL FALLBACK (no setup, always works)
---------------------------------------
Atharv's iPad is his home device. If he needs the site somewhere with
no cloud setup, email progress like this:
  1. Tap ☁️ Sync — the dated backup file it downloads holds BOTH
     champs. (Or, for maths only: Dashboard -> "Download as file".)
  2. Email the file to yourself (or whoever needs it).
  3. On the other device: open the site -> Science-Champ ☁️ ->
     "Load a backup file" (or Math-Champ Dashboard -> "Load backup
     file") -> pick the attachment -> enter the parent PIN.
  4. Both champs' progress merges onto that device.
Maths also keeps its copy-paste Progress Passport (code starting
"OC1."), and ScienceQuest keeps its Save Codes — both still work.

PARENT PIN — ONE PIN FOR BOTH CHAMPS
------------------------------------
The first time a protected action happens anywhere (reset, import,
cloud settings, doubt jar, backup restore), a parent sets a 4-6 digit
PIN. That single PIN then protects BOTH champs on the device (stored
in the browser under "cc_pin"; an older science-only PIN migrates
automatically). Change it any time from parent-guide.html.

ADMIN CONSOLE + PARENT GUIDE
----------------------------
The Admin Console (admin.html, linked from the hub footer) is the one
place to manage cloud sync, backups and the parent PIN — one setup
applies to every coach. It is the ONLY page that can save cloud
settings: the champs themselves (and both dashboards) can only READ
the settings and sync/back up — they carry no setup forms or
disconnect buttons of their own. A regression test enforces this
(test-admin.js, section A5). The Parent Guide (parent-guide.html, linked
from the hub footer, the Math-Champ dashboard and the Science-Champ
header) holds
simple, complete instructions: what each champ does, the house rules,
cloud-sync setup step by step, the email fallback, a weekly routine
and troubleshooting.

ADDING A NEW CHAMP (e.g. LR-Champ) — the contract
---------------------------------------------------
Every new coach plugs into the SAME central console. The recipe:
1. Copy the ChampSync module (window.ChampSync = ...) byte-for-byte
   from science-champ/dashboard.html into the new champ's page.
   It already reads/writes the shared keys and needs no config UI.
2. Give the champ its own progress key (e.g. "lr_state") — like
   oc_state for maths and sq_v3 for science.
3. Bump the payload: ChampSync builds {champSync:2, sq, oc}; a new
   champ becomes {champSync:3, sq, oc, lr} in EVERY copy of the
   module (all copies must stay identical). Old payloads still load.
4. Parent gate = the shared "cc_pin" key. Never add a second PIN.
5. No sync/save buttons of any kind. Add the shared auto-save
   timer instead (see AUTO-SAVE below). If cloud is not configured
   the timer simply does nothing. No champ ever gets its own
   cloud-settings or disconnect controls — those live in admin.html
   only.
Local saving is automatic and stays per-champ (progress writes to
its own localStorage key). Backups, restore and cloud settings are
central-console features that automatically cover every champ whose
state is in the payload.

AUTO-SAVE — no buttons anywhere
-------------------------------
Saving is now fully automatic; no champ page has a save or sync
button. Local progress saves instantly on every answer/XP (that has
always been the case — localStorage per champ). In addition, every
Math-Champ page and the Science-Champ game run a SILENT cloud sync
every 10 minutes (plus once shortly after the page opens) using the
shared ChampSync engine and the settings stored by the Admin
Console. The silent sync never downloads files and never shows
prompts. Dated backup files are produced by the Admin Console's
manual "Sync now". The science app carries no cloud UI at all —
no ☁️ button, no cloud modal, no disconnect.

Aligned with "Maths Olympiad — Unleash the Maths Olympian In You!":
Whole Numbers · Solve by Comparison and Replacement · Write Equations ·
Divisibility · Speed · Ratio · Profit and Loss · Geometric Problems ·
Number Pattern · Pigeonhole Principle.
