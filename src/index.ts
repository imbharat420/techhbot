import dotenv from 'dotenv';
dotenv.config();
import fca from 'fca-unofficial';
import fs from 'fs';
import handleMessageEvent from './events/handleMessageEvent';
import EVENTS from './events/EVENTS';
import handleMessageReply from './events/handleMessageReply';

const configListener: any = {
  listenEvents: true,
  autoMarkDelivery: false,
  selfListen: true,
};

const login = { appState: JSON.parse(fs.readFileSync('./src/login/bha.json', 'utf8')) };

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
        if (event.body === '!stop') {
          api.sendMessage('Goodbye...', event.threadID);
          return stopListening();
        }
        handleMessageEvent(event, customListen);
        break;
      case 'message_reply':
        handleMessageReply(event, customListen);
        break;
      case 'message_reaction':
        console.log(event);
        break;
      case 'event':
        console.log(event);
        break;
    }
  });
});
