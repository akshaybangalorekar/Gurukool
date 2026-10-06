/* ============================================================
   MIND-CHAMP — app engine
   Hands-on reasoning cases. Progress in localStorage "mc_state";
   per-child profiles in "mc_profiles" (keyed by name).
   Cloud sync: shared ChampSync engine, locker format champSync:4.
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'mc_state', PKEY = 'mc_profiles';

  /* ---------- state ---------- */

  function defaultState() {
    return { name: '', xp: 0, streak: { last: null, count: 0 }, techniques: [], cases: {}, journal: [], pin: '' };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw), d = defaultState();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      for (var q in s.cases) { var c = s.cases[q]; c.used = c.used || []; c.journal = c.journal || []; c.stars = c.stars || 0; }
      return s;
    } catch (e) { return defaultState(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var S = load();

  function readProfiles() { try { var p = JSON.parse(localStorage.getItem(PKEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfiles(p) { try { localStorage.setItem(PKEY, JSON.stringify(p || {})); } catch (e) {} }

  function setState(o) { if (!o || typeof o !== 'object') return; S = o; save(); }

  /* switch the active child by name — same model as Math-Champ */
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
    S = next;
    save(); writeProfiles(profiles);
    return true;
  }

  /* boot: make the child named on this device active */
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
    var y2 = new Date(Date.now() - 172800000), y2s = y2.getFullYear() + '-' + String(y2.getMonth() + 1).padStart(2, '0') + '-' + String(y2.getDate()).padStart(2, '0');
    var mk = t.slice(0, 7);
    if (S.streak.last === ys) {
      S.streak.count = (S.streak.count || 0) + 1;
    } else if (S.streak.last === y2s && S.streak.freezeMonth !== mk) {
      /* streak insurance: ONE missed day is forgiven, once a calendar month */
      S.streak.freezeMonth = mk;
      S.streak.frozen = (S.streak.frozen || 0) + 1;
      S.streak.count = (S.streak.count || 0) + 1;
    } else {
      S.streak.count = 1;
    }
    S.streak.last = t;
  }

  function levelById(id) { for (var i = 0; i < MC_LEVELS.length; i++) if (MC_LEVELS[i].id === id) return MC_LEVELS[i]; return null; }
  function caseState(id) { return (S.cases[id] = S.cases[id] || { done: false, stars: 0, used: [], journal: [] }); }
  function levelUnlocked(i) { return i === 0 || !!(S.cases[MC_LEVELS[i - 1].id] && S.cases[MC_LEVELS[i - 1].id].done); }

  /* ---------- view ---------- */

  var view = { page: 'home' };
  var P = null;   /* live puzzle session */

  function $ (id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>'); }

  function render() {
    if (window.MindNav && MindNav.auto) { try { MindNav.auto(); } catch (e) {} }
    var app = $('app'); if (!app) return;
    app.innerHTML = view.page === 'home' ? homeHTML() : caseHTML();
    window.scrollTo(0, 0);
  }

  function headerHTML() {
    var L = levelOf(S.xp);
    return '<div class="top"><div class="row"><div class="lvlbadge">Lv ' + (L.i + 1) + ' · ' + L.level.name + '</div>' +
      '<div class="xpbar"><div class="xpfill" style="width:' + L.pct + '%"></div></div></div>' +
      '<div class="row2"><button class="mini" onclick="goHome()">🧠 ' + esc((S.name || 'Detective')) + '</button>' +
      '<span class="stat">⭐ ' + S.xp + ' XP</span><span class="stat">🔥 ' + (S.streak.count || 0) + '-day streak</span>' +
      '<button class="mini" onclick="syncNow(this)" title="Sync now">☁️</button>' +
      '<button class="mini" onclick="location.href=\'../index.html\'">🏠 Gurukool</button></div>' +
      (L.next ? '<div class="stat">' + (L.next.min - S.xp) + ' XP to reach ' + L.next.name + ' →</div>' : '') + '</div>';
  }

  function techChip(t, on) {
    return '<div class="tech' + (on ? '' : ' off') + '"><span class="ticon">' + t.icon + '</span><div><b>' + t.name + '</b><span>' + (on ? esc(t.desc) : 'crack the quest to unlock this technique') + '</span></div></div>';
  }

  function homeHTML() {
    var L = levelOf(S.xp);
    var cards = MC_LEVELS.map(function (Q, i) {
      var st = S.cases[Q.id] || { done: false, stars: 0, used: [] };
      var unlocked = levelUnlocked(i);
      var stars = st.used.length ? '⭐ ' + st.used.length + '/5 solved' : (st.done ? '✅ case closed' : '');
      var divider = (i === 5) ? '<div style="flex-basis:100%;margin:26px 0 6px;padding-top:18px;border-top:3px dashed #cbd5e1"><h3 style="margin:0 0 4px">🕵️ The Detective Files</h3><p style="margin:0;color:#64748b;font-weight:600">Read between the lines: five more cases where the clue is in the small words, the times and the silences.</p></div>' : '';
      return divider + '<div class="qcard' + (unlocked ? '' : ' locked') + (st.done ? ' done' : '') + '" onclick="' + (unlocked ? "openCase('" + Q.id + "')" : 'lockedMsg()') + '">' +
        '<div class="qicon">' + (unlocked ? Q.icon : '🔒') + '</div>' +
        '<div class="qbody"><b>Quest ' + (i + 1) + ': ' + Q.name + '</b>' +
        '<span class="qtech">' + Q.tech.icon + ' technique: ' + Q.tech.name + '</span>' +
        '<span class="qst">' + (st.done ? '🏆 Case closed!' : stars) + '</span></div>' +
        '<div class="qgo">' + (st.done ? '🏅' : (unlocked ? '▶' : '')) + '</div></div>';
    }).join('');
    var techs = MC_TECHS.map(function (t) { return techChip(t, S.techniques.indexOf(t.id) >= 0); }).join('');
    return headerHTML() +
      '<h1>🧠 Mind-Champ</h1>' +
      '<p class="sub">Real cases. Real thinking. Every quest makes you <b>think, draw, discuss, analyse</b> — and hands you a technique detectives use for life. No lesson, no test — just cases that crack open your brain (in a good way).</p>' +
      '<div class="questgrid">' + cards + '</div>' +
      '<p class="section-label">🧰 My technique toolkit</p>' +
      '<div class="techgrid">' + techs + '</div>' +
      '<p class="muted" style="text-align:center">Progress saves on this device and syncs to the family cloud locker every 3 minutes. Made with ❤️ for a future detective.</p>';
  }

  function caseHTML() {
    var Q = levelById(view.lid); if (!Q) return homeHTML();
    var st = caseState(Q.id);
    if (view.phase === 'intro')
      return headerHTML() + '<div class="case card">' +
        '<div class="qicon big">' + Q.icon + '</div><h2>' + Q.name + '</h2>' +
        '<p class="story">' + Q.story + '</p>' +
        '<p class="muted">You\'ll solve ' + Q.puzzles.length + ' challenges. Expect hints, not answers. ' + (Q.tech.icon + ' technique to unlock: ' + Q.tech.name) + '</p>' +
        '<button class="btn" onclick="startCase()">Start the quest! ▶</button></div>';
    if (view.phase === 'done')
      return headerHTML() + '<div class="case card won">' +
        '<div class="qicon big">🏆</div><h2>Case closed!</h2>' +
        '<p class="story">You cracked <b>' + Q.name + '</b>. A new technique joins your toolkit:</p>' +
        '<div class="techcard">' + Q.tech.icon + ' <b>' + Q.tech.name + '</b><br><span>' + Q.tech.desc + '</span></div>' +
        '<p class="muted">Talk to your guru about this one: <b>how did you crack this case?</b> Write your one-line detective note:</p>' +
        '<textarea id="guru-note" rows="2" placeholder="I cracked it by…"></textarea>' +
        '<button class="btn sec" onclick="saveNote()">Save my note</button> <span id="note-ok" class="muted"></span>' +
        '<div style="margin-top:16px"><button class="btn" onclick="goHome()">Back to the quest map 🗺️</button></div></div>';
    /* puzzle */
    var pz = Q.puzzles[view.pi];
    var dots = Q.puzzles.map(function (p, i) {
      var done = st.used.indexOf(p.id) >= 0;
      return '<span class="dot' + (done ? ' done' : '') + (i === view.pi ? ' cur' : '') + '">' + (done ? '✓' : (p.boss ? '★' : i + 1)) + '</span>';
    }).join('');
    return headerHTML() + '<div class="case">' +
      '<div class="casedotrow">' + dots + '<span class="casename">' + Q.icon + ' ' + Q.name + '</span></div>' +
      '<h2>' + (pz.boss ? '⭐ ' : '') + pz.title + '</h2>' +
      (pz.story ? '<p class="story">' + pz.story + '</p>' : '') +
      '<div class="art">' + (pz.art ? pz.art() : '') + '</div>' +
      '<p class="pq">' + pz.q + '</p>' +
      '<div id="pz-area"></div>' +
      '<div id="pz-fb"></div>' +
      '<div id="pz-hints"></div>' +
      '<div class="pz-actions"><button class="btn" onclick="checkPz()">✓ Check</button>' +
      '<button class="btn sec" onclick="askHint()">💡 Hint</button></div>' +
      '<div class="pz-actions"><button class="btn tiny sec" onclick="showSolution()">Show me how a champion thinks</button></div>' +
      '</div>';
  }

  /* ---------- puzzle sessions ---------- */

  function startPuzzle(pi) {
    var Q = levelById(view.lid);
    view.phase = 'pz'; view.pi = pi;
    P = { wrong: 0, hints: 0, sol: false, seq: [], cells: {}, scaleL: null, scaleR: null, scaleWeighs: 0, scaleMsg: '', answerVal: -1, cluePick: -1, bonus: 0 };
    render();
    drawPzArea();
  }

  function drawPzArea() {
    var area = $('pz-area'); if (!area) return;
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi];
    var h = '';
    if (pz.type === 'num' || pz.type === 'word') {
      h = '<div class="ansrow"><input id="pz-in" class="bigin" type="' + (pz.type === 'num' ? 'number' : 'text') + '" autocomplete="off" placeholder="' + (pz.type === 'num' ? 'type the number…' : 'type the word…') + '">' +
          '<button class="btn" onclick="checkPz()">✓</button></div>';
      if (pz.type === 'word') h += '<p class="muted small">Letters only — the answer is one Minecraft word.</p>';
    } else if (pz.type === 'mcq') {
      h = '<div class="opts">' + pz.options.map(function (o, i) { return '<button class="opt' + (P.answerVal === i ? ' sel' : '') + '" onclick="pickOpt(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else if (pz.type === 'clue') {
      if (pz.options) h = '<div class="opts">' + pz.options.map(function (o, i) { return '<button class="opt' + (P.answerVal === i ? ' sel' : '') + '" onclick="pickOpt(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>';
      else h = '<div class="ansrow"><input id="pz-in" class="bigin" type="' + (typeof pz.answer === 'number' ? 'number' : 'text') + '" autocomplete="off" placeholder="type your answer…"></div>';
      h += '<p class="clueq">Now tap the clue that PROVES it:</p><div class="opts">' +
        pz.clues.map(function (c, i) { return '<button class="opt clue' + (P.cluePick === i ? ' sel' : '') + '" onclick="pickClue(' + i + ')">' + esc(c) + '</button>'; }).join('') + '</div>';
    } else if (pz.type === 'order') {
      h = '<p class="muted small">Tap the cards in order — tap the wrong card twice? Use ⌫.</p>' +
        '<div id="seq-slots" class="seqslots">' + pz.answer.map(function (id, i) {
          var it = itemById(pz, P.seq[i]);
          return '<div class="slot' + (it ? ' full' : '') + '">' + (it ? it.t : i + 1) + '</div>';
        }).join('') + '</div>' +
        '<div class="opts">' + pz.items.map(function (it) {
          var used = P.seq.indexOf(it.id) >= 0;
          return '<button class="opt' + (used ? ' used' : '') + '" onclick="tapItem(\'' + it.id + '\')">' + it.t + '</button>';
        }).join('') + '</div>' +
        '<div class="pz-actions"><button class="btn tiny sec" onclick="undoItem()">⌫ undo</button></div>';
    } else if (pz.type === 'grid') {
      h = '<table class="lgrid"><tr><th></th>' + pz.colHeads.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>' +
        pz.rowHeads.map(function (r) {
          return '<tr><th>' + esc(r) + '</th>' + pz.colHeads.map(function (c) {
            var k = r + '|' + c, m = P.cells[k] || '';
            return '<td class="cell' + (m === '✓' ? ' yes' : m === '✗' ? 'no' : '') + '" onclick="tapCell(\'' + k.replace(/'/g, "\\'") + '\')">' + m + '</td>';
          }).join('') + '</tr>';
        }).join('') + '</table><p class="muted small">Tap a box: empty → ✗ → ✓ → empty.</p>';
    } else if (pz.type === 'scale') {
      h = '<p class="muted small">Tap 2 blocks to place them on the scale (left pan, then right pan).</p>' +
        '<div class="opts">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) {
          return '<button class="opt' + (P.scaleL === n ? ' sel' : '') + (P.scaleR === n ? ' sel2' : '') + '" onclick="tapScale(' + n + ')">' + n + '</button>';
        }).join('') + '</div>' +
        '<div class="pz-actions"><button class="btn tiny" onclick="weigh()">⚖️ Weigh them</button> <span id="scale-msg" class="stat">' + esc(P.scaleMsg) + '</span></div>' +
        '<div class="ansrow" style="margin-top:10px"><input id="pz-in" class="bigin" type="number" placeholder="the fake block\'s number…"></div>';
    } else if (pz.type === 'draw') {
      h = '<div class="padwrap"><canvas id="pad" class="pad" width="420" height="240"></canvas>' +
        '<button class="btn tiny sec" onclick="clearPad()">🧽 Clear</button></div>' +
        (pz.drawPrompt ? '<p class="muted small">' + pz.drawPrompt + '</p>' : '') +
        '<div class="ansrow"><input id="pz-in" class="bigin" type="number" placeholder="type your answer…"></div>';
    }
    area.innerHTML = h;
    if (pz.type === 'draw') initPad();
    var inp = $('pz-in'); if (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') checkPz(); }); inp.focus(); }
  }

  function itemById(pz, id) { for (var i = 0; i < pz.items.length; i++) if (pz.items[i].id === id) return pz.items[i]; return null; }

  window.pickOpt = function (i) { P.answerVal = i; drawPzArea(); };
  window.pickClue = function (i) { P.cluePick = i; drawPzArea(); };
  window.tapItem = function (id) { if (P.seq.indexOf(id) < 0 && P.seq.length < levelById(view.lid).puzzles[view.pi].answer.length) { P.seq.push(id); drawPzArea(); } };
  window.undoItem = function () { P.seq.pop(); drawPzArea(); };
  window.tapCell = function (k) {
    P.cells[k] = P.cells[k] === '✓' ? '' : (P.cells[k] === '✗' ? '✓' : '✗');
    drawPzArea();
  };
  window.tapScale = function (n) {
    if (P.scaleL === n) P.scaleL = null;
    else if (P.scaleR === n) P.scaleR = null;
    else if (P.scaleL === null) P.scaleL = n;
    else if (P.scaleR === null) P.scaleR = n;
    drawPzArea();
  };
  window.weigh = function () {
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi];
    if (P.scaleL === null || P.scaleR === null) { P.scaleMsg = 'Place 2 blocks first!'; drawPzArea(); return; }
    P.scaleWeighs++;
    var fake = pz.answer;
    var l = (P.scaleL === fake), r = (P.scaleR === fake);
    P.scaleMsg = l ? '⬅️ the left side RISES — block ' + P.scaleL + ' is lighter!' :
                 r ? 'the right side RISES ➡️ — block ' + P.scaleR + ' is lighter!' :
                 '⚖️ perfectly balanced — both are real gold.';
    drawPzArea();
  };

  /* sketch pad */
  window.clearPad = function () { var c = $('pad'); if (c) { var x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); } };
  function initPad() {
    var c = $('pad'); if (!c) return;
    var x = c.getContext('2d'), draw = false;
    function pos(e) {
      var r = c.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : e;
      return [(t.clientX - r.left) * (c.width / r.width), (t.clientY - r.top) * (c.height / r.height)];
    }
    function start(e) { draw = true; x.beginPath(); var p = pos(e); x.moveTo(p[0], p[1]); e.preventDefault(); }
    function move(e) { if (!draw) return; var p = pos(e); x.lineTo(p[0], p[1]); x.strokeStyle = '#c2410c'; x.lineWidth = 3.5; x.lineCap = 'round'; x.stroke(); e.preventDefault(); }
    function end() { draw = false; }
    c.addEventListener('mousedown', start); c.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    c.addEventListener('touchstart', start, { passive: false }); c.addEventListener('touchmove', move, { passive: false }); c.addEventListener('touchend', end);
  }

  /* ---------- checking ---------- */

  function collectAnswer(pz) {
    /* mcq + clue-with-options: the answer is the chosen INDEX
       (pz.answer is the index of the right option) */
    if (pz.type === 'mcq') return { main: (P.answerVal >= 0) ? P.answerVal : null };
    if (pz.type === 'order') return { main: P.seq.length ? P.seq : null };
    if (pz.type === 'grid') {
      var any = false;
      for (var c in P.cells) if (P.cells[c]) any = true;
      return { main: any ? 'grid' : null };
    }
    if (pz.type === 'clue') {
      var main = null;
      if (pz.options) { if (P.answerVal >= 0) main = P.answerVal; }
      else { var inp = $('pz-in'); if (inp) main = inp.value; }
      return { main: main, clue: P.cluePick };
    }
    var i2 = $('pz-in');
    return { main: i2 ? i2.value : '' };
  }

  function mainOk(pz, main) {
    if (main === null || main === undefined || String(main).trim() === '') return false;
    if (pz.type === 'order') return main.join('|') === pz.answer.join('|');
    if (pz.type === 'grid') {
      var keys = Object.keys(pz.answer);
      for (var i = 0; i < keys.length; i++) {
        var want = pz.answer[keys[i]] ? '\u2713' : '\u2717';
        if ((P.cells[keys[i]] || '') !== want) return false;
      }
      return true;
    }
    if (typeof pz.answer === 'number') return parseFloat(main) === pz.answer;
    return String(main).trim().toLowerCase() === String(pz.answer).trim().toLowerCase();
  }

  window.checkPz = function () {
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi], st = caseState(Q.id);
    if (st.used.indexOf(pz.id) >= 0) return nextPz();
    var a = collectAnswer(pz);

    /* nothing selected? */
    if (a.main === null || String(a.main).trim() === '') { fb('Pick an answer first! 🙂'); return; }
    if (pz.type === 'clue' && (a.clue === -1 || a.clue === null)) { fb('Two parts! Choose your answer AND tap the clue that proves it.'); return; }

    var good = mainOk(pz, a.main);
    if (pz.type === 'clue' && good) good = (a.clue === pz.clueAnswer);
    if (window.Rhythm) window.Rhythm.note(good);

    if (!good) {
      P.wrong++;
      if (pz.type === 'clue' && mainOk(pz, a.main) && a.clue !== pz.clueAnswer)
        fb('Right answer… but your EVIDENCE doesn\'t prove it! Which clue really settles it?', true);
      else fb('Not yet — every wrong try makes you sharper. Here\'s a hint 👇', true);
      revealHint();
      return;
    }
    /* solved! */
    var xp = pz.xp + (P.wrong === 0 ? 5 : P.wrong <= 2 ? 2 : 0);
    if (pz.type === 'scale' && P.scaleWeighs > 0 && P.scaleWeighs <= 2) { xp += 5; P.bonus = 5; }
    var stars = P.sol ? 1 : (P.wrong === 0 ? 3 : P.wrong <= 2 ? 2 : 1);
    st.used.push(pz.id);
    st.stars += stars;
    S.xp += xp;
    touchStreak();
    save();
    fb('✅ Case-solved! +' + xp + ' XP' + (P.bonus ? ' (includes +5 scale detective bonus!)' : '') + ' · ' + stars + '⭐' + (P.wrong === 0 ? ' — flawless!' : ''), false, true);
    $('pz-area').innerHTML = '<div class="wonbox"><p>' + pz.sol + '</p>' +
      (view.pi + 1 < Q.puzzles.length
        ? '<button class="btn" onclick="nextPz()">Next challenge →</button>'
        : '<button class="btn" onclick="finishCase()">Close the case! 🏆</button>') + '</div>';
    var hintsEl = $('pz-hints'); if (hintsEl) hintsEl.innerHTML = '';
  };

  window.nextPz = function () {
    var Q = levelById(view.lid), st = caseState(Q.id);
    for (var i = 0; i < Q.puzzles.length; i++)
      if (st.used.indexOf(Q.puzzles[i].id) < 0) { startPuzzle(i); return; }
    finishCase();
  };

  window.finishCase = function () {
    var Q = levelById(view.lid), st = caseState(Q.id);
    if (!st.done) {
      st.done = true;
      if (S.techniques.indexOf(Q.tech.id) < 0) S.techniques.push(Q.tech.id);
      S.xp += Q.xpBonus;
      touchStreak();
      save();
    }
    view.phase = 'done';
    render();
  };

  window.saveNote = function () {
    var Q = levelById(view.lid), st = caseState(Q.id);
    var t = $('guru-note');
    if (t && t.value.trim()) { st.journal.push({ ts: Date.now(), text: t.value.trim().slice(0, 200) }); if (st.journal.length > 40) st.journal = st.journal.slice(-40); save(); }
    var ok = $('note-ok'); if (ok) ok.textContent = 'Saved to the case file 📁';
  };

  /* ---------- hints & feedback ---------- */

  function fb(msg, wrong, win) {
    var el = $('pz-fb'); if (!el) return;
    el.innerHTML = '<div class="fb ' + (win ? 'win' : wrong ? 'bad' : 'info') + '">' + msg + '</div>';
  }
  function revealHint() {
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi];
    var el = $('pz-hints'); if (!el) return;
    if (P.hints < pz.hints.length) {
      el.innerHTML += '<div class="hint">💡 ' + pz.hints[P.hints] + '</div>';
      P.hints++;
    } else {
      el.innerHTML += '<div class="hint">💡 Stuck? Champions ask for the worked solution below — reading one teaches the technique!</div>';
    }
  }
  window.askHint = function () {
    revealHint();
    if (P.hints >= 3 && !P.sol) fb('Hints are used up — try your answer, or peek at how a champion thinks (it still counts!).');
  };
  window.showSolution = function () {
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi];
    P.sol = true;
    modal('<h3>🧠 How a champion thinks</h3><p>' + pz.sol + '</p>' +
      '<p class="muted">Now type/check the answer yourself — using a worked example is how technique is built!</p>' +
      '<div class="starrow"><button class="btn" onclick="closeModal()">Got it!</button></div>');
  };

  function modal(html) {
    var m = $('modal'); if (!m) return;
    $('modal-body').innerHTML = html;
    m.style.display = 'flex';
  }
  window.closeModal = function () { var m = $('modal'); if (m) m.style.display = 'none'; };

  /* ---------- navigation ---------- */

  window.goHome = function () { view = { page: 'home' }; render(); };
  window.openCase = function (id) {
    view = { page: 'case', lid: id, phase: 'intro', pi: 0 };
    var st = caseState(id);
    if (st.used.length && !st.done) { view.phase = 'pz'; render(); nextPz(); return; }
    if (st.done) { view.phase = 'done'; render(); return; }
    render();
  };
  window.startCase = function () { startPuzzle(0); };
  window.lockedMsg = function () { modal('<h3>🔒 Locked quest</h3><p>Close the quest before it to unlock this one — one case at a time, detective!</p><div class="starrow"><button class="btn" onclick="closeModal()">OK</button></div>'); };

  /* ============================================================
     ChampSync — shared engine, locker format champSync:4
     (mc = Mind-Champ state of the active child, mcs = per-child)
     IDENTICAL COPY embedded in Math-Champ, ScienceQuest and admin.html.
     ============================================================ */

  var CFG_KEY = 'sq_gh';
  var SQ_KEY = 'sq_v3', OC_KEY = 'oc_state', PROFILES_KEY = 'oc_profiles', MC_KEY = 'mc_state', MPROFILES_KEY = 'mc_profiles';

  function ghCfg() {
    try { var c = JSON.parse(localStorage.getItem(CFG_KEY)); if (c && c.owner && c.repo && c.token) return c; } catch (e) {}
    return null;
  }
  function saveGhCfg(c) { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function ghUrl(c) { return 'https://api.github.com/repos/' + c.owner + '/' + c.repo + '/contents/' + encodeURIComponent(c.path && c.path.length ? c.path : 'progress.json'); }
  function readLS(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function writeLS(k, v) { if (v == null) return; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function readProfilesLS() { try { var p = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeProfilesLS(p) { try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  function readMCProfiles() { try { var p = JSON.parse(localStorage.getItem(MPROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeMCProfiles(p) { try { localStorage.setItem(MPROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  var SK_KEY = 'sk_state', SKPROFILES_KEY = 'sk_profiles';
  function readSKProfiles() { try { var p = JSON.parse(localStorage.getItem(SKPROFILES_KEY) || '{}'); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {}; } catch (e) { return {}; } }
  function writeSKProfiles(p) { try { localStorage.setItem(SKPROFILES_KEY, JSON.stringify(p || {})); } catch (e) {} }
  var DEL_KEY = 'gk_deleted';
  function readDeleted() { try { var o = JSON.parse(localStorage.getItem(DEL_KEY) || '{}'); return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {}; } catch (e) { return {}; } }
  function writeDeleted(o) { try { localStorage.setItem(DEL_KEY, JSON.stringify(o || {})); } catch (e) {} }
  function markDeleted(name) {
    var n = String(name || '').trim().toLowerCase();
    if (!n) return false;
    var d = readDeleted(); d[n] = Date.now(); writeDeleted(d);
    return true;
  }
  function isDeleted(name) { var n = String(name || '').trim().toLowerCase(); return !!(n && readDeleted()[n]); }
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

  function uniq(arr) { var o = {}, out = []; (arr || []).forEach(function (x) { if (!o[x]) { o[x] = 1; out.push(x); } }); return out; }

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
    for (var k in b.profiles) {
      if (!a.profiles[k]) a.profiles[k] = b.profiles[k];
      else mergeProfile(a.profiles[k], b.profiles[k]);
    }
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
    return out;
  }
  function mergeMC(a, b) {
    if (!b || typeof b !== 'object' || !b.cases) return a;
    if (!a || !a.cases) return b;
    var out = JSON.parse(JSON.stringify(b));
    out.xp = Math.max(a.xp || 0, b.xp || 0);
    out.name = ((b.xp || 0) > (a.xp || 0)) ? (b.name || a.name || '') : (a.name || b.name || '');
    out.techniques = uniq((a.techniques || []).concat(b.techniques || []));
    out.journal = uniq((a.journal || []).concat(b.journal || []));
    for (var k in a.cases) {
      var ac = a.cases[k], bc = out.cases[k] = out.cases[k] || { done: false, stars: 0, used: [], journal: [] };
      bc.done = bc.done || !!ac.done;
      bc.stars = Math.max(bc.stars || 0, ac.stars || 0);
      bc.used = uniq((bc.used || []).concat(ac.used || []));
      bc.journal = uniq((bc.journal || []).concat(ac.journal || []));
    }
    if ((a.streak && a.streak.count || 0) > (out.streak && out.streak.count || 0)) out.streak = a.streak;
    out.pin = out.pin || a.pin || '';
    return out;
  }

  /* cloud file carries every champ + every learner:
     { champSync: 5, sq, oc, ocs, mc, mcs, sk, sks } */
  function payload(sq, oc, mc, sk) {
    var del = readDeleted();
    var ocs = readProfilesLS();
    var n = (oc && oc.name ? oc.name : '').trim().toLowerCase();
    if (n && !del[n]) ocs[n] = oc;
    var mcs = readMCProfiles();
    var mn = (mc && mc.name ? mc.name : '').trim().toLowerCase();
    if (mn && !del[mn]) mcs[mn] = mc;
    var sks = readSKProfiles();
    var sn = (sk && sk.name ? sk.name : '').trim().toLowerCase();
    if (sn && !del[sn]) sks[sn] = sk;
    for (var dk in del) { delete ocs[dk]; delete mcs[dk]; delete sks[dk]; }
    return { champSync: 5, sq: sq || null, oc: oc || null, ocs: ocs, mc: mc || null, mcs: mcs, sk: sk || null, sks: sks, del: del };
  }

  /* understands the current format plus every older one */
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
      var del = {};
      if (o.del && typeof o.del === 'object' && !Array.isArray(o.del)) for (k in o.del) del[String(k).toLowerCase()] = o.del[k];
      return { sq: (o.sq && o.sq.profiles) ? o.sq : null, ocs: ocs, oc: (o.oc && o.oc.attempts) ? o.oc : null, mcs: mcs, mc: (o.mc && o.mc.cases) ? o.mc : null, sks: sks, sk: (o.sk && o.sk.scenes) ? o.sk : null, del: del };
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
      /* maths: merge EVERY child's profile by name */
      var curName = (oc && oc.name ? oc.name : '').trim().toLowerCase();
      var local = readProfilesLS();
      if (curName) local[curName] = oc;
      var remote = pr.ocs || {};
      var merged = {}, k;
      for (k in local) merged[k] = remote[k] ? mergeOC(local[k], remote[k]) : local[k];
      for (k in remote) if (!merged[k]) merged[k] = remote[k];
      if (Object.keys(merged).length) {
        var active = (ccName && merged[ccName]) ? ccName : (curName && merged[curName] ? curName : Object.keys(merged)[0]);
        oc = merged[active];
        writeLS(PROFILES_KEY, merged);
      } else if (pr.oc && oc && oc.attempts) { oc = mergeOC(oc, pr.oc); }
      else if (pr.oc && !oc) { oc = pr.oc; }
      /* mind-champ: same per-child merge */
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
        writeLS(MPROFILES_KEY, mmerged);
      }
      /* samskritam: the same per-learner merge */
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
        sk = smerged[sactive];
        writeLS(SKPROFILES_KEY, smerged);
      }
    }
    /* tombstones: a deleted learner must never come back through a merge.
       This runs AFTER the merge but BEFORE anything is persisted, and it also
       filters science profiles (keyed by id, matched by name). */
    var del = readDeleted();
    if (pr && pr.del) { for (var dk0 in pr.del) { if (!del[dk0] || pr.del[dk0] > del[dk0]) del[dk0] = pr.del[dk0]; } }
    writeDeleted(del);
    try {
      function gone(o) { return !!(o && o.name && del[String(o.name).trim().toLowerCase()]); }
      /* maths */
      if (typeof merged !== 'undefined' && merged) {
        for (var d1 in del) delete merged[d1];
        writeProfilesLS(merged);
        if (gone(oc)) { var mk = Object.keys(merged); oc = mk.length ? merged[mk[0]] : null; }
      }
      /* mind */
      if (typeof mmerged !== 'undefined' && mmerged) {
        for (var d2 in del) delete mmerged[d2];
        writeMCProfiles(mmerged);
        if (gone(mc)) { var mk2 = Object.keys(mmerged); mc = mk2.length ? mmerged[mk2[0]] : null; }
      }
      /* samskritam */
      if (typeof smerged !== 'undefined' && smerged) {
        for (var d3 in del) delete smerged[d3];
        writeSKProfiles(smerged);
        if (gone(sk)) { var mk3 = Object.keys(smerged); sk = mk3.length ? smerged[mk3[0]] : null; }
      }
      /* science: profiles are keyed p1/p2, so match on the stored name */
      if (sq && sq.profiles) {
        for (var pid in sq.profiles) {
          var pnm = String((sq.profiles[pid] || {}).name || '').trim().toLowerCase();
          if (pnm && del[pnm]) { delete sq.profiles[pid]; if (sq.current === pid) sq.current = null; }
        }
        var sids = Object.keys(sq.profiles);
        if (!sq.current || !sq.profiles[sq.current]) sq.current = sids.length ? sids[0] : sq.current;
        writeLS(SQ_KEY, sq);
      }
    } catch (e) {}
    return { sq: sq, oc: oc, mc: mc, sk: sk };
  }

  /* one tap: pull cloud -> merge -> push merged -> download local backup.
     opts: { silent, getSq, getOc, getMc, getSk, onMerged(sq,oc,mc,sk), toast(msg), onNeedSetup() }
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

  /* restore a local backup file's text (same merge rules, no cloud) */
  function applyBackupText(txt, opts) {
    opts = opts || {};
    var pr = null;
    try { pr = parseRemote(txt); } catch (e) { return false; }
    if (!pr) return false;
    var merged = mergeInto(pr, opts.getSq, opts.getOc, opts.getMc);
    writeLS(SQ_KEY, merged.sq); writeLS(OC_KEY, merged.oc); writeLS(MC_KEY, merged.mc);
    if (opts.onMerged) { try { opts.onMerged(merged.sq, merged.oc, merged.mc); } catch (e) {} }
    return true;
  }

  window.ChampSync = { ghCfg: ghCfg, saveGhCfg: saveGhCfg, mergeOC: mergeOC, mergeSQ: mergeSQ, mergeMC: mergeMC, mergeSK: mergeSK, markDeleted: markDeleted, isDeleted: isDeleted, deletedNames: function () { return Object.keys(readDeleted()); }, parseRemote: parseRemote, payload: payload, backupName: backupName, downloadBackup: downloadBackup, sync: sync, applyBackupText: applyBackupText };

  /* ---------- cloud sync for Mind-Champ ---------- */

  function cloudSync(silent) {
    return ChampSync.sync({
      silent: silent,
      getSq: null, getOc: null,
      getMc: function () { return S; },
      onMerged: function (sq, oc, mc) {
        try {
          if (P) return;   /* never disturb a live puzzle */
          if (mc && mc.cases && mc !== S) { setState(mc); render(); }
        } catch (e) {}
      },
      toast: function (m) { toast(m); },
      onNeedSetup: null
    });
  }

  function toast(msg) {
    var d = $('toasts'); if (!d) return;
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    d.appendChild(t);
    setTimeout(function () { t.remove(); }, 2900);
  }
  window.toast = toast;

  /* ☁️ force-sync — the cloud button in the top bar */
  window.syncNow = function (btn) {
    if (!ghCfg()) { toast('☁️ Cloud sync is not set up on this device yet — a parent can set it up in the Admin Console (Gurukool home page).'); if (btn) { btn.textContent = '⚠️'; setTimeout(function () { btn.textContent = '☁️'; }, 3000); } return; }
    if (btn) { btn.textContent = '⏳'; btn.title = 'Syncing…'; }
    cloudSync(true).then(function (r) {
      if (btn) { btn.textContent = (r === 'ok' ? '✅' : '❌'); btn.title = (r === 'ok' ? 'Synced — progress up to date!' : 'Sync problem — it will retry automatically'); setTimeout(function () { btn.textContent = '☁️'; }, 3000); }
      if (r === 'ok') toast('✅ Synced — progress up to date!');
      else if (r === 'error') toast('⚠️ Sync problem — it will retry automatically.');
    });
  };

  /* AUTO-SAVE — silent cloud sync every 3 minutes */
  setTimeout(function () { if (ghCfg()) cloudSync(true); }, 20000);
  setInterval(function () { if (ghCfg()) cloudSync(true); }, 180000);

  /* test hooks */
  window.MC = { S: function () { return S; }, switchChild: switchChild, view: function () { return view; }, check: checkPz, state: function () { return P; },
    startPuzzle: startPuzzle, openCase: openCase, nextPz: nextPz, finishCase: finishCase, levelUnlocked: levelUnlocked };

  render();
})();
