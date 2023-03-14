import EVENTS from './EVENTS';
import handleAttachments from './handleAttachments';
import OPERATIONS from './OPERATIONS';
import ProfilePic from '../features/profilepic';
import Translate from '../features/translate';
import TextAudio from '../features/text_audio';
import CountryTTS from '../features/country_tts';
import PlayHT from '../features/playht';
import SentenceSpin from '../features/sentence_spin';
import LastNameCountry from '../features/lastname_country';
import RunCode from '../features/run_code';
import { PLANGUAGES } from '../constants/PLANGUAGES';

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
  const {
    senderID,
    messageReply: { senderID: rSenderID = senderID },
  } = event;
  /**
   * ! not implemented yet
   */
  //if (ignoreList.has(event.threadID)) return;
  /**
   * *------------------------*
   * @stalk
   * @Send User Info
   * *------------------------*
   */

  if (body.startsWith('@stalk')) {
    const {
      senderID,
      messageReply: { senderID: rSenderID = senderID },
    } = event;

    const filename = `${rSenderID}.jpg`;
    const url = `https://graph.facebook.com/${rSenderID}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
    // if (userInfo) {

    console.log(rSenderID, senderID);

    customListen.getUserInfo(rSenderID, (data: any) => {
      const userInfo = data[rSenderID];
      const message: any = {};
      message['message'] = '';
      console.log('userInfo', userInfo);
      for (const key in userInfo) {
        if (userInfo.isFriend === true && customListen.isMe(rSenderID)) {
          message['message'] = `We are already friend Message me if you wanna know about me\n`;
          break;
        }

        if (userInfo.isFriend === false && customListen.isMe(rSenderID)) {
          message['message'] = `We are not friends so add me if you wanna know about me \n`;
          break;
        }

        if (key === 'profileUrl') continue; // link
        if (key === 'thumbSrc') continue; // link
        if (key === 'type') continue; // type: user

        if (key === 'gender') {
          if (userInfo[key] === false) {
            message['message'] += `gender: 🤷‍♂️ \n`;
            continue;
          }

          if (userInfo[key] === 1) {
            message['message'] += `gender: Female ♀️ \n`;
          } else {
            message['message'] += `gender: Male ♂️\n`;
          }
          continue;
        }
        if (key === 'isFriend') {
          if (userInfo[key] === true) {
            message['message'] += `isFriend: 😎 you guys are friends \n`;
            continue;
          }

          if (userInfo[key] === false && customListen.isMe(senderID)) {
            message['message'] += `isFriend: 😅 you should add me on friend List \n`;
            continue;
          }

          message['message'] += `isFriend: 😏 you guys are not friends \n`;
          continue;
        }

        if (key === 'isBirthday' && userInfo[key] === false) {
          message['message'] += `isBirthday: 🤷‍♂️ (🤨 Tell me your birthday Date) \n`;
          continue;
        }

        if (key === 'vanity' && userInfo['vanity'] === '') {
          message['message'] += `vanity: Don't know 🤷‍♂️ but your userId is ${rSenderID}) \n`;
          continue;
        }

        message['message'] += `${key}: ${userInfo[key]} \n`;
      }

      op.downloadFile(url, 'photo', filename, (file: string, path: string) => {
        // customListen.sendAttachment(path, event);
        console.log('downloadFile', message, userInfo, path);
        message.urls = [];
        message.urls.push(path);
        customListen.sendAttachment(message, event);
      });
    });
  }

  if (body.startsWith('!runcode')) {
    const data = op.clean_cmd('!runcode', body);
    // const language = data.split(' ')[0];

    //detect language from message
    const plang = new RegExp(`\\b(${Object.keys(PLANGUAGES).join('|')})\\b`, 'gi');
    const wordExist = body.match(plang)?.map((match: string) => match.toLowerCase());
    const lang: string = PLANGUAGES[wordExist as unknown as keyof typeof PLANGUAGES];

    if (!lang) return customListen.send('Language Not Found', event);

    let input = '';
    if (data.includes('input')) {
      input = op.clean_cmd('input', data);
    }
    console.log('lang', lang, wordExist, data, input);

    const result = await RunCode(rbody, lang, input);
    console.log(result);
    customListen.send(result, event);
  }

  if (body.startsWith('guessCountry')) {
    customListen.getUserInfo(rSenderID, async (info: any) => {
      const userInfo = info[rSenderID];
      const lname = userInfo.name.split(' ').pop();
      const data = await LastNameCountry(lname);

      const message = `*${data.lname}* \n📌 _${data.country}_ `;

      if (!data) return customListen.send('No Data Found', event);
      customListen.send(message, event);
    });
  }

  /**
   * *------------------------*
   * !pp
   * @Send Profile Picture of User Download
   * *------------------------*
   */
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

  if (body.startsWith('!uid')) {
    const { senderID } = event.messageReply;
    customListen.send(senderID, event);
  }

  if (body === 'pp') {
    const { senderID } = event.messageReply;
    const filename = `${senderID}.jpg`;
    const url = `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
    op.downloadFile(url, 'photo', filename, (file: string, path: string) => {
      customListen.sendAttachment(path, event);
    });
  }

  /**
   *  * -----------------------------------------------
   * !Word Spinner
   * @send Text
   * TODO: Add in **REPLY** also
   *  * -----------------------------------------------
   */

  if (body.startsWith('!spinner')) {
    const mainBody: string = op.clean_cmd('!spinner', rbody);
    const cleanBody: string = op.clean_bad(mainBody);
    const data = await SentenceSpin(cleanBody);
    if (typeof data === 'object') {
      customListen.sorry(event, 'Please provide a valid sentence or follow the format');
    }
    console.log(data);
    customListen.send(data, event);
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
    const message: any = {};
    message['message'] = '';
    op.base64ToFile('data:audio/mpeg;base64,' + data, 'audio', `audio-${messageID}.mp3`, (path: string) => {
      message.urls = [];
      message.urls.push(path);
      customListen.sendAttachment(message, event);
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
        const message: any = {};
        message['message'] = '';
        message.urls = [];
        message.urls.push(data);
        customListen.sendByURL(message, event);
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
   * @Send Text ignore by stop responding to commands
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
