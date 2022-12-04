import {userInfo,userReplyInfo} from "../events/userInfo.js"
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

      if(event?.messageReply !== undefined ){
            reInfo = await userReplyInfo(api,event);      
      }



       /**
       * So Big That's why not work
       */
      if(threadID !== undefined && isGroup){
            tInfo = await threadInfo(api,event);
            // console.log(tInfo.threadName);
      }


      switch(type){
            case "message":
                  /**
                   * if Body Exist !=""
                   */
                  
                  if(body.length === ""){}
                  
                  if(isGroup) console.log(`[${time()}]  ✩ (${tInfo.threadName} -> ${info.name}) -> "${body}"`);
                  else console.log(`[${time()}] ◎  (${info.name}) -> "${body}"`);
                  
                  if(check("isBad",event))   console.log(`**#$** >> `,messageID);
               
                  /**
                   * Send Logs for Attachment 
                   */
                   getAttachmentsLog(attachments);
            
             
                
                  break;
            case "message_reply": 
                  /**
                   * if Body Exist !=""
                   */

                  if(isGroup) console.log(`[${time()}] ✩ \$(${tInfo.threadName} -> ${info.name}) : "${body}" <<< Replied -> (${reInfo.name}) : "${messageReply.body}" `);
                  else  console.log(`[${time()}] ◎  (${info.name}) : "${body}" <<< Replied -> (${reInfo.name}) :  "${messageReply.body}"`);

                  if(check("isBad",event))  console.log(`$$$$$$$ >> `,messageReply.messageID);

                  

                  /**
                   * Send Logs for Attachment 
                   */
                   getAttachmentsLog(messageReply.attachments)
                  break;   
            case "message_reaction": 
                  if(isGroup) console.log(`[${time()}] ✩ (${tInfo.threadName} -> ${info.name}) -> ${reaction} react on "${messageID}" `);
                  else console.log(`[${time()}] ◎  (${info.name}) -> ${reaction} react on "${messageID}"`);

                  break;
            case "event": 
                  // console.log(`[${time()}] : (${tInfo.threadName}) "${logMessageBody}"`);
                  console.log(`[${time()}] : (${tInfo.threadName}) "${logMessageBody}"`);
                  break;

            
            // case "presence": console.log(`${dataNow} :  ${info.firstName} => ${event.body}`);
            //       break;
            //case "read_receipt" :
            //       break;
            // default: console.log("type"event.type);
      }
}


let getAttachmentsLog = (attachments)=>{
      attachments.forEach(attachment => {
            if(attachment.type == "sticker"){ 
                  console.log(`\t>>> Stick : "${attachment.type}" -> [${attachment.caption}]`);
                  return;
            }

            if(attachment.type == "share"){
                  console.log(`\t>>> FileName : "${attachment.type}" -> [${attachment.title}]`);
            }

            console.log(`\t>>> FileName : "${attachment.type}" -> [${attachment.filename}]`); //animated_image,file,image
      });
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



   console.table(
                        COMMANDS.map(command => {
                              return {
                                    "Long Option": command.long_option,
                                    "Short Option": command.short_option,
                                    Description: command.description
                              };
                        })
                  );
*/