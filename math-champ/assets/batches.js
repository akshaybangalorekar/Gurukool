/* ============================================================
   MATH-CHAMP - topic batches
   The topics are added in batches of eight. This tracks how far he
   has got through the batch that is built, and lists what is coming
   next, so a parent can tell when it is time to ask for more.
   ============================================================ */
(function () {
  var BATCHES = [
    { n: 1, built: true, note: 'In the app now.',
      topics: ['frac', 'ratio', 'pct', 'prime', 'balance', 'speed', 'time', 'money'] },
    { n: 2, built: false, note: 'Ask for this batch when batch 1 is mastered.',
      topics: ['length', 'weight', 'capacity', 'roots', 'angles', 'area', 'perimeter', 'decimals'] },
    { n: 3, built: false, note: 'Ask for this batch when batch 2 is mastered.',
      topics: ['volume', 'symmetry', 'coordinates', 'mean', 'graphs', 'probability', 'substitution', 'formulas'] }
  ];
  var NAMES = { frac: 'Fractions', ratio: 'Ratio', pct: 'Percentages', prime: 'Primes and factors',
    balance: 'Balancing equations', speed: 'Average speed', time: 'Time', money: 'Money',
    length: 'Length', weight: 'Weight', capacity: 'Capacity', roots: 'Square roots',
    angles: 'Angles', area: 'Area', perimeter: 'Perimeter', decimals: 'Decimals',
    volume: 'Volume', symmetry: 'Symmetry', coordinates: 'Coordinates', mean: 'Mean and median',
    graphs: 'Reading graphs', probability: 'Probability', substitution: 'Substitution', formulas: 'Using a formula' };

  window.Batches = {
    list: BATCHES,
    nameOf: function (k) { return NAMES[k] || k; },
    /* how far through a batch: a topic counts as mastered at level 3 */
    progress: function (S, n) {
      var b = null, i;
      for (i = 0; i < BATCHES.length; i++) if (BATCHES[i].n === n) b = BATCHES[i];
      if (!b) return null;
      var out = { n: n, built: b.built, note: b.note, total: b.topics.length, mastered: 0, started: 0, rows: [] };
      b.topics.forEach(function (k) {
        var lv = (window.Levels ? Levels.of(S, k) : 0);
        var st = (window.Levels ? Levels.statsFor(S, k) : { n: 0, acc: null });
        if (lv >= 3) out.mastered++;
        if (lv >= 1) out.started++;
        out.rows.push({ key: k, name: NAMES[k] || k, level: lv, questions: st.n, acc: st.acc });
      });
      out.complete = (out.mastered === out.total);
      return out;
    },
    /* the first batch that is built but not finished, and whether it is done */
    current: function (S) {
      for (var i = 0; i < BATCHES.length; i++) {
        if (!BATCHES[i].built) continue;
        var p = window.Batches.progress(S, BATCHES[i].n);
        if (!p.complete) return p;
      }
      var last = null;
      for (var j = 0; j < BATCHES.length; j++) if (BATCHES[j].built) last = window.Batches.progress(S, BATCHES[j].n);
      return last;
    },
    nextPlanned: function () {
      for (var i = 0; i < BATCHES.length; i++) if (!BATCHES[i].built) return BATCHES[i];
      return null;
    }
  };
})();
