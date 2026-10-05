/* ============================================================
   Gurukool - Learning Rhythm (shared by every champ page)
   Three jobs, all of them on the child's side:

   1. SUCCESS SANDWICH - never two hard questions in a row. After two
      wrong answers in a row, one easy warm-up question is served. It is
      a gift, not a gate: the warm-up is always winnable and it always
      ends with technique-praise ("you slowed down and checked"), never
      talent-praise ("you are so clever").

   2. NATURAL STOPPING POINT - after about 20 minutes of real work, a
      friendly wrap-up is offered once a day. Learning ends on a high,
      not on exhaustion.

   3. MINUTES LOG - today's and this week's active minutes, kept on this
      device only, so the Parent Console can show a weekly digest.

   Everything here is device-local (key: gk_rhythm). Nothing is synced.
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'gk_rhythm';
  var STOP_MIN = 20;      /* offer a wrap-up at ~20 minutes */
  var SNOOZE_MIN = 10;    /* "keep going" buys 10 more minutes */
  var TICK_SEC = 15;      /* how often active time is counted */

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {}; } catch (e) { return {}; }
  }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var st = load();
  if (!st.days || typeof st.days !== 'object') st.days = {};
  /* session-scoped only - deliberately not persisted */
  var consecWrong = 0;
  var easyDue = false;

  /* ---------- minutes ---------- */
  function addMin(n) {
    var k = dayKey();
    st.days[k] = Math.min(240, (st.days[k] || 0) + n);
    var keys = Object.keys(st.days).sort();
    while (keys.length > 40) { delete st.days[keys.shift()]; }
    save(st);
  }
  function todayMinutes() { return Math.round(st.days[dayKey()] || 0); }
  function tsOf(k) {
    var p = String(k).split('-');
    /* anchor at the START of the day, so today never looks like the future */
    return new Date(+p[0], +p[1] - 1, +p[2], 0, 0, 0).getTime();
  }
  function weekMinutes() {
    var t = 0, now = Date.now();
    for (var k in st.days) { var ts = tsOf(k); if (now - ts < 7 * 86400000 && now - ts >= 0) t += st.days[k]; }
    return Math.round(t);
  }
  function days() {
    var out = {}, now = Date.now();
    for (var k in st.days) { var ts = tsOf(k); if (now - ts < 7 * 86400000 && now - ts >= 0) out[k] = Math.round(st.days[k]); }
    return out;
  }

  /* ---------- the shell (self-contained styles, so no champ CSS is needed) ---------- */
  function layer() {
    var L = document.getElementById('gk-rhythm-layer');
    if (!L) {
      L = document.createElement('div');
      L.id = 'gk-rhythm-layer';
      L.setAttribute('style', 'position:fixed;inset:0;z-index:9000;display:none;align-items:flex-end;justify-content:center;background:rgba(20,24,40,.34);padding:14px;padding-bottom:calc(14px + env(safe-area-inset-bottom));');
      document.body.appendChild(L);
    }
    return L;
  }
  function closeLayer() { var L = document.getElementById('gk-rhythm-layer'); if (L) { L.style.display = 'none'; L.innerHTML = ''; } }

  function card(inner) {
    return '<div style="width:100%;max-width:520px;background:#fff;border-radius:22px;padding:20px 20px 18px;box-shadow:0 18px 50px rgba(15,23,42,.3);font-family:Nunito,system-ui,-apple-system,sans-serif;color:#1f2937">' + inner + '</div>';
  }
  function btn(label, id, primary) {
    return '<button id="' + id + '" type="button" style="font:800 17px/1 Nunito,system-ui,sans-serif;padding:14px 18px;border-radius:14px;border:2px solid ' + (primary ? '#2a9d8f' : '#cbd5e1') + ';background:' + (primary ? '#2a9d8f' : '#fff') + ';color:' + (primary ? '#fff' : '#334155') + ';cursor:pointer">' + label + '</button>';
  }

  /* ---------- 1. success sandwich ---------- */
  var WARM = [
    function () { var a = 6 + Math.floor(Math.random() * 4), b = 3 + Math.floor(Math.random() * 5); return { q: a + ' + ' + b + ' = ?', a: a + b, tip: 'Count on from the bigger number: start at ' + Math.max(a, b) + ' and count ' + Math.min(a, b) + ' more.' }; },
    function () { var a = 12 + Math.floor(Math.random() * 7), b = 2 + Math.floor(Math.random() * 6); return { q: a + ' - ' + b + ' = ?', a: a - b, tip: 'Count back ' + b + ' from ' + a + ', or count up from ' + b + ' to ' + a + '.' }; },
    function () { var a = 3 + Math.floor(Math.random() * 7); return { q: a + ' x 2 = ?', a: a * 2, tip: 'Doubling: ' + a + ' + ' + a + '.' }; },
    function () { var a = 2 + Math.floor(Math.random() * 8); return { q: a + ' x 5 = ?', a: a * 5, tip: 'Times 5 is half of times 10: ' + (a * 10) + ' divided by 2.' }; },
    function () { var a = 2 + Math.floor(Math.random() * 8); return { q: a + ' x 10 = ?', a: a * 10, tip: 'Times 10 - the digits move one place, then a zero.' }; },
    function () { var a = 3 + Math.floor(Math.random() * 6), b = 6 + Math.floor(Math.random() * 5); return { q: a + ' + ' + b + ' = ?', a: a + b, tip: 'Make ten first: ' + a + ' + ' + (10 - a) + ' = 10, then add the rest.' }; }
  ];
  var lastWarm = -1;
  function newWarm() {
    var i = Math.floor(Math.random() * WARM.length);
    if (WARM.length > 1) { var guard = 0; while (i === lastWarm && guard++ < 20) i = Math.floor(Math.random() * WARM.length); }
    lastWarm = i;
    return WARM[i]();
  }

  function showWarmUp() {
    var w = newWarm();
    var L = layer();
    L.style.display = 'flex';
    L.innerHTML = card(
      '<p style="margin:0 0 4px;font-weight:800;font-size:13px;letter-spacing:.08em;color:#2a9d8f">A FRIENDLY ONE</p>' +
      '<h3 style="margin:0 0 8px;font-size:24px">Two tricky ones in a row - let us reset</h3>' +
      '<p style="margin:0 0 14px;font-size:16.5px;color:#475569">This one is easy on purpose. Getting one right puts your brain back in charge.</p>' +
      '<div style="font:800 30px/1.2 monospace;margin:0 0 12px">' + w.q + '</div>' +
      '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
        '<input id="gk-warm-in" inputmode="numeric" autocomplete="off" placeholder="type it here" style="font:800 22px/1 monospace;padding:12px 14px;border:2px solid #cbd5e1;border-radius:14px;width:150px">' +
        btn('Go', 'gk-warm-go', true) +
      '</div>' +
      '<p id="gk-warm-fb" style="margin:12px 0 0;font-size:16.5px;min-height:22px"></p>'
    );
    var inp = document.getElementById('gk-warm-in');
    var go = document.getElementById('gk-warm-go');
    function attempt() {
      var v = parseInt(String(inp.value).replace(/[^0-9-]/g, ''), 10);
      var fb = document.getElementById('gk-warm-fb');
      if (isNaN(v)) { fb.innerHTML = 'Type a number, then tap Go.'; return; }
      if (v === w.a) {
        fb.innerHTML = '<span style="color:#047857;font-weight:800">Yes!</span> You took your time and checked it - that is the move that wins the hard ones too.';
        go.textContent = 'Back to my question';
        go.onclick = function () { easyDue = false; consecWrong = 0; closeLayer(); };
        inp.disabled = true;
        try { inp.blur(); } catch (e) {}
      } else {
        fb.innerHTML = '<span style="color:#b45309;font-weight:800">Nearly!</span> ' + w.tip + ' Try once more - you will get it.';
        inp.value = '';
        try { inp.focus(); } catch (e) {}
      }
    }
    go.onclick = attempt;
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); attempt(); } });
    try { inp.focus(); } catch (e) {}
  }

  /* ---------- 2. natural stopping point ---------- */
  function showWrap() {
    st.wrapDay = dayKey();
    save(st);
    var L = layer();
    L.style.display = 'flex';
    L.innerHTML = card(
      '<p style="margin:0 0 4px;font-weight:800;font-size:13px;letter-spacing:.08em;color:#7c3aed">GOOD PLACE TO PAUSE</p>' +
      '<h3 style="margin:0 0 8px;font-size:24px">You have worked hard for about ' + STOP_MIN + ' minutes</h3>' +
      '<p style="margin:0 0 6px;font-size:16.5px;color:#475569">That is a real session - the kind that builds a champion. Your brain files away what it learned while you rest.</p>' +
      '<p style="margin:0 0 16px;font-size:16.5px;color:#475569"><b>Stopping here is a smart move</b>, not a small one. Tomorrow you will pick up faster than you think.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        btn('I will stop here', 'gk-wrap-stop', true) +
        btn('Keep going (' + SNOOZE_MIN + ' more min)', 'gk-wrap-more', false) +
      '</div>'
    );
    document.getElementById('gk-wrap-stop').onclick = function () { closeLayer(); };
    document.getElementById('gk-wrap-more').onclick = function () {
      st.wrapDay = 'snooze:' + dayKey() + ':' + Date.now();
      save(st);
      closeLayer();
    };
  }
  function wrapAlreadyOfferedToday() {
    if (st.wrapDay === dayKey()) return true;
    var s = String(st.wrapDay || '');
    if (s.indexOf('snooze:') === 0) {
      var bits = s.split(':');
      if (bits[1] === dayKey() && Date.now() - (+bits[2] || 0) < SNOOZE_MIN * 60000) return true;
    }
    return false;
  }

  /* ---------- the heartbeat ---------- */
  setInterval(function () {
    if (document.hidden) return;
    addMin(TICK_SEC / 60);
    if (todayMinutes() >= STOP_MIN && !wrapAlreadyOfferedToday()) showWrap();
  }, TICK_SEC * 1000);

  /* ---------- public API ---------- */
  window.Rhythm = {
    note: function (correct) {
      if (correct) { consecWrong = 0; easyDue = false; return; }
      consecWrong++;
      if (consecWrong >= 2 && !easyDue) { easyDue = true; showWarmUp(); }
    },
    right: function () { window.Rhythm.note(true); },
    wrong: function () { window.Rhythm.note(false); },
    needEasy: function () { return easyDue; },
    clearEasy: function () { easyDue = false; consecWrong = 0; },
    todayMinutes: todayMinutes,
    weekMinutes: weekMinutes,
    days: days,
    stoppingPoint: showWrap,
    _state: function () { return { consecWrong: consecWrong, easyDue: easyDue, wrap: st.wrapDay || null, days: st.days }; }
  };
})();
