import EVENTS from './EVENTS';
import ytsummarize from '../features/yt-summarize';
import OPERATIONS from './OPERATIONS';
import TripPlanner from '../features/TripPlanner';
import SentenceSpin from '../features/sentence_spin';
import MusicHumming from '../features/music_humming';
import handleAttachments from './handleAttachments';
import Poke from '../features/poke';
import Excuse from '../features/excuse';
import generateEmojipasta from '../utils/emojiPasta';
import TextArtTypes from '../constants/textArtArray';
import { EMOJI_MAPPINGS } from '../constants/emojiMapping';
import { TypeArt } from '../constants/textArt';
import { EMOJI_MEANING } from '../constants/emoji';
import AI_FACE from '../features/aiFace';
import REGEX from '../constants/regex';
import SuggestMobile from '../features/suggest_mobile';
import SuggestTag from '../features/tags';
const op: OPERATIONS = new OPERATIONS();

const handleMessageEvent = async (event: any, customListen: EVENTS) => {
  try {
    const command: string = event.body;
    console.log(event);
    /**
     * * -----------------------------------------------
     * @here
     * @send @here mention
     */
    if (command.startsWith('@here')) {
      customListen.mention('everyone', event);
    }

    /**
     *  * -----------------------------------------------
     * !ytsummarize <link>
     * @send Text summary of youtube video
     * TODO: Add in **REPLY** also
     *  * -----------------------------------------------
     */
    if (command.startsWith('ytsummarize')) {
      const body: string = op.clean_cmd('ytsummarize', command);
      const isLink: boolean = op.is_link(body);
      console.log(isLink, body);

      if (isLink) {
        const data = await ytsummarize(body);
        const cleanBody: string = op.clean_bad(data);
        customListen.send(cleanBody, event);
      } else {
        customListen.sorry(event, 'Please provide a valid youtube link or follow the format');
      }
    }

    /**
     *  * -----------------------------------------------
     * !tripplanner
     * @send Text
     *  * -----------------------------------------------
     */

    if (command.startsWith('tripplanner')) {
      const body: string = op.clean_cmd('tripplanner', command);
      const cleanBody: string = op.clean_bad(body);
      const data = await TripPlanner(cleanBody);
      console.log(data);
      customListen.send(data, event);
    }

    /**
     *  * -----------------------------------------------
     * !Word Spinner
     * @send Text
     * TODO: Add in **REPLY** also
     *  * -----------------------------------------------
     */

    if (command.startsWith('!spinner')) {
      const body: string = op.clean_cmd('!spinner', command);
      const cleanBody: string = op.clean_bad(body);
      const data = await SentenceSpin(cleanBody);
      console.log(data);
      customListen.send(data, event);
    }

    /**
     *  * -----------------------------------------------
     * !execuse
     * @send Text
     * TODO: Add in **REPLY** also and excuse:coworker <Text>
     *  * -----------------------------------------------
     */

    if (command.startsWith('excuse')) {
      const body: string = op.clean_cmd('excuse', command);
      const data = await Excuse(body);
      customListen.send(data, event);
    }

    /**
     *  * -----------------------------------------------
     * !Suggest Mobile
     * @send Images with info of mobiles
     * TODO: Add FILTER FOR proper words by mapping on predefined words suggestMobile: <TEXT>
     *  * -----------------------------------------------
     */

    if (command.match(/\bsuggestMobile\b [a-zA-Z]+(?: [a-zA-Z]+)*/g)) {
      const body: string = op.clean_cmd('suggestMobile', command);

      const data = await SuggestMobile(body);

      if (typeof data === 'string') {
        console.log('wrong');
        customListen.send(data, event);
        return;
      }
      customListen.sendByURL(data, event);
    }

    /**
     *  * -----------------------------------------------
     * !poke
     * @send Images
     * TODO: Add FILTER FOR poke by understanding the math of pointerpointer
     *  * -----------------------------------------------
     */
    if (command.startsWith('poke')) {
      const message: any = [];
      message['message'] = '👉 Poke 👈';
      Poke((path: string) => {
        message.push(path);
        customListen.sendAttachment(message, event);
      });
    }

    /**
     *  * -----------------------------------------------
     * !aiface
     * @send Images
     * TODO: Add FILTER FOR aiface face:<TEXT> eyes:<TEXT>
     *  * -----------------------------------------------
     */

    if (command.startsWith('aiface')) {
      const body: string = op.clean_cmd('aiface', command);
      const url = await AI_FACE(command);
      const message: any = [];
      message['message'] = '👉 aiface 👈';
      op.downloadFile(url, 'photo', 'ai', async (file: string, path: string) => {
        message.push(path);
        customListen.sendAttachment(message, event);
      });
    }

    /**
     *  * -----------------------------------------------
     * !bsuggestTags
     * @send Text with tags
     *  TODO: Add FILTER FOR suggestTags:Instagram <TEXT>
     *  * -----------------------------------------------
     */

    if (command.match(/\bsuggestTags\b [a-zA-Z]+(?: [a-zA-Z]+)*/g)) {
      const body: string = op.clean_cmd('suggestTags', command);
      const data = await SuggestTag(body, 'TikTok');
      customListen.send(data, event);

      /*
      if (command.match(/\bsuggestTags\b\:([a-zA-Z]+)\s([a-zA-Z]+)/g)) {
        console.log("I'm here");
        const body: string = op.clean_cmd('suggestTags:', command);
        const type = body.split(' ')[0];
        const body2: string = body.replace(type, '');
        if (!type) return customListen.sorry(event, 'Please provide a valid type like TikTok, Instagram, Youtube, etc');
        const data = await SuggestTag(body2, type);
        customListen.send(data, event);
        return;
      } else {
        const body: string = op.clean_cmd('suggestTags', command);
        const data = await SuggestTag(body, 'TikTok');
        customListen.send(data, event);
      }

      */
    }

    /**
     * * -----------------------------------------------
     * !SEND ASCII ART
     *  @DESC Send ASCII MESSAGE By Detect words
     * @Send ASCII ART
     * TODO : ADD MORE ASCII ART & improve regex for detect words
     * * -----------------------------------------------
     */

    const regex = new RegExp(`\\b(${TextArtTypes.join('|')})\\b`, 'gi');
    const hashtag = command.match(regex)?.map((match) => match.toLowerCase());
    // const hashtag = command.match(/(\#[a-zA-Z]+\b)(?!;)/g);
    if (hashtag) {
      // const body: string = command.replace('#', '');
      hashtag.forEach((item: string) => {
        const data = TextArtTypes.filter((item) => item == command.toLowerCase());
        data.map((item) => {
          const elArr = TypeArt[item as keyof typeof TypeArt];
          const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
          console.log(element, item, data);
          // message += element + '\n';
          customListen.send(element, event);
        });
      });
    }

    /**
     *  * -----------------------------------------------
     * !REACT EMOJI
     * @DESC REACT WITH EMOJI TO A MESSAGE By Detect words
     * TODO : ADD MORE EMOJI & improve regex for detect words and for detect properly
     *  * -----------------------------------------------
     */

    // const emojiRegex = new RegExp(`\\b(${Object.keys(EMOJI_MAPPINGS).join('|')})\\b`, 'gi');
    // const wordExist = command.match(emojiRegex)?.map((match) => match.toLowerCase());
    // // const hashtag = command.match(/(\#[a-zA-Z]+\b)(?!;)/g);
    // if (wordExist) {
    //   const item = wordExist[0]; //[Math.floor(Math.random() * wordExist.length)];
    //   const data = EMOJI_MAPPINGS[item as keyof typeof EMOJI_MAPPINGS];
    //   const emoji = data[Math.floor(Math.random() * data.length)];
    //   customListen.react(emoji, event);
    // }

    /**
     *  * -----------------------------------------------
     * !REPEAT
     * @DESC REPEAT A MESSAGE with clean bad words
     *  * -----------------------------------------------
     */
    if (command.startsWith('repeat')) {
      const body: string = op.clean_cmd('repeat', command);
      const cleanBody: string = op.clean_bad(body);
      customListen.send(cleanBody, event);
    }

    /**
     *  * -----------------------------------------------
     * !QUESTION DETECTION
     * @DESC GUESS IF A MESSAGE IS A QUESTION
     * TODO : IMPROVE REGEX FOR DETECT QUESTION & ADD ANSWER #openai
     *  * -----------------------------------------------
     */

    if (REGEX['question'].test(command)) {
      // customListen.sendReply("I not understand your question :'(", event);
    }

    /**
     *  * -----------------------------------------------
     * !EMOJI MEANING
     * @DESC GIVE MEANING OF EMOJI
     * TODO : IMPROVE REGEX FOR DETECT MULTIPLE EMOJI not string
     *  * -----------------------------------------------
     */

    if (command.startsWith('meaning')) {
      const body: string = op.clean_cmd('meaning', command);

      const data = EMOJI_MEANING[body as keyof typeof EMOJI_MEANING];
      const splitEmoji = [...body].filter((item) => item !== ' ').join(' ');

      if (body.match(/\w/g)) {
        // customListen.send(`*give emoji for finding meaning*_`, event);
        return;
      }

      let message = '';
      if (data) {
        message = `*${data['name']}* \n📌 _${data['description']}_ `;
        if (splitEmoji.length > 2) message += `\n\n📌This Emoji is created by using : ${splitEmoji}`;
        customListen.send(message, event);
        // customListen.send(data['meaning'], event);
      } else {
        message = `*Sorry ${body} EMOJI NOT FOUND*\n📌 _Please try another EMOJI_\n_Example: meaning 😅_`;
        if (splitEmoji.length > 2) message += `\n\n📌But this Emoji is created by using : ${splitEmoji}`;
        customListen.send(message, event);
      }
    }

    /**
     * * -----------------------------------------------
     * % BOT COMMANDS
     * TODO : ADD PROPER COMMANDS and imrove LOOK help template
     *  * -----------------------------------------------
     */

    if (command.startsWith('!help')) {
      const elArr = TypeArt['heart' as keyof typeof TypeArt];
      const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
      // console.log(element);
      let message = '';
      console.log(element);
      message += `${element}\n`;
      message += `COMMANDS*\n`;
      message += `meaning <EMOJI> eg: meaning 😅\n`;
      message += `repeat <TEXT> eg: repeat hello world\n`;
      message += `execuse <TEXT> eg: execuse i am late\n`;
      message += `poke\n`;
      message += `aiface <TEXT> eg: aiface {face,eye_color,emotion,face,head_pose,gender,age,ethnicity,hair_color,hair_length}\n`;
      (await customListen.delay(1000)).send(message, event);
    }

    if (command == 'bot') {
      customListen.react('Hello World', event);
    }

    if (command == 'dog') {
      customListen.react('⚠️', event);
    }

    if (command == 'cat') {
      customListen.react('✨', event);
    }
  } catch (err: any) {
    console.log(err);
    customListen.error_msg('SOMEWHERE ERROR', event);
  }
};

export default handleMessageEvent;

/*
   !IGNORE
      // check #string
        let message = '';
        hashtag.map((item: string) => {
          const cleanItem = item.replace('#', '');
          const data: string[] = TextArtTypes.filter((item) => item == cleanItem.toLowerCase());
          if (data) {
            data.map((item) => {
              const elArr: [{ name: string; art: string }] = TypeArt['item'];
              message += elArr[Math.floor(Math.random() * elArr.length)]['art'];
            });
            // const elArr: [{ name: string; art: string }] = TextArtMapping[data[0]] as any;
            // message += elArr[Math.floor(Math.random() * elArr.length)]['art'];
          }
        });
        customListen.send(message, event);
      let message = '';

      if (body.trim() == '' || body == null || body == undefined) {
        customListen.sorry(event, 'Please provide a Text eg. #smile,');
      } else {
        const data = TextArtTypes.filter((item) => item == body.toLowerCase());
        data.map((item) => {
          const elArr = TypeArt[item as keyof typeof TypeArt];
          const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
          console.log(element, item, data);
          customListen.send(element, event);
        });
      }
        if (data) {
          const elArr = TypeArt[data[0] as keyof typeof TypeArt];
          const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
          customListen.send(element, event);
        } else {
          customListen.sorry(event, 'Please provide a valid text art name or follow the format');
        }
      }

      */
