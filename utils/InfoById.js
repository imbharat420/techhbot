import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import saveOnFile from "./saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));


const infoById = async (id)=>{
      let object= ""
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

const tInfo = async (id)=>{
      let object = "";
      object = await api.getThreadInfo(id, (err, ret) => {
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


export  {
      infoById,
      tInfo
}