import photomania from "../config/photomania.json"
const filter = ()=>{
    return(

    )
}import rmbg  from "remove.bg";
import cloudinary from "cloudinary";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const { RemoveBgError, removeBackgroundFromImageUrl } = rmbg

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});


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




const filter = async (img_id)=>{
      let photoId = img_id;
      let effectId = "520fdb6592237be077cf99eb"

       const form = new FormData();
      form.append("photoId",img_id)
      form.append('effectId',effectId);
      const request_config = {
            headers: {...form.getHeaders()}
      };
      console.log("data");
      try{
        let {data} = await axios.post(process.env.FILTER_RENDER,form,request_config);
        console.log(data);   
      }catch(err){
            console.log(err);
      }
}



const upload = async ()=>{
      const form = new FormData();
      form.append("name","rahul.jpg")
      form.append('file', fs.createReadStream("rahul.png"));
      const request_config = {
            headers: {...form.getHeaders()}
      };
      try{
            let {data} = await axios.post(process.env.FILTER_UPLOAD,form,request_config);
            let {id,url,url_secure,width,height,expires_at} = data
            filter(id);
      }catch(err){
            console.log(err);
      }  

}





export default  upload
