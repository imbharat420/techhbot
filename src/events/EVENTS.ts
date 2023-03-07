import fs from 'fs';
import https from 'http';
import { error } from '../utils/templates';

import OPERATIONS from './OPERATIONS';

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
// TODO: ALL BASIC FUNCTIONALITY SHOULD BE IN THIS CLASS

class EVENTS {
  #api: any;
  #op: OPERATIONS;
  constructor(api: any) {
    this.#api = api;
    this.#op = new OPERATIONS();
  }

  react(reaction: string, event: any): void {
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
    this.send(error(JSON.stringify(msg)), event);
  }

  async markAsRead(event: any): Promise<void> {
    this.#api.markAsRead(event.threadID, (err: any, data: any) => {
      if (err) console.log(err);
    });
  }

  async sorry(event: any, msg: string): Promise<void> {
    this.react('😢', event);
    this.send(msg, event);
  }

  async send(msg: string, event: any): Promise<void> {
    // if (typeof msg === 'string' && msg !== '' && msg !== undefined) {
    //   console.log(msg);
    //   // await wait(1000 * msg.length * 0.2);
    //   this.#api.sendMessage(msg, event.threadID, event.messageID);
    //   return;
    // }

    this.#api.sendMessage(msg, event.threadID, event.messageID);
  }

  // path: string | Array<string>
  async sendAttachment(path: string, event: any): Promise<void> {
    console.log('sendAttachment', path);

    // if (typeof path === 'object' && path.length > 0) {
    //   const attachment: any = [];
    //   path.forEach((p) => {
    //     //@ts-ignore
    //     return;
    //   });
    // }

    if (path === '') {
      // this.send('Sorry the message is empty 😢 because of error', event);
      return;
    }

    if (typeof path !== 'string') {
      return this.error_msg(event, 'Sorry the Path is not string for make that as stream 😢');
    }
    console.log('sendAttachment', path);
    this.#api.sendMessage(
      {
        body: '',
        attachment: [fs.createReadStream(path)],
      },
      event.threadID,
    );
  }

  async sendByURL(url: string | string[], event: any): Promise<void> {
    if (typeof url === 'object' && url.length > 0) {
      const attachment: any = [];
      // url.forEach((p) => {
      //   //@ts-ignore
      //   https.get(p.video).on('response', (stream) => {
      //     attachment.push(stream);
      //   });
      // });

      this.#api.sendMessage(
        {
          body: '',
          attachment,
        },
        event.threadID,
      );
      return;
    }

    if (url !== 'string') return this.error_msg(event, 'url is not a string');
    https.get(url).on('response', (stream) => {
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
