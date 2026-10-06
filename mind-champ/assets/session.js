/* ============================================================
   MIND-CHAMP - today's match, built exactly like maths.

   The child must never be sent to a picker in the middle of a session.
   Every part that asks questions asks them HERE, one at a time, with a
   hint if he wants one and the working if he misses twice.

   Same five parts as maths and science, so it feels familiar:
     1. Warm up    - four easy ones to get the eye in
     2. Learn      - one technique shown as a worked example, right here
     3. Practise   - fresh questions on that technique
     4. Check      - a mixed set, no hints unless he wants them
     5. Match point- a hard one, only if the match is going well

   Questions come from the champ's own reasoning ladder (window.Reason),
   so nothing is invented and nothing repeats inside one session.
   ============================================================ */
(function () {
  var KEY = 'gk_session_mind';
  var SKEY = 'mc_state';
  var MINUTES = 60;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function R() { return window.Reason || null; }

  /* ---------- bridge to the champ's saved progress ---------- */
  function bridge() {
    try {
      var S = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (!S) return null;
      window.S = S;
      return S;
    } catch (e) { return null; }
  }
  var S0 = null;
  function persist() { if (!window.S) return; try { localStorage.setItem(SKEY, JSON.stringify(window.S)); } catch (e) {} }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- what does he need? ---------- */
  function diagnose() {
    var r = R();
    if (!r) return { weak: null, reason: 'A good place to start.' };
    var seen = (window.S && window.S.reason) || {};
    var scored = r.topics.map(function (t) {
      var rec = seen[t.key] || {};
      var done = rec.done || 0, right = rec.right || 0;
      var acc = done ? Math.round(100 * right / done) : null;
      return { key: t.key, name: t.name, score: (acc === null ? 40 : acc), done: done };
    });
    scored.sort(function (x, y) { return x.score - y.score; });
    var weak = scored[0];
    var fresh = scored.filter(function (s) { return s.done === 0 && s.key !== weak.key; });
    return {
      weak: weak.key, fresh: fresh.length ? fresh[0].key : null,
      reason: 'Built around ' + weak.name.toLowerCase() + ', the technique that most needs you' +
        (fresh.length ? ', plus a first look at ' + fresh[0].name.toLowerCase() : '') + '.'
    };
  }

  function q(key, tier) {
    var r = R();
    if (!r) return null;
    var out = r.make(key, tier);
    out.kind = 'typed';
    return out;
  }

  function build() {
    var r = R();
    var d = diagnose();
    var stages = [];
    if (!r) return { date: todayStr(), mins: MINUTES, reason: d.reason, stages: stages, at: Date.now() };
    var keys = r.topics.map(function (t) { return t.key; });
    var weak = d.weak || keys[0];
    var fresh = d.fresh;

    /* 1. warm up - four easy ones from four different techniques */
    var warm = shuffle(keys).slice(0, 4).map(function (k) { return q(k, 'easy'); }).filter(Boolean);
    stages.push({ type: 'q', title: 'Warm up', mins: 5, blurb: 'Four easy ones to get your eye in.', qs: warm });

    /* 2. learn - the technique that needs it, shown as a worked example HERE */
    stages.push({ type: 'learn', title: 'Learn: ' + ((r.byKey(weak) || {}).name || weak), mins: 15, topic: weak,
      demo: q(weak, 'easy'), blurb: 'One technique, shown to you first. Nothing is asked before it is taught.' });

    /* 3. practise - fresh questions on that technique, plus one new one */
    var tiers = r.tiers(1);
    var prac = tiers.map(function (t, i) { return q(i < 4 ? weak : (fresh || weak), t); }).filter(Boolean);
    stages.push({ type: 'q', title: 'Practise', mins: 20,
      blurb: 'Fresh questions on ' + ((r.byKey(weak) || {}).name || weak).toLowerCase() + (fresh ? ' and a first look at ' + ((r.byKey(fresh) || {}).name || fresh).toLowerCase() : '') + '.',
      qs: prac });

    /* 4. check yourself - a mixed set */
    var check = shuffle(keys).slice(0, 5).map(function (k, i) { return q(k, i < 3 ? 'medium' : 'hard'); }).filter(Boolean);
    stages.push({ type: 'q', title: 'Check yourself', mins: 10, blurb: 'Five mixed ones. No hints unless you want them.', qs: check });

    /* 5. match point - a hard one */
    stages.push({ type: 'q', title: 'Match point', mins: 10, optional: true,
      blurb: 'The hard one. Only if the match is going your way.', qs: [q(weak, 'hard')].filter(Boolean) });

    return { date: todayStr(), mins: MINUTES, reason: d.reason, weak: weak, fresh: fresh, stages: stages, at: Date.now() };
  }

  /* ---------- record real progress ---------- */
  function award(n) {
    if (!window.S) return;
    window.S.xp = (window.S.xp || 0) + n;
    persist();
    if (window.MindNav && window.MindNav.top) { try { window.MindNav.top(); } catch (e) {} }
  }
  function record(key, right) {
    if (!window.S) return;
    window.S.reason = window.S.reason || {};
    var rec = window.S.reason[key] || { done: 0, right: 0 };
    rec.done = (rec.done || 0) + 1; rec.right = (rec.right || 0) + (right ? 1 : 0);
    window.S.reason[key] = rec;
    persist();
  }

  window.MindSession = {
    minutes: MINUTES,
    build: build, diagnose: diagnose, award: award, record: record,
    ready: function () { S0 = bridge(); return !!window.S; },
    today: function () {
      var all = load(), c = ((window.S && window.S.name) || 'champion').trim().toLowerCase();
      var rec = all[c];
      if (!rec || !rec.plan || rec.plan.date !== todayStr() || !(rec.plan.stages || []).length) {
        rec = { plan: build(), progress: 0, done: {} }; all[c] = rec; save(all);
      }
      return rec;
    },
    progress: function (i) { var all = load(), c = ((window.S && window.S.name) || 'champion').trim().toLowerCase(); all[c] = all[c] || {}; all[c].progress = i; save(all); },
    markDone: function (i, right, total) { var all = load(), c = ((window.S && window.S.name) || 'champion').trim().toLowerCase(); all[c] = all[c] || {}; all[c].done = all[c].done || {}; all[c].done[i] = { right: right, total: total, at: Date.now() }; save(all); },
    finish: function () {
      var all = load(), c = ((window.S && window.S.name) || 'champion').trim().toLowerCase();
      all[c] = all[c] || {};
      var stats = { at: Date.now(), right: 0, total: 0, stages: 0 };
      for (var k in (all[c].done || {})) { stats.right += all[c].done[k].right || 0; stats.total += all[c].done[k].total || 0; stats.stages++; }
      all[c].last = stats; all[c].plan = build(); all[c].progress = 0; all[c].done = {};
      save(all);
      return stats;
    },
    lastResult: function () { var all = load(), c = ((window.S && window.S.name) || 'champion').trim().toLowerCase(); return (all[c] && all[c].last) || null; }
  };
})();
