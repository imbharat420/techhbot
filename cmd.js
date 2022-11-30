import {
bg,
loopMsg
} from "./events/index.js"
import  wait from './utils/wait.js'
 ; 
 

let user ={     
      "bgrmv":bg
      ,
}

let vip = {
      // "savePhoto":savePhoto,
      // "unsend":unsend,
      ...user
}

let admin = {
      "loopMsg":loopMsg,
      // "eventLogs":logs,
      ...vip,
}

const commands = async (api,event,cmd,role="user")=> {
      if(role == "admin" && admin[cmd] !== undefined ){
            admin[cmd](api, event);
      }

      if(role == "vip" && vip[cmd] !== undefined){
            vip[cmd](api, event);
      }

      if(user[cmd] !== undefined){ 
            await wait(1000,api,event);
            
            user[cmd](api, event)
      };
}

export default  (api,event,role)=>{
      if(event.body.includes("loopMsg")){
            commands(api,event,"loopMsg",role)
      }

      if(event.body.includes("bgrmv")){
            commands(api,event,"bgrmv",role)
      }
}
    
    
    
    
    /*
    const bg = (api,event)=>{
      console.log("removed bg",api,event)
    }
    
    const logs = (api,event)=>{
      console.log("logs",api,event)
    }
    
    const savePhoto = (api,event)=>{
      console.log("savePhoto",api,event)
    }
    
    const unsend = (api,event)=>{
      console.log("unsend",api,event)
    }
    
    
    
    let user ={     
      "bgrmv":bg,
    }
    
    let vip = {
      "savePhoto":savePhoto,
      "unsend":unsend,
      ...user
    }
    
    let admin = {
      "eventLogs":logs,
      "savePhoto":savePhoto,
      "unsend":unsend,
      ...vip,
    }
    
    const commands = (api,event,cmd,role="user")=> {
      if(role == "admin" && admin[cmd] !== undefined ){
         admin[cmd](api, event);
      }
    
      if(role == "vip" && vip[cmd] !== undefined){
        vip[cmd](api, event);
      }
      
      if(user[cmd] !== undefined) user[cmd](api, event);
    }
    
    let get = (api,event,role,txt)=>{
    //   switch(){
          
    //   }
      if(event.body.includes("eventLogs")){
        commands(api,event,txt,role)
      }
    }
    
    
    get({},{body:"bgrmv"},"admin","unsend");
    */
    
    
    /*
    
    {
      type: 'message_reaction',
      threadID: '5059004720874903',
      messageID: 'mid.$gABH5I1NOBZeHwuZ47GBkaEu0UKb4',
      reaction: '🥰',
      senderID: '100037131918629',
      userID: '100065084151905'
    }
    
    {
      type: 'message',
      senderID: '100037131918629',
      body: '~ @Bharat Singh',
      threadID: '5307926295917343',
      messageID: 'mid.$gABLbh-Vcsx-H0USQt2Bn_9HLUOEw',
      attachments: [],
      mentions: { '100014298940217': '@Bharat Singh' },
      timestamp: '1656246716599',
      isGroup: true
    }
    
    
    */