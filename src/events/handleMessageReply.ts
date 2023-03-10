import EVENTS from './EVENTS';
import handleAttachments from './handleAttachments';
import OPERATIONS from './OPERATIONS';
import ProfilePic from '../features/profilepic';
import Translate from '../features/translate';
import TextAudio from '../features/text_audio';
import CountryTTS from '../features/country_tts';
import PlayHT from '../features/playht';

const op: OPERATIONS = new OPERATIONS();

const ignoreList = new Map();
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const handleMessageReply = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReply', event);
  const body: string = event.body;
  const rbody: string = event.messageReply.body;

  if (body.startsWith('!findSong')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!findAnime')) {
    console.log('!findAnime');
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!uploadImg')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!renderImg')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!undress')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!tn')) {
    const text = await Translate(rbody);
    console.log(text);
    if (typeof text === 'string') {
      customListen.send(text, event);
    }
  }

  /**
   * *------------------------*
   * !pp
   * @Send Profile Picture of User Download
   * *------------------------*
   */

  if (body === 'pp') {
    const { senderID } = event.messageReply;
    const filename = `${senderID}.jpg`;
    const url = `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
    op.downloadFile(url, 'photo', filename, (file: string, path: string) => {
      customListen.sendAttachment(path, event);
    });
  }

  /*#########################[ AUDIO FILES HANDLING ]##############################################*/

  /**
   * *------------------------*
   * !read
   * @Send send Audio File By base64
   * *------------------------*
   */

  if (body.startsWith('!read')) {
    const { messageID } = event.messageReply;
    const type = op.clean_cmd('!read', body);
    const data = await TextAudio(rbody, type.trim());
    op.base64ToFile('data:audio/mpeg;base64,' + data, 'audio', `audio-${messageID}.mp3`, (path: string) => {
      customListen.sendAttachment(path, event);
    });
  }

  /**
   * *------------------------*
   * !tts
   * @Send send URL of Audio File
   * *------------------------*
   */

  if (body.startsWith('!tts')) {
    const { messageID } = event.messageReply;
    const type = op.clean_cmd('!tts', body);
    await CountryTTS(rbody, type.trim(), (data: string) => {
      console.log('CountryTTS', data);
      if (typeof data === 'string' && isValidUrl(data)) {
        customListen.sendByURL(data, event);
      } else {
        customListen.send('NOT VALID URL FROM FILE', event);
      }
    });
  }

  /**
   * *------------------------*
   * !play
   * @Send send URL of Audio File
   * *------------------------*
   */

  if (body.startsWith('!play')) {
    const { messageID } = event.messageReply;
    const type = op.clean_cmd('!play', body);
    const data = await PlayHT(rbody, type.trim());
    console.log('!play', data);
    if (typeof data === 'string' && isValidUrl(data)) {
      op.downloadFile(data, 'audio', 'audio.mp3', (file: string, path: string) => {
        console.log('downloadFile', file, path);
        customListen.sendAttachment(path, event);
      });
    } else {
      customListen.send('NOT VALID URL FROM FILE', event);
    }
  }

  /*############-------------------[ AUDIO FILES HANDLING ]--------------###################*/

  /**
   * *------------------------*
   * !IGNORE
   * @Send Text
   * *------------------------*
   */

  if (body.startsWith('!ignore')) {
    if (event.senderID !== '100037131918629') return;
    if (ignoreList.has(event.messageReply.senderID) && event.senderID === '100037131918629') {
      customListen.send('I am already ignoring him.', event);
      return;
    }

    const { senderID } = event.messageReply;
    ignoreList.set(senderID, true);

    customListen.send('I will not respond to your commands anymore. 🤨😏', event);
  }
};

export default handleMessageReply;
