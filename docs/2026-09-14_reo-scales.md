# Japanese and gamelan scales for Reo

Research record

Scales listed in the shooting plan are marked ★

---

# PART 1. VOCABULARY

## 1.1 Terms

| term | meaning |
|---|---|
| **EDO** | Equal Division of the Octave. *n*-EDO cuts the octave into *n* equal steps of 1200/*n* cents. 12-EDO = 12-TET = the piano. 5-EDO = 240¢ steps. Equal-tempered by definition. |
| **cent** | 1/100 of a 12-TET semitone. 1200 cents to the octave. cents = 1200 × log₂(ratio). |
| **hemitonic / anhemitonic** | A scale containing semitone steps / containing none. The Yo set below has no semitone steps, so it is anhemitonic; Insen has one and Iwato two, so both are hemitonic. |
| **pitch-class set** | The notes of a scale reduced to numbers 0–11 from the root, ignoring octave. `0 1 5 7 8`. |
| **rotation** | Taking a different member of the set as root, giving the same notes with a different tonic. Western modes are rotations of the major scale. |
| **interval-class vector** | Count of how many times each interval size appears in a set. It is invariant under rotation, so two rotations of one set have identical interval content. Used below to settle the "three semitones" question. |
| **tetrachord** (Koizumi) | Two nuclear tones a perfect fourth apart plus one movable tone between them. Three notes, taking its name from the Greek term for the fourth it spans (§3.5). |
| **nuclear tone** (Koizumi) | A pole of melodic gravity. They come in pairs a fourth apart, neither subordinate to the other. |
| **chōshi** (調子) | Japanese: *tuning*. Where you put the koto bridges. |
| **laras** | Javanese/Sundanese: a tuning system. Slendro and pelog are the two laras. |
| **pathet** | Javanese mode. Covers gong tones, register and cadential formulas as well as which notes are available. |
| **embat** | The particular interval flavour of one gamelan set; the reason no two gamelans match. |
| **tumbuk** | The one pitch shared between the slendro and pelog halves of a double gamelan. |
| **ombak** | Balinese: "waves". The deliberate beating between paired detuned instruments. |
| **pande** | Balinese: the smith who also tunes. |
| **pengumbang / pengisep** | The lower and higher instrument of a Balinese tuned pair. |
| **balungan** | Javanese: the skeleton melody, carried by saron and slenthem, elaborated by the faster instruments. |

## 1.2 The cent

Alexander Ellis invented the cent in 1885, for the paper *On the Musical Scales
of Various Nations* and for Appendix XX of his translation of Helmholtz. He
wanted a neutral yardstick for comparing scales from Greece, Arabia, India, Java
and Japan, which happens to cover both traditions in this document. Wanting a
unit uncommitted to any one system, he took Bosanquet's suggestion of a
logarithmic subdivision of the equal-tempered semitone.

What follows from that:

- Cents measure any interval: `1200 · log₂(r)`, so 3/2 comes out at 701.955¢.
- Cents generate nothing, because every just interval is irrational in cents. You
  can round 3/2 to 702, but you cannot arrive at it by cent arithmetic.
- The unit has 12-TET inside its definition, which is why "gamelan in cents" feels
  like a translation. It is one, and Ellis designed it to be.

For practical purposes, ratios are the construction language and cents are the
implementation language. Every Japanese scale below is derived as ratios and then
rendered in cents for data entry. The gamelan scales have no ratio basis to derive
from, since they are measured objects, so cents are their native form.

## 1.3 Recipe format

Every scale below appears as:

```
NAME
derivation   how the set is constructed
steps        adjacent step sizes, in semitones
12-TET       pitch-class set
cents        the tuned version
ratios       where ratios exist
Δ vs 12-TET  offset per degree, for MIDI-note-plus-cents entry
Hz           at the recommended root
compass      field counts for one octave, two octaves and 19 fields (§6.2),
             with the top frequency of the 19-field build
```

Compass counts follow from the scale size. A five-note scale closes one octave at
6 fields and two at 11; a seven-note scale closes one at 8 and two at 15.
Nineteen fields runs past the last closed octave in both cases. §6.4 gives the
recommended count for each scale.

Gamelan recipes drop the `derivation` and `ratios` lines, having neither, and
merge the 12-TET and Δ lines, since the nearest note and its offset are the same
piece of information.

Each recipe sits under its own heading and is the canonical entry for that scale.
Everything else in the document refers back to it, and the build list in §6.4
links to each one.

---

# PART 2. PITCH SYSTEMS

## 2.1 Western

Start with ratios (3:2, 4:3) and stack them into a Pythagorean diatonic. The
stack never closes, since twelve fifths overshoot seven octaves by a comma, and
every subsequent move in Western tuning history responds to that failure.
Meantone sacrifices fifths to save thirds, well temperaments distribute the error
unevenly, and 12-TET distributes it evenly, which buys unlimited transposition
and modulation at the cost of leaving only the octave pure.

Three assumptions drive that history. Pitch is absolute and portable, so A is A
everywhere. Simultaneity matters, so harmony forces the ratio problem into the
open. And instruments must agree, because an orchestra, a transposition and a key
change all require a shared grid.

## 2.2 Japanese

None of the three assumptions hold in the same way.

Pitch is situational, and the koto is retuned to the singer, mid-piece if needed.
Notation is mostly tablature, with koto scores naming strings and shakuhachi
scores naming fingerings, so a written piece specifies a gesture whose sounding
pitch depends on the tuning in force. Melody is organised around a pair of nuclear
tones a fourth apart, neither subordinate to the other, which is a deliberately
anti-tonal formulation on Koizumi's part. Most traditional textures are
heterophonic, so no chord ever forces a temperament decision. Timbre carries
structural weight, and the shamisen's *sawari* buzz and the shakuhachi's breath
noise are built in on purpose.

With no harmony there is no closure problem, and with no closure problem there is
no temperament. The one place Japan does have an absolute, systematic pitch grid
is gagaku, whose grid is Pythagorean (§3.2), inherited from China, and never
needed tempering because gagaku does not modulate in the Western sense.

## 2.3 Gamelan

The tuning belongs to the set. A gamelan is an individual with a proper name
(Kyai Kanyut Mesem, Kyai Kangjeng Fatahillah), and its laras is part of that
identity in the way a voice is. There is no reference pitch, no transposition
between gamelans and no modulation, so a piece played on a different gamelan
becomes a different experience, which is understood as a feature.

The tuner (*pande*) works to the ensemble and the repertoire. Bronze bars are
inharmonic, so small-integer ratios buy almost no sensory consonance, which
removes the pressure that produced Western temperament in the first place. In
Bali the beating between instruments is engineered deliberately.

Mode (*pathet*) is behavioural: which tones can end a phrase, which register, and
which melodic formulas.

---

# PART 3. JAPAN

## 3.1 Periods

| period | dates | contribution |
|---|---|---|
| Nara | 710–794 | gagaku imported from Tang China and Korea; twelve-pitch system arrives |
| Heian | 794–1185 | gagaku codified; Buddhist *shōmyō* chant; *go-in hakase* neume notation |
| Kamakura–Muromachi | 1185–1573 | *nō* theatre; imprecise, inflected pitch |
| **Edo** | **1603–1867** | koto, shamisen, shakuhachi *honkyoku*. Five of the six ★ Japanese scales belong to this period or are abstractions from it; Ryūkyū belongs to the separate Okinawan thread below. The chōshi tunings and the miyako-bushi sound world. |
| Meiji | 1868–1912 | Westernisation. Staff notation, equal temperament, the in/yō theory, school music (§3.11) |

Okinawa runs on a separate thread, the Ryūkyū Kingdom having stayed independent
until 1879.

## 3.2 Absolute pitch

Japanese pitch runs on three layers, and only one of them offers an absolute
standard that could replace A440.

**Gagaku has a real standard.** The twelve pitches (*jūni-ritsu*) are generated by
the Chinese *sanbun son'eki* method, successive 3:2 fifths, which is Pythagorean
tuning. Gagaku ensembles tune to ōshiki (A) at roughly 430 Hz, about a quarter
tone below modern concert pitch, and traditional *shō* are built to it. The names,
ascending from ichikotsu at roughly D:

> ichikotsu · tangin · hyōjō · shōzetsu · shimomu · sōjō · fushō · **ōshiki** · rankei · banshiki · shinsen · kamimu

Only six serve as tonics: ryo on D (ichikotsu), G (sōjō) and E (taishiki); ritsu
on E (hyōjō), A (ōshiki) and B (banshiki). E carries two names so that the two
scales can be distinguished on the same pitch.

**Koto and shamisen have no standard**, being tuned by ear to the singer. There
is no historically correct absolute root for hirajōshi, only a conventional modern
notation (koto string 1 = D) that is itself a Meiji-era artefact.

**Shakuhachi derives pitch from a physical measure.** Flutes are named by length
in *shaku* (about 30.3 cm) and *sun* (a tenth of a shaku), and the standard 1.8
shaku of about 54.5 cm sounds D. Length determines pitch, and the naming
convention is the length. The same principle appears in Sunda, where a gamelan
degung is identified as surupan "57" because its root is that of a 57 cm suling,
giving Da = 401 Hz.

**Where a root might come from.** Three possibilities, none excluding the others:

- **The voice.** Koto and shamisen are tuned to the singer, so picking a root by
  where it sits for you is what the tradition actually does. Note that the
  melodic action sits an octave or two above the root, around G#3 at 208 Hz or
  B3 at 247 Hz.
- **Convention.** B is the reference pitch in the theory literature. Shamisen
  *honchōshi* is roughly B–E–B, and Koizumi transcribes his *nagauta* example in
  it with nuclear tones on E and B. B is also *banshiki*, one of the six gagaku
  tonics; G#/A♭ (*rankei*) is one of the twelve pitches but not a mode centre.
  The gagaku point carries less weight here, since gagaku is court repertoire
  anchored by the fixed-pitch shō rather than the koto and shamisen world these
  six scales come from.
- **The instrument.** Whatever field the layout puts at the bottom.

Numbers for either root, Pythagorean from ōshiki A = 430:

- **B2 = 120.94 Hz.** All Hz figures below use this.
- **A♭2 = 100.67 Hz** for a G# root.
- A440 equivalents are B2 = 123.47 and G#2 = 103.83, for the Meiji and modern
  convention (§3.11).

## 3.3 Note names

Three systems operate at once, and they name three different things.

| layer | what gets named | example |
|---|---|---|
| gagaku | **absolute pitches**, 12 names, as above | ōshiki, banshiki |
| koto | **strings** | 一二三四五六七八九十斗為巾 (ichi, ni, san … to, i, kin) |
| shakuhachi | **fingerings** | ro, tsu, re, chi, ri |
| shōmyō | **scale degrees**, by the angle of a neume stroke | *go-in hakase* |

Only gagaku names pitch the way the West does, while everything Edo-period names
an action on an instrument. A koto score tells you which string to pluck, and what
that string sounds is whatever the chōshi made it, which is why "the hirajōshi
scale" is a category error at source: the tradition never named that abstraction.

Gagaku's twelve map approximately onto the chromatic twelve (mod 12), the
approximation arising because the generation method differs and the reference is
430 against 440. The Western seven-name and twelve-pitch split, letter names plus
accidentals, has no Japanese counterpart at all, so there is no mod-7 layer.

## 3.4 SCALE SET A: gagaku ryo and ritsu

The only Japanese scales with a documented absolute tuning, buildable directly
from the Pythagorean jūni-ritsu. They are absent from the ★ list, and they are
the historical root layer beneath everything else in Part 3.

#### Ryo

```
RYO, pentatonic core
derivation   gagaku's other mode; major third above the tonic
steps        2 · 2 · 3 · 2 · 3
12-TET       0 · 2 · 4 · 7 · 9
cents        0 · 204 · 408 · 702 · 906
ratios       1/1 · 9/8 · 81/64 · 3/2 · 27/16
Δ vs 12-TET  0 · +4 · +8 · +2 · +6
Hz on B2     120.94 · 136.06 · 153.08 · 181.41 · 204.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

#### Ritsu (gagaku)

```
RITSU, pentatonic core
derivation   gagaku's "even" mode; perfect fourth above the tonic
steps        2 · 3 · 2 · 2 · 3
12-TET       0 · 2 · 5 · 7 · 9
cents        0 · 204 · 498 · 702 · 906
ratios       1/1 · 9/8 · 4/3 · 3/2 · 27/16
Δ vs 12-TET  0 · +4 · −2 · +2 · +6
Hz on B2     120.94 · 136.06 · 161.25 · 181.41 · 204.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

Ritsu shares its pitch-class set with the yō scale (§3.8), which is where the
court layer and the folk layer meet. Koizumi's tetrachord system, next, explains
why they coincide.

## 3.5 Koizumi's tetrachords

Fumio Koizumi, *Nihon dentō ongaku no kenkyū* (1958), still the standard
analytical frame in Japan. It is what turns a list of scales into a system.

**Construction, in four steps:**

1. **The frame is a perfect fourth.** Two nuclear tones sit 498¢ apart and act as
   melodic poles, either of which can serve as a centre. The octave plays no part
   in the construction, and many Japanese melodies never exceed this span. Tuning
   by ear to 4/3 and 3/2 puts the poles there automatically.
2. **One movable tone sits inside**, at 1, 2, 3 or 4 semitones above the lower
   nuclear tone. Four choices give four named tetrachord types:

   | type | intermediate at | semitone pattern |
   |---|---|---|
   | miyako-bushi | +1 | 1–4 |
   | ritsu | +2 | 2–3 |
   | min'yō | +3 | 3–2 |
   | ryūkyū | +4 | 4–1 |

   They form two retrograde pairs: miyako-bushi with ryūkyū, ritsu with min'yō.
3. **Chain two tetrachords.** In a conjunct chain the second starts on the upper
   nuclear tone, at the fourth; in a disjunct chain it starts at the fifth. Either
   gives five notes in an octave.
4. **Tune it.** Nuclear tones take pure 4/3, 3/2 and 2/1. The intermediate tone
   takes the Pythagorean interval at its position: limma 256/243 (90¢), tone 9/8
   (204¢), minor third 32/27 (294¢), ditone 81/64 (408¢). Pythagorean is already
   what the gagaku system is, and what tuning by ear in fourths and fifths
   produces, so this step imposes nothing from outside.

**The complete enumeration**, four types by two chainings, plus the one mixed
chaining that produces insen:

| tetrachords | chaining | set | scale name |
|---|---|---|---|
| miyako-bushi ×2 | disjunct | 0 1 5 7 8 | **in / miyako-bushi** |
| miyako-bushi ×2 | conjunct | 0 1 5 6 10 | **iwato** |
| ritsu ×2 | disjunct | 0 2 5 7 9 | **yō** (= gagaku ritsu) |
| ritsu ×2 | conjunct | 0 2 5 7 10 | ★ (listed as "Yo") |
| min'yō ×2 | disjunct | 0 3 5 7 10 | **min'yō** |
| min'yō ×2 | conjunct | 0 3 5 8 10 | (unnamed) |
| ryūkyū ×2 | disjunct | 0 4 5 7 11 | **ryūkyū** |
| ryūkyū ×2 | conjunct | 0 4 5 9 10 | (unnamed) |
| miyako-bushi + ritsu | conjunct | 0 1 5 7 10 | ★ **insen** (mixed) |

Hirajōshi is missing from this table because it is a rotation of the in-scale
rather than a construction of its own (§3.6).

**Why "tetrachord" for a three-note unit.** In Greek theory a tetrachord was four
strings spanning a perfect fourth, with two fixed outer notes and two movable
inner ones, so the name refers to the span. Koizumi keeps the span and puts one
movable tone inside it where the Greeks had two. He took the term from Robert
Lachmann's comparative work, by way of Sachs and Idelsohn, where the
fourth-as-frame is a cross-cultural claim, and using it placed Japanese melody
inside that conversation.

**Caveat.** This framework dates from 1958 and works retrospectively. Yatsuhashi
Kengyō in the 17th century was not thinking "two conjunct miyako-bushi
tetrachords," and the vocabulary is borrowed from Western comparative musicology.
It remains the best available explanation of why these particular sets arose, and
it is the Japanese scholarly standard, but it should be treated as a model laid
over the practice.

## 3.6 SCALE SET B: the *in* family (three of the six)

`0 1 5 7 8`, `0 1 5 6 10` and `0 2 3 7 8` are one pitch-class set under rotation,
with the interval-class vector `2 1 1 2 3 1` for all three, so they contain
exactly the same intervals and differ only in root.

Rooted on the same pitch they sound clearly different, since each presents
different intervals above the tonic. By pitch-class content, the six ★ scales
comprise two families and one outlier.

#### In (miyako-bushi)

```
★ IN / miyako-bushi                      also listed as "Kumoi"
derivation   miyako-bushi ×2, disjunct
steps        1 · 4 · 2 · 1 · 4
12-TET       0 · 1 · 5 · 7 · 8
cents        0 · 90 · 498 · 702 · 792
ratios       1/1 · 256/243 · 4/3 · 3/2 · 128/81
Δ vs 12-TET  0 · −10 · −2 · +2 · −8
Hz on B2     120.94 · 127.39 · 161.25 · 181.41 · 191.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```
The core Edo art-music scale. This set is also the pitch-class set of
hon-kumoi-jōshi, which is where the name "Kumoi" comes from; *in* and
*miyako-bushi* are the other names in circulation for it. The guitar and jazz
"kumoi" is usually `0 2 3 7 9`, a different set.

#### Hirajōshi

```
★ HIRAJŌSHI
derivation   rotation of in-scale, root a fourth above the in-tonic
steps        2 · 1 · 4 · 1 · 4
12-TET       0 · 2 · 3 · 7 · 8
cents        0 · 204 · 294 · 702 · 792
ratios       1/1 · 9/8 · 32/27 · 3/2 · 128/81
Δ vs 12-TET  0 · +4 · −6 · +2 · −8
Hz on B2     120.94 · 136.06 · 143.33 · 181.41 · 191.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```
Hira-chōshi as a koto tuning is G A B♭ D E♭ (from the string table, §3.10). Read
from D it gives the in-scale; read from G it gives this set.

#### Iwato

```
★ IWATO
derivation   miyako-bushi ×2, conjunct
steps        1 · 4 · 1 · 4 · 2
12-TET       0 · 1 · 5 · 6 · 10
cents        0 · 90 · 498 · 588 · 996
ratios       1/1 · 256/243 · 4/3 · 1024/729 · 16/9
Δ vs 12-TET  0 · −10 · −2 · −12 · −4
Hz on B2     120.94 · 127.39 · 161.25 · 169.85 · 214.99
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 588¢, top 1358.83 Hz
```

**Semitone content.** This set has two semitone relationships: two adjacent
semitone steps, at 0→1 and 5→6, and an interval-class-1 count of 2. All three
scales in this family have exactly two, necessarily, since they are rotations of
one another.

What singles iwato out is the tritone above the root (0–6), which none of the
other five ★ scales carries, and the Pythagorean 1024/729, the most deviant degree
in the set at −12¢.

## 3.7 SCALE SET C: insen

#### Insen

```
★ INSEN                                  also listed as "In-sen (miyako-bushi)"
derivation   miyako-bushi + ritsu, conjunct
             (identically: miyako-bushi + min'yō, disjunct)
steps        1 · 4 · 2 · 3 · 2
12-TET       0 · 1 · 5 · 7 · 10
cents        0 · 90 · 498 · 702 · 996
ratios       1/1 · 256/243 · 4/3 · 3/2 · 16/9
Δ vs 12-TET  0 · −10 · −2 · +2 · −4
Hz on B2     120.94 · 127.39 · 161.25 · 181.41 · 214.99
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

**Two names, two sets.** *Insen* (陰旋) and *miyako-bushi* denote different scales
in standard usage. Insen is `1 ♭2 4 5 ♭7`; the *in* or miyako-bushi scale is
`1 ♭2 4 5 ♭6`, which appears above under the name "Kumoi". The interval-class
vector `1 2 2 1 3 1` puts insen in a separate family from §3.6, with one semitone
where those have two.

It is the only mixed chaining among the ★ scales, pairing one hemitonic tetrachord
with one anhemitonic, which places it between the two families.

The term *in-sen* comes from Uehara 1895 (§3.11), where it names the whole "dark"
family; this particular five-note set is a modern scale-dictionary entry.

## 3.8 SCALE SET D: the anhemitonic family (listed as "Yo")

`0 2 5 7 9`, `0 2 5 7 10`, `0 3 5 7 10`, `0 3 5 8 10` and `0 2 4 7 9` are all
rotations of one set, with interval-class vector `0 3 2 1 4 0`. Zero semitones and
zero tritones is why the whole family sounds open.

#### Ritsu (conjunct)

```
★ RITSU (conjunct)                       also listed as "Yo / Min'yō"
derivation   ritsu ×2, conjunct
steps        2 · 3 · 2 · 3 · 2
12-TET       0 · 2 · 5 · 7 · 10
cents        0 · 204 · 498 · 702 · 996
ratios       1/1 · 9/8 · 4/3 · 3/2 · 16/9
Δ vs 12-TET  0 · +4 · −2 · +2 · −4
Hz on B2     120.94 · 136.06 · 161.25 · 181.41 · 214.99
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```
This set is anhemitonic. In standard usage the names yō and min'yō denote the two
sets below; the name for this one is ritsu.

The two sets those names denote:

#### Yō

```
YŌ  (= gagaku ritsu pentatonic)
derivation   ritsu ×2, disjunct
steps        2 · 3 · 2 · 2 · 3
12-TET       0 · 2 · 5 · 7 · 9
cents        0 · 204 · 498 · 702 · 906
ratios       1/1 · 9/8 · 4/3 · 3/2 · 27/16
Δ vs 12-TET  0 · +4 · −2 · +2 · +6
Hz on B2     120.94 · 136.06 · 161.25 · 181.41 · 204.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

#### Min'yō

```
MIN'YŌ  (the folk-song scale)
derivation   min'yō ×2, disjunct
steps        3 · 2 · 2 · 3 · 2
12-TET       0 · 3 · 5 · 7 · 10
cents        0 · 294 · 498 · 702 · 996
ratios       1/1 · 32/27 · 4/3 · 3/2 · 16/9
Δ vs 12-TET  0 · −6 · −2 · +2 · −4
Hz on B2     120.94 · 143.33 · 161.25 · 181.41 · 214.99
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

## 3.9 SCALE SET E: ryūkyū

#### Ryūkyū

```
★ RYŪKYŪ
derivation   ryūkyū ×2, disjunct
steps        4 · 1 · 2 · 4 · 1
12-TET       0 · 4 · 5 · 7 · 11
cents        0 · 408 · 498 · 702 · 1110
ratios       1/1 · 81/64 · 4/3 · 3/2 · 243/128
Δ vs 12-TET  0 · +8 · −2 · +2 · +10
Hz on B2     120.94 · 153.08 · 161.25 · 181.41 · 229.63
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 702¢, top 1451.32 Hz
```

A textbook Koizumi construction. Its set is the inversion of the in-family, the
ryūkyū tetrachord being the retrograde of miyako-bushi.

Its instrument is the sanshin (§3.12) rather than the mainland shamisen, and the
Ryūkyū Kingdom stayed politically separate until 1879.

## 3.10 Koto tunings and Japanese scales

A chōshi and a scale are different objects. A chōshi is a physical configuration
of thirteen bridges; a scale is an abstraction derived from it later, by roughly
250 years.

| chōshi | strings 1–13 | pitch classes |
|---|---|---|
| Hira-jōshi | D4 G3 A3 B♭3 D4 E♭4 G4 A4 B♭4 D5 E♭5 G5 A5 | G A B♭ D E♭ |
| Kumoi-jōshi | D4 G3 A♭3 C4 D4 E♭4 G4 A♭4 C5 D5 E♭5 G5 A5 | G A♭ C D E♭ |
| Hon-kumoi-jōshi | as above, A♭5 on string 13 | G A♭ C D E♭ |
| Iwato-jōshi (Ikuta) | D4 G3 A♭3 C4 D♭4 F4 G4 A♭4 C5 D♭5 F5 G5 A♭5 | G A♭ C D♭ F |
| Gaku-jōshi | D4 G3 A3 C4 D4 E4 G4 A4 C5 D5 E5 G5 A5 | G A C D E |
| Nogi-jōshi | D4 G3 A3 B3 D4 E4 G4 A4 B4 D5 E5 G5 A5 | G A B D E |
| Kokin-jōshi | D4 G4 A3 C4 D4 E♭4 G4 A4 C5 D5 E♭5 G5 A5 | G A C D E♭ |
| Nakazora-jōshi (Ikuta) | D4 G3 A3 B♭3 D4 E4 F4 A4 B♭4 D5 E5 F5 A5 | G A B♭ D E F |

Two things fall out of the table. String 1 is out of order, sitting at D4 with
strings 2 to 13 then running upward from G3, because the layout serves the hands.
And the same pitch class appears at several points, so the scale only emerges once
you decide which string is the nuclear tone: hira-jōshi read from D gives the
in-scale, and read from G it gives the hirajōshi set above.

## 3.11 Meiji

Japan was never colonised, so the 12-TET version of these scales is not a colonial
imposition. It came out of internal Westernisation under external pressure, which
is a different process and a better-documented one.

**1879.** Isawa Shūji, who had studied music with Luther Whiting Mason at
Bridgewater Normal School, returns and founds the Ongaku Torishirabe Gakari
(Music Investigation Committee), a state body under the Ministry of Education that
later became the Tokyo Music School. Mason is invited to Japan for 1880 to 1882.

**1881–84.** They publish *Shōgaku shōkashū*, the first graded school music
textbooks, consisting mostly of Western tunes with Japanese lyrics, in staff
notation and equal temperament. This is the point at which 12-TET becomes the
medium of Japanese music education, and it has remained so since.

**1895.** Uehara Rokushirō publishes *Zokugaku senritsu kō* ("Thinking about the
Melodies of Common Music"), the most influential Meiji work of Japanese music
theory, which divides vernacular music into the in (陰) and yō (陽) scales. His
stated achievement, in the scholarly summary, was that he approximated the old
Chinese pitches with the twelve Western chromatic semitones, making it possible to
write Japanese melody on a Western staff. That is the whole answer to whether the
12-TET version of these scales is a Western artefact: it is one explicitly and by
design, and the designer said so himself.

Hynes-Tawa 2021 gives the detailed account in English, Howe covers Isawa and
Mason, and Uehara's original is scanned at the National Diet Library. All three
are in the bibliography.

**Consequence for us.** The 12-TET Japanese scales are legitimate modern Japanese
practice, being how they are taught, recorded and notated in Japan, while having
no claim to being historical Japanese tuning. Both versions appear below.

## 3.12 Instruments

| instrument | type | relevance to tuning |
|---|---|---|
| **shō** | 17-pipe mouth organ, gagaku | Fixed pitch, alone among the Japanese instruments here. Plays 9 of the 12 ritsu. The anchor of gagaku tuning; traditional instruments built to A=430. |
| hichiriki, ryūteki | double reed and flute, gagaku | pitch-flexible; play against the shō's fixed grid |
| **koto** | 13-string zither, movable bridges | Retuned per piece by ear. Source of the chōshi names. Tablature notation. |
| **shamisen** | 3-string fretless lute | Tuned in fourths and fifths (*honchōshi* is roughly B–E–B; also *niagari*, *sansagari*). Fretless, so pitch is continuous. *Sawari* buzz built in deliberately. |
| **shakuhachi** | end-blown bamboo flute | Pitch set by length in shaku. *Meri/kari* (head angle) bends pitch a semitone or more as standard technique, so "the scale" works as a centre of gravity for a continuously variable pitch. |
| **sanshin** | 3-string Okinawan lute, python skin | Ancestor of the shamisen, via Chinese *sanxian* to Ryukyuan sanshin (14th–16th c.) to mainland shamisen. The Ryūkyū scale's instrument. |
| biwa | pear-shaped lute, high frets | narrative genres; heavy pitch-bending against the frets |

One fixed-pitch instrument, the shō, against everything else continuously
adjustable, is the acoustic reason no temperament debate ever started.

---

# PART 4. GAMELAN

## 4.1 The names

**Slendro** (sléndro) is usually derived from Śailendra, the dynasty that ruled
Java in the 8th and 9th centuries and built Borobudur, from Sanskrit Śaila-Indra,
"King of the Mountain". An alternative folk etymology credits the god Sang Hyang
Hendra.

**Pelog** (pélog) is a variant of Javanese *pelag*, meaning "fine" or "beautiful"
(Lindsay 1992).

**Laras** is the tuning system itself, and both slendro and pelog are laras.

So one name comes from a dynasty and the other from an aesthetic adjective, where
Western tuning names describe the mechanism: equal temperament, meantone, just
intonation.

## 4.2 Note names

| tradition | system | names |
|---|---|---|
| Javanese, numeric (*kepatihan*) | degree numbers 1–7 | siji/ji, loro/ro, telu/lu, papat/pat, lima/ma, enem/nem, pitu/pi |
| Javanese, traditional | body parts | **bem** (head), **gulu** (neck), **dhadha** (chest), **papat** (four), **lima** (five), **nem** (six), **barang** (thing) |
| Balinese | mode-relative syllables | ding, dong, deng, dung, dang (plus deung, daing for 7-tone) |
| Sundanese (*damina*) | syllables, **descending** | da, mi, na, ti, la |

Two structural facts:

1. These are degree names. "Nem" is the sixth step of *this* gamelan, and its
   frequency is whatever the pande made it. Western letter names run the other
   way, being nominally absolute, with the degree derived from the key.
2. Javanese is fixed-degree and Balinese is movable. Javanese 1 to 7 stay put
   across pathet, while Balinese *ding* is always the first note of the current
   mode, so the same physical key changes name with the mode, in the manner of
   movable do.

Slendro uses degrees 1 2 3 5 6, omitting 4 and 7, while pelog has all seven. Mod-7
therefore exists in pelog, and nothing anywhere corresponds to mod-12.

## 4.3 How a gamelan is physically tuned

Bronze, typically around 78% copper and 22% tin. Bars and gongs are cast, then
tuned by removing material:

- saron bars: file or grind the underside. Removing from the centre lowers the
  pitch; removing near the ends raises it.
- bonang and other kettle gongs: filing the boss raises the pitch, and adding wax
  inside lowers it.
- Modern work uses disc grinders, where files, scrapers and hammers were used
  historically.

Each key is an individual object, shaped until it sits right against the other
instruments of that set. A full Balinese gong kebyar of about 20 instruments takes
three to four days of work, and Balinese *pande* train in family and village
lineages.

So the tuning is a property of the physical object, worked by hand, and its
partials are inharmonic by nature. Nothing forces them
into simple ratios and nobody attempts it. Within one gamelan, instruments differ
by up to tens of cents, which is *embat*, and soloists on rebab, suling and voice
ornament partly to absorb it.

## 4.4 SCALE SET F: slendro

Five notes, roughly even, with no canonical version. Jennifer Lindsay's summary is
that no two gamelan sets have the same tuning, either in pitch or in interval
structure, and that there are no Javanese standard forms.

#### Slendro, Reo

```
★ SLENDRO, Reo's values
steps        231 · 243 · 243 · 238 · 245
cents        0 · 231 · 474 · 717 · 955
12-TET + Δ   C#+0 · D#+31 · F#−26 · G#+17 · B−45
Hz on C#3    138.59 · 158.37 · 182.24 · 209.70 · 240.61
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 717¢, top 1677.61 Hz
```
No published measurement matching these values was found. The step sizes fall
inside the range of measured Javanese slendro, and the two large intervals sit
where they do in measured sets.

#### Slendro, Landung

```
SLENDRO, Gamelan Landung, UGM Yogyakarta        (documented alternative)
steps        219 · 249 · 247 · 252 · 233
cents        0 · 219 · 468 · 715 · 967
12-TET + Δ   C#+0 · D#+19 · F#−32 · G#+15 · B−33
Hz on C#3    138.59 · 157.28 · 181.61 · 209.46 · 242.28
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 715¢, top 1675.67 Hz
```
Derived from Surjodiningrat et al.'s measurements as published by John Noise
Manis, accurate to about ±2¢ after rounding, with the octave idealised to 1200.
These values can be attributed to a named gamelan.

#### Slendro, 5-EDO

```
SLENDRO, 5-EDO idealisation             (theory reference; no measured gamelan matches it)
steps        240 · 240 · 240 · 240 · 240
cents        0 · 240 · 480 · 720 · 960
Hz on C#3    138.59 · 159.20 · 182.87 · 210.07 · 241.30
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 720¢, top 1680.52 Hz
```

## 4.5 SCALE SET G: pelog, seven tones

#### Pelog 7, Reo

```
★ PELOG 7, Reo's values
steps        120 · 138 · 281 · 136 · 110 · 158 · 257
cents        0 · 120 · 258 · 539 · 675 · 785 · 943
12-TET + Δ   C#+0 · D+20 · E−42 · F#+39 · G#−25 · A−15 · A#+43
Hz on C#3    138.59 · 148.54 · 160.86 · 189.21 · 204.68 · 218.10 · 238.94
compass      8 = 1 oct · 15 = 2 oct · 19 = 2 oct + 675¢, top 818.70 Hz
```
Close to a 9-EDO model with realistic detuning, and structurally right in that the
two large gaps fall at 3→4 and 7→1′, which is what makes the pentatonic subsets
work.

#### Pelog 7, Udan Arum

```
PELOG 7, Gamelan Udan Arum, Mangkunegaran       (documented alternative)
steps        136 · 135 · 238 · 164 · 109 · 195 · 223
cents        0 · 136 · 271 · 509 · 673 · 782 · 977
12-TET + Δ   C#+0 · D+36 · E−29 · F#+9 · G#−27 · A−18 · B−23
Hz on C#3    138.59 · 149.92 · 162.08 · 185.96 · 204.44 · 217.72 · 243.68
compass      8 = 1 oct · 15 = 2 oct · 19 = 2 oct + 673¢, top 817.75 Hz
```

#### Pelog 7, 9-EDO

```
PELOG 7, 9-EDO subset                   (theory reference)
cents        0 · 133 · 267 · 533 · 667 · 800 · 933
Hz on C#3    138.59 · 149.66 · 161.70 · 188.56 · 203.73 · 220.00 · 237.57
compass      8 = 1 oct · 15 = 2 oct · 19 = 2 oct + 667¢, top 814.92 Hz
```
Surjodiningrat's analysis of 27 Central Javanese pelog sets found a statistically
significant preference for this model at p < 0.02 (Braun 2002), and Rahn 1978
reached the same conclusion independently.

Degrees 4 and 7 are the unstable ones, as the comparison shows: 539 against 509
and 533, and 943 against 977 and 933. Degrees 1 2 3 5 6 are where the sources
agree, which is why the pentatonic pathet exist.

## 4.6 SCALE SET H: pelog pathet subsets

**On the names.** *Bem* is the name of pelog degree 1. The three Central Javanese
pelog pathet are lima, nem and barang: lima and nem both use 1 2 3 5 6, barang
uses 2 3 5 6 7. "Pelog bem" is in colloquial use for the non-barang key set.

Pathet is a mode, covering gong tones, register and cadential formulas. Lima and
nem share all five notes while remaining distinct modes, and degree 4 stays
available for embellishment in every pathet. The five notes are the pitch content
of a pathet rather than its definition.

#### Pathet lima and nem

```
★ PELOG, pathet lima / nem  (degrees 1 2 3 5 6)
Reo's        0 · 120 · 258 · 675 · 785
Udan Arum    0 · 136 · 271 · 673 · 782
Hz (Reo)     138.59 · 148.54 · 160.86 · 204.68 · 218.10
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 675¢, top 1637.40 Hz
```

#### Pathet barang

```
★ PELOG, pathet barang  (degrees 2 3 5 6 7)
Reo's        120 · 258 · 675 · 785 · 943      ← keep absolute pelog positions
re-referenced 0 · 138 · 555 · 665 · 823        ← only if the layout must start at 0
Hz (Reo)     148.54 · 160.86 · 204.68 · 218.10 · 238.94
compass      6 = 1 oct · 11 = 2 oct · 19 = 3 oct + 665¢ above its lowest field, top 1744.81 Hz
```
Barang is a mode within one tuning, so keeping the absolute positions preserves
that; re-referencing to 0 presents it as a transposition instead.

Slendro has its own three pathet, nem, sanga and manyura, all drawing on the same
five notes, which is further evidence that the mode lives in the behaviour.

## 4.7 Octave stretching

Slendro octaves run wide of 2:1, with measured totals falling around 1204 to 1212
cents and Kanyut Mesem's slendro reaching 1211.5. Over the four or so octaves of a
19-field layout, at 1208¢ per octave the top field lands about 24¢ above where a
pure-octave build puts it.

- **Pure octaves.** Recommended default, being cleaner, matching most
  gamelan-derived presets, and avoiding an argument on set.
- **Stretched.** Add 5 to 12¢ per octave, cumulatively. More faithful, and worth
  preparing as a B-roll variant, since a digital instrument can do this where a
  tuned pan physically cannot.

## 4.8 Bali

Javanese gamelan is tuned in unison, while Balinese is tuned in pairs, *pengumbang*
lower and *pengisep* higher, deliberately detuned so that they beat. That beating
is the *ombak*, or "waves".

From Toth's archive of 49 Balinese gamelans (Vitale & Sethares 2021), the rate
runs between 6 and 10 Hz, typically around 8 for gong kebyar, and is held constant
in Hz across the whole range rather than constant in cents. That constancy is why
Balinese octaves get stretched or compressed: the tuner trades octave purity
against ombak consistency.

Pande also describe a spectrum of interval profiles from *begbeg* to *tirus*,
chosen by repertoire. Begbeg suits fast modern kebyar and legong, tirus the slow
older *lelambatan*, and *sedang* is the compromise most groups now prefer. Tuning
choice in Bali is therefore a stylistic decision as much as a regional one.

A Balinese preset needs two detuned components per note. §6.3 works out the
numbers and the two ways of building it.

## 4.9 Instruments

| instrument | type | notes |
|---|---|---|
| saron / demung / peking | single-octave bronze bar metallophone | the backbone; bars filed to tune |
| slenthem, gendèr | thin bars over tube resonators | gendèr omits degrees 4 and 7 in pelog |
| bonang | rows of small kettle gongs | tuned at the boss |
| gambang | wooden bars | the one roughly harmonic timbre in the ensemble |
| gong ageng | large hanging gong | slow beating built into the sound |
| kempul, kenong | punctuating gongs | |
| rebab, suling, sindhèn | bowed lute, flute, voice | pitch-flexible; negotiate *embat* by ornamenting |
| Bali: gangsa, jegogan, giying, ugal | paired metallophones | ugal is the exception, being unpaired |
| Bali: reong, trompong | kettle-gong rows | typically pengumbang and pengisep respectively |

A double gamelan has two complete sets, slendro and pelog, sharing one pitch, the
*tumbuk*.

---

# PART 5. THE HANDPAN

## 5.1 How a handpan note is tuned

Each note field is an ellipse with a tuned partial on each axis. Standard practice
puts the fundamental with its octave on the long axis and the compound fifth on
the short axis, giving a 1:2:3 ratio, so an A3 field carries A3, A4 and E5.

Two features of this are worth holding onto.

**1. The harmonicity is manufactured.** Steel membranes are inharmonic by nature,
and the maker hammers and shapes until three partials land on 1:2:3. The three are
physically coupled inside the same membrane, so moving one shifts the others, and
the fifth is the hardest to place because it has to sit in tune against both the
fundamental and the octave at once.

**2. The 1:2:3 choice is conventional.** Saraz's Mark Garner is candid that the
honest reason for octave-plus-compound-fifth is that it is what the people before
him did, on handpans and steel pans alike. He documents working alternatives,
including 1:2:4 with a double octave on the short axis, seen on a Pantheon Steel
Halo, and a 1:3:4 alignment he developed that lets a low note fit a much smaller
field. His sketch of the evolution runs from fundamentals only before the 1960s,
to a long-axis harmonic in the 1960s, a short-axis one in the 1980s, and rim tones
in the 1990s.

So the handpan is inharmonic metal beaten into a harmonic ideal, and that harmonic
object is then laid out in 12-TET, which puts two layers of Western assumption on
an instrument descended from Trinidadian steel pan by way of Switzerland.

## 5.2 Slendro on a harmonic timbre

Bronze metallophone bars are inharmonic. The argument from Braun (2002) and
Sethares (*Tuning, Timbre, Spectrum, Scale*) is that this is why gamelan scales can
avoid low-order ratios entirely apart from the octave: with inharmonic partials a
5:4 or 4:3 buys almost no sensory consonance, so nothing pushes the scale toward
them, and Java and Bali built scales that fit their timbres.

The handpan is the opposite case by construction, so putting slendro on a 1:2:3
timbre divorces the scale from the spectrum it grew up with. The result is its own thing.

Two mitigations:

1. Use a Neotone voice with inharmonic partials for the slendro and pelog demos,
   if one exists, since even modest inharmonicity changes perception substantially.
2. Frame the shot as "gamelan tuning, handpan voice", which states the hybrid.

One piece played in In-sen and then in Slendro on one instrument demonstrates
tuning as a variable. What it does not demonstrate is gamelan timbre. §6.5
compares those two scales in detail.

## 5.3 Entering gamelan in cents

Thinking in cents means thinking inside a 12-TET-derived measurement frame,
whereas a Javanese tuner works in this bar against that bar, judged by ear within
one set. Entering slendro as cent values imports a conceptual apparatus the
tradition never used.

The caveat is that note names would be the more alien of the two options. Note
names assert that these are the twelve real pitches and that yours approximate
them, where cents assert only that here is a ruler. Ellis built the cent in 1885
to stop Europeans doing the first thing, and his conclusion from measuring
Javanese and Japanese scales was that scales are diverse, artificial and
arbitrary, and that no scale is natural.

Both hold at once: cents are the only practical entry format here, and they remain
a translation. The untranslated option would be to sample a real gamelan, which is
a different project.

## 5.4 Acoustic handpans and non-12-TET tuning

Steel can be tuned to arbitrary frequencies, so nothing physical prevents a
non-12-TET handpan. The barriers are practical, and there are three:

- A handpan is one scale permanently, since retuning is destructive and limited.
- A professional instrument runs roughly €1,500 to €3,000 or more, with months of
  lead time, and that cost is per scale. A slendro pan, a pelog pan and six
  Japanese pans would be somewhere around €12,000 to €24,000 and most of a year,
  for instruments with no resale market.
- Makers offer "custom scales" drawn in practice from a catalogue of 12-TET note
  names. One advertises 159 scales at ±5¢ accuracy, where the ±5¢ is measured
  against a 12-TET target.

I could not find a single commercially available handpan tuned to slendro, pelog,
a maqam with true quarter tones, or any just-intonation scale, having searched
maker sites and microtonal communities. The one non-12-TET option advertised
anywhere is a global reference shift, A=432 in place of A=440, which is still
12-TET. That is absence of evidence, though the absence held across every source I
checked.

So no acoustic handpan in these tunings appears to exist, and the cost and
irreversibility make one unlikely.

## 5.5 Gamelan in Japan

Gamelan has been established in Japan for decades. Dharma Budaya was founded at
Osaka University in 1979 by Shin Nakagawa, Lambangsari has run in Tokyo since
1986, and there are Balinese groups and gamelan teaching at Tokyo University of
the Arts. Japanese musicians working in authentic gamelan tuning is therefore
well-trodden ground; the digital handpan is the part without precedent.

---

# PART 6. BUILD SHEET

## 6.1 Roots

| set | root | Hz | basis |
|---|---|---|---|
| Japanese, **recommended** | B2 (banshiki) | **120.94** | Pythagorean from ōshiki A = 430, the gagaku standard |
| Japanese, if G# required | A♭2 (rankei) | 100.67 | same system; one of the twelve pitches, though not one of the six mode centres |
| Japanese, modern convention | B2 / G#2 | 123.47 / 103.83 | A440 12-TET; ship only as the Meiji and modern version |
| Gamelan | C#3 | 138.59 | a free choice, since gamelan has no reference pitch |

The gamelan root is a free choice; the Japanese root has a documented reference
behind it. Adopting a documented absolute pitch for the gamelan set would mean taking
a whole Sundanese gamelan wholesale, at Tugu = 451 or 472 Hz, or Degung Da = 401
Hz.

## 6.2 Compass

A five-note scale defines five pitch classes. How many octaves of them to build is
a separate decision, and in both traditions it is a decision with meaning attached.

### Native compasses

| instrument | keys / strings | span | role |
|---|---|---|---|
| **Java** | | | |
| saron demung / barung / peking | 6–7 | about one octave each, the three sizes an octave apart | core melody, one note per beat |
| slenthem | 6–7 | about one octave | lowest sustained melody |
| bonang barung / panerus | 10–14 pots | about two octaves | anticipating and elaborating |
| gendèr barung | 13–14 | about two and a half octaves | continuous elaboration, two mallets |
| **gambang** | **17–21** | **two octaves and more** | fastest elaboration; with the rebab, the widest melodic range in the ensemble |
| **Bali** | | | |
| jegogan | 5 | one cycle | structural punctuation, one octave below jublag |
| jublag / calung | 5 | about one octave | slow melodic skeleton |
| gangsa: ugal, pemadé, kantilan | 10 each | two octaves each, the three sizes stacked | melody and interlocking figuration |
| reong | 12 pots | about two octaves | interlocking |
| **Japan** | | | |
| koto | 13 strings | G3 to A5 in hira-jōshi, two octaves and a tone | full melodic instrument |
| shamisen | 3 strings, fretless | about two octaves | continuous pitch |
| shakuhachi | 5 holes | about two octaves, extended by technique | continuous pitch, register-dependent timbre |
| nō and shamisen vocal lines | | frequently a fourth or a fifth | Koizumi's whole argument for the tetrachord |

### What follows

**In gamelan, compass is role.** Few keys means low, slow and structural; many keys
means fast and elaborating. Choosing 19 fields is therefore not a neutral decision
about coverage, since it picks a function. A 5-field slendro is a jegogan and will
want to be played like one. A 19-field slendro is a gambang.

**19 fields is specifically a gambang.** Seventeen to twenty-one keys, the widest
melodic range in the ensemble, and the one wooden instrument among the bronze. Its
timbre is closer to harmonic than anything else in the gamelan, which sits
unusually well against a handpan's 1:2:3 spectrum (§5.2). Of all the ways to
justify 19 fields of slendro, this is the strongest, and it is also a specific
enough claim to say on camera.

**Two octaves is the default melodic compass in both traditions.** Balinese gangsa
cover two octaves in ten keys; the koto covers two octaves and a tone across
thirteen strings. Closing the top octave adds one field, so two octaves here is 11
fields for a five-note scale and 15 for a seven-note one. If the Japanese scales
are to sit inside the idiom rather than outside it, this is where they belong.

**Japan does not build in octaves.** Koizumi's frame is the fourth, and he is
explicit that the octave-bounded scale misrepresents the music. The koto's two
octaves is the outer limit of the tradition, and a great deal of the repertoire
works inside a fourth or a fifth. A four-octave Japanese pentatonic has no
traditional analogue, so a 19-field Japanese preset is a modern instrument playing
a Japanese scale.

**Octave repetition is not exact repetition.** Javanese slendro octaves run wide
(§4.7) and Balinese octaves are tempered against the ombak rate (§4.8). Over two
octaves these effects are small; over four they compound to tens of cents. The more
octaves we build, the more the stretched variant matters.

**Duplicate fields have precedent.** Koto string 1 is D4, duplicating string 5,
placed there for the hands rather than for the scale. If 19 fields refuses to
divide cleanly, repeating a note is traditional practice rather than a compromise.

### Layouts for 19 fields

| scale size | clean octaves | arithmetic |
|---|---|---|
| 5-note | 3 octaves closing on the top root = 16 fields, leaving 3 | or run straight through: 3 full cycles plus 4, spanning 3 octaves and roughly a fifth |
| 7-note | 2 octaves closing on the top root = 15 fields, leaving 4 | or 2 full cycles plus 5, spanning 2 octaves and roughly a fifth |

Three options for the leftover fields:

1. **Run straight through**, ending mid-cycle. This is what the gambang does, since
   its key count follows the resonator box rather than any octave boundary.
2. **Extend downward** below the root, which gives three extra low notes and shifts
   the centre of gravity toward the jublag or slenthem end.
3. **Duplicate**, on the koto precedent, placing a repeated pitch where the hands
   want one.

Option 1 is recommended, being both the closest fit to gamelan practice and the
simplest to explain.

**For the A/B shot,** In-sen and Slendro are both five-note, so they can share a
field count and a span exactly. Pelog at seven notes cannot match them, which is an
argument for shipping a five-note pathet as the on-camera pelog and keeping the
full seven-tone set as a separate preset. §6.5 tests how comparable that pair
actually is.

Worked example, the in-scale on B2 at 19 fields, pure octaves, run straight
through:

`120.94 · 127.39 · 161.25 · 181.41 · 191.10 · 241.88 · 254.79 · 322.50 · 362.83 ·
382.19 · 483.76 · 509.57 · 645.00 · 725.66 · 764.38 · 967.52 · 1019.15 · 1289.99 ·
1451.32`

A check on the gamelan sets while we are here: no two fields in either collide on
the same 12-TET note with different cent offsets, so the duplicate-note problem
from the variable-tunings plan does not arise.

**Which count to ship** is settled in §6.4. The short version is that 11 fields is
the default and 19 is a second preset.

### Alternative reading: one instrument, several roles

The gambang framing treats 19 fields as one instrument with a wide range. A
gamelan can also be read the other way, since it is a stratified ensemble: one
melody sounding at several densities at once. The *balungan*, or skeleton melody,
is carried by saron and slenthem in the middle register; gendèr, gambang and
bonang elaborate it faster and higher; gong, kenong and kempul punctuate
underneath. Register and density move together, so the bottom of a gamelan is
slow and sparse while the top is fast and dense.

Nineteen fields spanning close to four octaves reproduces that spread inside one
object. Read as register zones with different jobs:

| fields | register | gamelan analogue | behaviour |
|---|---|---|---|
| 1–5 | lowest octave | jegogan, slenthem | structural tones, sparse, slow |
| 6–11 | second octave | jublag, saron demung | the balungan, roughly one note per beat |
| 12–19 | top two octaves | gangsa, gendèr, gambang | elaboration and fast figuration |

The pitches are identical either way, so this costs nothing in layout. What it
changes is how the instrument is played, and it opens one tuning option that the
single-instrument reading closes off.

**The tuning consequence.** Read as one instrument, the four octaves are
mathematically identical, at cents + 1200n. Read as four instruments, they need
not be. Real gamelans show measurable per-instrument spread within a single set,
which is *embat*, and Bill Alves' graphs of Kyahi Mendung and Kyai Kanyutmesem
plot the range of variation for each pitch across the instruments of one gamelan.
Giving each register zone a small offset of its own would sound closer to a real
ensemble than any exact-octave build. Doing it accurately needs the full
per-instrument tables in Surjodiningrat et al. or the Toth spreadsheets, neither
of which I have read; the figures in §4.4 and §4.5 are central-octave only.

**For the Japanese set this reads less well.** Sankyoku is heterophonic rather
than stratified, with koto, shamisen and shakuhachi carrying one melody in
overlapping registers at comparable densities, so there are no register roles to
assign. The Japanese question stays a question of how many octaves.

### A non-octave option, clearly marked as an experiment

Koizumi's tetrachords chain at the fourth. Nothing in the theory requires the
chain to stop at the octave, and a conjunct chain continued past it produces a
scale that repeats every 498¢ instead of every 1200¢. Continuing the miyako-bushi
chain gives:

#### Conjunct chain

```
CONJUNCT CHAIN (experimental, no traditional precedent)
derivation   miyako-bushi tetrachord chained conjunctly without closing the octave
period       498¢ (a perfect fourth) rather than 1200¢
cents        0 · 90 · 498 · 588 · 996 · 1086 · 1494 · 1584 · 1992 · 2082 · 2490 ·
             2580 · 2988 · 3078 · 3486 · 3576 · 3984 · 4074 · 4482
Hz on B2     120.94 · 127.39 · 161.25 · 169.85 · 214.99 · 226.47 · 286.65 ·
             301.95 · 382.19 · 402.58 · 509.57 · 536.77 · 679.41 · 715.67 ·
             905.86 · 954.20 · 1207.78 · 1272.23 · 1610.34
compass      19 fields, spanning 3.73 octaves
```

No Japanese instrument does this. The koto repeats by octave, as the chōshi table
in §3.10 shows, so octave repetition is what the instruments do even though the
theory describes melody in fourths. This layout is therefore an extrapolation from
Koizumi rather than a reconstruction of anything, and it should be labelled that
way if it is used. It is also, unlike the scales above, genuinely unplayable on any
acoustic handpan, since no octave ever recurs.

## 6.3 Ombak build

Two instruments, one tuned slightly lower (*pengumbang*) and one slightly higher
(*pengisep*), sounding together (§4.8).

### The governing rule

Balinese tuners fix the beat rate in Hz and hold it constant across the whole
range. Vitale & Sethares put the range at 6 to 10 Hz across the 49 gamelans in
Toth's archive, with about 8 Hz typical for gong kebyar. So:

```
Δcents(f) = 1200 · log₂((f + R) / f)
```

where R is the beat rate in Hz and f is the pengumbang frequency of that field.
The parameter is uniform and expressed in Hz; the cent offset it produces is
necessarily per-note. A constant cent offset would instead double the beat rate
every octave, which is the thing Balinese tuning is specifically arranged to
avoid.

### Choosing R

| R | Δ at 138.59 Hz (lowest field) | Δ at 1677.61 Hz (top of a 19-field slendro) | character |
|---|---|---|---|
| 6 Hz | 73.4¢ | 6.2¢ | calm, slow end of the documented range |
| **8 Hz** | **97.2¢** | **8.2¢** | **gong kebyar standard** |
| 10 Hz | 120.6¢ | 10.3¢ | agitated, fast end of the range |

The 97¢ at the bottom matches the roughly 90¢ Vitale & Sethares report for the
lowest jegogan, so 8 Hz is the right figure for two real instruments. It is not
the right figure for two copies of one harmonic voice, for the reason given under
"Building it on one instrument" below.

### Which layer carries pure octaves

Every pair beats at exactly R either way, so this decides only how the octaves
temper.

- **Design A, recommended.** Pengumbang is the scale exactly as already built,
  with pure octaves. Pengisep is pengumbang + R Hz, field by field. Pengisep
  octaves come out slightly compressed. This is the simplest to implement, since
  layer one is the existing preset untouched.
- **Design B.** Pengisep carries the pure octaves and pengumbang is pengisep − R.
  Pengumbang octaves come out stretched, by about 11.5¢ at 8 Hz from a 600 Hz
  reference. This is the tempering in Toth's own worked example.

Real gamelans often temper both so that neither is pure, which is the *sedang*
compromise; Design A is close enough for a first build.

### Building it on one instrument

Two instruments is how Bali does it, though a single-object version has a
precedent in the tradition and is easier to film.

**The gong ageng already does this.** A Javanese gong ageng beats against itself,
at roughly 2.5 Hz for the *wadon*. Acoustic analysis attributes the beating to two
causes: four closely spaced modes whose asymmetric vibration patterns appear to
have been deliberately hammered into the gong, and a nonlinear response in which
the second harmonic of the fundamental mode interacts with the second axisymmetric
mode. The Javanese use *ombak* for this too. So single-object beating is native to
gamelan, running slower than the Balinese paired-instrument rate.

That gives two regimes worth trying:

| regime | rate | character |
|---|---|---|
| gong ageng | 2 to 3 Hz | slow swell, one object breathing |
| paired instruments | 6 to 10 Hz, 8 typical | active shimmer |

**Three ways to implement it inside one voice**, in order of what Neotone can do
today.

1. **Double the whole voice**, offset by Δcents from the tables below. This is the
   only one currently available, since the instrument detunes a whole sample
   rather than individual partials. Every tuned partial shifts by the same ratio,
   so a 1:2:3 voice beats at R, 2R and 3R simultaneously. See the rate note below,
   because this changes which R to pick.
2. **Double the fundamental only**, leaving the octave and twelfth single. One
   beat rate. Closest to a gamelan bar, where the tuner sets the fundamental pair
   and the inharmonic upper partials go their own way. Needs separated partial
   samples.
3. **Mistune the octave partial** by R Hz against twice the fundamental, with no
   duplication at all. The fundamental's own second harmonic then beats against
   the tuned octave partial, which is the gong ageng mechanism exactly. Also needs
   separated partials.

**Option 3 is worth building toward.** It is the closest thing to an authentic
single-object ombak, it costs one number rather than a second layer, and it
inverts a handpan-making premise directly: §5.1 has makers placing the octave and
compound fifth exactly, with Mark Garner describing a note with untuned harmonics
as sounding like it is "crying". Handpan practice treats partial mistuning as the
fault to eliminate. Gamelan treats the same phenomenon as the goal. That contrast
would make a better piece of film than any scale comparison in this document,
which is a reason to pursue clean fundamental and partial samples.

**Picking R for a whole-sample detune.** Because all three partials beat, the
instrument produces R, 2R and 3R at once. Beating is heard as loudness
fluctuation up to roughly 15 to 20 Hz and turns into roughness above that, so 3R
is the figure that decides the character:

| R | partial beats | verdict |
|---|---|---|
| 2.5 Hz | 2.5 · 5 · 7.5 | all three slow; gong ageng territory |
| **4 Hz** | **4 · 8 · 12** | **all three in the fluctuation range; recommended** |
| 5 Hz | 5 · 10 · 15 | 3R at the edge |
| 8 Hz | 8 · 16 · 24 | fundamental correct for gong kebyar, 3R rough |

So the paired-instrument figure of 8 Hz, correct for two real gangsa, is the wrong
number for a doubled harmonic voice. **Use R = 4 Hz.** The fundamental then beats
at half the Balinese rate, while the three partial beats together produce a
density of fluctuation closer to a gamelan than a single 8 Hz beat would. The
fundamental is also the loudest partial on a handpan voice, so the 2R and 3R
components sit underneath rather than dominating.

If Neotone ever supports option 2 or 3, go back to R = 8 Hz.

**Why the rate is set in Hz.** Two tones separated by Δ Hz beat at Δ Hz whatever
their absolute frequency, because the perceived fluctuation follows the frequency
difference rather than the ratio. Holding Δ constant therefore holds the audible
beat rate constant across the range, which is exactly what Balinese tuners do. The
cent figures look alarming at the bottom of a wide instrument and can be ignored:

| field | frequency | Δ at R = 8 Hz | audible beat |
|---|---|---|---|
| 1 | 138.59 Hz | 97.2¢ | 8 Hz |
| 6 | 277.18 Hz | 49.3¢ | 8 Hz |
| 11 | 554.36 Hz | 24.8¢ | 8 Hz |
| 16 | 1108.73 Hz | 12.4¢ | 8 Hz |
| 19 | 1677.61 Hz | 8.2¢ | 8 Hz |

Ninety-seven cents reads on paper as almost a semitone. At 138 Hz the two tones
are 8 Hz apart, well inside one critical band, so it is heard as fluctuation
rather than as two pitches. This is why gamelan tuners count beats instead of
measuring intervals, and it is the single strongest argument that cents are the
wrong native unit for this music (§5.3).

At R = 2.5 Hz the same fields give 31.0¢, 7.8¢ and 2.6¢ at 138.59, 554.36 and
1677.61 Hz.

**What a single instrument gives up.** Balinese pairs are two instruments in two
places, so the ombak arrives with spatial decorrelation as well as beating, and
the pair often plays interlocking *kotekan* parts while sharing the shimmer. One
instrument gets the sound and loses the texture. Panning the two components apart
recovers some of the spatial effect.

### Worked example: slendro (Reo's values), R = 4 Hz, whole-sample detune, 19 fields

Recommended build for Neotone as it stands.

| field | pengumbang Hz | pengisep Hz | Δ cents |
|---|---|---|---|
| 1 | 138.59 | 142.59 | 49.3 |
| 2 | 158.37 | 162.37 | 43.2 |
| 3 | 182.24 | 186.24 | 37.6 |
| 4 | 209.70 | 213.70 | 32.7 |
| 5 | 240.61 | 244.61 | 28.5 |
| 6 | 277.18 | 281.18 | 24.8 |
| 7 | 316.75 | 320.75 | 21.7 |
| 8 | 364.48 | 368.48 | 18.9 |
| 9 | 419.40 | 423.40 | 16.4 |
| 10 | 481.21 | 485.21 | 14.3 |
| 11 | 554.36 | 558.36 | 12.4 |
| 12 | 633.50 | 637.50 | 10.9 |
| 13 | 728.96 | 732.96 | 9.5 |
| 14 | 838.80 | 842.80 | 8.2 |
| 15 | 962.42 | 966.42 | 7.2 |
| 16 | 1108.73 | 1112.73 | 6.2 |
| 17 | 1266.99 | 1270.99 | 5.5 |
| 18 | 1457.91 | 1461.91 | 4.7 |
| 19 | 1677.61 | 1681.61 | 4.1 |

### Worked example: slendro (Reo's values), R = 8 Hz, Design A, 19 fields

For two separate instruments, or for a future build with separated partials.

| field | pengumbang Hz | pengisep Hz | Δ cents |
|---|---|---|---|
| 1 | 138.59 | 146.59 | 97.2 |
| 2 | 158.37 | 166.37 | 85.3 |
| 3 | 182.24 | 190.24 | 74.4 |
| 4 | 209.70 | 217.70 | 64.8 |
| 5 | 240.61 | 248.61 | 56.6 |
| 6 | 277.18 | 285.18 | 49.3 |
| 7 | 316.75 | 324.75 | 43.2 |
| 8 | 364.48 | 372.48 | 37.6 |
| 9 | 419.40 | 427.40 | 32.7 |
| 10 | 481.21 | 489.21 | 28.5 |
| 11 | 554.36 | 562.36 | 24.8 |
| 12 | 633.50 | 641.50 | 21.7 |
| 13 | 728.96 | 736.96 | 18.9 |
| 14 | 838.80 | 846.80 | 16.4 |
| 15 | 962.42 | 970.42 | 14.3 |
| 16 | 1108.73 | 1116.73 | 12.4 |
| 17 | 1266.99 | 1274.99 | 10.9 |
| 18 | 1457.91 | 1465.91 | 9.5 |
| 19 | 1677.61 | 1685.61 | 8.2 |

### Worked example: pelog pathet lima / nem (Reo's values), R = 8 Hz, 11 fields

| field | pengumbang Hz | pengisep Hz | Δ cents |
|---|---|---|---|
| 1 | 138.59 | 146.59 | 97.2 |
| 2 | 148.54 | 156.54 | 90.8 |
| 3 | 160.86 | 168.86 | 84.0 |
| 4 | 204.67 | 212.67 | 66.4 |
| 5 | 218.10 | 226.10 | 62.4 |
| 6 | 277.18 | 285.18 | 49.3 |
| 7 | 297.08 | 305.08 | 46.0 |
| 8 | 321.73 | 329.73 | 42.5 |
| 9 | 409.35 | 417.35 | 33.5 |
| 10 | 436.20 | 444.20 | 31.5 |
| 11 | 554.36 | 562.36 | 24.8 |

### Which scales are the best candidates

Ombak is Balinese, while the ★ gamelan material is Javanese, where instruments are
tuned in unison. Ranked by how close the precedent is:

1. **[Pelog, five-note pathet lima / nem](#pathet-lima-and-nem)** (listed as "pathet bem"). The closest
   precedent. Balinese *pelog selisir*, the gong kebyar tuning, is a five-tone
   subset using degrees 1 2 3 5 6, the same degrees. The cent values would still
   be Javanese, so the result is a hybrid; a true selisir build needs measured
   Balinese cents, which are in the Toth spreadsheets that I have not read.
2. **[Slendro](#slendro-reo).** Bali has slendro too, and gender wayang is a paired-tuned slendro
   ensemble of ten keys over two octaves, which maps onto an 11-field build
   almost exactly. Worth building at 11 fields specifically for that reason.
3. **[Pelog, all seven tones](#pelog-7-reo).** Defensible, since seven-tone Balinese ensembles
   exist and are paired-tuned, though the Javanese cent values and the Javanese
   pathet framing both pull against it.
4. **The Japanese scales.** No precedent of any kind. Japan has no paired
   detuning between instruments. Beating as a wanted sound is not foreign, given
   the *sawari* buzz on shamisen and biwa, but that is a noise effect inside one
   string rather than two instruments set against each other. Buildable as
   invention, provided it is labelled as invention.

### Per-instrument data: what exists and what I could not get

The full per-instrument measurements exist and are described as public. Toth
measured every key and gong-chime of 49 gamelan gong kebyar, roughly 150 per
gamelan, more than 8000 individual frequency measurements, now in Special
Collections & Archives at Wesleyan University Library. Vitale and Sethares
transcribed the printouts into machine-readable spreadsheets and state in their
abstract that they will post the data publicly. Sethares and Vitale later built a
Max patch, the Gamelan Tuning Explorer, incorporating 47 of those gamelan
(*Computer Music Journal* 47/2, 2023).

I could not find a working download. The "available here" links in the AAWM PDF
do not survive text extraction, the journal landing page carries no supplement
link, and Vitale's own site describes the tuning work without hosting data. The
route to the real tables is to email Sethares or Vitale, or to request the
Wesleyan collection. Worth doing if this build goes beyond the shoot.

**Reconstruction in the meantime.** Two figures from the paper are enough to model
per-instrument spread without the raw tables:

- Instruments within one category, all pengumbang or all pengisep, agree to within
  about 1 Hz of their category average, often much less.
- Pengumbang differs from pengisep by 7 to 10 Hz.

So a composite register-role build (§6.2) can apply a per-zone offset of up to
±1 Hz and be modelling the documented spread rather than inventing one:

| register | frequency | ±1 Hz in cents |
|---|---|---|
| lowest octave | 138.59 Hz | ±12.4¢ |
| second | 277.18 Hz | ±6.2¢ |
| third | 554.36 Hz | ±3.1¢ |
| fourth | 1108.73 Hz | ±1.6¢ |

Note what this says about exact-octave builds: a real gamelan's octaves differ
between instruments by more than ten cents at the bottom of the range, so
mathematically identical octaves are the least faithful option available, quite
apart from the deliberate stretching in §4.7.

### Three practical notes

**It takes two sources.** Balinese pairs are two instruments played by two people,
so the paired version is a two-instrument shot or a layered overdub. The
single-instrument version above avoids that, at the cost of the spatial separation
and of the interlocking *kotekan* parts that a real pair can play against each
other.

**Pan the two components apart** if they sit inside one instrument, which recovers
some of the spatial decorrelation a real pair gets for free.

**Ombak and the A/B pair.** The In-sen to Slendro comparison isolates tuning as
the single variable. Adding ombak to the slendro side introduces a second one, so
it belongs in a separate shot.

## 6.4 Recommended shipping list

**The compass logic, in one paragraph.** Eleven fields is the only count that is
idiomatic on both sides of the project at once: it is two octaves, which is the
Balinese gangsa and gender wayang compass and close to the koto's two octaves and
a tone, and it is the outer limit of the Japanese idiom (§6.2). It is also the
right size for the ombak build, since gender wayang is a paired-tuned slendro
ensemble of ten keys. So **11 fields is the default**, and in particular it is
what the In-sen and Slendro A/B pair should both use. Nineteen fields is a second
preset rather than the standard one, justified as a gambang, and it is where the
composite register-role reading and the stretched-octave variant belong.

| # | scale | version | compass | why that compass |
|---|---|---|---|---|
| 1 | ★ [In / miyako-bushi](#in-miyako-bushi) | Pythagorean + 12-TET | **11** (2 oct, top 483.76 Hz) | koto compass; also listed as "Kumoi" |
| 2 | ★ [Insen](#insen) | Pythagorean + 12-TET | **11**, must match #7 | the A/B pair; also listed as "In-sen (miyako-bushi)" |
| 3 | ★ [Hirajōshi](#hirajōshi) | Pythagorean + 12-TET | **11** | koto compass |
| 4 | ★ [Iwato](#iwato) | Pythagorean + 12-TET | **11** | koto compass |
| 5 | ★ [Ritsu (conjunct)](#ritsu-conjunct) | Pythagorean + 12-TET | **11** | koto compass; also listed as "Yo/Min'yō". Alternatives: [Yō](#yō), [Min'yō](#minyō) |
| 6 | ★ [Ryūkyū](#ryūkyū) | Pythagorean + 12-TET | **11** | sanshin and koto register |
| 7 | ★ Slendro: [Reo's](#slendro-reo) + [Landung](#slendro-landung) | either, or [5-EDO](#slendro-5-edo) as a third | **11** (2 oct, top 554.36 Hz); 19 as a second preset | 11 = gender wayang and the A/B pair; 19 = gambang |
| 8 | ★ Pelog 7: [Reo's](#pelog-7-reo) + [Udan Arum](#pelog-7-udan-arum) | either, or [9-EDO](#pelog-7-9-edo) | **15** (2 oct, top 554.36 Hz); 19 as a second preset | 15 closes two octaves of a seven-note scale |
| 9 | ★ [Pathet lima / nem](#pathet-lima-and-nem) | from either pelog | **11**; 19 as a second preset | matches the slendro build, so the two are comparable on camera |
| 10 | ★ [Pathet barang](#pathet-barang) | from either, absolute positions | **11** | as #9 |
| 11 | [Ryo](#ryo), [Ritsu](#ritsu-gagaku) (gagaku) | Pythagorean | **11** | optional; the historical root layer |
| 12 | Balinese ombak | two layers, R = 4 Hz whole-sample (§6.3) | **11** | gender wayang is ten keys over two octaves; best on #9 or #7 |
| 13 | [Conjunct chain](#conjunct-chain) | experimental, no precedent (§6.2) | **19** | no octave ever recurs, so the count is free and 19 uses the instrument |

**Optional extras if there is time.**

- **Slendro or pathet lima/nem at 6 fields**, one octave, no repetition. This is a
  jegogan or jublag: low, slow, structural. It plays differently from anything
  else on the list and would give the film a contrasting texture.
- **Slendro at 19 fields with stretched octaves** (§4.7), 5 to 12¢ per octave
  cumulative, prepared as a B-roll variant. The stretch is inaudible over two
  octaves and obvious over four, which is an argument for pairing it with the
  19-field build rather than the 11.
- **Slendro at 19 fields read as register roles** (§6.2), with a per-zone offset
  of up to ±1 Hz to model *embat*.

## 6.5 The A/B pair: how comparable are In-sen and Slendro?

The plan pairs In-sen with Slendro for one piece played in both, with only the
tuning changing, on the grounds that both are five-note scales. That is an
argument about the instrument: same field count, same physical gestures, same
sequence of positions, so the piece survives the switch as a sequence of fields
whatever the tuning does.

That settles comparability at the level of layout. The question is whether it also
holds at the level of pitch.

**Degree by degree, In-sen against the ★ slendro:**

| degree | In-sen | Slendro | movement |
|---|---|---|---|
| 1 | 0 | 0 | 0 |
| 2 | 90 | 231 | **+141¢** |
| 3 | 498 | 474 | −24¢ |
| 4 | 702 | 717 | +15¢ |
| 5 | 996 | 955 | −41¢ |

Four of the five degrees move by less than a quarter tone. The whole
transformation is concentrated in the second degree, which moves by 141 cents,
most of a whole tone. Melodic contour is therefore preserved, the piece stays
recognisable across the cut, and a listener can hear *which note changed* rather
than hearing two unrelated things. That is the ideal structure for the shot.

**Where the difference sits.** The degree that moves is the flat second, the 90¢
leaning semitone that carries In-sen's character. Slendro replaces it with a 231¢
neutral second. So the identity of the scale rests on one interval, and the
gamelan tuning replaces exactly that interval while leaving everything else nearly
where it was.

**What actually changes is the evenness of the ladder:**

| scale | step profile | spread |
|---|---|---|
| In-sen | 90 · 408 · 204 · 294 · 204 | 318¢ |
| Slendro | 231 · 243 · 243 · 238 · 245 | 14¢ |

In-sen is close to the most uneven five-note division available; slendro is close
to the most even. That contrast, rather than the note count, is what the shot
demonstrates.

**Every Japanese scale ranked against the ★ slendro**, by mean deviation per
degree. Low means the piece survives the switch; high means it becomes a different
piece.

| Japanese scale | per-degree movement | mean | max |
|---|---|---|---|
| Ritsu conj. (listed as "Yo") | 0 · 27 · 24 · 15 · 41 | **21¢** | 41 |
| Yō | 0 · 27 · 24 · 15 · 49 | 23¢ | 49 |
| Min'yō | 0 · 63 · 24 · 15 · 41 | 29¢ | 63 |
| **In-sen** (the ★ pairing) | 0 · **141** · 24 · 15 · 41 | 44¢ | 141 |
| Iwato | 0 · 141 · 24 · 129 · 41 | 67¢ | 141 |
| In / miyako-bushi | 0 · 141 · 24 · 15 · 163 | 69¢ | 163 |
| Ryūkyū | 0 · 177 · 24 · 15 · 155 | 74¢ | 177 |
| Hirajōshi | 0 · 27 · 180 · 15 · 163 | 77¢ | 180 |

In-sen sits in the middle of the range. **Ritsu conjunct is the most comparable**,
with every degree inside 41 cents, which suits a second shot of a different kind:
a version where almost nothing moves and the piece drifts rather than changes.
**Hirajōshi and Ryūkyū are the least comparable**, and a piece would not survive
the switch as recognisably the same piece.

**Three things that would break the comparison outright.**

1. **Different roots.** The plan specifies In-sen at G#2 and Slendro at C#3, a
   perfect fourth apart, which would transpose the piece as well as retune it.
   Both need the same root.
2. **Different field counts.** Both are set to 11 fields in §6.4 for this reason.
3. **Ombak on the slendro side.** It changes two variables at once (§6.3).

## 6.6 Open questions w/ Reo

Settled: the Japanese scales get both a Pythagorean and a 12-TET version so the
two can be compared directly, with Pythagorean the current preference.

1. Where did the slendro and pelog cent values come from? By ear, a document, a
   named instrument?

2. Naming: which labels to carry for the sets listed as "Kumoi" (§3.6), "In-sen"
   (§3.7) and "Yo / Min'yō" (§3.8)?

3. Root: where does it come from, the voice, the instrument, or convention?
   B2 and G#2 both work (§3.2).

4. Compass: which count for each scale (§6.2, §6.4)? The gangsa and koto reading
   at 11 fields, the gambang reading at 19, or the composite register-role
   reading.

5. Field-count parity between the In-sen and Slendro presets for the A/B shot.

6. Can Neotone stack two detuned layers, for Balinese ombak (§6.3)?

7. Is there a route to separated fundamental and partial samples, which would
   open options 2 and 3 in §6.3?

8. Does Neotone have an inharmonic voice, for the slendro and pelog presets
   (§5.2)?

   

---

# SOURCES

**Japanese theory and history**

- Koizumi Fumio, *Nihon dentō ongaku no kenkyū* 日本傳統音楽の研究 (Ongaku no Tomo Sha, 1958); *Nihon no Ongaku: Rekishi to Riron* (National Theatre of Japan, 1974).
- Liam Hynes-Tawa, trans., "Translation of the section on nuclear tones from Koizumi Fumio's *Research on Japanese Traditional Music*," *Music Theory Online* 30.4 (2024). https://mtosmt.org/issues/mto.24.30.4/mto.24.30.4.hynestawa.php
- Liam Hynes-Tawa, "Tonic, Final, *Kyū*: Tonal Mappings in the Meiji Period and Beyond," *AAWM* 9/1 (2021). https://iftawm.org/journal/oldsite/articles/2021a/Hynes-Tawa_AAWM_Vol_9_1.pdf
- Uehara Rokushirō, *Zokugaku senritsu kō* 俗楽旋律考 (1895). https://dl.ndl.go.jp/pid/856052/1/1
- Sondra Wieland Howe, "Isawa Shuji and Luther Whiting Mason: Pioneers of Music Education in Japan," *Music Educators Journal*; and "American Music in Meiji Era Japan," *Ritsumeikan* 26/1. https://www.ritsumei.ac.jp/acd/re/k-rsc/lcs/kiyou/pdf_26-1/RitsIILCS_26.1pp.63-70HOWE.pdf
- William P. Malm, "Japanese music: Tonal system," *Encyclopædia Britannica*, on ryo, ritsu, yo and in, the twelve pitches and the six tonalities. https://www.britannica.com/art/Japanese-music/Tonal-system
- Craig Stuart Sapp, Koto Sound Dictionary: Tuning, for the chōshi string table. https://koto.sapp.org/dict/tuning/
- Akira Takaoka, "Frequencies in Pythagorean tuning used for Gagaku instruments," with full Pythagorean tables at A = 430. http://sites.music.columbia.edu/akira/pythagorean/index.html
- Gagaku modal system, Stanford. https://gagaku.stanford.edu/en/theory/pitch
- Shakuhachi lengths and the shaku/sun naming convention. https://reibo.org/shaklengths
- Wikipedia, *In scale*, *Insen scale* and *Yo scale*, for the received modern definitions in circulation (§3.7, §3.8). https://en.wikipedia.org/wiki/Insen_scale · https://en.wikipedia.org/wiki/Yo_scale
- Unverified: the claim that koto minor seconds measure about 90¢ in performance comes from a blog citing a JASA meeting abstract ("Koto scales and tunings," *JASA* 84/S1, 1988) that I could not retrieve. Plausible, and consistent with tuning by fifths, but unconfirmed.

**Gamelan**

- Wasisto Surjodiningrat, P. J. Sudarjana & Adhi Susanto, *Tone Measurements of Outstanding Javanese Gamelans in Yogyakarta and Surakarta* (Gadjah Mada UP, 1972; 2nd English ed. 1993), covering 76 gamelans. The reference work.
- John Noise Manis, *Ten Gamelan Tunings for Debussy's Nuages* (Yantra), giving Surjodiningrat's data as semitone-plus-cent offsets for ten named gamelans including Landung and Udan Arum. http://www.gamelan.to/2018/JNM%2033%20Ten%20for%20Deb/jnm%2033BOOKLET.html
- Martin Braun, "The gamelan pelog scale of Central Java as an example of a non-harmonic musical scale" (2002), for the 9-EDO analysis and the inharmonic-spectrum argument. http://www.neuroscience-of-music.se/pelog_main.htm
- Jay Rahn, "Javanese Pélog Tunings Reconsidered," *Yearbook of the IFMC* 10 (1978): 69–82.
- Bill Alves, "Graphic Representations of Some Gamelan Tunings," showing per-instrument spread and octave detuning within single sets. https://pages.hmc.edu/alves/laras.html
- Wayne Vitale & William Sethares, "Balinese Gamelan Tuning: The Toth Archives," *AAWM* 9/2 (2021), on ombak rates, paired tuning, octave tempering and begbeg/tirus. https://iftawm.org/journal/oldsite/articles/2021b/Vitale_Sethares_AAWM_Vol_9_2.pdf
- Iwan Gunawan, "A Guide to the Sundanese Gamelan Tuning (*Laras*) for Ableton Live," with measured tunings, named gamelans and base frequencies, and the clearest short account of *embat*. https://tuning.ableton.com/sundanese-gamelan/intro-to-sundanese-gamelan/
- Jennifer Lindsay, *Javanese Gamelan* (OUP, 1992), 38–41, for "no Javanese standard forms" and the *pelag* etymology.
- Wikipedia, *Pelog* and *Slendro*, for pathet names, degree names, Balinese modes and the Śailendra etymology. https://en.wikipedia.org/wiki/Pelog
- "Tuning Pitt's Gamelans," University of Pittsburgh Dept. of Music, on the physical tuning process. https://www.music.pitt.edu/blog/tuning-pitts-gamelans150817
- Instrument compasses in §6.2: Wikipedia, *Gambang (instrument)*, for 17–21 keys over two octaves and more; Wikipedia, *Gamelan gong kebyar*, for gangsa at ten keys over two octaves and jegogan and jublag at five; Britannica, *Saron*, for six or seven keys over about an octave. https://en.wikipedia.org/wiki/Gambang_(instrument) · https://en.wikipedia.org/wiki/Gamelan_gong_kebyar · https://www.britannica.com/art/saron
- Michael Tenzer, *Gamelan Gong Kebyar* (Chicago, 2000); Sri Hastanto, "Konsep Embat Dalam Karawitan Jawa," *Panggung* 22/3 (2012).

**Cents, handpan, context**

- Alexander J. Ellis, "On the Musical Scales of Various Nations," *Journal of the Society of Arts* 33 (1885); and Appendix XX to his translation of Helmholtz, *On the Sensations of Tone*. https://imslp.org/wiki/On_the_Musical_Scales_of_Various_Nations_(Ellis,_Alexander_John)
- Mark Garner (Saraz), "Alternative Harmonics on Handpan," on 1:2:3 as inherited convention, the 1:2:4 and 1:3:4 alternatives, and untuned harmonics making a note sound like it is "crying". https://www.sarazhandpans.com/uncategorized/alternative-harmonics-on-hand-pan/
- On the gong ageng beating against itself (§6.3): "Synthesizing a Javanese Gong Ageng," ICMC 2005, https://quod.lib.umich.edu/i/icmc/bbp2372.2005.073/1/ ; and "Acoustical and vibrometry analysis of a large Balinese gamelan gong," *JASA* 128/1 (2010), EL8, https://doi.org/10.1121/1.3397234
- William Sethares & Wayne Vitale, "Exploring the Many Tunings of Balinese Gamelan," *Computer Music Journal* 47/2 (2023): 21–33, describing the Gamelan Tuning Explorer built on 47 of the Toth gamelan. https://direct.mit.edu/comj/article/47/2/21/124238
- The Toth raw measurements are held in Special Collections & Archives, Wesleyan University Library. I could not locate a public download; see §6.3.
- William Sethares, *Tuning, Timbre, Spectrum, Scale*, for the scale and timbre argument.
- Wayne Vitale, "Gamelan Tuning," on tuning about fifty gamelan sets by hand, and the 2019 Gamelan Tuning Workshop that produced the Sethares collaboration. https://www.vitalrecords.ws/gamelan-tuning
- Marc Paelinck, "Repair and tuning of Balinese gamelan instruments," Leiden. https://swarasanti.nl/upload/doc/Tuning%20of%20balinese%20gamelan%20instruments.pdf
- Jody Diamond, American Gamelan Institute, founded 1981, publisher of *Balungan* and of Lou Harrison's gamelan works. https://www.gamelan.org/ · https://www.gamelan.org/composers/harrison/index.shtml
- On Lou Harrison and William Colvig's American gamelan, tuned in just intonation (Old Granddad, 1971, a just D major), and on Si Betty, Harrison's own gamelan, left to Jody Diamond and housed at Harvard since 2007: Harvard Gazette, "Gamelanathon!" https://news.harvard.edu/gazette/story/2008/02/gamelanathon/ ; Wikipedia, *Jody Diamond*, https://en.wikipedia.org/wiki/Jody_Diamond ; Wikipedia, *William Colvig*, https://en.wikipedia.org/wiki/William_Colvig ; Percussive Arts Society on Old Granddad, https://pas.org/publication-articles/lou-harrisons-old-granddad-american-gamelan/ . Useful precedent: a Western composer applying just intonation to a tradition that uses no ratios, and doing so without any claim to authenticity.
- Bill Alves & Brett Campbell, *Lou Harrison: American Musical Maverick* (Indiana UP, 2017); Bill Alves, "Pleng: Composing for a Justly Tuned Gender Barung." https://pages.hmc.edu/alves/pleng.html
- Nathinee Chucherwatanasak, "Gamelan in North America," U. Michigan CSEAS. https://lsa.umich.edu/content/dam/cseas-assets/cseas-documents/Gamelan-in-North-America.pdf
- Barbara Benary, "Gamelan in Japan," *Balungan*. https://www.gamelan.org/balungan/current_issue/benary_japan.pdf
- "Acceptance of Javanese Karawitan in Japan," *Cogent Arts & Humanities* (2023), on Dharma Budaya and Lambangsari. https://www.tandfonline.com/doi/full/10.1080/23311983.2023.2217586
