//https://kevingal.com/apps/emojipasta.html
import { EMOJI_MAPPINGS } from '../constants/emojiMapping';

const MAX_EMOJIS_PER_BLOCK = 2;

async function generateEmojipasta(text: string) {
  const blocks = splitIntoBlocks(text);
  if (!blocks) {
    return text;
  }
  const newBlocks: string[] = [];

  for (const block of blocks) {
    newBlocks.push(block);
    const emojis = await generateEmojisFrom(block);
    if (emojis) {
      newBlocks.push(' ' + emojis);
    }
  }
  return newBlocks.join('');
}

async function generateEmojisFrom(block: string) {
  const trimmedBlock = trimNonAlphanumericalChars(block);
  const matchingEmojis = await getMatchingEmojis(trimmedBlock);
  const emojis: string[] = [];
  if (matchingEmojis) {
    const numEmojis = Math.floor(Math.random() * (MAX_EMOJIS_PER_BLOCK + 1));
    for (let i = 0; i < numEmojis; i++) {
      emojis.push(matchingEmojis[Math.floor(Math.random() * matchingEmojis.length)]);
    }
  }
  return emojis.join('');
}

async function getMatchingEmojis(word: string) {
  const key = getAlphanumericPrefix(word.toLowerCase());
  if (!key) return [];
  if (key.toString() in EMOJI_MAPPINGS) {
    return EMOJI_MAPPINGS[key.toString()] as string[];
  }
  return [];
}

function splitIntoBlocks(text: string) {
  return text.match(/\s*[^\s]*/g);
}

function trimNonAlphanumericalChars(text: string) {
  return text.replace(/^\W*/, '').replace(/\W*$/, '');
}

function getAlphanumericPrefix(s: string): RegExpMatchArray | null {
  return s.match(/^([a-z0-9]+)/);
}

export default generateEmojipasta;
