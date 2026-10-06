/* ============================================================
   MIND-CHAMP - BUILD SOMETHING REAL
   Four real logic problems, each one worked out step by step:

     timetable - elimination and cross-off, the way computers do it
     seating   - a logic grid in real clothes
     powercut  - two reports that contradict, and what that proves
     busroute  - times, waits and a choice you can defend

   Each step teaches one move, then asks one question about THIS
   problem. Every answer is worked out, never guessed.
   ============================================================ */
(function () {

  var LIST = [
    { key: 'timetable', icon: '\ud83d\udcc5', title: 'The school timetable clash', status: 'ready',
      hook: 'Six lessons, five teachers, and rules that seem to fight each other. Work out the timetable.',
      needs: ['elimination'],
      steps: [
        { title: 'Start with what is pinned down',
          say: 'A logic problem always has a few facts that are nailed to one place. Find those first and the rest falls into line. Here: Sport must be the LAST period (period 6). Ms Rao teaches Maths and must have period 1. Art is period 5. English is period 3.',
          anim: null,
          ask: 'How many lessons have their exact period fixed straight away: Sport, Maths, Art and English? Type a number.',
          ans: 4, hint: 'Count the lessons the rules pin down exactly.',
          sol: 'Four: Sport 6, Maths 1, Art 5, English 3. Always collect the fixed points before anything else \\u2014 they cut the problem down fast.' },
        { title: 'Use "immediately after"',
          say: 'Some rules do not name a period, they name a neighbour. Science must come IMMEDIATELY AFTER Maths. Maths is period 1, so Science has nowhere else to go.',
          anim: null,
          ask: 'Science comes immediately after Maths, and Maths is period 1. Which period is Science? Type a number.',
          ans: 2, hint: 'One after period 1.',
          sol: 'Period 2. A neighbour rule is just as strong as a fixed rule \\u2014 it pins a lesson to exactly one place.' },
        { title: 'Now only one gap is left',
          say: 'Look at what you have: 1 Maths, 2 Science, 3 English, 5 Art, 6 Sport. Six lessons, and only one period has no lesson.',
          anim: null,
          ask: 'Which lesson must fill the only empty period? Type its name.',
          ans: 'history', hint: 'Which lesson have you not placed yet?',
          sol: 'History \\u2014 period 4. Once you have placed five of six lessons, the last one has only one home. That is elimination, and it is how a computer solves a timetable too.' },
        { title: 'Check the whole plan',
          say: 'Never hand in a plan you have not checked. Go through every rule and tick it off. Here is a trap worth noticing: a rule about teachers is usually "not two places at once", not "not two in a row".',
          anim: null,
          ask: 'Ms Rao teaches Maths in period 1 and Science in period 2. Does that break the rule about teachers? Type yes or no.',
          ans: 'no', hint: 'Is she in two places at the same time?',
          sol: 'No. She teaches one lesson at a time \\u2014 back-to-back is perfectly fine. The rule is only that no teacher is in two rooms at once. Reading the rule exactly is half of logic.' }
      ] },

    { key: 'seating', icon: '\ud83c\udf70', title: 'The wedding seating plan', status: 'ready',
      hook: 'Six guests, three tables, and people who must not sit together. A logic grid in real clothes.',
      needs: ['logic grid'],
      steps: [
        { title: 'Write down what is certain',
          say: 'Six guests, three tables of two. Rule one: Grandma sits at Table 1. Rule two: Dev sits with Grandma. That already fills a whole table.',
          anim: null,
          ask: 'Who sits at Table 1 with Grandma? Type the name.',
          ans: 'dev', hint: 'Which rule pairs someone with Grandma?',
          sol: 'Dev. Grandma and Dev fill Table 1 completely. Two rules were enough to finish one table \\u2014 always start where the rules overlap.' },
        { title: 'Find the pair that must stay together',
          say: 'One rule is not about a table at all: baby Aarav must sit with his mother, Meera. So wherever Meera goes, Aarav goes too. They are a package.',
          anim: null,
          ask: 'Which guest must sit with Meera? Type the name.',
          ans: 'aarav', hint: 'Who is too young to sit alone?',
          sol: 'Aarav. Treating them as one package is the key move \\u2014 now you are really seating three units, not six people.' },
        { title: 'Use a NOT rule to finish',
          say: 'Now the last rule does the work. Ravi and Meera must not sit together. Two people are left for the final tables: Ravi and Sana.',
          anim: null,
          ask: 'Ravi cannot sit with Meera, so who is left to sit with Ravi? Type the name.',
          ans: 'sana', hint: 'The only guest not already placed with someone.',
          sol: 'Sana. A "must not" rule is just as useful as a "must" rule \\u2014 it removes every option but one.' },
        { title: 'Check the plan rule by rule',
          say: 'The last move is always the check. Read each rule aloud and test your plan against it.',
          anim: null,
          ask: 'A plan puts Ravi and Meera at the same table. Does that break a rule? Type yes or no.',
          ans: 'yes', hint: 'What did the last rule say about those two?',
          sol: 'Yes \\u2014 it breaks the rule that they must not sit together. A plan is only right if it satisfies EVERY rule, not most of them.' }
      ] },

    { key: 'powercut', icon: '\ud83d\udd0c', title: 'The power cut', status: 'ready',
      hook: 'Three reports, and two of them contradict. Work out which circuit really blew.',
      needs: ['contradiction'],
      steps: [
        { title: 'Find the two reports that cannot both be true',
          say: 'Three people reported what happened when the power went. Ravi says the KITCHEN circuit blew. Meera says the kitchen circuit did NOT blow. Dev says the LIGHTS circuit blew.',
          anim: null,
          ask: 'Which two reports contradict each other: Ravi and Meera, or Ravi and Dev? Type the two names with "and" between them.',
          ans: 'ravi and meera', hint: 'Which two are about the same circuit, in opposite ways?',
          sol: 'Ravi and Meera. They say opposite things about the very same circuit, so one of them must be wrong. Spotting the contradiction is the whole trick.' },
        { title: 'What a contradiction tells you',
          say: 'If two reports say opposite things about the same fact, exactly one of them is true. Not both, not neither \\u2014 exactly one.',
          anim: null,
          ask: 'Ravi and Meera contradict each other. How many of those two reports are true: 0, 1 or 2? Type the number.',
          ans: 1, hint: 'Could both be right? Could both be wrong?',
          sol: 'Exactly one. Both cannot be right, and both cannot be wrong \\u2014 the circuit either blew or it did not. That gives you a fixed count to work with.' },
        { title: 'Use the count rule',
          say: 'Now the extra fact: at least two of the three reports are false. You know exactly one of Ravi and Meera is false. So what about Dev?',
          anim: null,
          ask: 'At least two reports are false, and Dev is one of them. Which circuit did NOT blow: the lights or the kitchen? Type lights or kitchen.',
          ans: 'lights', hint: 'Dev was the one who blamed the lights.',
          sol: 'The lights did not blow \\u2014 Dev\\u2019s report is false. Counting how many statements can be true is a powerful move when the reports contradict.' },
        { title: 'Finish it off',
          say: 'Two facts left: only ONE circuit blew, and the lights are not it. That leaves one possibility.',
          anim: null,
          ask: 'Only one circuit blew, and it was not the lights. Which circuit blew: the kitchen or the lights? Type kitchen or lights.',
          ans: 'kitchen', hint: 'Which circuit is left?',
          sol: 'The kitchen. And that means Ravi was telling the truth and Meera was wrong. Every step was forced \\u2014 you never had to guess.' }
      ] },

    { key: 'busroute', icon: '\ud83d\ude8c', title: 'The bus route puzzle', status: 'ready',
      hook: 'Four stops, three buses, different waits. Which route gets you there soonest?',
      needs: ['times'],
      steps: [
        { title: 'Work out when the next bus comes',
          say: 'You reach the stop at 9:00. Route A buses run every 10 minutes, at 9:05, 9:15, 9:25. So the bus you catch is the 9:05.',
          anim: null,
          ask: 'You arrive at 9:00 and the next Route A bus is at 9:05. How many minutes do you wait? Type a number.',
          ans: 5, hint: '9:05 minus 9:00.',
          sol: 'Five minutes. Always work out the WAIT first \\u2014 it is the part people forget, and it is often the difference between routes.' },
        { title: 'Add the wait to the ride',
          say: 'The whole journey is wait plus ride. Route A: you wait 5 minutes and ride 25 minutes.',
          anim: null,
          ask: 'Route A: 5 minutes waiting, then 25 minutes riding. How many minutes past 9:00 do you arrive? Type a number.',
          ans: 30, hint: '5 + 25.',
          sol: '30 minutes, so you arrive at 9:30. Total time, not just travel time, is what actually gets you there.' },
        { title: 'Do not forget the walk',
          say: 'Route C is sneakier: you walk 5 minutes to a different stop, then wait 5 minutes, then ride 14 minutes.',
          anim: null,
          ask: 'Route C: 5 walk, 5 wait, 14 ride. How many minutes past 9:00 do you arrive? Type a number.',
          ans: 24, hint: '5 + 5 + 14.',
          sol: '24 minutes \\u2014 you arrive at 9:24, which beats Route A even though you had to walk. Every part of the journey counts.' },
        { title: 'Compare, then choose',
          say: 'Route A takes 30 minutes, Route B takes 33, Route C takes 24. Now the answer is not a guess, it is a number.',
          anim: null,
          ask: 'Which route is fastest: A, B or C? Type the letter.',
          ans: 'c', hint: 'Which total is smallest?',
          sol: 'Route C, at 24 minutes. Working out all three totals and then comparing them is what turns a hunch into an argument you can defend.' }
      ] }
  ];

  window.MindProjects = {
    list: LIST,
    byKey: function (k) { for (var i = 0; i < LIST.length; i++) if (LIST[i].key === k) return LIST[i]; return null; }
  };
})();
