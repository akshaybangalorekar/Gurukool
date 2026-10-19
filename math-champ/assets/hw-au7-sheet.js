/* ============================================================
   THE TEACHER'S OWN QUESTIONS - copied from the sheets, not rewritten
   The two AU Grade 7 sheets of 18 October 2026, 20 questions each, in the
   order they appear on the sheet, with the same options and the same wording.
   Nothing here is invented: these are the questions his teacher set.

   Only after all of them have been attempted does the Homework Club offer
   practice on the same topics (those are generated, in hw-au7.js).

   The answer for each was worked out from the question itself and checked.
   ============================================================ */
(function () {
  var DEG = '\u00B0';

  var WHOLE = [
    { q: 'What is the place value of the digit 7 in the whole number 4,572,809?',
      options: ['Hundreds of thousands (700,000)', 'Millions (7,000,000)', 'Thousands (7,000)', 'Tens of thousands (70,000)'],
      answer: 3, topic: 'Place value' },
    { q: 'Which whole number is represented by the expanded form: 3 \u00D7 100,000 + 5 \u00D7 10,000 + 8 \u00D7 100 + 4 \u00D7 1?',
      options: ['350,840', '358,004', '350,804', '3,508,004'], answer: 2, topic: 'Expanded form' },
    { q: 'A stadium hosted 14,250 spectators on Friday and 18,970 spectators on Saturday. How many total spectators attended over the two days?',
      options: ['33,120', '32,120', '33,220', '34,220'], answer: 2, topic: 'Adding' },
    { q: 'A warehouse had 8,500 boxes in stock. After delivering 3,745 boxes to retail stores, how many boxes remained in the warehouse?',
      options: ['4,755', '4,765', '4,855', '5,255'], answer: 0, topic: 'Subtracting' },
    { q: 'In the vertical addition algorithm for 4,839 + 3,768, what value is carried into the thousands column?',
      options: ['6', '0', '1', '2'], answer: 2, topic: 'Carrying' },
    { q: 'Calculate 5,004 \u2212 2,638 using the formal subtraction algorithm.',
      options: ['2,466', '3,366', '2,376', '2,366'], answer: 3, topic: 'Subtracting' },
    { q: 'Using the distributive property, calculate 8 \u00D7 47 by expanding 47 as (40 + 7).',
      options: ['386', '356', '376', '396'], answer: 2, topic: 'Distributive property' },
    { q: 'A store sells boxes of chocolates containing 24 chocolates each. If a customer purchases 9 boxes, how many total chocolates do they buy?',
      options: ['226', '206', '196', '216'], answer: 3, topic: 'Multiplying' },
    { q: 'Calculate the product of 345 \u00D7 28.',
      options: ['9,560', '9,660', '9,760', '8,660'], answer: 1, topic: 'Multiplying' },
    { q: 'A hotel has 125 rooms. If each room costs $140 per night, what is the total revenue collected if all rooms are booked for one night?',
      options: ['$17,500', '$16,500', '$18,500', '$17,000'], answer: 0, topic: 'Multiplying' },
    { q: 'Calculate 1,728 \u00F7 16.',
      options: ['112', '108', '118', '98'], answer: 1, topic: 'Dividing' },
    { q: 'A factory packages 845 tennis balls into cans that hold 4 balls each. How many full cans are packaged, and how many balls are left over?',
      options: ['212 full cans with 1 ball left over', '211 full cans with 1 ball left over',
                '211 full cans with 2 balls left over', '210 full cans with 5 balls left over'],
      answer: 1, topic: 'Division with a remainder' },
    { q: 'A school needs to transport 380 students on buses. Each bus can seat a maximum of 45 students. What is the minimum number of buses required to transport all students?',
      options: ['10 buses', '7 buses', '8 buses', '9 buses'], answer: 3, topic: 'Rounding up' },
    { q: 'Round 68,492 to the nearest thousand.',
      options: ['70,000', '68,500', '68,000', '69,000'], answer: 2, topic: 'Rounding' },
    { q: 'By rounding each number to its leading digit (1 significant figure), estimate the product of 492 \u00D7 38.',
      options: ['18,000', '25,000', '15,000', '20,000'], answer: 3, topic: 'Estimating' },
    { q: 'A company spent $18,920 on hardware and $31,250 on software. Estimate the total expenditure by rounding each amount to the nearest ten thousand.',
      options: ['$50,000', '$60,000', '$40,000', '$55,000'], answer: 0, topic: 'Estimating' },
    { q: 'Evaluate the expression: 18 + 12 \u00F7 3 \u00D7 2 \u2212 5',
      options: ['21', '35', '25', '15'], answer: 0, topic: 'Order of operations' },
    { q: 'Evaluate the expression: (15 \u2212 3) \u00D7 2<sup>3</sup> \u00F7 4',
      options: ['18', '24', '48', '36'], answer: 1, topic: 'Order of operations' },
    { q: 'Evaluate the expression: 50 \u2212 [4 + (8 \u2212 2) \u00D7 5]',
      options: ['34', '16', '20', '24'], answer: 1, topic: 'Order of operations' },
    { q: 'A teacher buys 5 packs of markers at $6 per pack and 3 boxes of pens at $4 per box. If she pays with a $50 bill, which mathematical expression correctly calculates her change in dollars, and what is the final amount?',
      options: ['50 \u2212 5 \u00D7 6 + 3 \u00D7 4 = $32', '(50 \u2212 5) \u00D7 6 + 3 \u00D7 4 = $282',
                '50 \u2212 (5 \u00D7 6 + 3 \u00D7 4) = $8', '50 \u2212 (5 \u00D7 6) \u00D7 (3 \u00D7 4) = $14'],
      answer: 2, topic: 'Writing an expression' }
  ];

  var LINES = [
    { q: 'What term describes three or more points that all lie on the exact same straight line?',
      options: ['Concurrent points', 'Parallel points', 'Collinear points', 'Coplanar points'],
      answer: 2, topic: 'Points and lines' },
    { q: 'When three or more straight lines intersect at a single common point, how are these lines described?',
      options: ['Perpendicular lines', 'Concurrent lines', 'Parallel lines', 'Collinear lines'],
      answer: 1, topic: 'Points and lines' },
    { q: 'A straight geometric figure starts at a fixed endpoint A and extends infinitely through point B in one direction. How is this figure named?',
      options: ['Line segment AB', 'Ray AB', 'Line AB', 'Angle AB'], answer: 1, topic: 'Points and lines' },
    { q: 'An angle measures 215' + DEG + '. How is this angle classified?',
      options: ['Reflex angle', 'Revolution', 'Acute angle', 'Obtuse angle'], answer: 0, topic: 'Classifying angles' },
    { q: 'What is the exact angle measure of one complete revolution?',
      options: ['360' + DEG, '180' + DEG, '90' + DEG, '270' + DEG], answer: 0, topic: 'Angle facts' },
    { q: 'Two angles are complementary. If one angle measures 34' + DEG + ', what is the measure of the other angle?',
      options: ['124' + DEG, '146' + DEG, '56' + DEG, '66' + DEG], answer: 2, topic: 'Complementary angles' },
    { q: 'Two adjacent angles lie on a straight line and are supplementary. If one angle is 112' + DEG + ', find the size of the other angle.',
      options: ['68' + DEG, '78' + DEG, '158' + DEG, '248' + DEG], answer: 0, topic: 'Angles on a straight line' },
    { q: 'Two straight lines intersect to form opposite angles. If one angle is 73' + DEG + ', what is the size of the vertically opposite angle?',
      options: ['107' + DEG, '73' + DEG, '287' + DEG, '173' + DEG], answer: 1, topic: 'Vertically opposite angles' },
    { q: 'Four angles meet at a single vertex point. Three of the angles measure 85' + DEG + ', 110' + DEG + ', and 95' + DEG + '. Find the size of the fourth missing angle x.',
      options: ['70' + DEG, '60' + DEG, '80' + DEG, '90' + DEG], answer: 0, topic: 'Angles at a point' },
    { q: 'Line AB is perpendicular to line CD, intersecting at point O to form right angle AOC (90' + DEG + '). Ray OE is drawn inside angle AOC such that angle AOE is 28' + DEG + '. What is the measure of angle EOC?',
      options: ['152' + DEG, '72' + DEG, '62' + DEG, '52' + DEG], answer: 2, topic: 'Angles inside a right angle' },
    { q: 'Two parallel lines are cut by a transversal line. If a given angle is 65' + DEG + ', what is the measure of its corresponding angle?',
      options: ['180' + DEG, '65' + DEG, '115' + DEG, '25' + DEG], answer: 1, topic: 'Corresponding angles' },
    { q: 'Two parallel lines are intersected by a transversal. One of the alternate interior angles measures 124' + DEG + '. What is the measure of the other alternate interior angle?',
      options: ['66' + DEG, '124' + DEG, '56' + DEG, '180' + DEG], answer: 1, topic: 'Alternate interior angles' },
    { q: 'Two parallel lines are intersected by a transversal. If one co-interior angle is 78' + DEG + ', what is the measure of the other co-interior angle on the same side of the transversal?',
      options: ['12' + DEG, '102' + DEG, '112' + DEG, '78' + DEG], answer: 1, topic: 'Co-interior angles' },
    { q: 'Two straight lines are cut by a transversal line. The interior angles on the same side of the transversal measure 82' + DEG + ' and 98' + DEG + '. Are the two lines parallel?',
      options: ['No, because the two interior angles are not equal', 'Yes, because the co-interior angles add up to 180' + DEG,
                'Yes, because alternate angles are equal', 'No, because their sum is less than 360' + DEG],
      answer: 1, topic: 'Deciding if lines are parallel' },
    { q: 'Two adjacent angles on a straight line are given by the expressions (3x + 15)' + DEG + ' and (2x + 10)' + DEG + '. Find the value of x.',
      options: ['35', '27', '25', '31'], answer: 3, topic: 'Finding x' },
    { q: 'Two intersecting lines form vertically opposite angles measuring (4x \u2212 20)' + DEG + ' and (2x + 30)' + DEG + '. Find the value of x.',
      options: ['20', '30', '25', '15'], answer: 2, topic: 'Finding x' },
    { q: 'Line AB is parallel to line CD. A triangle EFG has its top vertex E on line AB and its base vertices F and G on line CD. If angle AEF = 50' + DEG + ' and angle BEG = 60' + DEG + ', calculate interior top angle FEG of the triangle.',
      options: ['110' + DEG, '70' + DEG, '80' + DEG, '50' + DEG], answer: 1, topic: 'A triangle between parallels' },
    { q: 'Line L1 is parallel to line L2. A bent path forms an interior vertex V between the lines. The upper angle between L1 and the top arm is 35' + DEG + ', and the lower angle between L2 and the bottom arm is 45' + DEG + '. What is the total measure of interior angle V facing the opening?',
      options: ['70' + DEG, '100' + DEG, '80' + DEG, '90' + DEG], answer: 2, topic: 'A bent path between parallels' },
    { q: 'Line PQ is parallel to line RS. A transversal intersects PQ at point X and RS at point Y. If interior angle PXY is 135' + DEG + ', what is the size of its co-interior angle XYS on line RS?',
      options: ['90' + DEG, '45' + DEG, '180' + DEG, '135' + DEG], answer: 1, topic: 'Co-interior angles' },
    { q: 'Line m and line n are cut by a transversal line t. The alternate interior angles are measured as 115' + DEG + ' and 112' + DEG + '. Which conclusion is correct?',
      options: ['The lines are perpendicular because they intersect transversal t',
                'The lines are parallel because both angles are obtuse',
                'The lines are not parallel because alternate interior angles are not equal',
                'The lines are parallel because the sum is greater than 180' + DEG],
      answer: 2, topic: 'Deciding if lines are parallel' }
  ];

  window.AU7SHEET = { whole: WHOLE, lines: LINES };
})();
