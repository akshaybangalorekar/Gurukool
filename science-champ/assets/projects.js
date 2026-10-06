/* ============================================================
   SCIENCE-CHAMP - BUILD SOMETHING REAL
   Three projects, one for each way of doing science:

     code it     - a bouncing ball, written as a program
     wire it     - a torch circuit, built on paper then in your hands
     research it - a fair test, run properly and written up

   Each step teaches one idea, shows an animation or a simulation, then
   asks one question. Nothing is used before it is taught.
   ============================================================ */
(function () {

  /* ---------- animation: a ball falling, speeding up ---------- */
  function ballFall() {
    return {
      html:
        '<div id="sp-fall"><svg viewBox="0 0 420 220" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="220" fill="#eef2ff" rx="14"/>' +
        '<line x1="20" y1="200" x2="400" y2="200" stroke="#64748b" stroke-width="3"/>' +
        '<circle id="sp-ball" cx="60" cy="40" r="12" fill="#f59e0b"/>' +
        '<text id="sp-fall-v" x="16" y="28" fill="#1e1b4b" font-size="16" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '<text id="sp-fall-note" x="16" y="212" fill="#4338ca" font-size="14" font-weight="700" font-family="Nunito,sans-serif">gravity pulls it 9.8 metres per second faster, every second</text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><input id="sp-t" type="range" min="0" max="4" step="0.1" value="0" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Time falling: <span id="sp-tv">0.0</span> s</div></div>',
      start: function () {
        function draw() {
          var t = parseFloat(document.getElementById('sp-t').value);
          document.getElementById('sp-tv').textContent = t.toFixed(1);
          var v = 9.8 * t;                       /* speed in m/s */
          var drop = 4.9 * t * t;                /* metres fallen */
          var y = 40 + Math.min(150, drop * 12);
          document.getElementById('sp-ball').setAttribute('cy', y.toFixed(1));
          document.getElementById('sp-fall-v').textContent = 'speed ' + v.toFixed(1) + ' m/s  \u00b7  fallen ' + drop.toFixed(1) + ' m';
        }
        document.getElementById('sp-t').addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation: each bounce is shorter ---------- */
  function bounceHeights() {
    return {
      html:
        '<div id="sp-bounce"><svg viewBox="0 0 420 220" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="220" fill="#fff7ed" rx="14"/>' +
        '<line x1="20" y1="200" x2="400" y2="200" stroke="#64748b" stroke-width="3"/>' +
        '<g id="sp-bars"></g>' +
        '<text id="sp-bounce-note" x="16" y="28" fill="#7c2d12" font-size="15" font-weight="800" font-family="Nunito,sans-serif"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><input id="sp-keep" type="range" min="30" max="90" step="5" value="60" style="width:min(340px,90%)">' +
        '<div style="font:800 17px Nunito,system-ui,sans-serif;color:#0f172a;margin-top:6px">Energy kept each bounce: <span id="sp-keepv">60</span> per cent</div></div>',
      start: function () {
        function draw() {
          var keep = parseFloat(document.getElementById('sp-keep').value) / 100;
          document.getElementById('sp-keepv').textContent = Math.round(keep * 100);
          var h = 100, out = '', x = 40, i;
          for (i = 0; i < 6; i++) {
            var px = Math.max(3, h * 1.5);
            out += '<rect x="' + x + '" y="' + (200 - px) + '" width="38" height="' + px + '" rx="3" fill="#fb923c"/>' +
              '<text x="' + (x + 19) + '" y="' + (196 - px) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#7c2d12" font-family="Nunito,sans-serif">' + Math.round(h) + '</text>';
            x += 58;
            h = h * keep;
          }
          document.getElementById('sp-bars').innerHTML = out;
          document.getElementById('sp-bounce-note').textContent = 'heights in cm, if it starts at 100 cm';
        }
        document.getElementById('sp-keep').addEventListener('input', draw);
        draw();
      }
    };
  }

  /* ---------- animation: a circuit, open and closed ---------- */
  function circuitLoop() {
    return {
      html:
        '<div id="sp-cir"><svg viewBox="0 0 420 240" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="240" fill="#f8fafc" rx="14"/>' +
        '<path d="M90 70 L90 180 L330 180 L330 70 Z" fill="none" stroke="#334155" stroke-width="5"/>' +
        '<rect x="60" y="105" width="60" height="40" rx="6" fill="#facc15" stroke="#a16207" stroke-width="3"/>' +
        '<text x="90" y="130" text-anchor="middle" font-size="13" font-weight="800" fill="#78350f" font-family="Nunito,sans-serif">battery</text>' +
        '<circle id="sp-bulb" cx="210" cy="70" r="22" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>' +
        '<text x="210" y="122" text-anchor="middle" font-size="13" font-weight="800" fill="#475569" font-family="Nunito,sans-serif">bulb</text>' +
        '<line id="sp-gap" x1="250" y1="70" x2="290" y2="70" stroke="#f8fafc" stroke-width="5"/>' +
        '<circle id="sp-sw1" cx="250" cy="70" r="4" fill="#334155"/><circle id="sp-sw2" cx="290" cy="70" r="4" fill="#334155"/>' +
        '<line id="sp-sw" x1="250" y1="70" x2="290" y2="52" stroke="#334155" stroke-width="5"/>' +
        '<text id="sp-cir-note" x="210" y="222" text-anchor="middle" font-size="15" font-weight="800" fill="#475569" font-family="Nunito,sans-serif">the switch is open, so the loop is broken</text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><button class="sp-btn" id="sp-switch">\ud83d\udd18 Close the switch</button></div>',
      start: function () {
        var closed = false;
        function draw() {
          var bulb = document.getElementById('sp-bulb');
          var sw = document.getElementById('sp-sw');
          var note = document.getElementById('sp-cir-note');
          if (closed) {
            sw.setAttribute('x2', 290); sw.setAttribute('y2', 70);
            bulb.setAttribute('fill', '#fde047'); bulb.setAttribute('stroke', '#eab308');
            note.textContent = 'the loop is complete, so the bulb lights';
            document.getElementById('sp-switch').textContent = '\ud83d\udd18 Open the switch';
          } else {
            sw.setAttribute('x2', 290); sw.setAttribute('y2', 52);
            bulb.setAttribute('fill', '#e2e8f0'); bulb.setAttribute('stroke', '#64748b');
            note.textContent = 'the switch is open, so the loop is broken';
            document.getElementById('sp-switch').textContent = '\ud83d\udd18 Close the switch';
          }
        }
        document.getElementById('sp-switch').onclick = function () { closed = !closed; draw(); };
        draw();
      }
    };
  }

  /* ---------- animation: two bulbs in series and in parallel ---------- */
  function bulbs() {
    return {
      html:
        '<div id="sp-bulbs"><svg viewBox="0 0 420 250" style="width:100%;max-width:420px;display:block;margin:0 auto">' +
        '<rect width="420" height="250" fill="#f8fafc" rx="14"/>' +
        '<text x="110" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#334155" font-family="Nunito,sans-serif">in series (one path)</text>' +
        '<text x="310" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#334155" font-family="Nunito,sans-serif">in parallel (two paths)</text>' +
        '<g id="sp-series"></g><g id="sp-parallel"></g>' +
        '<text id="sp-bulb-note" x="210" y="240" text-anchor="middle" font-size="14" font-weight="800" fill="#475569" font-family="Nunito,sans-serif"></text>' +
        '</svg></div>' +
        '<div style="text-align:center;margin-top:10px"><button class="sp-btn" id="sp-break">\ud83d\udca5 Break one bulb</button><button class="sp-btn" id="sp-fix">\u21ba Fix it</button></div>',
      start: function () {
        function draw(broken) {
          var s = '<path d="M30 60 L190 60 L190 150 L30 150 Z" fill="none" stroke="#334155" stroke-width="4"/>';
          s += '<circle cx="110" cy="60" r="16" fill="' + (broken === 'first' ? '#94a3b8' : '#fde047') + '" stroke="#64748b" stroke-width="2"/>';
          s += '<circle cx="110" cy="150" r="16" fill="#fde047" stroke="#64748b" stroke-width="2"/>';
          document.getElementById('sp-series').innerHTML = s;
          var p = '<path d="M230 60 L390 60 L390 150 L230 150 Z" fill="none" stroke="#334155" stroke-width="4"/>';
          p += '<line x1="310" y1="60" x2="310" y2="150" stroke="#334155" stroke-width="4"/>';
          p += '<circle cx="270" cy="105" r="16" fill="#fde047" stroke="#64748b" stroke-width="2"/>';
          p += '<circle cx="350" cy="105" r="16" fill="' + (broken === 'parallel' ? '#94a3b8' : '#fde047') + '" stroke="#64748b" stroke-width="2"/>';
          document.getElementById('sp-parallel').innerHTML = p;
          document.getElementById('sp-bulb-note').textContent = broken === 'first'
            ? 'In series, breaking one bulb stops BOTH \\u2014 the single path is cut.'
            : (broken === 'parallel' ? 'In parallel, the other bulb stays lit \\u2014 it has its own path.' : 'Press break and watch what happens in each arrangement.');
        }
        document.getElementById('sp-break').onclick = function () { draw('first'); };
        document.getElementById('sp-fix').onclick = function () { draw(null); };
        draw(null);
      }
    };
  }

  var LIST = [
    { key: 'code-ball', icon: '\ud83d\udcbb', title: 'Code a bouncing ball', status: 'ready',
      hook: 'Write a program where a ball falls, bounces and loses energy each time.',
      needs: ['physics', 'heat'],
      steps: [
        { title: 'Falling is getting faster',
          say: 'Drop a ball and it does not fall at a steady speed \\u2014 it speeds up. Gravity adds 9.8 metres per second of speed, every second. Slide the time and watch the speed build.',
          anim: ballFall,
          ask: 'After 2 seconds of falling, how fast is the ball going, in metres per second?',
          ans: 19.6, hint: '9.8 added every second, for 2 seconds.',
          sol: '9.8 \\u00d7 2 = 19.6 m/s. That is why falling things feel so fast at the end \\u2014 the speed keeps adding up.' },
        { title: 'Every bounce is shorter',
          say: 'When a ball bounces, some energy goes into sound, heat and squashing the ball. It never comes back as high. If it keeps 60 per cent of its height, each bounce is 60 per cent of the one before.',
          anim: bounceHeights,
          ask: 'A ball dropped from 100 cm bounces to 60 cm. If it keeps 60 per cent each time, how high is the NEXT bounce, in cm?',
          ans: 36, hint: '60 per cent of 60 cm.',
          sol: '60 \\u00d7 0.6 = 36 cm. Each bounce is a percentage of the last one, so the heights fall away quickly \\u2014 that is a shrinking series.' },
        { title: 'The loop that makes it a program',
          say: 'A program is just a list of steps that repeats. For a bouncing ball the loop is: move it, check if it hit the floor, if it did, turn the speed around and lose some energy, then go back to the start.',
          anim: null,
          ask: 'The ball starts at 100 cm and each bounce is 60 per cent of the last. How many bounces before it is below 10 cm? (100, 60, 36, ...)',
          ans: 5, hint: 'Keep multiplying by 0.6 until you drop below 10: 100, 60, 36, 21.6, 12.96, 7.78.',
          sol: '100 \\u2192 60 \\u2192 36 \\u2192 21.6 \\u2192 12.96 \\u2192 7.78. That is 5 bounces before it drops under 10 cm. Writing that loop is exactly what the program does, thousands of times a second.' },
        { title: 'Tuning it',
          say: 'Now you are the programmer. Change one number and the whole behaviour changes \\u2014 that is the fun of coding physics.',
          anim: null,
          ask: 'You want the ball to bounce for LONGER. Should the energy kept per bounce go UP or DOWN? Type up or down.',
          ans: 'up', hint: 'More energy kept means higher bounces, which last longer.',
          sol: 'Keep more energy and it bounces higher for longer. Change the number, watch the behaviour \\u2014 that loop of change-and-observe is how real physics simulations are built.' }
      ] },
    { key: 'torch', icon: '\ud83d\udd0c', title: 'Build a torch circuit', status: 'ready',
      hook: 'A battery, a switch and a bulb. Work out why it only lights when the loop is complete.',
      needs: ['elec'],
      steps: [
        { title: 'Electricity needs a complete loop',
          say: 'A circuit is a closed loop. Electricity leaves one end of the battery, goes round, and must get back to the other end. Break the loop anywhere and everything stops. Press the switch and watch.',
          anim: circuitLoop,
          ask: 'The bulb is dark. What has to be true before it will light? Type complete or broken.',
          ans: 'complete', hint: 'Look at the gap in the wire.',
          sol: 'The loop must be complete. A break anywhere \\u2014 a switch, a loose wire, a dead bulb \\u2014 stops the whole circuit. That is why a torch does nothing when the switch is off.' },
        { title: 'Two bulbs, two arrangements',
          say: 'Bulbs can be in series (one path through both) or in parallel (each has its own path). It matters enormously when something breaks.',
          anim: bulbs,
          ask: 'In SERIES, if one bulb breaks, does the other one stay lit? Type yes or no.',
          ans: 'no', hint: 'There is only one path for the electricity.',
          sol: 'No \\u2014 in series there is a single path, so one break stops everything. In parallel each bulb has its own path, which is why house lights are wired that way.' },
        { title: 'The switch is just a gap you control',
          say: 'A switch is nothing clever: it is a gap in the loop that you can open and close. That is the whole of it.',
          anim: circuitLoop,
          ask: 'In the simplest torch circuit, how many separate paths are there from the battery, round the bulb and back?',
          ans: 1, hint: 'Count the loops in the picture.',
          sol: 'One path. The simplest circuit is a single loop: battery, wire, bulb, wire, back to the battery.' },
        { title: 'Design your own torch',
          say: 'Real torches use two or more batteries in a row. In series the voltages add up.',
          anim: null,
          ask: 'A torch has 2 batteries of 1.5 volts each, in series. What is the total voltage?',
          ans: 3, hint: '1.5 + 1.5.',
          sol: '3 volts. Batteries in series add their voltages \\u2014 which is why a torch takes two cells instead of one bigger one.' }
      ] },
    { key: 'fairtest', icon: '\ud83d\udd2c', title: 'Run a fair test', status: 'ready',
      hook: 'Ask a question, change ONE thing, keep a results table, and write what you found.',
      needs: ['bio', 'heat'],
      steps: [
        { title: 'One thing at a time',
          say: 'To find out what causes something, you change ONE thing and keep everything else the same. Change two things and you cannot tell which one did it.',
          anim: null,
          ask: 'You want to know whether warm water helps seeds grow. How many things should you change between your two groups?',
          ans: 1, hint: 'Only the thing you are testing.',
          sol: 'Exactly one: the water temperature. Same seed, same soil, same light, same amount of water \\u2014 only the temperature differs. Then any difference in growth must be down to the temperature.' },
        { title: 'You need something to compare with',
          say: 'A fair test needs a second group where you did NOT change anything. That is the control.',
          anim: null,
          ask: 'The group where you change nothing, to compare against, is called the ... what? (one word)',
          ans: 'control', hint: 'It starts with c.',
          sol: 'The control. Without it you have nothing to compare with, and your result means nothing.' },
        { title: 'Read your own results',
          say: 'Now the interesting part. Here is a real results table from that seed test, after three weeks.',
          anim: null,
          ask: 'Warm water: the shoot reached 8 cm. Cold water: 3 cm. What is the difference, in cm?',
          ans: 5, hint: '8 \\u2212 3.',
          sol: '8 \\u2212 3 = 5 cm. The warm-water group grew 5 cm taller. Because only the temperature differed, that difference is down to the temperature.' },
        { title: 'Say only what you can prove',
          say: 'The last step is writing a conclusion that does not overreach. You can say what your test showed \\u2014 and you should say what surprised you, because that is where new questions come from.',
          anim: null,
          ask: 'Only the water temperature differed between the groups. So what caused the difference in growth? Type temperature or seed.',
          ans: 'temperature', hint: 'Which was the one thing you changed?',
          sol: 'The temperature \\u2014 because it was the only difference. That is the power of a fair test: it lets you say the word caused. And a good scientist always writes down what surprised them.' }
      ] },
    { key: 'rocket-paper', icon: '\ud83d\ude80', title: 'Design a paper rocket', status: 'soon',
      hook: 'Fins, nose cone, launch angle. Measure, change one thing, measure again.',
      needs: ['flight', 'physics'], steps: [] },
    { key: 'seeds', icon: '\ud83c\udf31', title: 'Grow a seed under three conditions', status: 'soon',
      hook: 'Light, dark and cold. One difference each, drawn as a bar chart.',
      needs: ['bio'], steps: [] },
    { key: 'machine', icon: '\ud83e\udde0', title: 'Explain a machine in one page', status: 'soon',
      hook: 'Research how a fridge, a microwave or a bicycle gear really works, and write it as if teaching a younger child.',
      needs: ['physics'], steps: [] }
  ];

  window.ScienceProjects = {
    list: LIST,
    byKey: function (k) { for (var i = 0; i < LIST.length; i++) if (LIST[i].key === k) return LIST[i]; return null; },
    /* a project opens when the worlds it needs are at least at 1 star */
    check: function (worldsStars, p) {
      var missing = [];
      p.needs.forEach(function (id) {
        var s = worldsStars(id) || 0;
        if (s < 1) missing.push(id);
      });
      return { ok: missing.length === 0, missing: missing };
    }
  };
})();
