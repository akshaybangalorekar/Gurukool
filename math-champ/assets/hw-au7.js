/* ============================================================
   THE AU GRADE 7 SHEETS - the question kinds, nothing else
   Two sheets the teacher set on 18 Oct 2026:
     AU - Grade 7 - Whole Number Operations and Place Value
     AU - Grade 7 - Lines, Angles, and Parallel Line Properties

   Every kind below is a shape that appears on those sheets, written so it can
   be asked again and again with fresh numbers. Each one carries four choices:
   the right answer and three that are the mistakes children actually make.
   ============================================================ */
(function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* four or five choices: the right one, plus the wrong ones offered, with a
     gentle fallback so there are always enough distinct options */
  function opts(right, wrongs, unit) {
    unit = unit || '';
    var seen = {}, list = [right];
    seen[String(right)] = 1;
    (wrongs || []).forEach(function (w) {
      if (w === null || w === undefined) return;
      var k = String(w);
      if (seen[k] || k === '') return;
      seen[k] = 1; list.push(w);
    });
    var step = 1;
    while (list.length < 4 && step < 40) {
      [right + step, right - step].forEach(function (c) {
        if (list.length < 4 && c >= 0 && !seen[String(c)]) { seen[String(c)] = 1; list.push(c); }
      });
      step++;
    }
    var mixed = shuffle(list.slice(0, 4));
    return {
      options: mixed.map(function (v) { return typeof v === 'number' ? (commas(v) + unit) : String(v); }),
      answer: mixed.map(function (v) { return typeof v === 'number' ? (commas(v) + unit) : String(v); }).indexOf(typeof right === 'number' ? (commas(right) + unit) : String(right))
    };
  }
  /* the same, but the choices are whole sentences rather than numbers */
  function optsText(right, wrongs) {
    var list = [right], seen = {};
    seen[right] = 1;
    (wrongs || []).forEach(function (w) { if (w && !seen[w]) { seen[w] = 1; list.push(w); } });
    /* a sentence question must still offer four - never hand back three */
    var filler = 1;
    while (list.length < 4 && filler < 8) {
      var extra = String(right).replace(/\d+/, function (m) { return String(+m + filler); });
      if (extra === right || seen[extra]) extra = String(right) + ' (none of these)';
      if (!seen[extra]) { seen[extra] = 1; list.push(extra); }
      filler++;
    }
    var mixed = shuffle(list.slice(0, 4));
    return { options: mixed, answer: mixed.indexOf(right) };
  }

  var PLACES = [
    ['ones', 1], ['tens', 10], ['hundreds', 100], ['thousands', 1000],
    ['ten thousands', 10000], ['hundred thousands', 100000], ['millions', 1000000]
  ];

  /* ============================================================
     SHEET 1 - WHOLE NUMBER OPERATIONS AND PLACE VALUE
     ============================================================ */
  var WHOLE = [
    { id: 'w-place', name: 'Place value of a digit', icon: '\uD83D\uDD22',
      homework: 'What is the place value of the digit 7 in 4,572,809?', homeworkAnswer: 'Tens of thousands (70,000)',
      method: ['Write the number and label the columns from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.',
               'Find the digit you have been asked about.',
               'Read the name of the column it sits in - that is its place value.'],
      make: function () {
        var d = [], pool = shuffle([1,2,3,4,5,6,7,8,9]);
        for (var i = 0; i < 7; i++) d.push(pool[i]);
        var pos = ri(3, 6);                        /* never the ones or tens, so it is interesting */
        var digit = d[6 - pos];
        var place = PLACES[pos];
        var value = digit * place[1];
        var wrongs = PLACES.filter(function (p) { return p[1] !== place[1]; })
          .map(function (p) { return p[0].charAt(0).toUpperCase() + p[0].slice(1) + ' (' + commas(digit * p[1]) + ')'; });
        var ch = optsText(place[0].charAt(0).toUpperCase() + place[0].slice(1) + ' (' + commas(value) + ')', shuffle(wrongs).slice(0, 3));
        var num = parseInt(d.join(''), 10);
        return { q: 'What is the place value of the digit ' + digit + ' in the whole number ' + commas(num) + '?',
          options: ch.options, answer: ch.answer,
          know: ['The columns from the right are ones, tens, hundreds, thousands, ten thousands, hundred thousands, millions',
                 'The digit ' + digit + ' sits in the ' + place[0] + ' column'],
          hints: ['Count the columns from the right hand side.', 'The digit ' + digit + ' is in the ' + place[0] + ' place.'],
          sol: 'Reading from the right, the digit ' + digit + ' sits in the ' + place[0] + ' column, so its place value is ' +
               commas(value) + ' (' + place[0] + ').' };
      } },

    { id: 'w-expand', name: 'Expanded form to a whole number', icon: '\uD83E\uDDE9',
      homework: 'Which whole number is represented by 3 \u00D7 100,000 + 5 \u00D7 10,000 + 8 \u00D7 100 + 4 \u00D7 1?', homeworkAnswer: '350,804',
      method: ['Write each part as the digits it puts in its column.',
               'Remember that a column with nothing in it is a zero.',
               'Join the digits up and read the number.'],
      make: function () {
        var cols = shuffle([100000, 10000, 1000, 100, 10, 1]).slice(0, ri(3, 4)).sort(function (a, b) { return b - a; });
        var parts = cols.map(function (c) { return [ri(1, 9), c]; });
        var total = parts.reduce(function (s, p) { return s + p[0] * p[1]; }, 0);
        var qs = parts.map(function (p) { return p[0] + ' \u00D7 ' + commas(p[1]); }).join(' + ');
        var missingZero = parts.reduce(function (s, p) { return s + p[0] * p[1] / (p[1] > 1 ? 10 : 1); }, 0);
        return { q: 'Which whole number is represented by the expanded form: ' + qs + '?',
          options: (ch = opts(total, [missingZero, total + 10, total - 100, total + 1000])).options,
          answer: ch.answer,
          know: ['Each part fills one column', 'A column with nothing in it counts as zero'],
          hints: ['Work out each multiplication first.', 'Then add the parts together.'],
          sol: parts.map(function (p) { return p[0] + ' \u00D7 ' + commas(p[1]) + ' = ' + commas(p[0] * p[1]); }).join(', ') +
               '. Added together that is ' + commas(total) + '.' };
      } },

    { id: 'w-add', name: 'Adding large whole numbers', icon: '\u2795',
      homework: 'A stadium hosted 14,250 spectators on Friday and 18,970 on Saturday. How many attended over the two days?', homeworkAnswer: '33,220',
      method: ['Line the numbers up so the columns match.',
               'Add from the right, carrying when a column reaches ten.',
               'Write the total with the commas in the right places.'],
      make: function () {
        var a = ri(12000, 68000), b = ri(9000, 45000);
        var total = a + b;
        var place = pick(['A stadium', 'A concert hall', 'A shopping centre']);
        var what = pick(['spectators', 'visitors', 'people']);
        var d1 = pick(['Friday', 'Saturday', 'Monday']), d2 = pick(['Saturday', 'Sunday', 'Tuesday']);
        return { q: place + ' had ' + commas(a) + ' ' + what + ' on ' + d1 + ' and ' + commas(b) + ' ' + what + ' on ' + d2 +
                   '. How many ' + what + ' came over the two days?',
          options: (ch = opts(total, [a + b - 100, a + b + 100, Math.abs(a - b), a + b + 1000])).options,
          answer: ch.answer,
          know: ['The two amounts are ' + commas(a) + ' and ' + commas(b), 'Both days are added together'],
          hints: ['This is a total, so the amounts add.', 'Add the columns from the right, carrying as you go.'],
          sol: commas(a) + ' + ' + commas(b) + ' = ' + commas(total) + '.' };
      } },

    { id: 'w-sub', name: 'Subtracting large whole numbers', icon: '\u2796',
      homework: 'A warehouse had 8,500 boxes. After delivering 3,745, how many remained?', homeworkAnswer: '4,755',
      method: ['Line the numbers up so the columns match.',
               'Subtract from the right, borrowing when the top digit is smaller.',
               'Check by adding your answer back to the number taken away.'],
      make: function () {
        var a = ri(7000, 95000), b = ri(1200, a - 800);
        var left = a - b;
        var thing = pick(['boxes in stock', 'books on the shelves', 'tickets left']);
        return { q: 'A warehouse had ' + commas(a) + ' ' + thing + '. After delivering ' + commas(b) +
                   ', how many remained in the warehouse?',
          options: (ch = opts(left, [left + 10, left - 10, a + b, left + 100])).options,
          answer: ch.answer,
          know: ['Started with ' + commas(a), 'Took away ' + commas(b)],
          hints: ['Something is taken away, so subtract.', 'Check your answer by adding it to ' + commas(b) + '.'],
          sol: commas(a) + ' \u2212 ' + commas(b) + ' = ' + commas(left) + '.' };
      } },

    { id: 'w-carry', name: 'Carrying in vertical addition', icon: '\u2B06\uFE0F',
      homework: 'In the vertical addition of 4,839 + 3,768, what value is carried into the thousands column?', homeworkAnswer: '1',
      method: ['Add one column at a time, starting at the right.',
               'A carry is what is left over when a column reaches ten.',
               'The value carried INTO a column is the carry made by the column just to its right.'],
      make: function () {
        var cols = [1, 10, 100, 1000];
        var a = 0, b = 0, carries = {}, carry = 0, i;
        var partsA = [], partsB = [];
        for (i = 0; i < 4; i++) { partsA.push(ri(1, 9)); partsB.push(ri(1, 9)); }
        /* make sure there is a carry somewhere interesting */
        for (i = 0; i < 4; i++) {
          var sum = partsA[i] + partsB[i] + carry;
          carries[cols[i]] = carry;
          carry = sum >= 10 ? 1 : 0;
        }
        a = partsA[3] * 1000 + partsA[2] * 100 + partsA[1] * 10 + partsA[0];
        b = partsB[3] * 1000 + partsB[2] * 100 + partsB[1] * 10 + partsB[0];
        var colIdx = pick([2, 3]);                 /* hundreds or thousands */
        var colName = colIdx === 3 ? 'thousands' : 'hundreds';
        var ans = carries[cols[colIdx]];
        return { q: 'In the vertical addition of ' + commas(a) + ' + ' + commas(b) + ', what value is carried into the ' +
                   colName + ' column?',
          options: (ch = opts(ans, [ans === 0 ? 1 : 0, 2, 10, 9])).options,
          answer: ch.answer,
          know: ['Add the columns from the right', 'A column that reaches ten carries one into the next column'],
          hints: ['Work out the column just to the right of the ' + colName + ' column.',
                  'If that column reaches ten or more, it carries 1.'],
          sol: 'The column just to the right of the ' + colName + ' column makes a carry of ' + ans +
               ', so ' + ans + ' is carried into the ' + colName + ' column.' };
      } },

    { id: 'w-distrib', name: 'The distributive property', icon: '\uD83D\uDDC3\uFE0F',
      homework: 'Using the distributive property, calculate 8 \u00D7 47 by expanding 47 as (40 + 7).', homeworkAnswer: '376',
      method: ['Split the two digit number into tens and ones.',
               'Multiply each part by the other number.',
               'Add the two answers together.'],
      make: function () {
        var a = ri(3, 9), tens = ri(2, 9) * 10, ones = ri(2, 9);
        var b = tens + ones, ans = a * b;
        return { q: 'Using the distributive property, calculate ' + a + ' \u00D7 ' + b + ' by expanding ' + b +
                   ' as (' + tens + ' + ' + ones + ').',
          options: (ch = opts(ans, [a * tens + ones, a * tens, a * ones, ans + 10])).options,
          answer: ch.answer,
          know: [b + ' splits into ' + tens + ' + ' + ones, 'Multiply each part by ' + a + ' separately'],
          hints: [a + ' \u00D7 ' + tens + ' and ' + a + ' \u00D7 ' + ones + ' are done separately.',
                  'Then add the two products.'],
          sol: a + ' \u00D7 ' + tens + ' = ' + (a * tens) + ' and ' + a + ' \u00D7 ' + ones + ' = ' + (a * ones) +
               '. Together: ' + (a * tens) + ' + ' + (a * ones) + ' = ' + ans + '.' };
      } },

    { id: 'w-mult', name: 'Multiplying whole numbers', icon: '\u2716\uFE0F',
      homework: 'Calculate the product of 345 \u00D7 28.', homeworkAnswer: '9,660',
      method: ['Multiply by the ones digit first, then by the tens digit.',
               'Shift the second line one place to the left because it is tens.',
               'Add the two lines together.'],
      make: function () {
        var a = ri(120, 980), b = ri(13, 79);
        var ans = a * b;
        return { q: 'Calculate the product of ' + commas(a) + ' \u00D7 ' + b + '.',
          options: (ch = opts(ans, [ans + 100, ans - 10, a * (b + 10), a * (b - 1)])).options,
          answer: ch.answer,
          know: ['Multiply by the ones of ' + b + ' first', 'Then by the tens, shifted one place left'],
          hints: ['Start with ' + a + ' \u00D7 ' + (b % 10) + '.', 'Then ' + a + ' \u00D7 ' + (Math.floor(b / 10) * 10) + '.'],
          sol: commas(a) + ' \u00D7 ' + b + ' = ' + commas(ans) + '.' };
      } },

    { id: 'w-div', name: 'Dividing whole numbers', icon: '\u2797',
      homework: 'Calculate 1,728 \u00F7 16.', homeworkAnswer: '108',
      method: ['Take the digits of the number from the left, one at a time.',
               'Work out how many times the divisor fits, and carry the remainder.',
               'Multiply back to check.'],
      make: function () {
        var b = ri(4, 24), ans = ri(24, 480);
        var a = b * ans;
        return { q: 'Calculate ' + commas(a) + ' \u00F7 ' + b + '.',
          options: (ch = opts(ans, [ans + 1, ans - 1, ans + 10, Math.floor(a / (b * 10))])).options,
          answer: ch.answer,
          know: [commas(a) + ' is shared into groups of ' + b, 'The answer is how many groups there are'],
          hints: ['How many times does ' + b + ' go into ' + commas(a) + '?', 'Check by multiplying your answer by ' + b + '.'],
          sol: commas(a) + ' \u00F7 ' + b + ' = ' + ans + ', because ' + b + ' \u00D7 ' + ans + ' = ' + commas(a) + '.' };
      } },

    { id: 'w-rem', name: 'Division with a remainder in context', icon: '\uD83E\uDD5B',
      homework: 'A factory packages 845 tennis balls into cans that hold 4 balls each. How many full cans, and how many balls left over?', homeworkAnswer: '211 full cans with 1 ball left over',
      method: ['Divide to find how many full groups fit.',
               'The whole number part is the number of full groups.',
               'What is left is the remainder - it is never rounded up here, because a part group is not full.'],
      make: function () {
        var per = ri(3, 9), full = ri(40, 320);
        var total = per * full + ri(1, per - 1);
        var left = total % per;
        var right = full + ' full cans with ' + left + ' ball' + (left === 1 ? '' : 's') + ' left over';
        return { q: 'A factory packages ' + commas(total) + ' tennis balls into cans that hold ' + per +
                   ' balls each. How many full cans are packaged, and how many balls are left over?',
          options: (ch = optsText(right, [
            (full + 1) + ' full cans with ' + (per - left) + ' ball' + (per - left === 1 ? '' : 's') + ' left over',
            full + ' full cans with ' + (left + 1) + ' balls left over',
            (full - 1) + ' full cans with ' + (left + per) + ' balls left over'
          ])).options,
          answer: ch.answer,
          know: [commas(total) + ' shared into groups of ' + per, 'Full groups only - a part group is the remainder'],
          hints: ['Divide ' + commas(total) + ' by ' + per + '.', 'The remainder is what is left over.'],
          sol: commas(total) + ' \u00F7 ' + per + ' = ' + full + ' remainder ' + left + ', so there are ' + full +
               ' full cans and ' + left + ' ball' + (left === 1 ? '' : 's') + ' left over.' };
      } },

    { id: 'w-roundup', name: 'Rounding up to fit everyone', icon: '\uD83D\uDE8C',
      homework: 'A school needs to transport 380 students. Each bus seats 45. What is the minimum number of buses?', homeworkAnswer: '9 buses',
      method: ['Divide the number of people by the seats in one bus.',
               'If there is anything left over, those people still need a bus.',
               'So round UP to the next whole bus - never down.'],
      make: function () {
        var seats = pick([24, 32, 40, 45, 52, 60]), buses = ri(4, 14);
        var people = seats * buses - ri(1, seats - 1);
        var need = Math.ceil(people / seats);
        var right = need + ' buses';
        return { q: 'A school needs to transport ' + commas(people) + ' students on buses. Each bus can seat a maximum of ' +
                   seats + ' students. What is the minimum number of buses required to transport all students?',
          options: (ch = optsText(right, [
            (need - 1) + ' buses', (need + 1) + ' buses',
            Math.floor(people / seats) + ' buses', (need + 2) + ' buses'
          ])).options,
          answer: ch.answer,
          know: [commas(people) + ' students', 'Each bus seats ' + seats, 'Everyone must fit'],
          hints: ['Divide ' + commas(people) + ' by ' + seats + '.', 'If anyone is left over they still need a seat.'],
          sol: commas(people) + ' \u00F7 ' + seats + ' leaves someone over, so you need one more bus than the whole number part: ' +
               need + ' buses.' };
      } },

    { id: 'w-round', name: 'Rounding to a place', icon: '\uD83C\uDFAF',
      homework: 'Round 68,492 to the nearest thousand.', homeworkAnswer: '68,000',
      method: ['Find the column you are rounding to.',
               'Look at the digit just to its right.',
               'Five or more rounds up, four or less stays the same - and the columns to the right become zeros.'],
      make: function () {
        var n = ri(12000, 989000);
        var to = pick([['hundred', 100], ['thousand', 1000], ['ten thousand', 10000]]);
        var ans = Math.round(n / to[1]) * to[1];
        var wrong1 = Math.floor(n / to[1]) * to[1];
        var wrong2 = Math.ceil(n / to[1]) * to[1];
        return { q: 'Round ' + commas(n) + ' to the nearest ' + to[0] + '.',
          options: (ch = opts(ans, [wrong1, wrong2, ans + to[1], ans - to[1]])).options,
          answer: ch.answer,
          know: ['Rounding to the nearest ' + to[0], 'Look at the digit one place to the right'],
          hints: ['Which digit is one place to the right of the ' + to[0] + 's?', 'Five or more rounds up.'],
          sol: commas(n) + ' is nearer to ' + commas(ans) + ' than to ' + commas(ans + to[1]) + ', so it rounds to ' + commas(ans) + '.' };
      } },

    { id: 'w-estprod', name: 'Estimating a product', icon: '\uD83D\uDCC8',
      homework: 'By rounding each number to its leading digit, estimate the product of 492 \u00D7 38.', homeworkAnswer: '20,000',
      method: ['Round each number to its leading digit (one significant figure).',
               'Multiply the rounded numbers - the leading digits and their zeros.',
               'The answer is an estimate, so it will be a round number.'],
      make: function () {
        var a = ri(210, 890), b = ri(21, 89);
        function lead(n) { var p = Math.pow(10, String(n).length - 1); return Math.round(n / p) * p; }
        var la = lead(a), lb = lead(b), ans = la * lb;
        return { q: 'By rounding each number to its leading digit (1 significant figure), estimate the product of ' +
                   commas(a) + ' \u00D7 ' + b + '.',
          options: (ch = opts(ans, [ans * 10, ans / 10, lead(a) * b, a * lead(b)])).options,
          answer: ch.answer,
          know: [commas(a) + ' rounds to ' + commas(la), b + ' rounds to ' + lb],
          hints: ['Round ' + commas(a) + ' first: it is nearest to ' + commas(la) + '.', 'Then multiply the rounded numbers.'],
          sol: commas(a) + ' \u2248 ' + commas(la) + ' and ' + b + ' \u2248 ' + lb + ', so the estimate is ' +
               commas(la) + ' \u00D7 ' + lb + ' = ' + commas(ans) + '.' };
      } },

    { id: 'w-estsum', name: 'Estimating a total', icon: '\uD83D\uDCB0',
      homework: 'A company spent $18,920 on hardware and $31,250 on software. Estimate the total by rounding to the nearest ten thousand.', homeworkAnswer: '$50,000',
      method: ['Round each amount to the place asked for.',
               'Add the rounded amounts.',
               'An estimate is a round number, not the exact total.'],
      make: function () {
        var to = pick([['ten thousand', 10000], ['thousand', 1000]]);
        var a = ri(12000, 48000), b = ri(15000, 62000);
        var ra = Math.round(a / to[1]) * to[1], rb = Math.round(b / to[1]) * to[1];
        var ans = ra + rb;
        var thing1 = pick(['hardware', 'furniture', 'books']), thing2 = pick(['software', 'training', 'delivery']);
        var right = '$' + commas(ans);
        return { q: 'A company spent $' + commas(a) + ' on ' + thing1 + ' and $' + commas(b) + ' on ' + thing2 +
                   '. Estimate the total expenditure by rounding each amount to the nearest ' + to[0] + '.',
          options: (ch = optsText(right, ['$' + commas(a + b), '$' + commas(ans + to[1]), '$' + commas(ans - to[1]), '$' + commas(ans + 2 * to[1])])).options,
          answer: ch.answer,
          know: [commas(a) + ' rounds to ' + commas(ra), commas(b) + ' rounds to ' + commas(rb)],
          hints: ['Round each amount to the nearest ' + to[0] + ' first.', 'Then add the two rounded amounts.'],
          sol: commas(a) + ' \u2248 ' + commas(ra) + ' and ' + commas(b) + ' \u2248 ' + commas(rb) + ', so the estimate is $' +
               commas(ans) + '.' };
      } },

    { id: 'w-ops', name: 'Order of operations', icon: '\uD83E\uDE84',
      homework: 'Evaluate 18 + 12 \u00F7 3 \u00D7 2 \u2212 5.', homeworkAnswer: '25',
      method: ['Brackets first, then powers.',
               'Then multiplication and division, working left to right.',
               'Addition and subtraction come last, also left to right.'],
      make: function () {
        var kind = pick(['plain', 'brackets', 'nested']);
        if (kind === 'plain') {
          var a = ri(6, 40), b = ri(2, 9), c = ri(2, 6), d = ri(2, 6), e = ri(2, 20);
          var ans = a + Math.floor(b / c) * d - e;
          if (Math.floor(b / c) * d === 0) return window.AU7.byId('w-ops').make();
          return { q: 'Evaluate the expression: ' + a + ' + ' + b + ' \u00F7 ' + c + ' \u00D7 ' + d + ' \u2212 ' + e,
            options: (ch = opts(ans, [((a + b) / c) * d - e, a + (b / (c * d)) - e, ans + d, ans - d])).options,
            answer: ch.answer,
            know: ['Division and multiplication are done before addition and subtraction',
                   'Work left to right within the same level'],
            hints: ['Do ' + b + ' \u00F7 ' + c + ' \u00D7 ' + d + ' first.', 'Then the adding and the taking away.'],
            sol: b + ' \u00F7 ' + c + ' = ' + Math.floor(b / c) + ', then \u00D7 ' + d + ' = ' + (Math.floor(b / c) * d) +
                 '. So ' + a + ' + ' + (Math.floor(b / c) * d) + ' \u2212 ' + e + ' = ' + ans + '.' };
        }
        if (kind === 'brackets') {
          var p = ri(4, 9), q = ri(2, 4), r = ri(2, 3), s = ri(2, 5);
          var inner = p - q, pow = Math.pow(r, s), ans2 = inner * pow / 4;
          if (ans2 !== Math.floor(ans2)) return window.AU7.byId('w-ops').make();
          return { q: 'Evaluate the expression: (' + p + ' \u2212 ' + q + ') \u00D7 ' + r + '<sup>' + s + '</sup> \u00F7 4',
            options: (ch = opts(ans2, [inner * r * s / 4, (p - q) * r + s, ans2 * 2, ans2 + 6])).options,
            answer: ch.answer,
            know: ['The bracket is done first', 'Then the power ' + r + '<sup>' + s + '</sup>'],
            hints: ['Work out the bracket: ' + p + ' \u2212 ' + q + ' = ' + inner + '.', 'Then ' + r + ' to the power ' + s + ' is ' + pow + '.'],
            sol: '(' + p + ' \u2212 ' + q + ') = ' + inner + ' and ' + r + '<sup>' + s + '</sup> = ' + pow + ', so ' +
                 inner + ' \u00D7 ' + pow + ' \u00F7 4 = ' + ans2 + '.' };
        }
        var t = ri(20, 60), u = ri(2, 8), v = ri(3, 9), w = ri(2, 5);
        var ans3 = t - (u + (v - 2) * w);
        return { q: 'Evaluate the expression: ' + t + ' \u2212 [' + u + ' + (' + v + ' \u2212 2) \u00D7 ' + w + ']',
          options: (ch = opts(ans3, [t - u + (v - 2) * w, t - (u + v - 2) * w, ans3 + w, ans3 - w])).options,
          answer: ch.answer,
          know: ['The inner bracket comes first', 'Then the square bracket, then what is left'],
          hints: ['Start inside the round bracket: ' + v + ' \u2212 2 = ' + (v - 2) + '.',
                  'Then ' + (v - 2) + ' \u00D7 ' + w + ' = ' + ((v - 2) * w) + '.'],
          sol: '(' + v + ' \u2212 2) = ' + (v - 2) + ', then ' + (v - 2) + ' \u00D7 ' + w + ' = ' + ((v - 2) * w) +
               '. So the bracket is ' + u + ' + ' + ((v - 2) * w) + ' = ' + (u + (v - 2) * w) + ', and ' + t + ' \u2212 ' +
               (u + (v - 2) * w) + ' = ' + ans3 + '.' };
      } },

    { id: 'w-expr', name: 'Writing the right expression', icon: '\uD83E\uDDFE',
      homework: 'A teacher buys 5 packs of markers at $6 and 3 boxes of pens at $4, paying with $50. Which expression gives her change?', homeworkAnswer: '50 \u2212 (5 \u00D7 6 + 3 \u00D7 4) = $8',
      method: ['Work out what is spent: number of packs times the price, added together.',
               'The change is what is paid minus what is spent.',
               'The spending must be worked out before it is taken away - so it goes in a bracket.'],
      make: function () {
        var n1 = ri(3, 8), p1 = ri(2, 9), n2 = ri(2, 7), p2 = ri(2, 8), bill = pick([50, 100]);
        var spend = n1 * p1 + n2 * p2;
        var change = bill - spend;
        var right = bill + ' \u2212 (' + n1 + ' \u00D7 ' + p1 + ' + ' + n2 + ' \u00D7 ' + p2 + ') = $' + change;
        var a1 = pick(['packs of markers', 'packets of cards', 'boxes of chalk']);
        var a2 = pick(['boxes of pens', 'packs of paper', 'tubs of glue']);
        return { q: 'A teacher buys ' + n1 + ' ' + a1 + ' at $' + p1 + ' each and ' + n2 + ' ' + a2 + ' at $' + p2 +
                   ' each. If she pays with a $' + bill + ' note, which expression correctly calculates her change, and what is it?',
          options: (ch = optsText(right, [
            bill + ' \u2212 ' + n1 + ' \u00D7 ' + p1 + ' + ' + n2 + ' \u00D7 ' + p2 + ' = $' + (bill - n1 * p1 + n2 * p2),
            '(' + bill + ' \u2212 ' + n1 + ') \u00D7 ' + p1 + ' + ' + n2 + ' \u00D7 ' + p2 + ' = $' + ((bill - n1) * p1 + n2 * p2),
            bill + ' \u2212 (' + n1 + ' \u00D7 ' + p1 + ') \u00D7 (' + n2 + ' \u00D7 ' + p2 + ') = $' + (bill - n1 * p1 * n2 * p2)
          ])).options,
          answer: ch.answer,
          know: ['Spent: ' + n1 + ' \u00D7 $' + p1 + ' plus ' + n2 + ' \u00D7 $' + p2,
                 'Change = what was paid minus what was spent'],
          hints: ['Work out the total spent first.', 'That total has to be taken away as one amount, so it needs a bracket.'],
          sol: 'Spent ' + n1 + ' \u00D7 ' + p1 + ' + ' + n2 + ' \u00D7 ' + p2 + ' = $' + spend + ', so the change is $' + bill +
               ' \u2212 $' + spend + ' = $' + change + '. The spending goes in a bracket so it is worked out first.' };
      } }
  ];

  /* ============================================================
     SHEET 2 - LINES, ANGLES AND PARALLEL LINE PROPERTIES
     ============================================================ */
  var DEG = '\u00B0';
  var ch;
  function art() { return window.AU7Art || {}; }   /* one slot for the choices, so they are shuffled once and the index matches */
  function angleQ(q, ans, wrongs, know, hints, sol) {
    var ch = opts(ans, wrongs, DEG);
    return { q: q, options: ch.options, answer: ch.answer, know: know, hints: hints, sol: sol };
  }

  var LINES = [
    { id: 'l-vocab', name: 'Points, lines and rays', icon: '\uD83D\uDCD0',
      homework: 'What term describes three or more points that all lie on the same straight line?', homeworkAnswer: 'Collinear points',
      method: ['Learn the three names: points on one line are collinear; lines through one point are concurrent; a figure with one endpoint is a ray.',
               'Read what the question describes.',
               'Match the description to the name.'],
      make: function () {
        var sets = [
          { q: 'What term describes three or more points that all lie on the exact same straight line?',
            right: 'Collinear points', wrong: ['Concurrent points', 'Parallel points', 'Coplanar points'],
            know: 'Collinear comes from co (together) and linear (line).' },
          { q: 'When three or more straight lines intersect at a single common point, how are these lines described?',
            right: 'Concurrent lines', wrong: ['Perpendicular lines', 'Parallel lines', 'Collinear lines'],
            know: 'Concurrent lines all pass through the one point.' },
          { q: 'A straight geometric figure starts at a fixed endpoint A and extends infinitely through point B in one direction. How is this figure named?',
            right: 'Ray AB', wrong: ['Line segment AB', 'Line AB', 'Angle AB'],
            know: 'One endpoint and going on forever in one direction is a ray.' },
          { q: 'What term describes lines that never meet, however far they are extended?',
            right: 'Parallel lines', wrong: ['Concurrent lines', 'Collinear lines', 'Perpendicular lines'],
            know: 'Parallel lines stay the same distance apart.' },
          { q: 'What term describes two lines that meet at exactly 90 degrees?',
            right: 'Perpendicular lines', wrong: ['Parallel lines', 'Collinear lines', 'Concurrent lines'],
            know: 'Perpendicular means meeting at a right angle.' }
        ];
        var s = pick(sets);
        var ch = optsText(s.right, s.wrong);
        return { q: s.q, options: ch.options, answer: ch.answer,
          know: [s.know], hints: ['Think about what the description says the figure does.', 'Match it to the name that means exactly that.'],
          sol: s.right + ' - ' + s.know };
      } },

    { id: 'l-classify', name: 'Classifying an angle', icon: '\uD83D\uDCD0',
      homework: 'An angle measures 215\u00B0. How is this angle classified?', homeworkAnswer: 'Reflex angle',
      method: ['Learn the ranges: acute is less than 90, right is exactly 90, obtuse is between 90 and 180.',
               'A straight angle is exactly 180, and a reflex angle is more than 180 but less than 360.',
               'Compare the measurement to those ranges.'],
      make: function () {
        var kinds = [
          { name: 'Acute angle', lo: 10, hi: 89 },
          { name: 'Obtuse angle', lo: 91, hi: 179 },
          { name: 'Reflex angle', lo: 181, hi: 359 }
        ];
        var k = pick(kinds);
        var a = ri(k.lo, k.hi);
        if (Math.random() < 0.2) { a = 90; k = { name: 'Right angle' }; }
        if (Math.random() < 0.1) { a = 180; k = { name: 'Straight angle' }; }
        var all = ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle', 'Reflex angle'];
        var ch = optsText(k.name, shuffle(all.filter(function (x) { return x !== k.name; })).slice(0, 3));
        return { q: 'An angle measures ' + a + DEG + '. How is this angle classified?',
          options: ch.options, answer: ch.answer,
          art: art().oneAngle ? art().oneAngle(a) : '',
          know: ['Less than 90 is acute', 'Exactly 90 is a right angle', 'Between 90 and 180 is obtuse',
                 'Exactly 180 is straight, and more than 180 is reflex'],
          hints: ['Which range does ' + a + DEG + ' fall into?', 'Compare it with 90' + DEG + ' and 180' + DEG + '.'],
          sol: a + DEG + ' is ' + (a < 90 ? 'less than 90' + DEG : a === 90 ? 'exactly 90' + DEG :
            a < 180 ? 'between 90' + DEG + ' and 180' + DEG : a === 180 ? 'exactly 180' + DEG : 'more than 180' + DEG) +
            ', so it is a ' + k.name.toLowerCase() + '.' };
      } },

    { id: 'l-facts', name: 'Right, straight and full turns', icon: '\uD83D\uDD04',
      homework: 'What is the exact angle measure of one complete revolution?', homeworkAnswer: '360\u00B0',
      method: ['Learn the three fixed amounts: a right angle is 90, a straight angle is 180, a full revolution is 360.',
               'Half a revolution is 180 and a quarter is 90.',
               'Answer with the exact amount.'],
      make: function () {
        var facts = [
          { q: 'What is the exact angle measure of one complete revolution?', a: 360, w: [180, 90, 270] },
          { q: 'What is the exact angle measure of a straight angle?', a: 180, w: [360, 90, 270] },
          { q: 'What is the exact angle measure of a right angle?', a: 90, w: [180, 360, 45] },
          { q: 'What is the exact angle measure of half a revolution?', a: 180, w: [360, 90, 270] },
          { q: 'What is the exact angle measure of three quarters of a revolution?', a: 270, w: [360, 180, 90] }
        ];
        var f = pick(facts);
        return angleQ(f.q, f.a, f.w,
          ['A full turn is 360' + DEG, 'A half turn is 180' + DEG, 'A quarter turn is 90' + DEG],
          ['Think of a clock face going right round.', 'A quarter turn is 90' + DEG + '.'],
          f.q.replace('What is the exact angle measure of ', '') + ' is ' + f.a + DEG + '.');
      } },

    { id: 'l-comp', name: 'Complementary angles', icon: '\uD83D\uDCD0',
      homework: 'Two angles are complementary. If one measures 34\u00B0, what is the other?', homeworkAnswer: '56\u00B0',
      method: ['Complementary angles add to 90 degrees.',
               'So the missing one is 90 minus the angle you are given.',
               'Check by adding the two together - they must make 90.'],
      make: function () {
        var a = ri(11, 79), ans = 90 - a;
        var q1 = angleQ('Two angles are complementary. If one angle measures ' + a + DEG + ', what is the measure of the other angle?',
          ans, [180 - a, a, 90 + a],
          ['Complementary angles add to 90' + DEG],
          ['What do complementary angles add up to?', 'So the other angle is 90' + DEG + ' \u2212 ' + a + DEG + '.'],
          'Complementary angles add to 90' + DEG + ', so the other angle is 90' + DEG + ' \u2212 ' + a + DEG + ' = ' + ans + DEG + '.');
        q1.art = art().complementary ? art().complementary(a) : '';
        return q1;
      } },

    { id: 'l-supp', name: 'Angles on a straight line', icon: '\uD83D\uDCCF',
      homework: 'Two adjacent angles lie on a straight line. If one angle is 112\u00B0, find the other.', homeworkAnswer: '68\u00B0',
      method: ['Angles on a straight line add to 180 degrees.',
               'So the missing one is 180 minus the angle you are given.',
               'Check the two add to 180.'],
      make: function () {
        var a = ri(20, 160), ans = 180 - a;
        var q2 = angleQ('Two adjacent angles lie on a straight line and are supplementary. If one angle is ' + a + DEG +
          ', find the size of the other angle.', ans, [90 - a, a, 360 - a],
          ['Angles on a straight line add to 180' + DEG],
          ['A straight line is 180' + DEG + '.', 'So the other angle is 180' + DEG + ' \u2212 ' + a + DEG + '.'],
          'Angles on a straight line add to 180' + DEG + ', so the other angle is 180' + DEG + ' \u2212 ' + a + DEG + ' = ' + ans + DEG + '.');
        q2.art = art().onStraightLine ? art().onStraightLine(a, true) : '';
        return q2;
      } },

    { id: 'l-vert', name: 'Vertically opposite angles', icon: '\u2716\uFE0F',
      homework: 'Two straight lines intersect. If one angle is 73\u00B0, what is the vertically opposite angle?', homeworkAnswer: '73\u00B0',
      method: ['When two straight lines cross, the angles opposite each other are equal.',
               'So the vertically opposite angle is the same as the one you are given.',
               'The angle next to it is the one that adds to 180.'],
      make: function () {
        var a = ri(20, 160);
        var q3 = angleQ('Two straight lines intersect to form opposite angles. If one angle is ' + a +
          DEG + ', what is the size of the vertically opposite angle?', a, [180 - a, 90 - a, a + 10],
          ['Vertically opposite angles are equal'],
          ['Vertically opposite angles are the same size.', 'So it is ' + a + DEG + ' too.'],
          'Vertically opposite angles are equal, so the opposite angle is also ' + a + DEG + '.');
        q3.art = art().crossing ? art().crossing(a, 'pair') : '';
        return q3;
      } },

    { id: 'l-point', name: 'Angles meeting at a point', icon: '\uD83D\uDD35',
      homework: 'Four angles meet at a point. Three measure 85\u00B0, 110\u00B0 and 95\u00B0. Find the fourth.', homeworkAnswer: '70\u00B0',
      method: ['Angles meeting at a point make a full turn, which is 360 degrees.',
               'Add the angles you are given.',
               'Take that total away from 360.'],
      make: function () {
        var n = pick([3, 4]), known = n - 1, list = [], total = 0, i;
        for (i = 0; i < known; i++) { var a = ri(30, 140); list.push(a); total += a; }
        var ans = 360 - total;
        if (ans < 15 || ans > 200) return window.AU7.byId('l-point').make();
        var q4 = angleQ(n + ' angles meet at a single vertex point. ' + known + ' of them measure ' +
          list.join(DEG + ', ') + DEG + '. Find the size of the missing angle x.',
          ans, [180 - total, ans + 20, 360 + total],
          ['Angles at a point add to 360' + DEG, 'The angles given add to ' + total + DEG],
          ['Add the angles you know.', 'Take the total away from 360' + DEG + '.'],
          'The known angles add to ' + total + DEG + '. Angles at a point make 360' + DEG + ', so x = 360' + DEG + ' \u2212 ' +
          total + DEG + ' = ' + ans + DEG + '.');
        q4.art = art().atPoint ? art().atPoint(list, ans) : '';
        return q4;
      } },

    { id: 'l-right', name: 'Angles inside a right angle', icon: '\uD83D\uDCD0',
      homework: 'Line AB is perpendicular to CD. Ray OE is inside angle AOC of 90\u00B0, with angle AOE = 28\u00B0. Find angle EOC.', homeworkAnswer: '62\u00B0',
      method: ['A right angle is 90 degrees.',
               'The two angles inside it add up to 90.',
               'So the one you want is 90 minus the one you are given.'],
      make: function () {
        var a = ri(12, 78), ans = 90 - a;
        var q5 = angleQ('Line AB is perpendicular to line CD, meeting at O to form the right angle AOC of 90' + DEG +
          '. Ray OE is drawn inside angle AOC so that angle AOE is ' + a + DEG + '. What is the measure of angle EOC?',
          ans, [180 - a, a, 90 + a],
          ['AOC is a right angle, so it is 90' + DEG, 'AOE and EOC together make up AOC'],
          ['The two angles together make 90' + DEG + '.', 'So EOC is 90' + DEG + ' \u2212 ' + a + DEG + '.'],
          'AOE and EOC together make the right angle AOC, so EOC = 90' + DEG + ' \u2212 ' + a + DEG + ' = ' + ans + DEG + '.');
        q5.art = art().insideRight ? art().insideRight(a) : '';
        return q5;
      } },

    { id: 'l-corresp', name: 'Corresponding angles', icon: '\u2194\uFE0F',
      homework: 'Two parallel lines are cut by a transversal. If an angle is 65\u00B0, what is its corresponding angle?', homeworkAnswer: '65\u00B0',
      method: ['When two parallel lines are cut by a transversal, corresponding angles are equal.',
               'Corresponding angles sit in the same position at each intersection - both top left, or both bottom right.',
               'So the corresponding angle is the same as the one you are given.'],
      make: function () {
        var a = ri(25, 155);
        var q6 = angleQ('Two parallel lines are cut by a transversal line. If a given angle is ' + a +
          DEG + ', what is the measure of its corresponding angle?', a, [180 - a, 90 - a, a + 15],
          ['Corresponding angles between parallel lines are equal'],
          ['Corresponding angles are in matching positions.', 'So they are the same size.'],
          'Corresponding angles are equal when the lines are parallel, so it is ' + a + DEG + '.');
        q6.art = art().parallelCut ? art().parallelCut(a, 'corresponding') : '';
        return q6;
      } },

    { id: 'l-alt', name: 'Alternate interior angles', icon: '\u2197\uFE0F',
      homework: 'Two parallel lines are cut by a transversal. One alternate interior angle is 124\u00B0. What is the other?', homeworkAnswer: '124\u00B0',
      method: ['When two parallel lines are cut by a transversal, alternate interior angles are equal.',
               'They sit between the two lines, on opposite sides of the transversal - they make a Z shape.',
               'So the other alternate interior angle is the same.'],
      make: function () {
        var a = ri(25, 155);
        var q7 = angleQ('Two parallel lines are intersected by a transversal. One of the alternate interior angles measures ' +
          a + DEG + '. What is the measure of the other alternate interior angle?', a, [180 - a, 90 - a, a - 20],
          ['Alternate interior angles between parallel lines are equal'],
          ['They make a Z shape between the lines.', 'Alternate angles are equal.'],
          'Alternate interior angles are equal between parallel lines, so the other one is ' + a + DEG + '.');
        q7.art = art().parallelCut ? art().parallelCut(a, 'alternate') : '';
        return q7;
      } },

    { id: 'l-coint', name: 'Co-interior angles', icon: '\uD83E\uDD1D',
      homework: 'Two parallel lines are cut by a transversal. If one co-interior angle is 78\u00B0, what is the other?', homeworkAnswer: '102\u00B0',
      method: ['Co-interior angles sit between the two parallel lines on the SAME side of the transversal.',
               'They add up to 180 degrees - they make a C shape.',
               'So the other one is 180 minus the one you are given.'],
      make: function () {
        var a = ri(25, 155), ans = 180 - a;
        var q8 = angleQ('Two parallel lines are intersected by a transversal. If one co-interior angle is ' + a +
          DEG + ', what is the measure of the other co-interior angle on the same side of the transversal?',
          ans, [a, 90 - a, 360 - a],
          ['Co-interior angles add to 180' + DEG],
          ['They make a C shape and add to 180' + DEG + '.', 'So it is 180' + DEG + ' \u2212 ' + a + DEG + '.'],
          'Co-interior angles add to 180' + DEG + ', so the other is 180' + DEG + ' \u2212 ' + a + DEG + ' = ' + ans + DEG + '.');
        q8.art = art().parallelCut ? art().parallelCut(a, 'cointerior') : '';
        return q8;
      } },

    { id: 'l-partest', name: 'Are the lines parallel?', icon: '\uD83E\uDD14',
      homework: 'The interior angles on the same side of the transversal measure 82\u00B0 and 98\u00B0. Are the lines parallel?', homeworkAnswer: 'Yes, because the co-interior angles add up to 180\u00B0',
      method: ['Decide which pair of angles you have: co-interior, alternate, or corresponding.',
               'Use the test: co-interior must add to 180, and alternate or corresponding must be equal.',
               'If the test fails, the lines are not parallel - say which test failed.'],
      make: function () {
        var coint = Math.random() < 0.5;
        var a, b, right, wrongs;
        if (coint) {
          a = ri(60, 120);
          b = 180 - a;
          right = 'Yes, because the co-interior angles add up to 180' + DEG;
          wrongs = ['No, because the two interior angles are not equal',
                    'Yes, because alternate angles are equal',
                    'No, because their sum is less than 360' + DEG];
          return { q: 'Two straight lines are cut by a transversal line. The interior angles on the same side of the transversal measure ' +
            a + DEG + ' and ' + b + DEG + '. Are the two lines parallel?',
            options: (ch = optsText(right, wrongs)).options, answer: ch.answer,
            know: ['Co-interior angles are on the same side of the transversal', 'They must add to 180' + DEG + ' for the lines to be parallel',
                   a + DEG + ' + ' + b + DEG + ' = ' + (a + b) + DEG],
            hints: ['Add the two angles.', 'If they make 180' + DEG + ', the lines are parallel.'],
            sol: a + DEG + ' + ' + b + DEG + ' = 180' + DEG + ', and co-interior angles that add to 180' + DEG +
                 ' mean the lines are parallel.' };
        }
        a = ri(60, 120); b = a + ri(4, 20);
        right = 'No, because the co-interior angles do not add up to 180' + DEG;
        wrongs = ['Yes, because both angles are obtuse',
                  'Yes, because the sum is greater than 180' + DEG,
                  'No, because alternate angles are always equal'];
        return { q: 'Two straight lines are cut by a transversal line. The interior angles on the same side of the transversal measure ' +
          a + DEG + ' and ' + b + DEG + '. Are the two lines parallel?',
          options: (ch = optsText(right, wrongs)).options, answer: ch.answer,
          know: ['Co-interior angles must add to 180' + DEG + ' for the lines to be parallel',
                 a + DEG + ' + ' + b + DEG + ' = ' + (a + b) + DEG],
          hints: ['Add the two angles.', 'They do not make 180' + DEG + ', so what does that tell you?'],
          sol: a + DEG + ' + ' + b + DEG + ' = ' + (a + b) + DEG + ', which is not 180' + DEG +
               ', so the lines are not parallel.' };
      } },

    { id: 'l-algadj', name: 'Finding x with angles on a line', icon: '\uD83D\uDD22',
      homework: 'Two adjacent angles on a straight line are (3x + 15)\u00B0 and (2x + 10)\u00B0. Find x.', homeworkAnswer: '31',
      method: ['Write the rule first: angles on a straight line add to 180.',
               'Add the two expressions and set the total equal to 180.',
               'Solve the equation for x.'],
      make: function () {
        var x = ri(6, 40), a = ri(2, 5), b = ri(2, 5);
        var sum = (a + b) * x;
        var k1 = ri(5, 40), k2 = 180 - sum - k1;
        if (k2 < 1 || k2 > 60) return window.AU7.byId('l-algadj').make();
        return { q: 'Two adjacent angles on a straight line are given by the expressions (' + a + 'x + ' + k1 +
          ')' + DEG + ' and (' + b + 'x + ' + k2 + ')' + DEG + '. Find the value of x.',
          options: (ch = opts(x, [x + 1, x - 1, x + 5, 180 - x])).options,
          answer: ch.answer,
          know: ['Angles on a straight line add to 180' + DEG,
                 '(' + a + 'x + ' + k1 + ') + (' + b + 'x + ' + k2 + ') = 180'],
          hints: ['Add the two expressions: the x parts give ' + (a + b) + 'x.', 'The numbers give ' + (k1 + k2) + ', so ' +
                  (a + b) + 'x + ' + (k1 + k2) + ' = 180.'],
          art: art().onStraightLine ? art().onStraightLine(a * x + k1, true) : '',
          sol: '(' + a + 'x + ' + k1 + ') + (' + b + 'x + ' + k2 + ') = 180, so ' + (a + b) + 'x + ' + (k1 + k2) +
               ' = 180, giving ' + (a + b) + 'x = ' + sum + ' and x = ' + x + '.' };
      } },

    { id: 'l-algvert', name: 'Finding x with vertically opposite angles', icon: '\uD83D\uDD22',
      homework: 'Two intersecting lines form vertically opposite angles (4x \u2212 20)\u00B0 and (2x + 30)\u00B0. Find x.', homeworkAnswer: '25',
      method: ['Write the rule first: vertically opposite angles are equal.',
               'Set the two expressions equal to each other.',
               'Solve the equation for x.'],
      make: function () {
        var x = ri(8, 45), a = ri(3, 6), b = a - ri(1, 2);
        if (b < 1) return window.AU7.byId('l-algvert').make();
        var k2 = ri(10, 60);
        /* a x - k1 must equal b x + k2, so k1 = (a - b) x - k2 */
        var k1 = (a - b) * x - k2;
        if (k1 < 1) return window.AU7.byId('l-algvert').make();
        return { q: 'Two intersecting lines form vertically opposite angles measuring (' + a + 'x \u2212 ' + k1 +
          ')' + DEG + ' and (' + b + 'x + ' + k2 + ')' + DEG + '. Find the value of x.',
          options: (ch = opts(x, [x + 1, x - 1, x + 5, k1 + k2])).options,
          answer: ch.answer,
          know: ['Vertically opposite angles are equal',
                 a + 'x \u2212 ' + k1 + ' = ' + b + 'x + ' + k2],
          hints: ['Set the two expressions equal.', 'Move the x terms to one side: ' + (a - b) + 'x = ' + (k1 + k2) + '.'],
          art: art().crossing ? art().crossing(a * x - k1, 'pair') : '',
          sol: 'Vertically opposite angles are equal, so ' + a + 'x \u2212 ' + k1 + ' = ' + b + 'x + ' + k2 + '. That gives ' +
               (a - b) + 'x = ' + (k1 + k2) + ', so x = ' + x + '.' };
      } },

    { id: 'l-tri', name: 'A triangle between parallel lines', icon: '\uD83D\uDD3A',
      homework: 'AB is parallel to CD. Triangle EFG has E on AB, F and G on CD, angle AEF = 50\u00B0 and angle BEG = 60\u00B0. Find angle FEG.', homeworkAnswer: '70\u00B0',
      method: ['A, E and B lie on one straight line, so the three angles at E add to 180 degrees.',
               'Two of them are given; take them away from 180.',
               'What is left is the angle of the triangle at E.'],
      make: function () {
        var a = ri(25, 80), b = ri(25, 80);
        var ans = 180 - a - b;
        if (ans < 20) return window.AU7.byId('l-tri').make();
        var q9 = angleQ('Line AB is parallel to line CD. A triangle EFG has its top vertex E on line AB and its base vertices F and G on line CD. ' +
          'If angle AEF = ' + a + DEG + ' and angle BEG = ' + b + DEG + ', calculate the interior top angle FEG of the triangle.',
          ans, [a + b, 90 - a, 180 - a],
          ['A, E and B are on one straight line, so the angles at E add to 180' + DEG,
           'The angles given are ' + a + DEG + ' and ' + b + DEG],
          ['The straight line through E is 180' + DEG + '.', 'So FEG = 180' + DEG + ' \u2212 ' + a + DEG + ' \u2212 ' + b + DEG + '.'],
          'A, E and B are in a straight line, so ' + a + DEG + ' + FEG + ' + b + DEG + ' = 180' + DEG + '. ' +
          'That makes FEG = 180' + DEG + ' \u2212 ' + a + DEG + ' \u2212 ' + b + DEG + ' = ' + ans + DEG + '.');
        q9.art = art().triangleBetween ? art().triangleBetween(a, b, ans) : '';
        return q9;
      } },

    { id: 'l-bent', name: 'A bent path between parallel lines', icon: '\uD83D\uDD00',
      homework: 'L1 is parallel to L2. A bent path has an upper angle of 35\u00B0 and a lower angle of 45\u00B0. What is the interior angle V?', homeworkAnswer: '80\u00B0',
      method: ['Draw a line through the bend V, parallel to both L1 and L2.',
               'That splits the angle at V into two alternate angles, one equal to the upper angle and one equal to the lower angle.',
               'So the angle at V is the two given angles added together.'],
      make: function () {
        var a = ri(20, 75), b = ri(20, 75);
        var ans = a + b;
        var q10 = angleQ('Line L1 is parallel to line L2. A bent path forms an interior vertex V between the lines. The upper angle between L1 and the top arm is ' +
          a + DEG + ', and the lower angle between L2 and the bottom arm is ' + b + DEG +
          '. What is the total measure of the interior angle V facing the opening?',
          ans, [180 - a - b, Math.abs(a - b), 180 - ans],
          ['A line drawn through V parallel to the two lines splits the angle at V',
           'The two parts are alternate angles, so they equal ' + a + DEG + ' and ' + b + DEG],
          ['The two parts of the angle at V are alternate angles.', 'So V = ' + a + DEG + ' + ' + b + DEG + '.'],
          'Drawing a parallel line through V makes the two parts alternate angles equal to ' + a + DEG + ' and ' + b + DEG +
          ', so V = ' + a + DEG + ' + ' + b + DEG + ' = ' + ans + DEG + '.');
        q10.art = art().bentPath ? art().bentPath(a, b, ans) : '';
        return q10;
      } }
  ];

  window.AU7 = {
    whole: WHOLE,
    lines: LINES,
    all: WHOLE.concat(LINES),
    byId: function (id) {
      var all = window.AU7.all;
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    }
  };
})();
