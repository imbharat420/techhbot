import rmbg  from "remove.bg";
import cloudinary from "cloudinary";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const { RemoveBgError, removeBackgroundFromImageUrl } = rmbg

cloudinary.config({ 
  cloud_name: 'ds113ssay', 
  api_key: '679318421227858', 
  api_secret: '5qA-m8DwqS__6kWnw3GZVq6um7U' 
});



var cloudupload = async (filename,name,cb)=>{
    console.log("UPLOADING  START")
    await cloudinary.v2.uploader.upload(filename,{ public_id: name }).then(async (res)=>{
      cb(res.url);
    })
}


async function removeFromImgUrl(url,outputFile,cb) {
  try {
    let a = {
      url,
      apiKey: "2Z55AjQezWSwSXDopYnhxiZb",
      size: "regular",
      type: "product",
      outputFile
    }
    console.log(a)
    const result = await removeBackgroundFromImageUrl(a);
    console.log(`File saved to ${outputFile}`);
    console.log(`${result.creditsCharged} credit(s) charged for this image`);
    console.log(`Result width x height: ${result.resultWidth} x ${result.resultHeight}, type: ${result.detectedType}`);
    console.log(result.base64img.substring(0, 40) + "..");
    console.log(`Rate limit: ${result.rateLimit}, remaining: ${result.rateLimitRemaining}, reset: ${result.rateLimitReset}, retryAfter: ${result.retryAfter}`);
    cb(outputFile)
  } catch (e) {
    const errors = e;
    cb("",errors.title)
    // console.log(JSON.stringify(errors));
  }
  return null;
}
//[{"title":"Could not identify foreground in image. For details and recommendations see https://www.remove.bg/supported-images.","code":"unknown_foreground"}]

const upload = (api,event)=>{
    const {type,threadID,messageID,senderID,attachments,messageReply} = event
    let msg =""
    if(type !== 'message_reply') return ;
    if(messageReply !== undefined && messageReply.attachments.length > 0){ 
        messageReply.attachments.forEach(async (attachment)=>{
            
        api.sendMessage("Removing",threadID,messageID)
            let name = attachment.filename + ".jpg";
            let path = __dirname + "/imgs/" + name;
            let bgpath = __dirname + "/imgs/" + "bgremove-"+ name;

            cloudupload(attachment.url,name,(url)=>{
                removeFromImgUrl(url,bgpath,(pic,err)=>{
                    console.log(pic,err);
                    if(pic==""){
                        api.sendMessage(err,threadID,messageID)
                        return;    
                    }
                    api.sendMessage({body:name,attachment:fs.createReadStream(pic)},threadID,messageID)
                });
            })
        })
    }else{
        api.sendMessage("NO FILE ON REPLIED MESSAGE",threadID,messageID)
    };
    
}

export default  upload
