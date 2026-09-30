/* ============================================================
   MATH-CHAMP · TECHNIQUE QUESTS — "The Equation Forge"
   Hands-on algebra: the equals sign as a balance beam, BODMAS as
   recipe order, moving terms across = , multiplying/dividing both
   sides, taking out common factors.
   Puzzle types: num | mcq | clue (answer + evidence) | order | draw
   Progress lives in oc_state.quest (per child, cloud-synced);
   XP flows into Math-Champ ranks via OC.record (kind 'quest').
   ============================================================ */

var EQ_LEVELS = [

/* ------------------------------------------------ L1: THE BALANCE BEAM */
{ id: 'eq1', name: 'The Balance Beam', icon: '⚖️', xpBonus: 15,
  tech: { id: 'balance', name: 'Equals means Balance', icon: '⚖️', desc: 'The = sign is a balance beam: whatever sits on the left pan weighs EXACTLY the same as the right pan. Keep it level!' },
  story: 'Blacksmith Nia has forged a magic balance beam. Both pans must ALWAYS weigh the same — the moment they don\'t, the forge goes cold. Your job: keep the beam level.',
  puzzles: [
  { id: 'eq1p1', type: 'clue', xp: 10, title: 'What does = really mean?',
    q: 'Nia asks her new apprentice: what does the = sign really tell you?',
    options: ['The answer comes after it', 'Both sides weigh exactly the same', 'The bigger side is written first'],
    answer: 1,
    clues: ['A balance beam stays level only when both pans are equal', 'In math class, the answer is usually written after =', 'Bigger numbers are sometimes written first'],
    clueAnswer: 0,
    hints: ['Look at the balance beam picture — when is it level?',
      'The beam tips when one pan is heavier. When does it stay flat?',
      'The beam stays level ONLY when both pans weigh the same. That is what = promises.'],
    sol: 'The = sign is a promise: the left side and the right side are EQUAL — like two pans of a balance beam weighing the same. It does not mean "the answer comes next". Every equation trick you will ever learn is just a way of keeping that beam level.' },
  { id: 'eq1p2', type: 'num', xp: 10, title: 'The hidden weight',
    q: 'The left pan holds 3 blocks plus a covered weight. The right pan holds 7 blocks. The beam is LEVEL. How many blocks are hidden under the cover?',
    art: function () { return eqScale('3 + ?', '7', true); },
    answer: 4,
    hints: ['The beam is level, so left must weigh the same as right.',
      'Right pan: 7 blocks. Left pan: 3 blocks + the cover.',
      '3 + ? = 7. What added to 3 makes 7?'],
    sol: 'Level beam means the two sides are equal: 3 + ? = 7. Count up from 3 to 7 — you need 4 more blocks. The cover hides 4 blocks.' },
  { id: 'eq1p3', type: 'num', xp: 10, title: 'Blocks on both pans',
    q: 'Left pan: 5 + 2 blocks. Right pan: ? + 3 blocks. The beam is level. What is the missing number?',
    art: function () { return eqScale('5 + 2', '? + 3', true); },
    answer: 4,
    hints: ['First work out the FULL weight of the left pan.',
      'Left pan: 5 + 2 = 7 blocks.',
      'Right pan must also be 7. It shows ? + 3, so ? = 7 − 3.'],
    sol: 'Left pan = 5 + 2 = 7. Level beam → right pan is also 7. Right pan = ? + 3, so ? = 7 − 3 = 4.' },
  { id: 'eq1p4', type: 'mcq', xp: 10, title: 'The backwards equation',
    q: 'Old records write equations the other way round: 8 = 3 + ? A villager says this one has no answer because the answer is on the wrong side. Is he right?',
    options: ['Yes — answers must come after =', 'No — = works both ways, both sides are still equal', 'No — the equation is broken'],
    answer: 1,
    hints: ['Remember the balance beam — does it care which pan you stand on?',
      'If both sides are equal, the beam is level no matter which side is written first.',
      '8 = 3 + ? simply means 3 + ? = 8. The beam is level either way.'],
    sol: 'The = sign is a balance — it works both ways. 8 = 3 + ? is exactly the same equation as 3 + ? = 8. So ? = 5. Never let anyone tell you the answer must "come after" the equals sign!' },
  { id: 'eq1p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the double-pan test',
    q: 'The forge\'s final test: ? + 6 = 4 + 5. What is the hidden weight?',
    art: function () { return eqScale('? + 6', '4 + 5', true); },
    answer: 3,
    hints: ['Compute the pan that has no unknown in it.',
      'Right pan: 4 + 5 = 9.',
      'Left pan must also be 9: ? + 6 = 9.'],
    sol: 'Right pan: 4 + 5 = 9. Level beam → left pan is 9 too: ? + 6 = 9, so ? = 9 − 6 = 3. Whenever one side is fully known, weigh it out first.' }
] },

/* ------------------------------------------------ L2: THE RECIPE ORDER */
{ id: 'eq2', name: 'The Recipe Order', icon: '🧾', xpBonus: 15,
  tech: { id: 'recipe', name: 'Follow the Recipe Order', icon: '🧾', desc: 'BODMAS is a cooking rule: brackets first, then multiply/divide as you meet them left to right, then add/subtract left to right. Same recipe, every time.' },
  story: 'Nia forges using recipes — and the ORDER of the steps is sacred. Mix them up and the metal cracks. The forge recipe: (B) brackets → (DM) multiply & divide left to right → (AS) add & subtract left to right.',
  puzzles: [
  { id: 'eq2p1', type: 'order', xp: 10, title: 'The sacred order',
    q: 'Tap the recipe steps in the correct BODMAS order.',
    items: [{ t: '( ) brackets first', id: 'B' }, { t: '× and ÷ as you meet them, left to right', id: 'D' }, { t: '+ and − as you meet them, left to right', id: 'A' }],
    answer: ['B', 'D', 'A'],
    hints: ['What is always done before anything else?',
      'After brackets, which is stronger — multiplying or adding?',
      'Brackets → multiply/divide → add/subtract. Always.'],
    sol: 'The recipe: brackets first, then × and ÷ as you meet them (left to right), then + and − (left to right). BODMAS/PEMDAS is just a kitchen rule for math.' },
  { id: 'eq2p2', type: 'mcq', xp: 10, title: 'Dev\'s cracked blade',
    q: 'Dev forged 2 + 3 × 4 and shouted "20!" The blade cracked. What is the correct value?',
    options: ['20', '14', '24', '11'],
    answer: 1,
    hints: ['Which must you do first — the + or the × ?',
      'The recipe says multiply before adding.',
      '3 × 4 = 12 first, then 2 + 12 = ?'],
    sol: 'Multiply before adding: 2 + 3 × 4 = 2 + 12 = 14. Dev added first (2 + 3 = 5, then × 4 = 20) — wrong recipe order, cracked blade.' },
  { id: 'eq2p3', type: 'num', xp: 10, title: 'The bracket temper',
    q: 'Forge this blade step by step: 5 × (2 + 3) − 4 = ?',
    answer: 21,
    hints: ['Brackets are ALWAYS first.',
      'Inside the brackets: 2 + 3 = 5.',
      'Then 5 × 5 = 25, and finally 25 − 4 = ?'],
    sol: 'Brackets first: 2 + 3 = 5. Then multiply: 5 × 5 = 25. Then subtract: 25 − 4 = 21. One recipe, three steps, zero cracks.' },
  { id: 'eq2p4', type: 'clue', xp: 10, title: 'The apprentice\'s mistake',
    q: 'For 2 + 3 × 4, Dev got 20. WHERE exactly did his thinking go wrong?',
    options: ['He misread the numbers', 'He added before multiplying', 'He forgot the brackets'],
    answer: 1,
    clues: ['Multiplication is stronger than addition', 'Dev did (2 + 3) first and then multiplied by 4', 'There were no brackets in the expression'],
    clueAnswer: 0,
    hints: ['Trace Dev\'s steps: how would someone get 20 from 2 + 3 × 4 ?',
      'Dev did 2 + 3 = 5 first, then 5 × 4 = 20. Which rule does that break?',
      'Multiplication must be done BEFORE addition — Dev reversed the recipe.'],
    sol: 'Dev treated it as (2 + 3) × 4. But multiplication is stronger than addition — it happens first. The clue that proves it: multiplication outranks addition, so 3 × 4 must be done before adding the 2.' },
  { id: 'eq2p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the master blade',
    q: 'Forge the master blade: (4 + 6) ÷ 5 × 2 + 1 = ?',
    answer: 5,
    hints: ['Brackets first — then read LEFT TO RIGHT for ÷ and ×.',
      '(4 + 6) = 10. Then 10 ÷ 5 = 2.',
      'Then 2 × 2 = 4, and finally 4 + 1 = ?'],
    sol: 'Brackets: 4 + 6 = 10. ÷ and × left to right: 10 ÷ 5 = 2, then 2 × 2 = 4. Then +: 4 + 1 = 5. The trap: ÷ and × are EQUAL in rank — you go left to right, not "divide last".' }
] },

/* ------------------------------------------------ L3: CROSSING THE RIVER OF SIGNS */
{ id: 'eq3', name: 'The River of Signs', icon: '🌉', xpBonus: 15,
  tech: { id: 'sides', name: 'Do to one side what you do to the other', icon: '🌉', desc: 'To move a term across the =, do its OPPOSITE to BOTH pans: remove +5 by taking 5 from both sides. The beam stays level.' },
  story: 'The Forge River flows between two banks — the Left Bank and the Right Bank. Weights can cross the river, but there is a toll: a + weight becomes a − weight when it crosses, and a − becomes a +. The river keeps the beam level.',
  puzzles: [
  { id: 'eq3p1', type: 'num', xp: 10, title: 'The toll of crossing',
    q: 'The beam shows x + 5 = 12. You lift 5 blocks OFF the left pan. To keep the beam level, what must you do — and what is x?',
    art: function () { return eqScale('x + 5', '12', true); },
    answer: 7,
    hints: ['Whatever you remove from one pan, remove from the other too.',
      'Take 5 from the right pan as well: 12 − 5.',
      'Left pan: x. Right pan: 12 − 5 = 7. So x = ?'],
    sol: 'x + 5 = 12. Remove 5 blocks from BOTH pans: left becomes x, right becomes 12 − 5 = 7. So x = 7. "Taking 5 across the river" makes it a −5 because you are SUBTRACTING it from both sides.' },
  { id: 'eq3p2', type: 'clue', xp: 10, title: 'Ravi\'s river disaster',
    q: 'Ravi says: "x + 5 = 12, so just carry the 5 across and write x = 12 + 5 = 17." WHY is that wrong?',
    options: ['He added when he should have subtracted', 'He forgot to divide', 'Nothing is wrong — 17 is correct'],
    answer: 0,
    clues: ['Moving +5 across means subtracting 5 from the other side', 'The 5 must be removed from BOTH pans', 'The answer should be bigger than 12'],
    clueAnswer: 0,
    hints: ['Think of the pans. x + 5 sits on the left, 12 on the right. How do you get x alone on the left?',
      'You must REMOVE the 5 — from both pans.',
      'Removing = subtracting. So the 5 crosses the river as a MINUS: x = 12 − 5.'],
    sol: 'The +5 must be removed from both sides — and removing is subtracting. So the toll is a sign flip: x = 12 − 5 = 7. The clue that proves it: crossing with a +5 means SUBTRACTING 5 from the other side.' },
  { id: 'eq3p3', type: 'num', xp: 10, title: 'The sunken weight',
    q: 'x − 4 = 9. A −4 sits on the left pan. What is x? (Hint: what cancels a subtraction?)',
    art: function () { return eqScale('x − 4', '9', true); },
    answer: 13,
    hints: ['To cancel − 4, you must ADD 4 — to both pans.',
      'x − 4 + 4 = x. And 9 + 4 = ?',
      'x = 9 + 4.'],
    sol: 'Cancel the −4 by adding 4 to BOTH pans: x − 4 + 4 = x, and 9 + 4 = 13. A − weight crosses the river as a + weight. That\'s the toll.' },
  { id: 'eq3p4', type: 'draw', xp: 10, title: 'Sketch the move', drawPrompt: 'Draw the balance beam AFTER you remove 4 blocks from both pans — then type what x is.',
    q: 'x + 4 = 10. Draw the beam after removing 4 from BOTH pans, then type x.',
    art: function () { return eqScale('x + 4', '10', true); },
    answer: 6,
    hints: ['Draw two pans. What is left on the left pan after removing 4?',
      'Left pan: just x. Right pan: 10 − 4.',
      'x = 10 − 4 = ?'],
    sol: 'After removing 4 from both pans: left pan shows x alone, right pan shows 10 − 4 = 6. Sketching the pans makes equation moves visible — always draw when unsure!' },
  { id: 'eq3p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the twin banks',
    q: 'x + 7 = 7 + 3. What is x?',
    answer: 3,
    hints: ['The right bank has NO unknown — weigh it out first.',
      'Right: 7 + 3 = 10.',
      'x + 7 = 10 → remove 7 from both → x = ?'],
    sol: 'Right side: 7 + 3 = 10. Then x + 7 = 10, remove 7 from both pans: x = 3. Weigh the known side first, then cross the river.' }
] },

/* ------------------------------------------------ L4: THE GREAT DIVIDE */
{ id: 'eq4', name: 'The Great Divide', icon: '🎒', xpBonus: 15,
  tech: { id: 'undo', name: 'Undo with the Opposite', icon: '🎒', desc: '3x means 3 bags of x. To undo ×3, split BOTH sides into 3 equal groups. To undo ÷2, double both sides. Opposite moves, both pans.' },
  story: 'Nia packs weights into identical bags. 3x means three bags, each holding x. You cannot see inside a bag — but you can split every pan into equal groups and the beam stays level.',
  puzzles: [
  { id: 'eq4p1', type: 'num', xp: 10, title: 'Three mystery bags',
    q: 'Left pan: 3 identical bags, each holding x. Right pan: 12 blocks. Split BOTH pans into 3 equal groups — what is inside each bag?',
    art: function () { return eqScale('3x (3 bags)', '12 (3 groups of 4)', false); },
    answer: 4,
    hints: ['If 3 bags balance 12 blocks, how many blocks balance ONE bag?',
      'Split the right pan into 3 equal groups: 12 ÷ 3.',
      'Each bag x = 12 ÷ 3 = ?'],
    sol: '3x = 12 means three bags balance 12 blocks. Split both sides into 3 equal groups: one bag balances 12 ÷ 3 = 4 blocks. x = 4. "Divide both sides by 3" is just splitting into equal groups.' },
  { id: 'eq4p2', type: 'num', xp: 10, title: 'Half of x',
    q: 'x ÷ 2 = 6. Half of x weighs the same as 6 blocks. What is x?',
    art: function () { return eqScale('x ÷ 2', '6', false); },
    answer: 12,
    hints: ['If HALF of x is 6, what is the WHOLE of x?',
      'Undo "divide by 2" with the opposite: multiply by 2 — on both pans.',
      'x = 6 × 2 = ?'],
    sol: 'x ÷ 2 = 6 says half of x is 6. Undo ÷2 with ×2 on both pans: x = 6 × 2 = 12. Division is undone by doubling.' },
  { id: 'eq4p3', type: 'num', xp: 10, title: 'Five bags of trouble',
    q: '5x = 20. What is x?',
    answer: 4,
    hints: ['5 bags balance 20 blocks. One bag balances…',
      'Split both sides into 5 equal groups: 20 ÷ 5.',
      'x = 20 ÷ 5 = ?'],
    sol: '5x = 20 → split both sides into 5 groups → x = 20 ÷ 5 = 4. Same move every time: undo × with ÷.' },
  { id: 'eq4p4', type: 'clue', xp: 10, title: 'Tara\'s smart move',
    q: '2x = 10. Tara divides BOTH sides by 2 to find x. WHY divide — and not subtract 2?',
    options: ['Because dividing is faster', 'Because 2x means 2 bags — only splitting into groups undoes it', 'Because she wants a smaller answer'],
    answer: 1,
    clues: ['2x means two bags of x — multiplication', 'Subtracting 2 would leave 2x − 2, not x', 'Division splits things into equal groups'],
    clueAnswer: 0,
    hints: ['What does 2x actually mean — "x plus 2" or "2 times x"?',
      '2x is TWO BAGS. Subtracting 2 leaves you with 2 bags minus 2 blocks — still no clean x.',
      'Only splitting both pans into 2 groups (dividing by 2) puts ONE bag alone on the left.'],
    sol: '2x means 2 × x — two bags. Subtracting 2 would give 2x − 2, which is a bag-mix, not x. The undo for × is ÷: divide both sides by 2 → x = 5. The clue that proves it: 2x is multiplication, and only the opposite move undoes it.' },
  { id: 'eq4p5', type: 'num', xp: 20, boss: true, title: 'BOSS: the two-step anvil',
    q: '4x + 2 = 14. Two moves needed! What is x?',
    answer: 3,
    hints: ['First clear the +2 — from both sides.',
      '4x + 2 − 2 = 4x and 14 − 2 = 12. So 4x = 12.',
      'Now split both sides into 4 groups: x = 12 ÷ 4 = ?'],
    sol: 'Step 1: remove the +2 from both pans → 4x = 12. Step 2: split both pans into 4 groups → x = 12 ÷ 4 = 3. Order matters: clear adding first, then split. BODMAS backwards!' }
] },

/* ------------------------------------------------ L5: THE COMMON FACTOR CHEST */
{ id: 'eq5', name: 'The Common Factor Chest', icon: '🧰', xpBonus: 15,
  tech: { id: 'group', name: 'Group What Repeats', icon: '🧰', desc: 'See the same bag or number repeating? Group it: 3x + 3 = 3(x + 1). Fewer groups, same weight.' },
  story: 'The final chest opens only for those who see what REPEATS. Nia\'s packing lists are messy — 3x + 3 means three boxes, each with one bag of x AND one block. Spot the pattern, group it, and the chest opens.',
  puzzles: [
  { id: 'eq5p1', type: 'num', xp: 10, title: 'Three and three and three',
    q: '3 + 3 + 3 = ? × 3. What number goes in the box?',
    answer: 3,
    hints: ['How many times does 3 repeat?',
      '3 repeats 3 times.',
      '3 + 3 + 3 is three groups of 3 → 3 × 3. So ? = 3.'],
    sol: '3 + 3 + 3 = 3 × 3 = 9. Repeated addition IS multiplication — the first step to seeing factors.' },
  { id: 'eq5p2', type: 'num', xp: 10, title: 'Bag plus bag',
    q: '2x + x = 12. Bags of the same kind can join! What is x?',
    answer: 4,
    hints: ['How many bags of x are there in total?',
      '2x + x = 3x.',
      '3x = 12 → split into 3 groups → x = ?'],
    sol: '2x + x = 3 bags of x = 3x. Then 3x = 12 → x = 4. Like terms group: two bags plus one bag is three bags.' },
  { id: 'eq5p3', type: 'clue', xp: 10, title: 'Nia\'s clever packing',
    q: '3x + 3 = 12. Nia rewrites it as 3(x + 1) = 12 — three boxes, each holding (x + 1). WHY does that work?',
    options: ['She made a mistake — you cannot do that', 'Because 3x + 3 is really three copies of (x + 1)', 'Because it makes the numbers smaller'],
    answer: 1,
    clues: ['3x means three bags of x; 3 means three blocks', 'Three bags AND three blocks = three (bag + block) boxes', 'Multiplication distributes over addition'],
    clueAnswer: 1,
    hints: ['Picture it: 3 bags of x AND 3 single blocks. Can you pack them into identical boxes?',
      'Each box gets 1 bag + 1 block: (x + 1) per box, 3 boxes.',
      '3(x + 1) means three boxes of (x + 1) — exactly 3 bags + 3 blocks.'],
    sol: '3x + 3 = three bags + three blocks = three (bag + block) boxes = 3(x + 1). The clue that proves it: three bags and three blocks pack perfectly into three (x + 1) boxes. That\'s taking out the common factor.' },
  { id: 'eq5p4', type: 'num', xp: 10, title: 'Open the box',
    q: '2(x + 4) = 18. What is x?',
    answer: 5,
    hints: ['Two boxes, each holding (x + 4), balance 18. Split both sides into 2 groups first.',
      'x + 4 = 18 ÷ 2 = 9.',
      'Remove 4 from both: x = 9 − 4 = ?'],
    sol: '2(x + 4) = 18 → divide both sides by 2 → x + 4 = 9 → remove 4 → x = 5. Split the boxes first, then clear the blocks.' },
  { id: 'eq5p5', type: 'num', xp: 20, boss: true, title: 'FINAL BOSS: the Equation Forge chest',
    q: '3(x + 2) + 2 = 17. Chain ALL your techniques: split, remove, solve. What is x?',
    answer: 3,
    hints: ['First remove the lone +2 — from both sides.',
      '3(x + 2) = 15. Now split both sides into 3 groups: x + 2 = 5.',
      'Remove 2 from both sides: x = 5 − 2 = ?'],
    sol: 'Step 1: remove +2 from both sides → 3(x + 2) = 15. Step 2: split into 3 groups → x + 2 = 5. Step 3: remove 2 → x = 3. Balance, recipe order, crossing the river, splitting groups — the whole toolkit in one chest. You did it!' }
] }
];

/* ---------- balance beam art ---------- */
function eqScale(leftText, rightText, blocks) {
  var W = 440, base = 170, postX = W / 2;
  var beam = '<line x1="70" y1="52" x2="' + (W - 70) + '" y2="52" stroke="#5c5245" stroke-width="7" stroke-linecap="round"/>';
  var post = '<rect x="' + (postX - 8) + '" y="52" width="16" height="' + (base - 62) + '" fill="#8d6e63" rx="5"/><rect x="' + (postX - 34) + '" y="' + (base - 12) + '" width="68" height="14" fill="#6d6259" rx="6"/>';
  var pinL = '<circle cx="70" cy="52" r="7" fill="#c2410c"/>', pinR = '<circle cx="' + (W - 70) + '" cy="52" r="7" fill="#c2410c"/>';
  function pan(x, label) {
    var s = '<line x1="' + x + '" y1="59" x2="' + (x - 52) + '" y2="96" stroke="#5c5245" stroke-width="4"/>' +
      '<line x1="' + x + '" y1="59" x2="' + (x + 52) + '" y2="96" stroke="#5c5245" stroke-width="4"/>' +
      '<path d="M' + (x - 62) + ' 96 L' + (x + 62) + ' 96 L' + (x + 48) + ' 122 L' + (x - 48) + ' 122 Z" fill="#fbf4e4" stroke="#5c5245" stroke-width="3.5"/>' +
      '<text x="' + x + '" y="' + (112) + '" font-size="19" font-weight="800" text-anchor="middle" fill="#2b2620">' + label + '</text>';
    return s;
  }
  return '<svg viewBox="0 0 ' + W + ' ' + (base + 10) + '" style="max-width:440px">' + post + beam + pinL + pinR + pan(70, leftText) + pan(W - 70, rightText) + '</svg>';
}

/* ---------- the quest app (mounts inside math-champ, uses OC) ---------- */
(function () {
  'use strict';
  var view = { page: 'home' }, P = null, t0 = 0;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>'); }

  function qState(id) {
    var S = OC.STATE;
    S.quest = S.quest || {};
    return (S.quest[id] = S.quest[id] || { done: false, stars: 0, used: [], journal: [] });
  }
  function save() { OC.save(); }
  function levelById(id) { for (var i = 0; i < EQ_LEVELS.length; i++) if (EQ_LEVELS[i].id === id) return EQ_LEVELS[i]; return null; }
  function unlocked(i) { return i === 0 || !!(OC.STATE.quest && OC.STATE.quest[EQ_LEVELS[i - 1].id] && OC.STATE.quest[EQ_LEVELS[i - 1].id].done); }

  function techs() { return EQ_LEVELS.map(function (L) { return { t: L.tech, on: !!(OC.STATE.quest && OC.STATE.quest[L.id] && OC.STATE.quest[L.id].done) }; }); }

  function render() {
    var app = $('q-app'); if (!app) return;
    app.innerHTML = view.page === 'home' ? homeHTML() : caseHTML();
    window.scrollTo(0, 0);
  }

  function homeHTML() {
    var cards = EQ_LEVELS.map(function (Q, i) {
      var st = (OC.STATE.quest || {})[Q.id] || { done: false, stars: 0, used: [] };
      var ok = unlocked(i);
      return '<div class="qq-card' + (ok ? '' : ' locked') + (st.done ? ' done' : '') + '" onclick="' + (ok ? "qOpen('" + Q.id + "')" : 'qLocked()') + '">' +
        '<div class="qq-icon">' + (ok ? Q.icon : '🔒') + '</div><div class="qq-body"><b>Level ' + (i + 1) + ': ' + Q.name + '</b>' +
        '<span class="qq-tech">' + Q.tech.icon + ' ' + Q.tech.name + '</span>' +
        '<span class="qq-st">' + (st.done ? '🏆 mastered' : (st.used.length ? '⭐ ' + st.used.length + '/5 solved' : 'start the quest')) + '</span></div>' +
        '<div class="qq-go">' + (st.done ? '🏅' : (ok ? '▶' : '')) + '</div></div>';
    }).join('');
    var shelf = techs().map(function (x) {
      return '<div class="qq-tech-chip' + (x.on ? '' : ' off') + '"><span>' + x.t.icon + '</span><div><b>' + x.t.name + '</b><span>' + (x.on ? esc(x.t.desc) : 'master the level to unlock') + '</span></div></div>';
    }).join('');
    return '<h1 style="text-align:center">⛏️ Technique Quests</h1>' +
      '<p style="text-align:center;color:#7a6f60;margin:0 0 16px">Hands-on cases that teach <b>how equations really work</b> — no lesson first, just the balance beam and you.</p>' +
      '<div class="qq-grid">' + cards + '</div>' +
      '<p class="qq-label">🧰 Equation techniques</p>' +
      '<div class="qq-techgrid">' + shelf + '</div>';
  }

  function caseHTML() {
    var Q = levelById(view.lid); if (!Q) return homeHTML();
    var st = qState(Q.id);
    if (view.phase === 'intro')
      return '<div class="qq-case" style="text-align:center"><div class="qq-icon big">' + Q.icon + '</div><h2>' + Q.name + '</h2>' +
        '<p style="line-height:1.55">' + Q.story + '</p>' +
        '<p style="color:#7a6f60">5 challenges. ' + Q.tech.icon + ' technique: <b>' + Q.tech.name + '</b></p>' +
        '<button class="qq-btn" onclick="qStart()">Start the quest ▶</button></div>';
    if (view.phase === 'done')
      return '<div class="qq-case" style="text-align:center;border-color:#9ccc65;background:linear-gradient(160deg,#f1f8e9,#fffdf7 60%)">' +
        '<div class="qq-icon big">🏆</div><h2>Technique mastered!</h2>' +
        '<div class="qq-techcard">' + Q.tech.icon + ' <b>' + Q.tech.name + '</b><br><span style="font-size:15px;color:#7a6f60">' + Q.tech.desc + '</span></div>' +
        '<p style="color:#7a6f60">Tell your guru how you cracked it — one line:</p>' +
        '<textarea id="qq-note" rows="2" placeholder="I cracked it by…"></textarea>' +
        '<div style="margin-top:8px"><button class="qq-btn sec" onclick="qSaveNote()">Save my note</button> <span id="qq-note-ok" style="color:#7a6f60"></span></div>' +
        '<div style="margin-top:16px"><button class="qq-btn" onclick="qHome()">Back to the quests ⚒️</button></div></div>';
    var pz = Q.puzzles[view.pi];
    var dots = Q.puzzles.map(function (p, i) {
      var done = st.used.indexOf(p.id) >= 0;
      return '<span class="qq-dot' + (done ? ' done' : '') + (i === view.pi ? ' cur' : '') + '">' + (done ? '✓' : (p.boss ? '★' : i + 1)) + '</span>';
    }).join('');
    return '<div class="qq-case"><div class="qq-dotrow">' + dots + '<span class="qq-name">' + Q.icon + ' ' + Q.name + '</span></div>' +
      '<h2>' + (pz.boss ? '⭐ ' : '') + esc(pz.title) + '</h2>' +
      (pz.story ? '<p style="line-height:1.5">' + pz.story + '</p>' : '') +
      (pz.art ? '<div style="text-align:center;margin:10px 0">' + pz.art() + '</div>' : '') +
      '<p style="font-weight:800;line-height:1.5">' + pz.q + '</p>' +
      '<div id="qq-area"></div><div id="qq-fb"></div><div id="qq-hints"></div>' +
      '<div class="qq-actions"><button class="qq-btn" onclick="qCheck()">✓ Check</button>' +
      '<button class="qq-btn sec" onclick="qHint()">💡 Hint</button></div>' +
      '<button class="qq-btn tiny sec" onclick="qSolution()">Show me how a champion thinks</button></div>';
  }

  function startPuzzle(pi) {
    var Q = levelById(view.lid);
    view.phase = 'pz'; view.pi = pi; t0 = Date.now();
    P = { wrong: 0, hints: 0, sol: false, seq: [], answerVal: -1, cluePick: -1 };
    render(); drawArea();
  }

  function drawArea() {
    var area = $('qq-area'); if (!area) return;
    var pz = levelById(view.lid).puzzles[view.pi];
    var h = '';
    if (pz.type === 'num' || pz.type === 'draw') {
      h = '<div class="qq-ansrow"><input id="qq-in" class="qq-in" type="number" inputmode="decimal" autocomplete="off" placeholder="type the number…">' +
        '<button class="qq-btn" id="qq-go" onclick="qCheck()">✓</button></div>';
    } else if (pz.type === 'mcq') {
      h = '<div class="qq-opts">' + pz.options.map(function (o, i) { return '<button class="qq-opt' + (P.answerVal === i ? ' sel' : '') + '" onclick="qPick(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else if (pz.type === 'clue') {
      h = '<div class="qq-opts">' + pz.options.map(function (o, i) { return '<button class="qq-opt' + (P.answerVal === i ? ' sel' : '') + '" onclick="qPick(' + i + ')">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<p class="qq-clueq">Now tap the clue that PROVES it:</p><div class="qq-opts">' +
        pz.clues.map(function (c, i) { return '<button class="qq-opt' + (P.cluePick === i ? ' sel' : '') + '" onclick="qPickClue(' + i + ')">' + esc(c) + '</button>'; }).join('') + '</div>';
    } else if (pz.type === 'order') {
      h = '<p style="color:#7a6f60;font-size:15px">Tap the cards in order. Made a mistake? Use ⌫.</p>' +
        '<div class="qq-slots">' + pz.answer.map(function (id, i) {
          var it = itemById(pz, P.seq[i]);
          return '<div class="qq-slot' + (it ? ' full' : '') + '">' + (it ? it.t : (i + 1)) + '</div>';
        }).join('') + '</div>' +
        '<div class="qq-opts">' + pz.items.map(function (it) {
          var used = P.seq.indexOf(it.id) >= 0;
          return '<button class="qq-opt' + (used ? ' used' : '') + '" onclick="qTap(\'' + it.id + '\')">' + it.t + '</button>';
        }).join('') + '</div>' +
        '<div class="qq-actions"><button class="qq-btn tiny sec" onclick="qUndo()">⌫ undo</button></div>';
    }
    if (pz.type === 'draw')
      h = '<div style="text-align:center;margin:10px 0"><canvas id="qq-pad" class="qq-pad" width="420" height="230"></canvas><br><button class="qq-btn tiny sec" onclick="qClearPad()">🧽 Clear</button></div>' +
        (pz.drawPrompt ? '<p style="color:#7a6f60;font-size:15px;text-align:center">' + pz.drawPrompt + '</p>' : '') + h;
    area.innerHTML = h;
    if (pz.type === 'draw') initPad();
    var inp = $('qq-in');
    if (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') qCheck(); }); inp.focus(); }
  }

  function itemById(pz, id) { for (var i = 0; i < pz.items.length; i++) if (pz.items[i].id === id) return pz.items[i]; return null; }

  window.qPick = function (i) { P.answerVal = i; drawArea(); };
  window.qPickClue = function (i) { P.cluePick = i; drawArea(); };
  window.qTap = function (id) { var pz = levelById(view.lid).puzzles[view.pi]; if (P.seq.indexOf(id) < 0 && P.seq.length < pz.answer.length) { P.seq.push(id); drawArea(); } };
  window.qUndo = function () { P.seq.pop(); drawArea(); };
  window.qClearPad = function () { var c = $('qq-pad'); if (c) { var x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); } };
  function initPad() {
    var c = $('qq-pad'); if (!c) return;
    var x = c.getContext('2d'), d = false;
    function pos(e) { var r = c.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return [(t.clientX - r.left) * (c.width / r.width), (t.clientY - r.top) * (c.height / r.height)]; }
    function st(e) { d = true; x.beginPath(); var p = pos(e); x.moveTo(p[0], p[1]); e.preventDefault(); }
    function mv(e) { if (!d) return; var p = pos(e); x.lineTo(p[0], p[1]); x.strokeStyle = '#c2410c'; x.lineWidth = 3.5; x.lineCap = 'round'; x.stroke(); e.preventDefault(); }
    c.addEventListener('mousedown', st); c.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', function () { d = false; });
    c.addEventListener('touchstart', st, { passive: false }); c.addEventListener('touchmove', mv, { passive: false }); c.addEventListener('touchend', function () { d = false; });
  }

  function fb(msg, wrong, win) {
    var el = $('qq-fb'); if (!el) return;
    el.innerHTML = '<div class="qq-fb' + (win ? ' win' : wrong ? ' bad' : ' info') + '">' + msg + '</div>';
  }
  function revealHint() {
    var pz = levelById(view.lid).puzzles[view.pi], el = $('qq-hints');
    if (!el) return;
    if (P.hints < pz.hints.length) { el.innerHTML += '<div class="qq-hint">💡 ' + pz.hints[P.hints] + '</div>'; P.hints++; }
    else el.innerHTML += '<div class="qq-hint">💡 Stuck? Peek at how a champion thinks below — it still counts!</div>';
  }
  window.qHint = function () { revealHint(); };

  window.qCheck = function () {
    var Q = levelById(view.lid), pz = Q.puzzles[view.pi], st = qState(Q.id);
    if (st.used.indexOf(pz.id) >= 0) { qNext(); return; }
    var main = null, clue = -1;
    if (pz.type === 'mcq') main = P.answerVal >= 0 ? P.answerVal : null;
    else if (pz.type === 'order') main = P.seq.length ? P.seq : null;
    else if (pz.type === 'clue') { main = pz.options ? (P.answerVal >= 0 ? P.answerVal : null) : (($('qq-in') || {}).value || null); clue = P.cluePick; }
    else { var i2 = $('qq-in'); main = i2 ? i2.value : null; }
    if (main === null || main === undefined || String(main).trim() === '') { fb('Pick an answer first! 🙂'); return; }
    if (pz.type === 'clue' && clue < 0) { fb('Two parts! Choose your answer AND the clue that proves it.'); return; }

    var good;
    if (pz.type === 'order') good = main.join('|') === pz.answer.join('|');
    else good = parseFloat(main) === pz.answer;
    if (pz.type === 'clue' && good) good = (clue === pz.clueAnswer);

    if (!good) {
      P.wrong++;
      if (pz.type === 'clue' && pz.options && parseFloat(main) !== pz.answer) fb('Hmm — check the first part of your answer, then the evidence! 🤔', true);
      else if (pz.type === 'clue') fb('Your ANSWER is right… but that clue doesn\'t PROVE it. Read between the lines! 🔍', true);
      else fb('Not yet — every wrong try sharpens you. Here\'s a hint 👇', true);
      revealHint();
      return;
    }
    /* solved */
    var xp = pz.xp + (P.wrong === 0 ? 5 : P.wrong <= 2 ? 2 : 0);
    var stars = P.sol ? 1 : (P.wrong === 0 ? 3 : P.wrong <= 2 ? 2 : 1);
    st.used.push(pz.id); st.stars += stars;
    OC.record({ kind: 'quest', id: pz.id, title: 'Equation Forge · ' + pz.title, correct: true, timeSec: Math.max(1, Math.round((Date.now() - t0) / 1000)), targetSec: 120, xp: xp });
    save();
    fb('✅ Forged! +' + xp + ' XP · ' + stars + '⭐' + (P.wrong === 0 ? ' — flawless!' : ''), false, true);
    $('qq-area').innerHTML = '<div class="qq-won"><p>' + pz.sol + '</p>' +
      (view.pi + 1 < Q.puzzles.length ? '<button class="qq-btn" onclick="qNext()">Next challenge →</button>' : '<button class="qq-btn" onclick="qFinish()">Master the technique! 🏆</button>') + '</div>';
    $('qq-hints').innerHTML = '';
  };

  window.qNext = function () {
    var Q = levelById(view.lid), st = qState(Q.id);
    for (var i = 0; i < Q.puzzles.length; i++) if (st.used.indexOf(Q.puzzles[i].id) < 0) { startPuzzle(i); return; }
    qFinish();
  };
  window.qFinish = function () {
    var Q = levelById(view.lid), st = qState(Q.id);
    if (!st.done) {
      st.done = true;
      OC.record({ kind: 'quest', id: Q.id + '-bonus', title: 'Equation Forge · ' + Q.name + ' mastered', correct: true, timeSec: 30, targetSec: 120, xp: Q.xpBonus });
      save();
    }
    view.phase = 'done'; render();
  };
  window.qSaveNote = function () {
    var Q = levelById(view.lid), st = qState(Q.id), t = $('qq-note');
    if (t && t.value.trim()) { st.journal.push({ ts: Date.now(), text: t.value.trim().slice(0, 200) }); if (st.journal.length > 40) st.journal = st.journal.slice(-40); save(); }
    $('qq-note-ok').textContent = 'Saved to the case file 📁';
  };
  window.qSolution = function () {
    var pz = levelById(view.lid).puzzles[view.pi];
    P.sol = true;
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(43,38,32,.45);z-index:95;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML = '<div style="background:#fffdf7;border-radius:18px;padding:22px;max-width:480px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.25)">' +
      '<h3 style="margin:0 0 8px;font-family:var(--font-display)">🧠 How a champion thinks</h3>' +
      '<p style="line-height:1.55">' + pz.sol + '</p>' +
      '<p style="color:#7a6f60">Now answer it yourself — using a worked example is how technique is built!</p>' +
      '<button class="qq-btn" style="margin-top:8px" onclick="this.closest(\'div[style*=fixed]\').remove()">Got it!</button></div>';
    document.body.appendChild(ov);
  };
  window.qHome = function () { view = { page: 'home' }; render(); };
  window.qOpen = function (id) {
    view = { page: 'case', lid: id, phase: 'intro', pi: 0 };
    var st = qState(id);
    if (st.used.length && !st.done) { view.phase = 'pz'; render(); qNext(); return; }
    if (st.done) { view.phase = 'done'; render(); return; }
    render();
  };
  window.qStart = function () { startPuzzle(0); };
  window.qLocked = function () { fb2(); };
  function fb2() {
    var el = $('q-app');
    var d = document.createElement('div'); d.className = 'qq-fb info'; d.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:99';
    d.textContent = '🔒 Master the level before it to unlock this one!';
    el.appendChild(d); setTimeout(function () { d.remove(); }, 2600);
  }

  /* test hook */
  window.EQ = { levels: EQ_LEVELS, open: qOpen, start: qStart, next: qNext, check: qCheck, state: function () { return P; }, view: function () { return view; }, finish: qFinish, qState: qState };

  render();
})();
