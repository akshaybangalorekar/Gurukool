/* ============================================================
   MIND-CHAMP - the reasoning ladder
   The reasoning skills that EduTest, AAS, ICAS, NAPLAN and Olympiad
   papers lean on hardest, and that no other champ covers:

     verbal        - analogies, odd one out, letter codes
     quantitative  - number series
     non-verbal    - shape patterns, rotations (drawn, not described)

   Each topic has a lesson (taught, then checked) and questions that are
   generated fresh, so they never repeat.
   ============================================================ */
(function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ---------- little drawings for the non-verbal topics ---------- */
  function shapeSvg(name, size, fill) {
    size = size || 44; fill = fill || '#2a9d8f';
    var s = size, h = s / 2;
    if (name === 'circle') return '<circle cx="' + h + '" cy="' + h + '" r="' + (h - 3) + '" fill="' + fill + '"/>';
    if (name === 'square') return '<rect x="3" y="3" width="' + (s - 6) + '" height="' + (s - 6) + '" rx="4" fill="' + fill + '"/>';
    if (name === 'triangle') return '<polygon points="' + h + ',3 ' + (s - 3) + ',' + (s - 4) + ' 3,' + (s - 4) + '" fill="' + fill + '"/>';
    if (name === 'star') return '<polygon points="' + h + ',2 ' + (h + 5) + ',' + (h - 4) + ' ' + (s - 3) + ',' + (h - 4) + ' ' + (h + 8) + ',' + (h + 5) + ' ' + (h + 13) + ',' + (s - 2) + ' ' + h + ',' + (h + 12) + ' ' + (h - 13) + ',' + (s - 2) + ' ' + (h - 8) + ',' + (h + 5) + ' 3,' + (h - 4) + ' ' + (h - 5) + ',' + (h - 4) + '" fill="' + fill + '"/>';
    return '';
  }
  function seqSvg(seq, questionMark) {
    var out = '', x = 12, i;
    for (i = 0; i < seq.length; i++) {
      out += '<g transform="translate(' + x + ',18)">' + shapeSvg(seq[i], 46) + '</g>';
      x += 60;
    }
    if (questionMark) out += '<text x="' + (x + 10) + '" y="52" font-size="30" font-weight="800" fill="#b45309" font-family="Nunito,sans-serif">?</text>';
    return '<svg viewBox="0 0 ' + (x + 60) + ' 86" style="width:100%;max-width:' + Math.min(x + 60, 420) + 'px;display:block;margin:8px auto">' + out + '</svg>';
  }
  function arrowSvg(dir) {
    var rot = { up: 0, right: 90, down: 180, left: 270 }[dir] || 0;
    return '<svg viewBox="0 0 120 120" style="width:120px;display:block;margin:8px auto">' +
      '<circle cx="60" cy="60" r="52" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>' +
      '<g transform="rotate(' + rot + ' 60 60)"><polygon points="60,16 78,54 60,44 42,54" fill="#2a9d8f"/><rect x="54" y="44" width="12" height="46" rx="3" fill="#2a9d8f"/></g></svg>';
  }

  /* ---------- the topics ---------- */
  var TOPICS = [
    { key: 'analogies', name: 'Analogies', icon: '\ud83d\udd17', strand: 'Verbal',
      what: 'An analogy says: A goes with B in the same way that C goes with D. First work out the RELATIONSHIP, then apply it.',
      lesson: [
        { say: 'A pen is to writing as a fork is to eating. The relationship is "tool to what it does". Find the link first.',
          ask: 'A pen is to writing as a knife is to ___? (one word)', ans: 'cutting', hint: 'What does a knife do?' },
        { say: 'The link can be other things too: young to old, part to whole, or opposites.',
          ask: 'A puppy is to a dog as a kitten is to a ___? (one word)', ans: 'cat', hint: 'What does a kitten grow into?' },
        { say: 'The trap: jumping at a word that is only loosely connected. Test the link on BOTH pairs before you answer.',
          ask: 'Hot is to cold as up is to ___? (one word)', ans: 'down', hint: 'The relationship is "the opposite".' }
      ],
      gen: {
        easy: function () { var a = pick([['a pen', 'writing'], ['a fork', 'eating'], ['a key', 'opening'], ['a clock', 'time']]);
          var b = pick([['a knife', 'cutting'], ['soap', 'washing'], ['a book', 'reading'], ['a torch', 'light']]);
          return { q: a[0] + ' is to ' + a[1] + ' as ' + b[0] + ' is to ___? (one word)', ans: b[1], unit: '',
            know: ['The first pair: ' + a[0] + ' and ' + a[1], 'The link is what the thing DOES', 'Apply the same link to ' + b[0]],
            hints: ['Ask what ' + b[0] + ' does.', 'The answer is one word: ' + b[1]],
            sol: b[0] + ' is for ' + b[1] + '. Find the relationship in the first pair, then apply it to the second.' }; },
        medium: function () { var a = pick([['a puppy', 'a dog'], ['a kitten', 'a cat'], ['a calf', 'a cow'], ['a joey', 'a kangaroo']]);
          var b = pick([['a chick', 'a chicken'], ['a lamb', 'a sheep'], ['a tadpole', 'a frog'], ['a cub', 'a lion']]);
          return { q: a[0] + ' is to ' + a[1] + ' as ' + b[0] + ' is to ___? (one word)', ans: b[1], unit: '',
            know: ['First pair: ' + a[0] + ' and ' + a[1], 'The link is young to adult', 'Apply it to ' + b[0]],
            hints: ['What does ' + b[0] + ' grow into?', 'One word.'],
            sol: 'The link is young to grown-up, so ' + b[0] + ' goes with ' + b[1] + '.' }; },
        hard: function () { var a = pick([['an author', 'a book'], ['a composer', 'music'], ['a baker', 'bread'], ['a painter', 'a picture']]);
          var b = pick([['a sculptor', 'a statue'], ['a poet', 'a poem'], ['a chef', 'a meal'], ['a farmer', 'crops']]);
          return { q: a[0] + ' is to ' + a[1] + ' as ' + b[0] + ' is to ___? (one word)', ans: b[1], unit: '',
            know: ['First pair: ' + a[0] + ' and ' + a[1], 'The link is maker to what they make'],
            hints: ['What does ' + b[0] + ' make?', 'One word.'],
            sol: 'The link is the maker and the thing made, so ' + b[0] + ' goes with ' + b[1] + '.' }; }
      } },
    { key: 'oddoneout', name: 'Odd one out', icon: '\ud83d\udd0d', strand: 'Verbal',
      what: 'In an odd-one-out question, three of the four belong to a group. Name the group first, then find the one that does not fit.',
      lesson: [
        { say: 'Apple, banana, pear, carrot. Three are fruit. Say the group out loud before you answer.',
          ask: 'Which is the odd one out: apple, banana, pear, carrot?', ans: 'carrot', hint: 'Three of them are fruit.' },
        { say: 'The group can be numbers too: 2, 4, 6, 9. Three are even.',
          ask: 'Which is the odd one out: 2, 4, 6, 9?', ans: '9', hint: 'Which one is not even?' },
        { say: 'The trap: picking the one that FEELS different without naming the group. Always name the rule that the other three share.',
          ask: 'Which is the odd one out: 1, 4, 9, 16, 20?', ans: '20', hint: 'The others are square numbers.' }
      ],
      gen: {
        easy: function () { var sets = [['apple', 'banana', 'pear', 'carrot', 'the others are fruit'],
            ['cat', 'dog', 'horse', 'table', 'the others are animals'], ['red', 'blue', 'green', 'seven', 'the others are colours'],
            ['square', 'circle', 'triangle', 'six', 'the others are shapes'], ['bus', 'car', 'train', 'banana', 'the others are vehicles'],
            ['hand', 'foot', 'knee', 'hat', 'the others are body parts']];
          var s = pick(sets);
          return { q: 'Which is the odd one out: ' + s.slice(0, 4).join(', ') + '?', ans: s[3], unit: '',
            know: ['Four items: ' + s.slice(0, 4).join(', '), 'Three of them belong to one group'],
            hints: ['Name the group that three of them share.', s[4] + '.'],
            sol: s[3] + ' is the odd one out: ' + s[4] + '.' }; },
        medium: function () { var sets = [['2', '4', '6', '9', 'the others are even'], ['3', '6', '9', '10', 'the others are multiples of 3'],
            ['Monday', 'Tuesday', 'March', 'Friday', 'the others are days of the week'],
            ['10', '20', '30', '45', 'the others are multiples of 10'],
            ['1', '4', '9', '12', 'the others are square numbers']];
          var s = pick(sets);
          return { q: 'Which is the odd one out: ' + s.slice(0, 4).join(', ') + '?', ans: s[3], unit: '',
            know: ['Four items: ' + s.slice(0, 4).join(', '), 'Look for the rule that three of them share'],
            hints: ['Check each one against a rule you can state.', s[4] + '.'],
            sol: s[3] + ' is the odd one out: ' + s[4] + '.' }; },
        hard: function () { var sets = [['1', '4', '9', '16', '20', 'the others are square numbers'],
            ['2', '3', '5', '7', '9', 'the others are prime'], ['8', '16', '24', '30', 'the others are multiples of 8'],
            ['1', '8', '27', '36', 'the others are cube numbers'], ['0.5', '1.5', '2.5', '3.4', 'the others end in .5']];
          var s = pick(sets);
          return { q: 'Which is the odd one out: ' + s.slice(0, 4).join(', ') + '?', ans: s[3], unit: '',
            know: ['Four items: ' + s.slice(0, 4).join(', '), 'The rule may be about primes, squares, cubes or multiples'],
            hints: ['Test squares, cubes and primes in turn.', s[4] + '.'],
            sol: s[3] + ' is the odd one out: ' + s[4] + '.' }; }
      } },
    { key: 'codes', name: 'Letter codes', icon: '\ud83d\udd20', strand: 'Verbal',
      what: 'A code question gives you a rule and asks you to apply it. Work out the rule from the example first, then apply it letter by letter.',
      lesson: [
        { say: 'The simplest code gives each letter a number: A is 1, B is 2, C is 3, and so on to Z as 26.',
          ask: 'If A = 1, what number is E?', ans: 5, hint: 'Count along: A, B, C, D, E.' },
        { say: 'You can add letters up. C is 3, A is 1, T is 20, so CAT is 24.',
          ask: 'If C = 3, A = 1 and T = 20, what is CAT worth?', ans: 24, hint: '3 + 1 + 20.' },
        { say: 'The other kind of code shifts each letter along the alphabet. If every letter moves 2 forward, CAT becomes ECV.',
          ask: 'Using that rule (move 2 forward), what does DOG become?', ans: 'FQI', hint: 'D to F, O to Q, G to I.' }
      ],
      gen: {
        easy: function () { var n = ri(3, 20), ch = String.fromCharCode(64 + n);
          return { q: 'If A = 1, B = 2, C = 3 and so on, what number is ' + ch + '?', ans: n, unit: '',
            know: ['A = 1, B = 2, C = 3 ... Z = 26', 'You need the position of ' + ch],
            hints: ['Count along the alphabet from A.', ch + ' is letter number ' + n + '.'],
            sol: ch + ' is the ' + n + 'th letter, so it is ' + n + '.' }; },
        medium: function () { var w = pick(['CAT', 'DOG', 'SUN', 'MAP', 'BAT', 'PIN']);
          var tot = 0, i, parts = [];
          for (i = 0; i < w.length; i++) { var v = w.charCodeAt(i) - 64; tot += v; parts.push(w[i] + '=' + v); }
          return { q: 'If A = 1, B = 2 and so on, what is ' + w + ' worth altogether? (' + parts.join(', ') + ')', ans: tot, unit: '',
            know: ['A = 1 and Z = 26', 'Letters: ' + parts.join(', '), 'Add them'],
            hints: ['Add the three numbers.', parts.join(' + ') + '.'],
            sol: parts.join(' + ') + ' = ' + tot + '.' }; },
        hard: function () { var w = pick(['CAT', 'DOG', 'SUN', 'MAP', 'BAT', 'PIN']), sh = pick([1, 2, 3]);
          var out = '', i;
          for (i = 0; i < w.length; i++) out += String.fromCharCode(((w.charCodeAt(i) - 65 + sh) % 26) + 65);
          return { q: 'In a code every letter moves ' + sh + ' place' + (sh === 1 ? '' : 's') + ' FORWARD in the alphabet. What does ' + w + ' become?', ans: out, unit: '',
            know: ['Each letter moves ' + sh + ' forward', 'The word is ' + w, 'Work one letter at a time'],
            hints: ['Take the first letter of ' + w + ' and move it ' + sh + ' along.', 'Do the same for every letter.'],
            sol: w + ' becomes ' + out + ' when each letter moves ' + sh + ' forward.' }; }
      } },
    { key: 'series', name: 'Number series', icon: '\ud83d\udd22', strand: 'Quantitative',
      what: 'In a number series, find the RULE between the numbers, then use it to find the next one. Always check the rule on every pair, not just the last two.',
      lesson: [
        { say: 'Look at the gaps first. 3, 6, 9, 12: each step adds 3.',
          ask: 'What comes next: 3, 6, 9, 12, ___?', ans: 15, hint: 'The gap is 3 each time.' },
        { say: 'Sometimes the rule multiplies. 2, 4, 8, 16 doubles each time.',
          ask: 'What comes next: 2, 4, 8, 16, ___?', ans: 32, hint: 'Each number is double the one before.' },
        { say: 'The harder ones use two operations, like "double it and add one".',
          ask: 'What comes next: 1, 3, 7, 15, ___? (double and add one)', ans: 31, hint: '15 x 2 = 30, then add 1.' }
      ],
      gen: {
        easy: function () { var st = ri(1, 9), d = ri(2, 7);
          return { q: 'What comes next: ' + st + ', ' + (st + d) + ', ' + (st + 2 * d) + ', ' + (st + 3 * d) + ', ___?', ans: st + 4 * d, unit: '',
            know: ['The first four numbers are ' + st + ', ' + (st + d) + ', ' + (st + 2 * d) + ', ' + (st + 3 * d), 'Look at the gap between them'],
            hints: ['Work out the gap: ' + (st + d) + ' minus ' + st + '.', 'Keep adding that gap.'],
            sol: 'Each step adds ' + d + ', so the next number is ' + (st + 3 * d) + ' + ' + d + ' = ' + (st + 4 * d) + '.' }; },
        medium: function () { var kind = pick(['double', 'square', 'addgrowing']);
          if (kind === 'double') { var s0 = ri(2, 5);
            return { q: 'What comes next: ' + s0 + ', ' + (s0 * 2) + ', ' + (s0 * 4) + ', ' + (s0 * 8) + ', ___?', ans: s0 * 16, unit: '',
              know: ['The numbers are ' + s0 + ', ' + (s0 * 2) + ', ' + (s0 * 4) + ', ' + (s0 * 8), 'Compare each to the one before'],
              hints: ['Each one is double the last.', (s0 * 8) + ' x 2.'],
              sol: 'The rule is doubling, so the next is ' + (s0 * 16) + '.' }; }
          if (kind === 'square') { var n = ri(2, 4);
            return { q: 'What comes next: ' + (n * n) + ', ' + ((n + 1) * (n + 1)) + ', ' + ((n + 2) * (n + 2)) + ', ' + ((n + 3) * (n + 3)) + ', ___?', ans: (n + 4) * (n + 4), unit: '',
              know: ['The numbers are ' + (n * n) + ', ' + ((n + 1) * (n + 1)) + ', ' + ((n + 2) * (n + 2)) + ', ' + ((n + 3) * (n + 3)), 'They are square numbers'],
              hints: ['They are ' + n + ' squared, ' + (n + 1) + ' squared and so on.', 'So the next is ' + (n + 4) + ' squared.'],
              sol: 'The rule is consecutive square numbers, so the next is ' + (n + 4) + ' x ' + (n + 4) + ' = ' + ((n + 4) * (n + 4)) + '.' }; }
          var s1 = ri(1, 5);
          return { q: 'What comes next: ' + s1 + ', ' + (s1 + 2) + ', ' + (s1 + 5) + ', ' + (s1 + 9) + ', ___?', ans: s1 + 14, unit: '',
            know: ['The gaps are ' + 2 + ', ' + 3 + ' and ' + 4, 'So the gaps are growing by one each time'],
            hints: ['Work out each gap: 2, then 3, then 4.', 'The next gap is 5.'],
            sol: 'The gaps grow by one, so the next gap is 5 and the answer is ' + (s1 + 9) + ' + 5 = ' + (s1 + 14) + '.' }; },
        hard: function () { var kind = pick(['times2plus1', 'alternate']);
          if (kind === 'times2plus1') { var s0 = ri(1, 4);
            return { q: 'What comes next: ' + s0 + ', ' + (s0 * 2 + 1) + ', ' + ((s0 * 2 + 1) * 2 + 1) + ', ' + (((s0 * 2 + 1) * 2 + 1) * 2 + 1) + ', ___?  (the rule is double it and add one)', ans: ((((s0 * 2 + 1) * 2 + 1) * 2 + 1) * 2 + 1), unit: '',
              know: ['The rule is given: double it and add one', 'Apply it to the last number'],
              hints: ['Take the last number and double it.', 'Then add one.'],
              sol: 'Double and add one gives ' + ((((s0 * 2 + 1) * 2 + 1) * 2 + 1) * 2 + 1) + '.' }; }
          var a = ri(2, 6), b = ri(20, 40);
          return { q: 'What comes next: ' + a + ', ' + b + ', ' + (a + 2) + ', ' + (b - 2) + ', ' + (a + 4) + ', ___?', ans: b - 4, unit: '',
            know: ['Two things are happening at once', 'The odd places: ' + a + ', ' + (a + 2) + ', ' + (a + 4) + ' (adding 2)', 'The even places: ' + b + ', ' + (b - 2) + ' (taking away 2)'],
            hints: ['Look at every OTHER number.', 'The even positions go down by 2 each time.'],
            sol: 'The even places go down by 2, so after ' + (b - 2) + ' comes ' + (b - 4) + '. Two rules at once is the hardest kind of series.' }; }
      } },
    { key: 'patterns', name: 'Shape patterns', icon: '\ud83d\udd37', strand: 'Non-verbal',
      what: 'A shape pattern repeats a short cycle. Find the cycle, then count where the next shape falls in it.',
      lesson: [
        { say: 'Look at the cycle: circle, square, triangle, then it starts again. Three shapes repeat.',
          ask: 'In the cycle circle, square, triangle, which shape comes after the triangle?', ans: 'circle', hint: 'It starts again from the beginning.' },
        { say: 'To find a shape far along, count in cycles. The 4th shape in a cycle of three is the start of the second cycle.',
          ask: 'In a cycle of 3 shapes, which shape is the 4th?', ans: 'circle', hint: 'The cycle restarts at 4.' },
        { say: 'The trap: counting the first shape as position zero. The 1st shape is the first of the cycle.',
          ask: 'In a cycle of 4 shapes (star, square, circle, triangle), which shape is the 5th?', ans: 'star', hint: 'The 5th restarts the cycle.' }
      ],
      gen: {
        easy: function () { var cyc = ['circle', 'square', 'triangle'];
          var shown = cyc.concat(cyc.slice(0, 2));
          var next = cyc[shown.length % 3];
          return { q: 'Look at the shapes. Which shape comes next? Type one of: circle, square, triangle.', ans: next, unit: '',
            art: seqSvg(shown, true),
            know: ['The cycle is circle, square, triangle', 'It repeats'],
            hints: ['The pattern repeats every three shapes.', 'Count along: circle, square, triangle, circle, square ...'],
            sol: 'The cycle is circle, square, triangle, so after square comes ' + next + '.' }; },
        medium: function () { var cyc = ['star', 'square', 'circle', 'triangle'];
          var shown = cyc.concat(cyc.slice(0, 3));
          var next = cyc[shown.length % 4];
          return { q: 'Look at the shapes. Which shape comes next? Type one of: star, square, circle, triangle.', ans: next, unit: '',
            art: seqSvg(shown, true),
            know: ['The cycle has four shapes', 'It repeats'],
            hints: ['Find where the cycle starts again.', 'The 5th shape restarts it.'],
            sol: 'The cycle is star, square, circle, triangle, so the next is ' + next + '.' }; },
        hard: function () { var cyc = ['triangle', 'circle', 'star', 'square'];
          var shown = cyc.concat(cyc, cyc.slice(0, 1));
          var next = cyc[shown.length % 4];
          return { q: 'Look at the shapes. Which shape comes next? Type one of: star, square, circle, triangle.', ans: next, unit: '',
            art: seqSvg(shown, true),
            know: ['The cycle has four shapes', 'It has already repeated more than once'],
            hints: ['Work out the cycle from the first four.', 'Then count on.'],
            sol: 'The cycle is triangle, circle, star, square, so the next is ' + next + '.' }; }
      } },
    { key: 'rotations', name: 'Rotations', icon: '\ud83d\udd04', strand: 'Non-verbal',
      what: 'A rotation turns a shape about its centre. Clockwise goes right, down, left, up. A quarter turn is 90 degrees.',
      lesson: [
        { say: 'An arrow pointing up, turned 90 degrees clockwise, points right. Clockwise means the way clock hands move.',
          ask: 'An arrow points UP. It turns 90 degrees clockwise. Which way does it point now? Type up, down, left or right.', ans: 'right', hint: 'Clockwise from up is to the right.' },
        { say: 'Half a turn is 180 degrees, which points it the opposite way.',
          ask: 'An arrow points UP. It turns 180 degrees. Which way does it point? Type up, down, left or right.', ans: 'down', hint: '180 degrees is the opposite direction.' },
        { say: 'Anticlockwise goes the other way, so 90 degrees anticlockwise from up is left.',
          ask: 'An arrow points UP. It turns 90 degrees anticlockwise. Which way does it point?', ans: 'left', hint: 'Anticlockwise from up is to the left.' }
      ],
      gen: {
        easy: function () { var dirs = ['up', 'right', 'down', 'left'];
          var start = pick(dirs), i = dirs.indexOf(start), turn = pick([90, 180, 270]);
          var end = dirs[(i + turn / 90) % 4];
          return { q: 'An arrow points ' + start.toUpperCase() + '. It turns ' + turn + ' degrees clockwise. Which way does it point now? Type up, down, left or right.', ans: end, unit: '',
            art: arrowSvg(start),
            know: ['It starts pointing ' + start, 'It turns ' + turn + ' degrees clockwise', 'A quarter turn is 90 degrees'],
            hints: ['Clockwise: up, right, down, left.', 'Each 90 degrees moves it one step round.'],
            sol: turn + ' degrees clockwise from ' + start + ' points ' + end + '.' }; },
        medium: function () { var dirs = ['up', 'right', 'down', 'left'];
          var start = pick(dirs), i = dirs.indexOf(start), turn = pick([90, 180, 270]);
          var end = dirs[((i - turn / 90) % 4 + 4) % 4];
          return { q: 'An arrow points ' + start.toUpperCase() + '. It turns ' + turn + ' degrees ANTICLOCKWISE. Which way does it point now? Type up, down, left or right.', ans: end, unit: '',
            art: arrowSvg(start),
            know: ['It starts pointing ' + start, 'It turns ' + turn + ' degrees anticlockwise', 'Anticlockwise is the opposite of clock hands'],
            hints: ['Anticlockwise from up is left.', 'Each 90 degrees is one step the other way.'],
            sol: turn + ' degrees anticlockwise from ' + start + ' points ' + end + '.' }; },
        hard: function () { var dirs = ['up', 'right', 'down', 'left'];
          var start = pick(dirs), i = dirs.indexOf(start);
          var t1 = pick([90, 180]), t2 = pick([90, 180]);
          var end = dirs[(i + t1 / 90 + t2 / 90) % 4];
          return { q: 'An arrow points ' + start.toUpperCase() + '. It turns ' + t1 + ' degrees clockwise, then ' + t2 + ' more degrees clockwise. Which way does it point? Type up, down, left or right.', ans: end, unit: '',
            art: arrowSvg(start),
            know: ['It starts pointing ' + start, 'Two clockwise turns: ' + t1 + ' then ' + t2, 'Add them: ' + (t1 + t2) + ' degrees'],
            hints: ['Add the two turns first: ' + (t1 + t2) + ' degrees.', 'Then move that many quarter turns clockwise.'],
            sol: (t1 + t2) + ' degrees clockwise from ' + start + ' points ' + end + '. Adding the turns first saves two steps.' }; }
      } }
  ];

  window.Reason = {
    topics: TOPICS,
    byKey: function (k) { for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].key === k) return TOPICS[i]; return null; },
    strands: function () { var s = {}; TOPICS.forEach(function (t) { s[t.strand] = (s[t.strand] || 0) + 1; }); return s; },
    make: function (key, tier) {
      var t = window.Reason.byKey(key) || TOPICS[0];
      var q = (t.gen[tier] || t.gen.easy)();
      q.topic = t.key; q.topicName = t.name; q.tier = tier;
      return q;
    },
    tiers: function (lv) { return lv >= 3 ? ['medium', 'hard', 'hard', 'medium', 'hard', 'medium'] : (lv === 2 ? ['easy', 'medium', 'medium', 'hard', 'medium', 'easy'] : ['easy', 'easy', 'easy', 'medium', 'easy', 'medium']); }
  };
})();
