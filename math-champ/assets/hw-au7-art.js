/* ============================================================
   DIAGRAMS for the AU Grade 7 geometry kinds
   Drawn from the real geometry, not sketched: every arc is placed at the
   angle the question actually states, so a 65 degree angle looks like 65
   degrees and a pair of co-interior angles really is supplementary.

   All sizes are in a 320 x 200 viewBox. Angles are measured in degrees from
   the positive x axis, and y grows downwards as it does in SVG.
   ============================================================ */
(function () {
  var W = 320, H = 200;
  function rad(d) { return d * Math.PI / 180; }
  function pt(cx, cy, r, deg) { return [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]; }
  function f(n) { return Math.round(n * 10) / 10; }
  function line(x1, y1, x2, y2, colour, dash) {
    return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) +
      '" stroke="' + (colour || '#334155') + '" stroke-width="2"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  /* an arc between two directions, drawn the short way round */
  function arc(cx, cy, r, from, to, colour, label) {
    var a1 = from, a2 = to;
    while (a2 - a1 > 180) a2 -= 360;
    while (a2 - a1 < -180) a2 += 360;
    var p1 = pt(cx, cy, r, a1), p2 = pt(cx, cy, r, a2);
    var large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    var sweep = a2 > a1 ? 1 : 0;
    var d = 'M ' + f(p1[0]) + ' ' + f(p1[1]) + ' A ' + r + ' ' + r + ' 0 ' + large + ' ' + sweep + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    var mid = (a1 + a2) / 2, lp = pt(cx, cy, r + 16, mid);
    return '<path d="' + d + '" fill="none" stroke="' + (colour || '#0ea5e9') + '" stroke-width="2.5"/>' +
      (label ? '<text x="' + f(lp[0]) + '" y="' + f(lp[1]) + '" font-size="13" font-weight="700" fill="' +
        (colour || '#0ea5e9') + '" text-anchor="middle" dominant-baseline="middle">' + label + '</text>' : '');
  }
  function dot(x, y, label, dx, dy) {
    return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="3" fill="#0f172a"/>' +
      (label ? '<text x="' + f(x + (dx || 0)) + '" y="' + f(y + (dy || -8)) + '" font-size="13" font-weight="700" fill="#0f172a" text-anchor="middle">' + label + '</text>' : '');
  }
  function wrap(inner) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:340px;display:block;margin:10px auto" ' +
      'xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }
  var DEG = '\u00B0';

  /* ---- one angle on its own, for "classify this angle" ---- */
  function oneAngle(size) {
    var cx = 60, cy = 160, r = 110;
    var s = wrap(
      line(cx, cy, cx + r, cy) +
      line(cx, cy, cx + r * Math.cos(rad(-size)), cy + r * Math.sin(rad(-size))) +
      arc(cx, cy, 46, 0, -size, '#0ea5e9', size + DEG) +
      dot(cx, cy)
    );
    return s;
  }

  /* ---- two angles adding to 90 (complementary) ---- */
  function complementary(a) {
    var cx = 60, cy = 160, r = 105;
    return wrap(
      line(cx, cy, cx + r, cy) +
      line(cx, cy, cx, cy - r) +
      line(cx, cy, cx + r * Math.cos(rad(-a)), cy + r * Math.sin(rad(-a))) +
      arc(cx, cy, 40, 0, -a, '#0ea5e9', a + DEG) +
      arc(cx, cy, 62, -a, -90, '#f59e0b', (90 - a) + DEG) +
      '<rect x="' + cx + '" y="' + (cy - 12) + '" width="12" height="12" fill="none" stroke="#334155" stroke-width="1.6"/>' +
      dot(cx, cy)
    );
  }

  /* ---- two angles on a straight line (supplementary) ---- */
  function onStraightLine(a, showBoth) {
    var cx = 60, cy = 140, r = 220;
    var b = 180 - a;
    return wrap(
      line(cx, cy, cx + 240, cy) +
      line(cx, cy, cx + r * Math.cos(rad(-a)), cy + r * Math.sin(rad(-a))) +
      arc(cx, cy, 44, 0, -a, '#0ea5e9', a + DEG) +
      (showBoth ? arc(cx, cy, 68, -a, -180, '#f59e0b', b + DEG) : '') +
      dot(cx, cy)
    );
  }

  /* ---- two lines crossing (vertically opposite) ----
     One line is horizontal; the other leans by the stated angle, so the four
     angles really are a, 180-a, a and 180-a. */
  function crossing(a, mark) {
    var cx = 160, cy = 100, r = 132;
    var inner = line(cx - r, cy, cx + r, cy) +
      line(cx - r * Math.cos(rad(-a)), cy - r * Math.sin(rad(-a)),
           cx + r * Math.cos(rad(-a)), cy + r * Math.sin(rad(-a)));
    if (mark === 'pair') {
      inner += arc(cx, cy, 42, 0, -a, '#0ea5e9', a + DEG);
      inner += arc(cx, cy, 42, 180, 180 - a, '#0ea5e9', a + DEG);
    } else {
      inner += arc(cx, cy, 42, 0, -a, '#0ea5e9', a + DEG);
    }
    return wrap(inner + dot(cx, cy));
  }

  /* ---- rays meeting at a point ---- */
  function atPoint(list, answer) {
    var cx = 160, cy = 120, r = 120, inner = '';
    var a = 0;
    list.forEach(function (v, i) {
      inner += line(cx, cy, cx + r * Math.cos(rad(-a)), cy + r * Math.sin(rad(-a)));
      inner += arc(cx, cy, 34 + i * 12, -a, -(a + v), '#0ea5e9', v + DEG);
      a += v;
    });
    inner += arc(cx, cy, 34 + list.length * 12, -a, -360, '#f59e0b', (answer || (360 - a)) + DEG);
    inner += dot(cx, cy);
    return wrap(inner);
  }

  /* ---- a ray inside a right angle ---- */
  function insideRight(a) {
    var cx = 60, cy = 160, r = 110;
    return wrap(
      line(cx, cy, cx + r, cy) +
      line(cx, cy, cx, cy - r) +
      line(cx, cy, cx + r * Math.cos(rad(-a)), cy + r * Math.sin(rad(-a))) +
      '<rect x="' + cx + '" y="' + (cy - 12) + '" width="12" height="12" fill="none" stroke="#334155" stroke-width="1.6"/>' +
      arc(cx, cy, 40, 0, -a, '#0ea5e9', a + DEG) +
      arc(cx, cy, 64, -a, -90, '#f59e0b', (90 - a) + DEG) +
      dot(cx, cy)
    );
  }

  /* ---- two parallel lines cut by a transversal ----
     which: 'corresponding' | 'alternate' | 'cointerior'
     The transversal is drawn at the stated angle, and the arcs are placed on
     the exact pair the question is about: corresponding angles come out equal,
     alternate interior angles come out equal, and co-interior angles come out
     supplementary - because they are drawn from the same angle. */
  function parallelCut(a, which) {
    var y1 = 58, y2 = 148, midX = 160;
    /* the transversal leans at exactly the stated angle - an obtuse question
       must LOOK obtuse, or the diagram teaches the wrong thing */
    var th = Math.max(20, Math.min(160, a));
    var half = (y2 - y1) / 2;
    var dx = half / Math.tan(rad(th));
    var up = [midX - dx, y1], dn = [midX + dx, y2];
    var dir = Math.atan2(dn[1] - up[1], dn[0] - up[0]) * 180 / Math.PI;   /* down-right, in SVG degrees */
    var inner = line(20, y1, 300, y1) + line(20, y2, 300, y2) +
      line(up[0] - 44 * Math.cos(rad(dir)), up[1] - 44 * Math.sin(rad(dir)),
           dn[0] + 44 * Math.cos(rad(dir)), dn[1] + 44 * Math.sin(rad(dir)));
    var A = '#0ea5e9', B = '#f59e0b';
    /* below-right at a crossing runs from 0 to dir; above-right runs from 0 to dir+180 */
    var L1 = a + DEG, L2 = (180 - a) + DEG;
    if (which === 'corresponding') {
      inner += arc(up[0], up[1], 32, 0, dir, A, L1);
      inner += arc(dn[0], dn[1], 32, 0, dir, B, L1);
    } else if (which === 'alternate') {
      inner += arc(up[0], up[1], 32, 0, dir, A, L1);
      inner += arc(dn[0], dn[1], 32, 180, dir + 180, B, L1);
    } else {
      inner += arc(up[0], up[1], 32, 0, dir, A, L1);
      inner += arc(dn[0], dn[1], 32, 0, dir + 180, B, L2);
    }
    return wrap(inner + dot(up[0], up[1]) + dot(dn[0], dn[1]));
  }

  /* ---- a triangle standing on one parallel line, apex on the other ----
     The apex is placed so that angle AEF really is a and angle BEG really is
     b, and the apex angle is drawn between the two arms - which is where it
     actually is, not above the line. */
  function triangleBetween(a, b, apex) {
    var y1 = 52, y2 = 152, ex = 160, arm = 150;
    /* from E: towards A is 180 degrees, towards B is 0 degrees (y grows down) */
    var dirF = 180 - a, dirG = b;
    var F = [ex + arm * Math.cos(rad(dirF)), y1 + arm * Math.sin(rad(dirF))];
    var G = [ex + arm * Math.cos(rad(dirG)), y1 + arm * Math.sin(rad(dirG))];
    /* the base sits on the lower line, so slide the feet down to it */
    var kF = (y2 - y1) / (F[1] - y1), kG = (y2 - y1) / (G[1] - y1);
    F = [ex + (F[0] - ex) * kF, y2];
    G = [ex + (G[0] - ex) * kG, y2];
    return wrap(
      line(20, y1, 300, y1) + line(20, y2, 300, y2) +
      line(ex, y1, F[0], F[1]) + line(ex, y1, G[0], G[1]) + line(F[0], F[1], G[0], G[1]) +
      arc(ex, y1, 30, 180, dirF, '#0ea5e9', a + DEG) +
      arc(ex, y1, 30, dirG, 0, '#0ea5e9', b + DEG) +
      arc(ex, y1, 54, dirG, dirF, '#f59e0b', apex + DEG) +
      dot(ex, y1, 'E') + dot(F[0], F[1], 'F', 0, 18) + dot(G[0], G[1], 'G', 0, 18) +
      dot(52, y1, 'A', -12, -9) + dot(268, y1, 'B', 12, -9)
    );
  }

  /* ---- a bent path between two parallel lines ----
     Both arms leave the bend on the same side, which is the arrangement in
     which the angle at the bend really is a + b. The feet are placed so that
     the arm makes exactly a with the top line and exactly b with the bottom
     line, so the picture is the question. */
  function bentPath(a, b, v) {
    var y1 = 54, y2 = 150, V = [216, 102];
    var t = (V[1] - y1) / Math.sin(rad(a));                 /* up and to the left */
    var T = [V[0] + t * Math.cos(rad(180 + a)), y1];
    var s2 = (y2 - V[1]) / Math.sin(rad(b));                /* down and to the left */
    var B = [V[0] + s2 * Math.cos(rad(180 - b)), y2];
    return wrap(
      line(20, y1, 300, y1) + line(20, y2, 300, y2) +
      line(T[0], T[1], V[0], V[1]) + line(V[0], V[1], B[0], B[1]) +
      line(20, V[1], 300, V[1], '#94a3b8', '6 5') +
      arc(T[0], T[1], 26, 0, a, '#0ea5e9', a + DEG) +
      arc(B[0], B[1], 26, 180 - b, 180, '#0ea5e9', b + DEG) +
      arc(V[0], V[1], 34, 180 - b, 180 + a, '#f59e0b', v + DEG) +
      dot(T[0], T[1]) + dot(B[0], B[1]) + dot(V[0], V[1], 'V', 18, 16)
    );
  }

  window.AU7Art = {
    oneAngle: oneAngle,
    complementary: complementary,
    onStraightLine: onStraightLine,
    crossing: crossing,
    atPoint: atPoint,
    insideRight: insideRight,
    parallelCut: parallelCut,
    triangleBetween: triangleBetween,
    bentPath: bentPath
  };
})();
