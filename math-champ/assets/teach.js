/* ============================================================
   MATH-CHAMP - the lesson library
   Each topic is taught the way a good tutor does it: say one small
   thing, then ask one small question to check it, then move on.
   The child cannot slide past a check without answering it.
   After the lesson, the same topic is practised with fresh questions.
   ============================================================ */
(function () {
  var LESSONS = [
    { key: 'frac', name: 'Fractions', icon: '🍕', what: 'A fraction is a piece of a whole. The bottom number says how many equal pieces the whole is cut into; the top number says how many you take.',
      steps: [
        { say: 'Think of a chocolate bar with 5 equal pieces. If you eat 2 of them, you have eaten two fifths — written 2/5. The 5 is how many pieces there are; the 2 is how many you took.',
          ask: 'A cake is cut into 8 equal slices and you take 3. What is the bottom number of the fraction you took?', ans: 8, hint: 'The bottom number is how many equal pieces the WHOLE was cut into.' },
        { say: 'To find a fraction OF an amount, you always do the same two things: divide by the bottom number, then multiply by the top one. That is it — a fraction is really just an instruction.',
          ask: 'One fifth of 40 is 40 ÷ 5. What is 40 ÷ 5?', ans: 8, hint: 'Divide by the bottom number first.' },
        { say: 'Now the top number. Two fifths means two of those fifths.',
          ask: 'One fifth of 40 is 8. So what is two fifths of 40?', ans: 16, hint: 'Take two of the pieces you just found.' },
        { say: 'Here is the trap. People often divide by the top number and multiply by the bottom — exactly backwards.',
          ask: 'For three quarters of 20, which number do you divide by: 3 or 4? Type the number.', ans: 4, hint: 'Divide by the bottom number, always.' }
      ] },
    { key: 'ratio', name: 'Ratio', icon: '⚖️', what: 'A ratio tells you how many parts each person gets — not how much money they get. Turn it into parts first, then price one part.',
      steps: [
        { say: 'A ratio like 2 : 3 means: for every 2 parts one person gets, the other gets 3 parts. The numbers are parts, not amounts.',
          ask: 'In the ratio 2 : 3, how many equal parts are there altogether?', ans: 5, hint: 'Add the two ratio numbers.' },
        { say: 'Once you know the total number of parts, you find what ONE part is worth by dividing the total amount by the number of parts.',
          ask: '60 sweets are shared in the ratio 2 : 3. That is 5 parts. What is one part worth?', ans: 12, hint: '60 ÷ 5.' },
        { say: 'Then each person takes their own number of parts.',
          ask: 'One part is 12 sweets. How many sweets does the person with 3 parts get?', ans: 36, hint: '3 parts, each worth 12.' },
        { say: 'The trap: people share the amount by the ratio numbers directly and get nonsense. Always find one part first.',
          ask: 'In a ratio 3 : 4 sharing 70, what is one part worth?', ans: 10, hint: '3 + 4 = 7 parts, and 70 ÷ 7.' }
      ] },
    { key: 'pct', name: 'Percentages', icon: '％', what: 'Per cent means "out of 100". You can build any percentage from easy pieces: 10% is divide by 10, 5% is half of that, 1% is divide by 100.',
      steps: [
        { say: 'Ten per cent of a number is just the number divided by 10 — the digits move one place. That is the most useful piece you will ever have.',
          ask: 'What is 10% of 80?', ans: 8, hint: 'Divide by 10.' },
        { say: 'Five per cent is half of ten per cent. Twenty per cent is two lots of ten per cent. So you can build almost anything.',
          ask: 'What is 5% of 80?', ans: 4, hint: 'Half of the 10% you just found.' },
        { say: 'Now combine: 15% is 10% plus 5%.',
          ask: 'So what is 15% of 80?', ans: 12, hint: '8 plus 4.' },
        { say: 'The trap: a question that says "reduced by 15%" wants the price AFTER the cut, not the size of the cut.',
          ask: 'A price of 80 is reduced by 15%, which is 12. What is the new price?', ans: 68, hint: 'Subtract the cut from the original.' }
      ] },
    { key: 'balance', name: 'Balancing equations', icon: '⚖️', what: 'An equation is a balance. Whatever you do to one side, do to the other. To find x, undo what was done to it — in reverse order.',
      steps: [
        { say: 'If x + 6 = 14, the x has had 6 added to it. To get x on its own, undo that: subtract 6 from BOTH sides.',
          ask: 'x + 6 = 14. What is x?', ans: 8, hint: 'Take 6 away from both sides.' },
        { say: 'If something was multiplied, undo it by dividing. Undo in the opposite order to how it was built — last thing done, first thing undone.',
          ask: 'x + 6 = 14 came from adding. If instead 4x = 32, what is x?', ans: 8, hint: 'Divide both sides by 4.' },
        { say: 'Now two steps. 3x − 5 = 13. The x was multiplied by 3, then 5 was taken away. Undo the subtraction first.',
          ask: '3x − 5 = 13. Add 5 back to both sides. What is 3x?', ans: 18, hint: '13 + 5.' },
        { say: 'And now undo the multiplication.',
          ask: '3x = 18. What is x?', ans: 6, hint: 'Divide both sides by 3.' }
      ] },
    { key: 'speed', name: 'Average speed', icon: '🚗', what: 'Speed is a rate: how far in one hour. Distance, speed and time are linked by one idea — distance = speed × time. Rearrange it for whatever you need.',
      steps: [
        { say: 'If a car goes 60 km in one hour, its speed is 60 km/h. In three hours it goes three lots of that.',
          ask: 'A car travels at 60 km/h for 3 hours. How far does it go?', ans: 180, hint: '60 × 3.' },
        { say: 'To go the other way, divide: distance ÷ time gives the speed.',
          ask: 'A train covers 240 km in 3 hours. What is its average speed in km/h?', ans: 80, hint: '240 ÷ 3.' },
        { say: 'Now the important one. Average speed for a whole trip is the TOTAL distance divided by the TOTAL time. It is never the average of the two speeds.',
          ask: 'A driver goes 100 km in 2 hours, then 150 km in 2 hours. What is the total distance?', ans: 250, hint: 'Add the two distances.' },
        { say: 'And the total time is the same idea.',
          ask: 'Total distance 250 km, total time 4 hours. What is the average speed?', ans: 62.5, hint: '250 ÷ 4.' }
      ] },
    { key: 'time', name: 'Time', icon: '\ud83d\udd70\ufe0f', what: 'Time is counted in sixties: 60 minutes in an hour. Add the hours first, then the minutes, and carry when the minutes pass 60.',
      steps: [
        { say: 'One hour is 60 minutes. So two hours is two lots of 60.',
          ask: 'How many minutes are in 2 hours?', ans: 120, hint: '60 + 60.' },
        { say: 'Two hours and 30 minutes is the hours plus the minutes \u2014 but in the same unit.',
          ask: 'How many minutes are in 2 hours 30 minutes?', ans: 150, hint: '120 + 30.' },
        { say: 'When you add minutes and pass 60, carry one hour and keep the leftover minutes. 8:40 plus 20 minutes reaches exactly the next hour.',
          ask: '8:40 plus 20 minutes lands on what hour? Type the hour only.', ans: 9, hint: '40 + 20 = 60, which is a full hour.' },
        { say: 'The trap: afternoon times have two faces. 9:35 in the evening is 2135 in 24-hour time \u2014 add 12 to the hour after midday.',
          ask: 'What is 9:35 pm as a 4-digit 24-hour time?', ans: 2135, hint: '9 + 12 = 21, then the minutes.' }
      ] },
    { key: 'money', name: 'Money', icon: '\ud83d\udcb0', what: 'Money questions are multiplication, subtraction and percentages wearing a price tag. Always ask: what is the whole, and what is being taken away?',
      steps: [
        { say: 'Equal items mean multiplication. Four pens at 15 rupees is four lots of 15.',
          ask: 'How many rupees do 4 pens cost at 15 rupees each?', ans: 60, hint: '15 \u00d7 4.' },
        { say: 'Change is a subtraction: what you had, minus what you spent.',
          ask: 'You have 100 rupees and buy 3 books at 24 rupees. How much is left?', ans: 28, hint: '24 \u00d7 3 = 72, then 100 \u2212 72.' },
        { say: 'A discount is a percentage taken off. Build the percentage from 10 per cent pieces first.',
          ask: 'A jumper of 80 rupees is cut by 15 per cent, which is 12 rupees. What is the new price?', ans: 68, hint: '80 \u2212 12.' },
        { say: 'The trap in every money question: profit is measured against the price the shop PAID, not the price it charged.',
          ask: 'A toy is bought for 40 rupees and sold for 50. What is the profit as a percentage of the buying price?', ans: 25, hint: 'The profit is 10, which is a quarter of 40.' }
      ] },
    { key: 'prime', name: 'Primes and factors', icon: '🔢', what: 'A prime number has exactly two factors: 1 and itself. To test one, check the small primes in order — 2, 3, 5, 7 — and stop as soon as one divides.',
      steps: [
        { say: '9 is odd, but it is not prime, because 3 × 3 = 9. Being odd is not the test.',
          ask: 'Is 9 prime? Type 1 for yes, 0 for no.', ans: 0, hint: 'Can anything other than 1 and 9 multiply to make 9?' },
        { say: 'A fast test for 3: add the digits. If they add to a multiple of 3, the whole number is a multiple of 3.',
          ask: 'The digits of 51 add to 6. Is 51 a multiple of 3? Type 1 for yes, 0 for no.', ans: 1, hint: '6 is a multiple of 3.' },
        { say: 'So 51 is not prime. Now try one that is.',
          ask: 'Which of 53 and 57 is prime? Type the prime.', ans: 53, hint: 'The digits of 57 add to 12, a multiple of 3.' },
        { say: 'The last piece: when hunting for a prime ABOVE a number, start just above it and skip anything ending in 5 or divisible by 3.',
          ask: 'What is the smallest prime greater than 20?', ans: 23, hint: '21 is 3 × 7, 22 is even.' }
      ] }
  ];

  window.Teach = {
    lessons: LESSONS,
    byKey: function (k) { for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].key === k) return LESSONS[i]; return null; },
    forGen: function (k) { return window.Teach.byKey(k); }
  };
})();
