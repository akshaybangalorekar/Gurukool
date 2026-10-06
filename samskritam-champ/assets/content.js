/* ============================================================
   SAMSKRITAM-CHAMP — संस्कृतम्-चैम्प
   Learn Sanskrit as we talk: guided conversations with a guru.
   Every line: Devanagari + transliteration + pronunciation key +
   meaning. Tap any word for its stem and its cousin words.
   Scenes end with a FAMILY MISSION — two lines to say to each other.
   ============================================================ */

/* ---------- the word treasury: stem, meaning, cousins ---------- */
var SK_WORDS = {
  namaste:   { dev: 'नमस्ते',    say: 'nuh-mus-TAY',   mean: 'hello / I bow to you',      root: 'namas (bow) + te (to you)', cousins: 'namaskar, namāz — the same bow' },
  katham:    { dev: 'कथम्',      say: 'KUH-thum',      mean: 'how?',                      root: 'katham = in what way', cousins: 'kathā (story) — a story tells how it happened' },
  asi:       { dev: 'असि',       say: 'UH-si',         mean: 'you are',                   root: 'as (to be) + -si (you)', cousins: 'Hindi "hai", English "is" — all from the same old root' },
  samyak:    { dev: 'सम्यक्',    say: 'SUM-yuk',       mean: 'well / fine',               root: 'sam (together) + añc (to bend) → "properly"', cousins: 'samyak is used in "samyak darshan" (right seeing)' },
  dhanyavada:{ dev: 'धन्यवादः', say: 'DHUN-yuh-VAA-duh', mean: 'thank you',               root: 'dhanya (blessed) + vāda (speech)', cousins: 'Hindi "dhanyavaad" — exactly the same word' },
  punarapi:  { dev: 'पुनरपि',    say: 'PU-nur-uh-pi',  mean: 'again',                     root: 'punar (again) + api (also)', cousins: 'Hindi "phir" carries the same idea; punarjanma = rebirth' },
  nama:      { dev: 'नाम',       say: 'NAA-muh',       mean: 'name',                      root: 'nāman', cousins: 'Hindi "naam", English "name" — one old family' },
  kim:       { dev: 'किम्',      say: 'kim',           mean: 'what?',                     root: 'kim (question word)', cousins: 'Hindi "kya", Latin "quid" — question cousins' },
  mama:      { dev: 'मम',       say: 'MUH-muh',       mean: 'my / mine',                 root: 'mama (of me)', cousins: 'Hindi "mera"; English "me"' },
  asti:      { dev: 'अस्ति',     say: 'US-ti',         mean: 'is',                        root: 'as (to be) + -ti (he/she/it)', cousins: 'English "is", Latin "est" — the same ancient verb' },
  asmi:      { dev: 'अस्मि',     say: 'US-mi',         mean: 'I am',                      root: 'as (to be) + -mi (I)', cousins: 'English "am" — both begin with a' },
  mata:      { dev: 'माता',      say: 'MAA-taa',       mean: 'mother',                    root: 'mātṛ', cousins: 'Hindi "maa", English "mother" — say both aloud!' },
  pita:      { dev: 'पिता',      say: 'PI-taa',        mean: 'father',                    root: 'pitṛ', cousins: 'Hindi "pita", Latin "pater", English "father"' },
  bhrata:    { dev: 'भ्राता',    say: 'BHRA A-taa',    mean: 'brother',                   root: 'bhrātṛ', cousins: 'Hindi "bhai", English "brother"' },
  jalam:     { dev: 'जलम्',      say: 'JUH-lum',       mean: 'water',                     root: 'jalam', cousins: 'Hindi "jal"; the J sound links to "aqua" families' },
  pibami:    { dev: 'पिबामि',    say: 'pi-BAA-mi',     mean: 'I drink',                   root: 'pā/pib (to drink) + -āmi (I)', cousins: 'Hindi "peena"; English "imbibe"!' },
  phalam:    { dev: 'फलम्',      say: 'PHUH-lum',      mean: 'fruit',                     root: 'phalam', cousins: 'Hindi "phal"; also means "result" — fruit of your work' },
  khadami:   { dev: 'खादामि',    say: 'khaa-DAA-mi',   mean: 'I eat',                     root: 'khād (to eat) + -āmi (I)', cousins: 'Hindi "khaana" — same sound, same meaning' },
  dugdham:   { dev: 'दुग्धम्',   say: 'DUG-dhum',      mean: 'milk',                      root: 'duh (to milk)', cousins: 'Hindi "doodh" — you already know this word!' },
  rocate:    { dev: 'रोचते',     say: 'RO-chuh-tay',   mean: 'it is pleasing / I like it', root: 'ruc (to shine, to please)', cousins: 'Hindi "rochak" = interesting — same idea of shining' },
  am:        { dev: 'आम्',       say: 'aam',           mean: 'yes',                       root: 'ām', cousins: 'Hindi "haan"; the opposite is "na"' },
  kati:      { dev: 'कति',       say: 'KUH-ti',        mean: 'how many?',                 root: 'kati (question of number)', cousins: 'Hindi "kitne" — listen: kati / kitne' },
  eka:       { dev: 'एक',        say: 'ay-kuh',        mean: 'one',                       root: 'eka', cousins: 'Hindi "ek", English "one" (the "e" survived)' },
  dvi:       { dev: 'द्वि',       say: 'dvi',           mean: 'two',                       root: 'dvi', cousins: 'Hindi "do", English "two", "duo", "dual"' },
  tri:       { dev: 'त्रि',       say: 'tri',           mean: 'three',                     root: 'tri', cousins: 'English "three", "tri-angle" — three angles!' },
  pancha:    { dev: 'पञ्च',      say: 'PUN-chuh',      mean: 'five',                      root: 'pañca', cousins: 'Hindi "paanch", English "five", the "Punjab" = five waters' },
  dasha:     { dev: 'दश',        say: 'DUH-shuh',      mean: 'ten',                       root: 'daśa', cousins: 'Hindi "das", English "decade", "decimal"' },
  kakah:     { dev: 'काकः',      say: 'KAA-kuh',       mean: 'a crow',                    root: 'kāka', cousins: 'the crow says "kaa" — its own name in Sanskrit!' },
  asit:      { dev: 'आसीत्',     say: 'AA-seet',       mean: 'there was / he was',         root: 'as (to be), past tense', cousins: 'the past of "is" — "there was"' },
  ghatam:    { dev: 'घटः',       say: 'GHUH-tuh',      mean: 'a pot',                     root: 'ghaṭa', cousins: 'Hindi "ghada" — a pot, the same word' },
  buddhih:   { dev: 'बुद्धिः',    say: 'BUD-dhih',      mean: 'intelligence',              root: 'budh (to know, to wake)', cousins: 'Buddha = the awakened one; Hindi "buddhi" = brains' },
  balam:     { dev: 'बलम्',      say: 'BUH-lum',       mean: 'strength',                  root: 'bala', cousins: 'Hindi "bal" = strength; "balwan" = strong' },
  shreshtha: { dev: 'श्रेष्ठा',   say: 'SHRAY-shthaa',  mean: 'better / the best',         root: 'śreṣṭha (from śrī, excellence)', cousins: 'Hindi "shreshth" = excellent — the same word' }
};

/* ---------- scenes: the conversations ---------- */
var SK_SCENES = [
{ id: 's1', name: 'First Words', icon: '🙏', level: 'Praveshikā',
  blurb: 'Greet the guru and answer your first question in Sanskrit.',
  intro: 'You meet the village guru at the temple steps. He smiles and greets you — in Sanskrit, of course.',
  turns: [
    { g: { dev: 'नमस्ते!', tr: 'namaste!', say: 'nuh-mus-TAY', mean: 'Hello! (I bow to you)' },
      opts: [ { tr: 'namaste', dev: 'नमस्ते', mean: 'Hello to you too', ok: 1 }, { tr: 'dhanyavādaḥ', dev: 'धन्यवादः', mean: 'Thank you' } ] },
    { g: { dev: 'कथम् असि?', tr: 'katham asi?', say: 'KUH-thum UH-si', mean: 'How are you?' },
      opts: [ { tr: 'samyak asmi', dev: 'सम्यक् अस्मि', mean: 'I am well', ok: 1 }, { tr: 'nama kim?', dev: 'नाम किम्?', mean: 'what is a name?' } ],
      after: 'You just answered a question with a full sentence — that is how Sanskrit is actually spoken.' },
    { g: { dev: 'शोभनम्! अहं गुरुः अस्मि।', tr: 'śobhanam! ahaṃ guruḥ asmi.', say: 'SHO-bhu-num! uh-HUM GU-rus US-mi', mean: 'Wonderful! I am the guru.' },
      opts: [ { tr: 'aham ... asmi', dev: 'अहं ... अस्मि', mean: 'I am ... (say your own!)', ok: 1 } ],
      after: 'PATTERN! Look at "asmi" — it means "I am". Say it again and again: asmi, asmi, asmi.' },
    { g: { dev: 'धन्यवादः! पुनरपि मिलामः।', tr: 'dhanyavādaḥ! punarapi milāmaḥ.', say: 'DHUN-yuh-VAA-duh! PU-nur-uh-pi mi-LAA-muh', mean: 'Thank you! We shall meet again.' },
      opts: [ { tr: 'punarapi milāmaḥ', dev: 'पुनरपि मिलामः', mean: 'We shall meet again', ok: 1 }, { tr: 'namaste', dev: 'नमस्ते', mean: 'Hello (again!)' } ] }
  ],
  mission: { title: 'Tonight at the temple steps', lines: [ { who: 'Child', dev: 'नमस्ते! कथम् असि?', tr: 'namaste! katham asi?', mean: 'Hello! How are you?' }, { who: 'Parent', dev: 'सम्यक् अस्मि, धन्यवादः।', tr: 'samyak asmi, dhanyavādaḥ.', mean: 'I am well, thank you.' } ] } },

{ id: 's2', name: 'Who Is in Your Family?', icon: '👨‍👩‍👦', level: 'Praveshikā',
  blurb: 'Introduce yourself and your family in Sanskrit.',
  intro: 'The guru is making a family tree for the village festival — and he needs your family in it.',
  turns: [
    { g: { dev: 'भवतः नाम किम्?', tr: 'bhavataḥ nāma kim?', say: 'BHU-vuh-tuh NAA-muh kim', mean: 'What is your name?' },
      opts: [ { tr: 'mama nāma ... asti', dev: 'मम नाम ... अस्ति', mean: 'My name is ...', ok: 1 }, { tr: 'katham asi?', dev: 'कथम् असि?', mean: 'How are you?' } ],
      after: 'PATTERN! "mama" = my, "nāma" = name, "asti" = is. Three words, one sentence — Sanskrit likes short, clear sentences.' },
    { g: { dev: 'शोभनं नाम! कः एषः?', tr: 'śobhanaṃ nāma! kaḥ eṣaḥ?', say: 'SHO-bhu-num NAA-muh! kuh AY-shuh', mean: 'A lovely name! Who is this?' },
      opts: [ { tr: 'eṣaḥ mama pitā', dev: 'एषः मम पिता', mean: 'This is my father', ok: 1 }, { tr: 'eṣā mama mātā', dev: 'एषा मम माता', mean: 'This is my mother', ok: 1 } ],
      after: 'PATTERN! "eṣaḥ" for a man, "eṣā" for a woman. Sanskrit even has different words for he-is-this and she-is-this.' },
    { g: { dev: 'अतीव उत्तमम्! अन्ये के?', tr: 'atīva uttamam! anye ke?', say: 'uh-TEE-vuh ut-tuh-mum! UN-yay kay', mean: 'Excellent! Who else?' },
      opts: [ { tr: 'saḥ mama bhrātā', dev: 'सः मम भ्राता', mean: 'He is my brother', ok: 1 }, { tr: 'sā mama bhaginī', dev: 'सा मम भगिनी', mean: 'She is my sister', ok: 1 } ] },
    { g: { dev: 'धन्यवादः! इदानीं मम परिवारः पूर्णः।', tr: 'dhanyavādaḥ! idānīṃ mama parivāraḥ pūrṇaḥ.', say: 'DHUN-yuh-VAA-duh! i-DAA-neem MUH-muh PU-ri-vaa-rus POOR-nus', mean: 'Thank you! Now my family (list) is complete.' },
      opts: [ { tr: 'dhanyavādaḥ', dev: 'धन्यवादः', mean: 'Thank you', ok: 1 } ] }
  ],
  mission: { title: 'Family introductions at dinner', lines: [ { who: 'Child', dev: 'एषः मम पिता।', tr: 'eṣaḥ mama pitā.', mean: 'This is my father.' }, { who: 'Parent', dev: 'एषा मम माता।', tr: 'eṣā mama mātā.', mean: 'This is my mother.' } ] } },

{ id: 's3', name: 'At the Table', icon: '🍚', level: 'Praveshikā',
  blurb: 'Ask for water and talk about food — the first real sentences you will use every day.',
  intro: 'Dinner is ready. The guru is a guest at your table, and he will only pass the water if you ask in Sanskrit!',
  turns: [
    { g: { dev: 'इदं जलम्। जलं वाञ्छसि?', tr: 'idaṃ jalam. jalaṃ vāñchasi?', say: 'i-DUM JUH-lum. JUH-lum VAAN-chuh-si', mean: 'This is water. Do you want water?' },
      opts: [ { tr: 'ām, jalaṃ vāñchāmi', dev: 'आम्, जलं वाञ्छामि', mean: 'Yes, I want water', ok: 1 }, { tr: 'na, dhanyavādaḥ', dev: 'न, धन्यवादः', mean: 'No, thank you', ok: 1 } ],
      after: 'PATTERN! "-āmi" at the end means "I do". vāñchāmi = I want. You will see this ending again and again.' },
    { g: { dev: 'शोभनम्! अहं जलं पिबामि। त्वम्?', tr: 'śobhanam! ahaṃ jalaṃ pibāmi. tvam?', say: 'SHO-bhu-num! uh-HUM JUH-lum pi-BAA-mi. tvum', mean: 'Good! I drink water. And you?' },
      opts: [ { tr: 'aham jalaṃ pibāmi', dev: 'अहं जलं पिबामि', mean: 'I drink water', ok: 1 } ],
      after: 'PATTERN DISCOVERED! pibāmi, vāñchāmi — both end in -āmi = "I do". You have just found the present tense, all by yourself.' },
    { g: { dev: 'अहं फलं खादामि। फलं रोचते?', tr: 'ahaṃ phalaṃ khādāmi. phalaṃ rocate?', say: 'uh-HUM PHUH-lum khaa-DAA-mi. PHUH-lum RO-chuh-tay', mean: 'I eat a fruit. Do you like fruit?' },
      opts: [ { tr: 'ām, phalaṃ rocate', dev: 'आम्, फलं रोचते', mean: 'Yes, I like fruit', ok: 1 }, { tr: 'dugdhaṃ rocate', dev: 'दुग्धं रोचते', mean: 'I like milk', ok: 1 } ] },
    { g: { dev: 'अतीव शोभनम्! खादामि, पिबामि, रोचते — वाक्यानि तव!', tr: 'atīva śobhanam! khādāmi, pibāmi, rocate — vākyāni tava!', say: 'uh-TEE-vuh SHO-bhu-num! khaa-DAA-mi, pi-BAA-mi, RO-chuh-tay', mean: 'Excellent! I eat, I drink, it pleases — these sentences are yours!' },
      opts: [ { tr: 'dhanyavādaḥ', dev: 'धन्यवादः', mean: 'Thank you', ok: 1 } ] }
  ],
  mission: { title: 'Tonight at the dinner table', lines: [ { who: 'Child', dev: 'जलं वाञ्छसि?', tr: 'jalaṃ vāñchasi?', mean: 'Do you want water?' }, { who: 'Parent', dev: 'आम्, जलं वाञ्छामि। धन्यवादः।', tr: 'ām, jalaṃ vāñchāmi. dhanyavādaḥ.', mean: 'Yes, I want water. Thank you.' } ] } },

{ id: 's4', name: 'How Many?', icon: '🔢', level: 'Praveshikā',
  blurb: 'Numbers 1–10 — and the moment you will see English hiding inside Sanskrit.',
  intro: 'The guru is counting mangoes for the festival. He counts in Sanskrit, and suddenly you will recognise the words.',
  turns: [
    { g: { dev: 'एक, द्वि, त्रि — श‍ृणु, किं श‍ृणोसि?', tr: 'eka, dvi, tri — śṛṇu, kiṃ śṛṇoṣi?', say: 'ay-kuh, dvi, tri — SHRI-nu', mean: 'One, two, three — listen, what do you hear?' },
      opts: [ { tr: 'tri — three!', dev: 'त्रि', mean: 'tri sounds like three!', ok: 1 }, { tr: 'dvi — two!', dev: 'द्वि', mean: 'dvi sounds like duo!', ok: 1 } ],
      after: 'COGNATE FOUND! Sanskrit tri → English "three" and "tri-angle". dvi → "duo", "dual". These words are 4000-year-old cousins.' },
    { g: { dev: 'कति फलानि सन्ति?', tr: 'kati phalāni santi?', say: 'KUH-ti PHUH-laa-ni SUN-ti', mean: 'How many fruits are there?' },
      opts: [ { tr: 'pañca phalāni', dev: 'पञ्च फलानि', mean: 'five fruits', ok: 1 }, { tr: 'tri phalāni', dev: 'त्रि फलानि', mean: 'three fruits' } ],
      after: 'PATTERN! "kati" = how many. Listen to it next to Hindi "kitne" — the same question in two languages.' },
    { g: { dev: 'दश फलानि! अथ गणय — एक, द्वि, त्रि, चत्वारि, पञ्च, षट्, सप्त, अष्ट, नव, दश।', tr: 'daśa phalāni! atha gaṇaya — eka, dvi, tri, catvāri, pañca, ṣaṭ, sapta, aṣṭa, nava, daśa.', say: 'DUH-shuh PHUH-laa-ni! UH-thuh GUH-nuh-yuh', mean: 'Ten fruits! Now count — 1 to 10.' },
      opts: [ { tr: 'sapta — seven!', dev: 'सप्त', mean: 'sapta sounds like seven', ok: 1 }, { tr: 'nava — nine!', dev: 'नव', mean: 'nava sounds like nine', ok: 1 }, { tr: 'dasha — ten!', dev: 'दश', mean: 'dasha sounds like decimal', ok: 1 } ],
      after: 'COGNATES! sapta → seven. nava → nine. daśa → ten, decade, decimal. You will never forget these — you already knew them.' },
    { g: { dev: 'शोभनम्! संस्कृतस्य सङ्ख्याः तव मित्राणि।', tr: 'śobhanam! saṃskṛtasya saṅkhyāḥ tava mitrāṇi.', say: 'SHO-bhu-num! sum-SKRI-tuh-syuh SUN-khyuh TUH-vuh MIT-raa-ni', mean: 'Wonderful! Sanskrit\'s numbers are your friends.' },
      opts: [ { tr: 'dhanyavādaḥ', dev: 'धन्यवादः', mean: 'Thank you', ok: 1 } ] }
  ],
  mission: { title: 'Count something together tonight', lines: [ { who: 'Child', dev: 'कति फलानि?', tr: 'kati phalāni?', mean: 'How many fruits?' }, { who: 'Parent', dev: 'पञ्च फलानि।', tr: 'pañca phalāni.', mean: 'Five fruits.' } ] } },

{ id: 's5', name: 'The Thirsty Crow', icon: '🐦‍⬛', level: 'Vākya',
  blurb: 'A tiny Panchatantra story in simple Sanskrit — and its moral.',
  intro: 'The guru tells the oldest story of cleverness: the thirsty crow and the pot of water.',
  turns: [
    { g: { dev: 'एकः काकः आसीत्। सः पिपासितः आसीत्।', tr: 'ekaḥ kākaḥ āsīt. saḥ pipāsitaḥ āsīt.', say: 'AY-kuh KAA-kuh AA-seet. SUH pi-PAA-si-tuh AA-seet', mean: 'There was a crow. He was thirsty.' },
      opts: [ { tr: 'kākaḥ — a crow!', dev: 'काकः', mean: 'the crow — it says "kaa"', ok: 1 } ],
      after: 'PATTERN! "āsīt" = there was / he was. It is the past of "asti" (is). Same verb, older time.' },
    { g: { dev: 'घटे जलम् आसीत्, परं जलम् अधः आसीत्।', tr: 'ghaṭe jalam āsīt, paraṃ jalam adhaḥ āsīt.', say: 'GHUH-tay JUH-lum AA-seet, PUH-rum JUH-lum UH-dhuh AA-seet', mean: 'There was water in the pot, but the water was low.' },
      opts: [ { tr: 'ghaṭaḥ — a pot!', dev: 'घटः', mean: 'the pot — like Hindi ghada', ok: 1 } ] },
    { g: { dev: 'काकः पाषाणान् घटे अपातयत्। जलम् उपरि आगच्छत्।', tr: 'kākaḥ pāṣāṇān ghaṭe apātayat. jalam upari āgacchat.', say: 'KAA-kuh PAA-shaa-NAAN GHUH-tay uh-PAA-tuh-yut. JUH-lum U-puh-ri AA-guh-chut', mean: 'The crow dropped pebbles into the pot. The water came up.' },
      opts: [ { tr: 'buddhi!', dev: 'बुद्धिः', mean: 'intelligence! (his cleverness)', ok: 1 }, { tr: 'balam!', dev: 'बलम्', mean: 'strength! (his muscle)' } ],
      after: 'Think! Did the crow use strength or cleverness? Remember your answer — the next line is the moral.' },
    { g: { dev: 'काकः जलम् अपिबत्। बुद्धिः बलात् श्रेष्ठा।', tr: 'kākaḥ jalam apibat. buddhiḥ balāt śreṣṭhā.', say: 'KAA-kuh JUH-lum UH-pi-but. BUD-dhih BUH-laat SHRAY-shthaa', mean: 'The crow drank the water. Intelligence is better than strength.' },
      opts: [ { tr: 'buddhiḥ balāt śreṣṭhā', dev: 'बुद्धिः बलात् श्रेष्ठा', mean: 'Intelligence is better than strength', ok: 1 } ],
      after: 'A maxim you now own: buddhiḥ balāt śreṣṭhā — intelligence is greater than strength. Say it to your father tonight.' }
  ],
  mission: { title: 'Tell the story tonight', lines: [ { who: 'Child', dev: 'बुद्धिः बलात् श्रेष्ठा।', tr: 'buddhiḥ balāt śreṣṭhā.', mean: 'Intelligence is better than strength.' }, { who: 'Parent', dev: 'सत्यम्! शोभनम्।', tr: 'satyam! śobhanam.', mean: 'True! Wonderful.' } ] } }
];
