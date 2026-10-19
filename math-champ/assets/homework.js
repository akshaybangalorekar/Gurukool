/* ============================================================
   MATH-CHAMP - THE HOMEWORK CLUB
   Only the kinds of question Atharv's teacher actually sets.
   Nothing else goes in here.

   The five types in the worksheet of 1 Oct 2026 (questions 4, 5, 6, 11, 12):
     1. fractions on BOTH sides of an equation      (2x+1)/3 = (x+5)/2
     2. two fractions of x added together           x/3 + x/4 = 7
     3. a word problem that hides an equation       3x + 5 = 5x - 3
     4. two adjacent angles on a straight line      (4x+10) + (2x-10) = 180
     5. two fractions subtracted                   (x-1)/2 - (x-3)/3 = 2

   Every question is built so the answer is a whole number, the four choices
   are the four things children actually write, and the working is shown.
   ============================================================ */
(function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* build the four choices: the right answer plus three that children really write */
  function choices(right, wrongs) {
    var seen = {}; seen[right] = 1;
    var opts = [right];
    (wrongs || []).forEach(function (w) {
      if (w === null || w === undefined) return;
      if (!isFinite(w)) return;
      if (Math.abs(w - Math.round(w)) > 1e-9) return;
      w = Math.round(w);
      if (seen[w]) return;
      seen[w] = 1; opts.push(w);
    });
    /* always end up with four: fall back to numbers either side of the answer */
    var k = 1;
    while (opts.length < 4 && k <= 60) {
      [right + k, right - k].forEach(function (cand) {
        if (opts.length < 4 && !seen[cand]) { seen[cand] = 1; opts.push(cand); }
      });
      k++;
    }
    var mixed = shuffle(opts.slice(0, 4));
    return { list: mixed, answer: mixed.indexOf(right) };
  }

  /* ============================================================
     TYPE 1 - a fraction on each side.  (ax+b)/c = (dx+e)/f
     ============================================================ */
  function typeFractionBothSides() {
    for (var guard = 0; guard < 400; guard++) {
      var x = ri(3, 16), a = ri(1, 4), d = ri(1, 4), c = ri(2, 6), f = ri(2, 6);
      if (a === d && c === f) continue;
      if (a * f === d * c) continue;                 /* the x's must not cancel */
      var b = ri(1, 9);
      var top = f * (a * x + b) - c * d * x;         /* so that c*(dx+e) = f*(ax+b) */
      if (top % c !== 0) continue;
      var e = top / c;
      if (e < 1 || e > 40) continue;
      var wrongs = [
        (c * e + f * b) / (f * a + c * d),           /* added instead of subtracting */
        (c * e - f * b) / (f * a - c * d),           /* the other sign slip */
        (c * e + f * b) / (f * a - c * d),
        (f * b - c * e) / (f * a - c * d),
        x + ri(1, 3), x - ri(1, 3)
      ].map(function (v) { return (isFinite(v) && Math.abs(v - Math.round(v)) < 1e-9) ? Math.round(v) : null; });
      var ch = choices(x, wrongs);
      if (ch.list.length < 4) continue;
      return {
        q: 'Solve the linear equation:  (' + a + 'x + ' + b + ') / ' + c + '  =  (' + (d === 1 ? '' : d) + 'x + ' + e + ') / ' + f,
        options: ch.list.map(function (v) { return 'x = ' + v; }), answer: ch.answer,
        know: ['There is a fraction on each side', 'Cross-multiply: top-left × bottom-right = top-right × bottom-left',
               'Then gather all the x terms on one side'],
        hints: ['Multiply both sides by ' + c + ' and by ' + f + ' to clear the fractions.',
                 f + ' × (' + a + 'x + ' + b + ') = ' + c + ' × (' + (d === 1 ? '' : d) + 'x + ' + e + ')' + '.'],
        sol: 'Cross-multiply: ' + f + '(' + a + 'x + ' + b + ') = ' + c + '(' + (d === 1 ? '' : d) + 'x + ' + e + ') → ' +
             (f * a) + 'x + ' + (f * b) + ' = ' + (c * d) + 'x + ' + (c * e) + ' → ' +
             (f * a - c * d) + 'x = ' + (c * e - f * b) + ' → x = ' + x + '.',
        steps: ['Cross-multiply to clear both fractions.',
                'Expand each bracket.',
                'Move the x terms to one side and the numbers to the other.',
                'Divide by the number in front of x.']
      };
    }
    return typeFractionBothSides();
  }

  /* ============================================================
     TYPE 2 - two fractions of x added.   x/a + x/b = c
     ============================================================ */
  function typeTwoFractionsAdded() {
    for (var guard = 0; guard < 400; guard++) {
      var a = ri(2, 8), b = ri(2, 8);
      if (a === b) continue;
      var x = pick([6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24]);
      var c = x * (a + b) / (a * b);
      if (Math.abs(c - Math.round(c)) > 1e-9) continue;
      c = Math.round(c);
      if (c < 2 || c > 40) continue;
      var wrongs = [
        c * a * b / (a + b) === x ? null : x,        /* (always the right one - filtered) */
        c * (a + b) / (a * b),                        /* multiplied instead of divided */
        c * a * b / (a - b),                          /* subtracted the denominators */
        c * a * b / (a + b) * 2,
        x + ri(1, 4), x - ri(1, 4)
      ].map(function (v) { return (v !== null && isFinite(v) && Math.abs(v - Math.round(v)) < 1e-9) ? Math.round(v) : null; });
      var ch = choices(x, wrongs);
      if (ch.list.length < 4) continue;
      return {
        q: 'Solve the linear equation:  x / ' + a + '  +  x / ' + b + '  =  ' + c,
        options: ch.list.map(function (v) { return 'x = ' + v; }), answer: ch.answer,
        know: ['Both terms are fractions of x', 'Put them over a common denominator first',
               'The common denominator of ' + a + ' and ' + b + ' is ' + (a * b / gcd(a, b))],
        hints: ['Write both fractions over ' + (a * b) + ': that gives ' + b + 'x + ' + a + 'x on top.',
                 'Add the tops: ' + (a + b) + 'x / ' + (a * b) + ' = ' + c + '. Now undo the fraction.'],
        sol: 'x/' + a + ' + x/' + b + ' = ' + b + 'x/' + (a * b) + ' + ' + a + 'x/' + (a * b) + ' = ' + (a + b) + 'x/' + (a * b) +
             ' = ' + c + '. So ' + (a + b) + 'x = ' + (c * a * b) + ', and x = ' + x + '.',
        steps: ['Put both fractions over the common denominator ' + (a * b) + '.',
                'Add the tops to get ' + (a + b) + 'x.',
                'Multiply both sides by ' + (a * b) + '.',
                'Divide by ' + (a + b) + '.']
      };
    }
    return typeTwoFractionsAdded();
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }

  /* ============================================================
     TYPE 3 - a word problem hiding an equation.   mx + A = nx - B
     ============================================================ */
  function typeWordProblem() {
    for (var guard = 0; guard < 400; guard++) {
      var x = ri(2, 14), m = ri(2, 6), n = ri(2, 6);
      if (n <= m) continue;
      var total = x * (n - m);                       /* A + B must come to this */
      if (total < 4) continue;
      var A = ri(1, total - 1), B = total - A;
      if (A < 1 || B < 1 || A > 30 || B > 30) continue;
      var wrongs = [
        (A - B) / (n - m), (A + B) / (n + m), (A + B) / (n - m) * 2, A + B, x + ri(1, 3), x - ri(1, 3)
      ].map(function (v) { return (isFinite(v) && Math.abs(v - Math.round(v)) < 1e-9) ? Math.round(v) : null; });
      var ch = choices(x, wrongs);
      if (ch.list.length < 4) continue;
      return {
        q: 'When ' + A + ' is added to ' + m + ' times a number x, the result is equal to subtracting ' + B +
           ' from ' + n + ' times the number x. Find x.',
        options: ch.list.map(function (v) { return 'x = ' + v; }), answer: ch.answer,
        know: ['"is added to" means +', '"subtracting ' + B + ' from ' + n + ' times x" means ' + n + 'x − ' + B,
               'So the equation is ' + m + 'x + ' + A + ' = ' + n + 'x − ' + B],
        hints: ['Write the sentence as an equation first, before any solving.',
                 m + 'x + ' + A + ' = ' + n + 'x − ' + B + '. Now gather the x terms.'],
        sol: 'The words become ' + m + 'x + ' + A + ' = ' + n + 'x − ' + B + '. Move the x terms: ' + A + ' + ' + B + ' = ' +
             (n - m) + 'x, so ' + (A + B) + ' = ' + (n - m) + 'x, and x = ' + x + '.',
        steps: ['Turn the sentence into an equation.',
                'Keep the x terms on one side, the numbers on the other.',
                'Add the numbers: ' + A + ' + ' + B + '.',
                'Divide by ' + (n - m) + '.']
      };
    }
    return typeWordProblem();
  }

  /* ============================================================
     TYPE 4 - adjacent angles on a straight line.   (ax+b) + (cx+d) = 180
     ============================================================ */
  function typeAngles() {
    for (var guard = 0; guard < 400; guard++) {
      var x = ri(10, 40), a = ri(1, 5), c = ri(1, 5);
      var rest = 180 - x * (a + c);                  /* b + d must come to this */
      if (rest < -30 || rest > 60) continue;
      var b = ri(-15, 40), d = rest - b;
      if (d < -30 || d > 40) continue;
      if (b === 0 || d === 0) continue;
      var wrongs = [
        (180 + b + d) / (a + c), 180 / (a + c), (180 - b - d) / (a + c) * 2,
        (180 - b + d) / (a + c), x + ri(1, 5), x - ri(1, 5)
      ].map(function (v) { return (isFinite(v) && Math.abs(v - Math.round(v)) < 1e-9) ? Math.round(v) : null; });
      var ch = choices(x, wrongs);
      if (ch.list.length < 4) continue;
      function term(co, num) { return '(' + (co === 1 ? '' : co) + 'x ' + (num < 0 ? '− ' + Math.abs(num) : '+ ' + num) + ')'; }
      return {
        q: 'Two adjacent angles on a straight line are given as ' + term(a, b) + ' degrees and ' + term(c, d) +
           ' degrees. Find the value of x.',
        options: ch.list.map(function (v) { return 'x = ' + v; }), answer: ch.answer,
        know: ['Adjacent angles on a straight line add to 180°', 'The two expressions are ' + term(a, b) + ' and ' + term(c, d),
               'So ' + term(a, b) + ' + ' + term(c, d) + ' = 180'],
        hints: ['A straight line is 180°, so the two angles must add to 180.',
                 'Add the expressions: ' + (a + c) + 'x ' + (b + d < 0 ? '− ' + Math.abs(b + d) : '+ ' + (b + d)) + ' = 180.'],
        sol: 'The two angles add to 180°: ' + term(a, b) + ' + ' + term(c, d) + ' = 180, so ' + (a + c) + 'x ' +
             (b + d < 0 ? '− ' + Math.abs(b + d) : '+ ' + (b + d)) + ' = 180, giving ' + (a + c) + 'x = ' + (180 - b - d) +
             ', so x = ' + x + '.',
        steps: ['Write the rule: the two angles add to 180°.',
                'Add the x parts and add the number parts separately.',
                'Move the number to the right-hand side.',
                'Divide by ' + (a + c) + '.']
      };
    }
    return typeAngles();
  }

  /* ============================================================
     TYPE 5 - two fractions subtracted.   (x-a)/b - (x-c)/d = e
     ============================================================ */
  function typeTwoFractionsSubtracted() {
    for (var guard = 0; guard < 600; guard++) {
      var x = ri(4, 20), b = ri(2, 6), d = ri(2, 6);
      if (b === d) continue;
      var a = ri(1, 9), c = ri(1, 9);
      var e = (x - a) / b - (x - c) / d;
      if (Math.abs(e - Math.round(e)) > 1e-9) continue;
      e = Math.round(e);
      if (e < 1 || e > 12) continue;
      var wrongs = [
        (b * d * e + d * a - b * c) / (b - d),
        (b * d * e - d * a + b * c) / (d - b),
        (b * d * e + d * a + b * c) / (d - b),
        x + ri(1, 4), x - ri(1, 4)
      ].map(function (v) { return (isFinite(v) && Math.abs(v - Math.round(v)) < 1e-9) ? Math.round(v) : null; });
      var ch = choices(x, wrongs);
      if (ch.list.length < 4) continue;
      function fr(num, den) { return '(x ' + (num < 0 ? '− ' + Math.abs(num) : '− ' + num) + ') / ' + den; }
      return {
        q: 'Solve the linear equation:  (x − ' + a + ') / ' + b + '  −  (x − ' + c + ') / ' + d + '  =  ' + e,
        options: ch.list.map(function (v) { return 'x = ' + v; }), answer: ch.answer,
        know: ['Two fractions with x on top, subtracted', 'Multiply every term by the common denominator ' + (b * d),
               'That clears both fractions in one move'],
        hints: ['Multiply the whole equation by ' + (b * d) + ' — the fractions disappear.',
                 d + '(x − ' + a + ') − ' + b + '(x − ' + c + ') = ' + (b * d * e) + '. Now expand carefully.'],
        sol: 'Multiply by ' + (b * d) + ': ' + d + '(x − ' + a + ') − ' + b + '(x − ' + c + ') = ' + (b * d * e) +
             '. Expand: ' + d + 'x − ' + (d * a) + ' − ' + b + 'x + ' + (b * c) + ' = ' + (b * d * e) +
             '. So ' + (d - b) + 'x ' + ((b * c - d * a) < 0 ? '− ' + Math.abs(b * c - d * a) : '+ ' + (b * c - d * a)) +
             ' = ' + (b * d * e) + ', giving x = ' + x + '.',
        steps: ['Multiply every term by the common denominator ' + (b * d) + '.',
                'Expand each bracket — watch the minus sign in the middle.',
                'Collect the x terms and the numbers.',
                'Divide by the number in front of x.']
      };
    }
    return typeTwoFractionsSubtracted();
  }

  var TYPES = [
    { id: 'bothsides', name: 'Fractions on both sides', icon: '\u2696\ufe0f',
      homework: 'Solve the linear equation: (2x + 1) / 3 = (x + 5) / 2', homeworkAnswer: 'x = 13',
      method: ['Cross-multiply: top of the left × bottom of the right = top of the right × bottom of the left.',
               'Expand both brackets.',
               'Gather the x terms on one side and the plain numbers on the other.',
               'Divide by the number in front of x.'],
      make: typeFractionBothSides },
    { id: 'addfractions', name: 'Two fractions of x added', icon: '\u2795',
      homework: 'Solve the linear equation: x / 3 + x / 4 = 7', homeworkAnswer: 'x = 12',
      method: ['Put both fractions over a common denominator.',
               'Add the tops.',
               'Multiply both sides by that denominator.',
               'Divide by the number in front of x.'],
      make: typeTwoFractionsAdded },
    { id: 'wordproblem', name: 'A word problem hiding an equation', icon: '\ud83d\udcdd',
      homework: 'When 5 is added to three times a number x, the result is equal to subtracting 3 from five times the number x. Find x.', homeworkAnswer: 'x = 4',
      method: ['Write the sentence as an equation first — before any solving.',
               '"is added to" means +, "subtracting … from" means −.',
               'Gather the x terms on one side, the numbers on the other.',
               'Divide by the number in front of x.'],
      make: typeWordProblem },
    { id: 'angles', name: 'Adjacent angles on a straight line', icon: '\ud83d\udcd0',
      homework: 'Two adjacent angles on a straight line are (4x + 10)° and (2x − 10)°. Find x.', homeworkAnswer: 'x = 30',
      method: ['Adjacent angles on a straight line add to 180°.',
               'Add the two expressions.',
               'Set that equal to 180 and move the numbers across.',
               'Divide by the number in front of x.'],
      make: typeAngles },
    { id: 'subfractions', name: 'Two fractions subtracted', icon: '\u2796',
      homework: 'Solve the linear equation: (x − 1) / 2 − (x − 3) / 3 = 2', homeworkAnswer: 'x = 9',
      method: ['Multiply every term by the common denominator — the fractions vanish.',
               'Expand each bracket, watching the minus sign between them.',
               'Collect the x terms and the numbers.',
               'Divide by the number in front of x.'],
      make: typeTwoFractionsSubtracted }
  ];

  /* ============================================================
     THE ASSIGNMENTS
     One entry per piece of homework the teacher actually set: the topic, the
     date it was given, and which of the question types it contains. The list
     lives on the device, so a new one can be added without touching code.
     ============================================================ */
  var ASSIGN_KEY = 'gk_hw_assignments';
  var DONE_KEY = 'gk_hw_teacher_done';
  /* The ones already built from a sheet. These are always shown, because their
     question kinds exist in this file. A sheet added later from the Parent
     Console is stored on the device and merged in beside them - its kinds are
     worked out from the sheet and added here when they are ready. */
  var DEFAULT_ASSIGNMENTS = [
    { id: 'a-2026-10-01', topic: 'Linear equations', given: '2026-10-01', built: true,
      types: ['bothsides', 'addfractions', 'wordproblem', 'angles', 'subfractions'] },
    { id: 'a-2026-10-18-whole', topic: 'AU 7 Whole Number Operations and Place Value', given: '2026-10-18', built: true,
      sheet: 'whole',
      types: ['w-place', 'w-expand', 'w-add', 'w-sub', 'w-carry', 'w-distrib', 'w-mult', 'w-div', 'w-rem',
              'w-roundup', 'w-round', 'w-estprod', 'w-estsum', 'w-ops', 'w-expr'] },
    { id: 'a-2026-10-18-lines', topic: 'AU 7 Lines, Angles and Parallel Line Properties', given: '2026-10-18', built: true,
      sheet: 'lines',
      types: ['l-vocab', 'l-classify', 'l-facts', 'l-comp', 'l-supp', 'l-vert', 'l-point', 'l-right',
              'l-corresp', 'l-alt', 'l-coint', 'l-partest', 'l-algadj', 'l-algvert', 'l-tri', 'l-bent'] }
  ];

  /* Work the date and a first guess at the topic out of the file name, so a
     grown-up only has to choose the file. The real topic is settled when the
     questions are built from the sheet. */
  function guessFromFile(name) {
    var base = String(name || '').replace(/\.[a-z0-9]+$/i, '');
    var given = '', m = base.match(/(20\d{2})[-_.]?(\d{2})[-_.]?(\d{2})/);      /* 2026-10-01 */
    if (m) given = m[1] + '-' + m[2] + '-' + m[3];
    if (!given) {
      m = base.match(/(\d{1,2})[-_.](\d{1,2})[-_.](20\d{2})/);                 /* 01-10-2026 */
      if (m && +m[2] >= 1 && +m[2] <= 12 && +m[1] >= 1 && +m[1] <= 31) {
        given = m[3] + '-' + String(+m[2]).padStart(2, '0') + '-' + String(+m[1]).padStart(2, '0');
      }
    }
    var topic = base
      .replace(/\b\d{1,2}[.:]\d{2}\s*(am|pm)?\b/ig, ' ')   /* a clock time, before the dots go */
      .replace(/\b(at|am|pm)\b/ig, ' ')
      .replace(/20\d{2}[-_.]?\d{2}[-_.]?\d{2}/g, ' ')
      .replace(/\d{1,2}[-_.]\d{1,2}[-_.]20\d{2}/g, ' ')
      .replace(/[^A-Za-z0-9 ]+/g, ' ')          /* punctuation first, so the word strips below can bite */
      .replace(/\b(img|image|photo|pic|dsc|screenshot|whatsapp|scan|copy|final|new)\b/ig, ' ')
      .replace(/\d{4,}/g, ' ')
      .replace(/\b(hw|homework|sheet|worksheet|test|paper|maths|math|mathematics|atharv|student|class|grade|term|week|practice|revision)\b/ig, ' ')
      .replace(/\s+/g, ' ').trim();
    if (topic.length < 3) topic = '';
    return { topic: topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '', given: given };
  }

  /* only the device-added ones are ever written back */
  function readStored() {
    try {
      var raw = JSON.parse(localStorage.getItem(ASSIGN_KEY));
      if (raw && raw.length) return raw;
    } catch (e) {}
    return [];
  }

  /* Two sheets are the same sheet when the file is the same file - name, size
     and the moment it was last changed - or when the date AND the topic match.
     Either way the second copy is dropped. */
  function sameSheet(a, b) {
    /* the same file, or two photographs of the same sheet (same date and the
       same topic), which is what actually happens in a house with a camera */
    if (a.sig && b.sig && a.sig === b.sig) return true;
    if (!(a.given && b.given && a.given === b.given)) return false;
    var na = String(a.topic || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    var nb = String(b.topic || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!na || !nb) return false;
    if (na === nb) return true;
    /* the same sheet can arrive with extra words on the end - a filename, or
       the name of the app the teacher used */
    var short = na.length <= nb.length ? na : nb, long = na.length <= nb.length ? nb : na;
    return short.length >= 10 && long.indexOf(short) === 0;
  }

  /* Drop anything that repeats. Returns the entries that were removed, so the
     page can say so instead of quietly changing under the child. */
  function dedupe() {
    var stored = readStored(), built = DEFAULT_ASSIGNMENTS, keep = [], dropped = [];
    stored.forEach(function (a) {
      if (!a || !a.id) return;
      var dup = false;
      built.forEach(function (b) { if (!dup && sameSheet(a, b)) dup = true; });
      keep.forEach(function (b) { if (!dup && sameSheet(a, b)) dup = true; });
      if (dup) dropped.push(a); else keep.push(a);
    });
    if (dropped.length) writeAssignments(keep);
    return dropped;
  }

  function readAssignments() {
    var stored = readStored();
    var out = DEFAULT_ASSIGNMENTS.slice(), seen = {};
    out.forEach(function (a) { seen[a.id] = 1; });
    stored.forEach(function (a) {
      if (!a || !a.id || seen[a.id]) return;
      seen[a.id] = 1;
      out.push(a);
    });
    return out;
  }
  function writeAssignments(list) {
    try { localStorage.setItem(ASSIGN_KEY, JSON.stringify(list || [])); } catch (e) {}
  }
  function prettyDate(iso) {
    var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return String(iso || '');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (+m[3]) + ' ' + months[(+m[2]) - 1] + ' ' + m[1];
  }
  function typesFor(ids) {
    var list = readAssignments(), out = [], seen = {};
    (list || []).forEach(function (a) {
      if (ids && ids.length && ids.indexOf(a.id) === -1) return;
      (a.types || []).forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } });
    });
    /* if a sheet has no kinds yet, nothing is invented for it - the caller
       checks for an empty list and says so instead of practising something else */
    return out;
  }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  window.HW = {
    types: TYPES,
    assignments: readAssignments,
    saveAssignments: writeAssignments,
    prettyDate: prettyDate,
    guessFromFile: guessFromFile,
    fileSignature: function (file) {
      if (!file) return '';
      return [file.name || '', file.size || 0, file.lastModified || 0].join('|');
    },
    typesFor: typesFor,
    /* ---- the teacher's own questions ----
       A sheet that Gurukool has read carries its questions verbatim: the same
       wording and the same options, in the same order. They are served first.
       Nothing is invented for that topic until every one of them has been
       attempted - only then does practice on the same kinds open up. */
    teacher: function (assign) {
      if (!assign || !assign.sheet || !window.AU7SHEET) return null;
      return window.AU7SHEET[assign.sheet] || null;
    },
    teacherDone: function (assignId) {
      try { var m = JSON.parse(localStorage.getItem(DONE_KEY)) || {}; return m[assignId] || []; } catch (e) { return []; }
    },
    markTeacherDone: function (assignId, index) {
      try {
        var m = JSON.parse(localStorage.getItem(DONE_KEY)) || {};
        var list = m[assignId] || [];
        if (list.indexOf(index) === -1) list.push(index);
        m[assignId] = list;
        localStorage.setItem(DONE_KEY, JSON.stringify(m));
      } catch (e) {}
    },
    /* every teacher question still to be done, across the assignments picked */
    pendingTeacher: function (ids) {
      var out = [];
      readAssignments().forEach(function (a) {
        if (ids && ids.length && ids.indexOf(a.id) === -1) return;
        var sheet = window.HW.teacher(a);
        if (!sheet) return;
        var done = window.HW.teacherDone(a.id);
        sheet.forEach(function (q, i) {
          if (done.indexOf(i) !== -1) return;
          out.push({ q: q.q, options: q.options.slice(), answer: q.answer,
                     typeId: a.id, typeName: (q.topic || a.topic), teacher: true, index: i,
                     /* the number this question carries ON THE SHEET, so it lines up
                        with the teacher's marking even when done out of order */
                     sheetNumber: i + 1, sheetTotal: sheet.length,
                     assignId: a.id, hints: q.hints || [], sol: q.why || '' });
        });
      });
      return out;
    },
    teacherProgress: function (ids) {
      var total = 0, done = 0;
      readAssignments().forEach(function (a) {
        if (ids && ids.length && ids.indexOf(a.id) === -1) return;
        var sheet = window.HW.teacher(a);
        if (!sheet) return;
        total += sheet.length;
        done += window.HW.teacherDone(a.id).length;
      });
      return { total: total, done: done };
    },
    addAssignment: function (topic, given, sig) {
      var list = readStored();
      var id = 'a-' + (given || todayISO()) + '-' + Math.random().toString(36).slice(2, 6);
      list.push({ id: id, topic: String(topic || 'Homework').trim(), given: given || todayISO(),
                  types: [], sig: sig || '', added: Date.now() });
      writeAssignments(list);
      return id;
    },
    /* A sheet whose questions do not exist yet is not "waiting for a timer" -
       it needs to reach Gurukool, where the questions are built from it. So
       there is no clock here on purpose: counting the hours would only tell the
       parent that nothing is happening. */
    needsSending: function (a) { return !!(a && !(a.types || []).length); },
    /* is this exact sheet already here? */
    findDuplicate: function (topic, given, sig) {
      var probe = { topic: topic, given: given, sig: sig || '' };
      var hit = null;
      readAssignments().forEach(function (a) { if (!hit && sameSheet(probe, a)) hit = a; });
      return hit;
    },
    dedupe: dedupe,
    removeAssignment: function (id) {
      var list = readAssignments().filter(function (a) { return a.id !== id && !a.built; });
      writeAssignments(list);
      return list;
    },
    byId: function (id) {
      for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return TYPES[i];
      /* the AU Grade 7 kinds are kept in their own file, one per sheet */
      if (window.AU7 && window.AU7.byId) return window.AU7.byId(id);
      return null;
    },
    make: function (id) { var t = window.HW.byId(id) || TYPES[0]; var q = t.make(); q.typeId = t.id; q.typeName = t.name; return q; },
    /* a mixed paper: the five types, in rotation */
    mixed: function (n) {
      var out = [], ids = TYPES.map(function (t) { return t.id; });
      for (var i = 0; i < (n || 1); i++) out.push(window.HW.make(ids[i % ids.length]));
      return out;
    }
  };
})();
