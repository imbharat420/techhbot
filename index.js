import fca from 'fca-unofficial';
import fs from 'fs';
import cmd from "./cmd.js";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import {
      wife,
      motivation
} from "./utils/quote.js"
import logs from './utils/logs.js';
import wait from './utils/wait.js';


// Events
import saveMsgs from "./events/saveMsgs.js";
import {userInfo,userReplyInfo} from './events/userInfo.js';
import loopMsg from "./events/loopMsg.js";
import unsendMessage from "./events/unsendMessage.js";




import dotenv from "dotenv";
dotenv.config() 



function prefix(msg) {
  if (typeof msg !== 'string') return false;
  if (msg.substring(1, 0) !== "~") return false;
  return true;
}

let options = {
      // logLevel: "silent", //"silly", "verbose", "info", "http", "warn", "error", or "silent"
      // listenEvents: true, 
      autoMarkRead: true,
      autoMarkDelivery:true,
      // updatePresence: false, 
      // selfListen:true,
      // pageID:"100037131918629",
}


let eventTypes = ["message",""]


let a = true;

let history = []


fca({ appState: JSON.parse(fs.readFileSync('fbnew.json', 'utf8')) }, async (err, api) => {
  if (err) return console.error(err);


  await wait(100);
  //await api.setOptions(options);
  await api.setOptions({ listenEvents: true,autoMarkDelivery:true,selfListen:true});

  const listenEmitter = api.listen(async (err, event) => {
      if(err) return console.log(err);
      // console.log(event);
      logs(api,event)

      if(a){
            // Techh Jork => "100037131918629"
            api.sendMessage("Bot Running","100037131918629");
            a= false;    
      }


      if(event.type == "message_unsend"){  
            console.log(event);   
            unsendMessage(api,event);
      }
      


      /**
       * @Description IF MSG Exist as string 
      */
      if(typeof event.body !== 'string' ) return

      /**
       * @Description IF MSG Exist as string but empty 
       * That contain GIF,Sticker
      */
      if(event.body == ''){}


      /**
       * @Description For Inbuilt Commands
      */
      cmd(api,event,"admin");   
      

      /**
       * @Desction For NLP
      */
      if(event.type == "message" || event.type == "message_reply" ){      
            saveMsgs(event);         
      }
  })
})




/** MAIN EVENTS

     switch(event.type){
      case "presence":
            break;
      case "typ":
            break;
      


      case "read":
            break;
      case "read_receipt":
            break;


      case "event":
            break;



      case "message_reaction":
            break;
      case "message_unsend":
            unsendMsg(api,event);
            break;

      case "message":
      case "message_reply":
            break;

     }
*/


 
      // if (prefix(event.body)) {
            // api.setMessageReaction(":heart:", event.messageID);
            // 
            
      // }

/* IMP 


      if(event.senderID == "100037131918629"){
            let sent = false;

            let type = api.sendTypingIndicator("100037131918629", function(){
                  if(sent){
                        return type()
                  }
            }) 
      }
    



let currentUserID = api.getCurrentUserID()
            api.getUserInfo(currentUserID, (err, ret) => {
                  if(err) return console.error(err);
                  console.log(ret)
                  api.sendMessage("Bot Running",currentUserID);
            });



      if(event?.threadID == "5341521042643129" || event?.threadID == "100046721985974"){
            console.log("Thread Id is ");
            api.getThreadInfo(event?.threadID, (err, ret) => {
                  if(err) return console.error(err);
                  console.log(ret); 
            });
      }


if(event.body.startsWith("loopMsg")){
      api.getUserInfo("100028613110159", (err, ret) => {
            if(err) return console.error(err);
           console.log(ret)
      });

      loopMsg(api,event)
}


if(event.body.includes("!send")){
      console.log("File is sending",event.threadID)
      const coolPath = path.join(__dirname, 'readme.md');
      console.log(coolPath)
      var message = {
            body: "This is file i am sending",
           attachment: fs.createReadStream(coolPath)
      }
      api.sendMessage(message, event.threadID,event.messageID)
}

*/




/*
if(event.type == "presence") {}
      if(event.type == "typ"){}



      if(event.type == "event"){}

      

      if(event.type == "message_reaction"){}
      if(event.type == "message_unsend"){

      }

      if(event.type == "read_receipt"){

      }

      */














/*
api.addUserToGroup(userID, threadID[, callback])
 api.markAsDelivered(message.threadID, message.messageID);
 api.markAsRead(message.threadID);
 api.getThreadHistory(threadID, 50, timestamp, (err, history) => {
        if(err) return console.error(err);
            if(timestamp != undefined) history.pop();
            timestamp = history[0].timestamp;
        });

 api.getFriendsList((err, data) => {
        if(err) return console.error(err);

        console.log(data.length);
    });

    api.changeNickname(nickname, threadID, participantID[, callback])
*/




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
