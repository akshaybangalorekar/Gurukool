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


  /* ---------- animation 4: the F1 corner, with a radius slider ---------- */
  function f1Curve() {
    return {
      html:
        '<div id="pa-f1"><svg viewBox="0 0 420 240" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="240" fill="#f1f5f9" rx="14"/>' +
        '<path id="pa-track" d="" fill="none" stroke="#334155" stroke-width="26" stroke-linecap="round"/>' +
        '<path id="pa-line" d="" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>' +
        '<circle id="pa-car" cx="0" cy="0" r="8" fill="#ef4444"/>' +
        '<text id="pa-vmax" x="16" y="30" fill="#0f172a" font-size="17" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '<text id="pa-note" x="16" y="228" fill="#475569" font-size="14" font-weight="700" font-family="Nunito,sans-serif"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:12px"><input id="pa-r" type="range" min="20" max="120" step="1" value="50" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Corner radius: <span id="pa-rv">50</span> m</div></div>',
      start: function () {
        var MU = 1.5;                                  /* sticky racing tyres */
        function draw() {
          var r = parseFloat(document.getElementById('pa-r').value);
          document.getElementById('pa-rv').textContent = r;
          var v = Math.sqrt(MU * 9.8 * r);              /* metres per second */
          var kmh = Math.round(v * 3.6);
          /* draw the bend as a quarter circle of the chosen radius, scaled to fit */
          var scale = Math.min(150 / r, 4.2);
          var rr = r * scale, cx = 40, cy = 210;
          document.getElementById('pa-track').setAttribute('d', 'M' + cx + ' ' + cy + ' L' + (cx + 300) + ' ' + cy + ' A' + rr + ' ' + rr + ' 0 0 1 ' + (cx + 300) + ' ' + (cy - 2 * rr));
          document.getElementById('pa-line').setAttribute('d', 'M' + cx + ' ' + (cy - rr) + ' A' + rr + ' ' + rr + ' 0 0 1 ' + (cx + 300 - rr) + ' ' + (cy - rr));
          var car = document.getElementById('pa-car');
          car.setAttribute('cx', (cx + 300 - rr * 0.3).toFixed(1));
          car.setAttribute('cy', (cy - rr + rr * 0.05).toFixed(1));
          document.getElementById('pa-vmax').textContent = 'max speed ' + kmh + ' km/h';
          document.getElementById('pa-note').textContent = 'radius ' + r + ' m  \u00b7  grip 1.5  \u00b7  v = \u221a(grip \u00d7 9.8 \u00d7 radius)';
        }
        document.getElementById('pa-r').addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation 5: doubling the radius does not double the speed ---------- */
  function sqrtSecret() {
    return {
      html:
        '<div id="pa-sqrt"><svg viewBox="0 0 420 230" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="230" fill="#f8fafc" rx="14"/>' +
        '<line x1="50" y1="190" x2="400" y2="190" stroke="#94a3b8" stroke-width="2"/>' +
        '<line x1="50" y1="190" x2="50" y2="20" stroke="#94a3b8" stroke-width="2"/>' +
        '<text x="200" y="215" fill="#475569" font-size="13" font-weight="700" font-family="Nunito,sans-serif" text-anchor="middle">radius (metres)</text>' +
        '<text x="16" y="110" fill="#475569" font-size="13" font-weight="700" font-family="Nunito,sans-serif" transform="rotate(-90 16 110)" text-anchor="middle">speed</text>' +
        '<path id="pa-curve" d="" fill="none" stroke="#2a9d8f" stroke-width="3"/>' +
        '<circle id="pa-d1" cx="0" cy="0" r="5" fill="#1d4ed8"/><circle id="pa-d2" cx="0" cy="0" r="5" fill="#ef4444"/>' +
        '<text id="pa-sqrt-note" x="210" y="30" fill="#0f172a" font-size="15" font-weight="800" font-family="Nunito,sans-serif" text-anchor="middle"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:12px"><input id="pa-rs" type="range" min="20" max="120" step="1" value="30" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Start radius: <span id="pa-rsv">30</span> m \u00b7 then double it</div></div>',
      start: function () {
        var MU = 1.5;
        function speed(r) { return Math.sqrt(MU * 9.8 * r); }
        function px(r) { return 50 + (r - 20) / 100 * 340; }
        function py(v) { return 190 - (v - 15) / 20 * 165; }
        function draw() {
          var r0 = parseFloat(document.getElementById('pa-rs').value);
          document.getElementById('pa-rsv').textContent = r0;
          var d = '', r;
          for (r = 20; r <= 120; r += 2) d += (d ? ' L' : 'M') + px(r).toFixed(1) + ' ' + py(speed(r)).toFixed(1);
          document.getElementById('pa-curve').setAttribute('d', d);
          var r1 = Math.min(120, r0 * 2);
          document.getElementById('pa-d1').setAttribute('cx', px(r0)); document.getElementById('pa-d1').setAttribute('cy', py(speed(r0)));
          document.getElementById('pa-d2').setAttribute('cx', px(r1)); document.getElementById('pa-d2').setAttribute('cy', py(speed(r1)));
          var factor = (speed(r1) / speed(r0)).toFixed(2);
          document.getElementById('pa-sqrt-note').textContent = r0 + ' m \u2192 ' + r1 + ' m doubles the radius, and the speed only \u00d7 ' + factor;
        }
        document.getElementById('pa-rs').addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation 6: the coaster, hill height against the energy budget ---------- */
  function coaster() {
    return {
      html:
        '<div id="pa-co"><svg viewBox="0 0 420 240" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="240" fill="#eef2ff" rx="14"/>' +
        '<path id="pa-hills" d="" fill="none" stroke="#4f46e5" stroke-width="4"/>' +
        '<circle id="pa-carc" cx="0" cy="0" r="7" fill="#f59e0b"/>' +
        '<text id="pa-co-v" x="16" y="28" fill="#1e1b4b" font-size="16" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '<text id="pa-co-note" x="16" y="228" fill="#4338ca" font-size="14" font-weight="700" font-family="Nunito,sans-serif"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:12px"><input id="pa-h2" type="range" min="10" max="60" step="1" value="30" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Second hill: <span id="pa-h2v">30</span> m (the first hill is 40 m)</div></div>',
      start: function () {
        function draw() {
          var h2 = parseFloat(document.getElementById('pa-h2').value);
          document.getElementById('pa-h2v').textContent = h2;
          var H1 = 40, y0 = 210, top = 40;
          function y(m) { return y0 - m * (y0 - top) / 60; }
          /* the first hill, a valley, then the second hill of the chosen height */
          document.getElementById('pa-hills').setAttribute('d',
            'M20 ' + y0 + ' L60 ' + y(H1) + ' L120 ' + y0 + ' L200 ' + y(h2) + ' L260 ' + y0 + ' L330 ' + y(Math.min(h2, H1) * 0.6) + ' L400 ' + y0);
          var makes = h2 <= H1;
          var car = document.getElementById('pa-carc');
          car.setAttribute('cx', makes ? 200 : 170);
          car.setAttribute('cy', makes ? y(h2) : y(h2 * 0.92));
          document.getElementById('pa-co-v').textContent = 'speed at the bottom: ' + Math.round(Math.sqrt(2 * 9.8 * H1) * 3.6) + ' km/h';
          document.getElementById('pa-co-note').textContent = makes ? 'The car clears the second hill.' : 'The car runs out of energy and rolls back.';
        }
        document.getElementById('pa-h2').addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation 7: square versus triangle, and where the load goes ---------- */
  function bridge() {
    return {
      html:
        '<div id="pa-br"><svg viewBox="0 0 420 250" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="250" fill="#f8fafc" rx="14"/>' +
        '<g id="pa-square" stroke="#334155" stroke-width="5" fill="none"><rect x="30" y="40" width="110" height="110"/><line x1="30" y1="40" x2="140" y2="150" stroke-dasharray="0" stroke="#cbd5e1" stroke-width="3"/></g>' +
        '<g id="pa-tri" stroke="#334155" stroke-width="5" fill="none"><polygon points="250,150 340,150 295,40"/></g>' +
        '<text x="85" y="175" text-anchor="middle" font-size="14" font-weight="800" fill="#475569" font-family="Nunito,sans-serif">square</text>' +
        '<text x="295" y="175" text-anchor="middle" font-size="14" font-weight="800" fill="#475569" font-family="Nunito,sans-serif">triangle</text>' +
        '<line x1="20" y1="210" x2="400" y2="210" stroke="#94a3b8" stroke-width="4"/>' +
        '<text id="pa-br-note" x="210" y="238" text-anchor="middle" font-size="14" font-weight="700" fill="#475569" font-family="Nunito,sans-serif">Press push and watch which shape keeps its shape.</text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><button class="pa-btn" id="pa-push">\ud83d\udca5 Push the top</button>' +
        '<button class="pa-btn" id="pa-reset">\u21ba Reset</button></div>',
      start: function () {
        var sq = document.getElementById('pa-square'), note = document.getElementById('pa-br-note');
        document.getElementById('pa-push').onclick = function () {
          sq.setAttribute('transform', 'skewX(-14)');
          note.textContent = 'The square fell over \u2014 it has no triangles to hold its corners.';
        };
        document.getElementById('pa-reset').onclick = function () { sq.removeAttribute('transform'); note.textContent = 'Press push and watch which shape keeps its shape.'; };
      }
    };
  }

  /* ---------- animation 8: the serve, angle against distance ---------- */
  function tennis() {
    return {
      html:
        '<div id="pa-ten"><svg viewBox="0 0 420 240" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="240" fill="#ecfdf5" rx="14"/>' +
        '<line x1="20" y1="200" x2="400" y2="200" stroke="#059669" stroke-width="4"/>' +
        '<path id="pa-ten-path" d="" fill="none" stroke="#0ea5e9" stroke-width="3"/>' +
        '<path id="pa-ten-spin" d="" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6 4"/>' +
        '<circle id="pa-ten-ball" cx="30" cy="190" r="6" fill="#fde047" stroke="#a16207" stroke-width="2"/>' +
        '<text id="pa-ten-v" x="16" y="28" fill="#064e3b" font-size="16" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '<text id="pa-ten-note" x="16" y="228" fill="#047857" font-size="14" font-weight="700" font-family="Nunito,sans-serif">blue = flat serve \u00b7 orange = with topspin</text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:12px"><input id="pa-ang" type="range" min="10" max="80" step="1" value="45" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Serve angle: <span id="pa-angv">45</span>\u00b0</div></div>',
      start: function () {
        function draw() {
          var a = parseFloat(document.getElementById('pa-ang').value);
          document.getElementById('pa-angv').textContent = a;
          var rad = a * Math.PI / 180, v = 45;         /* a fast serve, in metres per second */
          var range = v * v * Math.sin(2 * rad) / 9.8;
          var scale = Math.min(340 / 110, 3.4);
          var d = '', x, y, t;
          for (t = 0; t <= 4; t += 0.08) {
            x = 30 + v * Math.cos(rad) * t * scale;
            y = 190 - (v * Math.sin(rad) * t - 4.9 * t * t) * scale;
            if (y > 200) break;
            d += (d ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
          }
          document.getElementById('pa-ten-path').setAttribute('d', d);
          /* the topspin version: same speed, but it dips early and lands shorter */
          var d2 = '';
          for (t = 0; t <= 4; t += 0.08) {
            x = 30 + v * Math.cos(rad) * t * scale;
            y = 190 - (v * Math.sin(rad) * t - 4.9 * t * t - 6 * t * t) * scale;
            if (y > 200) break;
            d2 += (d2 ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
          }
          document.getElementById('pa-ten-spin').setAttribute('d', d2);
          document.getElementById('pa-ten-v').textContent = 'the ball would travel ' + Math.round(range) + ' m if nothing stopped it';
          document.getElementById('pa-ten-ball').setAttribute('cx', 30); document.getElementById('pa-ten-ball').setAttribute('cy', 190);
        }
        document.getElementById('pa-ang').addEventListener('input', draw);
        draw();
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
    { key: 'f1', icon: '\ud83c\udfce\ufe0f', title: 'How fast can an F1 car take a corner?', status: 'ready',
      hook: 'The tighter the corner, the slower you must go \u2014 and the reason is a square root.',
      needs: ['speed', 'ratio', 'pct'],
      steps: [
        { title: 'Why the curve decides',
          say: 'A car turns because its tyres grip the road. The tighter the corner, the harder the car has to be pulled round \u2014 and past a certain speed the grip runs out and it slides off. Drag the radius slider and watch the maximum speed change.',
          anim: f1Curve,
          ask: 'On a 50 metre corner with racing grip, the maximum speed is about 98 km/h. On a 100 metre corner, is the maximum speed higher, lower or the same? Type higher, lower or the same.',
          ans: 'higher', hint: 'A wider corner means the car is pulled round more gently.',
          sol: 'A wider corner lets the car go faster. The tyres only have so much grip, and a bigger radius asks less of them \u2014 so a fast corner is a wide one. That is why racing lines cut wide wherever they can.' },
        { title: 'The square-root secret',
          say: 'Here is the surprise. If you DOUBLE the radius of a corner, the speed does not double \u2014 it only goes up by the square root of 2, about 1.41 times. Slide it and watch.',
          anim: sqrtSecret,
          ask: 'Double the radius and the maximum speed goes up by what factor? Give it to one decimal place.',
          ans: 1.4, hint: 'The square root of 2 is about 1.41.',
          sol: 'The speed goes up by \u221a2, about 1.4 times. So a corner twice as wide is only 41 per cent faster. Speeds that follow a square root grow slowly \u2014 which is exactly why engineers chase every centimetre of corner width.' },
        { title: 'The racing line',
          say: 'A driver can hug the inside of a corner (short distance, tight radius, slow) or swing wide (longer distance, wide radius, fast). The fastest line is the one that spends the most time at a wide radius.',
          anim: null,
          ask: 'Which line allows the HIGHER speed through the corner? Type wide or tight.',
          ans: 'wide', hint: 'Which one has the bigger radius?',
          sol: 'The wide line allows the higher speed, because a bigger radius needs less grip for the same speed. Drivers trade a slightly longer path for a much faster one \u2014 that is what a racing line is.' },
        { title: 'Worn tyres, slower corners',
          say: 'Tyres wear out, and grip falls with them. If grip drops to 80 per cent of what it was, the speed falls by the square root of 0.8.',
          anim: null,
          ask: 'The square root of 0.8 is 0.894. So the corner speed falls by about how many per cent? Round to the nearest whole number.',
          ans: 11, hint: '0.894 means 89.4 per cent of the old speed. How much is lost?',
          sol: '100 \u2212 89.4 = 10.6, so about 11 per cent slower. A fifth of the grip costs a tenth of the speed \u2014 again the square root at work.' }
      ] },
    { key: 'coaster', icon: '\ud83c\udfa2', title: 'Design a roller coaster', status: 'ready',
      hook: 'Why the first hill is the whole budget \u2014 and how fast you go at the bottom.',
      needs: ['speed', 'frac', 'pct'],
      steps: [
        { title: 'The first hill is the budget',
          say: 'A coaster car cannot climb higher than the hill it came down from. Energy does not come from nowhere. Slide the second hill and watch what happens when it is taller than the first.',
          anim: coaster,
          ask: 'The first hill is 40 m. Can the car clear a second hill of 45 m? Type 1 for yes, 0 for no.',
          ans: 0, hint: 'Watch the note at the bottom of the picture.',
          sol: 'No. The car can never get higher than the hill it started from, because it only has the energy that hill gave it. Every coaster you have ever seen obeys this: the first hill is the tallest.' },
        { title: 'How fast at the bottom',
          say: 'Dropping height turns into speed. The formula is v = \u221a(2 \u00d7 9.8 \u00d7 height). A 40 m drop gives a very fast car.',
          anim: coaster,
          ask: 'Using v = \u221a(2 \u00d7 9.8 \u00d7 20), what is the speed after a 20 m drop, in metres per second, to one decimal place?',
          ans: 19.8, hint: '2 \u00d7 9.8 \u00d7 20 = 392, then take the square root.',
          sol: '\u221a392 = 19.8 m/s, which is about 71 km/h. Notice the height is multiplied by 9.8 twice over \u2014 the 2 and the square root come from the maths of falling.' },
        { title: 'Friction eats some of it',
          say: 'Real coasters lose energy to friction and air. If 15 per cent is lost, you only get 85 per cent of the height back on the next hill.',
          anim: null,
          ask: 'The first hill is 40 m and 15 per cent of the energy is lost. What is the highest the NEXT hill can be, in metres?',
          ans: 34, hint: '85 per cent of 40 m.',
          sol: '85 per cent of 40 is 34 m. That is why a coaster\u2019s hills get shorter as the ride goes on \u2014 friction is quietly taking its cut.' },
        { title: 'Design it',
          say: 'Now you are the designer. You have a 50 m first hill and you know you will lose 20 per cent to friction. Every hill after that has to fit inside what is left.',
          anim: null,
          ask: 'First hill 50 m, 20 per cent lost. What is the tallest your second hill can be, in metres?',
          ans: 40, hint: '80 per cent of 50 m.',
          sol: '80 per cent of 50 is 40 m. You have just designed the shape of a coaster: the tallest hill first, then every hill shorter than the one before it.' }
      ] },
    { key: 'bridge', icon: '\ud83c\udfd7\ufe0f', title: 'Build a bridge that holds', status: 'ready',
      hook: 'Why triangles never wobble, and how two supports share a load.',
      needs: ['balance', 'ratio'],
      steps: [
        { title: 'Why triangles never wobble',
          say: 'A square frame can be pushed into a diamond \u2014 its corners are free to move. A triangle cannot: once the three sides are fixed, the shape is locked. Press the button and watch.',
          anim: bridge,
          ask: 'Which shape holds its shape when you push the top? Type square or triangle.',
          ans: 'triangle', hint: 'Push it and see which one leans over.',
          sol: 'The triangle holds. Its three sides fix every angle, so it cannot change shape without a side changing length. That is why every bridge truss and every crane is built from triangles.' },
        { title: 'Two supports share the load',
          say: 'Put a weight in the middle of a beam resting on two supports, and each support takes half. Move the weight and the share changes.',
          anim: null,
          ask: 'A 600 kg load sits exactly in the middle of a beam on two supports. How many kg does each support take?',
          ans: 300, hint: 'Half each, because it is in the middle.',
          sol: '300 kg each. In the middle, the load is shared equally \u2014 the simplest case of the ratio that decides every bridge.' },
        { title: 'Off centre, and the ratio appears',
          say: 'Move the load off centre and the two supports stop sharing equally. The nearer support takes more, in proportion to the distances.',
          anim: null,
          ask: 'The load sits one third of the way along the beam, so it is twice as close to the left support. If the load is 600 kg, how many kg does the LEFT support take?',
          ans: 400, hint: 'The left support is twice as close, so it takes twice as much as the right one. The two shares add to 600.',
          sol: 'The left support takes 400 kg and the right takes 200 kg. Twice as close means twice the share \u2014 that is a ratio of 2 : 1, and it is how engineers work out where to put the piers of a bridge.' },
        { title: 'Put it together',
          say: 'You now know the two rules that decide a bridge: triangles for stiffness, and shares in a ratio for strength.',
          anim: null,
          ask: 'A 900 kg lorry sits one quarter of the way along a beam, so the left support is three times as close. How many kg does the LEFT support take?',
          ans: 675, hint: 'The shares are 3 : 1, and they add to 900.',
          sol: 'The shares are 3 : 1, so the left takes 675 kg and the right 225 kg. Nearest support, biggest share \u2014 always in the ratio of the distances.' }
      ] },
    { key: 'tennis', icon: '\ud83c\udfbe', title: 'The physics of a tennis shot', status: 'ready',
      hook: 'The angle that hits furthest, why topspin dips, and how long you have to react.',
      needs: ['speed', 'frac', 'ratio'],
      steps: [
        { title: 'The best angle',
          say: 'A ball thrown at some angle follows a curve. Too flat and it hits the ground early; too steep and it wastes its speed going up. Slide the angle and find the best one.',
          anim: tennis,
          ask: 'At what angle does the ball travel furthest? Give the number of degrees.',
          ans: 45, hint: 'Slide slowly past 40 and 50 and watch the distance.',
          sol: '45 degrees. It is the perfect split between going up and going along \u2014 the maths of sin(2\u03b8) is largest exactly at 45 degrees. Every ball sport has this number hiding in it.' },
        { title: 'Why topspin dips',
          say: 'A topspin shot spins forward. The spin pulls the ball down, so it lands shorter and lower \u2014 which is exactly why players can hit hard AND keep it in court. Look at the two curves.',
          anim: tennis,
          ask: 'Compared with a flat shot at the same speed, does a topspin shot land shorter or further? Type shorter or further.',
          ans: 'shorter', hint: 'Look at the orange curve against the blue one.',
          sol: 'The topspin shot lands shorter \u2014 the forward spin adds downward pull. That is the whole trick of modern tennis: hit as hard as you like, and the spin brings it down inside the lines.' },
        { title: 'Where to aim',
          say: 'A serve that lands deep is far harder to return than one that lands short. Players aim for the back three quarters of the service box.',
          anim: null,
          ask: 'The service box is 6 metres deep and you aim at 3/4 of the way back. How many metres from the net is that?',
          ans: 4.5, hint: '3/4 of 6.',
          sol: '4.5 metres from the net. Aiming deep gives your opponent less time \u2014 the same idea as the reaction-time maths in the next step.' },
        { title: 'The reaction time',
          say: 'A fast serve is about 200 km/h. The court is 23.77 m long. Work out how long the ball is in the air, and you have the time your opponent has to react.',
          anim: null,
          ask: '200 km/h is about 55.6 metres per second. How long does the ball take to cross 23.77 m? Give the answer in seconds to two decimal places.',
          ans: 0.43, hint: 'Time = distance \u00f7 speed: 23.77 \u00f7 55.6.',
          sol: '23.77 \u00f7 55.6 = 0.43 seconds. Less than half a second to see it, decide and move \u2014 which is why returning a big serve is one of the hardest things in sport.' }
      ] }
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
