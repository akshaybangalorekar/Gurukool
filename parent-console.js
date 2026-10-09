/* ============================================================
   GURUKOOL · PARENT CONSOLE (Phase 2)
   The real picture for parents: strong / needs practice / struggling
   per topic across all three champs, trend arrows, language signals
   from doubt-jar and guru notes, three concrete recommendations and
   a weekly digest.
   Loads inside admin.html (PIN-gated) and turns it into one console
   with tabs: Setup · Insights · Signals · This week's plan.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- helpers ---------- */
  function read(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>'); }
  function el(id) { return document.getElementById(id); }
  function daysAgo(ts) { return (Date.now() - (ts || 0)) / 86400000; }

  var MATH_TOPIC = { add: 'Addition', mult: 'Multiplication', div: 'Division', frac: 'Fractions', pct: 'Percentages', word: 'Word problems', sense: 'Number sense', time: 'Time & clocks', pattern: 'Patterns' };
  var QUEST_NAME = {
    eq1: 'Quests · The Balance Beam', eq2: 'Quests · The Recipe Order', eq3: 'Quests · The River of Signs',
    eq4: 'Quests · The Great Divide', eq5: 'Quests · The Common Factor Chest',
    rb1: 'Quests · Read Every Word', rb2: 'Quests · Spot the Hidden Fact', rb3: 'Quests · Ignore the Distraction',
    rb4: 'Quests · Draw the Situation', rb5: "Quests · Check What's Asked"
  };
  var WORLD_NAME = {
    physics: 'Physics Lab', flight: 'Flight & Space', chem: 'Chemistry Corner', bio: 'The Living World', logic: 'Logic Dojo',
    elec: 'Electricity & Magnetism', light: 'Light & Sound', heat: 'Heat & Energy Flow', body: 'Human Body Factory',
    earth: 'Earth & Weather', ai: 'Internet & AI', materials: 'Materials Lab', sky: 'Skywatcher', scientists: 'Great Scientists',
    kitchen: 'Kitchen Science', coding: 'Coding Camp', robotics: 'Robots & Drones', quantum: 'Quantum Realm',
    genetics: 'Genetics & Life Code', vedic: 'Vedic Science', trivia: 'Rapid-fire Trivia'
  };
  var CASE_NAME = { q1: 'The Village Wall', q2: 'The Minecart Path', q3: 'The Crafting Table', q4: 'The River Crossing', q5: 'The Redstone Vault' };

  /* home activities — one per area, Indian, do-it-together */
  var ACTIVITY = {
    add: 'Kitchen maths: double a recipe together and add the amounts aloud.',
    mult: 'Ask him to work out 7 × 8 by counting a grid of tiles or a box of eggs.',
    div: 'Share a packet of biscuits equally among the family — how many each?',
    frac: 'Cut a roti into 8 pieces at dinner: how many pieces is 3/8?',
    pct: 'On the next shopping trip, ask him to work out the discount on a price tag.',
    word: 'Ask him to explain a shop receipt in his own words.',
    sense: 'Estimate the bill at a shop before paying, then check who was closer.',
    time: 'Plan a family outing together using a bus or train timetable.',
    pattern: 'Look for repeating patterns in floor tiles or a rangoli.',
    mission: 'Sit with him for one short mission and ask "which trick made that easy?"',
    drill: 'Two-minute tables race at dinner — who is faster?',
    quest: 'Re-read one of his guru notes together and ask him to teach you the trick.',
    physics: 'Drop a light and a heavy ball together — which lands first, and why?',
    elec: 'Find the fuse box together and talk about what a circuit needs to work.',
    light: 'Make a shadow puppet show with a torch and talk about light travelling straight.',
    heat: 'Boil water and watch the steam — where does the heat go?',
    chem: 'Mix salt in warm and cold water — which dissolves faster?',
    bio: 'Plant a bean in a cup of soil and measure it every day for a week.',
    sky: 'Look at the moon for three nights — does it change shape?',
    coding: 'Ask him to give YOU step-by-step instructions to make a sandwich (that is coding).',
    kitchen: 'Bake something together and let him double or halve the recipe.',
    mind: 'Three clues, one answer: play a quick detective round at dinner.'
  };

  /* ---------- analysis ---------- */
  function rate(list) {
    if (!list.length) return 0;
    return list.filter(function (a) { return a.correct; }).length / list.length;
  }

  function analyse(list) {
    var n = list.length;
    if (!n) return null;
    var acc = rate(list);
    var t = list.reduce(function (s, a) { return s + (a.timeSec || 0); }, 0) / n;
    var tg = list.reduce(function (s, a) { return s + (a.targetSec || 60); }, 0) / n;
    var trend = 'flat';
    if (n >= 6) {
      var half = Math.floor(n / 2);
      var a1 = rate(list.slice(0, n - half)), a2 = rate(list.slice(n - half));
      trend = (a2 - a1 > 0.08) ? 'up' : ((a1 - a2 > 0.08) ? 'down' : 'flat');
    }
    var verdict = (n < 5) ? 'starting' : ((acc >= 0.85 && t <= tg) ? 'strong' : (acc >= 0.6 ? 'practice' : 'struggle'));
    return { n: n, acc: Math.round(acc * 100), t: Math.round(t), tg: Math.round(tg), trend: trend, verdict: verdict, last: list[list.length - 1].ts || 0 };
  }

  function verdictChip(v) {
    var map = { strong: ['✅ Strong', '#047857', '#e8f5e9'], practice: ['📈 Needs practice', '#b45309', '#fff3e0'], struggle: ['⚠️ Struggling', '#b91c1c', '#ffebee'], starting: ['🌱 Just starting', '#7a6f60', '#f3ead7'] };
    var x = map[v] || map.starting;
    return '<span style="background:' + x[2] + ';color:' + x[1] + ';font-weight:800;border-radius:999px;padding:3px 10px;font-size:14.5px;white-space:nowrap">' + x[0] + '</span>';
  }
  function trendChip(t) {
    if (t === 'up') return '<span style="color:#047857;font-weight:800" title="improving">↗ improving</span>';
    if (t === 'down') return '<span style="color:#b91c1c;font-weight:800" title="slipping">↘ slipping</span>';
    return '<span style="color:#7a6f60;font-weight:800">→ steady</span>';
  }

  function rowHTML(name, a, extra) {
    if (!a) return '<div class="pc-row"><b>' + esc(name) + '</b>' + verdictChip('starting') + '<span class="pc-meta">no attempts yet</span></div>';
    return '<div class="pc-row"><b>' + esc(name) + '</b>' + verdictChip(a.verdict) +
      '<span class="pc-meta">' + a.acc + '% correct · avg ' + a.t + 's vs target ' + a.tg + 's · ' + a.n + ' attempts</span>' +
      '<span class="pc-trend">' + trendChip(a.trend) + '</span>' + (extra || '') + '</div>';
  }

  /* ---------- data per child ---------- */
  function childNames() {
    var names = {}, i;
    function add(x) {
      if (!x) return;
      var v = String(x).trim().replace(/^[\s"']+|[\s"']+$/g, '');   /* a stored name can arrive wrapped in quotes */
      if (v) names[v.toLowerCase()] = v;
    }
    try { add(localStorage.getItem('cc_name')); } catch (e) {}
    var oc = read('oc_state'); if (oc) add(oc.name);
    var ocs = read('oc_profiles') || {}; for (i in ocs) add(ocs[i] && ocs[i].name);
    var mc = read('mc_state'); if (mc) add(mc.name);
    var mcs = read('mc_profiles') || {}; for (i in mcs) add(mcs[i] && mcs[i].name);
    var sq = read('sq_v3'); if (sq && sq.profiles) for (i in sq.profiles) add(sq.profiles[i].name);
    var sk = read('sk_state'); if (sk) add(sk.name);
    var sks = read('sk_profiles') || {}; for (i in sks) add(sks[i] && sks[i].name);
    return Object.keys(names).map(function (k) { return names[k]; });
  }

  function stateFor(kind, name) {
    var key = kind === 'math' ? 'oc_state' : (kind === 'science' ? 'sq_v3' : 'mc_state');
    var pkey = kind === 'math' ? 'oc_profiles' : (kind === 'mind' ? 'mc_profiles' : null);
    var lname = (name || '').trim().toLowerCase();
    if (kind === 'science') {
      var sq = read('sq_v3');
      if (!sq || !sq.profiles) return null;
      var pid = null;
      for (var p in sq.profiles) if ((sq.profiles[p].name || '').trim().toLowerCase() === lname) { pid = p; break; }
      if (!pid) pid = sq.current || 'p1';
      return sq.profiles[pid] || null;
    }
    var cur = read(key);
    if (pkey) {
      var profs = read(pkey) || {};
      if (profs[lname]) return profs[lname];
    }
    if (cur && (cur.name || '').trim().toLowerCase() === lname) return cur;
    if (cur) return cur;   /* single-child device */
    return null;
  }

  /* ---------- insights ---------- */
  function mathRows(oc) {
    var rows = [], groups = {}, order = [];
    (oc.attempts || []).forEach(function (a) {
      if (a.kind === 'daily') return;   /* the daily test belongs to the child, not to the parent view */
      var key, label;
      if (a.kind === 'homework') { var hid = String(a.id || '').replace(/^hw:/, '') || 'other'; key = 'hw:' + hid; label = 'Homework \u00B7 ' + (HW_NAME[hid] || hid); }
      else if (a.kind === 'word') { key = 'word'; label = 'Word problems'; }
      else if (a.kind === 'mission') { var tid = String(a.id || '').split('-L')[0]; key = 'm:' + tid; label = MATH_TOPIC[tid] || ('Mission · ' + tid); }
      else if (a.kind === 'quest') { var m = String(a.id || '').match(/^(eq|rb)\d/); if (!m) return; key = 'q:' + m[0]; label = QUEST_NAME[m[0]] || m[0]; }
      else if (a.kind === 'drill') { key = 'd:' + (a.drill || 'drill'); label = 'Speed drills'; }
      else { key = 'other'; label = 'Other practice'; }
      if (!groups[key]) { groups[key] = []; order.push([key, label]); }
      groups[key].push(a);
    });
    order.forEach(function (o) { rows.push({ label: o[1], a: analyse(groups[o[0]]), key: o[0] }); });
    return rows;
  }

  function scienceRows(prof) {
    var rows = [];
    if (!prof) return rows;
    var quiz = prof.quiz || {}, levels = prof.levels || {}, visited = prof.visited || [];
    var ids = {};
    Object.keys(quiz).forEach(function (w) { ids[w] = 1; });
    Object.keys(levels).forEach(function (w) { ids[w] = 1; });
    Object.keys(quiz).forEach(function (w) {
      var q = quiz[w] || {};
      if (!q.t) return;
      var acc = q.s / q.t;
      var c = (levels[w] || {}).c || 1;
      var verdict = q.t < 5 ? 'starting' : (acc >= 0.8 && c >= 2 ? 'strong' : (acc >= 0.6 ? 'practice' : 'struggle'));
      rows.push({ label: WORLD_NAME[w] || w, a: { n: q.t, acc: Math.round(acc * 100), t: 0, tg: 0, trend: 'flat', verdict: verdict, noSpeed: true } });
    });
    (visited || []).forEach(function (w) {
      if (ids[w]) return; ids[w] = 1;
      rows.push({ label: WORLD_NAME[w] || w, a: { n: 0, acc: 0, t: 0, tg: 0, trend: 'flat', verdict: 'starting', noSpeed: true, visited: true } });
    });
    return rows;
  }

  function mindRows(mc) {
    var rows = [];
    if (!mc || !mc.cases) return rows;
    Object.keys(mc.cases).forEach(function (q) {
      var c = mc.cases[q] || {};
      var used = (c.used || []).length, stars = c.stars || 0;
      var verdict = c.done ? (stars >= 12 ? 'strong' : 'practice') : (used ? 'starting' : 'starting');
      rows.push({ label: CASE_NAME[q] || q, a: { n: used, acc: used ? Math.round(100 * used / 5) : 0, t: 0, tg: 0, trend: 'flat', verdict: verdict, noSpeed: true, stars: stars, done: !!c.done } });
    });
    return rows;
  }

  function mathRowHTML(r) {
    if (!r.a) return rowHTML(r.label, null);
    if (r.a.noSpeed) return rowHTML(r.label, r.a);
    return rowHTML(r.label, r.a);
  }

  /* ---------- signals ---------- */
  var MARKERS = /(hard|difficult|stuck|confus|don'?t know|dont know|not sure|hate|boring|bored|too much|samajh|mushkil|kathin|pareshan|difficulty|problem|scared|tired)/i;

  function collectNotes(name) {
    var notes = [];
    var sq = stateFor('science', name);
    if (sq && sq.doubts) sq.doubts.forEach(function (d) { notes.push({ ts: 0, text: d.t, where: WORLD_NAME[d.w] || d.w || 'Science', kind: 'Doubt Jar' }); });
    var mc = stateFor('mind', name);
    if (mc && mc.cases) Object.keys(mc.cases).forEach(function (q) {
      ((mc.cases[q] || {}).journal || []).forEach(function (j) { notes.push({ ts: j.ts, text: j.text, where: CASE_NAME[q] || q, kind: 'Guru note' }); });
    });
    var oc = stateFor('math', name);
    if (oc) {
      var qs = oc.quest || {};
      Object.keys(qs).forEach(function (q) {
        ((qs[q] || {}).journal || []).forEach(function (j) { notes.push({ ts: j.ts, text: j.text, where: QUEST_NAME[q] || q, kind: 'Guru note' }); });
      });
      (oc.journal || []).forEach(function (j) { notes.push({ ts: j.ts, text: j.note || '', where: j.problemTitle || 'Maths', kind: 'Journal' }); });
    }
    return notes.filter(function (n) { return n.text && String(n.text).trim(); });
  }

  function signalHTML(name) {
    var notes = collectNotes(name);
    var flagged = notes.filter(function (n) { return MARKERS.test(n.text); });
    var h = '<p class="pc-lead">His own words — doubt-jar notes, guru notes and journal entries. Words that often signal confusion or frustration are highlighted. These are <b>signals for you to interpret</b>, not a verdict on his feelings.</p>';
    if (!notes.length) return h + '<div class="pc-empty">No notes yet. They collect automatically as he saves doubts and writes "how I cracked it" notes.</div>';
    h += '<div class="pc-cards">';
    h += '<div class="pc-stat"><b>' + notes.length + '</b><span>notes saved</span></div>';
    h += '<div class="pc-stat"><b>' + flagged.length + '</b><span>with a marker word</span></div>';
    h += '</div>';
    if (flagged.length) {
      h += '<h3>Worth a gentle chat</h3><ul class="pc-list">';
      flagged.slice(-8).reverse().forEach(function (n) {
        var t = esc(n.text).replace(MARKERS, '<mark>$1</mark>');
        h += '<li><b>' + esc(n.where) + '</b> <span class="pc-kind">' + esc(n.kind) + '</span><br>' + t + '</li>';
      });
      h += '</ul>';
    }
    h += '<h3>All recent notes</h3><ul class="pc-list">';
    notes.slice(-12).reverse().forEach(function (n) { h += '<li><b>' + esc(n.where) + '</b> <span class="pc-kind">' + esc(n.kind) + '</span><br>' + esc(n.text) + '</li>'; });
    h += '</ul>';
    return h;
  }

  /* ---------- plan ---------- */
  function pick3(name, math, sci, mind) {
    var recs = [];
    var all = [];
    math.forEach(function (r) { if (r.a) all.push({ label: r.label, a: r.a, key: r.key }); });
    sci.forEach(function (r) { if (r.a) all.push({ label: r.label, a: r.a, key: r.label }); });
    mind.forEach(function (r) { if (r.a) all.push({ label: r.label, a: r.a, key: r.label }); });

    var struggling = all.filter(function (x) { return x.a.verdict === 'struggle'; }).sort(function (a, b) { return a.a.acc - b.a.acc; });
    var slipping = all.filter(function (x) { return x.a.trend === 'down'; });
    var improving = all.filter(function (x) { return x.a.trend === 'up' || x.a.verdict === 'strong'; }).sort(function (a, b) { return b.a.acc - a.a.acc; });

    if (struggling.length) {
      var s = struggling[0];
      recs.push({ icon: '🎯', title: 'Focus: ' + s.label, body: 'Accuracy is ' + s.a.acc + '% over ' + s.a.n + ' attempts — the weakest area right now. Sit with him for two short sessions this week and let him explain his thinking out loud before answering. Suggested activity: <b>' + (ACTIVITY[s.key] || ACTIVITY[s.label] || 'play one quest together and ask "which trick made that easy?"') + '</b>' });
    }
    if (slipping.length) {
      var sl = slipping[0];
      /* do not repeat the same area twice — the focus card already covers it */
      if (!(struggling.length && struggling[0].label === sl.label)) {
        recs.push({ icon: '📉', title: 'Slipping: ' + sl.label, body: 'This was going better earlier and has dipped recently (' + sl.a.acc + '% overall, trending down). Not a crisis — a nudge: revisit it lightly with one easy win first, then one step harder.' });
      }
    }
    if (improving.length) {
      var im = improving[0];
      recs.push({ icon: '🚀', title: 'Stretch: ' + im.label, body: 'Going well at ' + im.a.acc + '% — ready for a harder step. Move him up a level or ask him to teach YOU this one; teaching is the fastest way to lock it in.' });
    }
    /* repeated doubts in one area */
    var doubts = (stateFor('science', name) || {}).doubts || [];
    var byWorld = {};
    doubts.forEach(function (d) { byWorld[d.w] = (byWorld[d.w] || 0) + 1; });
    var topWorld = Object.keys(byWorld).sort(function (a, b) { return byWorld[b] - byWorld[a]; })[0];
    if (topWorld && byWorld[topWorld] >= 2) {
      recs.push({ icon: '🔬', title: 'Curiosity: ' + (WORLD_NAME[topWorld] || topWorld), body: 'He has asked ' + byWorld[topWorld] + ' questions in this world — real interest. Do it together at home: <b>' + (ACTIVITY[topWorld] || 'pick any kitchen experiment from that world and try it this weekend.') + '</b>' });
    }
    /* avoidance */
    var stale = all.filter(function (x) { return x.a.n >= 5 && x.a.last && daysAgo(x.a.last) > 10; });
    if (stale.length) {
      recs.push({ icon: '🕰️', title: 'Not touched lately: ' + stale[0].label, body: 'Nothing wrong with it — it simply has not been practised for over 10 days. Invite, do not push: one easy question, then let him choose.' });
    }
    if (!recs.length) {
      recs.push({ icon: '🌱', title: 'Getting started', body: 'Not much activity on this device yet. Start with one Technique Quest together — the Equation Forge or the Riddle Bazaar — and let him discover the trick before you explain anything.' });
      recs.push({ icon: '🧠', title: 'Build the habit', body: 'Short and often beats long and rare. Two 10-minute sessions this week will show up in these numbers quickly.' });
    }
    return recs.slice(0, 3);
  }

  /* ---------- the weekly digest ---------- */
  function skFor(name) {
    var lname = (name || '').trim().toLowerCase();
    var sks = read('sk_profiles') || {};
    if (sks[lname]) return sks[lname];
    var sk = read('sk_state');
    if (sk && (sk.name || '').trim().toLowerCase() === lname) return sk;
    return null;
  }
  function rhythmDays() {
    var r = read('gk_rhythm') || {};
    return (r && r.days && typeof r.days === 'object') ? r.days : {};
  }
  function last7() {
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(Date.now() - i * 86400000);
      out.push({
        key: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'),
        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()]
      });
    }
    return out;
  }
  function shieldUsed(oc, sk, mc, sq) {
    var n = new Date();
    var mk = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0');
    var flags = [];
    /* check the profile copy AND the live state - either can be the fresher one */
    var ocRaw = read('oc_state') || {}, mcRaw = read('mc_state') || {}, skRaw = read('sk_state') || {};
    var sqRaw = read('sq_v3') || {}, sqCur = (sqRaw.profiles || {})[sqRaw.current] || {};
    function has(o) { return !!(o && o.streak && o.streak.freezeMonth === mk); }
    if (has(oc) || has(ocRaw)) flags.push('maths');
    if (has(mc) || has(mcRaw)) flags.push('mind');
    if (has(sk) || has(skRaw)) flags.push('Sanskrit');
    if ((sq && sq.freezeMonth === mk) || sqCur.freezeMonth === mk) flags.push('science');
    return flags;
  }

  function digest(name, math, sci, mind) {
    var oc = stateFor('math', name) || {};
    var sk = skFor(name) || {};
    var mc = stateFor('mind', name) || {};
    var sq = stateFor('science', name) || {};
    var att = oc.attempts || [];
    var week = att.filter(function (a) { return daysAgo(a.ts) <= 7; });
    var prev = att.filter(function (a) { return daysAgo(a.ts) > 7 && daysAgo(a.ts) <= 14; });
    var xpWeek = week.reduce(function (s, a) { return s + (a.xp || 0); }, 0);
    var accWeek = week.length ? Math.round(100 * rate(week)) : null;
    var accPrev = prev.length ? Math.round(100 * rate(prev)) : null;
    var notes = collectNotes(name);
    var streak = (oc.streak && oc.streak.count) || 0;
    var days7 = last7();
    var mins = rhythmDays();
    var weekMins = 0;
    days7.forEach(function (d) { weekMins += (mins[d.key] || 0); });
    weekMins = Math.round(weekMins);
    var scenesWeek = 0;
    for (var sid in (sk.scenes || {})) { var sc = sk.scenes[sid]; if (sc && sc.at && daysAgo(sc.at) <= 7) scenesWeek++; }
    var wordsKnown = Object.keys(sk.words || {}).length;
    var shield = shieldUsed(oc, sk, mc, sq);

    var h = '<p class="pc-lead">The last seven days on this device. Minutes come from the learning clock; questions and XP come from what was actually recorded.</p>';
    h += '<div class="pc-cards">';
    h += '<div class="pc-stat"><b>' + weekMins + '</b><span>minutes of real work this week</span></div>';
    h += '<div class="pc-stat"><b>' + week.length + '</b><span>maths questions this week</span></div>';
    h += '<div class="pc-stat"><b>+' + xpWeek + '</b><span>maths XP earned this week</span></div>';
    h += '<div class="pc-stat"><b>' + (accWeek === null ? '–' : accWeek + '%') + '</b><span>accuracy this week' + (accPrev !== null && accWeek !== null ? ' (last week ' + accPrev + '%)' : '') + '</span></div>';
    h += '<div class="pc-stat"><b>' + scenesWeek + '</b><span>Sanskrit scenes this week</span></div>';
    h += '<div class="pc-stat"><b>' + wordsKnown + '</b><span>words in the Shabda-Kosha</span></div>';
    h += '<div class="pc-stat"><b>' + streak + '</b><span>day streak</span></div>';
    h += '<div class="pc-stat"><b>' + notes.length + '</b><span>notes in his own words</span></div>';
    h += '</div>';

    /* the 7-day activity strip */
    var maxM = 1;
    days7.forEach(function (d) { maxM = Math.max(maxM, mins[d.key] || 0); });
    h += '<h4 style="margin:18px 0 6px">Work by day</h4><div style="display:flex;gap:8px;align-items:flex-end">';
    days7.forEach(function (d) {
      var m = Math.round(mins[d.key] || 0);
      var pct = Math.max(7, Math.round(100 * m / maxM));
      h += '<div style="flex:1;text-align:center"><div title="' + m + ' minutes" style="height:' + Math.round(pct * 0.7) + 'px;background:' + (m > 0 ? 'linear-gradient(180deg,#34d399,#2a9d8f)' : '#e2e8f0') + ';border-radius:8px 8px 4px 4px"></div><div style="font-size:13px;font-weight:800;color:#64748b;margin-top:4px">' + d.day + '</div><div style="font-size:12px;color:#94a3b8">' + (m > 0 ? m + 'm' : '–') + '</div></div>';
    });
    h += '</div>';

    /* the written digest */
    var best = null, worst = null;
    math.forEach(function (r) { if (!r.a || r.a.n < 3) return; if (!best || r.a.acc > best.a.acc) best = r; if (!worst || r.a.acc < worst.a.acc) worst = r; });
    var lines = [];
    if (weekMins >= 60) lines.push('About ' + weekMins + ' minutes of real work - a solid week.');
    else if (weekMins >= 20) lines.push('About ' + weekMins + ' minutes of real work this week: short sessions, but real ones.');
    else if (weekMins > 0) lines.push('Only about ' + weekMins + ' minutes this week, so a couple of short sessions would help.');
    else lines.push('No learning time was recorded on this device this week - worth a gentle nudge.');
    if (accWeek !== null && accPrev !== null) {
      if (accWeek >= accPrev + 5) lines.push('Accuracy rose from ' + accPrev + '% to ' + accWeek + '%, so the practice is working.');
      else if (accWeek <= accPrev - 5) lines.push('Accuracy slipped from ' + accPrev + '% to ' + accWeek + '%, so sit with him on the trickiest topic for ten minutes.');
      else lines.push('Accuracy is holding steady at ' + accWeek + '%.');
    } else if (accWeek !== null) lines.push('Accuracy this week: ' + accWeek + '%.');
    if (best) lines.push('Strongest: ' + best.label + ' at ' + best.a.acc + '%.');
    if (worst && (!best || worst.label !== best.label)) lines.push('Needs a hand: ' + worst.label + ' at ' + worst.a.acc + '%.');
    if (shield.length) lines.push('The streak shield was used this month in ' + shield.join(', ') + ', so one missed day did not break the streak. It resets next month.');
    else if (streak > 0) lines.push('The streak shield is still ready this month - one missed day would be forgiven.');
    h += '<h4 style="margin:18px 0 6px">In a nutshell</h4><p class="pc-lead">' + lines.join(' ') + '</p>';
    return h;
  }


  /* ---------- topic levels, and how fast he reached them ---------- */
  function topicKeyOf(a) {
    if (a.topic) return a.topic;
    var id = String(a.id || '');
    if (id.indexOf('teach:') === 0) return id.slice(6);
    if (id.indexOf('daily:') === 0) return id.slice(6);
    if (id.indexOf('sess:') === 0) return id.slice(5);
    return null;
  }
  function paceFor(oc, key) {
    var atts = (oc.attempts || []).filter(function (a) { return topicKeyOf(a) === key; })
      .sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
    if (!atts.length) return null;
    var first = atts[0].ts || 0;
    var target = window.Levels ? Levels.of(oc, key) : 0;
    /* when did he first stand at the level he is at now? */
    var reached = first;
    for (var i = 0; i < atts.length; i++) {
      var slice = atts.slice(0, i + 1);
      var lv = 0, n = slice.length, right = 0;
      slice.forEach(function (x) { if (x.correct) right++; });
      var acc = n ? 100 * right / n : null;
      lv = n < 4 ? 1 : (acc >= 80 && n >= 6 ? 3 : (acc >= 60 ? 2 : 1));
      if (lv >= target) reached = atts[i].ts || reached;
    }
    var days = Math.max(0, (Date.now() - first) / 86400000);
    var toLevel = Math.max(0, ((reached || first) - first) / 86400000);
    return { questions: atts.length, days: days, toLevel: toLevel };
  }

  /* ---------- reasoning skills (Mind-Champ) ---------- */
  var REASON_NAMES = { analogies: 'Analogies', oddoneout: 'Odd one out', codes: 'Letter codes',
    series: 'Number series', patterns: 'Shape patterns', rotations: 'Rotations' };
  var REASON_LABEL = ['Not started', 'Getting it', 'Solid', 'Mastered'];
  function reasoningHTML() {
    var rec = {}, fromMatch = {};
    try { rec = JSON.parse(localStorage.getItem('gk_reason') || '{}') || {}; } catch (e) {}
    try {
      var mc = JSON.parse(localStorage.getItem('mc_state') || 'null');
      if (mc && mc.reason) fromMatch = mc.reason;
    } catch (e) {}
    var keys = Object.keys(REASON_NAMES);
    var any = keys.some(function (k) { return (rec[k] && rec[k].n) || (fromMatch[k] && fromMatch[k].done); });
    var h = '<h3>\ud83e\udde0 Reasoning skills (Mind-Champ)</h3>' +
      '<p class="pc-lead">The reasoning ladder and today\u2019s match together, so you can see which kind of thinking is solid and which needs a turn.' +
      (any ? '' : ' Nothing yet \u2014 the ladder lives in Mind-Champ under Learn.') + '</p>';
    keys.forEach(function (k) {
      var a = rec[k] || {}, b = fromMatch[k] || {};
      var n = (a.n || 0) + (b.done || 0);
      var right = (a.right || 0) + (b.right || 0);
      var acc = n ? Math.round(100 * right / n) : 0;
      var lv = !n ? 0 : (n < 4 ? 1 : (acc >= 80 && n >= 6 ? 3 : (acc >= 60 ? 2 : 1)));
      var colour = ['#94a3b8', '#92400e', '#1e40af', '#166534'][lv] || '#94a3b8';
      var bg = ['#f1f5f9', '#fef3c7', '#dbeafe', '#dcfce7'][lv] || '#f1f5f9';
      h += '<div class="pc-row"><b>' + esc(REASON_NAMES[k]) + '</b>' +
        '<span style="background:' + bg + ';color:' + colour + ';font-weight:800;border-radius:999px;padding:3px 10px;font-size:14px">' +
        (lv ? 'Level ' + lv + ' \u00b7 ' + REASON_LABEL[lv] : 'Not started') + '</span>' +
        '<span class="pc-meta">' + (n ? n + ' questions \u00b7 ' + acc + '% right' : 'no questions yet') + '</span></div>';
    });
    return h;
  }

  function levelsHTML(name, oc) {
    if (!window.Levels || !window.Batches) return '';
    var keys = Batches.list[0].topics;
    var h = '<h3>📈 Topic levels and pace</h3>' +
      '<p class="pc-lead">Where he is on each topic, and how quickly he got there. Level 1 is getting it, 2 is solid, 3 is mastered. A topic needs about 6 questions at 80 per cent to be mastered.</p>';
    keys.forEach(function (k) {
      var lv = Levels.of(oc, k), st = Levels.statsFor(oc, k), pace = paceFor(oc, k);
      var colour = ['#94a3b8', '#92400e', '#1e40af', '#166534'][lv] || '#94a3b8';
      var bg = ['#f1f5f9', '#fef3c7', '#dbeafe', '#dcfce7'][lv] || '#f1f5f9';
      h += '<div class="pc-row"><b>' + esc(Batches.nameOf(k)) + '</b>' +
        '<span style="background:' + bg + ';color:' + colour + ';font-weight:800;border-radius:999px;padding:3px 10px;font-size:14px">' +
        (lv ? 'Level ' + lv + ' · ' + Levels.label(lv) : 'Not started') + '</span>' +
        '<span class="pc-meta">' + (st.n ? st.n + ' questions · ' + st.acc + '% right' : 'no questions yet') + '</span>' +
        (pace && lv >= 2 ? '<span class="pc-meta">reached Level ' + lv + ' in ' + Math.max(1, Math.round(pace.toLevel)) + ' day' + (Math.round(pace.toLevel) === 1 ? '' : 's') + '</span>' : '') +
        '</div>';
    });
    return h;
  }
  /* ---------- the batch tracker: when to ask for the next eight ---------- */
  function batchesHTML(oc) {
    if (!window.Batches) return '';
    var cur = Batches.current(oc);
    var next = Batches.nextPlanned();
    var h = '<h3>📦 Topic batches</h3>' +
      '<p class="pc-lead">The topics are added eight at a time. When every topic in the current batch is mastered, ask for the next eight.</p>';
    if (cur) {
      var pct = Math.round(100 * cur.mastered / cur.total);
      h += '<div class="pc-stat"><b>' + cur.mastered + ' / ' + cur.total + '</b><span>mastered in batch ' + cur.n + '</span></div>' +
        '<div style="height:8px;border-radius:999px;background:#e2e8f0;overflow:hidden;margin:8px 0 12px"><div style="height:100%;width:' + pct + '%;background:#2a9d8f"></div></div>';
      h += cur.rows.map(function (r) {
        return '<div class="pc-row"><b>' + esc(r.name) + '</b><span class="pc-meta">' + (r.level ? 'Level ' + r.level : 'not started') +
          (r.questions ? ' · ' + r.questions + ' questions' : '') + '</span></div>';
      }).join('');
      if (cur.complete) {
        h += '<p class="pc-lead" style="background:#ecfdf5;border:1px solid #86efac;border-radius:12px;padding:12px;color:#166534;font-weight:800">' +
          '🎉 Batch ' + cur.n + ' is complete — every topic is mastered. Time to ask for the next batch.</p>';
      } else {
        h += '<p class="pc-lead">Still to master: ' + cur.rows.filter(function (r) { return r.level < 3; }).map(function (r) { return r.name; }).join(', ') + '.</p>';
      }
    }
    if (next) {
      h += '<p class="pc-lead" style="margin-top:14px"><b>Next batch (not built yet):</b> ' +
        next.topics.map(function (k) { return Batches.nameOf(k); }).join(' · ') + '</p>';
    }
    return h;
  }

  /* ---------- rendering ---------- */
  var current = '';
  /* ============================================================
     THE PICTURE - a graphic of the work, and a plain-English note
     on which skills are moving and which need more time.
     Reads every champ, the Homework Club included.
     ============================================================ */
  var HW_NAME = {
    bothsides: 'Fractions on both sides',
    addfractions: 'Two fractions of x added',
    wordproblem: 'Word problem hiding an equation',
    angles: 'Adjacent angles on a straight line',
    subfractions: 'Two fractions subtracted'
  };
  var WC_NAME = { spelling: 'Spelling', grammar: 'Grammar', punctuation: 'Punctuation',
                  comprehension: 'Comprehension', meanings: 'Word meanings' };

  function wordState(name) {
    var w = read('wc_state');
    if (!w) return null;
    if (name && (w.name || '').trim().toLowerCase() !== (name || '').trim().toLowerCase()) return null;
    return w;
  }

  function wordRows(name) {
    var w = wordState(name), rows = [];
    if (!w || !w.topics) return rows;
    Object.keys(w.topics).forEach(function (k) {
      var r = w.topics[k] || {}, n = r.n || 0, right = r.right || 0;
      if (!n) return;
      var acc = right / n;
      rows.push({ label: WC_NAME[k] || k, a: { n: n, acc: Math.round(acc * 100), t: 0, tg: 0, trend: 'flat',
        verdict: n < 5 ? 'starting' : (acc >= 0.8 ? 'strong' : (acc >= 0.6 ? 'practice' : 'struggle')), noSpeed: true } });
    });
    return rows;
  }

  function homeworkRows(oc) {
    var rows = [], groups = {}, order = [];
    ((oc && oc.attempts) || []).forEach(function (a) {
      if (a.kind !== 'homework') return;
      var tid = String(a.id || '').replace(/^hw:/, '') || 'other';
      if (!groups[tid]) { groups[tid] = []; order.push(tid); }
      groups[tid].push(a);
    });
    order.forEach(function (t) { rows.push({ label: HW_NAME[t] || t, a: analyse(groups[t]), key: 'hw:' + t }); });
    return rows;
  }

  /* ---------- bars ---------- */
  function barColor(a) {
    if (!a || !a.n) return '#d8cfbe';
    if (a.verdict === 'strong') return '#2e7d32';
    if (a.verdict === 'practice') return '#ef8f00';
    if (a.verdict === 'struggle') return '#c62828';
    return '#9c8f7a';
  }
  function barRow(label, pct, right, colour) {
    return '<div class="pc-bar"><div class="pc-bar-lab">' + esc(label) + '</div>' +
      '<div class="pc-bar-track"><div class="pc-bar-fill" style="width:' +
      Math.max(3, Math.min(100, Math.round(pct))) + '%;background:' + colour + '"></div></div>' +
      '<div class="pc-bar-val">' + esc(right) + '</div></div>';
  }
  function skillBar(r) {
    var a = r.a;
    if (!a || !a.n) {
      return '<div class="pc-bar"><div class="pc-bar-lab">' + esc(r.label) + '</div>' +
        '<div class="pc-bar-track"><div class="pc-bar-fill" style="width:3%;background:#d8cfbe"></div></div>' +
        '<div class="pc-bar-val">not tried yet</div></div>';
    }
    var tail = a.note ? a.note : (a.acc + '% \u00B7 ' + a.n + ' tries' +
      (a.trend === 'up' ? ' \u2197' : (a.trend === 'down' ? ' \u2198' : '')));
    return barRow(r.label, a.acc, tail, barColor(a));
  }

  /* ---------- the summary row per champ ---------- */
  function champSummary(name) {
    var oc = stateFor('math', name) || {}, sq = stateFor('science', name) || {},
        mc = stateFor('mind', name) || {}, sk = skFor(name) || {}, wc = wordState(name) || {};
    var att = (oc.attempts || []).filter(function (a) { return a.kind !== 'daily'; });
    var hw = att.filter(function (a) { return a.kind === 'homework'; });
    var math = att.filter(function (a) { return a.kind !== 'homework'; });
    var out = [];
    out.push({ icon: '\u26A1', name: 'Math-Champ', a: analyse(math), unit: 'questions' });
    out.push({ icon: '\uD83D\uDCD8', name: 'Homework Club', a: analyse(hw), unit: 'questions' });

    var q = sq.quiz || {}, sn = 0, sr = 0;
    Object.keys(q).forEach(function (w) { sn += (q[w].t || 0); sr += (q[w].s || 0); });
    out.push({ icon: '\uD83D\uDD2C', name: 'Science-Champ', unit: 'quiz questions',
      a: sn ? { n: sn, acc: Math.round(100 * sr / sn), verdict: sn < 5 ? 'starting' : (sr / sn >= 0.8 ? 'strong' : (sr / sn >= 0.6 ? 'practice' : 'struggle')), trend: 'flat' } : null });

    var wn = 0, wr = 0;
    Object.keys((wc.topics || {})).forEach(function (k) { wn += (wc.topics[k].n || 0); wr += (wc.topics[k].right || 0); });
    out.push({ icon: '\uD83D\uDCDD', name: 'Word-Champ', unit: 'questions',
      a: wn ? { n: wn, acc: Math.round(100 * wr / wn), verdict: wn < 5 ? 'starting' : (wr / wn >= 0.8 ? 'strong' : (wr / wn >= 0.6 ? 'practice' : 'struggle')), trend: 'flat' } : null });

    var cases = mc.cases || {}, closed = 0, started = 0;
    Object.keys(cases).forEach(function (k) { if (cases[k] && cases[k].done) closed++; if (((cases[k] || {}).used || []).length) started++; });
    out.push({ icon: '\uD83E\uDDE0', name: 'Mind-Champ', a: null, pct: closed * 10,
      unit: closed + ' of 10 cases closed \u00B7 ' + started + ' started' });

    var scenes = Object.keys((sk.scenes || {})).length, words = Object.keys((sk.words || {})).length;
    out.push({ icon: '\uD83E\uDE94', name: 'Samskritam-Champ', a: null, pct: Math.round(100 * scenes / 5),
      unit: scenes + ' of 5 conversations \u00B7 ' + words + ' words learned' });
    return out;
  }

  /* ---------- the two-week strip ---------- */
  function stripHTML() {
    var days = rhythmDays(), week = [], i, d, key;
    for (i = 13; i >= 0; i--) {
      d = new Date(Date.now() - i * 86400000);
      key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      week.push({ key: key, day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()], mins: Math.round(days[key] || 0) });
    }
    var max = 1;
    week.forEach(function (w) { if (w.mins > max) max = w.mins; });
    var html = '<div class="pc-strip">', total = 0, active = 0;
    week.forEach(function (w) {
      total += w.mins;
      if (w.mins > 0) active++;
      var t = w.mins / max;
      var shade = w.mins === 0 ? '#efe7d7' : 'rgba(46,125,50,' + (0.20 + 0.72 * t).toFixed(2) + ')';
      html += '<div class="pc-strip-day" title="' + w.key + ' \u00B7 ' + w.mins + ' minutes">' +
        '<div class="pc-strip-sq" style="background:' + shade + '"></div><span>' + w.day + '</span></div>';
    });
    html += '</div>';
    html += '<p class="pc-meta" style="margin-top:8px">' + total + ' minutes of learning-clock time across ' +
      active + ' of the last 14 days. Darker squares are longer days.</p>';
    return html;
  }

  /* ---------- the note ---------- */
  function noteHTML(groups, hwRows) {
    var every = [], all = [], progress = [];
    groups.forEach(function (g) {
      g.rows.forEach(function (r) {
        if (!r.a || !r.a.n) return;
        var row = { label: r.label, champ: g.title, a: r.a };
        every.push(row);
        /* a row that carries its own wording measures how far he has got, not
           how often he is right, so it must never be called his weakest skill */
        if (r.a.note) progress.push(row); else all.push(row);
      });
    });
    if (!every.length) {
      return '<div class="pc-empty">Nothing recorded on this device yet. Once Atharv has done a few sessions, ' +
        'this page fills itself in \u2014 no setting up needed.</div>';
    }
    var h = '<div class="pc-note">';
    var up = all.filter(function (x) { return x.a.trend === 'up' || (x.a.acc >= 85 && x.a.n >= 5); })
                .sort(function (a, b) { return b.a.acc - a.a.acc; }).slice(0, 3);
    var down = all.filter(function (x) { return x.a.verdict === 'struggle' || x.a.verdict === 'practice'; })
                  .sort(function (a, b) { return a.a.acc - b.a.acc; }).slice(0, 3);
    if (up.length) {
      h += '<p><b>\u2705 Getting stronger:</b> ' + up.map(function (x) {
        return esc(x.label) + ' in ' + esc(x.champ) + ' (' + x.a.acc + '%)'; }).join(' \u00B7 ') +
        '. These are holding up after practice, so they can be left alone for now.</p>';
    }
    if (down.length) {
      h += '<p><b>\uD83C\uDFAF Needs more time:</b> ' + down.map(function (x) {
        return esc(x.label) + ' in ' + esc(x.champ) + ' (' + x.a.acc + '%)'; }).join(' \u00B7 ') +
        '. Right often enough to keep going, but not yet quick or sure.</p>';
    }
    if (hwRows && hwRows.length) {
      var solid = hwRows.filter(function (r) { return r.a && r.a.n && r.a.acc >= 80; });
      var shaky = hwRows.filter(function (r) { return r.a && r.a.n && r.a.acc < 80; })
                        .sort(function (a, b) { return a.a.acc - b.a.acc; });
      var line = '';
      if (solid.length) line += 'Solid on ' + solid.map(function (r) { return esc(r.label); }).join(', ') + '. ';
      if (shaky.length) line += 'Worth another round on ' + shaky.map(function (r) { return esc(r.label) + ' (' + r.a.acc + '%)'; }).join(', ') + '.';
      if (line) h += '<p><b>\uD83D\uDCD8 Homework Club:</b> ' + line + '</p>';
    }
    if (progress.length) {
      h += '<p><b>\uD83D\uDCDA Where he has got to:</b> ' + progress.map(function (x) {
        return esc(x.label) + ' \u2014 ' + esc(x.a.note); }).join(' \u00B7 ') + '. This is ground covered, not a score.</p>';
    }
    var done = every.reduce(function (s, x) { return s + x.a.n; }, 0);
    if (all.length) {
      var weakest = all.slice().sort(function (a, b) { return a.a.acc - b.a.acc; })[0];
      h += '<p><b>\u25B6 Do this next:</b> give 15 minutes to <b>' + esc(weakest.label) + '</b> in ' +
        esc(weakest.champ) + ' \u2014 at ' + weakest.a.acc + '% it is the weakest skill on this page right now. ' +
        'Everything here is drawn from ' + done + ' recorded answers.</p>';
    } else {
      h += '<p><b>\u25B6 Do this next:</b> there is not enough marked work yet to name a weak spot. ' +
        'A few sessions will give this page something to measure. ' + done + ' answers recorded so far.</p>';
    }
    h += '</div>';
    return h;
  }

  /* ---------- assemble the page ---------- */
  function pictureHTML(name) {
    var oc = stateFor('math', name) || {};
    var math = mathRows(oc).filter(function (r) { return String(r.key || '').indexOf('hw:') !== 0; });
    var hw = homeworkRows(oc);
    var sci = scienceRows(stateFor('science', name));
    var mind = mindRows(stateFor('mind', name));
    var word = wordRows(name);
    var champs = champSummary(name);
    var sk = skFor(name) || {};
    var skRows = [];
    var nScenes = Object.keys(sk.scenes || {}).length, nWords = Object.keys(sk.words || {}).length;
    if (nScenes) skRows.push({ label: 'Conversations read', a: { n: nScenes, acc: Math.round(100 * nScenes / 5),
      verdict: nScenes >= 4 ? 'strong' : (nScenes >= 2 ? 'practice' : 'starting'), trend: 'flat',
      note: nScenes + ' of 5 read' } });
    if (nWords) skRows.push({ label: 'Words in the Shabda-Kosha', a: { n: nWords, acc: Math.min(100, Math.round(100 * nWords / 33)),
      verdict: nWords >= 20 ? 'strong' : (nWords >= 8 ? 'practice' : 'starting'), trend: 'flat',
      note: nWords + ' words learned' } });
    sci = sci.map(function (r) { return { label: r.label.charAt(0).toUpperCase() + r.label.slice(1), a: r.a }; });
    mind = mind.map(function (r) {
      var a = r.a || {};
      var note = a.n + '/5 puzzles' + (a.stars !== undefined ? ' \u00B7 ' + a.stars + '\u2B50' : '') + (a.done ? ' \u00B7 case closed' : '');
      return { label: r.label, a: { n: a.n, acc: a.acc, t: 0, tg: 0, trend: 'flat', verdict: a.verdict, note: note } };
    });

    var h = '<p class="pc-lead">Everything recorded on this device for <b>' + esc(name) + '</b>, drawn as a picture. ' +
      'Each bar is how often he gets it right; a longer bar is better. Green is strong, amber needs practice, red needs help.</p>';

    h += '<h3>\uD83D\uDCCA Where the work is going</h3>';
    champs.forEach(function (c) {
      if (c.a && c.a.n) {
        h += barRow(c.icon + ' ' + c.name, c.a.acc, c.a.acc + '% right \u00B7 ' + c.a.n + ' ' + c.unit, barColor(c.a));
      } else {
        h += barRow(c.icon + ' ' + c.name, c.pct || 3, c.unit, c.pct ? '#7e57c2' : '#d8cfbe');
      }
    });

    h += '<h3>\uD83D\uDCC5 The last two weeks</h3>' + stripHTML();

    var groups = [
      { title: 'Math-Champ', rows: math },
      { title: 'Homework Club', rows: hw },
      { title: 'Science-Champ', rows: sci },
      { title: 'Word-Champ', rows: word },
      { title: 'Mind-Champ', rows: mind },
      { title: 'Samskritam-Champ', rows: skRows }
    ];
    h += '<h3>\uD83E\uDDED Skill by skill</h3>';
    var any = false;
    groups.forEach(function (g) {
      if (!g.rows.length) return;
      any = true;
      h += '<div class="pc-grouphead">' + esc(g.title) + '</div>' + g.rows.map(skillBar).join('');
    });
    if (!any) h += '<div class="pc-empty">No skill detail recorded yet.</div>';

    h += '<h3>\uD83D\uDCDD What this says</h3>' + noteHTML(groups, hw);
    return h;
  }

  /* ============================================================
     HOMEWORK ASSIGNMENTS - added by the parent, read by the child's
     Homework Club. Stored under the same key homework.js reads.
     ============================================================ */
  var HWA_KEY = 'gk_hw_assignments';
  var HWA_TYPES = [
    { id: 'bothsides', name: 'Fractions on both sides' },
    { id: 'addfractions', name: 'Two fractions of x added' },
    { id: 'wordproblem', name: 'A word problem hiding an equation' },
    { id: 'angles', name: 'Adjacent angles on a straight line' },
    { id: 'subfractions', name: 'Two fractions subtracted' }
  ];
  function hwaRead() {
    try {
      var raw = JSON.parse(localStorage.getItem(HWA_KEY));
      if (raw && raw.length) return raw;
    } catch (e) {}
    return [{ id: 'a-2026-10-01', topic: 'Linear equations', given: '2026-10-01',
              types: ['bothsides', 'addfractions', 'wordproblem', 'angles', 'subfractions'] }];
  }
  function hwaWrite(list) { try { localStorage.setItem(HWA_KEY, JSON.stringify(list || [])); } catch (e) {} }
  function hwaDate(iso) {
    var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return String(iso || '');
    var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return (+m[3]) + ' ' + mo[(+m[2]) - 1] + ' ' + m[1];
  }
  function renderHW() {
    var host = el('pc-hw');
    if (!host) return;
    var list = hwaRead();
    var today = (function () { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })();
    var h = '<p class="pc-lead">What the maths teacher actually set. Each one appears in Atharv\'s Homework Club, where he ticks the ones he wants and chooses 15 minutes, 30 minutes, an hour, or to be taught it.</p>';
    h += '<div style="background:#fffdf7;border:1.5px solid rgba(43,38,32,.12);border-radius:14px;padding:14px 16px;margin:0 0 16px">' +
      '<b style="font-size:17px">Add an assignment</b>' +
      '<div style="margin:10px 0 6px"><label style="font-weight:700;font-size:15px">Topic &nbsp;</label>' +
      '<input id="hwa-topic" type="text" placeholder="e.g. Linear equations" style="font:600 16px inherit;padding:9px 12px;border-radius:10px;border:2px solid rgba(43,38,32,.25);min-width:250px"></div>' +
      '<div style="margin:6px 0 10px"><label style="font-weight:700;font-size:15px">Date given &nbsp;</label>' +
      '<input id="hwa-given" type="date" value="' + today + '" style="font:600 16px inherit;padding:9px 12px;border-radius:10px;border:2px solid rgba(43,38,32,.25)"></div>' +
      '<div style="margin:0 0 10px"><b style="font-size:15px">Which kinds of question</b><div style="margin-top:6px">' +
      HWA_TYPES.map(function (t) {
        return '<label style="display:inline-block;font-size:15px;font-weight:600;margin:0 14px 6px 0">' +
          '<input type="checkbox" class="hwa-t" value="' + t.id + '" checked> ' + esc(t.name) + '</label>';
      }).join('') + '</div></div>' +
      '<button class="pc-tab" onclick="PC.addHW()" style="border-color:#2e7d32;background:linear-gradient(135deg,#f1f8e9,#fffdf7)">Add this assignment</button>' +
      '<span id="hwa-msg" style="margin-left:12px;font-weight:700;color:#2e7d32"></span></div>';
    h += list.length ? list.map(function (a) {
      return '<div class="pc-row"><b>' + esc(a.topic) + '</b><span class="pc-meta">given ' + esc(hwaDate(a.given)) + ' \u00b7 ' +
        (a.types || []).length + ' kinds</span>' +
        '<button class="pc-tab" style="margin-left:auto;font-size:14px;padding:6px 12px" onclick="PC.delHW(\'' + a.id + '\')">Remove</button></div>';
    }).join('') : '<div class="pc-empty">No assignments yet \u2014 add the first one above.</div>';
    host.innerHTML = h;
  }

  function renderAll() {
    var names = childNames();
    if (!names.length) names = ['Champion'];
    if (!current || names.indexOf(current) < 0) current = names[0];
    var sel = el('pc-child');
    if (sel) sel.innerHTML = names.map(function (n) { return '<option' + (n === current ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('');

    var oc = stateFor('math', current);
    var sq = stateFor('science', current);
    var mc = stateFor('mind', current);
    var math = mathRows(oc || { attempts: [] });
    var sci = scienceRows(sq);
    var mind = mindRows(mc);

    var pic2 = el('pc-picture');
    if (pic2) pic2.innerHTML = pictureHTML(current);

    var ins = el('pc-insights');
    if (ins) {
      var h = '<p class="pc-lead">Read from the last attempts on this device. <b>Strong</b> = accurate and quick enough · <b>Needs practice</b> = right often enough but not yet fluent · <b>Struggling</b> = below 60% after 5+ tries. The arrow shows whether it is getting better or worse <i>after</i> practice.</p>';
      h += '<h3>⚡ Math-Champ</h3>';
      h += math.length ? math.map(mathRowHTML).join('') : '<div class="pc-empty">No maths attempts yet.</div>';
      h += '<h3>🔬 Science-Champ</h3>';
      h += sci.length ? sci.map(function (r) { return rowHTML(r.label, r.a, r.a && r.a.visited ? '<span class="pc-meta">visited, not quizzed yet</span>' : ''); }).join('') : '<div class="pc-empty">No science quizzes yet.</div>';
      h += '<h3>🧠 Mind-Champ</h3>';
      h += mind.length ? mind.map(function (r) {
        var extra = r.a && r.a.stars !== undefined ? '<span class="pc-meta">' + r.a.n + '/5 puzzles · ' + r.a.stars + '⭐' + (r.a.done ? ' · case closed' : '') + '</span>' : '';
        return rowHTML(r.label, r.a, extra);
      }).join('') : '<div class="pc-empty">No Mind-Champ cases started yet.</div>';
      if (oc) { h += levelsHTML(current, oc); h += batchesHTML(oc); h += reasoningHTML(); }
      ins.innerHTML = h;
    }

    var sig = el('pc-signals');
    if (sig) sig.innerHTML = signalHTML(current);

    var plan = el('pc-plan');
    if (plan) {
      var recs = pick3(current, math, sci, mind);
      var h2 = '<h3>🎯 Three things to do this week</h3><div class="pc-recs">';
      recs.forEach(function (r) { h2 += '<div class="pc-rec"><span class="pc-rec-icon">' + r.icon + '</span><div><b>' + esc(r.title) + '</b><p>' + r.body + '</p></div></div>'; });
      h2 += '</div><h3>📨 Weekly digest</h3>' + digest(current, math, sci, mind);
      plan.innerHTML = h2;
    }
  }


  /* ---------- players on this device ---------- */
  function allProfiles() {
    var out = [];
    var ocs = read('oc_profiles') || {}, oc = read('oc_state');
    if (oc && oc.name) ocs[(oc.name || '').trim().toLowerCase()] = oc;
    for (var k in ocs) out.push({ champ: 'Maths', name: (ocs[k] || {}).name || k, xp: (ocs[k] || {}).xp || 0, store: 'oc', key: k });
    var mcs = read('mc_profiles') || {}, mc = read('mc_state');
    if (mc && mc.name) mcs[(mc.name || '').trim().toLowerCase()] = mc;
    for (var k2 in mcs) out.push({ champ: 'Mind', name: (mcs[k2] || {}).name || k2, xp: (mcs[k2] || {}).xp || 0, store: 'mc', key: k2 });
    var sq = read('sq_v3') || {}, sp = sq.profiles || {};
    for (var k3 in sp) out.push({ champ: 'Science', name: (sp[k3] || {}).name || k3, xp: (sp[k3] || {}).xp || 0, store: 'sq', key: k3, current: (k3 === sq.current) });
    var sks = read('sk_profiles') || {}, skst = read('sk_state');
    if (skst && skst.name) sks[(skst.name || '').trim().toLowerCase()] = skst;
    for (var k4 in sks) out.push({ champ: 'Sanskrit', name: (sks[k4] || {}).name || k4, xp: (sks[k4] || {}).xp || 0, store: 'sk', key: k4 });
    var cur = '';
    try { cur = (localStorage.getItem('cc_name') || '').trim(); } catch (e) {}
    out.forEach(function (r) { r.isCurrent = (r.name || '').trim().toLowerCase() === cur.toLowerCase(); });
    return out;
  }

  function renamePlayer(store, key, oldName) {
    var nn = window.prompt('New name for ' + oldName + '?\n\nTheir progress stays with them.', oldName);
    if (!nn || !nn.trim()) return;
    nn = nn.trim().slice(0, 20);
    var i;
    if (store === 'oc') { var ocs = read('oc_profiles') || {}, oc = read('oc_state'); if (oc && (oc.name || '') === oldName) { oc.name = nn; localStorage.setItem('oc_state', JSON.stringify(oc)); } if (ocs[key]) { ocs[key].name = nn; localStorage.setItem('oc_profiles', JSON.stringify(ocs)); } }
    if (store === 'mc') { var mcs = read('mc_profiles') || {}, mc = read('mc_state'); if (mc && (mc.name || '') === oldName) { mc.name = nn; localStorage.setItem('mc_state', JSON.stringify(mc)); } if (mcs[key]) { mcs[key].name = nn; localStorage.setItem('mc_profiles', JSON.stringify(mcs)); } }
    if (store === 'sq') { var sq = read('sq_v3') || {}; if (sq.profiles && sq.profiles[key]) { sq.profiles[key].name = nn; localStorage.setItem('sq_v3', JSON.stringify(sq)); } }
    try { if ((localStorage.getItem('cc_name') || '') === oldName) localStorage.setItem('cc_name', nn); } catch (e) {}
    renderPlayers();
  }


  /* ---------- delete a learner completely (all champs) ---------- */
  function namesOnDevice() {
    var seen = {}, out = [];
    allProfiles().forEach(function (r) { var k = (r.name || '').trim().toLowerCase(); if (k && !seen[k]) { seen[k] = 1; out.push(r.name); } });
    return out;
  }

  function deletePlayer(name) {
    name = String(name || '').trim();
    if (!name) return;
    var lv = name.toLowerCase();
    var typed = window.prompt('Delete ' + name + ' completely?\n\nThis removes ALL of ' + name + "'s progress in every champ on this device (maths, science, mind and Sanskrit). If cloud sync is set up, the deletion also spreads to your other devices on their next sync.\n\nThis CANNOT be undone. Type the name exactly to confirm:", '');
    if (typed === null) return;
    if (String(typed).trim().toLowerCase() !== lv) { window.alert('The name did not match, so nothing was deleted.'); return; }

    /* maths */
    var ocs = read('oc_profiles') || {}, oc = read('oc_state');
    delete ocs[lv];
    localStorage.setItem('oc_profiles', JSON.stringify(ocs));
    if (oc && (oc.name || '').trim().toLowerCase() === lv) localStorage.removeItem('oc_state');

    /* mind */
    var mcs = read('mc_profiles') || {}, mc = read('mc_state');
    delete mcs[lv];
    localStorage.setItem('mc_profiles', JSON.stringify(mcs));
    if (mc && (mc.name || '').trim().toLowerCase() === lv) localStorage.removeItem('mc_state');

    /* science */
    var sq = read('sq_v3') || {}, sp = sq.profiles || {}, keep = {}, removed = false;
    for (var k in sp) { if ((sp[k].name || '').trim().toLowerCase() === lv) removed = true; else keep[k] = sp[k]; }
    if (removed) {
      sq.profiles = keep;
      var ids = Object.keys(keep);
      if (!ids.length) localStorage.removeItem('sq_v3');
      else { if (!keep[sq.current]) sq.current = ids[0]; localStorage.setItem('sq_v3', JSON.stringify(sq)); }
    }

    /* samskritam */
    var sks = read('sk_profiles') || {}, sk = read('sk_state');
    delete sks[lv];
    localStorage.setItem('sk_profiles', JSON.stringify(sks));
    if (sk && (sk.name || '').trim().toLowerCase() === lv) localStorage.removeItem('sk_state');

    /* a tombstone, so no cloud merge can bring them back */
    try {
      if (window.ChampSync && ChampSync.markDeleted) ChampSync.markDeleted(name);
      else { var d = read('gk_deleted') || {}; d[lv] = Date.now(); localStorage.setItem('gk_deleted', JSON.stringify(d)); }
    } catch (e) {}

    /* if that was the active player, hand over to someone else (or clear the name) */
    var cc = '';
    try { cc = (localStorage.getItem('cc_name') || '').trim(); } catch (e) {}
    if (cc.toLowerCase() === lv) {
      var others = namesOnDevice();
      try {
        if (others.length) localStorage.setItem('cc_name', others[0]);
        else localStorage.removeItem('cc_name');
      } catch (e) {}
    }

    renderPlayers();
    if (typeof window.GK_SYNC_NOW === 'function') { try { window.GK_SYNC_NOW(); } catch (e) {} }
    window.alert(name + ' was deleted from every champ on this device. If cloud sync is set up, tap Sync now so your other devices remove them too.');
  }

  function renderPlayers() {
    var host = el('pc-players');
    if (!host) return;
    var rows = allProfiles();
    if (!rows.length) { host.innerHTML = '<div class="pc-empty">No players yet — the first name typed on the Gurukool home page creates one.</div>'; return; }
    var h = '<p class="pc-lead">Every name on this device keeps its own progress. <b>Rename</b> keeps that player\'s XP, stars and notes. <b>Delete</b> removes them from every champ on this device — permanently, and it also spreads to your other devices on their next sync. To <b>switch</b> players, type the name on the Gurukool home page.</p>';
    h += rows.map(function (r) {
      return '<div class="pc-row"><b>' + esc(r.name) + '</b><span class="pc-meta">' + esc(r.champ) + ' · ' + r.xp + ' XP</span>' +
        (r.isCurrent ? '<span style="background:#e8f5e9;color:#047857;font-weight:800;border-radius:999px;padding:3px 10px;font-size:14.5px">▶ current player</span>' : '') +
        '<button class="gk-mini" style="margin-left:auto" onclick="ParentConsole.rename(\'' + r.store + '\',\'' + String(r.key).replace(/'/g, "") + '\',\'' + String(r.name).replace(/'/g, "") + '\')">✏️ rename</button>' +
        '<button class="gk-mini" style="background:#fdecea;border-color:#e57373;color:#b71c1c" onclick="ParentConsole.del(\'' + String(r.name).replace(/'/g, "") + '\')">🗑️ delete</button></div>';
    }).join('');
    host.innerHTML = h;
  }

  window.ParentConsole = { render: renderAll, rename: renamePlayer, del: deletePlayer, players: allProfiles, names: namesOnDevice, setChild: function (n) { current = n; renderAll(); } };

  /* ---------- wire into admin.html ---------- */
  window.PC = window.PC || {};
  window.PC.addHW = function () {
    var topic = (el('hwa-topic') && el('hwa-topic').value || '').trim();
    var given = (el('hwa-given') && el('hwa-given').value) || '';
    var types = [].slice.call(document.querySelectorAll('.hwa-t'))
      .filter(function (c) { return c.checked; })
      .map(function (c) { return c.value; });
    if (!topic) { if (el('hwa-msg')) el('hwa-msg').textContent = 'Give it a topic name first.'; return; }
    if (!types.length) { if (el('hwa-msg')) el('hwa-msg').textContent = 'Tick at least one kind of question.'; return; }
    var list = hwaRead();
    list.push({ id: 'a-' + (given || 'x') + '-' + Math.random().toString(36).slice(2, 6), topic: topic, given: given, types: types });
    hwaWrite(list);
    renderHW();
    if (el('hwa-msg')) el('hwa-msg').textContent = 'Added. It is in the Homework Club now.';
  };
  window.PC.delHW = function (id) {
    hwaWrite(hwaRead().filter(function (a) { return a.id !== id; }));
    renderHW();
  };

  function build() {
    var content = el('admin-content');
    if (!content || el('pc-tabs')) return;
    /* move the existing admin blocks into a Setup pane */
    var setup = document.createElement('div');
    setup.id = 'pc-pane-setup';
    while (content.firstChild) setup.appendChild(content.firstChild);

    var tabs = document.createElement('div');
    tabs.id = 'pc-tabs';
    tabs.innerHTML = '<button class="pc-tab on" data-p="picture">📊 Picture</button>' +
      '<button class="pc-tab" data-p="setup">⚙️ Setup</button>' +
      '<button class="pc-tab" data-p="insights">🧠 Insights</button>' +
      '<button class="pc-tab" data-p="signals">💬 Signals</button>' +
      '<button class="pc-tab" data-p="plan">🎯 This week\'s plan</button>';

    var pic = document.createElement('div');
    pic.id = 'pc-pane-picture';
    pic.className = 'pc-pane';
    pic.innerHTML = '<div class="pc-childrow">Child: <select id="pc-child"></select></div><div id="pc-picture"></div>';

    var head = document.createElement('div');
    head.id = 'pc-pane-insights';
    head.className = 'pc-pane';
    head.style.display = 'none';
    head.innerHTML = '<div id="pc-insights"></div>';
    var sig = document.createElement('div');
    sig.id = 'pc-pane-signals';
    sig.className = 'pc-pane';
    sig.style.display = 'none';
    sig.innerHTML = '<div id="pc-signals"></div>';
    var plan = document.createElement('div');
    plan.id = 'pc-pane-plan';
    plan.className = 'pc-pane';
    plan.style.display = 'none';
    plan.innerHTML = '<div id="pc-plan"></div>';
    setup.className = 'pc-pane';
    setup.style.display = 'none';

    var playersCard = document.createElement('div');
    playersCard.innerHTML = '<h2>👥 Players on this device</h2><div id="pc-players"></div>';
    content.appendChild(tabs);
    setup.insertBefore(playersCard, setup.firstChild);
    var hwCard = document.createElement('div');
    hwCard.innerHTML = '<h2>\ud83d\udcd8 Homework assignments</h2><div id="pc-hw"></div>';
    setup.insertBefore(hwCard, playersCard.nextSibling);
    content.appendChild(pic);
    content.appendChild(setup);
    content.appendChild(head);
    content.appendChild(sig);
    content.appendChild(plan);

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.pc-tab') : null;
      if (!b) return;
      var p = b.getAttribute('data-p');
      [].forEach.call(tabs.querySelectorAll('.pc-tab'), function (x) { x.classList.toggle('on', x === b); });
      ['picture', 'setup', 'insights', 'signals', 'plan'].forEach(function (k) {
        var pane = el('pc-pane-' + k);
        if (pane) pane.style.display = (k === p) ? 'block' : 'none';
      });
      if (p !== 'setup') renderAll();
    });
    var childSel = el('pc-child');
    if (childSel) childSel.addEventListener('change', function () { current = childSel.value; renderAll(); });

    renderPlayers();
    renderHW();
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
