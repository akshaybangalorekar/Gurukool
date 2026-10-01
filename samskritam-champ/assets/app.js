/* ============================================================
   SAMSKRITAM-CHAMP — app engine
   Conversation-first Sanskrit. Progress in localStorage "sk_state";
   per-learner profiles in "sk_profiles" (keyed by name).
   Cloud sync: shared ChampSync engine, locker format champSync:5.
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'sk_state', PKEY = 'sk_profiles';

  function defaultState() {
    return { name: '', xp: 0, streak: { last: null, count: 0 }, scenes: {}, words: {}, patterns: [], journal: [], pin: '' };
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw), d = defaultState();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      return s;
    } catch (e) { return defaultState(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var S = load();

  function readProfiles() { try { var p = JSON.parse(localStorage.getItem(PKEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfiles(p) { try { localStorage.setItem(PKEY, JSON.stringify(p || {})); } catch (e) {} }
  function setState(o) { if (!o || typeof o !== 'object') return; S = o; save(); }

  function switchChild(name) {
    name = String(name || '').trim();
    if (!name) return false;
    var key = name.toLowerCase();
    var cur = (S.name || '').trim();
    var profiles = readProfiles();
    if (cur) profiles[cur.toLowerCase()] = JSON.parse(JSON.stringify(S));
    var next = profiles[key];
    if (!next) { next = defaultState(); next.name = name; }
    next.name = name;
    S = next; save(); writeProfiles(profiles);
    return true;
  }
  (function () {
    try {
      var ccName = (localStorage.getItem('cc_name') || '').trim();
      var cur = (S.name || '').trim();
      if (ccName && cur.toLowerCase() !== ccName.toLowerCase()) switchChild(ccName);
    } catch (e) {}
  })();

  /* ---------- ranks (shared ladder) ---------- */
  var LEVELS = [
    { name: 'Rookie', min: 0 }, { name: 'Explorer', min: 120 }, { name: 'Challenger', min: 300 },
    { name: 'Bronze Olympian', min: 550 }, { name: 'Silver Olympian', min: 900 },
    { name: 'Gold Olympian', min: 1350 }, { name: 'Gurukool Champion', min: 2000 }
  ];
  function levelOf(xp) {
    var i = 0; LEVELS.forEach(function (l, k) { if (xp >= l.min) i = k; });
    var next = LEVELS[i + 1] || null;
    return { i: i, level: LEVELS[i], next: next, pct: next ? Math.round(100 * (xp - LEVELS[i].min) / (next.min - LEVELS[i].min)) : 100 };
  }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function touchStreak() {
    var t = todayStr();
    if (S.streak.last === t) return;
    var y = new Date(Date.now() - 86400000), ys = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
    S.streak.count = (S.streak.last === ys) ? (S.streak.count || 0) + 1 : 1;
    S.streak.last = t;
  }

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>'); }
  function sceneById(id) { for (var i = 0; i < SK_SCENES.length; i++) if (SK_SCENES[i].id === id) return SK_SCENES[i]; return null; }
  function sceneState(id) { S.scenes = S.scenes || {}; return (S.scenes[id] = S.scenes[id] || { done: false, at: 0, words: [], mission: false, journal: [] }); }
  function unlocked(i) { return i === 0 || !!(S.scenes && S.scenes[SK_SCENES[i - 1].id] && S.scenes[SK_SCENES[i - 1].id].done); }
  function wordsIn(str) {
    var out = [];
    String(str).replace(/[^A-Za-zāīūṛśṣṭḍṇṅñḥṃĀĪŪṚŚṢṬḌṆṄÑḤṂ ]/g, ' ').split(/\s+/).forEach(function (w) {
      w = w.replace(/[!?.,;:]/g, '').toLowerCase();
      if (w && SK_WORDS[w]) out.push(w);
    });
    return out;
  }

  /* ---------- speech ---------- */
  /* ---- speaking text preparation ----
     Visarga (ः) is a soft breath, not a hard stop: rāmaḥ is said "rāmaha".
     Most device voices swallow it, so we spell it out for them. */
  function sayDev(t) { return String(t || '').replace(/ः/g, 'ह').replace(/ं/g, 'म्'); }
  function sayLatin(t) { return String(t || '').replace(/ḥ/g, 'ha').replace(/ṃ/g, 'm').replace(/\u1E25/g, 'ha'); }
  var voiceNoteShown = false, voiceCache = [], primed = false;

  function refreshVoices() {
    try { var v = (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; if (v.length) voiceCache = v; } catch (e) {}
    return voiceCache;
  }
  function voiceFor(prefixes, list) {
    for (var i = 0; i < prefixes.length; i++) {
      for (var j = 0; j < (list || []).length; j++) {
        var lg = String(list[j].lang || '').toLowerCase().replace('_', '-');
        if (lg.indexOf(prefixes[i]) === 0) return list[j];
      }
    }
    return null;
  }
  /* iPad Safari often reports NO voices until the speech engine has been used once.
     A silent "unlock" utterance on the first touch fixes that. */
  function primeOnce() {
    if (primed) return;
    primed = true;
    try {
      refreshVoices();
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
      var u = new SpeechSynthesisUtterance(' ');
      u.volume = 0; u.rate = 1;
      window.speechSynthesis.speak(u);
      refreshVoices();
    } catch (e) {}
  }
  try {
    if (window.speechSynthesis && window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', function () { refreshVoices(); });
    }
  } catch (e) {}
  document.addEventListener('pointerdown', primeOnce, true);
  document.addEventListener('touchstart', primeOnce, true);

  function hasIndianVoice() { var v = refreshVoices(); return !!(voiceFor(['hi', 'sa'], v) || voiceFor(['en-in'], v)); }

  function sayNote(latin) {
    if (!voiceNoteShown) {
      voiceNoteShown = true;
      toast('\ud83d\udd07 I could not hear a voice. Say it like this: \u201c' + (latin || '') + '\u201d. If the iPad is on silent (the side switch) or the volume is down, that also mutes it \u2014 a parent can check both, or add a Hindi voice in Settings \u2192 Accessibility \u2192 Spoken Content \u2192 Voices.');
    } else {
      toast('\ud83d\udd07 Say it like this: \u201c' + (latin || '') + '\u201d');
    }
  }

  /* speak(devText, latinText) — always tries hard to be heard */
  function speak(devText, latinText) {
    var synth = window.speechSynthesis;
    var U = window.SpeechSynthesisUtterance;
    if (!synth || !U) { sayNote(latinText || devText); return; }
    primeOnce();
    var list = refreshVoices();
    var hindi = voiceFor(['hi', 'sa'], list);
    var en = voiceFor(['en-in', 'en-gb', 'en'], list);
    var fallback = list.length ? list[0] : null;
    var u = new U();
    var text;
    var devSay = sayDev(devText), latSay = sayLatin(latinText || devText);
    if (hindi) { text = devSay; u.voice = hindi; u.lang = hindi.lang || 'hi-IN'; }
    else if (en) { text = latSay; u.voice = en; u.lang = en.lang || 'en-IN'; }
    else if (fallback) { text = latSay; u.voice = fallback; u.lang = fallback.lang || 'en-IN'; }
    else { text = latSay; u.lang = 'en-IN'; }
    /* pitch 1.5 + a gentle pace = the young, friendly voice of a boy like Krishna */
    u.text = text; u.rate = 0.82; u.pitch = 1.5; u.volume = 1;
    var started = false;
    u.onstart = function () { started = true; };
    u.onerror = function () { if (!started) sayNote(latinText || devText); };
    try { if (synth.speaking || synth.pending) synth.cancel(); } catch (e) {}
    try { synth.speak(u); } catch (e) { sayNote(latinText || devText); return; }
    setTimeout(function () {
      try {
        if (!started && !synth.speaking) {
          var u2 = new U();
          u2.text = latSay; u2.rate = 0.82; u2.pitch = 1.5; u2.volume = 1;
          if (fallback) { u2.voice = fallback; u2.lang = fallback.lang || 'en-IN'; } else { u2.lang = 'en-IN'; }
          u2.onstart = function () { started = true; };
          u2.onerror = function () { sayNote(latinText || devText); };
          try { synth.speak(u2); } catch (e) { sayNote(latinText || devText); }
          setTimeout(function () { if (!started) sayNote(latinText || devText); }, 1200);
        }
      } catch (e) {}
    }, 1000);
  }

  /* a parent-facing check: does this device actually speak? */
  window.skTestVoice = function () {
    primeOnce();
    var list = refreshVoices();
    var hindi = voiceFor(['hi', 'sa'], list);
    var en = voiceFor(['en-in', 'en-gb', 'en'], list);
    var who = hindi ? 'a Hindi/Sanskrit voice (' + hindi.name + ')' : (en ? 'an English voice (' + en.name + ')' : (list.length ? 'the device default voice' : 'NO voice at all'));
    toast('\ud83d\udd0a Testing\u2026 found ' + who + '. Listen now.');
    speak('नमस्ते! धन्यवादः। अहं गुरुः अस्मि।', 'namaste! dhanyavādaḥ. aham guruḥ asmi.');
    setTimeout(function () {
      if (!voiceNoteShown) toast('\u2705 If you heard that, the speaker works! If not, check the iPad side switch (mute) and volume, or add a Hindi voice in Settings.');
    }, 2600);
  };

  function attrJs(x) {
    /* safe inside a double-quoted onclick attribute: no nested double quotes */
    return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/'/g, '&#39;').replace(/\\/g, '&#92;');
  }
  function speakBtn(dev, latin) {
    return '<button class="sk-say" onclick="skSpeak(\'' + attrJs(dev) + '\',\'' + attrJs(latin || '') + '\')" title="Hear it">\ud83d\udd0a</button>';
  }

  function normChars(s) {
    return String(s || '').replace(/[\s।!?,.:;'"()\-]/g, '');
  }
  function similarity(a, b) {
    a = normChars(a); b = normChars(b);
    if (!a || !b) return 0;
    if (a === b) return 1;
    /* longest common subsequence ratio — generous, because speech recognition is imperfect */
    var m = a.length, n = b.length, dp = [];
    for (var i = 0; i <= m; i++) { dp[i] = []; for (var j = 0; j <= n; j++) dp[i][j] = 0; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      dp[i][j] = (a[i - 1] === b[j - 1]) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[m][n] / Math.max(m, n);
  }

  var rec = null, listening = false;
  function startListen(onHeard) {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast('🎤 Voice is not available on this browser — tap the answer instead!'); return; }
    if (listening) { try { rec.stop(); } catch (e) {} listening = false; return; }
    try {
      rec = new SR();
      rec.lang = 'hi-IN';         /* Devanagari output; Sanskrit words sound close */
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      listening = true;
      toast('🎤 Listening… speak slowly and clearly');
      rec.onresult = function (e) {
        var heard = [];
        for (var i = 0; i < e.results[0].length; i++) heard.push(e.results[0][i].transcript);
        listening = false;
        onHeard(heard);
      };
      rec.onerror = function () { listening = false; toast('🎤 I could not hear that — try again, or tap the answer.'); };
      rec.onend = function () { listening = false; };
      rec.start();
    } catch (e) { listening = false; toast('🎤 The microphone needs permission on this device.'); }
  }

  /* ---------- view ---------- */
  var view = { page: 'home' }, T = null;   /* T = live turn state */

  function headerHTML() {
    var L = levelOf(S.xp);
    var nm = (S.name || '').trim() || 'Learner';
    return '<div class="gk-bar"><div class="gk-row1"><div class="gk-lvl">Lv ' + (L.i + 1) + ' · ' + L.level.name + '</div>' +
      '<div class="gk-xpbar"><div class="gk-xpfill" style="width:' + L.pct + '%"></div></div></div>' +
      '<div class="gk-row2"><button class="gk-mini" onclick="skHome()">🪔 ' + esc(nm) + '</button>' +
      '<span class="gk-stat">⭐ ' + S.xp + ' XP</span><span class="gk-stat">🔥 ' + (S.streak.count || 0) + '-day streak</span>' +
      '<span class="gk-stat">📚 ' + Object.keys(S.words || {}).length + ' words</span>' +
      '<button class="gk-mini" onclick="skSync(this)" title="Sync now">☁️</button>' +
      '<a class="gk-mini" href="../index.html">🏠 Gurukool</a></div>' +
      (L.next ? '<div class="gk-stat gk-next">' + (L.next.min - S.xp) + ' XP to reach ' + L.next.name + ' →</div>' : '') + '</div>';
  }

  function render() {
    var app = $('sk-app'); if (!app) return;
    app.innerHTML = headerHTML() + (view.page === 'home' ? homeHTML() : (view.page === 'scene' ? sceneHTML() : treasuryHTML()));
    window.scrollTo(0, 0);
  }

  function homeHTML() {
    var cards = SK_SCENES.map(function (sc, i) {
      var st = (S.scenes || {})[sc.id] || { done: false, at: 0, words: [] };
      var ok = unlocked(i);
      return '<div class="sk-card' + (ok ? '' : ' locked') + (st.done ? ' done' : '') + '" onclick="' + (ok ? "skOpen('" + sc.id + "')" : 'skLocked()') + '">' +
        '<div class="sk-icon">' + (ok ? sc.icon : '🔒') + '</div><div class="sk-body"><b>' + esc(sc.name) + '</b>' +
        '<span class="sk-lvl">' + esc(sc.level) + '</span><span class="sk-blurb">' + esc(sc.blurb) + '</span>' +
        '<span class="sk-st">' + (st.done ? '🏆 done · ' + (st.words || []).length + ' words' : (st.at ? '▶ continue' : 'start talking')) + '</span></div>' +
        '<div class="sk-go">' + (st.done ? '🏅' : (ok ? '▶' : '')) + '</div></div>';
    }).join('');
    var pats = (S.patterns || []).map(function (p) { return '<div class="sk-pattern"><b>' + esc(p.t) + '</b><span>' + esc(p.d) + '</span></div>'; }).join('');
    return '<h1 style="text-align:center">🪔 Samskritam-Champ</h1>' +
      '<p class="sk-lead">Learn Sanskrit the way it is really learned — <b>by talking</b>. The guru speaks, you answer out loud or by tapping. No grammar tables first: patterns appear as you use them.</p>' +
      '<p style="text-align:center;margin:0 0 14px"><button class="sk-btn sec tiny" onclick="skTestVoice()">\ud83d\udd0a Test the speaker</button></p>' +
      '<div class="sk-grid">' + cards + '</div>' +
      '<a class="sk-treasury" href="#" onclick="skTreasury();return false"><span>📚</span><div><b>My Shabda-Kosha — word treasury</b><span>' + Object.keys(S.words || {}).length + ' words collected · tap to review and quiz yourself</span></div><span class="sk-go">▶</span></a>' +
      (pats ? '<p class="sk-label">🧠 Patterns you discovered</p><div class="sk-patterns">' + pats + '</div>' : '') +
      '<p class="sk-note">' + (hasIndianVoice() ? '' : '\ud83d\udd07 <b>No spoken voice on this device</b> — the speaker will read the transliteration in English instead, and the pronunciation key is always your guide. To add a Hindi voice: iPad Settings \u2192 Accessibility \u2192 Spoken Content \u2192 Voices \u2192 Hindi.<br>') + '🔊 Tap the speaker to hear a line (your device\'s Devanagari voice — close, not perfect). 🎤 Tap the mic and say it out loud. Every scene ends with a <b>family mission</b> — two lines for you and your child to say to each other.</p>';
  }

  function sceneHTML() {
    var sc = sceneById(view.sid); if (!sc) return homeHTML();
    var st = sceneState(sc.id);
    if (view.phase === 'intro')
      return '<div class="sk-scene"><div class="sk-icon big">' + sc.icon + '</div><h2>' + esc(sc.name) + '</h2>' +
        '<p class="sk-story">' + esc(sc.intro) + '</p>' +
        '<p class="sk-note">' + sc.turns.length + ' exchanges · ' + esc(sc.level) + '</p>' +
        '<button class="sk-btn" onclick="skStart()">Namaste — let\'s talk! ▶</button></div>';
    if (view.phase === 'mission') {
      var m = sc.mission;
      return '<div class="sk-scene won"><div class="sk-icon big">🎉</div><h2>Scene complete!</h2>' +
        '<p class="sk-story">Now take it home — <b>' + esc(m.title) + '</b>. Say these two lines to each other tonight:</p>' +
        m.lines.map(function (l) {
          return '<div class="sk-mline"><span class="sk-who">' + esc(l.who) + '</span><div><b class="sk-dev">' + esc(l.dev) + '</b>' +
            '<span class="sk-tr">' + esc(l.tr) + '</span><span class="sk-mean">' + esc(l.mean) + '</span></div>' + speakBtn(l.dev, l.tr) + '</div>';
        }).join('') +
        '<button class="sk-btn" onclick="skMissionDone()">✅ We said it together!</button>' +
        '<p class="sk-note">Both of you earn this — type your own name on the Gurukool home page and your progress is kept separately.</p>' +
        '<div style="margin-top:12px"><button class="sk-btn sec" onclick="skHome()">Back to the scenes</button></div></div>';
    }
    /* live dialogue */
    var turn = sc.turns[st.at] || sc.turns[sc.turns.length - 1];
    var dots = sc.turns.map(function (t, i) { return '<span class="sk-dot' + (i < st.at ? ' done' : '') + (i === st.at ? ' cur' : '') + '"></span>'; }).join('');
    return '<div class="sk-scene"><div class="sk-dotrow">' + dots + '<span class="sk-name">' + sc.icon + ' ' + esc(sc.name) + '</span></div>' +
      '<div class="sk-guru"><span class="sk-guru-av">🧘</span><div><b class="sk-dev">' + tapWords(turn.g.dev) + '</b>' +
      '<span class="sk-tr">' + esc(turn.g.tr) + '</span>' +
      '<span class="sk-sayline">🗣 ' + esc(turn.g.say) + '</span>' +
      '<span class="sk-mean">' + esc(turn.g.mean) + '</span></div>' + speakBtn(turn.g.dev, turn.g.tr) + '</div>' +
      '<p class="sk-you">Your turn — what do you say?</p><div id="sk-opts">' + optsHTML(turn) + '</div>' +
      '<div id="sk-fb"></div><div id="sk-note"></div></div>';
  }

  function tapWords(dev) {
    /* every known word becomes tappable for its stem + cousins */
    var parts = String(dev).split(/(\s+)/);
    return parts.map(function (p) {
      var clean = p.replace(/[!?।.,;:]/g, '').trim();
      var key = null;
      for (var k in SK_WORDS) if (SK_WORDS[k].dev === clean) { key = k; break; }
      if (!key) return esc(p);
      return '<span class="sk-word" onclick="skWord(\'' + key + '\')">' + esc(p) + '</span>';
    }).join('');
  }

  function optsHTML(turn) {
    return '<div class="sk-opts">' + turn.opts.map(function (o, i) {
      return '<div class="sk-optrow"><button class="sk-opt" onclick="skChoose(' + i + ')">' +
        '<b class="sk-dev">' + esc(o.dev) + '</b><span class="sk-tr">' + esc(o.tr) + '</span><span class="sk-mean">' + esc(o.mean) + '</span></button>' +
        '<button class="sk-mic" onclick="skSay(' + i + ')" title="Say it out loud">🎤</button></div>';
    }).join('') + '</div>';
  }

  /* ---------- dialogue logic ---------- */
  window.skSpeak = function (dev, latin) { speak(dev, latin); };
  window.skWord = function (key) {
    var w = SK_WORDS[key]; if (!w) return;
    modal('<h3>' + w.dev + ' — ' + w.mean + '</h3>' +
      '<p><b>Say it:</b> ' + esc(w.say) + '</p>' +
      '<p><b>Built from:</b> ' + esc(w.root) + '</p>' +
      '<p><b>Words you already know:</b> ' + esc(w.cousins) + '</p>' +
      '<div class="sk-starrow"><button class="sk-btn" onclick="skCloseModal()">Got it!</button></div>');
  };
  window.skCloseModal = function () { var m = $('sk-modal'); if (m) m.style.display = 'none'; };
  function modal(html) { var m = $('sk-modal'); if (!m) return; $('sk-modal-body').innerHTML = html; m.style.display = 'flex'; }
  function toast(msg) {
    var d = $('sk-toasts'); if (!d) return;
    var t = document.createElement('div'); t.className = 'sk-toast'; t.textContent = msg;
    d.appendChild(t); setTimeout(function () { t.remove(); }, 3200);
  }
  window.skToast = toast;

  function collectWord(key) {
    if (!SK_WORDS[key]) return;
    S.words = S.words || {};
    var w = S.words[key] = S.words[key] || { seen: 0, ok: 0, last: 0 };
    w.seen++; w.last = Date.now();
    var sc = sceneState(view.sid);
    if (sc.words.indexOf(key) < 0) sc.words.push(key);
  }

  window.skOpen = function (id) {
    view = { page: 'scene', sid: id, phase: 'intro' };
    var st = sceneState(id);
    if (st.done) { view.phase = st.mission ? 'mission' : 'mission'; render(); return; }
    render();
  };
  window.skStart = function () { view.phase = 'talk'; render(); };
  window.skHome = function () { view = { page: 'home' }; render(); };
  window.skLocked = function () { toast('🔒 Finish the scene before it to unlock this one — one conversation at a time!'); };
  window.skTreasury = function () { view = { page: 'treasury' }; render(); };

  window.skChoose = function (i) {
    var sc = sceneById(view.sid), st = sceneState(sc.id), turn = sc.turns[st.at];
    var o = turn.opts[i]; if (!o) return;
    if (!o.ok) {
      /* never scold: the guru simply repeats, slowly */
      $('sk-fb').innerHTML = '<div class="sk-fb bad">The guru smiles and says it again, more slowly… ' + speakBtn(turn.g.dev, turn.g.tr) + '</div>';
      speak(turn.g.dev, turn.g.tr);
      return;
    }
    var xp = 10 + (turn.opts.length > 1 ? 2 : 0);
    S.xp += xp; touchStreak();
    turn.opts.forEach(function (x) { wordsIn(x.tr).forEach(collectWord); });
    wordsIn(turn.g.tr).forEach(collectWord);
    st.at++;
    if (turn.after && S.patterns.indexOf(turn.after) < 0) S.patterns.push(turn.after);
    save();
    $('sk-fb').innerHTML = '<div class="sk-fb win">✅ +' + xp + ' XP — that was real Sanskrit!</div>';
    if (turn.after) $('sk-note').innerHTML = '<div class="sk-pattern-inline">🧠 ' + esc(turn.after) + '</div>';
    if (st.at >= sc.turns.length) { view.phase = 'mission'; setTimeout(render, 900); return; }
    setTimeout(function () {
      /* keep the after-note visible briefly, then show the next exchange */
      var fbEl = $('sk-fb'); if (fbEl) fbEl.innerHTML = '';
      render();
    }, turn.after ? 2600 : 900);
  };

  window.skSay = function (i) {
    var sc = sceneById(view.sid), st = sceneState(sc.id), turn = sc.turns[st.at];
    var o = turn.opts[i]; if (!o) return;
    startListen(function (heard) {
      var best = 0, bestTxt = '';
      heard.forEach(function (h) {
        var s1 = similarity(h, o.dev), s2 = similarity(h, o.tr);
        var s = Math.max(s1, s2);
        if (s > best) { best = s; bestTxt = h; }
      });
      if (best >= 0.45) {
        S.xp += 5; save();
        toast('🌟 The guru heard you: “' + bestTxt + '” — +5 XP for speaking!');
        skChoose(i);
      } else {
        toast('🎤 I heard “' + (bestTxt || '…') + '” — close! Say it once more, slowly, or just tap it.');
      }
    });
  };

  window.skMissionDone = function () {
    var sc = sceneById(view.sid), st = sceneState(sc.id);
    if (!st.mission) { st.mission = true; st.done = true; S.xp += 20; touchStreak(); save(); }
    toast('🎉 Mission complete! +20 XP — and both of you learned something tonight.');
    view = { page: 'home' }; render();
  };

  /* ---------- word treasury ---------- */
  function treasuryHTML() {
    var keys = Object.keys(S.words || {});
    var quiz = T && T.quiz ? T.quiz : null;
    var h = '<div class="sk-scene"><h2>📚 Shabda-Kosha</h2><p class="sk-lead">Every word you have met in conversation. Tap a word for its story.</p>';
    if (!keys.length) h += '<div class="sk-note">No words yet — start a scene and they will collect here.</div>';
    else {
      h += '<div class="sk-words">' + keys.map(function (k) {
        var w = SK_WORDS[k], u = S.words[k] || {};
        return '<button class="sk-wordchip" onclick="skWord(\'' + k + '\')"><b>' + w.dev + '</b><span>' + esc(w.mean) + '</span><i>' + (u.ok || 0) + '✓</i></button>';
      }).join('') + '</div>';
      h += '<button class="sk-btn" onclick="skQuiz()">🎯 Quiz me on my words</button>';
    }
    if (quiz) {
      h += '<div class="sk-quiz"><p class="sk-you">What does <b class="sk-dev">' + quiz.w.dev + '</b> mean?</p>' +
        '<div class="sk-opts">' + quiz.opts.map(function (o, i) { return '<button class="sk-opt" onclick="skQuizPick(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div></div>';
    }
    h += '<div style="margin-top:14px"><button class="sk-btn sec" onclick="skHome()">Back</button></div></div>';
    return h;
  }

  window.skQuiz = function () {
    var keys = Object.keys(S.words || {});
    if (keys.length < 3) { toast('Collect a few more words first!'); return; }
    var pick = keys[Math.floor(Math.random() * keys.length)];
    var others = keys.filter(function (k) { return k !== pick; });
    var opts = [SK_WORDS[pick].mean];
    while (opts.length < 3 && others.length) {
      var o = others.splice(Math.floor(Math.random() * others.length), 1)[0];
      if (opts.indexOf(SK_WORDS[o].mean) < 0) opts.push(SK_WORDS[o].mean);
    }
    opts.sort(function () { return Math.random() - 0.5; });
    T = { quiz: { key: pick, w: SK_WORDS[pick], opts: opts, answer: opts.indexOf(SK_WORDS[pick].mean) } };
    render();
  };
  window.skQuizPick = function (i) {
    if (!T || !T.quiz) return;
    var q = T.quiz, w = S.words[q.key] = S.words[q.key] || { seen: 0, ok: 0, last: 0 };
    if (i === q.answer) { w.ok = (w.ok || 0) + 1; S.xp += 5; touchStreak(); save(); toast('✅ Correct! +5 XP'); }
    else toast('Not that one — ' + q.w.dev + ' means “' + q.w.mean + '”. Read it once more!');
    T = null; render();
  };

  /* ============================================================
     ChampSync — shared engine, locker format champSync:5
     (sk = Samskritam state of the active learner, sks = per learner)
     IDENTICAL COPY embedded in Math-Champ, ScienceQuest, Mind-Champ
     and admin.html.
     ============================================================ */

  var CFG_KEY = 'sq_gh';
  var SQ_KEY = 'sq_v3', OC_KEY = 'oc_state', PROFILES_KEY = 'oc_profiles', MC_KEY = 'mc_state', MPROFILES_KEY = 'mc_profiles', SK_KEY = 'sk_state', SKPROFILES_KEY = 'sk_profiles';

  function ghCfg() { try { var c = JSON.parse(localStorage.getItem(CFG_KEY)); if (c && c.owner && c.repo && c.token) return c; } catch (e) {} return null; }
  function saveGhCfg(c) { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function ghUrl(c) { return 'https://api.github.com/repos/' + c.owner + '/' + c.repo + '/contents/' + encodeURIComponent(c.path && c.path.length ? c.path : 'progress.json'); }
  function readLS(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function writeLS(k, v) { if (v == null) return; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function readProfilesLS() { try { var p = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfilesLS(p) { try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  function readMCProfiles() { try { var p = JSON.parse(localStorage.getItem(MPROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeMCProfiles(p) { try { localStorage.setItem(MPROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  function readSKProfiles() { try { var p = JSON.parse(localStorage.getItem(SKPROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeSKProfiles(p) { try { localStorage.setItem(SKPROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  function uniqList(arr) { var o = {}, out = []; (arr || []).forEach(function (x) { if (!o[x]) { o[x] = 1; out.push(x); } }); return out; }

  function mergeProfile(a, b) {
    a.xp = Math.max(a.xp || 0, b.xp || 0);
    ['lessons', 'practice'].forEach(function (k) { var src = b[k] || {}; a[k] = a[k] || {}; for (var key in src) { if (src[key]) a[k][key] = src[key]; } });
    var q = b.quiz || {}; for (var w in q) { if (q[w] && q[w].t) { a.quiz = a.quiz || {}; if (!a.quiz[w] || !a.quiz[w].t || q[w].s > a.quiz[w].s) a.quiz[w] = q[w]; } }
    var lvB = b.levels || {}; for (var wL in lvB) { a.levels = a.levels || {}; var mL = a.levels[wL] || { c: 1, b1: 0, b2: 0, arena: 0 }; mL.c = Math.max(mL.c || 1, lvB[wL].c || 1); mL.b1 = Math.max(mL.b1 || 0, lvB[wL].b1 || 0); mL.b2 = Math.max(mL.b2 || 0, lvB[wL].b2 || 0); mL.arena = Math.max(mL.arena || 0, lvB[wL].arena || 0); a.levels[wL] = mL; }
    ['badges', 'visited'].forEach(function (k) { a[k] = a[k] || []; (b[k] || []).forEach(function (x) { if (a[k].indexOf(x) < 0) a[k].push(x); }); });
    if ((b.streak || 0) > (a.streak || 0)) { a.streak = b.streak; a.lastDay = b.lastDay || a.lastDay; }
    (b.doubts || []).forEach(function (x) { a.doubts = a.doubts || []; if (!a.doubts.some(function (y) { return y.t === x.t && y.d === x.d; })) a.doubts.push(x); });
  }
  function mergeSQ(a, b) {
    if (!b || !b.profiles) return a;
    if (!a || !a.profiles) return b;
    if (b.pin && !a.pin) a.pin = b.pin;
    for (var k in b.profiles) { if (!a.profiles[k]) a.profiles[k] = b.profiles[k]; else mergeProfile(a.profiles[k], b.profiles[k]); }
    return a;
  }
  function mergeOC(a, b) {
    if (!b || typeof b !== 'object' || !b.attempts) return a;
    if (!a || !a.attempts) return b;
    var out = { name: '', xp: 0, attempts: [], journal: [], streak: { last: null, count: 0 }, badges: {}, skills: {}, missionLast: null, pin: '' };
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    var seen = {}, list = [];
    (a.attempts || []).concat(b.attempts || []).forEach(function (t) {
      var k = (t.kind || '') + '|' + (t.id || '') + '|' + (t.ts || '');
      if (!seen[k]) { seen[k] = 1; list.push(t); }
    });
    list.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    out.attempts = list.slice(-400);
    var jseen = {};
    (a.journal || []).concat(b.journal || []).forEach(function (j) { var k = (j.ts || '') + '|' + (j.note || ''); if (!jseen[k]) { jseen[k] = 1; out.journal.push(j); } });
    out.journal = out.journal.slice(-60);
    out.badges = a.badges || {}; for (var bk in (b.badges || {})) out.badges[bk] = out.badges[bk] || b.badges[bk];
    for (var sk in (b.skills || {})) { var av = (a.skills || {})[sk] || 0, bv = b.skills[sk] || 0; out.skills[sk] = Math.max(av, bv); }
    for (var sk2 in (a.skills || {})) if (out.skills[sk2] === undefined) out.skills[sk2] = a.skills[sk2];
    if ((b.streak && b.streak.count || 0) > (a.streak && a.streak.count || 0)) out.streak = b.streak; else out.streak = a.streak;
    out.missionLast = (b.missionLast && (!a.missionLast || (b.missionLast.ts || 0) > (a.missionLast.ts || 0))) ? b.missionLast : a.missionLast;
    out.pin = a.pin || b.pin || '';
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
      bc.used = uniqList((bc.used || []).concat(ac.used || []));
      var jseen = {};
      bc.journal = (bc.journal || []).concat(ac.journal || []).filter(function (j) {
        var key = j.ts + '|' + j.text; if (jseen[key]) return false; jseen[key] = 1; return true;
      }).slice(-40);
    }
    return out;
  }
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
      var jseen = {};
      bc.journal = (bc.journal || []).concat(ac.journal || []).filter(function (j) {
        var key = j.ts + '|' + j.text; if (jseen[key]) return false; jseen[key] = 1; return true;
      }).slice(-40);
    }
    if ((a.streak && a.streak.count || 0) > (out.streak && out.streak.count || 0)) out.streak = a.streak;
    out.pin = out.pin || a.pin || '';
    return out;
  }
  function mergeSK(a, b) {
    if (!b || typeof b !== 'object' || !b.scenes) return a;
    if (!a || !a.scenes) return b;
    var out = JSON.parse(JSON.stringify(b));
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    out.patterns = uniqList((a.patterns || []).concat(b.patterns || []));
    out.journal = uniqList((a.journal || []).concat(b.journal || []));
    out.words = out.words || {};
    for (var w in (a.words || {})) {
      var aw = a.words[w], bw = out.words[w] = out.words[w] || { seen: 0, ok: 0, last: 0 };
      bw.seen = Math.max(bw.seen || 0, aw.seen || 0);
      bw.ok = Math.max(bw.ok || 0, aw.ok || 0);
      bw.last = Math.max(bw.last || 0, aw.last || 0);
    }
    for (var k in a.scenes) {
      var as = a.scenes[k], bs = out.scenes[k] = out.scenes[k] || { done: false, at: 0, words: [], mission: false };
      bs.done = bs.done || !!as.done;
      bs.at = Math.max(bs.at || 0, as.at || 0);
      bs.mission = bs.mission || !!as.mission;
      bs.words = uniqList((bs.words || []).concat(as.words || []));
    }
    if ((a.streak && a.streak.count || 0) > (out.streak && out.streak.count || 0)) out.streak = a.streak;
    out.pin = out.pin || a.pin || '';
    return out;
  }

  function payload(sq, oc, mc, sk) {
    var ocs = readProfilesLS();
    var n = (oc && oc.name ? oc.name : '').trim().toLowerCase();
    if (n) ocs[n] = oc;
    var mcs = readMCProfiles();
    var mn = (mc && mc.name ? mc.name : '').trim().toLowerCase();
    if (mn) mcs[mn] = mc;
    var sks = readSKProfiles();
    var sn = (sk && sk.name ? sk.name : '').trim().toLowerCase();
    if (sn) sks[sn] = sk;
    return { champSync: 5, sq: sq || null, oc: oc || null, ocs: ocs, mc: mc || null, mcs: mcs, sk: sk || null, sks: sks };
  }

  function parseRemote(txt) {
    var o = JSON.parse(txt);
    if (o && (o.champSync === 5 || o.champSync === 4 || o.champSync === 3 || o.champSync === 2)) {
      var ocs = {}, mcs = {}, sks = {}, k;
      if (o.ocs && typeof o.ocs === 'object') for (k in o.ocs) { var v = o.ocs[k]; if (v && typeof v === 'object' && v.attempts) ocs[String(k).toLowerCase()] = v; }
      var onc = (o.oc && o.oc.name ? o.oc.name : '').trim().toLowerCase();
      if (o.oc && o.oc.attempts && !ocs[onc]) ocs[onc || 'current'] = o.oc;
      if (o.mcs && typeof o.mcs === 'object') for (k in o.mcs) { var mv = o.mcs[k]; if (mv && typeof mv === 'object' && mv.cases) mcs[String(k).toLowerCase()] = mv; }
      var mcn = (o.mc && o.mc.name ? o.mc.name : '').trim().toLowerCase();
      if (o.mc && o.mc.cases && !mcs[mcn]) mcs[mcn || 'current'] = o.mc;
      if (o.sks && typeof o.sks === 'object') for (k in o.sks) { var sv = o.sks[k]; if (sv && typeof sv === 'object' && sv.scenes) sks[String(k).toLowerCase()] = sv; }
      var scn = (o.sk && o.sk.name ? o.sk.name : '').trim().toLowerCase();
      if (o.sk && o.sk.scenes && !sks[scn]) sks[scn || 'current'] = o.sk;
      return { sq: (o.sq && o.sq.profiles) ? o.sq : null, ocs: ocs, oc: (o.oc && o.oc.attempts) ? o.oc : null, mcs: mcs, mc: (o.mc && o.mc.cases) ? o.mc : null, sks: sks, sk: (o.sk && o.sk.scenes) ? o.sk : null };
    }
    if (o && o.profiles) return { sq: o, oc: null, ocs: {}, mcs: {}, mc: null, sks: {}, sk: null };
    if (o && typeof o.xp === 'number' && !o.profiles) return { legacy: o, oc: null, ocs: {}, mcs: {}, mc: null, sks: {}, sk: null };
    if (o && o.attempts) { var c2 = {}; c2[(o.name ? o.name : 'current').trim().toLowerCase()] = o; return { sq: null, oc: o, ocs: c2, mcs: {}, mc: null, sks: {}, sk: null }; }
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

  function mergeInto(pr, getSq, getOc, getMc, getSk) {
    var sq = getSq ? getSq() : readLS(SQ_KEY);
    var oc = getOc ? getOc() : readLS(OC_KEY);
    var mc = getMc ? getMc() : readLS(MC_KEY);
    var sk = getSk ? getSk() : readLS(SK_KEY);
    if (pr) {
      if (pr.legacy && sq && sq.profiles) mergeProfile(sq.profiles[sq.current || 'p1'], pr.legacy);
      else if (pr.sq && sq && sq.profiles) mergeSQ(sq, pr.sq);
      else if (pr.sq && !sq) sq = pr.sq;
      var ccName = '';
      try { ccName = (localStorage.getItem('cc_name') || '').trim().toLowerCase(); } catch (e) {}
      var curName = (oc && oc.name ? oc.name : '').trim().toLowerCase();
      var local = readProfilesLS();
      if (curName) local[curName] = oc;
      var remote = pr.ocs || {};
      var merged = {}, k;
      for (k in local) merged[k] = remote[k] ? mergeOC(local[k], remote[k]) : local[k];
      for (k in remote) if (!merged[k]) merged[k] = remote[k];
      if (Object.keys(merged).length) {
        var active = (ccName && merged[ccName]) ? ccName : (curName && merged[curName] ? curName : Object.keys(merged)[0]);
        oc = merged[active]; writeProfilesLS(merged);
      } else if (pr.oc && oc && oc.attempts) { oc = mergeOC(oc, pr.oc); }
      else if (pr.oc && !oc) { oc = pr.oc; }
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
        mc = mmerged[mactive]; writeMCProfiles(mmerged);
      }
      var scur = (sk && sk.name ? sk.name : '').trim().toLowerCase();
      var slocal = readSKProfiles();
      if (scur) slocal[scur] = sk;
      var srem = pr.sks || {};
      if (pr.sk && pr.sk.scenes && !srem[(pr.sk.name || 'current').trim().toLowerCase()]) srem[(pr.sk.name || 'current').trim().toLowerCase()] = pr.sk;
      var smerged = {};
      for (k in slocal) smerged[k] = srem[k] ? mergeSK(slocal[k], srem[k]) : slocal[k];
      for (k in srem) if (!smerged[k]) smerged[k] = srem[k];
      if (Object.keys(smerged).length) {
        var sactive = (ccName && smerged[ccName]) ? ccName : (scur && smerged[scur] ? scur : Object.keys(smerged)[0]);
        sk = smerged[sactive]; writeSKProfiles(smerged);
      }
    }
    return { sq: sq, oc: oc, mc: mc, sk: sk };
  }

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
        merged = mergeInto(pr, opts.getSq, opts.getOc, opts.getMc, opts.getSk);
        writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc); writeLS(MC_KEY, merged.mc); writeLS(SK_KEY, merged.sk);
        if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc, merged.mc, merged.sk); } catch (e) {} }
        var pl = payload(merged.sq, merged.oc, merged.mc, merged.sk);
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
        if (!opts.silent) downloadBackup(payload(merged ? merged.sq : readLS(SQ_KEY), merged ? merged.oc : readLS(OC_KEY), merged ? merged.mc : readLS(MC_KEY), merged ? merged.sk : readLS(SK_KEY)));
        return status;
      });
  }

  function applyBackupText(txt, opts) {
    opts = opts || {};
    var pr = null;
    try { pr = parseRemote(txt); } catch (e) { return false; }
    if (!pr) return false;
    var merged = mergeInto(pr, opts.getSq, opts.getOc, opts.getMc, opts.getSk);
    writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc); writeLS(MC_KEY, merged.mc); writeLS(SK_KEY, merged.sk);
    if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc, merged.mc, merged.sk); } catch (e) {} }
    return true;
  }

  window.ChampSync = { ghCfg: ghCfg, saveGhCfg: saveGhCfg, mergeOC: mergeOC, mergeSQ: mergeSQ, mergeMC: mergeMC, mergeSK: mergeSK, parseRemote: parseRemote, payload: payload, backupName: backupName, downloadBackup: downloadBackup, sync: sync, applyBackupText: applyBackupText };

  /* ---------- cloud sync for this champ ---------- */
  function cloudSync(silent) {
    return ChampSync.sync({
      silent: silent, getSq: null, getOc: null, getMc: null,
      getSk: function () { return S; },
      onMerged: function (sq, oc, mc, sk) {
        try {
          if (T && view.page === 'scene' && view.phase === 'talk') return;   /* never disturb a live conversation */
          if (sk && sk.scenes && sk !== S) { setState(sk); render(); }
        } catch (e) {}
      },
      toast: function (m) { toast(m); },
      onNeedSetup: null
    });
  }

  window.skSync = function (btn) {
    if (!ghCfg()) { toast('☁️ Cloud sync is not set up on this device yet — a parent can set it up in the Parent Console.'); if (btn) { btn.textContent = '⚠️'; setTimeout(function () { btn.textContent = '☁️'; }, 3000); } return; }
    if (btn) { btn.textContent = '⏳'; }
    cloudSync(true).then(function (r) {
      if (btn) { btn.textContent = (r === 'ok' ? '✅' : '❌'); setTimeout(function () { btn.textContent = '☁️'; }, 3000); }
      if (r === 'ok') toast('✅ Synced — progress up to date!');
      else if (r === 'error') toast('⚠️ Sync problem — it will retry automatically.');
    });
  };

  setTimeout(function () { if (ghCfg()) cloudSync(true); }, 20000);
  setInterval(function () { if (ghCfg()) cloudSync(true); }, 180000);

  /* test hooks */
  window.SK = { sayDev: sayDev, sayLatin: sayLatin, S: function () { return S; }, switchChild: switchChild, view: function () { return view; }, open: window.skOpen, start: window.skStart,
    choose: window.skChoose, missionDone: window.skMissionDone, treasury: window.skTreasury, quiz: window.skQuiz, quizPick: window.skQuizPick,
    similarity: similarity, words: SK_WORDS, scenes: SK_SCENES, state: function () { return T; } };

  render();
})();
