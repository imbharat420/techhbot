import dotenv from 'dotenv';
dotenv.config();
import fca from 'fca-unofficial';
import fs from 'fs';
import CONFIG from './config';
import EVENTS from './events/EVENTS';
import filterImg from './events/filterImg';
import ytsummarize from './events/yt-summarize';
// console.log("Hello World")

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
  const listenEmitter = api.listen(async (err: any, event: any) => {
    if (err) return console.log(err);
    if (done) {
      done = false;
      customListen = new EVENTS(api);
    }
    console.log(event);
    switch (event.type) {
      case 'message':
        const msg: string = customListen.prefix_clean(event.body);
        const command: string = msg;
        if (command.startsWith('ytsummarize')) {
          const body: string = customListen.clean_cmd('ytsummarize', command);
          const isLink: boolean = customListen.is_link(body);
          if (isLink) {
            ytsummarize(body)
              .then((data: any) => {
                console.log(data);
                customListen.send(data, event);
              })
              .catch((err: any) => {
                console.log('sorry for error \n' + err);
              });
          } else {
            customListen.sorry(event);
          }
        }

        if (command == 'bot') {
          customListen.react('Hello World', event);
        }

        if (command == 'dog') {
          customListen.react('Hello World', event);
        }

        if (command == 'cat') {
          customListen.react('Hello World', event);
        }
      case 'message_reply':
        console.log(event);
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
