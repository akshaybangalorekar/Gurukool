/* ============================================================
   WORD-CHAMP - asking one question, and being fair about the answer.

   Used by the session, by Learn, by Games and by Challenge, so a
   question looks and behaves the same everywhere.

   Two tries, then the rule is shown. The rule is the point: English
   is not guesswork, and every question here says WHY.
   ============================================================ */
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ask(host, q, opts) - renders one question and reports how it went.
     opts: { onResult: function (firstTryCorrect, anyCorrect) {} }        */
  function ask(host, q, opts) {
    opts = opts || {};
    var tries = 0, answered = false;
    var uid = 'wq' + Math.random().toString(36).slice(2, 8);

    function draw() {
      var h = '';
      if (q.art) h += q.art;
      h += '<p class="r-ask" style="font-size:20px">' + esc(q.q) + '</p>';
      if (q.choices) {
        h += q.choices.map(function (c, i) {
          return '<button class="wc-opt" id="' + uid + '-' + i + '" data-v="' + esc(c) + '">' + esc(c) + '</button>';
        }).join('');
      } else {
        h += '<input class="r-in" id="' + uid + '-in" autocomplete="off" placeholder="type your answer"> ' +
             '<button class="r-btn p" id="' + uid + '-check">Check</button>';
      }
      h += '<p class="r-fb" id="' + uid + '-fb"></p><div id="' + uid + '-sol"></div>';
      host.innerHTML = h;

      var inp = document.getElementById(uid + '-in');
      if (inp) {
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } });
        inp.focus();
      }
      if (q.choices) {
        q.choices.forEach(function (c, i) {
          document.getElementById(uid + '-' + i).addEventListener('click', function () { pick(c, i); });
        });
      } else {
        document.getElementById(uid + '-check').addEventListener('click', check);
      }
    }

    /* A choice is either right or it is not: "definately" must never be
       accepted because it is nearly "definitely". Fuzzy matching is only
       for answers the child TYPES himself. */
    function same(a, b) { return String(a == null ? '' : a).trim().toLowerCase() === String(b == null ? '' : b).trim().toLowerCase(); }
    function correct(v, isChoice) {
      if (isChoice) return same(v, q.ans);
      if (window.AnswerCheck) return AnswerCheck.matches(v, q.ans);
      return same(v, q.ans);
    }

    function win() {
      answered = true;
      var fb = document.getElementById(uid + '-fb');
      fb.className = 'r-fb ok';
      fb.textContent = tries === 0 ? 'Correct — and you know why.' : 'Correct.';
      if (window.Rhythm) Rhythm.note(true);
      document.getElementById(uid + '-sol').innerHTML =
        '<div class="r-sol"><b>Why</b><p style="margin:8px 0 0">' + esc(q.sol) + '</p>' +
        '<button class="r-btn p" style="margin-top:12px" id="' + uid + '-next">Carry on \u2192</button></div>';
      document.getElementById(uid + '-next').addEventListener('click', function () {
        if (opts.onResult) opts.onResult(tries === 0, true);
      });
    }

    function lose() {
      answered = true;
      var fb = document.getElementById(uid + '-fb');
      fb.className = 'r-fb no';
      fb.textContent = 'Not quite — here is the rule, then carry on.';
      if (window.Rhythm) Rhythm.note(false);
      document.getElementById(uid + '-sol').innerHTML =
        '<div class="r-sol"><b>The answer is "' + esc(q.ans) + '"</b><p style="margin:8px 0 0">' + esc(q.sol) + '</p>' +
        '<button class="r-btn p" style="margin-top:12px" id="' + uid + '-next">Carry on \u2192</button></div>';
      document.getElementById(uid + '-next').addEventListener('click', function () {
        if (opts.onResult) opts.onResult(false, false);
      });
    }

    function wrongOnce() {
      var fb = document.getElementById(uid + '-fb');
      fb.className = 'r-fb no';
      fb.textContent = 'Not yet. ' + ((q.hints || [])[0] || 'Read it again slowly.');
      if (window.Rhythm) Rhythm.note(false);
      document.getElementById(uid + '-know') && (document.getElementById(uid + '-know').innerHTML = '');
    }

    function pick(c, i) {
      if (answered) return;
      var btn = document.getElementById(uid + '-' + i);
      if (correct(c, true)) { btn.className = 'wc-opt ok'; win(); return; }
      tries++;
      btn.className = 'wc-opt no'; btn.disabled = true;
      if (tries === 1) wrongOnce();
      else {
        q.choices.forEach(function (cc, j) {
          if (correct(cc, true)) document.getElementById(uid + '-' + j).className = 'wc-opt ok';
        });
        lose();
      }
    }

    function check() {
      if (answered) return;
      var inp = document.getElementById(uid + '-in');
      var v = inp ? inp.value : '';
      if (!String(v).trim()) {
        var fb = document.getElementById(uid + '-fb');
        fb.className = 'r-fb no'; fb.textContent = 'Type your answer first — a guess is fine.';
        return;
      }
      if (correct(v, false)) { win(); return; }
      tries++;
      if (tries === 1) wrongOnce();
      else lose();
    }

    draw();
  }

  window.WordQ = { ask: ask, esc: esc };
})();
