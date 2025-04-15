/**
 * ! I used npx ts-node programming-challenge.ts to run the challenge with TS
 */

const phrases = {
  Hello: "Ellohay",
  "Pig Latin": "Igpay Atinlay",
  "The first month is January": "Ethay irstfay onthmay isway Anuaryjay",
  "The floor is sticky": "Ethay oorflay isway ickystay",
  // Extra tests
  "Good morning": "Oodgay orningmay",
  "How are you": "Owhay areway ouyay",
  "Coffee is life": "Offeecay isway ifelay",
  "I love football": "Iway ovelay ootballfay",
  "Creativity meets code": "Eativitycray eetsmay odecay",
  "A mouse is a small animal": "Away ousemay isway away allsmay animalway",
};

/*
 * Rules of Pig Latin:
 * 1. For words that begin with a vowel:
 *    - Add "way" to the end of the word.
 *
 * 2. For words that begin with a consonant:
 *    - Move the leading consonant or consonant cluster to the end of the word,
 *      then append "ay" to the end.
 */

// Vowels constant
const vowels = ["a", "e", "i", "o", "u"];

/**
 * Takes a phrase and converts the English phrase to
 * a Pig Latin phrase.
 * @param englishPhrase the input English phrase
 */
function translateEnglishToPigLatin(englishPhrase: string) {
  // split the string into an array of words
  const wordsInPhrase = englishPhrase.split(" ");

  // for each word, determine if it begins with a vowel or consonant
  // and based on that, apply the relevant logic
  const pigLatinPhrase = wordsInPhrase.map((word) => {
    const charsInWord = word.split("");
    const firstChar = charsInWord[0];

    if (vowels.includes(firstChar.toLowerCase())) {
      return word + "way";
    } else {
      // find the first index of a vowel in a word
      const firstVowelIndex = charsInWord.findIndex((char) =>
        vowels.includes(char.toLowerCase())
      );

      // if there are no vowels in the word, just add 'ay' to the end
      if (firstVowelIndex === -1) {
        return charsInWord.push("a", "y");
        // handling single vowel words like "I", "a", etc.
      } else if (firstVowelIndex === 0 && charsInWord.length === 1) {
        return charsInWord.push("w", "a", "y");
      }

      // move the consonant cluster to the end of the word and add 'ay'
      const consonantCluster = charsInWord.splice(0, firstVowelIndex);
      const firstCharacterIsCapitalised = isUpperCase(consonantCluster[0]);
      charsInWord.push(...toLowerCaseArray(consonantCluster), "a", "y");

      if (firstCharacterIsCapitalised) {
        // keep the casing of the original word
        charsInWord[0] = charsInWord[0].toUpperCase();
        return charsInWord.join("");
      } else {
        return charsInWord.join("");
      }
    }
  });

  // Join the pig-latinised words with a space and return
  return pigLatinPhrase.join(" ");
}

/**
 * Tests the expected phrase to the actual phrase received.
 * @param input the input English phrase
 * @param expected the expected Pig Latin phrase
 * @param actual the actual Pig Latin phrase
 */
function testEquals(input: string, expected: string, actual: string) {
  if (expected.toLowerCase() == actual.toLowerCase()) {
    if (expected != expected.toLowerCase() && expected == actual) {
      console.log("PASS (Bonus)! " + input + " -> " + actual);
    } else {
      console.log("PASS! " + input + " -> " + actual);
    }
  } else {
    console.log("FAIL!");
    console.log("  Input: " + input);
    console.log("  Expect: " + expected);
    console.log("  Actual: " + actual);
  }
}

/**
 * Takes an array of characters and converts
 * all the characters to lowercase.
 * @param characterArray
 */
function toLowerCaseArray(characterArray: string[]) {
  return characterArray.map((char) => char.toLowerCase());
}

/**
 * Helper function to check if a character is uppercase or not
 * @param char character to test
 */
function isUpperCase(char: string) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function runChallenge() {
  Object.entries(phrases).forEach(([englishPhrase, pigLatinPhrase]) => {
    const translatedPhrase = translateEnglishToPigLatin(englishPhrase);
    testEquals(englishPhrase, pigLatinPhrase, translatedPhrase);
  });
}

runChallenge();
