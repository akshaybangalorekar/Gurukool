/* ============================================================
   MATH-CHAMP - BUILD SOMETHING REAL
   Real projects, locked behind the skills they actually need. Each
   one is four to six micro-steps: one idea, one animation, one
   question. Nothing is used before it is taught, and he finishes by
   producing his own number - his rocket speed, his corner speed.

   Animations are hand-drawn SVG that redraw from a slider or a timer:
   no libraries, works offline, smooth on an iPad.
   ============================================================ */
(function () {
  /* ---------- animation 1: throwing a ball hard enough to miss the ground ---------- */
  function ballThrow() {
    return {
      html:
        '<div id="pa-ball"><svg viewBox="0 0 420 300" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<defs><radialGradient id="gEarth" cx="50%" cy="35%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1d4ed8"/></radialGradient></defs>' +
        '<rect width="420" height="300" fill="#0b1020" rx="14"/>' +
        '<g id="pa-stars"></g>' +
        '<circle id="pa-earth" cx="210" cy="560" r="300" fill="url(#gEarth)"/>' +
        '<circle id="pa-dot" cx="210" cy="262" r="6" fill="#fbbf24"/>' +
        '<path id="pa-path" d="" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="5 4"/>' +
        '<text id="pa-label" x="14" y="26" fill="#e2e8f0" font-size="15" font-weight="700" font-family="Nunito,sans-serif"></text>' +
        '<text id="pa-verdict" x="14" y="284" fill="#fbbf24" font-size="16" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:12px"><input id="pa-speed" type="range" min="3" max="12" step="0.1" value="4" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Launch speed: <span id="pa-v">4.0</span> km/s</div></div>',
      start: function () {
        var R = 300, g = 9.8, cx = 210, cy = 560;      /* the Earth is drawn as a huge circle */
        var stars = '', i;
        for (i = 0; i < 40; i++) stars += '<circle cx="' + Math.round(Math.random() * 420) + '" cy="' + Math.round(Math.random() * 230) + '" r="1.1" fill="#94a3b8"/>';
        var st = document.getElementById('pa-stars'); if (st) st.innerHTML = stars;
        var slider = document.getElementById('pa-speed');
        function draw() {
          var v = parseFloat(slider.value);
          document.getElementById('pa-v').textContent = v.toFixed(1);
          /* gravity pulls the ball into a circle of radius r = v^2/g (in metres, scaled) */
          var r = (v * 1000) * (v * 1000) / g;             /* metres */
          var rPix = r / 6.371e6 * R;                       /* scaled to the drawn Earth */
          var vOrbit = Math.sqrt(g * 6.371e6) / 1000;      /* the true orbit speed, about 7.9 km/s */
          var escapes = v >= vOrbit - 0.005;                /* never comes back down */
          var path = '', ang, maxAng = escapes ? 150 : 62;
          for (ang = 0; ang <= maxAng; ang += 3) {
            var rad = ang * Math.PI / 180;
            /* the ball rides a circle of radius rPix, centred rPix below the launch point */
            var bx = cx + rPix * Math.sin(rad);
            var by = (262 + rPix) - rPix * Math.cos(rad);
            path += (path ? ' L' : 'M') + bx.toFixed(1) + ' ' + by.toFixed(1);
          }
          var p = document.getElementById('pa-path'); if (p) p.setAttribute('d', path);
          var dot = document.getElementById('pa-dot');
          if (dot) {
            var la = maxAng * Math.PI / 180;
            dot.setAttribute('cx', (cx + rPix * Math.sin(la)).toFixed(1));
            dot.setAttribute('cy', ((262 + rPix) - rPix * Math.cos(la)).toFixed(1));
          }
          var lb = document.getElementById('pa-label');
          if (lb) lb.textContent = 'speed ' + v.toFixed(1) + ' km/s  \u00b7  flight circle ' + Math.round(rPix) + ' px';
          var vd = document.getElementById('pa-verdict');
          if (vd) vd.textContent = escapes ? 'It curves away and never lands \u2014 it is in orbit.' : 'It comes back down and lands.';
        }
        slider.addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation 2: waiting for the launch window ---------- */
  function launchWindow() {
    return {
      html:
        '<div id="pa-orbit"><svg viewBox="0 0 420 420" style="width:100%;max-width:400px;display:block;margin:0 auto">' +
        '<rect width="420" height="420" fill="#0b1020" rx="14"/>' +
        '<circle cx="210" cy="210" r="70" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 5"/>' +
        '<circle cx="210" cy="210" r="150" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 5"/>' +
        '<circle cx="210" cy="210" r="16" fill="#f59e0b"/>' +
        '<circle id="pa-earthp" cx="280" cy="210" r="7" fill="#60a5fa"/>' +
        '<circle id="pa-marsp" cx="210" cy="60" r="6" fill="#f87171"/>' +
        '<path id="pa-arc" d="" fill="none" stroke="#fbbf24" stroke-width="2.5"/>' +
        '<text x="196" y="215" fill="#0b1020" font-size="11" font-weight="800" font-family="Nunito,sans-serif">Sun</text>' +
        '<text x="288" y="205" fill="#93c5fd" font-size="13" font-weight="700" font-family="Nunito,sans-serif">Earth</text>' +
        '<text x="218" y="55" fill="#fca5a5" font-size="13" font-weight="700" font-family="Nunito,sans-serif">Mars</text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><button class="pa-btn" id="pa-launch">\ud83d\ude80 Launch now</button>' +
        '<button class="pa-btn" id="pa-wait">\u23f3 Wait for the window</button>' +
        '<div id="pa-msg" style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:8px;min-height:24px"></div></div>',
      start: function () {
        var t = 0, anim = null, arc = document.getElementById('pa-arc'), msg = document.getElementById('pa-msg');
        var earth = document.getElementById('pa-earthp'), mars = document.getElementById('pa-marsp');
        function place() {
          var ea = t * 2 * Math.PI / 1.0;                 /* Earth: one lap per year */
          var ma = t * 2 * Math.PI / 1.88 + Math.PI * 0.75; /* Mars: slower, starts ahead */
          earth.setAttribute('cx', (210 + 70 * Math.cos(ea)).toFixed(1));
          earth.setAttribute('cy', (210 + 70 * Math.sin(ea)).toFixed(1));
          mars.setAttribute('cx', (210 + 150 * Math.cos(ma)).toFixed(1));
          mars.setAttribute('cy', (210 + 150 * Math.sin(ma)).toFixed(1));
          return { ea: ea, ma: ma };
        }
        function tick() {
          t += 0.006;
          place();
          if (t > 3) { t = 0; }
          anim = requestAnimationFrame(tick);
        }
        function stop() { if (anim) cancelAnimationFrame(anim); anim = null; }
        function transfer() {
          var a = place();
          /* the transfer arc: a half lap from Earth out to Mars's orbit */
          var ex = 210 + 70 * Math.cos(a.ea), ey = 210 + 70 * Math.sin(a.ea);
          var mx = 210 + 150 * Math.cos(a.ea + Math.PI), my = 210 + 150 * Math.sin(a.ea + Math.PI);
          arc.setAttribute('d', 'M' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' Q' + (210 + 0.7 * (mx - 210) + (ey - 210) * 0.35).toFixed(1) + ' ' + (210 + 0.7 * (my - 210) - (ex - 210) * 0.35).toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1));
          /* where Mars will actually be when the ship arrives, half a lap of travel later */
          var arriveT = t + 0.7;
          var maThen = arriveT * 2 * Math.PI / 1.88 + Math.PI * 0.75;
          var mxThen = 210 + 150 * Math.cos(maThen), myThen = 210 + 150 * Math.sin(maThen);
          var gap = Math.hypot(mxThen - mx, myThen - my);
          if (gap < 34) { msg.innerHTML = '\u2705 Mars is exactly there when you arrive. That was the launch window.'; }
          else { msg.innerHTML = '\u274c Mars has moved on by the time you get there. Nothing to land on.'; }
        }
        document.getElementById('pa-launch').onclick = function () { stop(); transfer(); };
        document.getElementById('pa-wait').onclick = function () {
          stop();
          /* find the moment when Mars will be 45 degrees ahead: the real launch window */
          var best = 0, bestGap = 1e9;
          for (var k = 0; k < 400; k++) {
            var tt = k * 0.01;
            var ea = tt * 2 * Math.PI / 1.0;
            var maThen = (tt + 0.7) * 2 * Math.PI / 1.88 + Math.PI * 0.75;
            var want = ea + Math.PI;
            var d = Math.abs(((maThen - want) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
            if (d < bestGap) { bestGap = d; best = tt; }
          }
          t = best; place(); transfer();
          msg.innerHTML = '\u23f3 You waited. Now ' + msg.innerHTML.replace(/^[^ ]+ /, '');
        };
        tick();
      }
    };
  }

  /* ---------- animation 3: the pizza proof ---------- */
  function pizza() {
    return {
      html:
        '<div id="pa-pizza"><svg viewBox="0 0 420 250" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="250" fill="#fff7ed" rx="14"/>' +
        '<circle cx="100" cy="104" r="56" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>' +
        '<circle cx="210" cy="104" r="56" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>' +
        '<circle cx="335" cy="104" r="84" fill="#f97316" stroke="#9a3412" stroke-width="3"/>' +
        '<text x="100" y="110" text-anchor="middle" font-size="17" font-weight="800" fill="#7c2d12" font-family="Nunito,sans-serif">8\u2033</text>' +
        '<text x="210" y="110" text-anchor="middle" font-size="17" font-weight="800" fill="#7c2d12" font-family="Nunito,sans-serif">8\u2033</text>' +
        '<text x="335" y="110" text-anchor="middle" font-size="19" font-weight="800" fill="#fff" font-family="Nunito,sans-serif">12\u2033</text>' +
        '<text x="155" y="216" text-anchor="middle" font-size="15" font-weight="800" fill="#7c2d12" font-family="Nunito,sans-serif">two 8\u2033 = <tspan id="pa-a">101</tspan> sq in</text>' +
        '<text x="155" y="236" text-anchor="middle" font-size="14" font-weight="700" fill="#a16207" font-family="Nunito,sans-serif">(two of these)</text>' +
        '<text x="335" y="216" text-anchor="middle" font-size="15" font-weight="800" fill="#9a3412" font-family="Nunito,sans-serif">one 12\u2033 = <tspan id="pa-b">113</tspan> sq in</text>' +
        '<text x="335" y="236" text-anchor="middle" font-size="14" font-weight="700" fill="#c2410c" font-family="Nunito,sans-serif">(one of these)</text>' +
        '</svg></div>',
      start: function () {
        /* the honest areas: two 8 inch pizzas vs one 12 inch */
        var two8 = 2 * Math.PI * 4 * 4, one12 = Math.PI * 6 * 6;
        var a = document.getElementById('pa-a'), b = document.getElementById('pa-b');
        if (a) a.textContent = two8.toFixed(0);
        if (b) b.textContent = one12.toFixed(0);
      }
    };
  }

  var LIST = [
    { key: 'rocket', icon: '\ud83d\ude80', title: 'Reach the Moon, then Mars', status: 'ready',
      hook: 'Work out how fast a rocket must go \u2014 and the exact moment to launch it.',
      needs: ['speed', 'ratio', 'pct', 'time'],
      steps: [
        { title: 'Throw a ball so hard it never comes back',
          say: 'Throw a ball and gravity pulls it down. Throw it harder and it goes further. Throw it REALLY hard and the ground curves away as fast as the ball falls \u2014 so it never lands. It goes round and round instead. That speed has a name: orbit speed. Drag the slider and watch.',
          anim: ballThrow,
          ask: 'At what launch speed does the ball stop landing? Give the number in km/s, to one decimal place.',
          ans: 7.9, hint: 'Watch the verdict line as you slide. The moment it says it never lands, read the speed.',
          sol: 'At about 7.9 km/s the ball curves away as fast as it falls, so it never comes back down \u2014 it is in orbit. That is the ORBIT speed. To leave Earth altogether and head for Mars you need more: about 11.2 km/s, which is escape velocity. Notice both are SPEEDS, not heights \u2014 going up is not enough.' },
        { title: 'Why a rocket is nearly all fuel',
          say: 'A rocket has to carry its own fuel, and the fuel is heavy. To reach 7.9 km/s you need a lot of it. Rockets are built in stages \u2014 the empty tanks are dropped off on the way, so the engine is not still pushing dead weight.',
          anim: null,
          ask: 'A rocket weighs 500 tonnes when full. If 9/10 of that is fuel and tanks, how many tonnes are left for the rocket itself and its cargo?',
          ans: 50, hint: '9/10 of 500 is fuel. What is left over?',
          sol: '9/10 of 500 is 450 tonnes of fuel, so only 50 tonnes is rocket and cargo. That is why a rocket looks enormous and its payload looks tiny \u2014 the maths of escape velocity is brutal about weight.' },
        { title: 'The launch window: why timing beats speed',
          say: 'You cannot launch to Mars whenever you like. Earth and Mars are both moving. If you set off at the wrong moment, Mars simply is not where you arrive. Press the buttons and watch.',
          anim: launchWindow,
          ask: 'How many months does the trip to Mars take? (The transfer takes 0.7 of a year.) Round to the nearest whole month.',
          ans: 8, hint: '0.7 of a year is 0.7 \u00d7 12 months.',
          sol: '0.7 \u00d7 12 is 8.4, so about 8 months. That is why the launch window matters: Mars moves a long way in 8 months, and you have to aim where it WILL be, not where it is.' },
        { title: 'Moon versus Mars: why one is so much harder',
          say: 'The Moon is about 384,000 km away. Mars is at least 55 million km away \u2014 and it is only that close every couple of years. Same rocket maths, very different journey.',
          anim: null,
          ask: 'A ship travels at 10,000 km/h. How many hours to the Moon, 384,000 km away?',
          ans: 38.4, hint: 'Distance divided by speed.',
          sol: '384,000 \u00f7 10,000 = 38.4 hours \u2014 about a day and a half. Now try Mars: 55,000,000 \u00f7 10,000 = 5,500 hours, which is about 229 days. Same speed, 150 times the journey. That is why the Moon came first.' }
      ] },
    { key: 'pizza', icon: '\ud83c\udf55', title: 'The pizza trick', status: 'ready',
      hook: 'Two 8-inch pizzas or one 12-inch? Prove which is more pizza \u2014 and never be fooled again.',
      needs: ['frac', 'pct'],
      steps: [
        { title: 'Area grows faster than the diameter',
          say: 'A pizza is a circle, and the area of a circle is \u03c0 \u00d7 radius \u00d7 radius. The radius is half the width. So doubling the width does NOT double the pizza \u2014 it quadruples it. Look at the picture.',
          anim: pizza,
          ask: 'One 12-inch pizza has a radius of 6 inches. What is \u03c0 \u00d7 6 \u00d7 6, to the nearest whole number? (Use 3.14 for \u03c0.)',
          ans: 113, hint: '6 \u00d7 6 = 36, then 36 \u00d7 3.14.',
          sol: '3.14 \u00d7 36 = 113 square inches. So one 12-inch pizza is about 113 square inches of pizza.' },
        { title: 'Now the two small ones',
          say: 'Each 8-inch pizza has a radius of 4 inches. Work out one, then double it \u2014 and compare with the 113 you just found.',
          anim: pizza,
          ask: 'One 8-inch pizza is 3.14 \u00d7 4 \u00d7 4 square inches. To the nearest whole number, what is that?',
          ans: 50, hint: '4 \u00d7 4 = 16, then 16 \u00d7 3.14.',
          sol: '3.14 \u00d7 16 = 50 square inches each. Two of them is 100 \u2014 still less than the single 113. So the ONE 12-inch pizza is more pizza, even though two pizzas sound like more.' },
        { title: 'The rule you can use forever',
          say: 'You have just proved something people argue about at every pizza counter. The trick: compare the SQUARES of the widths, not the widths.',
          anim: null,
          ask: 'Two 10-inch pizzas or one 14-inch pizza? Type 2 for the two 10-inch, or 1 for the one 14-inch.',
          ans: 2, hint: '10\u00b2 = 100, so two of them are 200. 14\u00b2 = 196. Two hundreds beats one hundred-and-ninety-six \u2014 just.',
          sol: 'Two 10-inch pizzas give 2 \u00d7 \u03c0 \u00d7 25 = 157 sq in. One 14-inch gives \u03c0 \u00d7 49 = 154 sq in. The two small ones win \u2014 but only by three square inches, so the price decides it. Comparing the SQUARES of the widths is the whole trick: 200 beats 196.' }
      ] },
    { key: 'f1', icon: '\ud83c\udfce\ufe0f', title: 'How fast can an F1 car take a corner?', status: 'soon',
      hook: 'The tighter the corner, the slower you must go \u2014 and the reason is a square root.',
      needs: ['speed', 'ratio', 'pct'], steps: [] },
    { key: 'coaster', icon: '\ud83c\udfa2', title: 'Design a roller coaster', status: 'soon',
      hook: 'How tall must the first hill be for the last one to work? Energy, slope and speed.',
      needs: ['speed', 'frac', 'pct'], steps: [] },
    { key: 'bridge', icon: '\ud83c\udfd7\ufe0f', title: 'Build a bridge that holds', status: 'soon',
      hook: 'Why triangles never wobble, and how to spread a load so nothing snaps.',
      needs: ['balance', 'ratio'], steps: [] },
    { key: 'tennis', icon: '\ud83c\udfbe', title: 'The physics of a tennis shot', status: 'soon',
      hook: 'Why a topspin shot dips, and where to aim a serve you cannot return.',
      needs: ['speed', 'frac', 'ratio'], steps: [] }
  ];

  window.Projects = {
    list: LIST,
    byKey: function (k) { for (var i = 0; i < LIST.length; i++) if (LIST[i].key === k) return LIST[i]; return null; },
    /* is it unlocked? every needed topic must be at level 2 or better */
    check: function (S, p) {
      var missing = [];
      p.needs.forEach(function (k) {
        var lv = (window.Levels ? Levels.of(S, k) : 0);
        if (lv < 2) missing.push({ key: k, name: (window.Gen && Gen.byKey(k) ? Gen.byKey(k).name : k), level: lv });
      });
      return { ok: missing.length === 0, missing: missing };
    }
  };
})();
