import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import saveOnFile from "./saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));


let getThreadData = (api,event)=>{
      return new Promise((resolve, reject) => {
            api.getThreadInfo(id, (err, ret) => {
                  if(err) reject(err);
                  resolve(ret)
            });
      });
}


let getUserData = (api,event)=>{
      return new Promise((resolve, reject) => {
            api.getUserInfo(id, (err, ret) => {
                  if(err) reject(err);
                  resolve(ret)
            });
      });
}




const infoById = async (api,id)=>{
      let user = null;
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
      user = checkUserExist()
}

const tInfo = async (api,id)=>{
      let thread = ""
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


export  {
      infoById,
      tInfo
}