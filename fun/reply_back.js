import fs from "fs"
import login from 'fca-unofficial';

let flag = true;

login({ appState: JSON.parse(fs.readFileSync('../login/techh.json', 'utf8')) },  (err, api) => {
 if (err) return console.error(err);
 api.setOptions({ listenEvents: true });
 api.listen(async (err, event) => {
  if (err) return console.error(err);
  switch (event.type) {
   case 'message':
   case 'message_reply':
    if (event.senderID !== '100054832716212') return;
    await sleep(3000);
    api.sendMessage(event.body, event.threadID);
    await sleep(3000);
    api.setMessageReaction(':love:', event.messageID);
    break;
  }
 });
});

function sleep(ms) {
 return new Promise((resolve) => {
  setTimeout(resolve, ms);
 });
}
