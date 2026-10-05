/* ============================================================
   MATH-CHAMP - today's session
   The child should not have to decide anything. This works out what
   he needs from his own history, prepares about an hour of work, and
   keeps the NEXT session ready before he comes back.

   The plan always has the same shape, so it feels familiar:
     1. Warm up        - easy questions to wake the brain up
     2. Learn          - the topic that most needs it
     3. Practise       - fresh questions on that topic, plus one new one
     4. Check yourself - a short mixed set
     5. One hard one   - only if the session is going well

   Weak topics come from the skill estimates and from accuracy; new
   topics come from what he has never been taught. So every session
   strengthens one thing and adds one thing.
   ============================================================ */
(function () {
  var KEY = 'gk_session';
  var MINUTES = 60;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function childOf(S) { return (((S && S.name) || '').trim() || 'champion').toLowerCase(); }

  /* ---------- what does he actually need? ---------- */
  function diagnose(S) {
    var G = window.Gen;
    if (!G) return { weak: ['frac'], fresh: ['ratio'], reason: 'A good place to start.' };
    var skills = S.skills || {}, taught = {}, attempts = S.attempts || [];
    for (var k in (S.practice || {})) if (k.indexOf('teach:') === 0) taught[k.slice(6)] = true;
    /* accuracy per topic, from the questions that name a topic */
    var acc = {}, n = {};
    attempts.forEach(function (a) {
      var t = a.topic || (a.id && a.id.indexOf('teach:') === 0 ? a.id.slice(6) : null) || (a.id && a.id.indexOf('daily:') === 0 ? a.id.slice(6) : null);
      if (!t || !G.byKey(t)) return;
      n[t] = (n[t] || 0) + 1;
      acc[t] = (acc[t] || 0) + (a.correct ? 1 : 0);
    });
    var scored = [];
    G.topics.forEach(function (t) {
      var sk = (typeof skills[t.key] === 'number') ? skills[t.key] : null;
      var a = n[t.key] ? Math.round(100 * acc[t.key] / n[t.key]) : null;
      var score = (sk !== null && a !== null) ? Math.round((sk + a) / 2) : (sk !== null ? sk : (a !== null ? a : null));
      if (score !== null) scored.push({ key: t.key, name: t.name, score: score });
    });
    scored.sort(function (x, y) { return x.score - y.score; });
    var weak = scored.filter(function (s) { return s.score < 75; }).map(function (s) { return s.key; });
    if (!weak.length) weak = scored.slice(0, 1).map(function (s) { return s.key; });
    var fresh = G.topics.filter(function (t) { return !taught[t.key] && weak.indexOf(t.key) < 0; }).map(function (t) { return t.key; });
    if (!weak.length) weak = [G.topics[0].key];
    var weakName = (G.byKey(weak[0]) || {}).name || weak[0];
    var freshName = fresh.length ? ((G.byKey(fresh[0]) || {}).name || fresh[0]) : null;
    var reason = scored.length
      ? ('Built from ' + weakName.toLowerCase() + ', the one that most needs work' + (freshName ? ', plus one new topic: ' + freshName.toLowerCase() : '') + '.')
      : 'A first session: a little of everything, to see where you are.';
    return { weak: weak, fresh: fresh, reason: reason, scored: scored };
  }

  /* ---------- build the hour ---------- */
  function build(S) {
    var G = window.Gen;
    var d = diagnose(S);
    var weakKey = d.weak[0] || 'frac';
    var freshKey = d.fresh[0] || null;
    var stages = [];

    function qs(keys, tiers) {
      var out = [];
      tiers.forEach(function (t, i) { out.push(G.make(keys[i % keys.length], t)); });
      return out;
    }
    stages.push({ type: 'warmup', title: 'Warm up', mins: 5, blurb: 'Four easy ones to wake the brain up.',
      qs: qs(['frac', 'ints', 'pct'], ['easy', 'easy', 'easy', 'easy']) });
    stages.push({ type: 'learn', title: 'Learn: ' + ((G.byKey(weakKey) || {}).name || weakKey), mins: 15, topic: weakKey,
      blurb: 'A short lesson, taught a piece at a time.' });
    stages.push({ type: 'practise', title: 'Practise', mins: 20,
      blurb: 'Fresh questions on ' + ((G.byKey(weakKey) || {}).name || weakKey).toLowerCase() + (freshKey ? ' and a first look at ' + ((G.byKey(freshKey) || {}).name || freshKey).toLowerCase() : '') + '.',
      qs: qs([weakKey].concat(freshKey ? [freshKey] : []), ['easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'medium', 'easy']) });
    stages.push({ type: 'check', title: 'Check yourself', mins: 10, blurb: 'Five mixed questions. No hints unless you want them.',
      qs: qs(d.weak.concat(['ratio', 'speed', 'time']), ['easy', 'medium', 'medium', 'hard', 'medium']) });
    stages.push({ type: 'challenge', title: 'One hard one', mins: 10, blurb: 'A real Olympiad problem, only if you are feeling brave.', optional: true });

    return { date: todayStr(), mins: MINUTES, reason: d.reason, weak: weakKey, fresh: freshKey, stages: stages, at: Date.now() };
  }

  window.Session = {
    minutes: MINUTES,
    diagnose: diagnose,
    build: build,
    /* today's plan: stored if it is still today's, otherwise prepared fresh */
    today: function (S) {
      var all = load(), c = childOf(S), rec = all[c];
      if (!rec || !rec.plan || rec.plan.date !== todayStr()) {
        rec = { plan: build(S), progress: 0, done: {} };
        all[c] = rec; save(all);
      }
      return rec;
    },
    /* remember where he got to, so leaving the page does not lose the session */
    progress: function (S, stageIdx) { var all = load(), c = childOf(S); all[c] = all[c] || {}; all[c].progress = stageIdx; save(all); },
    markDone: function (S, stageIdx, right, total) {
      var all = load(), c = childOf(S); all[c] = all[c] || {};
      all[c].done = all[c].done || {}; all[c].done[stageIdx] = { right: right, total: total, at: Date.now() };
      save(all);
    },
    /* called when the session is finished: the next one is ready before he returns */
    finish: function (S) {
      var all = load(), c = childOf(S); all[c] = all[c] || {};
      var stats = { at: Date.now(), right: 0, total: 0, stages: 0 };
      for (var k in (all[c].done || {})) { stats.right += all[c].done[k].right || 0; stats.total += all[c].done[k].total || 0; stats.stages++; }
      all[c].last = stats;
      all[c].plan = build(S);            /* tomorrow is already prepared */
      all[c].progress = 0; all[c].done = {};
      save(all);
      return stats;
    },
    lastResult: function (S) { var all = load(), c = childOf(S); return (all[c] && all[c].last) || null; }
  };
})();
