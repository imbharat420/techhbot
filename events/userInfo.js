import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import saveOnFile from "../utils/saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const userInfo = async (api,event)=>{
      let {isGroup=undefined,senderID=undefined,userID=undefined} = event
      let object = {}
      var now = new Date();
      var logfile_name = now.getDate()  + "-"+ now.getMonth() + "-" + now.getFullYear();
      var folderName ,fileName;
      let id = senderID !== undefined ? senderID : userID;

      if(isGroup){
            folderName = path.join(__dirname,'..','data','accounts',"groups");
            fileName = path.resolve(folderName, `${event.threadID}.json`)
      }else{
            folderName = path.join(__dirname, '..','data','accounts');
            fileName = path.resolve(folderName, `users.json`) 
      } 
      
      if(fs.existsSync(fileName)){
            object = await checkUserExist(fileName,id);
      }


      if(Object.keys(object).length !== 0){ 
            return  object
      };
      
      object = await api.getUserInfo(id, (err, ret) => {
            if(err) return console.error(err);
            object = ret;
            if(ret !== undefined){
                  saveOnFile(folderName,fileName,ret)
            } 
            return object;  
      });
      return object;
}


const userReplyInfo = async (api,event)=>{
      let {isGroup=undefined,senderID=undefined,userID=undefined} = event.messageReply
      let object = {}
      var now = new Date();
      var logfile_name = now.getDate()  + "-"+ now.getMonth() + "-" + now.getFullYear();
      var folderName ,fileName;
      let id = senderID !== undefined ? senderID : userID;

      if(isGroup){
            folderName = path.join(__dirname,'..','data','accounts',"groups");
            fileName = path.resolve(folderName, `${event.threadID}.json`)
      }else{
            folderName = path.join(__dirname, '..','data','accounts');
            fileName = path.resolve(folderName, `users.json`) 
      } 
      
      if(fs.existsSync(fileName)){
            object = await checkUserExist(fileName,id);
      }


      if(Object.keys(object).length !== 0){ 
            return  object
      };
      
      object = await api.getUserInfo(id, (err, ret) => {
            if(err) return console.error(err);
            object = ret;
            if(ret !== undefined){
                  saveOnFile(folderName,fileName,ret)
            } 
            return object;  
      });
      return object;
}

async function checkUserExist(fileName,id){
      let object = {};
      let resData = await fs.promises.readFile(fileName, 'utf8') 
      let json = JSON.parse(resData);
      for(let i=0;i<json.length;i++){
            if(json[i][id] !== undefined){
                  object = json[i][id];
                  break;
            }
      }
      return object;
}
export {userInfo,userReplyInfo};




