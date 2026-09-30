/* ============================================================
   MATH-CHAMP · EUREKA MOMENTS (Phase 4)
   Rare real-world popups: when a topic is genuinely mastered,
   ONCE per topic per month, show how that maths lives in the
   real world — plus a "go see it yourself" micro-mission.
   Deliberately rare: if it popped up often, it would be ignored.
   The shown-log is device-local (a display setting, not progress).
   ============================================================ */

(function () {
  'use strict';

  var KEY = 'gk_eureka';          /* { topicId: lastShownTimestamp } */
  var MONTH = 30 * 86400000;

  var MOMENTS = {
    frac: { icon: '🏏', title: 'Fractions run cricket',
      body: 'An over has 6 balls — so 4.3 overs means 4 full overs and 3 more balls. The number after the dot is not a decimal here; it is a fraction of an over!',
      mission: 'Tonight, watch one over and count the balls out loud. You are already reading fractions in the score.' },
    pct: { icon: '🏷️', title: 'Percentages are shop discounts',
      body: 'A 25% OFF tag is the same as one quarter off. A ₹800 jacket drops by ₹200 — and the fastest way to spot it is 25% = ₹2 for every ₹8.',
      mission: 'Next shopping trip, find one discount tag and work out the saving in your head before the counter does.' },
    mult: { icon: '🥚', title: 'Multiplication is everywhere you look',
      body: 'An egg tray is 2 × 5. A calendar is 7 columns of weeks. A tile wall is rows × columns. Nobody counts eggs one by one — they count groups.',
      mission: 'Count something at home in groups instead of one by one (tiles, eggs, chairs) and tell your guru the two numbers you multiplied.' },
    div: { icon: '🍕', title: 'Division is sharing fairly',
      body: 'Six people, one pizza: each gets 1 ÷ 6. That is division and fractions saying the same thing.',
      mission: 'At the next meal, cut the roti or pizza yourself and announce the fraction each person gets.' },
    time: { icon: '🚌', title: 'Time maths keeps the world on schedule',
      body: 'Buses, trains, cricket overs and cooking all run on the same arithmetic: start time + duration, with minutes rolling over at 60 — never 5:75.',
      mission: 'Plan our next outing: read a bus or train timetable and tell me what time we must leave.' },
    pattern: { icon: '🌀', title: 'Patterns are the secret language',
      body: 'Rangoli, floor tiles, the seasons, your own breathing — patterns repeat. Spot the repeat and you can predict the 100th item without counting to it.',
      mission: 'Find a repeating pattern at home and work out what comes 10 steps later.' },
    word: { icon: '🔍', title: 'Word problems are detective stories',
      body: 'Every word problem hides a fact and hides a trap. The trick is to find what is really being asked before touching the numbers.',
      mission: 'At dinner, tell me one problem you met in real life today — and which fact solved it.' },
    sense: { icon: '🧮', title: 'Estimate first, calculate second',
      body: 'Good mathematicians guess the size of the answer before working it out — that is how they catch mistakes instantly.',
      mission: 'Guess the bill at the next shop, then check how close you were.' }
  };

  function shownLog() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function saveLog(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function masteredTopics(S) {
    /* a topic counts as mastered when it has enough attempts and high accuracy */
    var by = {};
    (S.attempts || []).forEach(function (a) {
      var k = null;
      if (a.kind === 'word') k = 'word';
      else if (a.kind === 'mission') k = String(a.id || '').split('-L')[0];
      else if (a.kind === 'drill') k = 'mult';
      if (!k || !MOMENTS[k]) return;
      (by[k] = by[k] || []).push(a);
    });
    var out = [];
    Object.keys(by).forEach(function (k) {
      var list = by[k];
      if (list.length < 6) return;
      var acc = list.filter(function (a) { return a.correct; }).length / list.length;
      if (acc >= 0.8) out.push(k);
    });
    /* a mastered quest line also counts (its topic maps to a moment) */
    var quest = S.quest || {};
    if (quest.rb1 && quest.rb1.done) out.push('word');
    if (quest.eq1 && quest.eq1.done) out.push('sense');
    return out;
  }

  function dueMoment() {
    var S = null;
    try { S = (window.OC && OC.STATE) || null; } catch (e) {}
    if (!S) return null;
    var log = shownLog(), now = Date.now();
    var topics = masteredTopics(S);
    for (var i = 0; i < topics.length; i++) {
      var t = topics[i];
      if (!MOMENTS[t]) continue;
      if (log[t] && (now - log[t]) < MONTH) continue;
      return t;
    }
    return null;
  }

  function overlay(html) {
    var ov = document.createElement('div');
    ov.id = 'gk-eureka';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(43,38,32,.5);z-index:950;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML = '<div style="background:#fffdf7;border-radius:18px;padding:22px;max-width:520px;width:100%;box-shadow:0 14px 44px rgba(0,0,0,.28);text-align:left">' + html + '</div>';
    document.body.appendChild(ov);
    return ov;
  }

  function show(topic) {
    var m = MOMENTS[topic];
    var ov = overlay(
      '<p style="font-family:var(--font-display);font-weight:800;color:#b45309;margin:0 0 6px;font-size:15px">💡 EUREKA MOMENT</p>' +
      '<h3 style="margin:0 0 10px;font-family:var(--font-display);font-size:1.35rem">' + m.icon + ' ' + m.title + '</h3>' +
      '<p style="line-height:1.55;margin:0 0 12px">' + m.body + '</p>' +
      '<div style="background:#fff8e1;border-left:5px solid #e0a25e;border-radius:10px;padding:12px 14px;line-height:1.5"><b>Go see it yourself:</b> ' + m.mission + '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap">' +
      '<button id="gk-eureka-ok" style="font-family:var(--font-display);font-size:1.05rem;font-weight:800;padding:12px 22px;border-radius:14px;border:none;background:linear-gradient(135deg,#f0a35e,#b45309);color:#fff;cursor:pointer">I will look for it! 🚀</button>' +
      '</div>');
    var log = shownLog();
    log[topic] = Date.now();
    saveLog(log);
    ov.querySelector('#gk-eureka-ok').addEventListener('click', function () { ov.remove(); });
  }

  function maybeShow() {
    var page = (location.pathname || '').split('/').pop();
    /* only on calm pages — never during a mission or a live problem */
    if (page !== 'index.html' && page !== 'dashboard.html') return;
    var topic = dueMoment();
    if (topic) setTimeout(function () { show(topic); }, 2200);
  }

  window.GK_EUREKA = { moments: MOMENTS, due: dueMoment, show: show, mastered: masteredTopics, KEY: KEY };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', maybeShow);
  else maybeShow();
})();
