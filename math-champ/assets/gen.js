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

  /* four distinct values, so "the most" and "the smallest" are never a tie */
  function fourDistinct(lo, hi) {
    var out = [];
    while (out.length < 4) {
      var v = ri(lo, hi);
      if (out.indexOf(v) < 0) out.push(v);
    }
    return out;
  }

  /* a small bar chart, drawn to scale, for the reading-graphs questions */
  function barArt(names, vals) {
    var max = Math.max.apply(null, vals), w = 60, gap = 24, x = 30, out = '', i;
    for (i = 0; i < vals.length; i++) {
      var h = Math.max(6, Math.round(110 * vals[i] / max));
      out += '<rect x="' + x + '" y="' + (140 - h) + '" width="' + w + '" height="' + h + '" rx="4" fill="#2a9d8f"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (134 - h) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a" font-family="Nunito,sans-serif">' + vals[i] + '</text>' +
        '<text x="' + (x + w / 2) + '" y="158" text-anchor="middle" font-size="13" font-weight="700" fill="#475569" font-family="Nunito,sans-serif">' + names[i] + '</text>';
      x += w + gap;
    }
    return '<svg viewBox="0 0 400 175" style="width:100%;max-width:400px;display:block;margin:8px auto">' +
      '<rect width="400" height="175" fill="#f8fafc" rx="12"/>' +
      '<line x1="20" y1="140" x2="390" y2="140" stroke="#94a3b8" stroke-width="2"/>' + out + '</svg>';
  }


  /* ---------- angle pictures ----------
     Plain SVG, so a question can carry a diagram. Angles are drawn from
     the real maths: two lines crossing at a degrees really do make the
     four angles a, 180-a, a, 180-a. */
  function ptAt(cx, cy, r, deg) { var a = deg * Math.PI / 180; return { x: Math.round((cx + Math.cos(a) * r) * 10) / 10, y: Math.round((cy - Math.sin(a) * r) * 10) / 10 }; }
  function rayLine(cx, cy, deg, len) { var p = ptAt(cx, cy, len, deg), q = ptAt(cx, cy, len, deg + 180); return '<line x1="' + q.x + '" y1="' + q.y + '" x2="' + p.x + '" y2="' + p.y + '" stroke="#334155" stroke-width="3" stroke-linecap="round"/>'; }
  function wedgeAt(cx, cy, r, a1, a2, fill) { var p = ptAt(cx, cy, r, a1), q = ptAt(cx, cy, r, a2); return '<polygon points="' + cx + ',' + cy + ' ' + p.x + ',' + p.y + ' ' + q.x + ',' + q.y + '" fill="' + fill + '" opacity="0.3"/>'; }
  function labelAt(cx, cy, r, a, text, fill) { var p = ptAt(cx, cy, r, a); return '<text x="' + p.x + '" y="' + p.y + '" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="800" fill="' + (fill || '#0f172a') + '" font-family="Nunito,system-ui,sans-serif">' + text + '</text>'; }
  function pic(inner) { return '<div style="text-align:center;margin:10px 0"><svg viewBox="0 0 320 200" style="width:min(320px,92%);height:auto"><rect width="320" height="200" rx="14" fill="#f8fafc"/>' + inner + '</svg></div>'; }
  var AX = 160, AY = 100;

  /* --- with a picture --- */
  function angVertPic() {
    var a = pick([35, 40, 45, 50, 55, 60, 65, 70]);
    var art = pic(rayLine(AX, AY, 0, 130) + rayLine(AX, AY, a, 130) +
      wedgeAt(AX, AY, 46, 0, a, '#2563eb') + labelAt(AX, AY, 68, a / 2, a + '\u00b0', '#1d4ed8') +
      wedgeAt(AX, AY, 46, 180, 180 + a, '#db2777') + labelAt(AX, AY, 68, 180 + a / 2, '?', '#be185d'));
    return { q: 'Two straight lines cross. The angle marked ' + a + '\u00b0 is shown. What is the angle vertically opposite it, marked ??', ans: a, unit: '\u00b0', art: art,
      know: ['Two straight lines cross at a point', 'The angle marked ' + a + '\u00b0 is given', 'Vertically opposite angles are EQUAL'],
      hints: ['Look at the angle diagonally across from the ' + a + '\u00b0 one.', 'Vertically opposite angles are always the same size.'],
      sol: 'The angle vertically opposite is also ' + a + '\u00b0. When two lines cross, the angles facing each other across the point are equal \u2014 they are called vertically opposite angles.' };
  }
  function angStraightPic() {
    var a = pick([40, 45, 50, 55, 60, 65, 70, 75, 80, 100, 110, 120, 130, 140]);
    var art = pic(rayLine(AX, AY, 0, 130) + rayLine(AX, AY, a, 120) +
      wedgeAt(AX, AY, 44, 0, a, '#2563eb') + labelAt(AX, AY, 64, a / 2, a + '\u00b0', '#1d4ed8') +
      wedgeAt(AX, AY, 44, a, 180, '#db2777') + labelAt(AX, AY, 64, (a + 180) / 2, '?', '#be185d'));
    return { q: 'Two angles sit together on a straight line. One of them is ' + a + '\u00b0. What is the other one, marked ??', ans: 180 - a, unit: '\u00b0', art: art,
      know: ['The two angles sit on a straight line', 'One of them is ' + a + '\u00b0', 'Angles on a straight line add to 180\u00b0'],
      hints: ['A straight line is half a full turn: 180\u00b0.', '180 \u2212 ' + a + '.'],
      sol: '180 \u2212 ' + a + ' = ' + (180 - a) + '\u00b0. Angles that sit side by side on a straight line always add to 180\u00b0.' };
  }
  function angCompPic() {
    var a = pick([25, 30, 35, 40, 45, 50, 55, 60, 65]);
    var art = pic(rayLine(AX, AY, 0, 120) + rayLine(AX, AY, 90, 120) + rayLine(AX, AY, a, 108) +
      '<polygon points="' + AX + ',' + (AY - 20) + ' ' + (AX + 20) + ',' + (AY - 20) + ' ' + (AX + 20) + ',' + AY + '" fill="none" stroke="#64748b" stroke-width="2"/>' +
      wedgeAt(AX, AY, 42, 0, a, '#2563eb') + labelAt(AX, AY, 62, a / 2, a + '\u00b0', '#1d4ed8') +
      wedgeAt(AX, AY, 42, a, 90, '#db2777') + labelAt(AX, AY, 62, (a + 90) / 2, '?', '#be185d'));
    return { q: 'These two angles sit inside a right angle (the little square means 90\u00b0). One is ' + a + '\u00b0. What is the other, marked ??', ans: 90 - a, unit: '\u00b0', art: art,
      know: ['The square corner means a right angle: 90\u00b0', 'One part is ' + a + '\u00b0', 'The two parts add to 90\u00b0'],
      hints: ['The whole corner is 90\u00b0.', '90 \u2212 ' + a + '.'],
      sol: '90 \u2212 ' + a + ' = ' + (90 - a) + '\u00b0. Two angles that fit inside a right angle add to 90\u00b0 \u2014 they are called complementary.' };
  }
  function angCongruentPic() {
    var a = pick([30, 35, 40, 45, 50, 55, 60, 65, 70]);
    var art = pic(rayLine(80, 140, 0, 52) + rayLine(80, 140, a, 52) + wedgeAt(80, 140, 26, 0, a, '#2563eb') + labelAt(80, 140, 40, a / 2, a + '\u00b0', '#1d4ed8') +
      rayLine(240, 140, 0, 52) + rayLine(240, 140, a, 52) + wedgeAt(240, 140, 26, 0, a, '#db2777') + labelAt(240, 140, 40, a / 2, '?', '#be185d') +
      '<text x="160" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#475569" font-family="Nunito,system-ui,sans-serif">these two angles are congruent (equal)</text>');
    return { q: 'These two angles are congruent, which means they are equal. One is ' + a + '\u00b0. What is the other, marked ??', ans: a, unit: '\u00b0', art: art,
      know: ['The two angles are congruent \u2014 equal in size', 'One of them is ' + a + '\u00b0'],
      hints: ['Congruent means exactly the same size.', 'So the unknown one is the same as the one you can see.'],
      sol: 'The other angle is ' + a + '\u00b0 as well. Congruent angles are equal \u2014 the word is used for angles that match exactly.' };
  }
  function angPointPic() {
    var a = ri(100, 150), b = ri(90, 140), c = 360 - a - b;
    var art = pic(rayLine(AX, AY, 0, 120) + rayLine(AX, AY, a, 120) + rayLine(AX, AY, a + b, 120) +
      wedgeAt(AX, AY, 42, 0, a, '#2563eb') + labelAt(AX, AY, 62, a / 2, a + '\u00b0', '#1d4ed8') +
      wedgeAt(AX, AY, 42, a, a + b, '#0d9488') + labelAt(AX, AY, 62, a + b / 2, b + '\u00b0', '#0f766e') +
      wedgeAt(AX, AY, 42, a + b, 360, '#db2777') + labelAt(AX, AY, 62, (a + b + 360) / 2, '?', '#be185d'));
    return { q: 'Three angles meet at one point. Two of them are ' + a + '\u00b0 and ' + b + '\u00b0. What is the third, marked ??', ans: c, unit: '\u00b0', art: art,
      know: ['All three angles meet at one point', 'Two of them: ' + a + '\u00b0 and ' + b + '\u00b0', 'Angles at a point add to 360\u00b0'],
      hints: ['A full turn is 360\u00b0.', '360 \u2212 ' + a + ' \u2212 ' + b + '.'],
      sol: '360 \u2212 ' + a + ' \u2212 ' + b + ' = ' + c + '\u00b0. Angles that meet at a point and fill it completely add to 360\u00b0, a full turn.' };
  }

  /* --- the same ideas, later, with NO picture --- */
  function angVertWords() {
    var a = pick([35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
    return { q: 'Two straight lines cross. One of the four angles is ' + a + '\u00b0. What is the angle vertically opposite it, in degrees?', ans: a, unit: '\u00b0',
      know: ['Two straight lines cross', 'One angle is ' + a + '\u00b0', 'Vertically opposite angles are equal'],
      hints: ['Picture the X shape the lines make.', 'The angle across the point is the same size.'],
      sol: 'It is ' + a + '\u00b0. Across the crossing point the angles are equal \u2014 no picture needed once you can see the X in your head.' };
  }
  function angStraightWords() {
    var a = pick([35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 100, 110, 120, 130, 140, 145]);
    return { q: 'Two adjacent angles sit on a straight line. One of them is ' + a + '\u00b0. What is the other, in degrees?', ans: 180 - a, unit: '\u00b0',
      know: ['The angles are adjacent \u2014 side by side, sharing a side', 'They sit on a straight line', 'One is ' + a + '\u00b0'],
      hints: ['A straight line is 180\u00b0.', '180 \u2212 ' + a + '.'],
      sol: '180 \u2212 ' + a + ' = ' + (180 - a) + '\u00b0. Adjacent angles on a straight line are supplementary \u2014 they add to 180\u00b0.' };
  }
  function angCongruentWords() {
    var a = pick([40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]);
    return { q: 'Two congruent angles add up to ' + a + '\u00b0. How big is each one, in degrees?', ans: a / 2, unit: '\u00b0',
      know: ['The two angles are congruent \u2014 exactly equal', 'Together they add to ' + a + '\u00b0'],
      hints: ['Congruent means they are the same size.', 'Split ' + a + ' into two equal parts: ' + a + ' \u00f7 2.'],
      sol: a + ' \u00f7 2 = ' + (a / 2) + '\u00b0 each. If two equal angles make ' + a + '\u00b0 between them, halving gives each one.' };
  }
  function angTriangleEqual() {
    var a = pick([40, 50, 60, 70, 80, 100]), each = (180 - a) / 2;
    return { q: 'In a triangle, two angles are equal to each other. The third angle is ' + a + '\u00b0. How big is each of the equal angles, in degrees?', ans: each, unit: '\u00b0',
      know: ['Two angles of the triangle are equal', 'The third angle is ' + a + '\u00b0', 'Angles in a triangle add to 180\u00b0'],
      hints: ['Take the known angle off 180 first: 180 \u2212 ' + a + '.', 'Then share what is left equally between the two equal angles.'],
      sol: '180 \u2212 ' + a + ' = ' + (180 - a) + ', and half of that is ' + each + '\u00b0. Two equal angles share what is left over.' };
  }
  function angCrossEqual() {
    return { q: 'Two straight lines cross. Two of the four angles are equal AND next to each other (adjacent). How big is each of those two angles, in degrees?', ans: 90, unit: '\u00b0',
      know: ['Four angles are made by two crossing lines', 'Two ADJACENT ones are equal', 'Adjacent angles on a straight line add to 180\u00b0'],
      hints: ['Two equal angles sitting on a straight line must add to 180\u00b0.', 'If they are equal, each is half of 180\u00b0.'],
      sol: '90\u00b0 each. Adjacent angles on a straight line add to 180\u00b0, so two equal ones must be 90\u00b0 \u2014 which means the lines are at right angles.' };
  }
  function angPointWords() {
    var a = ri(100, 150), b = ri(90, 140), c = 360 - a - b;
    return { q: 'Three angles meet at a point. Two of them are ' + a + '\u00b0 and ' + b + '\u00b0. What is the third, in degrees?', ans: c, unit: '\u00b0',
      know: ['The three angles meet at one point', 'Two of them: ' + a + '\u00b0 and ' + b + '\u00b0', 'Angles at a point add to 360\u00b0'],
      hints: ['A full turn is 360\u00b0.', '360 \u2212 ' + a + ' \u2212 ' + b + '.'],
      sol: '360 \u2212 ' + a + ' \u2212 ' + b + ' = ' + c + '\u00b0. All the angles around a point add to a full turn.' };
  }

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
          return { q: 'A price of ' + n + ' is raised by ' + p + '%, then the new price is cut by ' + p + '%. What is the final price?', ans: Math.round(n * (100 + p) * (100 - p) / 10000), unit: '',
            know: ['Start: ' + n, 'Raise by ' + p + '%, then cut the NEW price by ' + p + '%', 'The two percentages act on different amounts'],
            hints: ['Do it in two steps, and use the raised price for the second step.', 'Raising then cutting by the same percentage always ends below the start.'],
            sol: 'After the rise: ' + (n * (100 + p) / 100) + '. Then cut that by ' + p + '%: ' + (Math.round(n * (100 + p) * (100 - p) / 10000)) + '. The final price is lower than the start, because the cut is taken from a bigger number.' }; }
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
    { key: 'length', name: 'Length', icon: '\ud83d\udccf', blurb: 'Metres, centimetres and kilometres.',
      gen: {
        easy: function () { var m = ri(2, 9);
          return { q: 'How many centimetres are in ' + m + ' metres?', ans: m * 100, unit: 'cm',
            know: ['1 metre = 100 centimetres', 'Number of metres: ' + m, 'Going to a SMALLER unit means multiply'],
            hints: ['Every metre holds 100 centimetres.', m + ' \u00d7 100.'],
            sol: m + ' \u00d7 100 = ' + (m * 100) + ' cm. Big unit to small unit: multiply.' }; },
        medium: function () { var km = pick([2, 3, 4, 5]) + ri(1, 9) / 10;
          return { q: 'How many metres are in ' + km + ' kilometres?', ans: km * 1000, unit: 'm',
            know: ['1 kilometre = 1000 metres', 'Distance: ' + km + ' km', 'Smaller unit means multiply'],
            hints: ['Each kilometre is 1000 metres.', km + ' \u00d7 1000.'],
            sol: km + ' \u00d7 1000 = ' + (km * 1000) + ' m.' }; },
        hard: function () { var total = ri(3, 8) + ri(1, 9) / 10, n = pick([4, 5, 8, 10]);
          var eachCm = Math.round(total * 100 / n);
          return { q: 'A rope is ' + total + ' metres long and is cut into ' + n + ' equal pieces. How long is each piece, in centimetres?', ans: eachCm, unit: 'cm',
            know: ['Total length: ' + total + ' metres', 'Pieces: ' + n, 'Divide first, then convert to centimetres'],
            hints: ['Share the rope first: ' + total + ' \u00f7 ' + n + ' metres each.', 'Then turn metres into centimetres by multiplying by 100.'],
            sol: total + ' \u00f7 ' + n + ' = ' + (Math.round(total / n * 1000) / 1000) + ' metres, which is ' + eachCm + ' cm. Divide, then convert.' }; }
      } },
    { key: 'weight', name: 'Weight', icon: '\u2696\ufe0f', blurb: 'Kilograms and grams.',
      gen: {
        easy: function () { var kg = ri(2, 8);
          return { q: 'How many grams are in ' + kg + ' kilograms?', ans: kg * 1000, unit: 'g',
            know: ['1 kilogram = 1000 grams', 'Weight: ' + kg + ' kg', 'Smaller unit means multiply'],
            hints: ['Every kilogram is 1000 grams.', kg + ' \u00d7 1000.'],
            sol: kg + ' \u00d7 1000 = ' + (kg * 1000) + ' g.' }; },
        medium: function () { var kg = pick([1, 2, 3]) + pick([250, 500, 750]) / 1000;
          return { q: 'How many grams are in ' + kg + ' kilograms?', ans: kg * 1000, unit: 'g',
            know: ['1 kilogram = 1000 grams', 'Weight: ' + kg + ' kg'],
            hints: ['Multiply by 1000.', kg + ' \u00d7 1000.'],
            sol: kg + ' \u00d7 1000 = ' + (kg * 1000) + ' g.' }; },
        hard: function () { var n = pick([3, 4, 5, 6]), g = pick([250, 500, 750]);
          return { q: n + ' parcels each weigh ' + g + ' grams. What is the total weight, in kilograms?', ans: n * g / 1000, unit: 'kg',
            know: ['Each parcel: ' + g + ' grams', 'Parcels: ' + n, 'The answer is wanted in KILOGRAMS'],
            hints: ['Total grams first: ' + g + ' \u00d7 ' + n + '.', 'Then divide by 1000 to get kilograms.'],
            sol: g + ' \u00d7 ' + n + ' = ' + (g * n) + ' grams, which is ' + (n * g / 1000) + ' kg. Read the unit the question asks for.' }; }
      } },
    { key: 'capacity', name: 'Capacity', icon: '\ud83e\udd64', blurb: 'Litres and millilitres.',
      gen: {
        easy: function () { var l = ri(2, 6);
          return { q: 'How many millilitres are in ' + l + ' litres?', ans: l * 1000, unit: 'ml',
            know: ['1 litre = 1000 millilitres', 'Amount: ' + l + ' litres'],
            hints: ['Every litre holds 1000 millilitres.', l + ' \u00d7 1000.'],
            sol: l + ' \u00d7 1000 = ' + (l * 1000) + ' ml.' }; },
        medium: function () { var l = ri(2, 6) + pick([250, 500, 750]) / 1000;
          return { q: 'How many millilitres are in ' + l + ' litres?', ans: l * 1000, unit: 'ml',
            know: ['1 litre = 1000 millilitres', 'Amount: ' + l + ' litres'],
            hints: ['Multiply by 1000.', l + ' \u00d7 1000.'],
            sol: l + ' \u00d7 1000 = ' + (l * 1000) + ' ml.' }; },
        hard: function () { var l = pick([2, 3, 4, 5]), ml = pick([200, 250, 500]);
          return { q: 'A jug holds ' + l + ' litres. How many ' + ml + ' millilitre glasses can be filled from it?', ans: l * 1000 / ml, unit: 'glasses',
            know: ['The jug holds ' + l + ' litres', 'Each glass holds ' + ml + ' millilitres', 'Both must be in the same unit first'],
            hints: ['Turn the jug into millilitres: ' + l + ' \u00d7 1000.', 'Then divide by the size of one glass.'],
            sol: l + ' litres is ' + (l * 1000) + ' ml, and ' + (l * 1000) + ' \u00f7 ' + ml + ' = ' + (l * 1000 / ml) + ' glasses. Same unit first, always.' }; }
      } },
    { key: 'roots', name: 'Square roots', icon: '\u221a', blurb: 'The number that multiplies by itself.',
      gen: {
        easy: function () { var n = ri(2, 9);
          return { q: 'What is the square root of ' + (n * n) + '?', ans: n, unit: '',
            know: ['A square root asks: what number times ITSELF gives this?', 'The number is ' + (n * n)],
            hints: ['Which number, multiplied by itself, makes ' + (n * n) + '?', 'Try ' + n + ' \u00d7 ' + n + '.'],
            sol: '\u221a' + (n * n) + ' = ' + n + ', because ' + n + ' \u00d7 ' + n + ' = ' + (n * n) + '. A square root undoes squaring.' }; },
        medium: function () { var n = ri(10, 20);
          return { q: 'What is the square root of ' + (n * n) + '?', ans: n, unit: '',
            know: ['The square is ' + (n * n), 'You want the number that times itself makes it'],
            hints: ['The answer is between 10 and 20.', n + ' \u00d7 ' + n + ' = ' + (n * n) + '.'],
            sol: '\u221a' + (n * n) + ' = ' + n + '.' }; },
        hard: function () { var n = ri(11, 25);
          return { q: 'A square field has an area of ' + (n * n) + ' square metres. How long is each side, in metres?', ans: n, unit: 'm',
            know: ['Area of a square: ' + (n * n) + ' square metres', 'Area of a square = side \u00d7 side', 'So the side is the square root of the area'],
            hints: ['Side \u00d7 side = ' + (n * n) + '. What is the side?', 'Take the square root of ' + (n * n) + '.'],
            sol: 'The side is \u221a' + (n * n) + ' = ' + n + ' m. Area questions about squares are square-root questions in disguise.' }; }
      } },
    { key: 'angles', name: 'Angles', icon: '📐', blurb: 'Degrees, and the angles where lines meet.',
      gen: {
        /* the first questions come WITH a picture; the later ones do not */
        easy: function () { return pick([angVertPic, angStraightPic, angCompPic, angCongruentPic])(); },
        medium: function () { return pick([angPointPic, angVertWords, angStraightWords, angCongruentWords])(); },
        hard: function () { return pick([angTriangleEqual, angCrossEqual, angPointWords])(); }
      } },
    { key: 'area', name: 'Area', icon: '\ud83d\udfe6', blurb: 'The space inside a shape.',
      gen: {
        easy: function () { var w = ri(3, 12), h = ri(2, 10);
          return { q: 'A rectangle is ' + w + ' cm by ' + h + ' cm. What is its area, in square centimetres?', ans: w * h, unit: 'cm\u00b2',
            know: ['Width: ' + w + ' cm', 'Height: ' + h + ' cm', 'Area of a rectangle = width \u00d7 height'],
            hints: ['Area of a rectangle is length times width.', w + ' \u00d7 ' + h + '.'],
            sol: w + ' \u00d7 ' + h + ' = ' + (w * h) + ' cm\u00b2. Area is measured in SQUARE units.' }; },
        medium: function () { var b = ri(6, 20), h = ri(4, 14);
          return { q: 'A triangle has a base of ' + b + ' cm and a height of ' + h + ' cm. What is its area, in square centimetres?', ans: b * h / 2, unit: 'cm\u00b2',
            know: ['Base: ' + b + ' cm', 'Height: ' + h + ' cm', 'A triangle is HALF of the rectangle around it'],
            hints: ['Work out the rectangle first: ' + b + ' \u00d7 ' + h + '.', 'Then halve it.'],
            sol: b + ' \u00d7 ' + h + ' = ' + (b * h) + ', and half of that is ' + (b * h / 2) + ' cm\u00b2. A triangle is always half the surrounding rectangle.' }; },
        hard: function () { var r = pick([3, 4, 5, 6, 7, 10]);
          return { q: 'A circle has a radius of ' + r + ' cm. Using 3.14 for \u03c0, what is its area, to one decimal place?', ans: Math.round(3.14 * r * r * 10) / 10, unit: 'cm\u00b2',
            know: ['Radius: ' + r + ' cm', 'Area of a circle = \u03c0 \u00d7 radius \u00d7 radius', 'Use 3.14 for \u03c0'],
            hints: ['Square the radius first: ' + r + ' \u00d7 ' + r + '.', 'Then multiply by 3.14.'],
            sol: '3.14 \u00d7 ' + (r * r) + ' = ' + (Math.round(3.14 * r * r * 10) / 10) + ' cm\u00b2. The radius is squared \u2014 which is why a small change in radius makes a big change in area.' }; }
      } },
    { key: 'perimeter', name: 'Perimeter', icon: '\ud83d\udd32', blurb: 'The distance all the way round.',
      gen: {
        easy: function () { var w = ri(3, 12), h = ri(2, 10);
          return { q: 'A rectangle is ' + w + ' cm by ' + h + ' cm. What is its perimeter, in centimetres?', ans: 2 * (w + h), unit: 'cm',
            know: ['Width: ' + w + ' cm', 'Height: ' + h + ' cm', 'Perimeter = all four sides added'],
            hints: ['There are two of each side.', '2 \u00d7 (' + w + ' + ' + h + ').'],
            sol: '2 \u00d7 (' + w + ' + ' + h + ') = ' + (2 * (w + h)) + ' cm. Perimeter is a distance, so it is in plain units.' }; },
        medium: function () { var n = ri(4, 12);
          return { q: 'A square has an area of ' + (n * n) + ' square centimetres. What is its perimeter, in centimetres?', ans: 4 * n, unit: 'cm',
            know: ['Area: ' + (n * n) + ' cm\u00b2', 'Area of a square = side \u00d7 side, so find the side first', 'Perimeter = 4 \u00d7 side'],
            hints: ['What number times itself gives ' + (n * n) + '?', 'Then multiply the side by 4.'],
            sol: 'The side is \u221a' + (n * n) + ' = ' + n + ' cm, so the perimeter is 4 \u00d7 ' + n + ' = ' + (4 * n) + ' cm. Area first, then perimeter.' }; },
        hard: function () { var w = ri(5, 15), h = ri(4, 12);
          return { q: 'A rectangle is ' + w + ' cm long and its perimeter is ' + (2 * (w + h)) + ' cm. How wide is it, in centimetres?', ans: h, unit: 'cm',
            know: ['Length: ' + w + ' cm', 'Perimeter: ' + (2 * (w + h)) + ' cm', 'Perimeter = 2 \u00d7 (length + width)'],
            hints: ['Half the perimeter is length + width: ' + (2 * (w + h)) + ' \u00f7 2.', 'Then take the length away.'],
            sol: 'Half of ' + (2 * (w + h)) + ' is ' + (w + h) + ', and ' + (w + h) + ' \u2212 ' + w + ' = ' + h + ' cm. Halving first turns the perimeter back into one length plus one width.' }; }
      } },
    { key: 'decimals', name: 'Decimals', icon: '\ud83d\udd22', blurb: 'Tenths and hundredths, and moving the point.',
      gen: {
        easy: function () { var a = ri(2, 9) / 10, b = ri(2, 9) / 10;
          return { q: a.toFixed(1) + ' + ' + b.toFixed(1) + ' = ?', ans: Math.round((a + b) * 10) / 10, unit: '',
            know: ['Both numbers are tenths', 'Line up the decimal points'],
            hints: ['Add them as if the point was not there, then put it back.', 'Count the tenths: ' + Math.round(a * 10) + ' + ' + Math.round(b * 10) + '.'],
            sol: a.toFixed(1) + ' + ' + b.toFixed(1) + ' = ' + (Math.round((a + b) * 10) / 10) + '. Line up the points and the arithmetic is ordinary.' }; },
        medium: function () { var a = pick([1.5, 2.5, 3.5, 4.5]), n = ri(2, 6);
          return { q: a + ' \u00d7 ' + n + ' = ?', ans: Math.round(a * n * 100) / 100, unit: '',
            know: ['A decimal times a whole number', 'Multiply as normal, then place the point'],
            hints: ['Ignore the point: ' + Math.round(a * 10) + ' \u00d7 ' + n + '.', 'Then divide by 10 to put the point back.'],
            sol: a + ' \u00d7 ' + n + ' = ' + (Math.round(a * n * 100) / 100) + '.' }; },
        hard: function () { var n = pick([2, 4, 8, 5]), a = pick([0.25, 0.5, 1.25]);
          return { q: a + ' \u00d7 ' + n + ' = ?', ans: Math.round(a * n * 1000) / 1000, unit: '',
            know: ['A decimal times a whole number', 'The answer may come out as a whole number'],
            hints: ['Multiply without the point, then count the decimal places.', a + ' \u00d7 ' + n + '.'],
            sol: a + ' \u00d7 ' + n + ' = ' + (Math.round(a * n * 1000) / 1000) + '. Multiplying by 4 or 8 can clear a quarter or an eighth into a whole number.' }; }
      } },
    { key: 'volume', name: 'Volume', icon: '\ud83d\udce6', blurb: 'The space inside a box, in cubic units.',
      gen: {
        easy: function () { var a = ri(2, 6), b = ri(2, 6), c = ri(2, 6);
          return { q: 'A box is ' + a + ' cm by ' + b + ' cm by ' + c + ' cm. What is its volume, in cubic centimetres?', ans: a * b * c, unit: 'cm\u00b3',
            know: ['Length ' + a + ', width ' + b + ', height ' + c, 'Volume of a box = length \u00d7 width \u00d7 height'],
            hints: ['Multiply the three numbers together.', a + ' \u00d7 ' + b + ' = ' + (a * b) + ', then multiply by ' + c + '.'],
            sol: a + ' \u00d7 ' + b + ' \u00d7 ' + c + ' = ' + (a * b * c) + ' cm\u00b3. Volume is always in CUBIC units.' }; },
        medium: function () { var n = ri(2, 9);
          return { q: 'A cube has sides of ' + n + ' cm. What is its volume, in cubic centimetres?', ans: n * n * n, unit: 'cm\u00b3',
            know: ['A cube has all sides equal: ' + n + ' cm', 'Volume = side \u00d7 side \u00d7 side'],
            hints: ['Cube the side length.', n + ' \u00d7 ' + n + ' = ' + (n * n) + ', then \u00d7 ' + n + '.'],
            sol: n + '\u00b3 = ' + (n * n * n) + ' cm\u00b3.' }; },
        hard: function () { var a = ri(1, 3), b = ri(1, 2), c = pick([0.5, 1, 2]);
          return { q: 'A water tank is ' + a + ' m by ' + b + ' m by ' + c + ' m. How many litres does it hold? (1 cubic metre = 1000 litres.)', ans: a * b * c * 1000, unit: 'litres',
            know: ['Tank: ' + a + ' m \u00d7 ' + b + ' m \u00d7 ' + c + ' m', '1 cubic metre = 1000 litres', 'Volume first, then convert'],
            hints: ['Find the volume in cubic metres first.', 'Then multiply by 1000 for litres.'],
            sol: a + ' \u00d7 ' + b + ' \u00d7 ' + c + ' = ' + (a * b * c) + ' cubic metres, which is ' + (a * b * c * 1000) + ' litres.' }; }
      } },
    { key: 'symmetry', name: 'Symmetry', icon: '\ud83e\udd8b', blurb: 'Lines of symmetry and turning symmetry.',
      gen: {
        easy: function () { var sh = pick([['square', 4], ['rectangle', 2], ['equilateral triangle', 3], ['circle', 999]]);
          return { q: 'How many lines of symmetry does a ' + sh[0] + ' have?' + (sh[1] === 999 ? ' (A circle has infinitely many - type 999.)' : ''), ans: sh[1], unit: 'lines',
            know: ['A line of symmetry folds the shape exactly in half', 'The shape is a ' + sh[0]],
            hints: ['Fold it in your head. How many different folds land exactly on themselves?', 'Try vertical, horizontal and diagonal folds.'],
            sol: 'A ' + sh[0] + ' has ' + (sh[1] === 999 ? 'infinitely many lines of symmetry \u2014 which is why we write 999 for it' : sh[1] + ' lines of symmetry') + '.' }; },
        medium: function () { var sh = pick([['regular pentagon', 5], ['regular hexagon', 6], ['regular octagon', 8]]);
          return { q: 'How many lines of symmetry does a ' + sh[0] + ' have?', ans: sh[1], unit: 'lines',
            know: ['A REGULAR shape has all sides and angles equal', 'The shape is a ' + sh[0]],
            hints: ['For a regular shape, the number of lines of symmetry equals the number of sides.', 'Count the sides.'],
            sol: 'A ' + sh[0] + ' has ' + sh[1] + ' sides, so it has ' + sh[1] + ' lines of symmetry. That rule works for every regular shape.' }; },
        hard: function () { var sh = pick([['square', 4], ['equilateral triangle', 3], ['regular hexagon', 6]]);
          return { q: 'A ' + sh[0] + ' is turned about its centre. After how many equal turns does it look exactly the same as it started? (That is its order of rotational symmetry.)', ans: sh[1], unit: 'turns',
            know: ['Rotational symmetry: how many times it fits itself in one full turn', 'The shape is a ' + sh[0]],
            hints: ['For a regular shape this number is the same as its number of sides.', 'A full turn is 360 degrees.'],
            sol: 'A ' + sh[0] + ' fits itself ' + sh[1] + ' times in a full turn, so its rotational order is ' + sh[1] + '.' }; }
      } },
    { key: 'coordinates', name: 'Coordinates', icon: '\ud83d\uddfa\ufe0f', blurb: 'Reading and working with (x, y) positions.',
      gen: {
        easy: function () { var x = ri(1, 9), y = ri(1, 9);
          return { q: 'A point is at (' + x + ', ' + y + '). What is its x-coordinate?', ans: x, unit: '',
            know: ['A coordinate is written (x, y)', 'The point is (' + x + ', ' + y + ')'],
            hints: ['The x-coordinate is the FIRST number.', 'Across first, then up.'],
            sol: 'The x-coordinate is ' + x + '. The x value is always the first number in the pair.' }; },
        medium: function () { var x1 = ri(1, 6) * 2, y1 = ri(1, 6) * 2, x2 = x1 + ri(1, 4) * 2, y2 = y1 + ri(1, 4) * 2;
          return { q: 'What is the x-coordinate of the midpoint of (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ')?', ans: (x1 + x2) / 2, unit: '',
            know: ['The two points: (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ')', 'A midpoint is exactly halfway in BOTH directions', 'The x-coordinate of the midpoint is the average of the two x values'],
            hints: ['Add the two x values: ' + (x1 + x2) + '.', 'Then halve it.'],
            sol: '(' + x1 + ' + ' + x2 + ') \u00f7 2 = ' + ((x1 + x2) / 2) + '. A midpoint is the average of the coordinates.' }; },
        hard: function () { var x = ri(1, 8), y1 = ri(1, 5), y2 = y1 + ri(3, 9);
          return { q: 'How far apart are the points (' + x + ', ' + y1 + ') and (' + x + ', ' + y2 + '), in units?', ans: y2 - y1, unit: 'units',
            know: ['Both points have the same x-coordinate: ' + x, 'So the distance is straight up the page', 'Subtract the smaller y from the larger'],
            hints: ['Same x means the line is vertical.', 'Just subtract: ' + y2 + ' \u2212 ' + y1 + '.'],
            sol: y2 + ' \u2212 ' + y1 + ' = ' + (y2 - y1) + ' units. When one coordinate matches, the distance is a simple subtraction.' }; }
      } },
    { key: 'mean', name: 'Mean and median', icon: '\ud83d\udcca', blurb: 'Averages: the mean and the middle value.',
      gen: {
        easy: function () {
          var m = ri(6, 20), a = m - 3, b = m - 1, c = m + 1, d = m + 3;
          return { q: 'What is the mean of ' + a + ', ' + b + ', ' + c + ' and ' + d + '?', ans: m, unit: '',
            know: ['The four numbers: ' + a + ', ' + b + ', ' + c + ', ' + d, 'Mean = total \u00f7 how many numbers'],
            hints: ['Add them all: ' + (a + b + c + d) + '.', 'Then divide by 4, because there are four numbers.'],
            sol: '(' + a + ' + ' + b + ' + ' + c + ' + ' + d + ') \u00f7 4 = ' + ((a + b + c + d) / 4) + '. The mean shares the total out equally.' }; },
        medium: function () { var arr = [ri(1, 20), ri(21, 40), ri(41, 60), ri(61, 80), ri(81, 100)];
          arr.sort(function (x, y) { return x - y; });
          return { q: 'What is the MEDIAN of ' + arr.join(', ') + '?', ans: arr[2], unit: '',
            know: ['The numbers in order: ' + arr.join(', '), 'The median is the MIDDLE one when they are in order', 'There are 5 numbers, so the middle is the 3rd'],
            hints: ['Put them in order first (they already are).', 'Count in from both ends at once.'],
            sol: 'With five numbers in order, the median is the third: ' + arr[2] + '. The median is the middle, not the average.' }; },
        hard: function () { var mean = ri(8, 20), four = [mean - 2, mean - 1, mean + 1, mean + 2];
          var fifth = 5 * mean - four.reduce(function (a, b) { return a + b; }, 0);
          return { q: 'Five numbers have a mean of ' + mean + '. Four of them are ' + four.join(', ') + '. What is the fifth number?', ans: fifth, unit: '',
            know: ['Mean of 5 numbers: ' + mean, 'So the total of all five is 5 \u00d7 ' + mean + ' = ' + (5 * mean), 'Four of them add to ' + four.reduce(function (a, b) { return a + b; }, 0)],
            hints: ['Find the total first: 5 \u00d7 ' + mean + '.', 'Then take away the four you know.'],
            sol: 'The five numbers add to ' + (5 * mean) + ', and the four known ones add to ' + four.reduce(function (a, b) { return a + b; }, 0) + ', so the fifth is ' + fifth + '. Working backwards from a mean is a total question.' }; }
      } },
    { key: 'graphs', name: 'Reading graphs', icon: '\ud83d\udcc8', blurb: 'Reading values off a chart, with the chart drawn.',
      gen: {
        easy: function () { var v = fourDistinct(6, 20), names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
          var mx = v.indexOf(Math.max.apply(null, v));
          return { q: 'The chart shows books read: ' + names.map(function (n, i) { return n + ' ' + v[i]; }).join(', ') + '. On which day were the MOST read? Type the day.', ans: names[mx], unit: '',
            art: barArt(names, v),
            know: ['The four values: ' + v.join(', '), 'The tallest bar is the largest value'],
            hints: ['Find the biggest number.', 'It is ' + v[mx] + '.'],
            sol: 'The tallest bar is ' + names[mx] + ' with ' + v[mx] + '. Always read the axis labels, not just the bar heights.' }; },
        medium: function () { var v = fourDistinct(4, 15), names = ['Mon', 'Tue', 'Wed', 'Thu'];
          return { q: 'The chart shows ' + names.map(function (n, i) { return n + ' ' + v[i]; }).join(', ') + '. How many altogether?', ans: v.reduce(function (a, b) { return a + b; }, 0), unit: '',
            art: barArt(names, v),
            know: ['The four values: ' + v.join(', '), 'Altogether means add them'],
            hints: ['Add all four bars.', v.join(' + ') + '.'],
            sol: v.join(' + ') + ' = ' + v.reduce(function (a, b) { return a + b; }, 0) + '. A total is a sum of the bars.' }; },
        hard: function () { var v = fourDistinct(4, 12), names = ['Mon', 'Tue', 'Wed', 'Thu'];
          var tot = v.reduce(function (a, b) { return a + b; }, 0), mn = v.indexOf(Math.min.apply(null, v));
          return { q: 'The chart shows ' + names.map(function (n, i) { return n + ' ' + v[i]; }).join(', ') + '. The smallest bar is ' + v[mn] + ' out of ' + tot + ' altogether. What fraction is that? Give it like 3/20.', ans: frac(v[mn], tot), unit: '',
            art: barArt(names, v),
            know: ['The smallest value: ' + v[mn], 'The total: ' + tot, 'A fraction of the total is part \u00f7 total'],
            hints: ['Write it as ' + v[mn] + '/' + tot + '.', 'Then simplify by dividing both by their highest common factor.'],
            sol: v[mn] + '/' + tot + ' simplifies to ' + frac(v[mn], tot) + '. Reading a graph and then doing a fraction with it is exactly what exam questions do.' }; }
      } },
    { key: 'probability', name: 'Probability', icon: '\ud83c\udfb2', blurb: 'How likely something is, as a fraction.',
      gen: {
        easy: function () { var c = pick([['a fair coin', 'heads', 1, 2], ['a fair die', 'an even number', 3, 6], ['a fair die', 'a 6', 1, 6]]);
          return { q: 'What is the probability of getting ' + c[1] + ' with ' + c[0] + '? Give the fraction like 1/2.', ans: frac(c[2], c[3]), unit: '',
            know: ['Probability = favourable outcomes \u00f7 total outcomes', 'Favourable: ' + c[2], 'Total: ' + c[3]],
            hints: ['Write it as ' + c[2] + '/' + c[3] + '.', 'Then simplify.'],
            sol: c[2] + '/' + c[3] + ' = ' + frac(c[2], c[3]) + '. Probability is always a fraction between 0 and 1.' }; },
        medium: function () { var r = ri(2, 6), b = ri(2, 8);
          return { q: 'A bag has ' + r + ' red and ' + b + ' blue counters. What is the probability of pulling out a red one? Give the fraction like 3/8.', ans: frac(r, r + b), unit: '',
            know: ['Red: ' + r, 'Blue: ' + b, 'Total counters: ' + (r + b)],
            hints: ['Add the counters first: ' + r + ' + ' + b + ' = ' + (r + b) + '.', 'Then red over total.'],
            sol: r + '/' + (r + b) + ' = ' + frac(r, r + b) + '. Always count the TOTAL for the bottom of the fraction.' }; },
        hard: function () { var n = pick([6, 8, 10, 12]), evens = Math.floor(n / 2);
          return { q: 'A fair spinner has ' + n + ' equal sections numbered 1 to ' + n + '. What is the probability of landing on a MULTIPLE of 3? Give the fraction like 1/3.', ans: frac(Math.floor(n / 3), n), unit: '',
            know: ['Sections: 1 to ' + n, 'Multiples of 3 up to ' + n + ': ' + Math.floor(n / 3), 'Probability = how many you want \u00f7 how many there are'],
            hints: ['Count the multiples of 3 from 1 to ' + n + '.', 'That is ' + Math.floor(n / 3) + ' of the ' + n + ' sections.'],
            sol: Math.floor(n / 3) + '/' + n + ' = ' + frac(Math.floor(n / 3), n) + '. Listing the outcomes that count is the whole method.' }; }
      } },
    { key: 'substitution', name: 'Substitution', icon: '\ud83d\udd24', blurb: 'Putting numbers into letters.',
      gen: {
        easy: function () { var a = ri(2, 9), b = ri(2, 15);
          return { q: 'If a = ' + a + ', what is a + ' + b + '?', ans: a + b, unit: '',
            know: ['a stands for ' + a, 'The expression is a + ' + b],
            hints: ['Replace the letter a with ' + a + '.', a + ' + ' + b + '.'],
            sol: 'a + ' + b + ' becomes ' + a + ' + ' + b + ' = ' + (a + b) + '. A letter is just a box holding a number.' }; },
        medium: function () { var x = ri(2, 9), m = ri(2, 6), c = ri(1, 12);
          return { q: 'If x = ' + x + ', what is ' + m + 'x \u2212 ' + c + '?', ans: m * x - c, unit: '',
            know: ['x stands for ' + x, 'The expression is ' + m + 'x \u2212 ' + c, m + 'x means ' + m + ' \u00d7 x'],
            hints: ['Work out ' + m + 'x first: ' + m + ' \u00d7 ' + x + '.', 'Then take away ' + c + '.'],
            sol: m + 'x = ' + (m * x) + ', and ' + (m * x) + ' \u2212 ' + c + ' = ' + (m * x - c) + '. A number next to a letter means multiply.' }; },
        hard: function () { var x = ri(2, 6), y = ri(2, 6), a = ri(2, 4), b = ri(2, 4);
          return { q: 'If x = ' + x + ' and y = ' + y + ', what is ' + a + 'x + ' + b + 'y?', ans: a * x + b * y, unit: '',
            know: ['x = ' + x + ', y = ' + y, 'The expression is ' + a + 'x + ' + b + 'y', 'Each letter is replaced by its own number'],
            hints: ['Work out ' + a + 'x: ' + a + ' \u00d7 ' + x + '.', 'Work out ' + b + 'y: ' + b + ' \u00d7 ' + y + ', then add.'],
            sol: a + 'x = ' + (a * x) + ' and ' + b + 'y = ' + (b * y) + ', so the total is ' + (a * x + b * y) + '.' }; }
      } },
    { key: 'formulas', name: 'Using a formula', icon: '\ud83d\udcd0', blurb: 'Using a rule with letters in it.',
      gen: {
        easy: function () { var l = ri(3, 12), w = ri(2, 10);
          return { q: 'Using P = 2(l + w), what is P when l = ' + l + ' and w = ' + w + '?', ans: 2 * (l + w), unit: '',
            know: ['The formula: P = 2(l + w)', 'l = ' + l + ', w = ' + w],
            hints: ['Add l and w first: ' + l + ' + ' + w + '.', 'Then double it.'],
            sol: 'P = 2(' + l + ' + ' + w + ') = 2 \u00d7 ' + (l + w) + ' = ' + (2 * (l + w)) + '. The bracket is done first.' }; },
        medium: function () { var b = ri(4, 16), h = ri(3, 12);
          return { q: 'Using A = (b \u00d7 h) \u00f7 2, what is A when b = ' + b + ' and h = ' + h + '?', ans: b * h / 2, unit: '',
            know: ['The formula: A = (b \u00d7 h) \u00f7 2', 'b = ' + b + ', h = ' + h],
            hints: ['Multiply first: ' + b + ' \u00d7 ' + h + '.', 'Then halve it.'],
            sol: 'A = (' + b + ' \u00d7 ' + h + ') \u00f7 2 = ' + (b * h) + ' \u00f7 2 = ' + (b * h / 2) + '.' }; },
        hard: function () { var d = ri(60, 400), t = pick([2, 3, 4, 5]);
          return { q: 'Using v = d \u00f7 t, what is v when d = ' + d + ' and t = ' + t + '?', ans: d / t, unit: '',
            know: ['The formula: v = d \u00f7 t', 'd = ' + d + ', t = ' + t],
            hints: ['Divide the distance by the time.', d + ' \u00f7 ' + t + '.'],
            sol: 'v = ' + d + ' \u00f7 ' + t + ' = ' + (d / t) + '. A formula is just a recipe - put the numbers in the right slots.' }; }
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
