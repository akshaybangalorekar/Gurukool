/* ============================================================
   MATH-CHAMP - topic levels
   A topic has a level that rises as the child gets better at it, so
   "practise" never needs to be a separate choice: the same topic just
   gets harder. The parent dashboard shows the level and how fast it
   was reached.
     0  not started
     1  getting it      (just beginning, or under 60 per cent)
     2  solid           (60 to 79 per cent, with some practice)
     3  mastered        (80 per cent or more, over at least 6 questions)
   ============================================================ */
(function () {
  function statsFor(S, key) {
    var n = 0, right = 0;
    (S.attempts || []).forEach(function (a) {
      var t = a.topic || (a.id && String(a.id).indexOf('teach:') === 0 ? String(a.id).slice(6) : null) ||
              (a.id && String(a.id).indexOf('daily:') === 0 ? String(a.id).slice(6) : null) ||
              (a.id && String(a.id).indexOf('sess:') === 0 ? String(a.id).slice(5) : null);
      if (t !== key) return;
      n++; if (a.correct) right++;
    });
    return { n: n, right: right, acc: n ? Math.round(100 * right / n) : null };
  }
  window.Levels = {
    statsFor: statsFor,
    of: function (S, key) {
      var st = statsFor(S, key);
      var sk = (S.skills || {})[key];
      var score = (typeof sk === 'number') ? sk : st.acc;
      if (!st.n && score === null) return 0;
      if (st.n < 4) return 1;
      if (score === null) return 1;
      if (score >= 80 && st.n >= 6) return 3;
      if (score >= 60) return 2;
      return 1;
    },
    label: function (lv) { return ['Not started', 'Getting it', 'Solid', 'Mastered'][lv] || 'Not started'; },
    /* the practice tiers that suit a level: the questions rise with him */
    tiers: function (lv) {
      if (lv >= 3) return ['medium', 'hard', 'hard', 'medium', 'hard', 'medium'];
      if (lv === 2) return ['easy', 'medium', 'medium', 'hard', 'medium', 'easy'];
      return ['easy', 'easy', 'easy', 'medium', 'easy', 'medium'];
    }
  };
})();
