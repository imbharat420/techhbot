import userInfo from "../events/userInfo.js"
import threadInfo from "../events/threadInfo.js"
import {check} from "./conditions.js"

const time = (timestamp) =>{
      let now = timestamp !== undefined ? new Date(+timestamp) : new Date();
      // var now = new Date();
      var date = now.getDate()  + "/"+ now.getMonth() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + ":"+ now.getSeconds() 
      return date;
}




const logs = async (api,event)=>{ 
     
      let {
            type=undefined,

            isTyping=undefined,
            reader=undefined,
            
            messageID=undefined,
            body=undefined,
            attachments=undefined,
            messageReply=undefined,
            mentions=undefined,
            reaction=undefined,
            
            threadID=undefined,

            senderID=undefined,
            userID=undefined,
            
            // time=undefined,
            timestamp=undefined,
            isGroup=undefined,


            logMessageType=undefined,
            logMessageData=undefined,
            addedParticipants=undefined,
            leftParticipantFbId=undefined,
            logMessageBody=undefined,
            author=undefined,
      } = event;

      let reInfo,info,tInfo;
      

      if(senderID || userID){
            info = await userInfo(api,event);
      }

      /**
       * So Big That's why not work
       */
      // if(threadID !== undefined){
      //    tInfo = await threadInfo(api,event);
      // }
      
  


      if(event?.messageReply !== undefined ){
            reInfo = {name:"NLLLLLLL"} //"await userInfo(api,event);"
      }




      switch(type){
            case "message":
                  /**
                   * if Body Exist !=""
                   */
                  
                  if(body.length === ""){}
                  
                  if(isGroup) console.log(`[${time()}] :(${threadID} -> ${info.name}) -> "${body}"`);
                  else console.log(`[${time()}] :(${info.name}) -> "${body}"`);
                  
                  if(check("isBad",event))   console.log(`**#$** >> `,messageID);
               
                  /**
                   * Send Logs for Attachment 
                   */
                  attachments.forEach(attachment => {
                        if(attachment.type == "sticker"){ 
                              console.log(`>>> Stick : "${attachment.type}" -> [${attachment.caption}]`);
                              return;
                        }

                        if(attachment.type == "share"){
                              console.log(`>>> FileName : "${attachment.type}" -> [${attachment.title}]`);
                        }

                        console.log(`>>> FileName : "${attachment.type}" -> [${attachment.filename}]`); //animated_image,file,image
                  });
            
             
                
                  break;
            case "message_reply": 
                  /**
                   * if Body Exist !=""
                   */

                  if(isGroup) console.log(`[${time()}] ->(${threadID} ->${info.name}) : "${body}" <<< Replied -> (${reInfo.name}) : \n "${messageReply.body}" `);
                  else  console.log(`[${time()}] -> (${info.name}) : "${body}" <<< Replied -> (${reInfo.name}) : \n "${messageReply.body}"`);

                  if(check("isBad",event))  console.log(`$$$$$$$ >> `,messageReply.messageID);

                  /**
                   * Send Logs for Attachment 
                   */
                  messageReply.attachments.forEach(attachment => {
                        console.log(`>>> FileName : "\$${attachment.type}" [${attachment.filename}]`);
                  });
                  break;   

            case "event": 
                  console.log(event);
                  console.log(`[${time()}] :(${info.name}) -> "${logMessageBody}"`);

                  break;

            
            // case "presence": console.log(`${dataNow} :  ${info.firstName} => ${event.body}`);
            //       break;
            //case "read_receipt" :
            //       break;
            // default: console.log("type"event.type);
      }
}





function removeEmoji(str) {
      let strCopy = str;
      const emojiKeycapRegex = /[\u0023-\u0039]\ufe0f?\u20e3/g;
      const emojiRegex = /\p{Extended_Pictographic}/gu;
      const emojiComponentRegex = /\p{Emoji_Component}/gu;
      if (emojiKeycapRegex.test(strCopy)) {
        strCopy = strCopy.replace(emojiKeycapRegex, '');
      }
      if (emojiRegex.test(strCopy)) {
        strCopy = strCopy.replace(emojiRegex, '');
      }
      if (emojiComponentRegex.test(strCopy)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const emoji of (strCopy.match(emojiComponentRegex) || [])) {
          if (/[\d|*|#]/.test(emoji)) {
            continue;
          }
          strCopy = strCopy.replace(emoji, '');
        }
      }
    
      return strCopy;
    }

export default logs;



/*
    let a = "1️⃣aa🤹‍♂️b#️⃣🔤✅❎23#!^*bb🤹🏾🤹‍♀️🚴🏻ccc";
    console.log(removeEmoji(a))

    '👨🏿‍🎤'.replace(/(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, '').charCodeAt(0)

   'Smile😀'.replace(/\p{Emoji}/gu, '');
*/