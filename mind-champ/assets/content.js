/* ============================================================
   MIND-CHAMP — Minecraft Quests (world 1)
   5 quest levels x 5 puzzles. Every puzzle is a hands-on case:
   the child discovers the technique by solving, hints are
   Socratic, worked solutions name the technique.
   Puzzle types: num | word | mcq | clue (answer + evidence) |
                 order (tap in sequence) | grid (tap ✓/✗) |
                 scale (weigh blocks) | draw (sketch pad)
   ============================================================ */

var MC_PAL = { grass:'#7cb342', dirt:'#8d6e63', stone:'#b0a99f', oak:'#d7a86e', dark:'#6d6259',
  water:'#4fc3f7', lava:'#ff7043', chest:'#f9a825', torch:'#ffd54f', gold:'#e6c14b', iron:'#cfc8bd' };

function mcBlk(x, y, c, s, extra) {
  return '<rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" fill="' + c + '" stroke="#5c5245" stroke-width="2" rx="4"' + (extra || '') + '/>';
}
/* a wall from row counts (top first), centered */
function mcWallArt(rows, colors, s) {
  s = s || 30;
  var max = Math.max.apply(null, rows), out = '', y = 8;
  rows.forEach(function (n, r) {
    var x = 8 + (max - n) * s / 2;
    for (var i = 0; i < n; i++) { out += mcBlk(x, y, colors[r % colors.length], s); x += s; }
    y += s;
  });
  return '<svg viewBox="0 0 ' + (max * s + 20) + ' ' + (rows.length * s + 16) + '" style="max-width:' + Math.min(max * s + 20, 470) + 'px">' + out + '</svg>';
}
/* a flat strip of colored blocks (pattern puzzles) */
function mcStripArt(colors, s, holeAt) {
  s = s || 34;
  var out = '', x = 8;
  for (var i = 0; i < colors.length; i++) {
    if (i === holeAt) out += '<rect x="' + x + '" y="8" width="' + s + '" height="' + s + '" rx="4" fill="none" stroke="#b45309" stroke-width="3" stroke-dasharray="6 5"/><text x="' + (x + s / 2) + '" y="' + (8 + s / 2 + 7) + '" font-size="20" font-weight="800" fill="#b45309" text-anchor="middle">?</text>';
    else out += mcBlk(x, 8, colors[i], s);
    x += s + 6;
  }
  return '<svg viewBox="0 0 ' + (colors.length * (s + 6) + 14) + ' ' + (s + 20) + '" style="max-width:' + Math.min(colors.length * (s + 6), 520) + 'px">' + out + '</svg>';
}
/* blocks with faces for odd-one-out */
function mcFaceArt(faces, s) {
  s = s || 66;
  var out = '', n = faces.length;
  faces.forEach(function (f, i) {
    var x = 10 + i * (s + 14);
    out += mcBlk(x, 10, MC_PAL.stone, s) +
      '<text x="' + (x + 18) + '" y="' + (10 + s - 12) + '" font-size="15" font-weight="800" fill="#2b2620">' + (i + 1) + '</text>';
    var eyes = f.eyes, ey = 10 + s * 0.32, gap = 14;
    for (var e = 0; e < eyes; e++)
      out += '<circle cx="' + (x + s / 2 - ((eyes - 1) * gap) / 2 + e * gap) + '" cy="' + ey + '" r="5.5" fill="#2b2620"/>';
    out += '<rect x="' + (x + s / 2 - 12) + '" y="' + (10 + s * 0.62) + '" width="24" height="8" rx="3" fill="' + (f.smile ? MC_PAL.torch : '#2b2620') + '"/>';
  });
  return '<svg viewBox="0 0 ' + (n * (s + 14) + 16) + ' ' + (s + 22) + '" style="max-width:' + (n * (s + 14) + 16) + 'px">' + out + '</svg>';
}
/* grid map for minecart paths. cells: '.' grass, 'L' lava, 'S' start, 'C' chest, 'F' fuel, 'D' door, 'T' torch, 'I' iron, 'G' gold */
function mcMapArt(cells, s) {
  s = s || 52;
  var rows = cells.length, cols = cells[0].length, out = '';
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var ch = cells[r][c], x = 8 + c * s, y = 8 + r * s, base = (ch === 'L') ? MC_PAL.lava : MC_PAL.grass;
    out += mcBlk(x, y, base, s);
    if (ch === 'S') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle" fill="#fff">⛏️</text>';
    if (ch === 'C') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">🧰</text>';
    if (ch === 'F') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">⛽</text>';
    if (ch === 'T') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">🔥</text>';
    if (ch === 'I') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">⛏</text>';
    if (ch === 'G') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">🏅</text>';
    if (ch === 'D') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">🚪</text>';
  }
  return '<svg viewBox="0 0 ' + (cols * s + 16) + ' ' + (rows * s + 16) + '" style="max-width:' + Math.min(cols * s + 16, 470) + 'px">' + out + '</svg>';
}
/* path drawn on the same map (for A/B compare puzzles) */
function mcMapPathArt(cells, path, color, s) {
  s = s || 52;
  var rows = cells.length, cols = cells[0].length, out = '', pts = [];
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    var ch = cells[r][c], x = 8 + c * s, y = 8 + r * s;
    out += mcBlk(x, y, ch === 'L' ? MC_PAL.lava : MC_PAL.grass, s);
    if (ch === 'S' || ch === 'C') out += '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 6) + '" font-size="20" font-weight="800" text-anchor="middle">' + (ch === 'S' ? '⛏️' : '🧰') + '</text>';
  }
  path.forEach(function (p) { pts.push((8 + p[1] * s + s / 2) + ',' + (8 + p[0] * s + s / 2)); });
  out += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>';
  return '<svg viewBox="0 0 ' + (cols * s + 16) + ' ' + (rows * s + 16) + '" style="max-width:' + Math.min(cols * s + 16, 440) + 'px">' + out + '</svg>';
}
/* recipe card */
function mcRecipeArt(items, s) {
  s = s || 60; var out = '', x = 14;
  items.forEach(function (it) {
    out += mcBlk(x, 12, it.c, s) + (it.t ? '<text x="' + (x + s / 2) + '" y="' + (12 + s / 2 + 7) + '" font-size="22" font-weight="800" text-anchor="middle">' + it.t + '</text>' : '');
    x += s + 10;
  });
  return '<svg viewBox="0 0 ' + ((s + 10) * (items.length + 2) + 20) + ' ' + (s + 26) + '" style="max-width:470px">' + out +
    '<text x="' + (x + 4) + '" y="' + (12 + s / 2 + 7) + '" font-size="30" font-weight="800" fill="#c2410c">→</text>' +
    mcBlk(x + 46, 12, MC_PAL.oak, s) + '</svg>';
}
/* river scene: near/far banks with items */
function mcRiverArt(near, far, s) {
  s = s || 54;
  var out = '', W = 430;
  out += '<rect x="8" y="10" width="180" height="' + (s + 18) + '" rx="10" fill="' + MC_PAL.grass + '" opacity=".9"/>';
  out += '<rect x="242" y="10" width="180" height="' + (s + 18) + '" rx="10" fill="' + MC_PAL.grass + '" opacity=".9"/>';
  out += '<rect x="8" y="' + (s + 36) + '" width="' + (W - 16) + '" height="34" rx="8" fill="' + MC_PAL.water + '"/>';
  out += '<text x="' + (8 + 90) + '" y="' + (s + 58) + '" font-size="13" font-weight="800" text-anchor="middle" fill="#1e5f74">🌊 the river</text>';
  function put(items, x0) {
    var x = x0 + 12;
    items.forEach(function (t) {
      out += '<text x="' + x + '" y="' + (10 + s / 2 + 8) + '" font-size="30" font-weight="800" text-anchor="middle">' + t + '</text>';
      x += 52;
    });
  }
  put(near, 8); put(far, 242);
  return '<svg viewBox="0 0 ' + W + ' ' + (s + 80) + '" style="max-width:430px">' + out + '</svg>';
}
/* 9 gold blocks for the scale puzzle */
function mcNineArt(s) {
  s = s || 58; var out = '';
  for (var i = 0; i < 9; i++) {
    var r = Math.floor(i / 3), c = i % 3, x = 12 + c * (s + 12), y = 10 + r * (s + 12);
    out += mcBlk(x, y, MC_PAL.gold, s) +
      '<text x="' + (x + s / 2) + '" y="' + (y + s / 2 + 7) + '" font-size="22" font-weight="800" text-anchor="middle" fill="#5c5245">' + (i + 1) + '</text>';
  }
  return '<svg viewBox="0 0 ' + (3 * (s + 12) + 24) + ' ' + (3 * (s + 12) + 22) + '" style="max-width:' + (3 * (s + 12) + 24) + 'px">' + out + '</svg>';
}

var MC_LEVELS = [

/* ------------------------------------------------ Q1: THE VILLAGE WALL */
{ id: 'q1', name: 'The Village Wall', icon: '🧱', xpBonus: 15,
  tech: { id: 'pattern', name: 'Spot the Pattern', icon: '🔍', desc: 'Look for what repeats — groups, colours, shapes. Counting in groups beats counting one by one.' },
  story: 'Blockwood Village needs a new wall before the full moon. Builder Barot has stacked the blocks — but every delivery note needs an EXACT count. Counting one by one will take forever… is there a faster way?',
  puzzles: [
  { id: 'q1p1', type: 'num', xp: 10, title: 'The delivery note',
    q: 'How many blocks are in this wall?', story: 'Barot\'s first wall. Count carefully — the wall is wider at the bottom!',
    art: function () { return mcWallArt([4, 5, 6, 7], [MC_PAL.oak, MC_PAL.dirt, MC_PAL.stone, MC_PAL.dirt]); },
    answer: 22,
    hints: ['Count one ROW at a time, from the top down.',
      'The rows have 4, 5, 6 and 7 blocks. You don\'t need to count each block!',
      '4 + 5 + 6 + 7 = ?'],
    sol: 'Count row by row instead of block by block: 4 + 5 + 6 + 7 = 22. When things come in rows or groups — count the groups, not the things.' },
  { id: 'q1p2', type: 'mcq', xp: 10, title: 'Two walls, one winner',
    q: 'Barot built 2 sample walls. Which wall uses MORE blocks?', story: 'The village can only pick one design — the stronger one has more blocks.',
    art: function () { return '<div style="display:flex;gap:18px;flex-wrap:wrap;justify-content:center">' +
      '<div><p style="text-align:center;font-weight:800;margin:4px 0">Wall A</p>' + mcWallArt([5, 5], [MC_PAL.dirt]) + '</div>' +
      '<div><p style="text-align:center;font-weight:800;margin:4px 0">Wall B</p>' + mcWallArt([4, 4, 4], [MC_PAL.stone]) + '</div></div>'; },
    options: ['Wall A', 'Wall B', 'Both use the same'],
    answer: 1,
    hints: ['Count each wall\'s rows separately.', 'Wall A: 5 + 5. Wall B: 4 + 4 + 4.', 'Wall A has 10. Wall B has 12.'],
    sol: 'Wall A = 5 + 5 = 10 blocks. Wall B = 4 + 4 + 4 = 12 blocks. Wall B wins. Compare bit by bit — never judge a pile by how it looks!' },
  { id: 'q1p3', type: 'mcq', xp: 10, title: 'The secret stripe',
    q: 'What colour block belongs in the empty space?', story: 'Barot found an old striped wall. One block fell out — the last one on the right.',
    art: function () {
      var c = [MC_PAL.grass, MC_PAL.dirt, MC_PAL.stone];
      var strip = []; for (var i = 0; i < 12; i++) strip.push(c[i % 3]);
      return mcStripArt(strip, 34, 12); },
    options: ['Grass green', 'Dirt brown', 'Stone grey'],
    answer: 0,
    hints: ['Say the colours out loud as you point: green… brown… grey… green… brown… grey…',
      'The wall repeats in groups of 3: green, brown, grey.',
      '12 blocks = exactly 4 full groups. So block 13 starts a NEW group — and the missing block is 1 after that.'],
    sol: 'The colours repeat in groups of 3 (green, brown, grey). Block 12 ends a group, so block 13 is green and block 14 is brown. Finding what repeats turns a long list into a short one!' },
  { id: 'q1p4', type: 'clue', xp: 10, title: 'The odd block',
    q: 'One block doesn\'t match. Which block is different — and WHY?', story: 'A sneaky zombie swapped one block in the pile.',
    art: function () { return mcFaceArt([{ eyes: 2 }, { eyes: 2 }, { eyes: 2 }, { eyes: 3 }, { eyes: 2 }]); },
    options: ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'],
    answer: 3,
    clues: ['Number of eyes', 'Number of legs', 'The colour'],
    clueAnswer: 0,
    hints: ['Compare each block with the one next to it.',
      'Look at every block\'s face, one part at a time: eyes, then mouth, then colour.',
      '4 blocks have 2 eyes. Which one doesn\'t?'],
    sol: 'Block 4 has 3 eyes — all the others have 2. Compare one part at a time and the odd one out can\'t hide.' },
  { id: 'q1p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the wall with a window',
    q: 'How many blocks are in this wall? (the hole in the middle is a window — no blocks there!)', story: 'The final wall has a window so the guards can watch for creepers. Barot needs the exact count.',
    art: function () {
      var s = 30, out = '', W = 5, cols = 8, y = 8;
      for (var r = 0; r < W; r++) {
        var x = 8;
        for (var c = 0; c < cols; c++) {
          var isHole = (r >= 1 && r <= 2 && c >= 3 && c <= 4);
          if (!isHole) out += mcBlk(x, y, [MC_PAL.dirt, MC_PAL.stone, MC_PAL.dirt, MC_PAL.oak, MC_PAL.dirt][r], s);
          x += s;
        }
        y += s;
      }
      return '<svg viewBox="0 0 ' + (cols * s + 16) + ' ' + (W * s + 16) + '" style="max-width:' + (cols * s + 16) + 'px">' + out + '</svg>'; },
    answer: 36,
    hints: ['Pretend the window isn\'t there — count the FULL wall first.',
      'Full wall: 5 rows of 8 = 40 blocks. Now take away the window.',
      'The window is 2 blocks wide and 2 blocks tall = 4 missing. 40 − 4 = ?'],
    sol: 'Count the full wall first (5 rows × 8 = 40), then subtract the window (2 × 2 = 4). 40 − 4 = 36. Big counts get easy when you fix them up with a small adjustment at the end.' }
] },

/* ------------------------------------------------ Q2: THE MINECART PATH */
{ id: 'q2', name: 'The Minecart Path', icon: '🛤️', xpBonus: 15,
  tech: { id: 'route', name: 'Draw the Route', icon: '✏️', desc: 'Trace paths with your finger or a pencil. A line on a map beats a paragraph in your head.' },
  story: 'Deep under Blockwood runs an old mine. A minecart must carry iron to the surface — but the tunnels twist, and lava glows in the dark. Whoever plans the route needs a sharp pencil and a sharp mind.',
  puzzles: [
  { id: 'q2p1', type: 'num', xp: 10, title: 'The first delivery',
    q: 'What is the FEWEST number of moves to get the cart from ⛏️ to 🧰? (1 move = 1 block across or down, never through lava!)',
    story: 'The cart rolls across or down the map — it cannot go through lava.',
    art: function () { return mcMapArt([
      'S......',
      '..L....',
      '..L....',
      '.......',
      '...L..C']); },
    answer: 10,
    hints: ['Trace with your finger from ⛏️ to 🧰. Count each block you enter.',
      'You need 3 moves across (to reach column 6) and 5 moves down.',
      '3 across + 5 down = ?'],
    sol: 'The cart starts 5 rows above and 3 columns left of the chest: 5 down + 3 across = 8 moves. Trace it and count — your finger is a fine computer!' },
  { id: 'q2p2', type: 'mcq', xp: 10, title: 'Route A vs route B',
    q: 'Two miners drew their routes. Whose route is SHORTER?',
    story: 'Old miner Tara says her route (orange) is faster. Young miner Dev disagrees — his is the blue one.',
    art: function () {
      var m = ['.......', '..L....', '..L....', 'S......', '...L..C'];
      var A = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [4, 4], [4, 5], [4, 6]];
      var B = [[3, 0], [2, 0], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 6], [3, 6], [4, 6]];
      return '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">' +
        '<div><p style="text-align:center;font-weight:800;margin:2px 0">Tara\'s route</p>' + mcMapPathArt(m, A, '#ef6c00') + '</div>' +
        '<div><p style="text-align:center;font-weight:800;margin:2px 0">Dev\'s route</p>' + mcMapPathArt(m, B, '#1565c0') + '</div></div>'; },
    options: ['Tara\'s (orange)', 'Dev\'s (blue)', 'Both are equal'],
    answer: 0,
    hints: ['Count how many blocks each route ENTERS — count the corners too!',
      'Tara\'s orange route enters 8 blocks. Now count Dev\'s blue one.',
      'Dev\'s route goes all the way up and around — it enters 12 blocks.'],
    sol: 'Count the blocks each path enters: Tara 8, Dev 12. Longer-looking detours usually ARE longer — but only counting proves it.' },
  { id: 'q2p3', type: 'num', xp: 10, title: 'The fuel stop',
    q: 'Now the cart must PASS THROUGH the fuel station ⛽ on the way to the chest 🧰. What is the fewest moves now?',
    story: 'A cart with no fuel stops dead — it must refuel on the way.',
    art: function () { return mcMapArt([
      'S..F...',
      '..L....',
      '..L....',
      '.......',
      '...L..C']); },
    answer: 10,
    hints: ['First find the fewest moves to the fuel station, then add the fewest from fuel to chest.',
      'Start → fuel: 3 across, no rows = 3 moves. Fuel → chest: 3 across, 4 down.',
      'Fuel → chest: 3 across and 4 down = 7 moves (the lava at row 4, column 3 does not block the corner route). 3 + 7 = ?'],
    sol: 'Break the trip in two: Start→⛽ = 3 moves (3 across), ⛽→🧰 = 7 moves (3 across + 4 down). Total 10. When a trip must stop somewhere, split it into two small trips.' },
  { id: 'q2p4', type: 'draw', xp: 10, title: 'The winding rule',
    q: 'Draw your best route on the sketch pad. Every TURN costs 1 second. What is the FEWEST turns any route can have?', drawPrompt: 'Sketch routes on the pad — try to reach 🧰 with as few turns as you can!',
    story: 'Minecarts hate turning — each turn wastes 1 second. The engineer will only approve a route with the fewest turns.',
    art: function () { return mcMapArt([
      'S..L..C',
      '.......',
      '.L.....',
      '.......',
      '...L...']); },
    answer: 2,
    hints: ['A turn is any moment the cart changes from across to down or back.',
      'Try going straight ALL the way right on row 1… but the lava at the top blocks column 3. Dip around it!',
      'Down 1, across 6, down 4: that\'s just 2 turns. Can anyone do 1?'],
    sol: 'Drop down 1 block, cross 6 blocks, then down 4: 2 turns. Going around the lava with one little dip is all you need. When turns cost more than steps — count turns, not steps!' },
  { id: 'q2p5', type: 'order', xp: 20, boss: true, title: 'BOSS: the night run',
    q: 'Tap the stops in the ONLY safe order. (The mine rules must ALL be true.)',
    story: 'Night run rules: 🔥 must be grabbed BEFORE ⛏ (the iron tunnel is pitch dark). Never grab 🏅 before ⛏ (the gold door only opens for an iron pickaxe). 🚪 opens last, of course!',
    items: [{ t: '🔥 torch', id: 'T' }, { t: '⛏ iron', id: 'I' }, { t: '🏅 gold', id: 'G' }, { t: '🚪 exit door', id: 'D' }],
    answer: ['T', 'I', 'G', 'D'],
    hints: ['Which item has NO rule waiting on it? That can go first.',
      'Torch must be before iron, and gold after iron — so iron sits in the middle. Where is the door?',
      '🔥 then ⛏ then 🏅 then 🚪. Check each rule against it!'],
    sol: 'The rules chain up: torch before iron, iron before gold, door last. Order: 🔥 → ⛏ → 🏅 → 🚪. Rules that say "before/after" are chains — follow the chain!' }
] },

/* ------------------------------------------------ Q3: THE CRAFTING TABLE */
{ id: 'q3', name: 'The Crafting Table', icon: '🛠️', xpBonus: 15,
  tech: { id: 'backwards', name: 'Work Backwards', icon: '🔄', desc: 'When you know the END and need the START, flip the recipe. Undo one step at a time.' },
  story: 'The village blacksmith Nia has a mountain of orders — swords, pickaxes, torches — and a cluttered head. She keeps chopping too much wood and wasting sticks. She needs a planner, not a chopper.',
  puzzles: [
  { id: 'q3p1', type: 'num', xp: 10, title: 'The plank order',
    q: 'Nia needs 24 planks. How many LOGS must she chop?',
    story: 'At the crafting table, 1 log always crafts into 4 planks.',
    art: function () { return mcRecipeArt([{ c: MC_PAL.oak, t: '🪵' }, { c: MC_PAL.oak, t: '🪵' }]); },
    answer: 6,
    hints: ['Each log is a GROUP of 4 planks. How many groups of 4 make 24?',
      '4 + 4 + 4 + 4 + 4 + 4 = 24.',
      '24 ÷ 4 = ?'],
    sol: 'Planks come in groups of 4, so ask "how many 4s make 24?" → 6 logs. Recipes are just grouping in disguise.' },
  { id: 'q3p2', type: 'num', xp: 10, title: 'The stick chain',
    q: '1 log → 4 planks, and 2 planks → 4 sticks. Nia needs 16 sticks. How many LOGS?',
    story: 'Two recipes chained together! First logs become planks, then planks become sticks.',
    art: function () { return mcRecipeArt([{ c: MC_PAL.oak, t: '🪵' }, { c: MC_PAL.oak, t: '🟫' }, { c: MC_PAL.oak, t: '🥢' }]); },
    answer: 2,
    hints: ['Work step by step: first ask how many planks you need.',
      '2 planks → 4 sticks, so 16 sticks need 8 planks.',
      '8 planks come from 2 logs (each log gives 4 planks).'],
    sol: '16 sticks need 8 planks (2 planks → 4 sticks). 8 planks need 2 logs (1 log → 4 planks). Chains are solved one link at a time — from the END backwards.' },
  { id: 'q3p3', type: 'num', xp: 10, title: 'The mystery chop',
    q: 'Yesterday Nia chopped some logs and crafted ALL of them into planks. She ended with exactly 28 planks. How many logs did she chop?',
    story: 'Nia forgot to write it down — the delivery note only shows the planks.',
    art: function () { return mcRecipeArt([{ c: MC_PAL.oak, t: '❓' }, { c: MC_PAL.oak, t: '🟫' }]); },
    answer: 7,
    hints: ['You know the END (28 planks). Ask the recipe to run BACKWARDS.',
      'Undo the recipe: every 4 planks un-craft into 1 log.',
      '28 ÷ 4 = ?'],
    sol: 'Run the recipe backwards: 28 planks ÷ 4 = 7 logs. When you know the end and want the start — work backwards.' },
  { id: 'q3p4', type: 'grid', xp: 10, title: 'Who crafted what?',
    q: 'Steve and Alex each crafted exactly 1 item — a sword or a pickaxe. Tap the grid to mark ✓ (crafted it) and ✗ (didn\'t). Fill in every box!',
    story: 'Clue: "I saw Steve\'s item — it was NOT a sword."',
    rowHeads: ['Steve', 'Alex'], colHeads: ['🗡️ sword', '⛏️ pickaxe'],
    answer: { 'Steve|🗡️ sword': 0, 'Steve|⛏️ pickaxe': 1, 'Alex|🗡️ sword': 1, 'Alex|⛏️ pickaxe': 0 },
    hints: ['If Steve didn\'t craft the sword, what must his ✗ look like?',
      'Steve didn\'t make the sword — so someone else made it. Who?',
      'Each person makes exactly 1 item: if Steve made the pickaxe, Alex made the sword.'],
    sol: 'Steve didn\'t craft the sword → he crafted the pickaxe. That leaves the sword for Alex. Cross off what CAN\'T happen, and what CAN happen becomes obvious — that\'s elimination.' },
  { id: 'q3p5', type: 'order', xp: 20, boss: true, title: 'BOSS: the torch recipe',
    q: 'Tap the crafting steps in the correct ORDER to make a torch from scratch.',
    story: 'Recipe rules: a torch = 1 coal on top of 1 stick. Sticks come from planks. Planks come from logs. Coal comes from mining coal ore.',
    items: [{ t: '⛏️ Mine the coal ore', id: 'C' }, { t: '🪵 Chop a log', id: 'L' }, { t: '🟫 Craft planks from the log', id: 'P' }, { t: '🥢 Craft sticks from planks', id: 'S' }, { t: '🔥 Put coal on a stick — torch!', id: 'T' }],
    answer: ['L', 'P', 'S', 'C', 'T'],
    hints: ['What has to exist BEFORE anything else can happen? (You can\'t craft planks from nothing!)',
      'The chain is: log → planks → sticks. Mining coal can happen any time before the final craft.',
      '🪵 → 🟫 → 🥢, and ⛏️ coal can slot in anywhere before the last step → 🔥 last.'],
    sol: 'Follow what must exist before what: log → planks → sticks → (mine the coal anytime) → craft the torch last. Any plan that respects "before" is a good plan — that\'s how builders think.' }
] },

/* ------------------------------------------------ Q4: THE RIVER CROSSING */
{ id: 'q4', name: 'The River Crossing', icon: '🌊', xpBonus: 15,
  tech: { id: 'actit', name: 'Act It Out', icon: '🎭', desc: 'Play the story with your finger. Move things, check what breaks, and watch for the trick step.' },
  story: 'Alex reached the wide river with a wolf 🐺, a sheep 🐑 and a basket of wheat 🌾. The ferry boat is tiny — it carries Alex plus only ONE other thing. And Alex has rules to respect…',
  puzzles: [
  { id: 'q4p1', type: 'mcq', xp: 10, title: 'The safe pair',
    q: 'Which pair is SAFE to leave alone together (without Alex)?',
    story: 'Village rules of the wild: the wolf eats the sheep, and the sheep eats the wheat.',
    art: function () { return mcRiverArt(['🐑', '🌾', '🐺'], []); },
    options: ['Wolf + sheep', 'Sheep + wheat', 'Wolf + wheat', 'No pair is safe'],
    answer: 2,
    hints: ['Read the rules again — who eats whom?',
      'The wolf eats the sheep. The sheep eats the wheat. What does the wolf do to wheat?',
      'The wolf doesn\'t want the wheat at all.'],
    sol: 'Wolf+sheep: unsafe. Sheep+wheat: unsafe. Wolf+wheat: totally fine — wolves don\'t eat wheat! First step of any crossing puzzle: learn which pairs are safe.' },
  { id: 'q4p2', type: 'clue', xp: 10, title: 'The tricky return',
    q: 'The sheep is across the river, safe and alone. Alex stands with the wolf and wheat. What should Alex take on the NEXT trip? And WHICH RULE makes the other choice dangerous?',
    art: function () { return mcRiverArt(['🌾', '🐺'], ['🐑']); },
    options: ['The wheat', 'The wolf', 'Row over empty'],
    answer: 1,
    clues: ['The sheep eats the wheat', 'The wolf eats the sheep', 'The boat holds only 1 thing'],
    clueAnswer: 0,
    hints: ['Try each choice in your head. What gets left behind?',
      'Taking the wheat strands the wolf — fine! — but when Alex arrives, the wheat meets the sheep…',
      'Taking the WOLF is right: the wolf is safe with the sheep for the moment Alex holds the leash, and the wheat is safe alone. Taking the wheat would put wheat next to a hungry sheep.'],
    sol: 'Take the wolf! The clue that decides it: the sheep eats the wheat — so wheat can never be the sheep\'s neighbour without Alex. (And that famous "bring the sheep BACK" move is coming…) Act out each choice before you commit.' },
  { id: 'q4p3', type: 'num', xp: 10, title: 'The 7-crossing plan',
    q: 'What is the FEWEST river crossings Alex needs to get the wolf, the sheep and the wheat across? (Each trip across or back = 1 crossing.)',
    art: function () { return mcRiverArt(['🐑', '🌾', '🐺'], []); },
    answer: 7,
    hints: ['Try acting it out with 3 coins on a table — one coin per animal!',
      'The famous trick: at one point Alex must bring the sheep BACK to the start.',
      'Over (sheep), back, over (wolf), back WITH sheep, over (wheat), back, over (sheep). Count them!'],
    sol: 'Sheep over → back empty → wolf over → sheep BACK → wheat over → back empty → sheep over = 7 crossings. The counter-intuitive move (bringing something back) is the key to many puzzles — spot it, don\'t fear it.' },
  { id: 'q4p4', type: 'order', xp: 10, title: 'The full crossing script',
    q: 'Alex wrote the plan on cards — then dropped them! Tap the cards back into the right order.',
    story: '7 cards. Each card is one crossing. Remember: only one famous card goes BACKWARDS with a passenger!',
    items: [{ t: 'Take the sheep across', id: 'a' }, { t: 'Return alone', id: 'b' }, { t: 'Take the wolf across', id: 'c' }, { t: 'Bring the SHEEP back', id: 'd' }, { t: 'Take the wheat across', id: 'e' }, { t: 'Return alone', id: 'f' }, { t: 'Take the sheep across', id: 'g' }],
    answer: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    hints: ['The first trip must take the sheep — everything else leaves an unsafe pair.',
      'After the wolf is across, something must come back… the sheep!',
      'Then wheat over, back alone, and one last sheep delivery.'],
    sol: 'Sheep over, alone back, wolf over, SHEEP back, wheat over, alone back, sheep over. Writing the whole plan as ordered steps is how you beat multi-step puzzles.' },
  { id: 'q4p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the midnight bridge',
    q: 'A different bridge! 4 builders must cross before the creeper alarm. One torch — the bridge holds 2 people max, and 2 crossing together move at the SLOWER one\'s pace. Villager takes 1 min, Steve 2, Alex 5, Iron Golem 10. What is the fewest TOTAL minutes?',
    story: 'Everyone must cross; the torch must come back for each trip — you can\'t cross in the dark!',
    art: function () { return mcRiverArt(['🧑 1 min', '🧔 2 min', '👨 5 min', '🗿 10 min'], []); },
    answer: 17,
    hints: ['Who should carry the torch back and forth, again and again?',
      'Send the 2 SLOWEST across together — one torch trip "pays" for both.',
      'Villager+Steve cross (2), villager back (1), Alex+Golem cross (10), Steve back (2), Villager+Steve cross (2). Add them up!'],
    sol: '2 + 1 + 10 + 2 + 2 = 17 minutes. Two tricks make it work: the fastest hands (1 min) run the torch, and the slow pair share one crossing. Combine techniques — acting it out + pairing cleverly.' }
] },

/* ------------------------------------------------ Q5: THE REDSTONE VAULT */
{ id: 'q5', name: 'The Redstone Vault', icon: '🔴', xpBonus: 15,
  tech: { id: 'chain', name: 'Chain Your Techniques', icon: '⛓️', desc: 'Hard cases are several easy cases stacked. Spot each layer — pattern, backwards, elimination — and solve them one at a time.' },
  story: 'Under the village lies the legendary Redstone Vault — packed with enchanted diamonds. Its keeper tests every detective who knocks. Only a mind that can chain its techniques walks out rich…',
  puzzles: [
  { id: 'q5p1', type: 'mcq', xp: 10, title: 'The lever puzzle',
    q: 'All 3 vault doors start CLOSED. Lever A flips doors 1 and 2. Lever B flips doors 2 and 3. Alex pulls A once, then B once. Which doors are OPEN?',
    story: 'Redstone flips a door every time it fires — open becomes closed, closed becomes open.',
    options: ['Door 1 only', 'Door 2 only', 'Doors 1 and 3', 'All 3 doors'],
    answer: 2,
    hints: ['Track one door at a time. Door 1: who flips it?',
      'Door 1: only lever A → flipped once → OPEN. Door 2: flipped by A AND B → twice → closed!',
      'Door 3: only lever B → flipped once → OPEN. Which doors are open?'],
    sol: 'Door 1: one flip → open. Door 2: two flips → back to closed. Door 3: one flip → open. Doors 1 and 3! Track each thing separately — flips, then doors.' },
  { id: 'q5p2', type: 'mcq', xp: 10, title: 'The creeper\'s hiss',
    q: 'A creeper hissed a coded warning — every letter was shifted 1 FORWARD. It says: EJNBOE. Decode the word!',
    story: 'Creeper language hides words by pushing each letter one step forward in the alphabet.',
    options: ['DIAMOND', 'EMERALD', 'REDSTONE', 'IRON', 'GOLD'],
    answer: 0,
    hints: ['Shift every letter BACK by 1. E becomes D…',
      'E→D, J→I, N→M, B→A, O→N…',
      'D-I-A-M-O-N-? — the last letter is E→D.'],
    sol: 'Shift each letter back one: EJNBOE → DIAMOND. A cipher is just a pattern in disguise — find the shift, and the message falls out.' },
  { id: 'q5p3', type: 'scale', xp: 10, title: 'The 9 gold blocks',
    q: '9 gold-looking blocks — ONE is a fake (slightly lighter clay!). Tap 2 blocks onto the scale to compare them, weigh as often as you like, then type the fake block\'s number.',
    story: 'The vault keeper says a true detective finds the fake in only 2 weighings — but take your time.',
    answer: 7,
    art: function () { return mcNineArt(); },
    hints: ['Weighing one block against one block is slow. Weigh GROUPS!',
      'Put 3 blocks on one side and 3 on the other. If they balance, the fake is in the group you left out.',
      'First weighing (1,2,3 vs 4,5,6): balanced! So the fake is among 7, 8, 9. Now weigh 7 vs 8 — the lighter one… if they balance it\'s 9.'],
    sol: 'Weigh 3 vs 3 (say 1-2-3 vs 4-5-6): they balance → the fake hides in 7, 8, 9. Weigh 7 vs 8: 7 rises — it\'s lighter! Splitting into groups turns 9 suspects into 3, then 3 into 1.' },
  { id: 'q5p4', type: 'grid', xp: 10, title: 'The miners\' report',
    q: 'Steve, Alex and Noor each mined exactly 1 ore — diamond, redstone or gold. Tap ✓ and ✗ in every box. Clues: "Steve did NOT find the diamond." and "Noor struck GOLD!"',
    rowHeads: ['Steve', 'Alex', 'Noor'], colHeads: ['💎 diamond', '🔺 redstone', '🏅 gold'],
    answer: { 'Steve|💎 diamond': 0, 'Steve|🔺 redstone': 1, 'Steve|🏅 gold': 0,
              'Alex|💎 diamond': 1, 'Alex|🔺 redstone': 0, 'Alex|🏅 gold': 0,
              'Noor|💎 diamond': 0, 'Noor|🔺 redstone': 0, 'Noor|🏅 gold': 1 },
    hints: ['Start with the loudest clue — who found the gold?',
      'Noor found the gold → ✗ for everyone else\'s gold. Steve didn\'t find the diamond → who is left with the diamond?',
      'Steve takes redstone (not diamond, gold is taken). Alex gets what\'s left: diamond.'],
    sol: 'Noor = gold (given). Steve ≠ diamond and ≠ gold → redstone. Alex = diamond. The loudest clue first, then eliminate: that\'s a logic grid.' },
  { id: 'q5p5', type: 'clue', xp: 20, boss: true, title: 'FINAL BOSS: the vault code',
    q: 'The vault has a 3-digit code. Type the code — then answer why 951 is WRONG. Clues: (1) the digits add up to 15, (2) all 3 digits are odd, (3) the first digit is the biggest, (4) the code is less than 800.',
    clues: ['Its digits are even', 'It is bigger than 800', 'Its digits don\'t add up to 15'],
    clueAnswer: 1,
    answer: 753,
    hints: ['Odd digits under 10 are 1, 3, 5, 7, 9. Which groups of 3 of these add to 15?',
      'Possible codes from clue 1+2: 9+5+1, 7+5+3, 9+3+3, 5+5+5… Now apply clue 4 (under 800) — most die!',
      '9xx is too big (over 800). 5+5+5 has no single biggest digit. Only 7, 5, 3 survives — first digit biggest → 753.'],
    sol: 'Odd digits adding to 15, first biggest, under 800: only 753 survives every clue. And 951 fails because it is bigger than 800. Each clue chops the list — that\'s elimination, chained 4 times deep. Case closed — you\'re a Mind-Champ!' }
] }
];

/* techniques registry (order of unlock) */
var MC_TECHS = [];
MC_LEVELS.forEach(function (L) { MC_TECHS.push(L.tech); });
