const REGEX = {
  question:
    /^(?!.*\b(?:hello|hi|hey|thank you|thanks|bye|goodbye|yes|no)\b)(?:\bwho\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhy\b|\bwhich\b|\bhow\b|\bare\b|\bcould\b|\bshould\b|\bdo\b|\bdoes\b|\bis\b|\bwas\b|\bwere\b|\bam\b|\bcan\b|\bwill\b|\bmay\b|\bmight\b).+[?!.]?$/i,
};
export default REGEX;
