import fs from "fs";
import login from "fca-unofficial";

  
login({appState: JSON.parse(fs.readFileSync('./login/techh.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
      api.setOptions({listenEvents: true});
      api.listen((err, event) => {
        if(err) return console.error(err);
        data(event);
      });
});

const friend = JSON.parse(fs.readFileSync('./friends.json', 'utf8'));

function data(event) {
      friend.forEach((e, i) => {
        if (e.id !== "0") return;
        sendMsg("message",friend.userID);
      });
}

function sendMsg(e, message) {
      const minDelay = 5000; // 5 seconds
      const maxDelay = 30000; // 30 seconds
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(() => {
         e.sendMessage(message, e.threadID);
      }, randomDelay);
}



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