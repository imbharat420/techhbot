import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import saveOnFile from "../utils/saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

let data = {}

const saveMsgs = async (event) =>{
      let {threadID,isGroup} = event;
      var now = new Date();
      var logfile_name = now.getDate()  + "-"+ now.getMonth() + "-" + now.getFullYear()  ;
      var folderName,fileName
      
      if(isGroup){
            folderName = path.join(__dirname, '..','data','msgs',"groups", logfile_name);
      }else{
            folderName = path.join(__dirname, '..','data','msgs',"users", logfile_name);
      }

      fileName = path.resolve(folderName, `${event.threadID}.json`)

      saveOnFile(folderName,fileName,event);      
}




export default saveMsgs