import fs from 'fs';
import https from 'https';
import http from 'http';
import { error } from '../utils/templates';

import OPERATIONS from './OPERATIONS';
import { info } from 'console';

const wait = (ms: number) => {
  if (ms > 2000) ms = 10000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
const waitForStream = (data: any, cb: Function) => {
  const attachment: any = [];
  for (const url of data) {
    if (isValidUrl(url)) {
      https.get(url).on('response', (stream) => {
        attachment.push(stream);
        if (url === data[data.length - 1]) cb(attachment);
      });
    }
  }
};

// TODO: ALL BASIC FUNCTIONALITY SHOULD BE IN THIS CLASS

class EVENTS {
  #api: any;
  #op: OPERATIONS;
  constructor(api: any) {
    this.#api = api;
    this.#op = new OPERATIONS();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delay(_time = 1000) {
    await wait(_time);
    return this;
  }

  react(reaction: string, event: any): void {
    console.log(reaction);
    this.#api.setMessageReaction(reaction, event.messageID, (err: any): void => {}, true);
  }

  //Desc: Send a message with a reaction
  do(reaction: string, event: any): void {
    this.#api.setMessageReaction(':love:', event.messageID, (err: any, data: any) => {
      this.#api.sendMessage('Hello Trouble Maker', event.threadID, event.messageID);
    });
  }

  getUserId(event: any): string {
    const userId = event.senderID ?? event.threadID;
    return userId;
  }

  getAttachment(event: any): string {
    const attachment = event.attachments[0];
    return attachment;
  }

  async error_msg(event: any, msg?: string): Promise<void> {
    // console.log(msg);
    // if (msg === undefined) msg = error('Sorry the message is empty 😢 because of error');

    // if (typeof msg === 'object') msg = JSON.stringify(msg, null, 2);

    this.react('😎', event);
    this.send(JSON.stringify(msg), event);
  }

  async markAsRead(event: any): Promise<void> {
    this.#api.markAsRead(event.threadID, (err: any, data: any) => {
      if (err) console.log(err);
    });
  }

  async sorry(event: any, msg: string): Promise<void> {
    this.react('😢', event);
    this.#api.sendMessage(msg, event.threadID);
  }

  mentionAll(msg: string, event: any): void {
    const emptyChar = '\u200E';
    const { threadID } = event;

    this.#api.getThreadInfo(event.threadID, (err: any, info: any) => {
      if (err) return console.error(err);
      const msgToSend: any = { body: emptyChar + 'everyone', mentions: [] };

      for (let i = 0; i < info.userInfo.length; i++) {
        msgToSend.mentions.push({ tag: 'everyone', id: info.userInfo[i]['id'] }); // '100001023086597': 'everyone',
        //msgToSend.mentions.push({ tag: 'everyone', id: event.threadID }); // '100001023086597': 'everyone',
      }

      this.#api.sendMessage(
        {
          body: emptyChar + 'everyone',
          mentions: [
            {
              tag: 'everyone',
              id: event.threadID,
            },
          ],
        },
        info.threadID,
      );
    });

    // this.#api.sendMessage(
    //   {
    //     body: msg,
    //     mentions: {
    //       [threadID]: '@everyone',
    //     },
    //   },
    //   event.threadID,
    // );
  }

  send(msg: string, event: any) {
    if (typeof msg === 'string' && msg !== '' && msg !== undefined) {
      console.log(msg);
      // await wait(1000 * msg.length * 0.2);
      this.#api.sendMessage(msg, event.threadID);
      return;
    }

    this.#api.sendMessage(msg, event.threadID);
  }

  sendReply(msg: string, event: any) {
    if (typeof msg === 'string' && msg !== '' && msg !== undefined) {
      console.log(msg);
      // await wait(1000 * msg.length * 0.2);
      this.#api.sendMessage(msg, event.threadID, event.messageID);
      return;
    }

    this.#api.sendMessage(msg, event.threadID, event.messageID);
  }

  // path: string | Array<string>
  async sendAttachment(path: any, event: any): Promise<void> {
    console.log('sendAttachment', path);
    if (path === '') {
      this.send('Sorry the url path is empty 😢 because of error', event);
      return;
    }

    this.#api.sendMessage(
      {
        body: path['message'], //? path['message'] : '',
        attachment: [fs.createReadStream(path[0])],
      },
      event.threadID,
    );

    // if (typeof path !== 'string') {
    //   return this.error_msg(event, 'Sorry the Path is not string for make that as stream 😢');
    // }
    // console.log('sendAttachment', path);
    // if (path && path.length === 0)
    //   return this.error_msg(event, 'Sorry the Path is not string for make that as stream 😢');

    //@

    //this.#api.sendMessage(JSON.stringify(path), event.threadID);
  }

  async sendByURL(url: any, event: any): Promise<void> {
    try {
      /* IF ARRAY OF URLS */
      if (typeof url === 'object' && url.length > 0) {
        waitForStream(url, (attachment: any) => {
          this.#api.sendMessage(
            {
              body: url['message'],
              attachment: attachment,
            },
            event.threadID,
          );
        });
        return;
      }

      /* IF STRING  */
      if (typeof url !== 'string' || url == '') return this.error_msg(event, 'url is not a string');

      https.get(url).on('response', (stream) => {
        this.#api.sendMessage(
          {
            body: '',
            attachment: [stream],
          },
          event.threadID,
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  async sendByHTTP(url: any, event: any): Promise<void> {
    /* IF STRING  */
    if (typeof url !== 'string' || url == '') return this.error_msg(event, 'url is not a string');

    http.get(url).on('response', (stream) => {
      this.#api.sendMessage(
        {
          body: '',
          attachment: [stream],
        },
        event.threadID,
      );
    });
  }
}

export default EVENTS;
