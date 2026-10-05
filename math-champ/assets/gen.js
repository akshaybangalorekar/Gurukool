/* ============================================================
   MATH-CHAMP - question generators
   Every question is built fresh with random numbers, so practice
   never repeats. Each one carries: the question, the answer, two
   nudges, the data pulled out of the words, and a worked solution.
   Used by the lesson page and by the daily test.
   ============================================================ */
(function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function lcm(a, b) { return a * b / gcd(a, b); }
  function isPrime(n) { if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function frac(n, d) { var g = gcd(n, d); return (n / g) + '/' + (d / g); }

  var TOPICS = [
    { key: 'frac', name: 'Fractions', icon: '🍕', blurb: 'Find a fraction of an amount.',
      gen: {
        easy: function () { var d = pick([2, 4, 5, 10]), n = ri(1, d - 1), tot = d * ri(3, 9);
          return { q: 'What is ' + n + '/' + d + ' of ' + tot + '?', ans: tot / d * n, unit: '',
            know: ['The whole amount: ' + tot, 'The fraction: ' + n + '/' + d, 'Divide by the bottom number, then multiply by the top one'],
            hints: ['Divide ' + tot + ' by ' + d + ' first — that is one part.', 'Then take ' + n + ' of those parts.'],
            sol: tot + ' divided by ' + d + ' is ' + (tot / d) + ', and ' + n + ' of those is ' + (tot / d * n) + '.' }; },
        medium: function () { var d = pick([8, 12, 15, 20]), n = ri(2, d - 2), tot = d * ri(4, 12);
          return { q: 'What is ' + n + '/' + d + ' of ' + tot + '?', ans: tot / d * n, unit: '',
            know: ['The whole amount: ' + tot, 'The fraction: ' + n + '/' + d, 'One part = ' + tot + ' ÷ ' + d],
            hints: ['Find one ' + d + 'th first: ' + tot + ' ÷ ' + d + '.', 'Then multiply by ' + n + '.'],
            sol: 'One part is ' + (tot / d) + ', so ' + n + ' parts is ' + (tot / d) + ' × ' + n + ' = ' + (tot / d * n) + '.' }; },
        hard: function () { var d1 = pick([3, 4, 5]), n1 = ri(1, d1 - 1), d2 = pick([2, 5]), n2 = ri(1, d2 - 1), tot = d1 * d2 * ri(4, 10);
          return { q: 'What is ' + n1 + '/' + d1 + ' of ' + n2 + '/' + d2 + ' of ' + tot + '?', ans: tot / d1 * n1 / d2 * n2, unit: '',
            know: ['Take the fractions one at a time', 'First: ' + n2 + '/' + d2 + ' of ' + tot, 'Then: ' + n1 + '/' + d1 + ' of that'],
            hints: ['Do the inner fraction first: ' + n2 + '/' + d2 + ' of ' + tot + '.', 'Then take ' + n1 + '/' + d1 + ' of the answer you just found.'],
            sol: 'First ' + n2 + '/' + d2 + ' of ' + tot + ' is ' + (tot / d2 * n2) + '. Then ' + n1 + '/' + d1 + ' of that is ' + (tot / d2 * n2 / d1 * n1) + '. Fractions of fractions are done one at a time, in order.' }; }
      } },
    { key: 'ratio', name: 'Ratio', icon: '⚖️', blurb: 'Share an amount in a given ratio.',
      gen: {
        easy: function () { var a = ri(2, 4), b = ri(2, 5), part = ri(10, 30), tot = (a + b) * part;
          return { q: 'Share ' + tot + ' in the ratio ' + a + ' : ' + b + '. What is the larger share?', ans: Math.max(a, b) * part, unit: '',
            know: ['Total to share: ' + tot, 'Ratio ' + a + ' : ' + b, 'Parts altogether: ' + (a + b)],
            hints: ['Add the ratio numbers to find how many parts: ' + a + ' + ' + b + ' = ' + (a + b) + '.', 'One part is ' + tot + ' ÷ ' + (a + b) + '.'],
            sol: (a + b) + ' parts, so one part is ' + part + '. The larger share is ' + Math.max(a, b) + ' parts = ' + (Math.max(a, b) * part) + '.' }; },
        medium: function () { var a = ri(2, 5), b = ri(3, 6), c = ri(2, 5), part = ri(8, 25), tot = (a + b + c) * part;
          return { q: 'Share ' + tot + ' in the ratio ' + a + ' : ' + b + ' : ' + c + '. What does the middle share get?', ans: b * part, unit: '',
            know: ['Total: ' + tot, 'Ratio ' + a + ' : ' + b + ' : ' + c, 'Parts: ' + (a + b + c)],
            hints: ['Add all three ratio numbers: ' + (a + b + c) + ' parts.', 'One part = ' + tot + ' ÷ ' + (a + b + c) + ', then take ' + b + ' of them.'],
            sol: (a + b + c) + ' parts of ' + part + ' each, and the middle share takes ' + b + ' parts = ' + (b * part) + '.' }; },
        hard: function () { var a = ri(2, 4), b = ri(3, 5), part = ri(12, 30), tot = (a + b) * part, give = part;
          return { q: 'Two people share ' + tot + ' in the ratio ' + a + ' : ' + b + '. The first person then gives away ' + give + '. How much does the first person have left?', ans: a * part - give, unit: '',
            know: ['Total: ' + tot, 'Ratio ' + a + ' : ' + b, 'Then ' + give + ' is given away'],
            hints: ['Find the first share first: ' + a + ' parts.', 'Then subtract the ' + give + ' that is given away.'],
            sol: 'The first share is ' + a + ' × ' + part + ' = ' + (a * part) + '. After giving away ' + give + ', ' + (a * part) + ' − ' + give + ' = ' + (a * part - give) + '. Do the sharing first, then the giving away.' }; }
      } },
    { key: 'pct', name: 'Percentages', icon: '％', blurb: 'Find, increase and compare percentages.',
      gen: {
        easy: function () { var p = pick([10, 20, 25, 50]), n = pick([40, 60, 80, 120, 200]);
          return { q: 'What is ' + p + '% of ' + n + '?', ans: n * p / 100, unit: '',
            know: ['Amount: ' + n, 'Percentage: ' + p + '%', 'Per cent means out of 100'],
            hints: ['10% is the number divided by 10.', '25% is a quarter, and 50% is a half.'],
            sol: p + '% of ' + n + ' = ' + n + ' × ' + p + ' ÷ 100 = ' + (n * p / 100) + '.' }; },
        medium: function () { var p = pick([15, 30, 35, 45]), n = pick([60, 80, 140, 240]);
          return { q: 'A price of ' + n + ' goes up by ' + p + '%. What is the new price?', ans: n * (100 + p) / 100, unit: '',
            know: ['Original: ' + n, 'Increase: ' + p + '%', 'The new price is the original plus the rise'],
            hints: ['Build the percentage out of 10% pieces first.', 'Then ADD it to the original — the question asks for the new price.'],
            sol: 'The rise is ' + (n * p / 100) + ', so the new price is ' + n + ' + ' + (n * p / 100) + ' = ' + (n * (100 + p) / 100) + '.' }; },
        hard: function () { var p = pick([20, 25, 40]), n = pick([50, 80, 120]);
          return { q: 'A price of ' + n + ' is raised by ' + p + '%, then the new price is cut by ' + p + '%. What is the final price?', ans: Math.round(n * (100 + p) * (100 - p)) / 10000 * 100, unit: '',
            know: ['Start: ' + n, 'Raise by ' + p + '%, then cut the NEW price by ' + p + '%', 'The two percentages act on different amounts'],
            hints: ['Do it in two steps, and use the raised price for the second step.', 'Raising then cutting by the same percentage always ends below the start.'],
            sol: 'After the rise: ' + (n * (100 + p) / 100) + '. Then cut that by ' + p + '%: ' + (Math.round(n * (100 + p) * (100 - p)) / 10000 * 100) + '. The final price is lower than the start, because the cut is taken from a bigger number.' }; }
      } },
    { key: 'prime', name: 'Primes and factors', icon: '🔢', blurb: 'Spot primes and find factors.',
      gen: {
        easy: function () { var n = pick([21, 27, 33, 39, 51, 57]), p = pick([23, 29, 31, 37, 43, 47]);
          return { q: 'Which of these is prime: ' + n + ' or ' + p + '? Type the prime.', ans: p, unit: '',
            know: ['A prime has only two factors: 1 and itself', 'If the digits add to a multiple of 3, the number is not prime', 'Test the small primes: 2, 3, 5, 7'],
            hints: ['Add the digits of each number. A multiple of 3 rules it out.', 'Only one of them survives the small primes.'],
            sol: n + ' is not prime (its digits add to a multiple of 3). ' + p + ' has no small factors, so it is prime.' }; },
        medium: function () { var n = ri(20, 60), p = n + 1; while (!isPrime(p)) p++;
          return { q: 'What is the smallest prime number greater than ' + n + '?', ans: p, unit: '',
            know: ['You need a prime number', 'It must be bigger than ' + n, 'Check odd numbers, skipping multiples of 3 and 5'],
            hints: ['Start just above ' + n + ' and test each number.', 'Skip anything ending in 5 or whose digits add to a multiple of 3.'],
            sol: 'Testing upwards from ' + n + ', the first number with no small factor is ' + p + '.' }; },
        hard: function () { var a = ri(6, 18), b = ri(20, 40);
          return { q: 'What is the lowest common multiple of ' + a + ' and ' + b + '?', ans: lcm(a, b), unit: '',
            know: ['Multiples of ' + a + ' and multiples of ' + b, 'You want the SMALLEST number in both lists', 'The LCM is a × b ÷ (highest common factor)'],
            hints: ['List the multiples of the bigger number and test each against the smaller.', 'Or find the highest common factor first, then divide a × b by it.'],
            sol: 'The highest common factor of ' + a + ' and ' + b + ' is ' + gcd(a, b) + ', so the LCM is ' + a + ' × ' + b + ' ÷ ' + gcd(a, b) + ' = ' + lcm(a, b) + '.' }; }
      } },
    { key: 'balance', name: 'Balancing equations', icon: '⚖️', blurb: 'Find the missing number.',
      gen: {
        easy: function () { var x = ri(3, 15), a = ri(4, 20);
          return { q: 'Solve for x:  x + ' + a + ' = ' + (x + a), ans: x, unit: '',
            know: ['The equation: x + ' + a + ' = ' + (x + a), 'Undo the addition', 'What you do to one side, do to the other'],
            hints: ['To undo + ' + a + ', subtract ' + a + ' from both sides.', 'What is left on the left is just x.'],
            sol: 'x = ' + (x + a) + ' − ' + a + ' = ' + x + '. Undo the operation that was done to x.' }; },
        medium: function () { var x = ri(3, 12), a = ri(2, 6), b = ri(3, 20);
          return { q: 'Solve for x:  ' + a + 'x − ' + b + ' = ' + (a * x - b), ans: x, unit: '',
            know: ['The equation: ' + a + 'x − ' + b + ' = ' + (a * x - b), 'Undo the subtraction first', 'Then undo the multiplication'],
            hints: ['Add ' + b + ' to both sides first.', 'Then divide both sides by ' + a + '.'],
            sol: 'Add ' + b + ': ' + a + 'x = ' + (a * x) + '. Divide by ' + a + ': x = ' + x + '. Undo in the opposite order to how it was built.' }; },
        hard: function () {
          /* build it FROM x, so the equation is guaranteed to hold for the stated answer */
          var x = ri(3, 10), a = ri(2, 4), b = ri(2, 7);
          var c = Math.ceil(a * (x + b) / x) + ri(1, 3);
          var k = c * x - a * (x + b);
          return { q: 'Solve for x:  ' + a + '(x + ' + b + ') = ' + c + 'x − ' + k + '. Type x.', ans: x, unit: '',
            know: ['Multiply out the bracket first', 'Then collect the x terms on one side', 'Then collect the plain numbers on the other'],
            hints: ['Write the left side without brackets: ' + a + 'x + ' + (a * b) + '.', 'Move the x terms together and the numbers together, then divide.'],
            sol: 'Multiply out: ' + a + 'x + ' + (a * b) + ' = ' + c + 'x − ' + k + '. Gather the x terms and the numbers: ' + a + 'x − ' + c + 'x = −' + k + ' − ' + (a * b) + ', so x = ' + x + '.' }; }
      } },
    { key: 'ints', name: 'Adding and subtracting', icon: '➕', blurb: 'Work with positive and negative numbers.',
      gen: {
        easy: function () { var a = ri(8, 40), b = ri(3, 25);
          return { q: a + ' + ' + b + ' = ?', ans: a + b, unit: '',
            know: ['Start at ' + a, 'Add ' + b],
            hints: ['Add the tens first, then the units.', 'You can count on from ' + a + '.'],
            sol: a + ' + ' + b + ' = ' + (a + b) + '.' }; },
        medium: function () { var a = ri(5, 30), b = ri(6, 25), c = ri(4, 20);
          return { q: '−' + a + ' + ' + b + ' − ' + c + ' = ?', ans: -a + b - c, unit: '',
            know: ['Start at −' + a, 'Add ' + b + ', then subtract ' + c, 'Signs do the work: plus moves right, minus moves left'],
            hints: ['Do the two moves one at a time.', '−' + a + ' + ' + b + ' = ' + (b - a) + '; then subtract ' + c + '.'],
            sol: '−' + a + ' + ' + b + ' = ' + (b - a) + ', then ' + (b - a) + ' − ' + c + ' = ' + (-a + b - c) + '.' }; },
        hard: function () { var a = ri(10, 30), b = ri(5, 15), c = ri(6, 20), d = ri(3, 12);
          return { q: a + ' − (' + b + ' − ' + c + ') − ' + d + ' = ?', ans: a - (b - c) - d, unit: '',
            know: ['Work out the bracket first', 'Subtracting a bracket flips the signs inside it', 'Then do the rest left to right'],
            hints: ['The bracket is ' + b + ' − ' + c + ' = ' + (b - c) + '.', 'Then ' + a + ' − ' + (b - c) + ' − ' + d + '.'],
            sol: 'The bracket is ' + (b - c) + '. Then ' + a + ' − ' + (b - c) + ' − ' + d + ' = ' + (a - (b - c) - d) + '. Always clear the bracket before the rest.' }; }
      } },
    { key: 'speed', name: 'Average speed', icon: '🚗', blurb: 'Distance, time and speed.',
      gen: {
        easy: function () { var t = ri(2, 6), s = pick([40, 50, 60, 70, 80]);
          return { q: 'A car travels at ' + s + ' km/h for ' + t + ' hours. How far does it go?', ans: s * t, unit: 'km',
            know: ['Speed: ' + s + ' km/h', 'Time: ' + t + ' hours', 'Distance = speed × time'],
            hints: ['Speed tells you the distance in ONE hour.', 'Multiply by the number of hours.'],
            sol: s + ' km each hour for ' + t + ' hours is ' + s + ' × ' + t + ' = ' + (s * t) + ' km.' }; },
        medium: function () { var s = pick([50, 60, 80]), t = ri(2, 5), d = s * t;
          return { q: 'A train travels ' + d + ' km in ' + t + ' hours. What is its average speed in km/h?', ans: s, unit: 'km/h',
            know: ['Distance: ' + d + ' km', 'Time: ' + t + ' hours', 'Average speed = distance ÷ time'],
            hints: ['You want the distance covered in ONE hour.', 'Divide the distance by the time.'],
            sol: d + ' ÷ ' + t + ' = ' + s + ' km/h.' }; },
        hard: function () { var s1 = pick([30, 40, 60]), s2 = pick([60, 90, 120]), t1 = pick([1, 2]), t2 = pick([1, 2]), d1 = s1 * t1, d2 = s2 * t2;
          return { q: 'A driver goes ' + d1 + ' km at ' + s1 + ' km/h, then ' + d2 + ' km at ' + s2 + ' km/h. What is the average speed for the whole trip, in km/h?', ans: Math.round((d1 + d2) / (t1 + t2) * 100) / 100, unit: 'km/h',
            know: ['Leg 1: ' + d1 + ' km at ' + s1 + ' km/h → ' + t1 + ' hours', 'Leg 2: ' + d2 + ' km at ' + s2 + ' km/h → ' + t2 + ' hours', 'Average speed = TOTAL distance ÷ TOTAL time'],
            hints: ['Work out the time for each leg separately.', 'Then divide the total distance by the total time — never average the two speeds.'],
            sol: 'Total distance ' + (d1 + d2) + ' km in ' + (t1 + t2) + ' hours gives ' + (Math.round((d1 + d2) / (t1 + t2) * 100) / 100) + ' km/h. Averaging the speeds themselves would be wrong.' }; }
      } },
    { key: 'money', name: 'Money', icon: '\ud83d\udcb0', blurb: 'Prices, change and discounts.',
      gen: {
        easy: function () { var c = pick([12, 15, 18, 25, 40]), n = ri(2, 6);
          return { q: 'A pen costs ' + c + ' rupees. How much do ' + n + ' pens cost?', ans: c * n, unit: 'rupees',
            know: ['One pen: ' + c + ' rupees', 'Number of pens: ' + n, 'Multiply for a total'],
            hints: ['Each pen costs the same, so add ' + c + ' to itself ' + n + ' times \u2014 or just multiply.', c + ' \u00d7 ' + n + '.'],
            sol: c + ' \u00d7 ' + n + ' = ' + (c * n) + ' rupees. Equal items mean multiplication.' }; },
        medium: function () {
          var budget = pick([100, 150, 200, 250]);
          var n = ri(2, 4);
          var affordable = [12, 15, 18, 20, 24, 25, 30].filter(function (x) { return x * n <= budget * 0.85; });
          var c = affordable.length ? pick(affordable) : Math.floor(budget * 0.85 / n);
          return { q: 'You have ' + budget + ' rupees and buy ' + n + ' books at ' + c + ' rupees each. How much money is left?', ans: budget - c * n, unit: 'rupees',
            know: ['You start with: ' + budget, 'Each book: ' + c, 'Books bought: ' + n, 'Spending is subtracted'],
            hints: ['Work out the total spent first: ' + c + ' \u00d7 ' + n + '.', 'Then take that away from ' + budget + '.'],
            sol: c + ' \u00d7 ' + n + ' = ' + (c * n) + ' rupees spent, so ' + budget + ' \u2212 ' + (c * n) + ' = ' + (budget - c * n) + ' rupees left.' }; },
        hard: function () { var pct = pick([20, 25, 40]), orig = pick([400, 500, 800]), price = orig * (100 - pct) / 100;
          return { q: 'A shirt is in the sale at ' + price + ' rupees after a ' + pct + ' per cent discount. What was the original price?', ans: orig, unit: 'rupees',
            know: ['Sale price: ' + price, 'Discount: ' + pct + ' per cent', 'The sale price is the original MINUS the cut'],
            hints: ['After a ' + pct + ' per cent cut you are paying ' + (100 - pct) + ' per cent of the original.', 'So the original is ' + price + ' divided by ' + ((100 - pct) / 100) + '.'],
            sol: 'You paid ' + (100 - pct) + ' per cent of the original, so the original is ' + price + ' \u00f7 ' + ((100 - pct) / 100) + ' = ' + orig + ' rupees. Working backwards from a discount means dividing, not adding.' }; }
      } },
    { key: 'time', name: 'Time', icon: '🕰️', blurb: 'Add and subtract times.',
      gen: {
        easy: function () { var h = ri(6, 9), m = pick([10, 15, 20, 40]), add = pick([30, 45, 60, 90]);
          var t = h * 60 + m + add;
          return { q: 'A film starts at ' + h + ':' + (m < 10 ? '0' + m : m) + ' and lasts ' + Math.floor(add / 60) + ' h ' + (add % 60) + ' min. When does it end? Give a 24-hour time as a 4-digit number.', ans: Math.floor(t / 60) * 100 + (t % 60), unit: '',
            know: ['Start: ' + h + ':' + (m < 10 ? '0' + m : m), 'Length: ' + Math.floor(add / 60) + ' hours ' + (add % 60) + ' minutes', 'Add the hours, then the minutes'],
            hints: ['Add the hours first, then the minutes.', 'If the minutes pass 60, carry one hour and start again.'],
            sol: 'Start ' + h + ':' + (m < 10 ? '0' + m : m) + ' plus ' + Math.floor(add / 60) + 'h ' + (add % 60) + 'm gives ' + Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' + (t % 60) : t % 60) + '.' }; },
        medium: function () { var h1 = ri(13, 17), m1 = pick([5, 20, 35, 50]), len = pick([95, 110, 140, 155]);
          var t = h1 * 60 + m1 + len;
          return { q: 'A runner starts at ' + h1 + ':' + (m1 < 10 ? '0' + m1 : m1) + ' and runs for ' + Math.floor(len / 60) + ' h ' + (len % 60) + ' min. What time does he finish? Give a 4-digit 24-hour time.', ans: Math.floor(t / 60) * 100 + (t % 60), unit: '',
            know: ['Start: ' + h1 + ':' + (m1 < 10 ? '0' + m1 : m1), 'Duration: ' + Math.floor(len / 60) + 'h ' + (len % 60) + 'm', 'Two separate moves: hours, then minutes'],
            hints: ['Add the whole hours first.', 'Then add the minutes, carrying an hour if you pass 60.'],
            sol: Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' + (t % 60) : t % 60) + ' is the finish time.' }; },
        hard: function () { var h1 = ri(8, 11), m1 = pick([40, 45, 50]), len = pick([125, 165, 205]);
          var t = h1 * 60 + m1 + len;
          return { q: 'A journey starts at ' + h1 + ':' + (m1 < 10 ? '0' + m1 : m1) + ' and takes ' + Math.floor(len / 60) + ' hours ' + (len % 60) + ' minutes. When does it end? Give a 4-digit 24-hour time.', ans: Math.floor(t / 60) * 100 + (t % 60), unit: '',
            know: ['Start: ' + h1 + ':' + (m1 < 10 ? '0' + m1 : m1), 'Duration: ' + Math.floor(len / 60) + 'h ' + (len % 60) + 'm', 'Carry carefully when the minutes pass 60'],
            hints: ['Add the hours, then the minutes, watching for a carry.', 'If you reach 60 minutes, that is one more hour and zero minutes.'],
            sol: Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' + (t % 60) : t % 60) + ' is the end time.' }; }
      } }
  ];

  window.Gen = {
    topics: TOPICS,
    byKey: function (k) { for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].key === k) return TOPICS[i]; return null; },
    /* one fresh question on a topic at a tier */
    make: function (key, tier) {
      var t = window.Gen.byKey(key) || TOPICS[0];
      var g = t.gen[tier] || t.gen.easy;
      var q = g();
      q.topic = t.key; q.topicName = t.name; q.tier = tier;
      return q;
    },
    randomTier: function () { return pick(['easy', 'easy', 'medium', 'medium', 'hard']); }
  };
})();
