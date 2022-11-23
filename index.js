import fca from 'fca-unofficial'
import fs from 'fs'
import cmd from "./cmd.js";
import loopMsg from "./events/loopMsg.js";


import saveMsgs from "./saveMsgs.js";


function prefix(msg) {
  if (typeof msg !== 'string') return false;
  if (msg.substring(1, 0) !== "~") return false;
  return true;
}

fca({ appState: JSON.parse(fs.readFileSync('fbnew.json', 'utf8')) }, async (err, api) => {
  if (err) return console.error(err);
  await api.setOptions({ listenEvents: true, autoMarkRead: true });
  
  const listenEmitter = api.listen(async (err, event) => {
    if(err) return console.log(err);
    console.log(event);
    if(event.type == "message" || event.type == "message_reply"){
      saveMsgs(event);
    }
    if (prefix(event.body)) {
      // api.setMessageReaction(":heart:", event.messageID);
      cmd(api,event,"admin");
      if(event.body.includes("loopMsg")){
            loopMsg(api,event);
      }
    }
  })
})






// let check = true
// fca({appState: JSON.parse(fs.readFileSync('fbnew.json', 'utf8'))}, async (err, api) => {
//   if (err) return console.error(err)
//   await api.setOptions({listenEvents: true, autoMarkRead: false})
//   const listenEmitter = api.listen(async (err, event) => {
//     // if(event.body == "" && event.body == undefined) return;
//     // if(event.body.includes("~bot")){
//     //     api.sendMessage(event.messageID,event.threadID)
//     // }

//     // prettier-ignore
//     if(check){ sendMessage(api);
//             check = false;
//     } 
//   }) 
// })

// let count = 0 
 
// function sendMessage(api) {  let inter = setInterval(() => {  api.sendMessage(quotes[count], '100058559106793')
//     console.log(count, '=>', quotes[count])
//     count++
//     if (count == 100) {
//       clearTimeout(inter)
//     } 
//   }, 20000)
// }
