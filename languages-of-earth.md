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

#### Apostrophe

The glottal stop, where phonemic, is indicated by an apostrophe ('). An apostrophe is also used to separate consonants that would otherwise form a digraph, e.g. _aeg'hel_ "sharp point". A capital H may be used in such combinations to differentiate e.g. gh /G/ from gH /gh/: _aegHel_.

#### Hiatus

When two short vowels that would otherwise form a diphthong appear in hiatus, the latter is marked with a diaeresis: _aër_ /'a.er/ "sea". A stress or length mark (see below) on a vowel also breaks up the diphthong: óan /'o:an/ "past".

#### Vowel Length and Stress

An acute accent marks a long vowel; a grave accent marks a stressed vowel when the stress is irregular according to the stress rules of the particular language. When a vowel is both long and irregularly stressed, the combination of the two accents is represented as a circumflex. In @609, long vowels are marked by a dot or vertical stroke above the letter, while stress is  represented (sporadically) by a similar mark below the letter. In most texts, however, irregular stress is not marked at all.

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
* P<sub>n</sub> -> (P<sub>n+1</sub>) W<sub>n</sub> P<sub>n+1</sub>* for all n > 0
* P<sub>n</sub> -> i P<sub>m</sub> for all n > 0, m > 0

where W<sub>n</sub> is a word in class *n*, and CONJ is any conjunction.

In English:

* A sentence consists of a precedence-1 phrase.
* For all natural numbers n:
  * **Conjunction rule:** A precedence-n phrase may consist of two precedence-n phrases joined by a conjunction.
  * **Modification rule:** A precedence-n phrase may consist of a precedence-n word optionally preceded by one precedence-(n+1) phrase and followed by any number of precedence-(n+1) phrases.
  * **Precedence change rule:** A precedence-n phrase may consist of the particle _i_ followed by a phrase of any precedence.

## Grammatical Sketch of Early @100

### Phonology

Vowel phonemes were a, e, i, o, u (as described in the section on transcription). The vowels a and e were not written in the native script.

Consonant phonemes were t, p, k, d, b, g, l, r, s, n, m, w. There was a high degree of allophony; the stops were often fricativized. It is likely that /g/ had [j] as an allophone, and /k/ was often [h].

#### Stress

Stress was, with few exceptions, on the first syllable of the word root or head of a compound.

#### Phonotactics

Final consonant clusters were restricted to the following:

- [snpl]t
- [nl]c

### Morphology

#### Plural Formation

Plural affixes included _-i_ and _-(e)n_

### Syntax

Syntax roughly follows the general syntax described previously, although a sentence could consist of a phrase of any precedence, and pre-head dependents were not allowed.

* S -> P<sub>n</sub> for all n > 0
* P<sub>n</sub> -> P<sub>n</sub> CONJ P<sub>n</sub> for all n > 0
* P<sub>n</sub> -> W<sub>n</sub> P<sub>n+1</sub>* for all n > 0
* P<sub>n</sub> -> i P<sub>m</sub> for all n > 0, m > 0

Topicalization of P<sub>1</sub> constituents could still be achieved by resolving S to P<sub>2</sub> and relativizing a P<sub>1</sub> clause with _i_.

## Lexicon of Early @100

- anno (2) year, circle
- sidu (2) star
- ecant (3) holy
- ecan (1) hallow, make holy
- domu (2) house
- diést (2) finger
- ecest (3) clean, pure
- eces (1) cleanse, purify, make clean
- 

C=nltscdmgvbf
V=eaiouy
F=nlrs
oo|ó
aa|á
ee|é
ii|í
yy|ý
uu|ú
CV
V
CVF
VF

## Grammar Sketch of @109



## Grammar Sketch of @112



### Lexicon
