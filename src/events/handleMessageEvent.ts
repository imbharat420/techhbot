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
const op: OPERATIONS = new OPERATIONS();

const handleMessageEvent = async (event: any, customListen: EVENTS) => {
  try {
    const command: string = event.body;
    console.log(event);
    if (command.startsWith('ytsummarize')) {
      const body: string = op.clean_cmd('ytsummarize', command);
      const isLink: boolean = op.is_link(body);
      console.log(isLink, body);
      if (isLink) {
        ytsummarize(body)
          .then((data: any) => {
            console.log('isLink', isLink, data);
            const cleanBody: string = op.clean_bad(data);
            customListen.send(cleanBody, event);
          })
          .catch((err: any) => {
            console.log(err);
            customListen.error_msg(event, err);
          });
      } else {
        customListen.sorry(event, 'Please provide a valid youtube link or follow the format');
      }
    }

    if (command.startsWith('tripplanner')) {
      const body: string = op.clean_cmd('tripplanner', command);
      const cleanBody: string = op.clean_bad(body);
      TripPlanner(cleanBody)
        .then((data: any) => {
          console.log(data);
          customListen.send(data, event);
        })
        .catch((err: any) => {
          console.log(err);
          customListen.error_msg(event, err);
        });
    }

    if (command.startsWith('!spinner')) {
      const body: string = op.clean_cmd('!spinner', command);
      const cleanBody: string = op.clean_bad(body);
      SentenceSpin(cleanBody)
        .then((data: any) => {
          console.log(data);
          customListen.send(data, event);
        })
        .catch((err: any) => {
          console.log(err);
          customListen.error_msg(event, err);
        });
    }

    if (command.startsWith('execuse')) {
      const body: string = op.clean_cmd('execuse', command);
      const data = await Excuse(body);
      const path = await handleAttachments(data, event);
      customListen.send(data, event);
    }

    if (command.startsWith('poke')) {
      Poke((path: string) => {
        customListen.sendAttachment(path, event);
      });
    }

    if (command.startsWith('aiface')) {
      const body: string = op.clean_cmd('aiface', command);

      const url = await AI_FACE(command);
      op.downloadFile(url, 'photo', 'ai', async (file: string, path: string) => {
        customListen.sendAttachment(path, event);
      });
    }

    /**
     * !SEND ASCII ART
     */

    // const regex = new RegExp(`\\b(${TextArtTypes.join('|')})\\b`, 'gi');
    // const hashtag = command.match(regex)?.map((match) => match.toLowerCase());
    // // const hashtag = command.match(/(\#[a-zA-Z]+\b)(?!;)/g);
    // if (hashtag) {
    //   // const body: string = command.replace('#', '');
    //   hashtag.forEach((item: string) => {
    //     const data = TextArtTypes.filter((item) => item == command.toLowerCase());
    //     data.map((item) => {
    //       const elArr = TypeArt[item as keyof typeof TypeArt];
    //       const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
    //       console.log(element, item, data);
    //       // message += element + '\n';
    //       customListen.send(element, event);
    //     });
    //   });
    // }

    /**
     * !REACT EMOJI
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
     * !REPEAT
     */
    if (command.startsWith('repeat')) {
      const body: string = op.clean_cmd('repeat', command);
      const cleanBody: string = op.clean_bad(body);
      customListen.send(cleanBody, event);
    }

    /**
     * !QUESTION DETECTION
     */

    const isQuestion: boolean = REGEX['question'].test(command);
    if (isQuestion) {
      customListen.sendReply("I not understand your question :'(", event);
    }

    /**
     * !EMOJI MEANING
     */

    if (command.startsWith('meaning')) {
      const body: string = op.clean_cmd('meaning', command);

      const data = EMOJI_MEANING[body as keyof typeof EMOJI_MEANING];
      const splitEmoji = [...body].filter((item) => item !== ' ').join(' ');

      if (body.match(/\w/g)) {
        // customListen.send(`*give emoji for finding meaning*_`, event);
        return;
      }

      if (data) {
        let message = '';
        message = `*${data['name']}* \n📌 _${data['description']}_ `;
        message += `\n\n📌This Emoji is created by using : ${splitEmoji}`;
        customListen.send(message, event);
        // customListen.send(data['meaning'], event);
      } else {
        let message = '';
        message = `*Sorry ${body} EMOJI NOT FOUND*\n📌 _Please try another EMOJI_\n_Example: meaning 😅_`;
        message += `\n\n📌But his Emoji is created by using : ${splitEmoji}`;
        customListen.send(message, event);
      }
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
    // customListen.error_msg(event, err);
  }
};

export default handleMessageEvent;
/*

    //   // check #string
      //   let message = '';
      //   hashtag.map((item: string) => {
      //     const cleanItem = item.replace('#', '');
      //     const data: string[] = TextArtTypes.filter((item) => item == cleanItem.toLowerCase());
      //     if (data) {
      //       data.map((item) => {
      //         const elArr: [{ name: string; art: string }] = TypeArt['item'];
      //         message += elArr[Math.floor(Math.random() * elArr.length)]['art'];
      //       });
      //       // const elArr: [{ name: string; art: string }] = TextArtMapping[data[0]] as any;
      //       // message += elArr[Math.floor(Math.random() * elArr.length)]['art'];
      //     }
      //   });
      //   customListen.send(message, event);
      // let message = '';

      // if (body.trim() == '' || body == null || body == undefined) {
      //   customListen.sorry(event, 'Please provide a Text eg. #smile,');
      // } else {
      //   const data = TextArtTypes.filter((item) => item == body.toLowerCase());
      //   data.map((item) => {
      //     const elArr = TypeArt[item as keyof typeof TypeArt];
      //     const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
      //     console.log(element, item, data);
      //     customListen.send(element, event);
      //   });
      // }
      //   if (data) {
      //     const elArr = TypeArt[data[0] as keyof typeof TypeArt];
      //     const element = elArr[Math.floor(Math.random() * elArr.length)]['art'];
      //     customListen.send(element, event);
      //   } else {
      //     customListen.sorry(event, 'Please provide a valid text art name or follow the format');
      //   }
      // }

      */
