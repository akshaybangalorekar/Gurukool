/* ============================================================
   WORD-CHAMP - the English strand.

   Spelling, grammar, punctuation and comprehension, the four things
   every exam tests and the four things school marks. Built the same
   way as the maths generators, so the same session engine drives it.

   Each question carries: the question, the answer, two nudges, what
   we know, and the RULE being used - because English is rules, not
   guesswork, and the rule is what he should remember.
   ============================================================ */
(function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a two-choice spelling or grammar question: exactly one is right */
  function choose(q, right, wrong, rule, hint, why) {
    var pair = shuffle([right, wrong]);
    return {
      q: q, ans: right, unit: '', choices: pair,
      know: ['Only one of these is correct', 'The rule: ' + rule],
      hints: [hint, 'The rule: ' + rule],
      sol: '"' + right + '" is correct. ' + why + ' The rule: ' + rule + '.'
    };
  }

  /* ---------- COMPREHENSION: real passages, three questions each ---------- */
  var PASSAGES = [
    { title: 'The Kite', text: 'Arjun had built the kite himself, taping the paper to a frame of thin bamboo. It was not beautiful. The tail was crooked and the paper was the wrong blue. But when the wind took it, the kite climbed as if it had been waiting all afternoon for exactly that gust. Arjun let out the string until his arms ached, and still it pulled.',
      qs: [
        { q: 'How did Arjun feel about the kite he made? Type one word: proud or ashamed.', ans: 'proud', kind: 'inference' },
        { q: 'What does the phrase "as if it had been waiting all afternoon" suggest about the kite? Type: eager or broken.', ans: 'eager', kind: 'vocabulary' },
        { q: 'Why did Arjun let out the string until his arms ached? Type: the kite pulled hard or the kite was small.', ans: 'the kite pulled hard', kind: 'literal' }
      ] },
    { title: 'The Last Bus', text: 'Meera ran the whole way to the stop, her school bag thumping against her back. The bus was still there, its engine idling. She raised her hand. The driver, a man with grey at his temples, looked at her for a long moment — and then he opened the door.',
      qs: [
        { q: 'Why did the driver wait before opening the door? Type: he was deciding whether to or he was asleep.', ans: 'he was deciding whether to', kind: 'inference' },
        { q: 'The engine was "idling". What does that mean? Type: running while standing still or switched off.', ans: 'running while standing still', kind: 'vocabulary' },
        { q: 'Where was Meera going? Type: to the bus stop or to school.', ans: 'to the bus stop', kind: 'literal' }
      ] },
    { title: 'The Water Tank', text: 'The tank on the roof had a crack no wider than a hair. Every day it lost a little water, and every day the family filled it again without noticing. It was only in the summer, when the well ran low, that anyone thought to look up.',
      qs: [
        { q: 'Why did nobody notice the crack at first? Type: it was very small or it was very loud.', ans: 'it was very small', kind: 'literal' },
        { q: 'What does the story suggest about small problems? Type: they grow if ignored or they fix themselves.', ans: 'they grow if ignored', kind: 'inference' },
        { q: 'In the summer "the well ran low". What does that mean? Type: there was little water left or the well was broken.', ans: 'there was little water left', kind: 'vocabulary' }
      ] },
    { title: 'The Cartographer', text: 'For forty years, Devi drew maps of the same valley. Villagers laughed: the river had not moved, the hills had not changed. Devi kept drawing. When the flood came and the river did move, it was her oldest map, and her newest, that showed everyone where the new channel would go.',
      qs: [
        { q: 'Why did the villagers laugh at Devi? Type: they thought her work was pointless or they thought she was rich.', ans: 'they thought her work was pointless', kind: 'inference' },
        { q: 'What does "the river did move" mean here? Type: it changed its course or it walked away.', ans: 'it changed its course', kind: 'vocabulary' },
        { q: 'What does the story say about patient work? Type: it pays off in the end or it is a waste of time.', ans: 'it pays off in the end', kind: 'inference' }
      ] }
  ];

  var TOPICS = [
    { key: 'spelling', name: 'Spelling', icon: '\u270f\ufe0f', blurb: 'The patterns behind tricky words.',
      gen: {
        easy: function () { return pick([
          function () { return choose('Which is spelled correctly?', 'receive', 'recieve', 'i before e, except after c', 'Think of the c in receive.', 'After a c, the e comes before the i.'); },
          function () { return choose('Which is spelled correctly?', 'separate', 'seperate', 'separate has "a rat" in the middle', 'There is a rat in sep-a-rate.', 'Sep-a-rate: the middle is "par", with an a.'); },
          function () { return choose('Which is spelled correctly?', 'definitely', 'definately', 'definitely has "finite" inside it', 'Look for the word finite.', 'De-finite-ly: it contains "finite".'); },
          function () { return choose('Which is spelled correctly?', 'necessary', 'neccessary', 'necessary has one c and two s', 'One collar, two sleeves.', 'One c, two s: ne-ces-sa-ry.'); },
          function () { return choose('Which is spelled correctly?', 'occurred', 'occured', 'short words double the last letter before -ed', 'Occur is short, so the r doubles.', 'Oc-cur-red: the r doubles before -ed.'); }
        ])(); },
        medium: function () { return pick([
          function () { return choose('What is the plural of "child"?', 'children', 'childs', 'some plurals are irregular', 'It is not made with an s.', 'Child becomes children - an old plural that survived.'); },
          function () { return choose('What is the plural of "leaf"?', 'leaves', 'leafs', 'words ending in f often change to ves', 'Think of leaf and shelf.', 'Leaf, shelf, half all change f to ves.'); },
          function () { return choose('Which is spelled correctly?', 'decision', 'decition', 'words from verbs ending in -de take -sion', 'Decide becomes deci-sion.', 'Decide to decision: the -de turns into -sion.'); },
          function () { return choose('Which is spelled correctly?', 'television', 'televition', 'the ending is -sion', 'Say it aloud: tele-vizh-un.', 'The sound "zhun" is written -sion.'); },
          function () { return choose('What is the plural of "knife"?', 'knives', 'knifes', 'words ending in fe often change to ves', 'Think of wife and life.', 'Knife, wife, life all change fe to ves.'); }
        ])(); },
        hard: function () { return pick([
          function () { return choose('Which letter is silent in "knife"?', 'k', 'n', 'some letters are written but not said', 'Say knife aloud.', 'The k is not pronounced - it is a very old spelling.'); },
          function () { return choose('Which letter is silent in "island"?', 's', 'l', 'some letters are written but not said', 'Say island aloud: eye-land.', 'The s is silent; the word comes from the Latin insula.'); },
          function () { return choose('Which letter is silent in "comb"?', 'b', 'm', 'some letters are written but not said', 'Say comb aloud.', 'The b is silent, as in bomb and thumb.'); },
          function () { return choose('Which is spelled correctly?', 'accommodate', 'accomodate', 'accommodate has two c and two m', 'It has room for two of each.', 'Two c and two m - the word has room for both.'); },
          function () { return choose('Which is spelled correctly?', 'rhythm', 'rythm', 'rhythm has no ordinary vowel', 'It uses y as the vowel sound.', 'Rhythm is one of the few words with no a, e, i, o or u.'); }
        ])(); }
      } },

    { key: 'grammar', name: 'Grammar', icon: '\ud83d\udd27', blurb: 'Sentences that agree with themselves.',
      gen: {
        easy: function () { return pick([
          function () { return choose('Choose the right word: "He ___ to school every day."', 'goes', 'go', 'he, she, it take the -s form', 'Who is doing it? Just one person.', 'He goes: with he, she or it the verb takes an s.'); },
          function () { return choose('Choose the right word: "They ___ playing outside."', 'are', 'is', 'plural subjects take "are"', 'How many people?', 'They are: a plural subject takes are.'); },
          function () { return choose('Choose the right word: "Yesterday I ___ to the park."', 'went', 'go', 'the past tense is needed', 'Yesterday means it already happened.', 'Yesterday I went: past tense for something already done.'); },
          function () { return choose('Choose the right article: "___ apple a day keeps the doctor away."', 'An', 'A', 'use "an" before a vowel sound', 'Say the next word aloud.', 'An apple: before a vowel sound we write an.'); },
          function () { return choose('Choose the right word: "The cat sat on ___ mat."', 'its', 'it\u2019s', '"its" shows belonging, "it\'s" means it is', 'Does "it is" fit the sentence?', 'Its mat: it belongs to the cat, so no apostrophe.'); }
        ])(); },
        medium: function () { return pick([
          function () { return choose('Choose the right word: "The list of names ___ long."', 'is', 'are', 'the subject is "list", not "names"', 'Find the main subject, not the nearest word.', 'The subject is the list (singular), so it is "is".'); },
          function () { return choose('Choose the right word: "Neither of the boys ___ finished."', 'has', 'have', 'neither is singular', 'Neither means not one.', 'Neither is singular, so it takes has.'); },
          function () { return choose('Choose the right word: "This is between you and ___."', 'me', 'I', 'after a preposition use me', 'It follows the word "and".', 'Between you and me: after a preposition, use me.'); },
          function () { return choose('Choose the right word: "This is the ___ of the two books."', 'better', 'best', 'comparing TWO things uses better', 'How many books are being compared?', 'Two things are compared, so it is better, not best.'); },
          function () { return choose('Choose the right word: "She is good ___ mathematics."', 'at', 'in', 'the fixed phrase is "good at"', 'Which little word sounds right?', 'Good at: a fixed phrase, learnt as a whole.'); }
        ])(); },
        hard: function () { return pick([
          function () { return choose('Choose the right word: "If I ___ rich, I would travel the world."', 'were', 'was', 'after "if" for an unreal situation, use were', 'It is not true - he is not rich.', 'If I were: for something imagined, English keeps were.'); },
          function () { return choose('Choose the right word: "Hardly had I arrived ___ it began to rain."', 'when', 'than', 'hardly ... when is the fixed pair', '"Hardly" pairs with which word?', 'Hardly had ... when: the pair is hardly and when.'); },
          function () { return choose('Choose the right word: "She is one of the girls who ___ hardest."', 'work', 'works', 'the "who" refers to the girls (plural)', 'Who does "who" stand for?', 'The who stands for the girls, so the verb is work.'); },
          function () { return choose('Choose the right word: "The book, along with the maps, ___ on the shelf."', 'sits', 'sit', 'the subject is "book"; the extra phrase does not change it', 'Cross out the words between the commas.', 'Take out "along with the maps" and the subject is the book: it sits.'); }
        ])(); }
      } },

    { key: 'punctuation', name: 'Punctuation', icon: '\u2757', blurb: 'Marks that change the meaning.',
      gen: {
        easy: function () { return pick([
          function () { return choose('Which sentence is written correctly?', 'My name is Atharv.', 'my name is atharv.', 'sentences and names take capital letters', 'What two things need a capital?', 'The start of a sentence and a name both take capitals.'); },
          function () { return choose('Which sentence needs a question mark?', 'What time is it', 'I like cake', 'a question ends with ?', 'Which one is asking something?', 'A question always ends with a question mark.'); },
          function () { return choose('Which sentence is correct?', 'We went to Delhi in June.', 'we went to delhi in june.', 'places and months take capital letters', 'Two more capitals are missing.', 'Delhi and June are names, so they take capitals.'); }
        ])(); },
        medium: function () { return pick([
          function () { return choose('Choose the correct punctuation: "The ___ toys were everywhere."', 'children\u2019s', 'childrens', 'a plural that does not end in s takes \u2019s', 'The word children is already plural.', 'Children is plural without an s, so the apostrophe goes before the s: children\u2019s.'); },
          function () { return choose('Choose the correct word: "___ raining again."', 'It\u2019s', 'Its', 'It\u2019s means "it is"', 'Say it out loud as two words.', 'It\u2019s raining = it is raining, so the apostrophe is needed.'); },
          function () { return choose('One dog owns the bone. Which is correct?', 'the dog\u2019s bone', 'the dogs\u2019 bone', 'one owner puts the apostrophe before the s', 'How many dogs are there?', 'One dog: the apostrophe goes before the s.'); },
          function () { return choose('Which sentence is punctuated correctly?', 'We bought apples, oranges and pears.', 'We bought apples oranges and pears.', 'items in a list are separated by commas', 'Three things are being listed.', 'A list of three or more items takes commas between them.'); }
        ])(); },
        hard: function () { return pick([
          function () { return choose('Which sentence is punctuated correctly?', '"Come here," said Mother.', '"Come here" said Mother.', 'speech is closed with a comma before the reporting words', 'The words said Mother follow the speech.', 'The spoken words are closed with a comma inside the speech marks.'); },
          function () { return choose('Which sentence is punctuated correctly?', 'I need three things: flour, milk and eggs.', 'I need three things, flour, milk and eggs.', 'a colon introduces a list', 'What is the list being introduced by?', 'A colon introduces a list; commas would blur it.'); },
          function () { return choose('Which sentence is punctuated correctly?', 'It was raining; we stayed inside.', 'It was raining, we stayed inside.', 'a semicolon joins two complete sentences', 'Both halves could stand alone.', 'Two full sentences are joined by a semicolon, not a comma.'); }
        ])(); }
      } },

    { key: 'comprehension', name: 'Comprehension', icon: '\ud83d\udcd6', blurb: 'Reading closely, and proving it.',
      gen: {
        /* every tier can draw on any passage, so the bank is deep enough that
           a session never has to repeat a question */
        easy: function () { return passage(ri(0, PASSAGES.length - 1)); },
        medium: function () { return passage(ri(0, PASSAGES.length - 1)); },
        hard: function () { return passage(ri(0, PASSAGES.length - 1)); }
      } },

    { key: 'vocabulary', name: 'Word meanings', icon: '\ud83d\udd0d', blurb: 'Synonyms, opposites and words in context.',
      gen: {
        easy: function () { return pick([
          function () { return choose('Which word means the same as "happy"?', 'glad', 'angry', 'synonyms mean the same', 'Think of a word you would use instead.', 'Glad and happy mean the same thing.'); },
          function () { return choose('Which word is the opposite of "ancient"?', 'modern', 'old', 'antonyms are opposites', 'Ancient means very old.', 'Modern is the opposite of ancient.'); },
          function () { return choose('Which word means the same as "begin"?', 'start', 'stop', 'synonyms mean the same', 'What do you do at the start?', 'Begin and start mean the same.'); }
        ])(); },
        medium: function () { return pick([
          function () { return choose('Which word is the opposite of "generous"?', 'stingy', 'kind', 'antonyms are opposites', 'A generous person shares a lot.', 'Stingy is the opposite of generous.'); },
          function () { return choose('In "the argument was fierce", what does "fierce" mean?', 'very strong', 'very quiet', 'read the word in its sentence', 'Would a quiet argument be fierce?', 'Fierce means very strong or intense.'); },
          function () { return choose('Which word means the same as "enormous"?', 'huge', 'tiny', 'synonyms mean the same', 'Think of something really big.', 'Enormous and huge mean the same.'); }
        ])(); },
        hard: function () { return pick([
          function () { return choose('In "she gave a curt reply", what does "curt" mean?', 'short and abrupt', 'long and kind', 'read the word in its sentence', 'Would a long reply be called curt?', 'Curt means short to the point of being rude.'); },
          function () { return choose('Which word is closest in meaning to "reluctant"?', 'unwilling', 'eager', 'close in meaning', 'If you are reluctant, do you want to?', 'Reluctant means unwilling to do something.'); },
          function () { return choose('In "the evidence was flimsy", what does "flimsy" mean?', 'weak and easy to doubt', 'solid and convincing', 'read the word in its sentence', 'Would solid evidence be doubted?', 'Flimsy means weak, easy to knock down.'); }
        ])(); }
      } }
  ];

  /* a comprehension question always shows its passage */
  function passage(i) {
    var p = PASSAGES[i % PASSAGES.length];
    var q = pick(p.qs);
    return {
      q: q.q, ans: q.ans, unit: '', art: '<div class="wc-passage"><b>' + p.title + '</b><p>' + p.text + '</p></div>',
      know: ['Read the passage before answering', 'The answer is in the passage, or follows from it'],
      hints: ['Read the whole passage once, then look for the sentence that answers this.', 'The answer is written in the passage \\u2014 find the words that prove it.'],
      sol: 'The answer is \"' + q.ans + '\". ' + (q.kind === 'inference' ? 'This one asks you to work it out from what happens in the passage, not just find a word.' : (q.kind === 'vocabulary' ? 'This one asks what a phrase means in this sentence, so read the words around it.' : 'This one is answered directly in the passage \u2014 find the sentence that proves it.'))
    };
  }

  window.EngGen = {
    topics: TOPICS,
    byKey: function (k) { for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].key === k) return TOPICS[i]; return null; },
    make: function (key, tier) {
      var t = window.EngGen.byKey(key) || TOPICS[0];
      var g = t.gen[tier] || t.gen.easy;
      var q = g();
      q.topic = t.key; q.topicName = t.name; q.tier = tier;
      return q;
    },
    randomTier: function () { return pick(['easy', 'easy', 'medium', 'medium', 'hard']); }
  };
})();
