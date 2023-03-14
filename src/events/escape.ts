import swear_words from '../constants/swear_words';
const CLEAN_BAD = (inputStr: string) => {
  // remove all special characters (except spaces) from input string
  const cleanedInputStr = inputStr.replace(/[^A-Za-z0-9\s]/g, '');

  // split cleaned input string into words
  const words = cleanedInputStr.split(' ');

  // replace matched words with asterisks
  const replacedWords = words.map((word) => {
    if (swear_words.includes(word)) {
      return word.charAt(0) + '*'.repeat(word.length - 2) + word.charAt(word.length - 1);
    }
    return word;
  });
  return replacedWords.join(' ');
};

export default CLEAN_BAD;
