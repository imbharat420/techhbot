import SWEAR_WORDS from '../constants/swear_words';
import FILEHANDLE from './FILEHANDLE';
const isValidUrl = (urlString: string) => {
  console.log(urlString);
  return new RegExp(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g,
  ).test(urlString);
};

class OPERATIONS extends FILEHANDLE {
  #event: any;
  //   constructor(event: any) {
  //     this.#event = event;
  //   }
  prefix_clean(body: any): string {
    return body.substr(1);
  }
  clean_cmd(cmd: string, body: any): string {
    return body.replace(cmd, '').trim();
  }

  is_link(link: string): boolean {
    return isValidUrl(link);
  }

  getAttachment(event: any): string {
    const attachment = event.attachments[0];
    return attachment;
  }
  clean_bad(body: string): string {
    const cleanedInputStr = body.replace(/[^\w\s\u00C0-\u024F]/g, '');

    // split cleaned input string into words
    const words = cleanedInputStr.split(' ');

    // replace matched words with asterisks
    const replacedWords = words.map((word) => {
      if (SWEAR_WORDS.includes(word)) {
        return word.charAt(0) + '*'.repeat(word.length - 2) + word.charAt(word.length - 1);
      }
      return word;
    });
    return replacedWords.join(' ');
  }
}

export default OPERATIONS;
