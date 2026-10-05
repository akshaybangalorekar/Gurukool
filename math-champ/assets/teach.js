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
    { key: 'length', name: 'Length', icon: '\ud83d\udccf', what: 'Length is measured in metres, centimetres and kilometres. Going to a SMALLER unit means multiply; going to a BIGGER unit means divide.',
      steps: [
        { say: 'One metre is 100 centimetres, and one kilometre is 1000 metres. Those two facts solve almost every length question.',
          ask: 'How many centimetres are in 3 metres?', ans: 300, hint: 'Each metre holds 100 centimetres.' },
        { say: 'Big unit to small unit means multiply, because you are packing in more, smaller pieces.',
          ask: 'How many metres are in 4 kilometres?', ans: 4000, hint: 'Each kilometre is 1000 metres.' },
        { say: 'The other way round, small to big, means divide \u2014 fewer, bigger pieces.',
          ask: 'How many metres are in 500 centimetres?', ans: 5, hint: '100 centimetres make one metre, so divide by 100.' },
        { say: 'The trap: a question can hand you one unit and ask for another. Always finish by converting to the unit it asked for.',
          ask: 'A 6 metre rope is cut into 4 equal pieces. How long is each piece, in centimetres?', ans: 150, hint: '6 \u00f7 4 = 1.5 metres each, then multiply by 100.' }
      ] },
    { key: 'weight', name: 'Weight', icon: '\u2696\ufe0f', what: 'Weight is measured in grams and kilograms. One kilogram is 1000 grams, and the same multiply-or-divide rule applies.',
      steps: [
        { say: 'One kilogram is 1000 grams \u2014 the word kilo always means a thousand.',
          ask: 'How many grams are in 3 kilograms?', ans: 3000, hint: 'kilo means 1000.' },
        { say: 'Half a kilogram is 500 grams, and a quarter is 250 grams. Those two come up constantly in real life.',
          ask: 'How many grams are in 2.5 kilograms?', ans: 2500, hint: '2 kilograms is 2000, plus 500.' },
        { say: 'When you add up several weights, add them in the same unit first, then convert at the end.',
          ask: 'Three parcels weigh 500 grams each. What is the total, in kilograms?', ans: 1.5, hint: '1500 grams in total, then divide by 1000.' }
      ] },
    { key: 'capacity', name: 'Capacity', icon: '\ud83e\udd64', what: 'Capacity is how much a container holds, in millilitres and litres. One litre is 1000 millilitres.',
      steps: [
        { say: 'A litre is 1000 millilitres. A 500 ml bottle is half a litre; a 250 ml glass is a quarter.',
          ask: 'How many millilitres are in 3 litres?', ans: 3000, hint: 'Multiply by 1000.' },
        { say: 'To find how many glasses fit in a jug, both amounts must be in the SAME unit first \u2014 usually millilitres.',
          ask: 'A 2 litre jug holds how many 500 ml glasses?', ans: 4, hint: '2 litres is 2000 ml, and 2000 \u00f7 500.' },
        { say: 'The trap: dividing litres by millilitres without converting. The units must match before you divide.',
          ask: 'A 5 litre jug holds how many 250 ml glasses?', ans: 20, hint: '5 litres is 5000 ml.' }
      ] },
    { key: 'roots', name: 'Square roots', icon: '\u221a', what: 'A square root asks a backwards question: what number, multiplied by itself, gives this? It undoes squaring.',
      steps: [
        { say: 'Squaring means multiplying a number by itself: 7 squared is 49. A square root goes the other way.',
          ask: 'What is the square root of 49?', ans: 7, hint: 'Which number times itself makes 49?' },
        { say: 'Learn the square numbers and their roots come free: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144.',
          ask: 'What is the square root of 144?', ans: 12, hint: 'It is in the list above.' },
        { say: 'Area questions about squares are square-root questions in disguise, because area = side \u00d7 side.',
          ask: 'A square field has an area of 169 square metres. How long is each side?', ans: 13, hint: 'What times itself gives 169?' }
      ] },
    { key: 'angles', name: 'Angles', icon: '\ud83d\udcd0', what: 'Angles are measured in degrees. The angles inside a triangle always add to 180, and inside a quadrilateral to 360.',
      steps: [
        { say: 'A right angle is 90 degrees. A straight line is 180. These two are the rulers you measure everything else against.',
          ask: 'The angles in a triangle add up to how many degrees?', ans: 180, hint: 'It is the same as a straight line.' },
        { say: 'So if you know two angles of a triangle, the third is what is left of 180.',
          ask: 'Two angles of a triangle are 65 and 48 degrees. What is the third?', ans: 67, hint: '65 + 48 = 113, then 180 \u2212 113.' },
        { say: 'A quadrilateral is two triangles stuck together, so its angles add to 2 \u00d7 180 = 360.',
          ask: 'Three angles of a quadrilateral are 100, 80 and 90 degrees. What is the fourth?', ans: 90, hint: 'They add to 360.' },
        { say: 'The pattern continues: every extra side adds another 180 degrees to the total.',
          ask: 'How many degrees do the angles of a PENTAGON add up to?', ans: 540, hint: 'Three triangles: 3 \u00d7 180.' }
      ] },
    { key: 'area', name: 'Area', icon: '\ud83d\udfe6', what: 'Area is the space inside a shape, measured in SQUARE units. Rectangle: width \u00d7 height. Triangle: half of that. Circle: \u03c0 \u00d7 radius squared.',
      steps: [
        { say: 'Area of a rectangle is width times height \u2014 how many unit squares would cover it.',
          ask: 'A rectangle is 5 cm by 3 cm. What is its area in square centimetres?', ans: 15, hint: '5 \u00d7 3.' },
        { say: 'A triangle is exactly half of the rectangle around it, so its area is base \u00d7 height \u00f7 2.',
          ask: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?', ans: 30, hint: '10 \u00d7 6 = 60, then halve it.' },
        { say: 'A circle needs \u03c0, which is about 3.14. The radius is half the width.',
          ask: 'A circle has a radius of 5 cm. Using 3.14 for \u03c0, what is its area to one decimal place?', ans: 78.5, hint: '5 \u00d7 5 = 25, then 25 \u00d7 3.14.' },
        { say: 'The trap: area is always in SQUARE units, and perimeter never is. Mixing them up is the commonest error in this topic.',
          ask: 'A square has sides of 6 cm. What is its area in square centimetres?', ans: 36, hint: '6 \u00d7 6.' }
      ] },
    { key: 'perimeter', name: 'Perimeter', icon: '\ud83d\udd32', what: 'Perimeter is the distance all the way round a shape \u2014 a length, not a space, so it is measured in plain units.',
      steps: [
        { say: 'Perimeter is a walk around the edge: add every side.',
          ask: 'A rectangle is 5 cm by 3 cm. What is its perimeter in centimetres?', ans: 16, hint: 'There are two 5s and two 3s.' },
        { say: 'Because opposite sides of a rectangle are equal, the shortcut is 2 \u00d7 (length + width).',
          ask: 'A rectangle is 8 cm long and 4 cm wide. What is its perimeter?', ans: 24, hint: '2 \u00d7 (8 + 4).' },
        { say: 'A square has four equal sides, so its perimeter is 4 \u00d7 side \u2014 and if you are given the area, find the side first.',
          ask: 'A square has an area of 49 square centimetres. What is its perimeter?', ans: 28, hint: 'The side is the square root of 49.' }
      ] },
    { key: 'decimals', name: 'Decimals', icon: '\ud83d\udd22', what: 'Decimals are tenths and hundredths. The digits after the point are just fractions of ten, so line up the points and do ordinary arithmetic.',
      steps: [
        { say: 'The first place after the point is tenths, the second is hundredths. 0.4 is four tenths \u2014 the same as 4/10.',
          ask: '0.4 + 0.3 = ?', ans: 0.7, hint: 'Four tenths plus three tenths.' },
        { say: 'To multiply a decimal by a whole number, do the multiplication without the point, then put the point back in.',
          ask: '2.5 \u00d7 4 = ?', ans: 10, hint: '25 \u00d7 4 = 100, then divide by 10.' },
        { say: 'Multiplying by 10 moves the point one place to the right; dividing by 10 moves it left. That is all the rule is.',
          ask: '0.25 \u00d7 8 = ?', ans: 2, hint: '25 \u00d7 8 = 200, then divide by 100.' }
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
