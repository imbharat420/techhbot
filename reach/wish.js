import fs from "fs";
import login from "fca-unofficial";
import question from "./questions.js"
import greet from "./greet.js"
import  saveOnFile from "../utils/saveOnFile.js";



const friends = JSON.parse(fs.readFileSync('./friends.json', 'utf8'));
const facts = JSON.parse(fs.readFileSync('./facts.json', 'utf8'));



let flag = true;

login({appState: JSON.parse(fs.readFileSync('../login/techh.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
      api.setOptions({listenEvents: true});
      api.listen((err, event) => {
        if(err) return console.error(err);
        
        if(flag){
            sendMessage(api)
            flag = false
       }

         switch(event.type) {
            case "message":
            case "message_reply":
            case "message_reaction":
                  if(event.isGroup) return;
                  saveOnFile("./messages",`./messages.json`,event);
                  break;
         }
      });
});







let getRandomDelay = (minDelay,maxDelay)=>{ 
    minDelay = minDelay*1000 
    maxDelay = maxDelay*1000
    return  Math.random() * (maxDelay - minDelay) + minDelay;
}

function sleep(ms) {
      return new Promise((resolve) => {
            setTimeout(resolve, ms);
      });
}

let count = 1329
console.log(friends[count])

function sendMessage(api){
      console.log(">> Start sending messages");
      let inter = setInterval(async ()=>{
            count++;
            try{
                  console.log(`>> ${count} : ${friends[count].fullName}  ${friends[count].userID}`);
                  api.sendMessage(greet(friends[count].fullName), friends[count].userID) 
                  await sleep(getRandomDelay(8,20));
                  api.sendMessage(question(), friends[count].userID) 
            }catch(err){
                  console.log(err,friends[count].userID);
            }
      
            if(count == 1350){
                  clearInterval(inter)
                  console.log("********************done*******************************")
            }
      },getRandomDelay(30,70))
}

























// const History = (api,event)=>{
//       let {threadID,timestamp} = event;
//       let history = [];
//       try{
//             api.getThreadHistory(threadID, 50, timestamp, (err, history) => {
//                   if(err) return console.error(err);
//                   if(timestamp != undefined) history.pop();
//                   timestamp = history[0].timestamp;
//                   console.log(history,timestamp);
//             });
//       }catch(err){
//             console.log("History",err);
//       }
// }















// function sleep(api,friend,ms) {
//       return new Promise(resolve => setTimeout(()=>{
//           console.log(`>> ${msgCount++} : ${friend.fullName}  ${friend.userID}`,getRandomDelay()); 
//       }, ms));
//     }
        
//     async function data(api, event) {
//           console.log(">> Start sending messages");
//           for(let i=0;i< friends.length;i++){
//                 // sendDelayMsg(api,friends[i]) 
//                 await sleep(api,friends[i],5000);
//           }
//           console.log("done");
//     }
    
//     function sendDelayMsg(api,friend){  
//           console.log(`>> ${msgCount++} : ${friend.fullName}  ${friend.userID}`,getRandomDelay());
//           // api.sendMessage(customMsg(friend.fullName), friend.userID)
//     }







// function data(api) {
//       console.log(">> Start sending messages");
//       friends.forEach((friend, i) => {
//         if (friend.id == "0") return;
//         sendDelayMsg(api,friend);
//       });
// }

// function sendDelayMsg(api, friend) {
//       const minDelay = 5000; // 5 seconds
//       const maxDelay = 30000; // 30 seconds
//       const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
//       // const stream = request("").pipe(fs.createReadStream());
//       setTimeout(() => {
//             let msg = "Msg to " + friend.fullName;
//             console.log(`>> ${msgCount++} ${msg}`);
//             try{
//                   api.sendMessage({
//                     body: customMsg(friend.fullName),
//                         //   attachment: stream
//                   }, friend.userID);
//             }catch(err){
//                   console.log(friend.id,err);
//             }
//       }, randomDelay);
// }


// request(fileUrl)
// .pipe(fs.createReadStream('file.txt'))
// .on('close', () => {
//   console.log('File downloaded and saved');
// });

/*
 switch(event.type) {
          case "message":
            if(event.body === "chao") {
              api.sendMessage("Chào bạn", event.threadID);
            }
            break;
          case "event":
            console.log(event);
            break;
        }
        */