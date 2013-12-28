# Account of the Languages of Earth

## Notes on the following work

### Intent and Scope

### Transcription

In the transcription, effort has been made to represent the sounds of the languages in a one-to-one correspondence with letters or letter sequences. The alternative, to represent the native glyphs by Roman ones, is not desirable, since the same glyph may stand for many sounds depending on the language used and its position in the word. However, we have borrowed several ideas from the native script, since it is the most natural and fitting way to write these languages.

The letters t, p, k, d, b, g, f, v, n, m, s, z, r, w, l, h, a, i, u, and o have their IPA values, unless used in one of the combinations listed below.

* _e_ is an open-mid front vowel.
* _y_ varies in pronunciation, but is usually close or near-close, always front or near-front, and often rounded. It may also be reduced to a schwa in many contexts. Its allophones are more or less in free variation; exceptions are noted in the pronunciation details for each language.
* _th_ is a voiceless dental fricative.
* _dh_ is a voiced dental fricative.
* _c_, _k_ usually represent the same sound, IPA k. However, when palatalized, they have different pronunciations -- see below.
* _kh_ is a voiceless velar fricative
* _ch_ is a voiceless palatal fricative
* _gh_ is a voiced palatal fricative
* _ph_ is a voiceless bilabial fricative
* _bh_ is a voiced bilabial fricative
* _lh_ is a voiceless lateral fricative
* _rh_ is a voiceless alveolar trill or flap

#### Geminate Consonants

The following doubled consonants represent geminates: tt, pp, kk, cc, dd, bb, gg, ff, vv, nn, mm, ss, zz, rr, ll

#### Vowel Length and Stress

An acute accent marks a long vowel; a grave accent marks a stressed vowel when the stress is irregular. When a vowel is both long and irregularly stressed, the combination of the two accents is represented as a circumflex. In @609, long vowels are marked by a dot or vertical stroke above the letter, while stress is  represented (sporadically) by a similar mark below the letter. In most texts, however, irregular stress is not marked at all.

#### Palatalization

In most languages, a long vowel cannot form a diphthong with an adjacent vowel. If a short front vowel (e, i, y) appears between a long vowel and a preceding or following consonant, the consonant is palatalized and the short vowel is elided. Fricatives in -h become stops when palatalized.

The palatalization sound change is as follows:

```
t  -> /tS/
th -> /t_j/
d  -> /dZ/
dh -> /d_j/
p  -> /p_j/
ph -> /p_j/
b  -> /b_j/
bh -> /b_j/
k  -> /k_j/
kh -> /k_j/
c  -> /c/
ch -> /cS/
g  -> /g_j/
gh -> /g_j/
f  -> /f_j/
v  -> /v_j/
n  -> /J/
m  -> /m_j/
s  -> /S/
z  -> /Z/
r  -> /r_j/
l  -> /l_j/
h  -> /C_j/

theán /t_ja:n/
teáich  /tSa:cS/
seír  /Si:r/
Óisin /o:Sin/
```
#### Punctuation

We use a hyphen to separate the elements of compounds, although the native script writes compounds as a single word.

### Native writing systems

The native writing systems are not used in the body of this work due to encoding limitations. A description of the principal scripts follows.

## Syntax of the Languages

All the languages share a common syntax, although the lexicon and grammatical details (e.g. inflections) vary between languages.

### Precedence

Words have a lexically-determined precedence, which is similar to the concept of part of speech in English, in that it determines how words can relate to one another syntactically. Precedence is denoted by a natural number; thus 1 is the lowest precedence. Words with a precedence higher than 1 are, by default, dependents (modifiers or arguments) of a word with a precedence one lower than their own. Thus, words with precedence 2 modify those with precedence 1, words with precedence 3 modify those with precedence 2, and so on.

In many languages, the precendences 1, 2, 3, and 4 correspond roughly to the English parts of speech Verb, Noun, Adjective, and Adverb. However, some languages have a different arrangement. @112, for example, has a small precedence-2 class composed of numerals and determiners; nouns are precedence 3.

Individual languages may have derivational morphology that can change the precedence of a word. The precedence rules may be ignored if the modifying (dependent) word is preceded by **i**.

### Constituent Order

The syntax is uniformly head-initial. Compounds, however, are head-final. Simple (one-word) modifiers tend to precede more complex modifier phrases. 

In Chomsky Normal Form, the syntax is:

* S -> P<sub>1</sub>
* P<sub>n</sub> -> P<sub>n</sub> CONJ P<sub>n</sub> for all n > 0
* P<sub>n</sub> -> W<sub>n</sub> P<sub>n+1</sub>* for all n > 0
* P<sub>n</sub> -> i P<sub>m</sub> for all n > 0, m > 0

where W<sub>n</sub> is a word in class *n*, and CONJ is any conjunction.

### Complications

Languages are complicated. While the syntax sketched above is sufficient to describe most of the corpus of the formal written language, the pragmatics of day-to-day usage introduce intricacies which are difficult to describe completely and correctly. One of the most common complications is topicalization, in which one of a verb's arguments is promoted to sentence-initial position, yielding SVO or OVS syntax rather than the usual VSO. In addition, the particle **i** is sometimes left out where the syntax would seem to require it. These details can be ignored in the syntax if we treat them as transformations of an underlying sentence structure, and it is easy to describe and reason about them that way. However, I have made an attempt at a more complete syntax that accounts for topicalization and i-deletion without resorting to transformations. That syntax appears in the appendix.

## Grammatical Sketch of @112



### Lexicon
