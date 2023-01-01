
const cloudinary= require("cloudinary");
cloudinary.config({ 
  cloud_name: 'ds113ssay', 
  api_key: '679318421227858', 
  api_secret: '5qA-m8DwqS__6kWnw3GZVq6um7U' 
});

async function cloudupload(filename, name) {
  console.log('UPLOADING START');
  try {
    const result = await cloudinary.v2.uploader.upload(filename, { public_id: name });
    return result.url;
  } catch (err) {
    console.error(err);
    return null;
  }
}



const upload = (api, event) => {
      const { type, threadID, messageID, senderID, attachments, messageReply } = event;
      if (type !== 'message_reply') return;
      if (messageReply !== undefined && messageReply.attachments.length > 0) {
        api.sendMessage('Uploading, please wait...', threadID, messageID);
        const promises = messageReply.attachments.map(async attachment => {
          console.log(attachment);
          const name = attachment.type === 'sticker' ? attachment.caption : attachment.filename;
          return cloudupload(attachment.url, name);
        });
        Promise.all(promises).then(urls => {
          api.sendMessage(urls.join('\n'), threadID, messageID);
        });
      } else {
        api.sendMessage('No file in replied message', threadID, messageID);
      }
    };
    
module.exports = upload;

    
/*
const cloudinary= require("cloudinary");
cloudinary.config({ 
  cloud_name: 'ds113ssay', 
  api_key: '679318421227858', 
  api_secret: '5qA-m8DwqS__6kWnw3GZVq6um7U' 
});
 
var cloudupload = async (filename,name,cb)=>{
	console.log("UPLOADING  START")
  	let url = "";
  	await cloudinary.v2.uploader.upload(filename,{ public_id: name }).then(async (res)=>{
      cb(res.url);
    })
}


const upload = (api,event)=>{
    const {type,threadID,messageID,senderID,attachments,messageReply} = event
    let msg =""
    if(type !== 'message_reply') return ;
    if(messageReply !== undefined && messageReply.attachments.length > 0){ 
        messageReply.attachments.forEach(async (attachment)=>{
            console.log(attachment)
            api.sendMessage("Uploading wait some time...",threadID,messageID)
            let name = attachment.type == 'sticker' ?  attachment.caption : attachment.filename;
            cloudupload(attachment.url,name,(data)=>{
                api.sendMessage(data,threadID,messageID)
            })
        })
    }else{
        api.sendMessage("NO FILE ON REPLIED MESSAGE",threadID,messageID)
    };
    
}

module.exports = upload
*/