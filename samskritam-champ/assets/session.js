/* ============================================================
   SAMSKRITAM-CHAMP - today's abhyasa, built exactly like maths.

   The child must never be sent to a picker in the middle of a session.
   Every part that asks asks HERE, one question at a time, with a hint if
   he wants one and the answer shown if he misses twice.

   Same five parts as maths, science and mind:
     1. Warm up    - five words he has met, asked back to him
     2. Learn      - the next conversation with the guru
     3. Practise   - the guru's own lines from that conversation
     4. Check      - a mixed set: words and lines from other scenes
     5. Family     - the scene's mission: two lines to say together

   Questions come from the champ's own content (SK_WORDS and the scenes'
   turns), so nothing is invented and nothing repeats in one session.
   ============================================================ */
(function () {
  var KEY = 'gk_session_sk';
  var SKEY = 'sk_state';
  var MINUTES = 60;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function words() { try { return (typeof SK_WORDS !== 'undefined' && SK_WORDS) ? SK_WORDS : (window.SK_WORDS || {}); } catch (e) { return window.SK_WORDS || {}; } }
  function scenes() { try { return (typeof SK_SCENES !== 'undefined' && SK_SCENES) ? SK_SCENES : (window.SK_SCENES || []); } catch (e) { return window.SK_SCENES || []; } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- bridge to the champ's saved progress ---------- */
  function bridge() {
    try {
      var S = JSON.parse(localStorage.getItem(SKEY) || 'null');
      if (!S) return null;
      window.S = S;
      return S;
    } catch (e) { return null; }
  }
  var B0 = null;
  function persist() { if (!window.S) return; try { localStorage.setItem(SKEY, JSON.stringify(window.S)); } catch (e) {} }

  /* ---------- what does he need? ---------- */
  function diagnose() {
    var sc = scenes();
    var next = null;
    for (var i = 0; i < sc.length; i++) {
      var st = (window.S && window.S.scenes || {})[sc[i].id] || {};
      if (!st.done) { next = sc[i]; break; }
    }
    if (!next) next = sc[0] || null;
    var met = Object.keys((window.S && window.S.words) || {}).length;
    var reason = next
      ? ('Built around ' + next.name.toLowerCase() + ', the conversation that is next for you' +
         (met ? ', plus the ' + met + ' words you have already collected' : '') + '.')
      : 'A first abhyasa: a little of everything, to see where you are.';
    return { next: next, reason: reason };
  }

  /* ---------- turn the champ's own content into questions ---------- */
  function wordQuestion(wordKey, allKeys) {
    var W = words()[wordKey];
    if (!W) return null;
    var others = shuffle(allKeys.filter(function (k) { return k !== wordKey && words()[k]; })).slice(0, 3);
    if (others.length < 3) return null;
    var opts = shuffle([wordKey].concat(others));
    var a = opts.indexOf(wordKey);
    return {
      kind: 'mcq', word: wordKey,
      q: 'What does ' + W.dev + ' mean?',
      scene: W.dev + '   \u2014   say it: ' + (W.say || ''),
      opts: opts.map(function (k) { return { label: words()[k].mean, sub: '', ok: k === wordKey }; }),
      a: a,
      sol: W.dev + ' (' + (W.say || '') + ') means "' + W.mean + '". Built from ' + (W.root || '') + '.',
      hints: ['Say it aloud first: ' + (W.say || W.dev), 'Words that look alike: ' + (W.cousins || 'none here')]
    };
  }
  function turnQuestion(scene, turn) {
    if (!turn || !turn.g || !turn.opts || turn.opts.length < 2) return null;
    var okI = -1, okCount = 0;
    for (var i = 0; i < turn.opts.length; i++) { if (turn.opts[i].ok) { okCount++; if (okI < 0) okI = i; } }
    /* some turns have more than one acceptable answer; the runner accepts them all */
    if (okI < 0) okI = 0;
    var right = turn.opts[okI];
    return {
      kind: 'mcq', sceneId: scene.id,
      q: 'The guru says:  ' + turn.g.dev + '   (' + turn.g.tr + ')  \u2014  ' + (turn.g.mean || ''),
      say: turn.g,
      opts: turn.opts.map(function (o) { return { label: o.dev, sub: o.tr + ' \u2014 ' + (o.mean || ''), ok: !!o.ok }; }),
      a: okI,
      sol: '"' + right.dev + '" (' + right.tr + ') \u2014 ' + (right.mean || '') + '. ' + (turn.after || ''),
      hints: ['He is greeting you or asking something. Which answer fits?', 'The answer starts with "' + String(right.tr || '').split(' ')[0] + '"']
    };
  }
  function sceneQuestions(scene, max) {
    var out = [];
    (scene.turns || []).forEach(function (t) { var q = turnQuestion(scene, t); if (q) out.push(q); });
    return shuffle(out).slice(0, max || 6);
  }

  function build() {
    var sc = scenes(), W = words();
    var d = diagnose();
    var allKeys = Object.keys(W);
    var stages = [];

    /* 1. warm up - five words */
    var warmKeys = shuffle(allKeys).slice(0, 5);
    var warm = warmKeys.map(function (k) { return wordQuestion(k, allKeys); }).filter(Boolean);
    stages.push({ type: 'mcq', title: 'Warm up', mins: 5, blurb: 'Five words, asked back to you. Say each one aloud.', qs: warm });

    /* 2. learn - the next conversation, opened by name */
    var next = d.next || sc[0];
    stages.push({ type: 'learn', title: 'Learn: ' + ((next && next.name) || 'the next conversation'), mins: 15,
      scene: next ? next.id : '', sceneName: next ? next.name : '', blurb: 'A conversation with the guru, in full sentences.' });

    /* 3. practise - the guru's own lines from that conversation */
    var prac = next ? sceneQuestions(next, 6) : [];
    stages.push({ type: 'mcq', title: 'Practise', mins: 20,
      blurb: 'The guru speaks, you answer \u2014 the real lines from ' + ((next && next.name) || 'the conversation').toLowerCase() + '.', qs: prac });

    /* 4. check yourself - words and lines from other scenes */
    var otherScenes = shuffle(sc.filter(function (s) { return !next || s.id !== next.id; }));
    var check = [];
    otherScenes.slice(0, 3).forEach(function (s) { var q = sceneQuestions(s, 1)[0]; if (q) check.push(q); });
    shuffle(allKeys).slice(0, 3).forEach(function (k) { var q = wordQuestion(k, allKeys); if (q) check.push(q); });
    stages.push({ type: 'mcq', title: 'Check yourself', mins: 10, blurb: 'A mixed set. No hints unless you want them.', qs: shuffle(check).slice(0, 5) });

    /* 5. the family mission */
    stages.push({ type: 'mission', title: 'Say it to family', mins: 10, optional: true,
      mission: next ? next.mission : null, blurb: 'Two lines, one for you and one for a grown-up.' });

    return { date: todayStr(), mins: MINUTES, reason: d.reason, scene: next ? next.id : '', stages: stages, at: Date.now() };
  }

  /* ---------- record real progress ---------- */
  function award(n) {
    if (!window.S) return;
    window.S.xp = (window.S.xp || 0) + n;
    persist();
    if (window.SanskritNav && window.SanskritNav.top) { try { window.SanskritNav.top(); } catch (e) {} }
  }
  function record(q, right) {
    if (!window.S || !q) return;
    if (q.word) {
      window.S.words = window.S.words || {};
      if (right) window.S.words[q.word] = 1;
    }
    if (q.sceneId) {
      window.S.scenes = window.S.scenes || {};
      var st = window.S.scenes[q.sceneId] = window.S.scenes[q.sceneId] || { done: false, at: 0, words: [], mission: false };
      if (right) st.at = (st.at || 0) + 1;
    }
    persist();
  }

  window.SkSession = {
    minutes: MINUTES,
    build: build, diagnose: diagnose, award: award, record: record,
    ready: function () { B0 = bridge(); return !!window.S; },
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
