/* ============================================================
   OLYMPIAD CHAMP — shared engine
   Progress lives in localStorage under the key "oc_state".
   Works fully offline; nothing is sent anywhere.
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'oc_state';

  /* ---------- state ---------- */

  function defaultState() {
    return {
      name: '',
      xp: 0,
      attempts: [],      // { ts, kind, id, title, correct, timeSec, targetSec, xp }
      journal: [],       // { ts, problemTitle, note }
      streak: { last: null, count: 0 },
      badges: {},        // badgeId -> ts earned
      skills: {},        // Training Mission: per-topic skill estimate 0-100
      missionLast: null, // last Training Mission summary (shown on the mission start screen)
      pin: ''            // parent PIN — gates reset / import / sync settings
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      var d = defaultState();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(STATE)); } catch (e) { /* storage full/blocked */ }
  }

  var STATE = load();

  /* if the champion name on this device (cc_name) is a different child,
     switch to that child's own maths progress (multi-kid support) */
  (function () {
    try {
      var ccName = (localStorage.getItem('cc_name') || '').trim();
      var cur = (STATE.name || '').trim();
      if (ccName && cur.toLowerCase() !== ccName.toLowerCase()) switchChild(ccName);
    } catch (e) {}
  })();

  /* ---------- levels ---------- */

  var LEVELS = [
    { name: 'Rookie', min: 0, icon: 'sprout' },
    { name: 'Explorer', min: 120, icon: 'compass' },
    { name: 'Challenger', min: 300, icon: 'shield' },
    { name: 'Bronze Olympian', min: 550, icon: 'medal-b' },
    { name: 'Silver Olympian', min: 900, icon: 'medal-s' },
    { name: 'Gold Olympian', min: 1350, icon: 'medal-g' },
    { name: 'Gurukool Champion', min: 2000, icon: 'trophy' }
  ];

  function levelOf(xp) {
    var lv = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) lv = LEVELS[i];
    var idx = LEVELS.indexOf(lv);
    var next = LEVELS[idx + 1] || null;
    return { level: lv, index: idx, next: next, pct: next ? Math.round(((xp - lv.min) / (next.min - lv.min)) * 100) : 100 };
  }

  /* ---------- badges ---------- */

  var BADGES = [
    { id: 'first',      name: 'First Steps',        desc: 'Solve your first word problem',                  test: function (s) { return countKind(s, 'word', 'correct') >= 1; } },
    { id: 'equation5',  name: 'Equation Builder',   desc: 'Get 5 word problems right',                     test: function (s) { return countKind(s, 'word', 'correct') >= 5; } },
    { id: 'fast',       name: 'Faster than Target', desc: 'Solve a word problem in less than target time',  test: function (s) { return s.attempts.some(function (a) { return a.kind === 'word' && a.correct && a.timeSec < a.targetSec; }); } },
    { id: 'lightning',  name: 'Lightning Calc',     desc: 'Score 8+ in a Fast Multiplication drill',        test: function (s) { return drillScore(s, 'fast-mult') >= 8; } },
    { id: 'divisible',  name: 'Divisibility Detective', desc: 'Score 8+ in a Divisibility drill',           test: function (s) { return drillScore(s, 'divis') >= 8; } },
    { id: 'prime',      name: 'Prime Patrol',       desc: 'Score 8+ in a Prime Numbers drill',              test: function (s) { return drillScore(s, 'prime') >= 8; } },
    { id: 'perfect',    name: 'Perfect 10',         desc: 'Score 10/10 in any drill',                        test: function (s) { return s.attempts.some(function (a) { return a.kind === 'drill' && a.correct === a.total && a.total >= 10; }); } },
    { id: 'streak3',    name: '3-Day Streak',       desc: 'Practise 3 days in a row',                       test: function (s) { return s.streak.count >= 3; } },
    { id: 'journal5',   name: 'Diary Keeper',      desc: 'Write 5 learning notes in your journal',          test: function (s) { return s.journal.length >= 5; } },
    { id: 'champ500',   name: 'Rising Champion',    desc: 'Earn 500 XP',                                     test: function (s) { return s.xp >= 500; } },
    { id: 'mission1',   name: 'Mission Rookie',     desc: 'Complete a Training Mission',                     test: function (s) { return countKind(s, 'mission') >= 1; } },
    { id: 'mission40',  name: 'Mission Marathon',   desc: 'Answer 40 mission questions correctly',           test: function (s) { return countKind(s, 'mission', 'correct') >= 40; } }
  ];

  function countKind(s, kind, mode) {
    var n = 0;
    for (var i = 0; i < s.attempts.length; i++) {
      var a = s.attempts[i];
      if (a.kind === kind && (mode !== 'correct' || a.correct)) n++;
    }
    return n;
  }

  function drillScore(s, drill) {
    var best = 0;
    s.attempts.forEach(function (a) {
      if (a.kind === 'drill' && a.drill === drill) best = Math.max(best, a.correct);
    });
    return best;
  }

  function checkBadges() {
    var earned = [];
    BADGES.forEach(function (b) {
      if (!STATE.badges[b.id] && b.test(STATE)) {
        STATE.badges[b.id] = Date.now();
        earned.push(b);
      }
    });
    if (earned.length) save();
    return earned;
  }

  /* ---------- streak (calendar days visited / practised) ---------- */

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function touchStreak() {
    var today = todayStr();
    if (STATE.streak.last === today) return;
    var yesterday = new Date(Date.now() - 86400000);
    var yStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');
    STATE.streak.count = (STATE.streak.last === yStr) ? STATE.streak.count + 1 : 1;
    STATE.streak.last = today;
    save();
  }

  /* ---------- recording ---------- */

  function record(attempt) {
    attempt.ts = Date.now();
    STATE.attempts.push(attempt);
    if (STATE.attempts.length > 400) STATE.attempts = STATE.attempts.slice(-400);
    STATE.xp += attempt.xp || 0;
    touchStreak();
    save();
    var earned = checkBadges();
    if (earned.length) toastBadge(earned);
    refreshNav();
  }

  function addJournal(problemTitle, note) {
    if (!note || !note.trim()) return;
    STATE.journal.push({ ts: Date.now(), problemTitle: problemTitle, note: note.trim() });
    if (STATE.journal.length > 100) STATE.journal = STATE.journal.slice(-100);
    save();
    checkBadges();
  }

  /* ---------- XP awarding ---------- */

  function awardWord(correct, timeSec, targetSec) {
    if (!correct) return 8; // effort XP — trying matters
    var xp = 15;
    if (timeSec <= targetSec) xp += 10;          // speed bonus
    if (timeSec <= targetSec * 0.6) xp += 5;     // lightning bonus
    return xp;
  }

  /* ---------- badge toast ---------- */

  var toastHost = null;
  function toastBadge(badges) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.style.cssText = 'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:999;display:flex;flex-direction:column;gap:8px;align-items:center;';
      document.body.appendChild(toastHost);
    }
    badges.forEach(function (b, i) {
      var t = document.createElement('div');
      t.style.cssText = 'background:#2b2620;color:#faf5ea;padding:12px 22px;border-radius:12px;font-weight:800;font-size:16px;box-shadow:0 6px 20px rgba(0,0,0,.25);opacity:0;transition:opacity .4s;font-family:inherit;';
      t.textContent = 'Badge unlocked: ' + b.name + '!';
      toastHost.appendChild(t);
      setTimeout(function () { t.style.opacity = '1'; }, 60 + i * 250);
      setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 450); }, 4200 + i * 250);
    });
  }

  /* ---------- navigation ---------- */

  function refreshNav() {
    var lv = levelOf(STATE.xp);
    var lvEl = document.getElementById('nav-lvl');
    if (lvEl) lvEl.textContent = 'Lv ' + (lv.index + 1) + ' \u00b7 ' + lv.level.name;
    var xpEl = document.getElementById('nav-xp');
    if (xpEl) xpEl.textContent = '\u2b50 ' + STATE.xp + ' XP';
    var stEl = document.getElementById('nav-streak');
    if (stEl) stEl.textContent = '\ud83d\udd25 ' + (STATE.streak.count || 0) + '-day streak';
    var barEl = document.getElementById('nav-xpfill');
    if (barEl) barEl.style.width = lv.pct + '%';
    var nxEl = document.getElementById('nav-next');
    if (nxEl) nxEl.textContent = lv.next ? (lv.next.min - STATE.xp) + ' XP to reach ' + lv.next.name + ' \u2192' : 'Highest rank achieved \u2014 legendary!';
  }

  function buildNav(active) {
    var links = [
      { href: '../index.html', label: '\u2039 Gurukool', key: 'hub' },
      { href: 'index.html', label: 'Home', key: 'home' },
      { href: 'quests.html', label: 'Quests', key: 'quests' },
      { href: 'mission.html', label: 'Mission', key: 'mission' },
      { href: 'word-problems.html', label: 'Word Problems', key: 'word' },
      { href: 'speed-lab.html', label: 'Speed Lab', key: 'speed' },
      { href: 'toolbox.html', label: 'Toolbox', key: 'toolbox' },
      { href: 'dashboard.html', label: 'Dashboard', key: 'dash' }
    ];
    var nav = document.getElementById('topnav');
    if (!nav) return;
    /* ---- uniform Gurukool header (same bar as Mind-Champ) ---- */
    var LV = levelOf(STATE.xp);
    var nm = (STATE.name || '').trim() || 'Champ';
    var head = '<div class="gk-bar"><div class="gk-row1">' +
      '<div class="gk-lvl" id="nav-lvl">Lv ' + (LV.index + 1) + ' \u00b7 ' + LV.level.name + '</div>' +
      '<div class="gk-xpbar"><div class="gk-xpfill" id="nav-xpfill" style="width:' + LV.pct + '%"></div></div></div>' +
      '<div class="gk-row2"><a class="gk-mini" href="index.html">\u26a1 ' + esc(nm) + '</a>' +
      '<span class="gk-stat" id="nav-xp">\u2b50 ' + STATE.xp + ' XP</span>' +
      '<span class="gk-stat" id="nav-streak">\ud83d\udd25 ' + (STATE.streak.count || 0) + '-day streak</span>' +
      '<button class="gk-mini" id="nav-sync" title="Sync now">\u2601\ufe0f</button>' +
      '<a class="gk-mini" href="../index.html">\ud83c\udfe0 Gurukool</a></div>' +
      '<div class="gk-stat gk-next" id="nav-next">' + (LV.next ? (LV.next.min - STATE.xp) + ' XP to reach ' + LV.next.name + ' \u2192' : 'Highest rank achieved \u2014 legendary!') + '</div></div>';
    var html = head + '<div class="topnav__inner">' +
      '<a class="brand" href="index.html">' +
      '<span class="brand__mark"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg></span>' +
      '<span class="brand__name">Math-<span>Champ</span></span></a>' +
      '<nav class="topnav__links">';
    links.forEach(function (l) {
      html += '<a href="' + l.href + '"' + (l.key === active ? ' class="is-active"' : '') + '>' + l.label + '</a>';
    });
    html += '</nav></div>';
    nav.innerHTML = html;
    var sb = document.getElementById('nav-sync');
    if (sb) sb.addEventListener('click', function () { forceSync(sb); });
    refreshNav();
  }

  /* ---------- timer ---------- */

  function ChampTimer(displayEl, opts) {
    opts = opts || {};
    this.el = displayEl;
    this.onTick = opts.onTick || null;
    this.startAt = null;
    this.elapsed = 0;      // seconds accumulated across pauses
    this.running = false;
    this._int = null;
  }
  ChampTimer.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.startAt = Date.now();
    var self = this;
    this._int = setInterval(function () { self.render(); }, 250);
    this.render();
  };
  ChampTimer.prototype.pause = function () {
    if (!this.running) return;
    this.elapsed += (Date.now() - this.startAt) / 1000;
    this.running = false;
    clearInterval(this._int);
    this.render();
  };
  ChampTimer.prototype.stop = function () {
    this.pause();
    return this.seconds();
  };
  ChampTimer.prototype.seconds = function () {
    var extra = this.running ? (Date.now() - this.startAt) / 1000 : 0;
    return Math.round(this.elapsed + extra);
  };
  ChampTimer.prototype.render = function () {
    if (!this.el) return;
    var s = this.seconds();
    this.el.textContent = fmtTime(s);
    if (this.onTick) this.onTick(s);
  };
  ChampTimer.prototype.reset = function () {
    this.pause();
    this.elapsed = 0;
    this.render();
  };

  function fmtTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function fmtDate(ts) {
    var d = new Date(ts);
    return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
  }

  /* ---------- small helpers ---------- */

  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return '&#' + { '&': '38', '<': '60', '>': '62', '"': '34', "'": '39' }[c] + ';';
    });
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }

  /* ---------- animation safety net ---------- */

  /* If animations never get a start tick (headless capture, paused compositor),
     reveal animated content after 1s so nothing can stay invisible. */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.setAttribute('data-fx', 'done');
    }, 1000);
  });

  /* ---------- progress passport (carry progress between devices) ---------- */

  /* The page cannot save into its own HTML file, so the dashboard can turn
     the whole training log into one portable code ("OC1." + base64 JSON).
     Copy it on one device, paste it on another, done. */

  function summarizeState(s) {
    var words = 0;
    s.attempts.forEach(function (a) { if (a.kind === 'word' && a.correct) words++; });
    var badges = Object.keys(s.badges || {}).length;
    return s.xp + ' XP, ' + words + ' word problem' + (words === 1 ? '' : 's') + ' solved, ' +
      badges + ' badge' + (badges === 1 ? '' : 's') + ', ' + ((s.streak && s.streak.count) || 0) + '-day streak';
  }

  function exportCode() {
    return 'OC1.' + btoa(unescape(encodeURIComponent(JSON.stringify(STATE))));
  }

  function parseCode(codeStr) {
    var s = String(codeStr || '').trim();
    if (s.indexOf('OC1.') !== 0) {
      throw new Error('That does not look like a Math-Champ progress code. It should start with "OC1."');
    }
    var json;
    try {
      json = decodeURIComponent(escape(atob(s.slice(4))));
    } catch (e) {
      throw new Error('This code looks damaged or incomplete — copy the WHOLE code, right to the last letter.');
    }
    var obj;
    try {
      obj = JSON.parse(json);
    } catch (e) {
      throw new Error('This code is damaged — try copying it again.');
    }
    if (!obj || typeof obj !== 'object' || !Array.isArray(obj.attempts)) {
      throw new Error('This code is missing its progress data.');
    }
    var d = defaultState();
    for (var k in d) if (!(k in obj)) obj[k] = d[k];
    return obj;
  }

  /* Load a code onto THIS device (with a confirm that shows both summaries).
     Returns true if loaded. Caller should reload the page afterwards. */
  function importCode(codeStr) { return importObj(parseCode(codeStr)); }
  function importObj(incoming) {
    var msg = 'Progress code contains: ' + summarizeState(incoming) +
      '\n\nThis device currently has: ' + summarizeState(STATE) + '.\n\n';
    if (incoming.xp < STATE.xp) {
      msg += 'Heads up: the code has LESS XP than this device, so loading it will overwrite newer progress here. ';
    }
    msg += 'Load the progress code onto this device?';
    if (!window.confirm(msg)) return false;
    incoming.pin = STATE.pin || incoming.pin || '';   /* a PIN set on this device survives imports */
    STATE = incoming;
    if (window.OC) window.OC.STATE = incoming;
    save();
    return true;
  }

  /* ---------- parent PIN — ONE shared PIN for both champs, stored under "cc_pin" ---------- */

  function ccPin() { try { return localStorage.getItem('cc_pin') || ''; } catch (e) { return ''; } }
  function ccPinSet(p) { try { localStorage.setItem('cc_pin', p); } catch (e) {} }

  function parentGate(action) {
    var pin = ccPin();
    if (!pin) {
      /* carry over a PIN set by an older version (maths' own or science's) */
      pin = STATE.pin || '';
      if (!pin) { try { var sq = JSON.parse(localStorage.getItem('sq_v3')); if (sq && sq.pin) pin = sq.pin; } catch (e) {} }
      if (pin) ccPinSet(pin);
    }
    if (!ccPin()) {
      var p = window.prompt('Set a PARENT PIN (4-6 digits).\nThis ONE PIN protects BOTH champs — Maths and Science — on this device.');
      if (!p) return false;
      if (!/^\d{4,6}$/.test(p)) { window.alert('The PIN must be 4-6 digits. Try again.'); return false; }
      var c = window.prompt('Re-enter the PIN to confirm:');
      if (p !== c) { window.alert('The PINs did not match. Try again.'); return false; }
      ccPinSet(p);
      if (typeof action === 'function') action();   /* just set + confirmed — no second ask */
      return true;
    }
    var entered = window.prompt('Enter the parent PIN:');
    if (entered !== ccPin()) { window.alert('Wrong PIN.'); return false; }
    if (typeof action === 'function') action();
    return true;
  }

  /* ---------- export ---------- */

  /* ---------- per-child maths profiles (name-keyed) ---------- */

  function readProfiles() { try { var p = JSON.parse(localStorage.getItem('oc_profiles') || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfiles(pr) { try { localStorage.setItem('oc_profiles', JSON.stringify(pr || {})); } catch (e) {} }

  function setState(o) {
    if (!o || typeof o !== 'object') return;
    STATE = o;
    if (window.OC) window.OC.STATE = STATE;
    save();
  }

  /* switch the active child: the current one is parked under their own name,
     the requested child's progress is loaded (or started fresh the first time) */
  function switchChild(name) {
    name = String(name || '').trim();
    if (!name) return false;
    var key = name.toLowerCase();
    var cur = (STATE.name || '').trim();
    var profiles = readProfiles();
    if (cur) profiles[cur.toLowerCase()] = JSON.parse(JSON.stringify(STATE));
    var next = profiles[key];
    if (!next) { next = defaultState(); next.name = name; }
    next.name = name;
    STATE = next;
    if (window.OC) window.OC.STATE = STATE;
    save();
    writeProfiles(profiles);
    return true;
  }

  /* ---------- \u2601\ufe0f force-sync (the cloud button in the top nav) ---------- */
  function forceSync(btn) {
    if (!window.ChampSync) return;
    if (!ChampSync.ghCfg()) {
      if (btn) {
        btn.textContent = '\u26a0\ufe0f';
        btn.title = 'Cloud sync is not set up on this device yet — a parent can set it up in the Admin Console (Gurukool home page).';
        setTimeout(function () { btn.textContent = '\u2601\ufe0f'; }, 3000);
      }
      return;
    }
    if (btn) { btn.textContent = '\u23f3'; btn.title = 'Syncing\u2026'; }
    ChampSync.sync({
      silent: true, getSq: null, getOc: null,
      onMerged: function (sq, oc) {
        try {
          if (window.MISSION && window.MISSION.M && window.MISSION.M.running) return;   /* never disturb a live mission */
          if (oc && OC.setState && OC.STATE !== oc) OC.setState(oc);
          if (typeof window.GK_REFRESH === 'function') { try { window.GK_REFRESH(); } catch (e) {} }
        } catch (e) {}
      }
    }).then(function (r) {
      if (!btn) return;
      btn.textContent = (r === 'ok') ? '\u2705' : '\u274c';
      btn.title = (r === 'ok') ? 'Synced — progress up to date!' : 'Sync problem — it will retry automatically';
      setTimeout(function () { btn.textContent = '\u2601\ufe0f'; }, 3000);
    });
  }

  window.OC = {
    STATE: STATE,
    forceSync: forceSync,
    switchChild: switchChild,
    setState: setState,
    readProfiles: readProfiles,
    writeProfiles: writeProfiles,
    save: save,
    defaultState: defaultState,
    LEVELS: LEVELS,
    levelOf: levelOf,
    BADGES: BADGES,
    record: record,
    addJournal: addJournal,
    awardWord: awardWord,
    buildNav: buildNav,
    refreshNav: refreshNav,
    ChampTimer: ChampTimer,
    fmtTime: fmtTime,
    fmtDate: fmtDate,
    $: $,
    $all: $all,
    esc: esc,
    shuffle: shuffle,
    pick: pick,
    randInt: randInt,
    todayStr: todayStr,
    exportCode: exportCode,
    parseCode: parseCode,
    importCode: importCode,
    importObj: importObj,
    summarizeState: summarizeState,
    parentGate: parentGate
  };
})();

/* ============ ChampSync — one-tap cloud sync + local backup (shared engine) ============
   IDENTICAL COPY embedded in Math-Champ (assets/app.js) and ScienceQuest.
   One tap on EITHER champ syncs BOTH to the family's GitHub repo and downloads
   a dated local backup file. Merge rules: progress is never destroyed.
   Cloud file format: { champSync: 4, sq: <ScienceQuest state>, oc: <Math-Champ state>, ocs: { childName: <Math-Champ state> }, mc: <Mind-Champ state>, mcs: { childName: <Mind-Champ state> } }
   Older formats (science-only {profiles:...}, legacy single-profile {xp:...}) still load. */
window.ChampSync = (function () {
  'use strict';
  var CFG_KEY = 'sq_gh';     /* shared cloud config — set once per device on any champ page */
  var SQ_KEY = 'sq_v3';      /* ScienceQuest state */
  var OC_KEY = 'oc_state';   /* Math-Champ state */

  function ghCfg() {
    try { var c = JSON.parse(localStorage.getItem(CFG_KEY)); if (c && c.owner && c.repo && c.token) return c; } catch (e) {}
    return null;
  }
  function saveGhCfg(c) { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function ghUrl(c) { return 'https://api.github.com/repos/' + c.owner + '/' + c.repo + '/contents/' + encodeURIComponent(c.path && c.path.length ? c.path : 'progress.json'); }
  function readLS(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function writeLS(k, v) { if (v == null) return; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---- science merge: faithful port of ScienceQuest's own mergeProfile/mergeS ---- */
  function mergeProfile(a, b) {
    a.xp = Math.max(a.xp || 0, b.xp || 0);
    ['lessons', 'practice'].forEach(function (k) { var src = b[k] || {}; a[k] = a[k] || {}; for (var key in src) { if (src[key]) a[k][key] = src[key]; } });
    var q = b.quiz || {};
    for (var w in q) { if (q[w] && q[w].t) { a.quiz = a.quiz || {}; if (!a.quiz[w] || !a.quiz[w].t || q[w].s > a.quiz[w].s) a.quiz[w] = q[w]; } }
    var lvB = b.levels || {};
    for (var wL in lvB) { a.levels = a.levels || {}; var mL = a.levels[wL] || { c: 1, b1: 0, b2: 0, arena: 0 }; mL.c = Math.max(mL.c || 1, lvB[wL].c || 1); mL.b1 = Math.max(mL.b1 || 0, lvB[wL].b1 || 0); mL.b2 = Math.max(mL.b2 || 0, lvB[wL].b2 || 0); mL.arena = Math.max(mL.arena || 0, lvB[wL].arena || 0); a.levels[wL] = mL; }
    ['badges', 'visited'].forEach(function (k) { a[k] = a[k] || []; (b[k] || []).forEach(function (x) { if (a[k].indexOf(x) < 0) a[k].push(x); }); });
    if ((b.streak || 0) > (a.streak || 0)) { a.streak = b.streak; a.lastDay = b.lastDay || a.lastDay; }
    (b.doubts || []).forEach(function (x) { a.doubts = a.doubts || []; if (!a.doubts.some(function (y) { return y.t === x.t && y.d === x.d; })) a.doubts.push(x); });
  }
  function mergeSQ(S, o) {
    if (o.pin && !S.pin) S.pin = o.pin;
    for (var k in o.profiles) { if (!S.profiles[k]) S.profiles[k] = o.profiles[k]; else mergeProfile(S.profiles[k], o.profiles[k]); }
    return S;
  }

  /* ---- maths merge: union of attempts/journal/badges, max XP, newest streak ---- */
  function mergeOC(a, b) {
    if (!b || typeof b !== 'object' || !b.attempts) return a;
    if (!a || !a.attempts) return b;
    var out = { name: '', xp: 0, attempts: [], journal: [], streak: { last: null, count: 0 }, badges: {}, pin: '' };
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    var seen = {}, list = [];
    (a.attempts || []).concat(b.attempts || []).forEach(function (t) {
      var k = (t.kind || '') + '|' + (t.id || '') + '|' + (t.ts || '');
      if (!seen[k]) { seen[k] = 1; list.push(t); }
    });
    list.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    out.attempts = list.slice(-400);
    var jseen = {}, jl = [];
    (a.journal || []).concat(b.journal || []).forEach(function (j) {
      var k = (j.ts || 0) + '|' + (j.note || '');
      if (!jseen[k]) { jseen[k] = 1; jl.push(j); }
    });
    jl.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    out.journal = jl.slice(-100);
    [a.badges || {}, b.badges || {}].forEach(function (src) {
      Object.keys(src).forEach(function (id) { if (!out.badges[id] || src[id] < out.badges[id]) out.badges[id] = src[id]; });
    });
    var sa = a.streak || { last: null, count: 0 }, sb = b.streak || { last: null, count: 0 };
    out.missionLast = (b.missionLast && (!a.missionLast || (b.missionLast.ts || 0) > (a.missionLast.ts || 0))) ? b.missionLast : a.missionLast;
    out.pin = a.pin || b.pin || '';
    /* Technique Quests progress merges per quest line */
    out.quest = mergeQuestData(a.quest, b.quest);
    return out;
  }
  function mergeQuestData(a, b) {
    if (!a && !b) return undefined;
    var out = JSON.parse(JSON.stringify(b || {}));
    for (var k in (a || {})) {
      var ac = a[k], bc = out[k] = out[k] || { done: false, stars: 0, used: [], journal: [] };
      bc.done = bc.done || !!ac.done;
      bc.stars = Math.max(bc.stars || 0, ac.stars || 0);
      bc.used = (bc.used || []).concat(ac.used || []).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
      var jseen = {};
      bc.journal = (bc.journal || []).concat(ac.journal || []).filter(function (j) {
        var key = j.ts + '|' + j.text; if (jseen[key]) return false; jseen[key] = 1; return true;
      }).slice(-40);
    }
    return out;
  }

  var PROFILES_KEY = 'oc_profiles';
  function readProfiles() { try { var p = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfiles(p) { try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  var MC_KEY = 'mc_state', MPROFILES_KEY = 'mc_profiles';
  function readMCProfiles() { try { var p = JSON.parse(localStorage.getItem(MPROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeMCProfiles(p) { try { localStorage.setItem(MPROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  function uniqList(arr) { var o = {}, out = []; (arr || []).forEach(function (x) { if (!o[x]) { o[x] = 1; out.push(x); } }); return out; }
  function mergeMC(a, b) {
    if (!b || typeof b !== 'object' || !b.cases) return a;
    if (!a || !a.cases) return b;
    var out = JSON.parse(JSON.stringify(b));
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    out.techniques = uniqList((a.techniques || []).concat(b.techniques || []));
    out.journal = uniqList((a.journal || []).concat(b.journal || []));
    for (var k in a.cases) {
      var ac = a.cases[k], bc = out.cases[k] = out.cases[k] || { done: false, stars: 0, used: [], journal: [] };
      bc.done = bc.done || !!ac.done;
      bc.stars = Math.max(bc.stars || 0, ac.stars || 0);
      bc.used = uniqList((bc.used || []).concat(ac.used || []));
      bc.journal = uniqList((bc.journal || []).concat(ac.journal || []));
    }
    if ((a.streak && a.streak.count || 0) > (out.streak && out.streak.count || 0)) out.streak = a.streak;
    out.pin = out.pin || a.pin || '';
    return out;
  }

  /* cloud file carries every champ + every child: { champSync: 4, sq, oc, ocs, mc, mcs } */
  function payload(sq, oc, mc) {
    var ocs = readProfiles();
    var n = (oc && oc.name ? oc.name : '').trim().toLowerCase();
    if (n) ocs[n] = oc;
    var mcs = readMCProfiles();
    var mn = (mc && mc.name ? mc.name : '').trim().toLowerCase();
    if (mn) mcs[mn] = mc;
    return { champSync: 4, sq: sq || null, oc: oc || null, ocs: ocs, mc: mc || null, mcs: mcs };
  }

  /* understands the current format plus every older one */
  function parseRemote(txt) {
    var o = JSON.parse(txt);
    if (o && (o.champSync === 4 || o.champSync === 3 || o.champSync === 2)) {
      var ocs = {}, k;
      if (o.ocs && typeof o.ocs === 'object') for (k in o.ocs) { var v = o.ocs[k]; if (v && typeof v === 'object' && v.attempts) ocs[String(k).toLowerCase()] = v; }
      var onc = (o.oc && o.oc.name ? o.oc.name : '').trim().toLowerCase();
      if (o.oc && o.oc.attempts && !ocs[onc]) ocs[onc || 'current'] = o.oc;
      var mcs = {};
      if (o.mcs && typeof o.mcs === 'object') for (k in o.mcs) { var mv = o.mcs[k]; if (mv && typeof mv === 'object' && mv.cases) mcs[String(k).toLowerCase()] = mv; }
      var mcn = (o.mc && o.mc.name ? o.mc.name : '').trim().toLowerCase();
      if (o.mc && o.mc.cases && !mcs[mcn]) mcs[mcn || 'current'] = o.mc;
      return { sq: (o.sq && o.sq.profiles) ? o.sq : null, ocs: ocs, oc: (o.oc && o.oc.attempts) ? o.oc : null, mcs: mcs, mc: (o.mc && o.mc.cases) ? o.mc : null };
    }
    if (o && o.profiles) return { sq: o, oc: null, ocs: {}, mcs: {}, mc: null };
    if (o && typeof o.xp === 'number' && !o.profiles) return { legacy: o, oc: null, ocs: {}, mcs: {}, mc: null };
    if (o && o.attempts) { var c2 = {}; c2[(o.name ? o.name : 'current').trim().toLowerCase()] = o; return { sq: null, oc: o, ocs: c2, mcs: {}, mc: null }; }
    return null;
  }

  function backupName() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return 'gurukool-progress-' + d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + '.txt';
  }

  function downloadBackup(pl) {
    try {
      var blob = new Blob([JSON.stringify(pl, null, 2)], { type: 'text/plain' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = backupName();
      document.body.appendChild(a); a.click();
      setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 1000);
      return true;
    } catch (e) { return false; }
  }

  function mergeInto(pr, getSq, getOc, getMc) {
    var sq = getSq ? getSq() : readLS(SQ_KEY);
    var oc = getOc ? getOc() : readLS(OC_KEY);
    var mc = getMc ? getMc() : readLS(MC_KEY);
    if (pr) {
      if (pr.legacy && sq && sq.profiles) mergeProfile(sq.profiles[sq.current || 'p1'], pr.legacy);
      else if (pr.sq && sq && sq.profiles) mergeSQ(sq, pr.sq);
      else if (pr.sq && !sq) sq = pr.sq;
      var ccName = '';
      try { ccName = (localStorage.getItem('cc_name') || '').trim().toLowerCase(); } catch (e) {}
      /* maths: merge EVERY child's profile by name, then make the
         child named on this device (cc_name) the active one */
      var curName = (oc && oc.name ? oc.name : '').trim().toLowerCase();
      var local = readProfiles();
      if (curName) local[curName] = oc;
      var remote = pr.ocs || {};
      var merged = {}, k;
      for (k in local) merged[k] = remote[k] ? mergeOC(local[k], remote[k]) : local[k];
      for (k in remote) if (!merged[k]) merged[k] = remote[k];
      if (Object.keys(merged).length) {
        var active = (ccName && merged[ccName]) ? ccName : (curName && merged[curName] ? curName : Object.keys(merged)[0]);
        oc = merged[active];
        writeProfiles(merged);
      } else if (pr.oc && oc && oc.attempts) { oc = mergeOC(oc, pr.oc); }
      else if (pr.oc && !oc) { oc = pr.oc; }
      /* mind-champ: the same per-child merge */
      var mcur = (mc && mc.name ? mc.name : '').trim().toLowerCase();
      var mlocal = readMCProfiles();
      if (mcur) mlocal[mcur] = mc;
      var mrem = pr.mcs || {};
      if (pr.mc && pr.mc.cases && !mrem[(pr.mc.name || 'current').trim().toLowerCase()]) mrem[(pr.mc.name || 'current').trim().toLowerCase()] = pr.mc;
      var mmerged = {};
      for (k in mlocal) mmerged[k] = mrem[k] ? mergeMC(mlocal[k], mrem[k]) : mlocal[k];
      for (k in mrem) if (!mmerged[k]) mmerged[k] = mrem[k];
      if (Object.keys(mmerged).length) {
        var mactive = (ccName && mmerged[ccName]) ? ccName : (mcur && mmerged[mcur] ? mcur : Object.keys(mmerged)[0]);
        mc = mmerged[mactive];
        writeMCProfiles(mmerged);
      }
    }
    return { sq: sq, oc: oc, mc: mc };
  }

  /* one tap: pull cloud -> merge -> push merged -> download local backup.
     opts: { silent, getSq, getOc, getMc, onMerged(sq,oc,mc), toast(msg), onNeedSetup() }
     returns a Promise resolving to 'setup' | 'ok' | 'error'. */
  function sync(opts) {
    opts = opts || {};
    var c = ghCfg();
    if (!c) { if (!opts.silent && opts.onNeedSetup) opts.onNeedSetup(); return Promise.resolve('setup'); }
    if (!opts.silent && opts.toast) opts.toast('☁️ Syncing…');
    var sha = null, merged = null;
    return fetch(ghUrl(c), { headers: { 'Authorization': 'Bearer ' + c.token, 'Accept': 'application/vnd.github+json' } })
      .then(function (r) {
        if (r.status === 200) return r.json();
        if (r.status !== 404 && r.status !== 451) throw new Error('GitHub says ' + r.status);
        return null;
      })
      .then(function (j) {
        if (!j) return null;
        sha = j.sha;
        try { return decodeURIComponent(escape(atob((j.content || '').replace(/\n/g, '')))); } catch (e) { return null; }
      })
      .then(function (txt) {
        var pr = null;
        if (txt) { try { pr = parseRemote(txt); } catch (e) { pr = null; } }
        merged = mergeInto(pr, opts.getSq, opts.getOc, opts.getMc);
        writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc); writeLS(MC_KEY, merged.mc);
        if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc, merged.mc); } catch (e) {} }
        var pl = payload(merged.sq, merged.oc, merged.mc);
        return fetch(ghUrl(c), {
          method: 'PUT',
          headers: { 'Authorization': 'Bearer ' + c.token, 'Accept': 'application/vnd.github+json' },
          body: JSON.stringify(Object.assign({ message: 'Gurukool progress sync', content: btoa(unescape(encodeURIComponent(JSON.stringify(pl)))) }, sha ? { sha: sha } : {}))
        });
      })
      .then(function (r) {
        if (!r.ok) throw new Error('GitHub says ' + r.status);
        if (!opts.silent && opts.toast) opts.toast('✅ Synced — all champs safe!');
        return 'ok';
      })
      .catch(function (err) {
        if (!opts.silent && opts.toast) opts.toast('⚠️ ' + (err && err.message ? err.message : 'Sync problem'));
        return 'error';
      })
      .then(function (status) {
        if (!opts.silent) downloadBackup(payload(merged ? merged.sq : readLS(SQ_KEY), merged ? merged.oc : readLS(OC_KEY), merged ? merged.mc : readLS(MC_KEY)));
        return status;
      });
  }

  /* restore a local backup file's text (same merge rules, no cloud) */
  function applyBackupText(txt, opts) {
    opts = opts || {};
    var pr = null;
    try { pr = parseRemote(txt); } catch (e) { pr = null; }
    if (!pr) throw new Error('this does not look like a Gurukool backup');
    var merged = mergeInto(pr, opts.getSq, opts.getOc, opts.getMc);
    writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc); writeLS(MC_KEY, merged.mc);
    if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc, merged.mc); } catch (e) {} }
    return merged;
  }

  return { ghCfg: ghCfg, saveGhCfg: saveGhCfg, mergeOC: mergeOC, mergeSQ: mergeSQ, mergeMC: mergeMC, parseRemote: parseRemote, payload: payload, backupName: backupName, downloadBackup: downloadBackup, sync: sync, applyBackupText: applyBackupText };
})();

/* ---------- AUTO-SAVE — silent cloud sync every 10 minutes ----------
   No buttons, no file downloads, nothing for the child to press.
   Cloud settings are managed ONLY in the Admin Console (admin.html).
   Local progress saves instantly on every answer (localStorage above);
   this timer silently pushes + pulls the combined maths+science progress
   to the family GitHub locker while any Math-Champ page is open. */
(function () {
  function autoSync() {
    try {
      if (!ChampSync.ghCfg()) return;
      ChampSync.sync({ silent: true, getSq: null, getOc: null, onMerged: function (sq, oc) {
        try {
          /* adopt freshly pulled progress live — but never disturb a running mission */
          if (window.MISSION && window.MISSION.M && window.MISSION.M.running) return;
          if (window.OC && oc && OC.STATE !== oc && OC.setState) OC.setState(oc);
          if (typeof window.GK_REFRESH === 'function') { try { window.GK_REFRESH(); } catch (e) {} }
        } catch (e) {}
      } });
    } catch (e) { /* offline or storage blocked — retry on the next cycle */ }
  }
  setTimeout(autoSync, 20000);            /* first quiet sync shortly after open */
  setInterval(autoSync, 180000);          /* then every 3 minutes: pull + push */
})();

