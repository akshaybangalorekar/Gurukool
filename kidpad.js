/* ============================================================
   GURUKOOL - THE KID PAD
   One on-screen keypad for every champ, so the iPad's own keyboard
   never creeps up over the question.

   WHAT IT DOES
   - Finds every answer box on the page and switches it to a mode that
     does NOT bring up the iPad keyboard.
   - Puts a maths keypad at the bottom of the screen: 0-9, + - x / ( ) = < >
     and a square root, square and cube key, plus backspace.
   - A microphone key for when the answer is a word: tap it, speak, and the
     words land in the box.
   - GO presses the page's own Check/Submit button.
   - If the microphone is not available (no internet, permission refused),
     a small keyboard key appears so the answer can still be typed. There is
     never a dead end.

   Pages opt an input out with data-nokidpad, e.g. a name field.
   ============================================================ */
(function () {
  if (window.KidPad) return;

  /* ---------- the keys ---------- */
  /* Two rows only, so the pad stays out of the way. Thirteen keys a row,
     each at least 44px so a finger can hit it comfortably. */
  var ROWS = [
    [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'],
     ['7', '7'], ['8', '8'], ['9', '9'], ['0', '0'], ['.', '.'], ['back', '\u232B'], ['mic', '\uD83C\uDFA4']],
    [['+', '+'], ['-', '\u2212'], ['\u00D7', '\u00D7'], ['\u00F7', '\u00F7'], ['=', '='],
     ['(', '('], [')', ')'], ['<', '<'], ['>', '>'], ['root', '\u221A'], ['sq', 'x\u00B2'], ['cb', 'x\u00B3'], ['go', 'GO \u2713']]
  ];
  var INSERT = { root: '\u221A', sq: '^2', cb: '^3' };

  /* ---------- which boxes are answer boxes ---------- */
  var SKIP_TYPE = { range: 1, checkbox: 1, radio: 1, password: 1, file: 1, color: 1, submit: 1, button: 1, hidden: 1 };
  /* only the placeholder is trusted: a settings or name field says so there.
     Ids and class names are not read, because a generated id can contain
     any letters at all. */
  var SKIP_WORD = /name|token|email|repo|file|search|filter|password/i;

  function looksLikeAnswerBox(el) {
    if (!el || el.nodeType !== 1) return false;
    var tag = (el.tagName || '').toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') return false;
    var type = (el.getAttribute('type') || 'text').toLowerCase();
    if (tag === 'input' && SKIP_TYPE[type]) return false;
    if (el.hasAttribute('data-nokidpad')) return false;
    if (el.closest && el.closest('[data-nokidpad], .nokidpad, #parent-console, #pconsole, .admin, #admin')) return false;
    if (SKIP_WORD.test(el.getAttribute('placeholder') || '')) return false;
    return true;
  }

  function answerBoxes() {
    var all = document.querySelectorAll('input, textarea');
    var out = [];
    for (var i = 0; i < all.length; i++) if (looksLikeAnswerBox(all[i])) out.push(all[i]);
    return out;
  }

  function visible(el) {
    if (!el || el.disabled || el.readOnly) return false;
    if (!el.offsetParent && el.offsetHeight === 0) return false;
    var r = el.getBoundingClientRect();
    return r.width > 4 && r.height > 4;
  }

  /* ---------- stop the iPad keyboard ---------- */
  function tame(el) {
    if (el.getAttribute('data-kidpad') === '1') return;
    el.setAttribute('data-kidpad', '1');
    try { el.setAttribute('inputmode', 'none'); } catch (e) {}
    try { if (el.tagName === 'INPUT') el.setAttribute('type', 'text'); } catch (e) {}
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', 'off');
    el.setAttribute('spellcheck', 'false');
  }

  /* ---------- the pad ---------- */
  var pad = null, statusEl = null, current = null, listening = false, rec = null;

  function build() {
    var css = document.createElement('style');
    css.textContent =
      '#kidpad{position:fixed;left:0;right:0;bottom:0;z-index:950;display:none;' +
      'padding:5px 6px calc(5px + env(safe-area-inset-bottom));background:rgba(30,27,24,.97);' +
      'border-radius:16px 16px 0 0;box-shadow:0 -8px 28px rgba(0,0,0,.32);}' +
      '#kidpad.show{display:block;}' +
      '#kidpad .kp-status{color:#fdf6e8;font:600 13px/1.3 Nunito,system-ui,sans-serif;text-align:center;margin:0 0 3px;}' +
      '#kidpad .kp-status:empty{display:none;}' +
      '#kidpad .kp-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px;}' +
      '#kidpad .kp-row.kp-last{display:none;margin-bottom:0;}' +
      '#kidpad .kp-row.kp-last.on{display:flex;}' +
      '#kidpad button{flex:1 1 44px;min-width:44px;min-height:56px;font:800 22px/1 Nunito,system-ui,sans-serif;' +
      'border:0;border-radius:11px;background:#fdf6e8;color:#22201d;cursor:pointer;' +
      'touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;}' +
      '#kidpad button:active{transform:translateY(2px);background:#f3d9a4;}' +
      '#kidpad .kp-soft{background:#e8e0cf;font-size:21px;}' +
      '#kidpad .kp-go{background:#2a9d8f;color:#fff;font-size:18px;letter-spacing:.3px;flex:1 1 60px;}' +
      '#kidpad .kp-mic{background:#e8e0cf;}' +
      '#kidpad .kp-mic.listening{background:#ef5350;color:#fff;animation:kpulse 1s infinite;}' +
      '@keyframes kpulse{50%{opacity:.55;}}' +
      'body.kidpad-open{padding-bottom:140px;}';
    document.head.appendChild(css);

    pad = document.createElement('div');
    pad.id = 'kidpad';
    pad.setAttribute('aria-hidden', 'true');
    var html = '<div class="kp-status" id="kp-status"></div>';
    ROWS.forEach(function (row) {
      html += '<div class="kp-row">';
      row.forEach(function (k) {
        var cls = 'kp-' + k[0];
        if (k[0] === 'back' || k[0] === 'root' || k[0] === 'sq' || k[0] === 'cb') cls = 'kp-soft';
        if (k[0] === 'mic') cls = 'kp-mic';
        html += '<button type="button" data-k="' + k[0] + '" class="' + cls + '"' +
          (k[0] === 'back' ? ' aria-label="Backspace"' : k[0] === 'mic' ? ' aria-label="Speak your answer"' : '') +
          '>' + k[1] + '</button>';
      });
      html += '</div>';
    });
    html += '<div class="kp-row kp-last"><button type="button" data-k="kb" class="kp-soft" id="kp-kb" style="display:none" aria-label="Use the keyboard">\u2328</button></div>';
    pad.innerHTML = html;
    document.body.appendChild(pad);
    statusEl = pad.querySelector('#kp-status');

    pad.addEventListener('pointerdown', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      e.preventDefault();
      var k = b.getAttribute('data-k');
      if (k === 'mic') { toggleMic(); return; }
      var t = target();
      if (!t) return;
      if (k === 'go') { go(t); return; }
      if (k === 'kb') { openKeyboard(t); return; }
      if (k === 'back') { del(t); return; }
      if (k === '-') { minus(t); return; }
      if (k === '.') { point(t); return; }
      insert(t, INSERT[k] !== undefined ? INSERT[k] : k);
    });
  }

  function target() {
    if (current && visible(current)) return current;
    var boxes = answerBoxes();
    for (var i = 0; i < boxes.length; i++) if (visible(boxes[i])) { current = boxes[i]; return current; }
    return null;
  }

  function caret(t) {
    try { var s = t.selectionStart; if (typeof s === 'number') return s; } catch (e) {}
    return (t.value || '').length;
  }
  function fire(t) { t.dispatchEvent(new Event('input', { bubbles: true })); }

  function insert(t, str) {
    var v = t.value || '', c = caret(t);
    t.value = v.slice(0, c) + str + v.slice(c);
    try { t.setSelectionRange(c + str.length, c + str.length); } catch (e) {}
    fire(t);
  }
  function del(t) {
    var v = t.value || '', c = caret(t);
    if (c <= 0) return;
    t.value = v.slice(0, c - 1) + v.slice(c);
    try { t.setSelectionRange(c - 1, c - 1); } catch (e) {}
    fire(t);
  }
  function minus(t) {
    var v = t.value || '';
    if (v.charAt(0) === '-') { t.value = v.slice(1); } else { t.value = '-' + v; }
    fire(t);
  }
  function point(t) {
    var v = t.value || '';
    if (v.indexOf('.') !== -1) return;
    t.value = (v === '' || v === '-') ? v + '0.' : v + '.';
    fire(t);
  }

  /* GO: press the page's own button, the way a finger would */
  function go(t) {
    var btn = null, scope = t.closest ? (t.closest('.s-panel, .panel, .card, section, div') || document) : document;
    if (t.hasAttribute && t.hasAttribute('data-go')) {
      btn = document.getElementById(t.getAttribute('data-go'));
    }
    if (!btn && scope.querySelectorAll) {
      var cands = scope.querySelectorAll('button, a.btn, [role="button"]');
      for (var i = 0; i < cands.length; i++) {
        var txt = (cands[i].textContent || '').trim();
        if (/^(check|submit|verify|go|done|answer|next|send|ok)\b/i.test(txt) && visible(cands[i])) { btn = cands[i]; break; }
      }
    }
    if (btn) { btn.click(); return; }
    var e = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });
    t.dispatchEvent(e);
  }

  /* last resort: let the real keyboard in, so a word answer is never stuck */
  function openKeyboard(t) {
    t.removeAttribute('inputmode');
    t.setAttribute('data-kidpad', '0');
    t.focus();
    try { t.click(); } catch (e) {}
  }

  /* ---------- the microphone ---------- */
  var UN = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60,
    seventy: 70, eighty: 80, ninety: 90 };
  var SC = { hundred: 100, thousand: 1000, lakh: 100000, lakhs: 100000, crore: 10000000, crores: 10000000 };
  var OPS = { plus: '+', add: '+', minus: '-', negative: '-', times: '\u00D7', multiply: '\u00D7',
    divide: '\u00F7', over: '\u00F7', 'square root': '\u221A', root: '\u221A' };

  function voiceToMath(text) {
    var s = ' ' + String(text).toLowerCase() + ' ';
    s = s.replace(/multiplied by/g, ' times ').replace(/divided by/g, ' divide ')
         .replace(/equals|equal to|is equal/g, ' = ')
         .replace(/rupees|rupee|rs\.?|percent|percentage|answer|only/g, ' ');
    var toks = s.replace(/[^a-z0-9.+= ]/g, ' ').split(/\s+/).filter(Boolean);
    var out = '', total = 0, cur = null, dec = '', inDec = false, lastUnit = false, lastTens = false;
    function flush() {
      if (cur !== null || dec !== '' || total) out += (total + (cur === null ? 0 : cur)) + (dec ? '.' + dec : '');
      total = 0; cur = null; dec = ''; inDec = false;
    }
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i];
      if (t === '.' || t === 'point' || t === 'dot') { inDec = true; continue; }
      if (OPS[t] || t === '=') { flush(); out += (t === '=' ? '=' : OPS[t]); continue; }
      if (t === 'and') continue;
      if (/^\d+$/.test(t)) {
        if (inDec) dec += t;
        else if (cur === null) { cur = parseInt(t, 10); lastUnit = true; }
        else cur = parseInt(String(cur) + t, 10);
        continue;
      }
      if (t in UN) {
        var uv = UN[t];
        if (inDec) dec += uv;
        else if (uv < 10 && lastUnit && cur !== null) cur = cur * 10 + uv;
        else if (uv < 10 && lastTens && cur !== null) cur = cur + uv;
        else cur = (cur === null ? 0 : cur) + uv;
        lastUnit = uv < 10; lastTens = uv >= 20;
        continue;
      }
      if (t in SC) {
        var sv = SC[t];
        if (sv === 100) cur = (cur === null ? 1 : cur) * 100;
        else { cur = (cur === null ? 1 : cur) * sv; total += cur; cur = null; }
        lastUnit = false; lastTens = false;
        continue;
      }
    }
    flush();
    return out.replace(/^\s+/, '');
  }

  function status(msg, sticky) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    if (statusEl._t) clearTimeout(statusEl._t);
    if (msg && !sticky) statusEl._t = setTimeout(function () { statusEl.textContent = ''; }, 5000);
  }

  function micAvailable() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function toggleMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      status('\uD83C\uDFA4 Voice needs internet \u2014 use the \u2328 key to type instead');
      showKeyboardKey(true);
      return;
    }
    if (listening && rec) { try { rec.stop(); } catch (e) {} return; }
    var t = target();
    if (!t) { status('Tap the answer box first'); return; }
    rec = new SR();
    rec.lang = t.getAttribute('data-lang') || 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    var micBtn = pad.querySelector('.kp-mic');
    rec.onstart = function () { listening = true; if (micBtn) micBtn.classList.add('listening'); status('\uD83C\uDFA4 Listening\u2026 speak now', true); };
    rec.onresult = function (e) {
      var tr = e.results[0][0].transcript || '';
      var wordy = (t.getAttribute('data-voice') || '') === 'word';
      var maths = wordy ? '' : voiceToMath(tr);
      var use = (maths && /\d/.test(maths)) ? maths : tr.trim();
      status('\uD83C\uDFA4 Heard: ' + (use || tr));
      if (use) insert(t, use);
    };
    rec.onerror = function (e) {
      var err = e && e.error ? e.error : 'failed';
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        status('\uD83C\uDFA4 Allow the microphone, or use the \u2328 key');
        showKeyboardKey(true);
      } else if (err === 'network') {
        status('\uD83C\uDFA4 Voice needs internet \u2014 use the \u2328 key');
        showKeyboardKey(true);
      } else {
        status('\uD83C\uDFA4 ' + err);
      }
    };
    rec.onend = function () { listening = false; if (micBtn) micBtn.classList.remove('listening'); };
    try { rec.start(); } catch (err) { status('\uD83C\uDFA4 ' + (err && err.message ? err.message : 'failed')); showKeyboardKey(true); }
  }

  function showKeyboardKey(on) {
    var k = pad.querySelector('#kp-kb');
    if (k) k.style.display = on ? '' : 'none';
    var row = pad.querySelector('.kp-last');
    if (row) row.className = 'kp-row kp-last' + (on ? ' on' : '');
  }

  /* ---------- show / hide ---------- */
  function refresh() {
    var boxes = answerBoxes();
    var any = false, first = null;
    for (var i = 0; i < boxes.length; i++) {
      tame(boxes[i]);
      if (visible(boxes[i])) { any = true; if (!first) first = boxes[i]; }
    }
    if (any && !visible(current)) current = first;
    if (pad) {
      if (any) { pad.classList.add('show'); pad.setAttribute('aria-hidden', 'false'); document.body.classList.add('kidpad-open'); }
      else { pad.classList.remove('show'); pad.setAttribute('aria-hidden', 'true'); document.body.classList.remove('kidpad-open'); }
    }
    if (!micAvailable()) showKeyboardKey(true);
  }

  function boot() {
    if (!document.body) return;
    /* Some pages call .focus() the instant they draw the answer box. Tame the
       box first, or iOS may raise its keyboard before we get the chance. */
    try {
      var _focus = HTMLInputElement.prototype.focus;
      HTMLInputElement.prototype.focus = function () {
        try { if (looksLikeAnswerBox(this)) tame(this); } catch (e) {}
        return _focus.apply(this, arguments);
      };
      var _tfocus = HTMLTextAreaElement.prototype.focus;
      HTMLTextAreaElement.prototype.focus = function () {
        try { if (looksLikeAnswerBox(this)) tame(this); } catch (e) {}
        return _tfocus.apply(this, arguments);
      };
    } catch (e) {}
    build();
    refresh();
    document.addEventListener('focusin', function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-kidpad') === '1') { current = t; }
    });
    /* the question changes as he plays, so keep watch */
    try {
      new MutationObserver(function () { setTimeout(refresh, 60); })
        .observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
    setInterval(refresh, 300);
    document.addEventListener('touchstart', function () { refresh(); }, { passive: true });
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', function () { setTimeout(refresh, 250); });
  }

  window.voiceToMath = voiceToMath;   /* kept for the pages that already called it */
  window.KidPad = { refresh: refresh, voiceToMath: voiceToMath, boxes: answerBoxes };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
