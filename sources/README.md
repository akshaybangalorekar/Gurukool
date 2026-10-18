# Gurukool — original source material

These are the raw materials the question banks were built from. They live on
this `sources` branch, **not** on `main`, because the Gurukool site publishes
the whole repository on every deploy and a 52 MB scan would be re-uploaded
each time.

To get them in a fresh session:

    git clone --depth 1 --branch sources \
      https://github.com/akshaybangalorekar/Gurukool.git sources

## What is here

### `maths-olympiad-278-pages.pdf` (52 MB, 278 pages)
A scanned maths Olympiad question book. **It is a pure scan — there is no text
layer**, so text cannot be extracted; pages have to be rendered to images and
read as pictures. Use:

    python3 -c "import pymupdf; d=pymupdf.open('maths-olympiad-278-pages.pdf'); \
      d[0].get_pixmap(dpi=150).save('/scratch/work/p1.png')"

Then read the PNG with the image tool, a few pages at a time. Nothing has been
built from this yet — it is a reserve of problems.

### `maths-practice-photo-2026-09-30.jpg` (3.4 MB)
A photograph of a printed maths practice paper. The visible questions are:
- Q11 speed, distance and time — a two-leg journey with a 50% speed increase
  and the second leg twice the length of the first (answer B, 90 km/h)
- Q12 rectangle perimeter 30 cm, sides in ratio 2:3, find the area
  (answer C, 54 cm²)
- Q13 a chart question about the cost of TV advertising

Nothing has been built from this yet.

### `homework-linear-equations-2026-10-01.pdf` (57 KB, 3 pages)
The sheet the maths teacher set on 1 October 2026 — "HW - Atharv - 2026-10-01",
12 multiple-choice questions on linear equations.

**This is the one already built.** It became the Homework Club in Maths
(round 55), as five question types:
1. fractions on both sides — `(2x + 1) / 3 = (x + 5) / 2` (sheet Q4)
2. two fractions of x added — `x / 3 + x / 4 = 7` (sheet Q5)
3. a word problem hiding an equation (sheet Q6)
4. adjacent angles on a straight line (sheet Q11)
5. two fractions subtracted — `(x − 1) / 2 − (x − 3) / 3 = 2` (sheet Q12)

The generators for those five live in
`math-champ/assets/homework.js` on `main`. **Sheet questions 1, 2, 3, 7, 8, 9
and 10 are different shapes** (brackets, one-sided fractions, perimeter, ages,
a distance formula, ticket costs) and are deliberately not in the Homework
Club yet — Atharv's father asked for only the five he needed help with.

### `science-quest.html` (522 KB) and `science-quest-features.md` (7 KB)
An earlier single-file science game, "Science Quest by Gurukool", with its
feature list. It was the seed for Science-Champ: the worlds, the level ladder
and the ICAS-style questions. Kept for reference.

## Adding a new sheet

1. Put the file here with a clear name, dated as the teacher dated it.
2. Add a section to this README saying what it is and what was built from it.
3. On `main`, add the question types to the relevant champ and add an
   assignment row for the child (Parent Console → Setup → Homework
   assignments), so it appears in the Homework Club with its date.

Nothing here is ever served to the child. The child's pages read only what has
been built from these files.
