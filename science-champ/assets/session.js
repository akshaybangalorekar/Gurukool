/* ============================================================
   SCIENCE-CHAMP - today's investigation, built exactly like maths.

   The child must never be sent to a picker in the middle of a session.
   Every part that asks questions asks them HERE, on this page, one at a
   time, with a hint if he wants one and the working if he misses twice.

   The plan always has the same shape as maths, so it feels familiar:
     1. Warm up        - five quick questions from across every world
     2. Learn          - the world that most needs it, read right here
     3. Practise       - fresh questions on that world
     4. Check yourself - a short mixed set
     5. One hard one   - a real Level 2 problem, only if he is brave

   Questions come from the champ's own bank (WORLDS, LV2, ICAS), so
   nothing is invented and nothing is repeated inside one session.
   ============================================================ */
(function () {
  var KEY = 'gk_session_sci';
  var SKEY = 'sq_v3';
  var MINUTES = 60;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function worlds() { try { return (typeof WORLDS !== 'undefined' && WORLDS) ? WORLDS : (window.WORLDS || []); } catch (e) { return window.WORLDS || []; } }
  function bank(name) { try { return (typeof window[name] !== 'undefined' && window[name]) ? window[name] : (eval(name) || {}); } catch (e) { return {}; } }
  function real(w) { return w && w.id !== 'trivia' && w.quiz && w.quiz.length; }

  /* ---------- a bridge to the champ's saved progress ---------- */
  function bridge() {
    try {
      var S = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (!S || !S.profiles) return null;
      var cc = (localStorage.getItem('cc_name') || '').trim();
      var pid = null;
      if (cc) pid = Object.keys(S.profiles).filter(function (id) { return (S.profiles[id].name || '').toLowerCase() === cc.toLowerCase(); })[0];
      pid = pid || S.current || 'p1';
      if (!S.profiles[pid]) return null;
      window.state = S.profiles[pid];
      return { S: S, pid: pid };
    } catch (e) { return null; }
  }
  function persist() {
    var b = bridge0;
    if (!b) return;
    b.S.profiles[b.pid] = window.state;
    try { localStorage.setItem(SKEY, JSON.stringify(b.S)); } catch (e) {}
  }
  var bridge0 = null;

  /* ---------- helpers ---------- */
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function lessonsDone(wid) {
    var l = (window.state && window.state.lessons || {})[wid];
    if (l == null) return 0;
    if (typeof l === 'number') return l;
    if (Array.isArray(l)) return l.length;
    if (typeof l === 'object') return Object.keys(l).length;
    return 0;
  }
  function quizScore(wid) {
    var q = (window.state && window.state.quiz || {})[wid];
    if (!q || !q.t) return null;
    return Math.round(100 * (q.s || 0) / q.t);
  }

  /* ---------- what does he actually need? ---------- */
  function diagnose() {
    var ws = worlds().filter(real);
    if (!ws.length) return { weak: null, fresh: null, reason: 'A good place to start.' };
    var scored = ws.map(function (w) {
      var done = lessonsDone(w.id), total = (w.lessons || []).length || 1;
      var pct = Math.round(100 * done / total);
      var acc = quizScore(w.id);
      var score = (acc === null) ? pct : Math.round((pct + acc) / 2);
      return { id: w.id, name: w.name, score: score, done: done, total: total };
    });
    scored.sort(function (x, y) { return x.score - y.score; });
    var weak = scored.filter(function (s) { return s.score < 100; });
    if (!weak.length) weak = scored.slice(0, 1);
    var weakId = weak[0].id;
    var fresh = scored.filter(function (s) { return s.done === 0 && s.id !== weakId; });
    var weakName = weak[0].name;
    var freshName = fresh.length ? fresh[0].name : null;
    var reason = 'Built around ' + weakName.toLowerCase() + ', the world that most needs you' + (freshName ? ', plus a first look at ' + freshName.toLowerCase() : '') + '.';
    return { weak: weakId, fresh: fresh.length ? fresh[0].id : null, reason: reason, scored: scored };
  }

  /* ---------- turn the bank into questions we can ask ---------- */
  function mcq(w, q, hard) {
    return {
      kind: 'mcq', wid: w.id, wname: w.name,
      q: q.q, o: (q.o || []).slice(), a: (typeof q.a === 'number' ? q.a : 0),
      scene: q.s || '', sol: q.w || '',
      hints: [q.s ? 'Read the situation again: ' + q.s : 'Read the question again slowly. Which world does it come from?']
    };
  }
  function num(w, q) {
    return {
      kind: 'num', wid: w.id, wname: w.name,
      q: q.q, ans: q.ans, alts: q.alts || [], steps: q.steps || [],
      sol: (q.steps || []).join(' -> '),
      hints: [(q.steps && q.steps[0]) ? ('Start with: ' + q.steps[0]) : 'Write down what you are told, then what you are asked for.']
    };
  }
  function bankFor(w, lv) {
    if (lv === 2) { var L = bank('LV2')[w.id]; if (L && L.length) return L; }
    if (lv === 3) { var I = bank('ICAS')[w.id]; if (I && I.length) return I; }
    return (w.quiz || []);
  }

  /* ---------- build the hour ---------- */
  function build() {
    var ws = worlds().filter(real);
    var d = diagnose();
    var stages = [];
    if (!ws.length) return { date: todayStr(), mins: MINUTES, reason: d.reason, stages: stages, at: Date.now() };

    var weakW = ws.filter(function (w) { return w.id === d.weak; })[0] || ws[0];
    var freshW = d.fresh ? ws.filter(function (w) { return w.id === d.fresh; })[0] : null;

    /* 1. warm up - five quick questions from five different worlds */
    var warm = shuffle(ws).slice(0, 5).map(function (w) {
      var qs = shuffle((w.quiz || []).filter(function (q) { return q.o && q.o.length; }));
      return qs.length ? mcq(w, qs[0]) : null;
    }).filter(Boolean);
    stages.push({ type: 'mcq', title: 'Warm up', mins: 5, blurb: 'Five quick ones from across every world, to wake the brain up.', qs: warm });

    /* 2. learn - the world that most needs it, read here, no picker */
    var lesson = null, li = 0;
    for (var i = 0; i < (weakW.lessons || []).length; i++) { if (!lessonsDone(weakW.id) || i >= lessonsDone(weakW.id)) { lesson = weakW.lessons[i]; li = i; break; } }
    if (!lesson && weakW.lessons && weakW.lessons.length) { lesson = weakW.lessons[0]; li = 0; }
    stages.push({ type: 'lesson', title: 'Learn: ' + weakW.name, mins: 15, world: weakW.id, worldName: weakW.name, lesson: lesson, lessonNo: li,
      blurb: 'One lesson, read right here, then you prove it.' });

    /* 3. practise - questions on that world, plus one worked one */
    var pw = shuffle((weakW.quiz || []).filter(function (q) { return q.o && q.o.length; })).slice(0, 5).map(function (q) { return mcq(weakW, q); });
    if (freshW) { var fq = shuffle((freshW.quiz || []).filter(function (q) { return q.o && q.o.length; }))[0]; if (fq) pw.push(mcq(freshW, fq)); }
    var prac = (weakW.practice || [])[0];
    if (prac) pw.push(num(weakW, prac));
    stages.push({ type: 'mcq', title: 'Practise', mins: 20,
      blurb: 'Fresh questions on ' + weakW.name.toLowerCase() + (freshW ? ' and a first look at ' + freshW.name.toLowerCase() : '') + '.',
      qs: pw });

    /* 4. check yourself - a short mixed set */
    var check = shuffle(ws).slice(0, 5).map(function (w) {
      var qs = shuffle((w.quiz || []).filter(function (q) { return q.o && q.o.length; }));
      return qs.length ? mcq(w, qs[0]) : null;
    }).filter(Boolean);
    stages.push({ type: 'mcq', title: 'Check yourself', mins: 10, blurb: 'Five mixed questions. No hints unless you want them.', qs: check });

    /* 5. one hard one - a real Level 2 problem, asked here */
    var hardBank = bankFor(weakW, 2);
    var hq = shuffle(hardBank.filter(function (q) { return q.o && q.o.length; }))[0];
    stages.push({ type: 'hard', title: 'One hard one', mins: 10, optional: true,
      blurb: 'A real Level 2 problem, only if you are feeling brave.',
      qs: hq ? [mcq(weakW, hq, true)] : [] });

    return { date: todayStr(), mins: MINUTES, reason: d.reason, weak: weakW.id, fresh: d.fresh, stages: stages, at: Date.now() };
  }

  /* ---------- record real progress so the champ sees it ---------- */
  function award(n) {
    if (!window.state) return;
    window.state.xp = (window.state.xp || 0) + n;
    persist();
    if (window.ScienceNav && window.ScienceNav.top) { try { window.ScienceNav.top(); } catch (e) {} }
  }
  function record(wid, right, total) {
    if (!window.state) return;
    window.state.quiz = window.state.quiz || {};
    var q = window.state.quiz[wid] || { s: 0, t: 0 };
    q.s = (q.s || 0) + right; q.t = (q.t || 0) + total;
    window.state.quiz[wid] = q;
    persist();
  }

  window.SciSession = {
    minutes: MINUTES,
    build: build,
    diagnose: diagnose,
    award: award,
    record: record,
    ready: function () { bridge0 = bridge(); return !!window.state; },
    today: function () {
      var all = load(), c = ((window.state && window.state.name) || 'champion').trim().toLowerCase();
      var rec = all[c];
      if (!rec || !rec.plan || rec.plan.date !== todayStr() || !(rec.plan.stages || []).length) {
        rec = { plan: build(), progress: 0, done: {} };
        all[c] = rec; save(all);
      }
      return rec;
    },
    progress: function (i) { var all = load(), c = ((window.state && window.state.name) || 'champion').trim().toLowerCase(); all[c] = all[c] || {}; all[c].progress = i; save(all); },
    markDone: function (i, right, total) {
      var all = load(), c = ((window.state && window.state.name) || 'champion').trim().toLowerCase();
      all[c] = all[c] || {}; all[c].done = all[c].done || {};
      all[c].done[i] = { right: right, total: total, at: Date.now() }; save(all);
    },
    finish: function () {
      var all = load(), c = ((window.state && window.state.name) || 'champion').trim().toLowerCase();
      all[c] = all[c] || {};
      var stats = { at: Date.now(), right: 0, total: 0, stages: 0 };
      for (var k in (all[c].done || {})) { stats.right += all[c].done[k].right || 0; stats.total += all[c].done[k].total || 0; stats.stages++; }
      all[c].last = stats; all[c].plan = build(); all[c].progress = 0; all[c].done = {};
      save(all);
      return stats;
    },
    lastResult: function () { var all = load(), c = ((window.state && window.state.name) || 'champion').trim().toLowerCase(); return (all[c] && all[c].last) || null; }
  };
})();
