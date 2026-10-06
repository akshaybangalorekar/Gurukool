/* ============================================================
   MIND-CHAMP - checking an answer the way a child means it.

   A child who types "chicken" has answered "a chicken" correctly.
   Marking that wrong is the fastest way to lose his trust in the app,
   so the check is generous about HOW an answer is written and strict
   about WHAT it says.

   Used by the reasoning ladder and by today's match, so both agree.
   ============================================================ */
(function () {
  function norm(v) { return String(v == null ? '' : v).trim().toLowerCase().replace(/\s+/g, ' '); }

  /* drop a leading article and any punctuation */
  function core(v) {
    return norm(v)
      .replace(/^(a|an|the)\s+/, '')
      .replace(/[^a-z0-9. ]/g, '')
      .replace(/\s+/g, ' ');
  }

  function matches(give, want) {
    /* a question may fairly have more than one defensible answer */
    if (Array.isArray(want)) {
      for (var i = 0; i < want.length; i++) if (matches(give, want[i])) return true;
      return false;
    }
    var a = norm(give), b = norm(want);
    if (!a) return false;
    if (a === b) return true;
    var ca = core(a), cb = core(b);
    if (ca === cb) return true;                                   /* "chicken" == "a chicken" */
    /* numbers, however they are written */
    var an = parseFloat(a.replace(/[^0-9.\-]/g, '')), bn = parseFloat(b.replace(/[^0-9.\-]/g, ''));
    if (!isNaN(an) && !isNaN(bn) && Math.abs(an - bn) < 1e-9) return true;
    /* a plural or a singular is the same answer */
    if (ca.replace(/s$/, '') === cb.replace(/s$/, '')) return true;
    /* a sensible stem, so "cutting" accepts "cut" and the other way round */
    var sa = ca.replace(/[^a-z0-9]/g, ''), sb = cb.replace(/[^a-z0-9]/g, '');
    if (sa === sb) return true;
    var n = Math.min(4, sa.length, sb.length);
    if (n >= 3 && sa.slice(0, n) === sb.slice(0, n)) return true;
    return false;
  }

  window.AnswerCheck = { norm: norm, core: core, matches: matches };
})();
