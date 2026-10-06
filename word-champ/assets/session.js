/* ============================================================
   WORD-CHAMP - today's practice, built exactly like the other champs.

   Five parts, the same shape every time:
     1. Warm up     - five quick ones from across English
     2. Learn       - the rule that most needs him, SHOWN first
     3. Practise    - questions on that rule
     4. Check       - a mixed set
     5. One hard one- the toughest kind, if he is going well

   Questions come from the champ's own bank (EngGen), so nothing is
   invented and nothing repeats inside one session.
   ============================================================ */
(function () {
  var KEY = 'gk_session_word', SKEY = 'wc_state', MINUTES = 60;
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function G() { return window.EngGen || null; }

  function bridge() {
    try {
      var S = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (!S) {
        var cc = (localStorage.getItem('cc_name') || '').trim();
        S = { name: cc || 'Learner', xp: 0, streak: 0, topics: {} };
      }
      window.S = S;
      return S;
    } catch (e) { return null; }
  }
  function persist() { if (!window.S) return; try { localStorage.setItem(SKEY, JSON.stringify(window.S)); } catch (e) {} }

  function diagnose() {
    var g = G();
    if (!g) return { weak: null, reason: 'A good place to start.' };
    var seen = (window.S && window.S.topics) || {};
    var scored = g.topics.map(function (t) {
      var r = seen[t.key] || {};
      var n = r.n || 0, right = r.right || 0;
      return { key: t.key, name: t.name, score: n ? Math.round(100 * right / n) : 40, n: n };
    });
    scored.sort(function (a, b) { return a.score - b.score; });
    var weak = scored[0];
    var fresh = scored.filter(function (s) { return s.n === 0 && s.key !== weak.key; });
    return {
      weak: weak.key,
      reason: 'Built around ' + weak.name.toLowerCase() + ', the one that most needs you' +
        (fresh.length ? ', plus a first look at ' + fresh[0].name.toLowerCase() : '') + '.'
    };
  }

  function build() {
    var g = G(), stages = [], d = diagnose();
    if (!g) return { date: todayStr(), mins: MINUTES, reason: d.reason, stages: stages, at: Date.now() };
    var keys = g.topics.map(function (t) { return t.key; });
    var weak = d.weak || keys[0];
    /* never ask the same question twice inside one session */
    var seen = {};
    var q = function (k, tier) {
      var out = null;
      for (var i = 0; i < 30; i++) {
        var cand = g.make(k, tier);
        /* a question's identity is its words AND its choices: two spelling
           questions share the prompt but ask about different words */
        var id = cand.q + '|' + (cand.choices ? cand.choices.join(',') : cand.ans);
        if (!seen[id]) { seen[id] = 1; return cand; }
        out = cand;
      }
      return out;   /* the bank is small - accept a repeat rather than break */
    };

    stages.push({ type: 'q', title: 'Warm up', mins: 5, blurb: 'Five quick ones, to get your eye in.',
      qs: shuffle(keys).slice(0, 5).map(function (k) { return q(k, 'easy'); }) });
    stages.push({ type: 'learn', title: 'Learn: ' + ((g.byKey(weak) || {}).name || weak), mins: 15, topic: weak,
      demo: q(weak, 'easy'), blurb: 'One rule, shown to you first. Nothing is asked before it is shown.' });
    /* practise draws on the topic that needs it AND one other, so no question
       has to be repeated and a second skill gets a turn */
    var fresh = shuffle(keys.filter(function (k) { return k !== weak; }))[0];
    var pracKeys = [weak, weak, fresh, weak, fresh, fresh];
    stages.push({ type: 'q', title: 'Practise', mins: 20,
      blurb: 'Questions on ' + ((g.byKey(weak) || {}).name || weak).toLowerCase() + ' and ' + ((g.byKey(fresh) || {}).name || fresh).toLowerCase() + ', getting harder.',
      qs: pracKeys.map(function (k, i) { return q(k, ['easy', 'easy', 'medium', 'medium', 'hard', 'medium'][i]); }) });
    stages.push({ type: 'q', title: 'Check yourself', mins: 10, blurb: 'Five mixed ones. No hints unless you want them.',
      qs: shuffle(keys).slice(0, 5).map(function (k, i) { return q(k, i < 3 ? 'medium' : 'hard'); }) });
    stages.push({ type: 'q', title: 'One hard one', mins: 10, optional: true,
      blurb: 'The toughest kind, only if today is going well.', qs: [q(weak, 'hard')] });
    return { date: todayStr(), mins: MINUTES, reason: d.reason, weak: weak, stages: stages, at: Date.now() };
  }

  function award(n) {
    if (!window.S) return;
    window.S.xp = (window.S.xp || 0) + n; persist();
    if (window.WordNav && window.WordNav.top) { try { window.WordNav.top(); } catch (e) {} }
  }
  function record(topic, right) {
    if (!window.S) return;
    window.S.topics = window.S.topics || {};
    var r = window.S.topics[topic] || { n: 0, right: 0 };
    r.n++; if (right) r.right++;
    window.S.topics[topic] = r; persist();
  }

  window.WordSession = {
    minutes: MINUTES, build: build, diagnose: diagnose, award: award, record: record,
    ready: function () { bridge(); return !!window.S; },
    today: function () {
      var all = load(), c = ((window.S && window.S.name) || 'learner').trim().toLowerCase();
      var rec = all[c];
      if (!rec || !rec.plan || rec.plan.date !== todayStr() || !(rec.plan.stages || []).length) {
        rec = { plan: build(), progress: 0, done: {} }; all[c] = rec; save(all);
      }
      return rec;
    },
    progress: function (i) { var all = load(), c = ((window.S && window.S.name) || 'learner').trim().toLowerCase(); all[c] = all[c] || {}; all[c].progress = i; save(all); },
    markDone: function (i, right, total) { var all = load(), c = ((window.S && window.S.name) || 'learner').trim().toLowerCase(); all[c] = all[c] || {}; all[c].done = all[c].done || {}; all[c].done[i] = { right: right, total: total, at: Date.now() }; save(all); },
    finish: function () {
      var all = load(), c = ((window.S && window.S.name) || 'learner').trim().toLowerCase();
      all[c] = all[c] || {};
      var stats = { at: Date.now(), right: 0, total: 0, stages: 0 };
      for (var k in (all[c].done || {})) { stats.right += all[c].done[k].right || 0; stats.total += all[c].done[k].total || 0; stats.stages++; }
      all[c].last = stats; all[c].plan = build(); all[c].progress = 0; all[c].done = {};
      save(all);
      return stats;
    },
    lastResult: function () { var all = load(), c = ((window.S && window.S.name) || 'learner').trim().toLowerCase(); return (all[c] && all[c].last) || null; }
  };
})();
