import fs from "fs";
import login from "fca-unofficial";

let flag = false;
let msgCount = 0;

login({appState: JSON.parse(fs.readFileSync('../login/techh.json', 'utf8'))}, (err, api) => {
       if(err) return console.error(err);
      api.setOptions({listenEvents: true});
      api.listen((err, event) => {
        if(err) return console.error(err);
        flag || (sendDelayMsg(api,event), flag = true)
      })
});



function sendDelayMsg(api, event) {
      console.log(`>> ${msgCount++} Msg to ${friend.fullName}`);
      try{
            api.sendMessage({
              body: customMsg(friend.fullName),
              //   attachment: stream
            }, event.userID);
      }catch(err){
            console.log(friend.id,err);
      }
}

function getRandomDelay() {
      const minDelay = 5000; // 5 seconds
      const maxDelay = 10000; // 30 seconds
      return Math.random() * (maxDelay - minDelay) + minDelay;
}


function customMsg(name){
      let msg = `Hey ${name} 👋,

      I just wanna wish Happy New Year ✨ and thank you for being such a great friend on Facebook. Your support and encouragement have meant a lot to me, and I am grateful to have you as part of my network.
      
      I hope that we will have the opportunity to work on a project together in the future. I believe that we could make great things happen if we put our heads together.
      
      I also hope that you are doing well and that everything is going smoothly for you. If there is anything that I can do to help or support you, please don't hesitate to reach out.
      
      Again, thank you for being such a wonderful friend. I look forward to continuing our friendship and working together in the future.
      
      Sincerely,
      Techh Jork ❤️‍🔥`

      return msg;
}