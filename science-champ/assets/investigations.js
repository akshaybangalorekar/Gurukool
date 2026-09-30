/* ============================================================
   SCIENCE-CHAMP · INVESTIGATIONS (Phase 4)
   Real mysteries → predictions → clues → a home experiment →
   drawing → an evidence check. Covers electricity/electrical
   basics, physics (energy) and programming basics.
   Progress is stored on the science profile (practice keys, which
   already sync) and XP goes to the science profile.
   ============================================================ */

var INV_LIST = [

{ id: 'inv1', icon: '🔌', title: 'Why does the charger get hot?', subject: 'Electricity & electrical basics',
  mystery: 'Your phone has been charging for an hour. You touch the cable and it is warm. Is your charger broken? Or is this normal?',
  steps: [
  { type: 'mcq', q: 'Before we test anything — what do you think makes the cable warm?',
    opts: ['Heat is normal: electricity loses a little energy as heat in the wire', 'The wire is melting inside', 'The phone sends heat back into the cable'], answer: 0,
    note: 'Good scientists predict first, then check. Hold that thought!' },
  { type: 'clue', q: 'Here is the key fact. Which sentence PROVES that some heat is expected?',
    opts: ['Copper lets electricity flow easily — but no wire is perfect', 'Phone batteries store energy', 'Chargers come in different sizes'],
    clues: ['No wire is perfect, so a little energy always turns into heat', 'Batteries store energy — they do not explain cable heat', 'Size does not tell us about heat'],
    answer: 0, clueAnswer: 0,
    note: 'Copper is chosen BECAUSE it lets current flow easily — a poor conductor would waste even more energy as heat.' },
  { type: 'order', q: 'Tap the journey of the electricity in the right order:',
    items: [{ t: '⚡ The wall socket', id: 'a' }, { t: '🔌 The charger\'s little transformer', id: 'b' }, { t: '🧵 The cable\'s copper wire', id: 'c' }, { t: '🔋 The phone battery', id: 'd' }],
    answer: ['a', 'b', 'c', 'd'],
    note: 'Every step of that journey loses a tiny bit of energy as heat — most of it in the transformer and the wire.' },
  { type: 'mcq', q: 'HOME EXPERIMENT: after 30 minutes of charging, feel the cable (never touch the metal pins, and never open a plug). Now compare it with a thin, cheap cable. Which feels warmer?',
    opts: ['The thin cable', 'The thick cable', 'Both exactly the same'], answer: 0,
    note: 'A thin wire squeezes the same current through less copper, so more energy turns into heat. Thicker wire = cooler.' },
  { type: 'draw', q: 'Draw the path the electricity takes from the wall to your phone — then answer the safety question below.',
    drawPrompt: 'Sketch the wall socket, the charger, the cable and the phone, and draw the path with arrows.',
    q2: 'A cable that gets VERY hot (too hot to hold) means…', opts: ['Stop using it and tell an adult — the wire is overloaded or damaged', 'It is charging extra fast', 'Nothing at all'], answer: 0,
    note: 'A little warmth = normal. Too hot to hold = a warning sign. Always tell an adult and stop using that cable.' }
  ] },

{ id: 'inv2', icon: '🏀', title: 'Why does the ball bounce lower each time?', subject: 'Physics — energy',
  mystery: 'You drop a ball. It bounces high, then lower, then lower, and finally rolls still. Nobody touched it. Where did the bouncing go?',
  steps: [
  { type: 'mcq', q: 'Predict first: why does each bounce get smaller?',
    opts: ['Energy is lost as heat and sound on every bounce', 'Gravity gets tired', 'The ball gets lighter'], answer: 0,
    note: 'Energy is never destroyed — it only changes form. Watch for where it goes.' },
  { type: 'clue', q: 'Which sentence PROVES the energy did not just vanish?',
    opts: ['The ball and the floor are slightly warmer after bouncing', 'The ball is red', 'The floor is made of tiles'],
    clues: ['Warmth is energy in a new form', 'Colour tells us nothing about energy', 'The floor material only changes how much is lost'],
    answer: 0, clueAnswer: 0,
    note: 'Squash the ball and it warms up — that is the lost bounce, hiding as heat!' },
  { type: 'mcq', q: 'HOME EXPERIMENT: drop a ball from shoulder height. Mark the first bounce height with a sticky note. Then drop it again from the SAME height. What do you see?',
    opts: ['Each bounce is lower than the one before', 'It bounces back to your hand every time', 'It bounces higher each time'], answer: 0,
    note: 'Try a ball on a soft carpet versus a hard floor — the carpet squashes more, so it steals even more energy.' },
  { type: 'num', q: 'Your ball first bounced to 60 cm. The next bounce reached 40 cm. How many cm of height did it lose?',
    answer: 20,
    note: 'That missing 20 cm became heat and sound — spread between the ball, the air and the floor.' },
  { type: 'draw', q: 'Draw the bouncing ball: one line for the drop and dots for each bounce, getting lower each time.',
    drawPrompt: 'Draw the bounce heights shrinking — that picture is the whole story of energy loss.',
    q2: 'A ball that bounced forever without stopping would be a "perpetual motion machine". Why is that impossible?',
    opts: ['Friction and air always leak a little energy as heat', 'Balls are too heavy', 'Gravity switches off'], answer: 0,
    note: 'Energy always leaks somewhere — that is why the bouncing stops. Machines that never stop do not exist.' }
  ] },

{ id: 'inv3', icon: '💻', title: 'How does a computer know what to do?', subject: 'Programming basics',
  mystery: 'You tap a game icon and the phone opens it. How did it know what you wanted — and in what order should it do things?',
  steps: [
  { type: 'mcq', q: 'Predict first: what is the phone really doing when you tap?',
    opts: ['Following a list of exact instructions, in order', 'Thinking like a human', 'Guessing what you want'], answer: 0,
    note: 'That list has a name — you will meet it in the last step.' },
  { type: 'clue', q: 'Which sentence PROVES the instructions must be exact AND in order?',
    opts: ['Swap two steps and you get a different result', 'Computers are fast', 'Phones have touchscreens'],
    clues: ['Order changes the outcome — that is what "in order" means', 'Speed does not make instructions exact', 'Touchscreens are just input'],
    answer: 0, clueAnswer: 0,
    note: 'This is why programmers hunt "bugs" — one wrong step ruins the whole recipe.' },
  { type: 'order', q: 'BUG HUNT: the steps for a jam sandwich are jumbled. Tap them in the right order.',
    items: [{ t: 'Take two slices of bread', id: 'a' }, { t: 'Pick up the knife', id: 'b' }, { t: 'Scoop jam on the knife', id: 'c' }, { t: 'Spread the jam on one slice', id: 'd' }, { t: 'Put the other slice on top', id: 'e' }],
    answer: ['a', 'b', 'c', 'd', 'e'],
    note: 'Notice: "scoop" must come BEFORE "spread". One step out of place and you have jam on the table.' },
  { type: 'mcq', q: 'HOME EXPERIMENT: write your own instructions for a parent to make a sandwich. They must follow them LITERALLY — no thinking, no guessing. What usually happens?',
    opts: ['They make a funny mistake because a step was missing or unclear', 'It works perfectly the first time', 'They refuse to do it'], answer: 0,
    note: 'That funny mistake is a real bug report! Every unclear step is one a computer would also get wrong.' },
  { type: 'draw', q: 'Draw your instruction list as boxes joined by arrows — like a treasure map for a computer.',
    drawPrompt: 'Each box is one step; the arrows show the order. That picture is a program.',
    q2: 'A list of exact, ordered instructions is called…',
    opts: ['An algorithm (or a program)', 'A guess', 'A battery'], answer: 0,
    note: 'You just wrote an algorithm — the same idea inside every game, app and robot.' }
  ] }
];

(function () {
  'use strict';
  var BS = String.fromCharCode(92);
  var view = { page: 'home', id: null, step: 0 }, P = null;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>'); }
  function read(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }

  /* ---------- the science profile we are writing to ---------- */
  function currentProfile() {
    var sq = read('sq_v3');
    if (!sq || !sq.profiles) return null;
    var name = '';
    try { name = (localStorage.getItem('cc_name') || '').trim().toLowerCase(); } catch (e) {}
    var pid = null;
    if (name) Object.keys(sq.profiles).forEach(function (k) { if ((sq.profiles[k].name || '').toLowerCase() === name) pid = k; });
    if (!pid) pid = sq.current || 'p1';
    return { sq: sq, pid: pid, prof: sq.profiles[pid] || null };
  }
  function saveProfile(ctx) {
    if (!ctx || !ctx.sq) return;
    try { localStorage.setItem('sq_v3', JSON.stringify(ctx.sq)); } catch (e) {}
  }
  function doneKey(id, i) { return 'inv:' + id + ':' + i; }
  function invDone(ctx, id) { return !!(ctx && ctx.prof && ctx.prof.practice && ctx.prof.practice['inv:' + id + ':done']); }
  function stepDone(ctx, id, i) { return !!(ctx && ctx.prof && ctx.prof.practice && ctx.prof.practice[doneKey(id, i)]); }

  function award(xp) {
    var ctx = currentProfile();
    if (!ctx || !ctx.prof) return;
    ctx.prof.xp = (ctx.prof.xp || 0) + xp;
    saveProfile(ctx);
  }
  function mark(id, i, done) {
    var ctx = currentProfile();
    if (!ctx || !ctx.prof) return;
    ctx.prof.practice = ctx.prof.practice || {};
    ctx.prof.practice[doneKey(id, i)] = 1;
    if (done) ctx.prof.practice['inv:' + id + ':done'] = 1;
    saveProfile(ctx);
  }

  /* ---------- header (same uniform bar as every champ) ---------- */
  function headerHTML() {
    var ctx = currentProfile();
    var xp = ctx && ctx.prof ? (ctx.prof.xp || 0) : 0;
    var nm = ctx && ctx.prof ? (ctx.prof.name || 'Scientist') : 'Scientist';
    var LEVELS = [{ n: 'Rookie', min: 0 }, { n: 'Explorer', min: 120 }, { n: 'Challenger', min: 300 }, { n: 'Bronze Olympian', min: 550 }, { n: 'Silver Olympian', min: 900 }, { n: 'Gold Olympian', min: 1350 }, { n: 'Gurukool Champion', min: 2000 }];
    var li = 0; LEVELS.forEach(function (l, i) { if (xp >= l.min) li = i; });
    var nx = LEVELS[li + 1] || null;
    var pct = nx ? Math.round(100 * (xp - LEVELS[li].min) / (nx.min - LEVELS[li].min)) : 100;
    return '<div class="gk-bar"><div class="gk-row1"><div class="gk-lvl">Lv ' + (li + 1) + ' · ' + LEVELS[li].n + '</div>' +
      '<div class="gk-xpbar"><div class="gk-xpfill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="gk-row2"><span class="gk-mini">🔬 ' + esc(nm) + '</span>' +
      '<span class="gk-stat">⭐ ' + xp + ' XP</span>' +
      '<a class="gk-mini" href="index.html">🔬 Science-Champ</a>' +
      '<a class="gk-mini" href="../index.html">🏠 Gurukool</a></div>' +
      (nx ? '<div class="gk-stat gk-next">' + (nx.min - xp) + ' XP to reach ' + nx.n + ' →</div>' : '') + '</div>';
  }

  function render() {
    var app = $('inv-app'); if (!app) return;
    app.innerHTML = headerHTML() + (view.page === 'home' ? homeHTML() : stepHTML());
    window.scrollTo(0, 0);
  }

  function homeHTML() {
    var ctx = currentProfile();
    var cards = INV_LIST.map(function (inv) {
      var done = invDone(ctx, inv.id);
      var started = 0;
      inv.steps.forEach(function (s, i) { if (stepDone(ctx, inv.id, i)) started++; });
      return '<div class="inv-card' + (done ? ' done' : '') + '" onclick="invOpen(\'' + inv.id + '\')">' +
        '<div class="inv-icon">' + inv.icon + '</div><div class="inv-body"><b>' + esc(inv.title) + '</b>' +
        '<span class="inv-subj">' + esc(inv.subject) + '</span>' +
        '<span class="inv-st">' + (done ? '🏆 investigated' : (started ? '▶ continue · ' + started + '/' + inv.steps.length + ' steps' : inv.steps.length + ' steps · start')) + '</span></div>' +
        '<div class="inv-go">' + (done ? '🏅' : '▶') + '</div></div>';
    }).join('');
    return '<h1 style="text-align:center">🔍 Investigations</h1>' +
      '<p class="inv-lead">Real mysteries you can test at home. <b>Predict → find the clue → try it yourself → draw it → prove it.</b> No lesson first: you investigate, then the science clicks.</p>' +
      '<div class="inv-grid">' + cards + '</div>' +
      '<p class="inv-note">🧑‍🔬 Safety first: never open a plug or a charger, never touch metal pins, and ask a parent before any experiment that needs heat or water.</p>';
  }

  function stepHTML() {
    var inv = invById(view.id); if (!inv) return homeHTML();
    var s = inv.steps[view.step];
    var dots = inv.steps.map(function (x, i) { return '<span class="inv-dot' + (i < view.step ? ' done' : '') + (i === view.step ? ' cur' : '') + '"></span>'; }).join('');
    var h = '<div class="inv-scene"><div class="inv-dotrow">' + dots + '<span class="inv-name">' + inv.icon + ' ' + esc(inv.title) + '</span></div>';
    if (view.step === 0) h += '<p class="inv-mystery"><b>The mystery:</b> ' + esc(inv.mystery) + '</p>';
    h += '<p class="inv-q">' + esc(s.q) + '</p>';
    if (s.type === 'order') {
      h += '<p class="inv-small">Tap the cards in order — tap ⌫ to undo.</p><div class="inv-slots">' + s.answer.map(function (id, i) {
        var it = itemById(s, P.seq[i]);
        return '<div class="inv-slot' + (it ? ' full' : '') + '">' + (it ? it.t : (i + 1)) + '</div>';
      }).join('') + '</div><div class="inv-opts">' + s.items.map(function (it) {
        var used = P.seq.indexOf(it.id) >= 0;
        return '<button class="inv-opt' + (used ? ' used' : '') + '" onclick="invTap(\'' + it.id + '\')">' + it.t + '</button>';
      }).join('') + '</div><div class="inv-actions"><button class="inv-btn tiny sec" onclick="invUndo()">⌫ undo</button></div>';
    } else if (s.type === 'draw') {
      h += '<div class="inv-padwrap"><canvas id="inv-pad" class="inv-pad" width="420" height="230"></canvas><br><button class="inv-btn tiny sec" onclick="invClearPad()">🧽 Clear</button></div>' +
        (s.drawPrompt ? '<p class="inv-small" style="text-align:center">' + esc(s.drawPrompt) + '</p>' : '') +
        '<p class="inv-q" style="margin-top:14px">' + esc(s.q2) + '</p>' +
        '<div class="inv-opts">' + s.opts.map(function (o, i) { return '<button class="inv-opt" onclick="invPick(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else if (s.type === 'num') {
      h += '<div class="inv-ansrow"><input id="inv-in" class="inv-in kidinput" inputmode="none" type="text" placeholder="type the number…"><button class="inv-btn" id="inv-go" onclick="invCheck()">✓ Check</button></div>';
    } else {
      h += '<div class="inv-opts">' + s.opts.map(function (o, i) { return '<button class="inv-opt" onclick="invPick(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>';
      if (s.type === 'clue') {
        h += '<p class="inv-clueq">Now tap the clue that PROVES it:</p><div class="inv-opts">' +
          s.clues.map(function (c, i) { return '<button class="inv-opt' + (P.cluePick === i ? ' sel' : '') + '" onclick="invPickClue(' + i + ')">' + esc(c) + '</button>'; }).join('') + '</div>';
      }
    }
    h += '<div id="inv-fb"></div><div id="inv-note"></div></div>';
    return h;
  }

  function invById(id) { for (var i = 0; i < INV_LIST.length; i++) if (INV_LIST[i].id === id) return INV_LIST[i]; return null; }
  function itemById(s, id) { for (var i = 0; i < s.items.length; i++) if (s.items[i].id === id) return s.items[i]; return null; }

  window.invOpen = function (id) {
    view = { page: 'step', id: id, step: 0 };
    var ctx = currentProfile();
    for (var i = 0; i < invById(id).steps.length; i++) if (!stepDone(ctx, id, i)) { view.step = i; break; }
    P = { wrong: 0, seq: [], cluePick: -1, picked: -1, drawn: false };
    render();
  };
  window.invHome = function () { view = { page: 'home' }; render(); };
  window.invTap = function (id) {
    var s = invById(view.id).steps[view.step];
    if (P.seq.indexOf(id) < 0 && P.seq.length < s.answer.length) { P.seq.push(id); render(); }
  };
  window.invUndo = function () { P.seq.pop(); render(); };
  window.invPickClue = function (i) { P.cluePick = i; render(); };
  window.invClearPad = function () { var c = $('inv-pad'); if (c) { var x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); } };
  function initPad() {
    var c = $('inv-pad'); if (!c) return;
    var x = c.getContext('2d'), d = false;
    function pos(e) { var r = c.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return [(t.clientX - r.left) * (c.width / r.width), (t.clientY - r.top) * (c.height / r.height)]; }
    function st(e) { d = true; x.beginPath(); var p = pos(e); x.moveTo(p[0], p[1]); e.preventDefault(); }
    function mv(e) { if (!d) return; var p = pos(e); x.lineTo(p[0], p[1]); x.strokeStyle = '#c2410c'; x.lineWidth = 3.5; x.lineCap = 'round'; x.stroke(); e.preventDefault(); }
    c.addEventListener('mousedown', st); c.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', function () { d = false; });
    c.addEventListener('touchstart', st, { passive: false }); c.addEventListener('touchmove', mv, { passive: false }); c.addEventListener('touchend', function () { d = false; });
  }

  function fb(msg, kind) { var el = $('inv-fb'); if (el) el.innerHTML = '<div class="inv-fb ' + (kind || 'info') + '">' + msg + '</div>'; }

  function solve(s) {
    var inv = invById(view.id);
    var last = (view.step === inv.steps.length - 1);
    mark(inv.id, view.step, last);
    award(10 + (last ? 10 : 0));
    var el = $('inv-note');
    if (el && s.note) el.innerHTML = '<div class="inv-note-inline">🔎 ' + esc(s.note) + '</div>';
    fb('✅ +' + (10 + (last ? 10 : 0)) + ' XP — real investigating!', 'win');
    setTimeout(function () {
      if (last) { view = { page: 'home' }; render(); }
      else { view.step++; P = { wrong: 0, seq: [], cluePick: -1, picked: -1, drawn: false }; render(); }
    }, 2600);
  }

  window.invPick = function (i) {
    var s = invById(view.id).steps[view.step];
    var want = (s.type === 'draw') ? s.answer : s.answer;
    if (i !== want) { P.wrong++; fb('Not quite — think about what you saw or read, then try again. 🤔', 'bad'); return; }
    if (s.type === 'clue') { P.picked = i; render(); return; }
    solve(s);
  };
  window.invCheck = function () {
    var s = invById(view.id).steps[view.step];
    var inp = $('inv-in');
    if (s.type === 'order') {
      if (!P.seq.length) { fb('Tap the cards in order first! 🙂'); return; }
      if (P.seq.join('|') !== s.answer.join('|')) { P.wrong++; fb('Hmm — one card is out of place. Which step must come first?', 'bad'); return; }
      solve(s); return;
    }
    if (!inp || !inp.value.trim()) { fb('Type your answer first! 🙂'); return; }
    if (parseFloat(inp.value) !== s.answer) { P.wrong++; fb('Close — count again carefully. 📏', 'bad'); return; }
    solve(s);
  };
  window.invClueCheck = function () {};

  /* clue steps need both parts */
  var _pick = window.invPick;
  window.invPick = function (i) {
    var s = invById(view.id).steps[view.step];
    if (s.type === 'clue') {
      if (i !== s.answer) { P.wrong++; fb('Check the first part again — and remember, the clue must PROVE it! 🤔', 'bad'); return; }
      P.picked = i; render();
      var el = $('inv-fb');
      if (el) el.innerHTML = '<div class="inv-fb info">Right answer! Now tap the clue that proves it 👇</div>';
      return;
    }
    _pick(i);
  };
  var _pickClue = window.invPickClue;
  window.invPickClue = function (i) {
    var s = invById(view.id).steps[view.step];
    _pickClue(i);
    if (i === s.clueAnswer && P.picked === s.answer) solve(s);
    else if (i === s.clueAnswer) { fb('That clue is right — but tap your answer first! 🙂', 'bad'); }
    else fb('That fact is true, but it does not PROVE the answer. Try another clue. 🔍', 'bad');
  };

  /* ---------- boot ---------- */
  var origRender = render;
  render = function () { origRender(); if (view.page === 'step' && invById(view.id) && invById(view.id).steps[view.step].type === 'draw') initPad(); };
  window.INV = { list: INV_LIST, open: window.invOpen, home: window.invHome, pick: window.invPick, pickClue: window.invPickClue,
    tap: window.invTap, check: window.invCheck, view: function () { return view; }, state: function () { return P; },
    profile: currentProfile, doneKey: doneKey };
  render();
})();
