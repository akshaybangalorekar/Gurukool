/* ============================================================
   SCIENCE-CHAMP · FOR CURIOUS MINDS (Phase 4)
   Book recommendations — deliberately RARE. They appear only when
   a world is truly mastered (or the child has asked 3+ questions
   in it), and only once per world per month. Each one says WHY.
   Shown-log is device-local (a display setting, not progress).
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'gk_books';
  var MONTH = 30 * 86400000;

  /* widely available, age-appropriate picks (DK / Horrible Science / Usborne and friends) */
  var PICKS = {
    physics:      { t: 'The Way Things Work Now', a: 'David Macaulay', why: 'Levers, gears, pulleys and forces — drawn so clearly that you can SEE how a machine works. Perfect after the physics world.' },
    elec:         { t: 'Horrible Science: Shocking Electricity', a: 'Nick Arnold', why: 'Circuits, shocks and static — with jokes. Explains exactly why a charger warms up.' },
    light:        { t: 'Super Simple Physics', a: 'DK', why: 'Light, sound and waves with big pictures and short explanations — easy to dip into.' },
    heat:         { t: 'Super Simple Physics', a: 'DK', why: 'Energy and heat flow explained in pictures — the bouncing-ball mystery, solved.' },
    chem:         { t: 'Horrible Science: Chemical Chaos', a: 'Nick Arnold', why: 'Reactions, mixtures and the odd explosion (safely explained).' },
    kitchen:      { t: 'Super Simple Chemistry', a: 'DK', why: 'The science of everyday things — turn your kitchen into a lab.' },
    materials:    { t: 'The Way Things Work Now', a: 'David Macaulay', why: 'Why some things bend and others snap — materials made visible.' },
    bio:          { t: 'Kay\'s Anatomy', a: 'Adam Kay', why: 'The human body, funny and factual — guts, blood and brains without the boring bits.' },
    body:         { t: 'Kay\'s Anatomy', a: 'Adam Kay', why: 'Your own body explained with jokes — the perfect follow-up to the Human Body Factory.' },
    genetics:     { t: 'Horrible Science: Evolve or Die', a: 'Phil Gates', why: 'Genes, evolution and why you look like your family.' },
    earth:        { t: 'The Mysteries of the Universe', a: 'DK', why: 'Our planet and everything beyond it, in glorious pictures.' },
    sky:          { t: 'George\'s Secret Key to the Universe', a: 'Lucy & Stephen Hawking', why: 'A real adventure that explains space as the story goes — written with a great physicist.' },
    flight:       { t: 'George\'s Cosmic Treasure Hunt', a: 'Lucy & Stephen Hawking', why: 'Rockets, planets and space travel inside an exciting story.' },
    scientists:   { t: 'George\'s Secret Key to the Universe', a: 'Lucy & Stephen Hawking', why: 'Real science through a story — you will meet the ideas great scientists found.' },
    coding:       { t: 'Coding Games in Scratch', a: 'DK', why: 'Build your own game, step by step — and you will understand algorithms for good.' },
    robotics:     { t: 'Coding Games in Scratch', a: 'DK', why: 'Every robot is instructions in order. Build a game and you have built a robot\'s brain.' },
    ai:           { t: 'Coding Games in Scratch', a: 'DK', why: 'Start with games; then computers doing clever things will make sense.' },
    quantum:      { t: 'What If?', a: 'Randall Munroe', why: 'Silly questions answered with real science — the same thinking quantum physics needs.' },
    logic:        { t: 'What If?', a: 'Randall Munroe', why: 'Wild questions, careful reasoning — logic practice disguised as fun.' },
    vedic:        { t: 'The Way Things Work Now', a: 'David Macaulay', why: 'Ancient ideas and modern machines both come down to forces and patterns.' }
  };

  function log() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function profile() {
    try {
      var sq = JSON.parse(localStorage.getItem('sq_v3'));
      if (!sq || !sq.profiles) return null;
      var nm = (localStorage.getItem('cc_name') || '').trim().toLowerCase();
      var pid = null;
      if (nm) Object.keys(sq.profiles).forEach(function (k) { if ((sq.profiles[k].name || '').toLowerCase() === nm) pid = k; });
      return sq.profiles[pid || sq.current || 'p1'] || null;
    } catch (e) { return null; }
  }

  function eligible() {
    var p = profile(); if (!p) return [];
    var seen = log(), now = Date.now(), out = [];
    var quiz = p.quiz || {}, doubts = p.doubts || [];
    var doubtCount = {};
    doubts.forEach(function (d) { doubtCount[d.w] = (doubtCount[d.w] || 0) + 1; });
    Object.keys(PICKS).forEach(function (w) {
      if (seen[w] && (now - seen[w]) < MONTH) return;
      var q = quiz[w] || {};
      var mastered = (q.t >= 5 && (q.s / q.t) >= 0.8);
      var curious = (doubtCount[w] || 0) >= 3;
      if (mastered || curious) out.push({ world: w, pick: PICKS[w], mastered: mastered, curious: curious });
    });
    return out;
  }

  function card() {
    var list = eligible();
    if (!list.length) return '';
    var best = list[0];
    var h = '<div style="background:linear-gradient(135deg,#fff8e1,#fffdf7 70%);border:2px solid #e0a25e;border-radius:16px;padding:14px 16px;margin:0 0 16px">' +
      '<p style="font-weight:800;margin:0 0 6px;font-size:1.05rem">📚 For curious minds</p>' +
      '<p style="margin:0 0 6px;line-height:1.5">' + (best.mastered ? 'You mastered <b>' : 'You have been asking great questions in <b>') +
      (WORLDNAME[best.world] || best.world) + '</b>. If you want more, ask a parent about this book:</p>' +
      '<p style="margin:0 0 4px;line-height:1.5"><b>' + best.pick.t + '</b> — ' + best.pick.a + '</p>' +
      '<p style="margin:0;color:#7a6f60;line-height:1.5"><b>Why this one:</b> ' + best.pick.why + '</p>' +
      '<p style="margin:8px 0 0;color:#7a6f60;font-size:14px">Books are optional and rare on purpose — they only appear when a world is truly mastered or you have asked a lot of questions about it.</p>' +
      '</div>';
    var l = log();
    l[best.world] = Date.now();
    save(l);
    return h;
  }

  var WORLDNAME = { physics: 'Physics Lab', flight: 'Flight & Space', chem: 'Chemistry Corner', bio: 'The Living World', logic: 'Logic Dojo', elec: 'Electricity & Magnetism', light: 'Light & Sound', heat: 'Heat & Energy Flow', body: 'Human Body Factory', earth: 'Earth & Weather', ai: 'Internet & AI', materials: 'Materials Lab', sky: 'Skywatcher', scientists: 'Great Scientists', kitchen: 'Kitchen Science', coding: 'Coding Camp', robotics: 'Robots & Drones', quantum: 'Quantum Realm', genetics: 'Genetics & Life Code', vedic: 'Vedic Science' };

  window.GK_BOOKS = { picks: PICKS, card: card, eligible: eligible, KEY: KEY };
})();
