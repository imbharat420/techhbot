import dotenv from 'dotenv';
dotenv.config();
import fca from 'fca-unofficial';
import fs from 'fs';
import handleMessageEvent from './events/handleMessageEvent';
import EVENTS from './events/EVENTS';
import handleMessageReply from './events/handleMessageReply';
import handleMessageReaction from './events/handleReaction';
import wait from './utils/wait';
import handleReadReceipt from './events/handlerReadReceipt';

const configListener: any = {
  listenEvents: true,
  autoMarkDelivery: false,
  selfListen: true,
};

const login = { appState: JSON.parse(fs.readFileSync('./src/login/bha.json', 'utf8')) };
// const login = { appState: JSON.parse(fs.readFileSync('./src/login/tech.json', 'utf8')) };

// let ulogin = { email: process.env.USERNAME, password: process.env.PASSWORD };

let done = true;
let customListen: EVENTS;
fca(login, async (err: any, api: any) => {
  if (err) return console.error(err);
  await api.setOptions(configListener);
  const stopListening = api.listen(async (err: any, event: any) => {
    if (err) return console.log(err);
    if (done) {
      done = false;
      customListen = new EVENTS(api);
    }
    switch (event.type) {
      case 'message':
        handleMessageEvent(event, customListen);
        break;
      case 'message_reply':
        handleMessageReply(event, customListen);
        break;
      case 'message_reaction':
        handleMessageReaction(event, customListen);
        break;
      case 'read_receipt':
        handleReadReceipt(event, customListen);
        break;

      // 🥲 remove this later console will be full of this
      case 'message_unsend':
      case 'typ':
      case 'read':
      // case 'presence':
      case 'event':
        console.log(event);
        break;
    }
  });
});
