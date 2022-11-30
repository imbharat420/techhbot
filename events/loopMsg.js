import {
      wife,
      motivation
} from "../utils/quote.js"



let getQuote = (category) => category[Math.floor(Math.random()*category.length)];


let running = false;
let categories = ["wife","motivation"]
let loopMsg = (api,event) => {
  let count = 1;


  let txt = event.body.split(" ");
  let tId = txt[1] //2583856894982516
  let time = parseInt(txt[2]) //time
  let total = parseInt(txt[3]) //amount
  let category = txt[4] //txt
  let wrong = false;
  let msg = ""
  let errMsg = ""
  console.log(txt)


//   if(running == true){
//       return api.sendMessage(`ERR Already running`, tId)
//   }



  if(tId.length > 17 &&  tId.length < 15){
      return  api.sendMessage(`threadId will be 15 for user or 16 of group`, event.threadID)
  } 

  if(typeof time !== 'number'){
      return  api.sendMessage(`ERR time must be a number`, event.threadID)
  } 

  if(typeof total !== 'number' ){
      return  api.sendMessage(`ERR total must be a number`, event.threadID)
  } 

  if(category == ""){
      return  api.sendMessage(`ERR available categories are wife,motivation or you can write [any text]`, event.threadID)
  } 


  if(category == "wife"){
      msg = wife
  }else if(category == "motivation"){
      msg = motivation
  }else{
      msg = category
  }
  
  let inter = setInterval(() => {  
      running = true
      let message = "";
      if(typeof msg == 'object'){
            message = getQuote(msg)
      }else {
            message = msg;
      }

      api.sendMessage(message, tId)
      count++
      if (count == total + 1) {
            clearTimeout(inter)
            running = false
      } 
  }, time*1000)
}

export default loopMsg;

/*
let loopMsg = (api,event)=>{
      // console.log(wife,motivation)
      try{
            api.sendMessage(wife[Math.floor(Math.random()*wife.length)],event.threadId);
      }catch(err){
            console.log(err);
      }
}
*/