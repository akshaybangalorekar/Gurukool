/* ============================================================
   MATH-CHAMP - The Olympiad Ladder
   Grade 5 (age 11) and upwards, rising in small steps.

   How each problem is built, on purpose:
     know  - the data, pulled OUT of the words. This is the first
             button the child presses. It gives facts, never method.
     steps - the Socratic ladder. Each rung asks ONE small question
             and checks it. The final answer is never spoken here.
     hints - two nudges for when he is stuck.
     sol   - the worked solution, offered only after he has tried.

   Nothing here reveals the answer before the child has attempted it.
   ============================================================ */
(function () {
  var OLY = [

  /* ===================== GRADE 5 - one step in ===================== */
  { id: 'oly5-01', grade: 5, topic: 'Fractions of a quantity', title: 'The library shelf',
    story: 'A classroom library holds 180 books. Two fifths of them are story books. The rest are fact books.',
    q: 'How many story books are there?',
    answer: 72, unit: 'story books',
    know: ['Total books: 180', 'Story books: 2/5 of the total', 'The rest (3/5) are fact books'],
    steps: [
      { ask: 'How many books are there altogether?', ans: 180, note: 'Start from the whole - the whole is always your anchor.' },
      { ask: '180 divided by 5 is how many?', ans: 36, note: 'That is one fifth.' },
      { ask: 'So how many books are TWO fifths?', ans: 72, note: 'Two of those fifths.' }
    ],
    hints: ['The denominator 5 tells you how many equal groups to cut the total into.',
      'Find one fifth first. Then take as many fifths as the top number says.'],
    sol: '180 divided by 5 is 36, so one fifth is 36 books. Story books are two fifths: 36 x 2 = 72. A fraction is an instruction: divide by the bottom number, then multiply by the top one.' },

  { id: 'oly5-02', grade: 5, topic: 'Ratio', title: 'Sharing the prize',
    story: 'A prize of 240 rupees is shared between Ana and Ben in the ratio 3 : 5.',
    q: 'How much does Ben get?',
    answer: 150, unit: 'rupees',
    know: ['Total to share: 240', 'Ratio Ana : Ben = 3 : 5', 'Parts altogether: 3 + 5 = 8 equal parts'],
    steps: [
      { ask: 'How many equal parts are in the ratio altogether?', ans: 8, note: 'Add the numbers in the ratio.' },
      { ask: 'What is one part worth (240 divided by 8)?', ans: 30, note: 'That is the value of ONE part.' },
      { ask: 'Ben has 5 parts. How much is that?', ans: 150, note: 'Five parts, each worth 30.' }
    ],
    hints: ['A ratio tells you how many parts each person gets, not the money itself.',
      'Find the value of one part, then give each person their number of parts.'],
    sol: '3 + 5 = 8 parts, and 240 divided by 8 is 30, so each part is worth 30 rupees. Ben has 5 parts: 5 x 30 = 150 rupees. Always convert a ratio into parts, then price one part.' },

  { id: 'oly5-03', grade: 5, topic: 'Percentage', title: 'The sale tag',
    story: 'A jumper costs 80 rupees. In the sale it is reduced by 15 per cent.',
    q: 'What is the sale price?',
    answer: 68, unit: 'rupees',
    know: ['Original price: 80', 'Reduction: 15 per cent', 'You need the price AFTER the cut'],
    steps: [
      { ask: 'What is 10 per cent of 80?', ans: 8, note: 'Ten per cent is the number divided by 10.' },
      { ask: 'What is 5 per cent of 80?', ans: 4, note: 'Half of the ten per cent.' },
      { ask: 'So what is 15 per cent of 80?', ans: 12, note: 'Ten per cent plus five per cent.' },
      { ask: 'What is the price after taking 12 off?', ans: 68, note: 'Subtract the discount.' }
    ],
    hints: ['Build 15 per cent out of 10 per cent and 5 per cent - that is quicker than one big sum.',
      'The question asks for the price AFTER the discount, not the discount itself.'],
    sol: '10 per cent of 80 is 8 and 5 per cent is 4, so 15 per cent is 12. The sale price is 80 - 12 = 68 rupees. Percentages are friendly when you build them from 10 per cent and 1 per cent pieces.' },

  { id: 'oly5-04', grade: 5, topic: 'Prime numbers', title: 'Spot the prime',
    story: 'Four numbers are written on the board: 51, 53, 57, 63.',
    q: 'Which of them is prime?',
    answer: 53, unit: '',
    know: ['A prime has exactly two factors: 1 and itself', 'All four numbers are odd', 'Check each one against the small primes: 3, 5, 7'],
    steps: [
      { ask: 'Add the digits of 51. Is 51 divisible by 3? Type 1 for yes, 0 for no.', ans: 1, note: '5 + 1 = 6, and 6 is a multiple of 3.' },
      { ask: 'Is 57 divisible by 3? Type 1 for yes, 0 for no.', ans: 1, note: '5 + 7 = 12, also a multiple of 3.' },
      { ask: 'Is 63 divisible by 3 or 7? Type 1 for yes, 0 for no.', ans: 1, note: '6 + 3 = 9, and 63 = 7 x 9.' },
      { ask: 'So which number is left standing as prime?', ans: 53, note: 'It survives every small prime check.' }
    ],
    hints: ['Being odd is not enough - 9 is odd but not prime.',
      'A quick divisibility test: if the digits add up to a multiple of 3, the number is not prime.'],
    sol: '51, 57 and 63 are all multiples of 3 (their digits add to 6, 12 and 9), and 53 is divisible by nothing small. So 53 is the prime. Test the small primes in order - 2, 3, 5, 7 - and stop as soon as one divides.' },

  { id: 'oly5-05', grade: 5, topic: 'Balancing equations', title: 'Undo the steps',
    story: 'A number is multiplied by 4, then 7 is taken away. The answer is 25.',
    q: 'What was the number?',
    answer: 8, unit: '',
    know: ['The rule: multiply by 4, then subtract 7', 'The result is 25', 'To find the start, undo the steps in reverse'],
    steps: [
      { ask: 'Before the 7 was taken away, what was the number? (25 + 7)', ans: 32, note: 'Undo the subtraction by adding it back.' },
      { ask: 'Before the multiplication by 4, what was the number? (32 divided by 4)', ans: 8, note: 'Undo the multiplication by dividing.' }
    ],
    hints: ['Work backwards, like retracing your steps on a map.',
      'Undo in the OPPOSITE order: the last thing done is the first thing undone.'],
    sol: 'Undo the subtraction: 25 + 7 = 32. Undo the multiplication: 32 divided by 4 = 8. The number was 8. Check it: 8 x 4 = 32, and 32 - 7 = 25. Working backwards is the fastest way through a chain of operations.' },

  { id: 'oly5-06', grade: 5, topic: 'Adding and subtracting', title: 'Up and down the hill',
    story: 'A hiker starts at sea level. She climbs 15 metres, drops 8 metres, then drops another 3 metres.',
    q: 'How high is she now, in metres?',
    answer: 4, unit: 'metres',
    know: ['Start: 0 (sea level)', 'Climb 15 means +15', 'Drop 8 means -8', 'Drop 3 more means -3'],
    steps: [
      { ask: 'After climbing 15 and dropping 8, how high is she?', ans: 7, note: '15 - 8 = 7.' },
      { ask: 'Now drop 3 more. How high is she?', ans: 4, note: '7 - 3 = 4.' }
    ],
    hints: ['Give every climb a plus sign and every drop a minus sign, then work left to right.',
      'You can also add all the drops first: 8 + 3 = 11, then do 15 - 11.'],
    sol: '15 - 8 - 3 = 4, so she is 4 metres above sea level. Signs do the work: climbs are positive, drops are negative, and the sum tells the story.' },

  { id: 'oly5-07', grade: 5, topic: 'Logic and multiples', title: 'Two bells',
    story: 'One bell rings every 4 minutes. Another rings every 6 minutes. Both ring together at 9:00.',
    q: 'When is the next time they ring together? Give the minutes past 9 as a number.',
    answer: 12, unit: 'minutes past 9',
    know: ['Bell A rings at 4, 8, 12, 16, ... minutes', 'Bell B rings at 6, 12, 18, ... minutes', 'They must meet on a common multiple'],
    steps: [
      { ask: 'List the multiples of 4: 4, 8, 12, 16. Which is the smallest that also appears in the 6 times table?', ans: 12, note: 'That is the lowest common multiple.' },
      { ask: 'So how many minutes after 9:00 do they ring together?', ans: 12, note: 'That is 9:12.' }
    ],
    hints: ['Write the two lists of ringing times side by side and look for the first number in both.',
      'You are hunting for the LOWEST common multiple.'],
    sol: 'The 4-times table is 4, 8, 12, 16 and the 6-times table is 6, 12, 18. The first number in both is 12, so they ring together 12 minutes later, at 9:12. Repeated events meet again at the lowest common multiple.' },

  { id: 'oly5-08', grade: 5, topic: 'Time', title: 'The film',
    story: 'A film starts at 7:40 pm and runs for 1 hour and 55 minutes.',
    q: 'What time does it end? Type the time as a 4-digit number in 24-hour form (so 8:20 pm is 2020).',
    answer: 2135, unit: '',
    know: ['Start: 7:40 pm', 'Length: 1 hour 55 minutes', 'Two moves: add the hour, then add the minutes'],
    steps: [
      { ask: 'Add the hour first: what time is it 1 hour after 7:40 pm? (as a 4-digit number)', ans: 2040, note: '8:40 pm is 2040.' },
      { ask: 'Now add 55 minutes to 8:40. What time is it? (4-digit)', ans: 2135, note: '20 minutes takes you to 9:00, then 35 more.' }
    ],
    hints: ['Do the hours and the minutes as two separate moves.',
      'When the minutes pass 60, carry an hour and start the minutes again.'],
    sol: '7:40 pm plus 1 hour is 8:40 pm. Then 55 minutes: 20 minutes reaches 9:00 pm and 35 minutes more is 9:35 pm, which is 2135 in 24-hour time. Splitting a time sum into hours first, then minutes, stops the carrying from tripping you up.' },

  { id: 'oly5-09', grade: 5, topic: 'Logic', title: 'The race order',
    story: 'Sam finished before Tom, but after Ravi. Nadia finished after Tom.',
    q: 'Who won the race? Type the name.',
    answer: 'Ravi', unit: '',
    know: ['Sam is before Tom', 'Sam is after Ravi', 'Nadia is after Tom'],
    steps: [
      { ask: 'Ravi is before Sam, and Sam is before Tom. Who is at the front so far?', ans: 'Ravi', note: 'Follow the chain from the front.' },
      { ask: 'Nadia is after Tom. So who is first overall?', ans: 'Ravi', note: 'Nobody is ahead of Ravi.' }
    ],
    hints: ['Draw the names on a line, left to right, as you read each clue.',
      'Look for the person nobody finished ahead of.'],
    sol: 'Ravi is before Sam, Sam is before Tom, and Nadia is after Tom, so the order is Ravi, Sam, Tom, Nadia. Ravi won. Turning word clues into a line on paper is the whole trick with ordering puzzles.' },

  { id: 'oly5-10', grade: 5, topic: 'Average speed', title: 'The motorway run',
    story: 'A car travels 150 kilometres in 2 hours.',
    q: 'What is its average speed in kilometres per hour?',
    answer: 75, unit: 'km/h',
    know: ['Distance: 150 km', 'Time: 2 hours', 'Average speed = distance divided by time'],
    steps: [
      { ask: 'What is 150 divided by 2?', ans: 75, note: 'That is the speed per hour.' }
    ],
    hints: ['Speed is a rate: how far in ONE hour.',
      'Distance divided by time gives the average speed.'],
    sol: '150 divided by 2 is 75, so the average speed is 75 km/h. Whenever a question says "per hour" or "each", it is asking for a rate, and a rate is a division.' },

  { id: 'oly5-11', grade: 5, topic: 'Fractions', title: 'Two slices',
    story: 'A cake is cut so that you take one half and your friend takes one third.',
    q: 'What fraction of the cake have you taken altogether? Give the fraction like 2/7.',
    answer: '5/6', unit: '',
    know: ['You: 1/2', 'Friend: 1/3', 'To add fractions they need the same denominator'],
    steps: [
      { ask: 'What is the lowest common denominator of 2 and 3?', ans: 6, note: 'Six works for both.' },
      { ask: 'What is 1/2 as sixths? Type the top number only.', ans: 3, note: 'One half is three sixths.' },
      { ask: 'What is 1/3 as sixths? Type the top number only.', ans: 2, note: 'One third is two sixths.' },
      { ask: 'So 3 sixths plus 2 sixths is how many sixths? Type the top number.', ans: 5, note: 'Five sixths.' }
    ],
    hints: ['You cannot add halves and thirds until the pieces are the same size.',
      'Change both fractions to sixths first.'],
    sol: '1/2 is 3/6 and 1/3 is 2/6, so together they are 5/6 of the cake. Find a common denominator first; only then do the numerators add.' },

  { id: 'oly5-12', grade: 5, topic: 'Percentage', title: 'The toy stall',
    story: 'A toy is bought for 40 rupees and sold for 50 rupees.',
    q: 'What is the profit as a percentage of the buying price?',
    answer: 25, unit: 'per cent',
    know: ['Buying price: 40', 'Selling price: 50', 'Profit: 50 - 40 = 10', 'Profit percentage is measured against the BUYING price'],
    steps: [
      { ask: 'What is the profit in rupees?', ans: 10, note: 'Selling price minus buying price.' },
      { ask: 'What is 10 as a fraction of 40? Give it as a fraction like 3/8.', ans: '1/4', note: 'Ten out of forty.' },
      { ask: 'What is that fraction as a percentage?', ans: 25, note: 'One quarter is 25 per cent.' }
    ],
    hints: ['Profit percentage is always measured against what the shop paid, not what it charged.',
      'Turn the fraction into a percentage by finding an equivalent fraction out of 100.'],
    sol: 'The profit is 10 rupees, and 10 out of 40 is one quarter, which is 25 per cent. Profit percentage is measured against the COST price - getting that backwards is the most common mistake in this whole topic.' },

  /* ===================== GRADE 6 - the Olympiad level ===================== */
  { id: 'oly6-01', grade: 6, topic: 'Fractions and percentage', title: 'The car park',
    story: 'A car park has 250 spaces. Three tenths of the spaces are suitable for small cars; the rest are for large cars. Last week small cars occupied fourteen fifteenths of their allocated spaces, and overall the car park was seven tenths full.',
    q: 'What fraction of the LARGE car spaces were filled? Give the fraction like 2/7.',
    answer: '3/5', unit: '',
    art: 'carpark',
    know: ['Total spaces: 250', 'Small-car spaces: 3/10 of 250 = 75', 'Large-car spaces: the rest = 175', 'Small cars filled: 14/15 of 75 = 70', 'The whole car park was 7/10 full = 175 cars'],
    steps: [
      { ask: 'How many spaces are for small cars? (3/10 of 250)', ans: 75, note: 'Divide by 10, then multiply by 3.' },
      { ask: 'How many spaces are for large cars?', ans: 175, note: '250 - 75.' },
      { ask: 'How many cars were in the car park altogether? (7/10 of 250)', ans: 175, note: 'Divide by 10, then multiply by 7.' },
      { ask: 'How many small cars were actually parked? (14/15 of 75)', ans: 70, note: 'Divide by 15, then multiply by 14.' },
      { ask: 'So how many LARGE cars were parked?', ans: 105, note: 'Total cars minus the small ones.' },
      { ask: 'What fraction of the 175 large spaces is 105? Give the fraction like 2/7.', ans: '3/5', note: 'Simplify 105/175 by dividing both by 35.' }
    ],
    hints: ['Work in real numbers of cars, not fractions - turn every fraction into a count first.',
      'You need two numbers at the end: large cars parked, and large spaces available. Divide one by the other.'],
    sol: 'Small spaces: 3/10 of 250 = 75, so large spaces = 175. The whole car park was 7/10 of 250 = 175 cars. Small cars parked: 14/15 of 75 = 70, so large cars parked = 175 - 70 = 105. As a fraction of the 175 large spaces that is 105/175 = 3/5. The move that cracks this: convert every fraction into a count, then only divide at the very end.' },

  { id: 'oly6-02', grade: 6, topic: 'Fractions of a whole', title: 'The cruise ship',
    story: 'A cruise ship carries 2400 passengers. There are men, women and children. Three in every eight passengers are men, and two in every five passengers are women.',
    q: 'How many children are on the ship?',
    answer: 540, unit: 'children',
    know: ['Total passengers: 2400', 'Men: 3/8 of 2400', 'Women: 2/5 of 2400', 'Children: everyone else'],
    steps: [
      { ask: 'How many men are on board? (3/8 of 2400)', ans: 900, note: '2400 divided by 8, then times 3.' },
      { ask: 'How many women? (2/5 of 2400)', ans: 960, note: '2400 divided by 5, then times 2.' },
      { ask: 'How many men and women together?', ans: 1860, note: 'Add them.' },
      { ask: 'So how many children?', ans: 540, note: 'Take that away from 2400.' }
    ],
    hints: ['"Three in every eight" is just a posh way of saying three eighths.',
      'Find the men, find the women, and the children are whatever is left over.'],
    sol: 'Men: 3/8 of 2400 = 900. Women: 2/5 of 2400 = 960. Together that is 1860, so the children are 2400 - 1860 = 540. When a whole is split into parts, the last part is always the total minus the ones you already know.' },

  { id: 'oly6-03', grade: 6, topic: 'Ratio chains', title: 'Three ages',
    story: 'The ratio of David age to Michael age is 5 : 8. The ratio of Michael age to Sara age is 7 : 3. Their ages add up to 115.',
    q: 'How old is Michael?',
    answer: 56, unit: 'years',
    art: 'ageratio',
    know: ['David : Michael = 5 : 8', 'Michael : Sara = 7 : 3', 'Michael appears in BOTH ratios, so his number must match', 'The ages total 115'],
    steps: [
      { ask: 'What is the lowest common multiple of 8 and 7?', ans: 56, note: 'That is the number we will give Michael in both ratios.' },
      { ask: 'If Michael is 56 in the first ratio, David is 5/8 of that. What is David?', ans: 35, note: '56 divided by 8, times 5.' },
      { ask: 'In the second ratio Michael is 56, which is 7 parts. So Sara is 3 parts. What is one part?', ans: 8, note: '56 divided by 7.' },
      { ask: 'So what is Sara age?', ans: 24, note: 'Three parts of 8.' },
      { ask: 'Do the three ages add to 115? Type the total you get.', ans: 115, note: '35 + 56 + 24 = 115 - the ratios were right.' }
    ],
    hints: ['Michael is the bridge between the two ratios - make his number the same in both.',
      'Change 5 : 8 into a ratio out of 56 by multiplying both sides by 7, and 7 : 3 by multiplying both sides by 8.'],
    sol: 'Michael is 8 parts in one ratio and 7 in the other, so give him 56 (the LCM of 8 and 7). Then David : Michael : Sara = 35 : 56 : 24. The total is 35 + 56 + 24 = 115, which matches, so Michael is 56. Linking two ratios through their shared person is the standard move.' },

  { id: 'oly6-04', grade: 6, topic: 'Logic and multiples', title: 'The staircase',
    story: 'Jake, Michael and Gavin start on the first step of a long staircase. Jake goes up one step at a time, Michael two steps at a time, and Gavin three steps at a time.',
    q: 'Which is the FOURTH step that all three of them step on together?',
    answer: 24, unit: 'step number',
    know: ['Jake lands on every step: 1, 2, 3, 4, ...', 'Michael lands on 2, 4, 6, 8, ...', 'Gavin lands on 3, 6, 9, 12, ...', 'A shared step must be a multiple of both 2 and 3'],
    steps: [
      { ask: 'Which is the FIRST step all three land on?', ans: 6, note: 'The lowest common multiple of 2 and 3.' },
      { ask: 'Which is the second shared step?', ans: 12, note: 'Keep adding the same jump.' },
      { ask: 'Which is the third?', ans: 18, note: 'The shared steps are the multiples of 6.' },
      { ask: 'So which is the fourth?', ans: 24, note: 'Four lots of 6.' }
    ],
    hints: ['Jake steps on everything, so ignore him - the question is really about Michael and Gavin.',
      'Shared steps are common multiples. The first is 6, and they repeat every 6.'],
    sol: 'Jake steps everywhere, so the shared steps are the common multiples of 2 and 3: 6, 12, 18, 24. The fourth is 24. Spotting that one person is irrelevant is often the fastest shortcut in a logic puzzle.' },

  { id: 'oly6-05', grade: 6, topic: 'Ratio', title: 'The divided sum',
    story: 'A sum of money is divided in the ratio 3 : 4. The larger portion is then divided into three parts in the ratio 20 : 15 : 12. The smallest of those three parts is 240 rupees.',
    q: 'What was the original sum of money?',
    answer: 1645, unit: 'rupees',
    know: ['Original split: 3 : 4, so 7 parts in all', 'Larger portion = 4 parts of the original', 'Larger portion re-split as 20 : 15 : 12, which is 47 small units', 'Smallest of those = 12 units = 240'],
    steps: [
      { ask: 'How many small units are in 20 : 15 : 12 altogether?', ans: 47, note: 'Add them.' },
      { ask: 'If 12 units are worth 240, what is ONE unit worth?', ans: 20, note: '240 divided by 12.' },
      { ask: 'So what is the whole larger portion (47 units)?', ans: 940, note: '47 times 20.' },
      { ask: 'The larger portion is 4 of the original 7 parts. What is one original part?', ans: 235, note: '940 divided by 4.' },
      { ask: 'So what was the whole original sum (7 parts)?', ans: 1645, note: '235 times 7.' }
    ],
    hints: ['Work out the larger portion first, then climb back to the original total.',
      'Divide the larger portion by 4 to price one original part, then multiply by 7.'],
    sol: 'The re-split has 47 units and the smallest is 12 of them, worth 240, so one unit is 20 and the larger portion is 47 x 20 = 940. That is 4 of the original 7 parts, so one part is 235 and the whole sum is 7 x 235 = 1645 rupees. Ratios within ratios are always solved by pricing one unit and working outwards.' },

  { id: 'oly6-06', grade: 6, topic: 'Profit and loss', title: 'Two televisions',
    story: 'Two different television sets were each sold for 2040 rupees. On the first set the shop made a profit of 20 per cent. On the second set the shop made a loss of 20 per cent.',
    q: 'Altogether, did the shop make a profit or a loss, and by how many rupees? Type the amount, and put a minus sign in front if it was a loss (so a loss of 300 is -300).',
    answer: -170, unit: 'rupees',
    know: ['Both sets sold for 2040', 'First set: 20 per cent PROFIT, so its cost is less than 2040', 'Second set: 20 per cent LOSS, so its cost is more than 2040', 'Find each cost price first'],
    steps: [
      { ask: 'If a 20 per cent profit gives 2040, what was the cost of the first set? (2040 divided by 1.2)', ans: 1700, note: 'The selling price is 120 per cent of the cost.' },
      { ask: 'If a 20 per cent loss gives 2040, what was the cost of the second set? (2040 divided by 0.8)', ans: 2550, note: 'The selling price is 80 per cent of the cost.' },
      { ask: 'What did the two sets cost the shop altogether?', ans: 4250, note: '1700 + 2550.' },
      { ask: 'What did the shop receive altogether?', ans: 4080, note: '2040 + 2040.' },
      { ask: 'So what is the overall result? (received minus cost)', ans: -170, note: 'A negative number means a loss.' }
    ],
    hints: ['The two cost prices are NOT equal, even though the selling prices are - that is the trap.',
      'A 20 per cent profit means selling price is 1.2 times cost. A 20 per cent loss means selling price is 0.8 times cost.'],
    sol: 'Costs: 2040 / 1.2 = 1700 and 2040 / 0.8 = 2550, so 4250 altogether, while the shop took 4080. The shop LOST 170 rupees. Equal percentage up and down never cancels out, because the percentages are taken from different starting amounts - the classic trap in this question.' },

  { id: 'oly6-07', grade: 6, topic: 'Factors and multiples', title: 'The muffin packs',
    story: 'Bree is making identical packs of muffins. She has baked 12 chocolate, 24 strawberry and 18 banana muffins, and some blueberry muffins. Each pack must contain exactly one dozen muffins.',
    q: 'What is the smallest number of blueberry muffins she could have baked?',
    answer: 18, unit: 'blueberry muffins',
    know: ['Chocolate 12, strawberry 24, banana 18', 'Every pack holds 12 muffins', 'All packs are IDENTICAL, so the number of packs must divide each flavour exactly', 'Number of packs must divide 12, 24 and 18'],
    steps: [
      { ask: 'What is the biggest number that divides 12, 24 and 18 exactly?', ans: 6, note: 'That is the highest common factor.' },
      { ask: 'If she makes 6 identical packs, how many muffins is that in total?', ans: 72, note: '6 packs of a dozen.' },
      { ask: 'She has 12 + 24 + 18 = 54 muffins so far. How many blueberry muffins does she need to reach 72?', ans: 18, note: 'And 6 divides 18, so the packs work.' }
    ],
    hints: ['The number of packs has to divide every flavour exactly - start from the highest common factor of 12, 24 and 18.',
      'Once you know how many packs, the total number of muffins is fixed, and the blueberry ones are whatever is missing.'],
    sol: 'The number of packs must divide 12, 24 and 18, and the largest such number is 6. Six packs of 12 muffins is 72 muffins; she already has 54, so she needs 18 blueberry muffins (and 6 divides 18, so the packs really are identical). The hidden first step is deciding how many packs there are.' },

  { id: 'oly6-08', grade: 6, topic: 'Average speed', title: 'The long drive',
    story: 'Sam drove from town A to town B at an average speed of 70 km/h and it took one and a half hours. From town B to town C he increased his speed by 50 per cent. The distance from B to C is twice the distance from A to B.',
    q: 'What was his average speed for the whole journey from A to C, in km/h?',
    answer: 90, unit: 'km/h',
    know: ['A to B: 70 km/h for 1.5 hours', 'B to C: speed up by 50 per cent, so 105 km/h', 'B to C is twice the A to B distance', 'Average speed for the whole trip = total distance divided by total time'],
    steps: [
      { ask: 'How far is it from A to B? (70 x 1.5)', ans: 105, note: 'Speed times time gives distance.' },
      { ask: 'How far is B to C?', ans: 210, note: 'Twice 105.' },
      { ask: 'What speed did he use from B to C?', ans: 105, note: '70 plus half of 70.' },
      { ask: 'How long did B to C take? (210 divided by 105)', ans: 2, note: 'Hours.' },
      { ask: 'What is the total distance?', ans: 315, note: '105 + 210.' },
      { ask: 'What is the total time?', ans: 3.5, note: '1.5 + 2.' },
      { ask: 'So what is the average speed for the whole journey? (distance divided by time)', ans: 90, note: '315 divided by 3.5.' }
    ],
    hints: ['An average speed is never the average of the two speeds - it is total distance over total time.',
      'Turn the words into distance and time for each leg before you divide anything.'],
    sol: 'A to B: 70 x 1.5 = 105 km. B to C: speed rises 50 per cent to 105 km/h and the distance is 210 km, taking 2 hours. Total distance 315 km in 3.5 hours gives 90 km/h. Averaging the two speeds (70 and 105) would give the wrong answer - that is the trap.' },

  { id: 'oly6-09', grade: 6, topic: 'Balancing equations', title: 'Three letters',
    story: 'Three clues are given. First: X plus X plus X minus 4 equals 53. Second: X plus X minus Y equals 15. Third: X plus Y plus Z equals 50.',
    q: 'What is Z?',
    answer: 8, unit: '',
    know: ['3X - 4 = 53', '2X - Y = 15', 'X + Y + Z = 50', 'Find X first, then Y, then Z'],
    steps: [
      { ask: 'From 3X - 4 = 53, what is 3X?', ans: 57, note: 'Add the 4 back.' },
      { ask: 'So what is X?', ans: 19, note: 'Divide by 3.' },
      { ask: 'From 2X - Y = 15 with X = 19, what is 2X?', ans: 38, note: 'Two times 19.' },
      { ask: 'So what is Y?', ans: 23, note: '38 - Y = 15, so Y = 23.' },
      { ask: 'Now X + Y + Z = 50. What is X + Y?', ans: 42, note: '19 + 23.' },
      { ask: 'So what is Z?', ans: 8, note: '50 - 42.' }
    ],
    hints: ['Take the clues in the order they unlock: the first gives X, the second gives Y, the third gives Z.',
      'Substitute the letter you just found into the next clue.'],
    sol: '3X - 4 = 53 gives 3X = 57, so X = 19. Then 2X - Y = 15 gives 38 - Y = 15, so Y = 23. Then 19 + 23 + Z = 50 gives Z = 8. Clues like these are a chain: each one hands you the letter the next one needs.' },

  { id: 'oly6-10', grade: 6, topic: 'Logic and counting', title: 'The password',
    story: 'A four-letter password is made from the letters A, B, C, D and E, and no letter may be used more than once.',
    q: 'How many such passwords have either B or C in the second position?',
    answer: 48, unit: 'passwords',
    know: ['Five letters available: A, B, C, D, E', 'Each password uses four different letters', 'Position 2 must be B or C - that is 2 choices', 'The other three positions are filled from the four letters that remain'],
    steps: [
      { ask: 'How many choices are there for the second letter?', ans: 2, note: 'B or C.' },
      { ask: 'Once the second letter is chosen, how many letters are left to choose from?', ans: 4, note: 'Five letters minus the one used.' },
      { ask: 'How many ways can you fill the first position from those 4?', ans: 4, note: 'Any of the remaining letters.' },
      { ask: 'And the third position, from the 3 that are left?', ans: 3, note: 'One fewer each time.' },
      { ask: 'And the fourth position, from the 2 that are left?', ans: 2, note: 'One fewer again.' },
      { ask: 'Multiply them all together: 2 x 4 x 3 x 2. What do you get?', ans: 48, note: 'That is the number of passwords.' }
    ],
    hints: ['Fix the position the question cares about FIRST, then count what is left for the others.',
      'Multiply the number of choices for each position - that is the counting principle.'],
    sol: 'Second position: 2 choices (B or C). Then 4 letters remain for the first position, 3 for the third and 2 for the fourth: 2 x 4 x 3 x 2 = 48 passwords. Fix the restricted position first, then multiply the choices - that is how all counting questions are tamed.' },

  { id: 'oly6-11', grade: 6, topic: 'Time', title: 'The marathon',
    story: 'A runner began a marathon at 2:35 pm and it took him 3 hours and 45 minutes to run the race.',
    q: 'At what time did he cross the finish line? Type it as a 4-digit 24-hour time (so 8:20 pm is 2020).',
    answer: 1820, unit: '',
    know: ['Start: 2:35 pm', 'Duration: 3 hours 45 minutes', 'Add the hours first, then the minutes'],
    steps: [
      { ask: 'Three hours after 2:35 pm is what time? (4-digit)', ans: 1735, note: '5:35 pm.' },
      { ask: 'Now add 45 minutes to 5:35 pm. What time is it? (4-digit)', ans: 1820, note: '25 minutes to 6:00, then 20 more.' }
    ],
    hints: ['Do hours and minutes as two separate steps so you do not lose track of the carry.',
      'Going past 60 minutes means one more hour and the leftover minutes.'],
    sol: '2:35 pm plus 3 hours is 5:35 pm; adding 45 minutes gives 6:20 pm, which is 1820. Splitting the addition into hours and minutes is the safest way to handle times.' },

  { id: 'oly6-12', grade: 6, topic: 'Geometry and fractions', title: 'Four triangles',
    story: 'A square design is made of four congruent right triangles, as shown. Each triangle has shorter sides of 3 and 4 units, so the long side is 5 units. The shaded square in the middle is left over.',
    q: 'What fraction of the whole figure is shaded? Give the fraction like 3/16.',
    answer: '1/25', unit: '',
    art: 'triangles',
    know: ['The outer square has sides of 5 units, so its area is 5 x 5 = 25', 'Each triangle has legs 3 and 4, so its area is (3 x 4) / 2 = 6', 'There are four triangles, so they take 4 x 6 = 24 square units', 'The shaded part is whatever is left of the 25'],
    steps: [
      { ask: 'What is the area of the outer square?', ans: 25, note: 'Side times side.' },
      { ask: 'What is the area of ONE triangle?', ans: 6, note: 'Half of 3 times 4.' },
      { ask: 'What is the area of all four triangles together?', ans: 24, note: 'Four times six.' },
      { ask: 'So what area is left shaded?', ans: 1, note: '25 minus 24.' },
      { ask: 'So what fraction is shaded? Give it like 1/25.', ans: '1/25', note: 'One square unit out of 25.' }
    ],
    hints: ['Areas are easier than lengths here - count square units.',
      'Find the whole area and the triangles area, then the shaded part is the difference.'],
    sol: 'The outer square is 5 x 5 = 25 square units. Each triangle is half of 3 x 4 = 6 square units, so four of them cover 24, leaving just 1 square unit shaded: 1/25 of the figure. Notice the neat fact hiding inside: the triangles plus the shaded square are 24 + 1 = 25 = 5 x 5, which is why the 3, 4, 5 triangle is so special.' },

  { id: 'oly6-13', grade: 6, topic: 'Data and graphs', title: 'Which graph?',
    story: 'A class wants to show the NUMBER OF PAGES in each book in the classroom library. Most books have between 80 and 300 pages.',
    q: 'Which type of graph is best for this? Type one of: pictograph, stem and leaf plot, sector graph, double bar graph.',
    answer: 'stem and leaf plot', unit: '',
    know: ['The data are page counts: 84, 152, 296 and so on', 'These are two- and three-digit numbers, not categories', 'A pictograph shows counts of CATEGORIES (like favourite fruit)', 'A sector graph shows parts of a whole (percentages of one total)', 'A double bar graph compares two sets of categories'],
    steps: [
      { ask: 'Are the page numbers categories, or numbers on a scale? Type 1 for numbers, 0 for categories.', ans: 1, note: 'They are real numbers, so the tens digit can be a stem.' },
      { ask: 'Would a sector graph work? (It shows parts of one whole.) Type 1 for yes, 0 for no.', ans: 0, note: 'Page counts do not add up to one whole.' },
      { ask: 'So which graph suits a spread of two- and three-digit numbers best?', ans: 'stem and leaf plot', note: 'The stem is the tens digit, the leaf is the units digit.' }
    ],
    hints: ['Ask what kind of data it is: categories, parts of a whole, or numbers on a scale?',
      'Page counts are numbers on a scale, so you want a graph that keeps the digits - the stem and leaf plot.'],
    sol: 'A stem and leaf plot is the best choice. Page counts are numbers on a scale, not categories, and the stem and leaf keeps every digit so you can see the spread and the shape at a glance. A pictograph or bar graph suits categories, and a sector graph suits parts of a single whole.' },

  { id: 'oly6-14', grade: 6, topic: 'Rates and money', title: 'Two car parks',
    story: 'Garage A charges 8.75 for the first hour and 1.25 for each additional hour. Garage B charges 5.50 for the first hour and 2.50 for each additional hour.',
    q: 'What is the difference in cost for five hours, A minus B? Give the answer as a number (use a minus sign if B is dearer).',
    answer: -1.75, unit: 'rupees',
    know: ['Garage A: 8.75 first hour, then 1.25 per extra hour', 'Garage B: 5.50 first hour, then 2.50 per extra hour', 'Five hours means the first hour PLUS four more hours'],
    steps: [
      { ask: 'How many EXTRA hours beyond the first are there in five hours?', ans: 4, note: 'Do not forget the first hour is priced differently.' },
      { ask: 'What does five hours cost at Garage A?', ans: 13.75, note: '8.75 plus 4 x 1.25.' },
      { ask: 'What does five hours cost at Garage B?', ans: 15.5, note: '5.50 plus 4 x 2.50.' },
      { ask: 'So what is A minus B?', ans: -1.75, note: '13.75 - 15.50, so B costs 1.75 more.' }
    ],
    hints: ['The first hour is charged at a different rate - count the extra hours separately.',
      'Five hours is 1 hour plus 4 extra hours, not 5 extra hours.'],
    sol: 'Garage A: 8.75 + 4 x 1.25 = 13.75. Garage B: 5.50 + 4 x 2.50 = 15.50. So A minus B is -1.75, meaning Garage B costs 1.75 more for five hours. The trap is charging five extra hours instead of four - the first hour is always special.' },

  /* ===================== GRADE 7 - the next rung up ===================== */
  { id: 'oly7-01', grade: 7, topic: 'Fractions of a whole', title: 'The cricket school',
    story: 'In a school, three eighths of the students are boys. Two fifths of the boys play cricket, and three quarters of the girls play cricket. Altogether 396 students play cricket.',
    q: 'How many students are in the school?',
    answer: 640, unit: 'students',
    know: ['Boys: 3/8 of the school', 'Girls: 5/8 of the school', 'Cricket-playing boys: 2/5 of the boys', 'Cricket-playing girls: 3/4 of the girls', '396 students play cricket altogether'],
    steps: [
      { ask: 'What fraction of the whole school is made of boys who play cricket? (2/5 of 3/8) Give it like 5/24.', ans: '3/20', note: 'Multiply the fractions.' },
      { ask: 'What fraction of the whole school is girls who play cricket? (3/4 of 5/8) Give it like 7/40.', ans: '15/32', note: 'Multiply the fractions.' },
      { ask: '3/20 is the same as how many hundred-and-sixtieths? Type the top number.', ans: 24, note: 'Multiply top and bottom by 8.' },
      { ask: '15/32 is the same as how many hundred-and-sixtieths? Type the top number.', ans: 75, note: 'Multiply top and bottom by 5.' },
      { ask: 'So what fraction of the school plays cricket? Give it like 13/200.', ans: '99/160', note: '24 + 75 over 160.' },
      { ask: 'If 99/160 of the school is 396 students, what is the whole school? (396 divided by 99, times 160)', ans: 640, note: 'Find one hundred-and-sixtieth first.' }
    ],
    hints: ['Every group is a fraction OF THE WHOLE SCHOOL - turn them all into fractions of the school before adding.',
      'The cricket players are 99/160 of the school, so 396 is 99 hundred-and-sixtieths of the total.'],
    sol: 'Boys who play cricket: 2/5 x 3/8 = 6/40 = 3/20 of the school. Girls who play cricket: 3/4 x 5/8 = 15/32 of the school. Over a common denominator of 160 that is 24/160 + 75/160 = 99/160. So 396 is 99/160 of the school, one hundred-and-sixtieth is 4 students, and the school has 160 x 4 = 640 students. Multiply fractions to find a fraction OF a fraction.' },

  { id: 'oly7-02', grade: 7, topic: 'Number theory', title: 'Remainder one',
    story: 'A number leaves a remainder of 1 when it is divided by 2, by 3, by 4, by 5 and by 6.',
    q: 'What is the smallest such number?',
    answer: 61, unit: '',
    know: ['The number is 1 more than a multiple of 2, 3, 4, 5 and 6', 'So it is 1 more than a common multiple of those numbers', 'You want the SMALLEST such number, so use the lowest common multiple'],
    steps: [
      { ask: 'What is the lowest common multiple of 2, 3, 4, 5 and 6?', ans: 60, note: '4 and 6 cover 2 and 3, so you need 4, 5 and 6: 60.' },
      { ask: 'So what is the smallest number that leaves remainder 1?', ans: 61, note: 'One more than 60.' }
    ],
    hints: ['Remainder 1 means the number is exactly one more than a multiple.',
      'Find the lowest common multiple of 2, 3, 4, 5 and 6, then add one.'],
    sol: 'The number is one more than a common multiple of 2, 3, 4, 5 and 6. The lowest common multiple is 60, so the smallest such number is 61. Remainder questions turn into multiple questions once you subtract the remainder.' },

  { id: 'oly7-03', grade: 7, topic: 'Logic and counting', title: 'Digits adding to five',
    story: 'You are making three-digit numbers. The three digits of each number add up to exactly 5.',
    q: 'How many such numbers are there?',
    answer: 15, unit: 'numbers',
    know: ['The first digit cannot be 0, or it would not be a three-digit number', 'The digits add to 5', 'The digits may repeat (like 113)'],
    steps: [
      { ask: 'Start with the hundreds digit 1. How many ways can the last two digits add to 4? (list them: 04, 13, 22, 31, 40)', ans: 5, note: 'Five ways.' },
      { ask: 'Now hundreds digit 2: the last two must add to 3. How many ways?', ans: 4, note: '03, 12, 21, 30.' },
      { ask: 'Hundreds digit 3: last two add to 2. How many ways?', ans: 3, note: '02, 11, 20.' },
      { ask: 'Hundreds digit 4: last two add to 1. How many ways?', ans: 2, note: '01, 10.' },
      { ask: 'Hundreds digit 5: last two add to 0. How many ways?', ans: 1, note: 'Just 00, giving 500.' },
      { ask: 'Add them all: 5 + 4 + 3 + 2 + 1. What do you get?', ans: 15, note: 'That is the count.' }
    ],
    hints: ['Fix the first digit, then count the ways the last two can make up the rest.',
      'Do not forget the digits can repeat, and that the first digit cannot be zero.'],
    sol: 'For each hundreds digit, count the pairs that make up the remainder: 5 + 4 + 3 + 2 + 1 = 15 numbers. Fixing one digit and counting the rest is the standard way to count systematically instead of guessing.' },

  { id: 'oly7-04', grade: 7, topic: 'Balancing equations', title: 'Brackets',
    story: 'Three times the quantity X plus 4 equals five times X minus 2.',
    q: 'What is X?',
    answer: 7, unit: '',
    know: ['3(X + 4) = 5X - 2', 'Multiply out the bracket first', 'Then gather the X terms on one side'],
    steps: [
      { ask: 'What is 3 times (X + 4)? Type it like 3X+12.', ans: '3X+12', note: 'Multiply each part inside the bracket.' },
      { ask: 'So 3X + 12 = 5X - 2. Move the X terms: 12 + 2 = 5X - 3X. What is the left side?', ans: 14, note: '12 + 2.' },
      { ask: 'And 5X - 3X is how many X?', ans: 2, note: 'Two X.' },
      { ask: 'So 2X = 14. What is X?', ans: 7, note: 'Divide by 2.' }
    ],
    hints: ['Deal with the bracket first - multiply each term inside it.',
      'Then collect all the X terms on one side and all the plain numbers on the other.'],
    sol: '3(X + 4) = 3X + 12, so 3X + 12 = 5X - 2. Moving things gives 14 = 2X, so X = 7. Check: 3 x 11 = 33 and 5 x 7 - 2 = 33. Multiply out brackets before you move anything - it stops sign errors.' },

  { id: 'oly7-05', grade: 7, topic: 'Percentage', title: 'Up and down',
    story: 'A shop raises the price of a game by 20 per cent. A month later it cuts the new price by 20 per cent.',
    q: 'Compared with the original price, is the final price higher, lower, or the same? Type: higher, lower or same.',
    answer: 'lower', unit: '',
    know: ['The rise and the fall are both 20 per cent', 'The 20 per cent fall is taken from the RAISED price, not the original', 'Test it with a simple number, like 100'],
    steps: [
      { ask: 'Start at 100. After a 20 per cent rise, what is the price?', ans: 120, note: '100 plus 20.' },
      { ask: 'Now take 20 per cent off 120. What is 20 per cent of 120?', ans: 24, note: 'Not 20 - the base has changed.' },
      { ask: 'So what is the final price?', ans: 96, note: '120 minus 24.' },
      { ask: 'Is 96 higher, lower or the same as 100? Type the word.', ans: 'lower', note: 'Four per cent lower.' }
    ],
    hints: ['Try it with 100 rupees - invented numbers make percentage questions concrete.',
      'The second percentage is taken from a bigger number, so it removes more than the first one added.'],
    sol: 'Starting at 100: up 20 per cent gives 120, then down 20 per cent of 120 removes 24, leaving 96 - lower than the start. A rise and an equal fall never cancel, because each percentage is measured from a different base. Here the result is always 96 per cent of the original.' },

  { id: 'oly7-06', grade: 7, topic: 'Average speed', title: 'Half and half',
    story: 'A cyclist rides the first half of a journey at 60 km/h and the second half at 40 km/h.',
    q: 'What is the average speed for the whole journey, in km/h?',
    answer: 48, unit: 'km/h',
    know: ['Each half is the SAME DISTANCE', 'Different speeds for equal distances', 'Average speed = total distance divided by total time', 'Pick a convenient total distance, like 120 km'],
    steps: [
      { ask: 'Use a total distance of 120 km, so each half is 60 km. How long does the first half take at 60 km/h?', ans: 1, note: 'Hours.' },
      { ask: 'How long does the second half take at 40 km/h?', ans: 1.5, note: '60 divided by 40.' },
      { ask: 'What is the total time?', ans: 2.5, note: '1 + 1.5.' },
      { ask: 'So what is the average speed? (120 divided by 2.5)', ans: 48, note: 'Not 50 - the slow half takes longer.' }
    ],
    hints: ['You cannot average 60 and 40 to get 50 - equal distances at different speeds never average like that.',
      'Choose a total distance that divides nicely by both speeds, then use total distance over total time.'],
    sol: 'Take 120 km: 60 km at 60 km/h takes 1 hour, and 60 km at 40 km/h takes 1.5 hours, so 120 km takes 2.5 hours - an average of 48 km/h. The slow half eats more of the time, which drags the average below 50. This is the same trap as the two televisions: equal percentage or speed pairs never simply average.' }
  ];

  window.OLY = {
    list: OLY,
    byId: function (id) { for (var i = 0; i < OLY.length; i++) if (OLY[i].id === id) return OLY[i]; return null; },
    grades: function () { var g = {}; OLY.forEach(function (p) { g[p.grade] = (g[p.grade] || 0) + 1; }); return g; }
  };
})();
