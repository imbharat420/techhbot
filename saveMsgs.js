import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let data = {}

const saveMsgs = async (object) =>{
      console.log(object.threadID)
      let {threadID} = object;
      var now = new Date();
      var logfile_name = now.getDate()  + "-"+ now.getMonth() + "-" + now.getFullYear()  ;
      var folderName =  __dirname + "/msgs/" + logfile_name + "/";
      var name = folderName + threadID + ".json";

      if(!fs.existsSync(name)){
            if(!fs.existsSync(folderName)){
                  fs.mkdirSync(folderName,{ recursive: true });
            }
            fs.promises.writeFile(name,"[]",(err,res)=>{if(err) console.log(err) });
      }

      fs.promises.readFile(name, 'utf8') 
      .then(data => { 
            let json = JSON.parse(data);
            console.log(json);
            json.push(object);
      
            fs.promises.writeFile(name, JSON.stringify(json))
                  .then(  () => { console.log('Append Success'); })
                  .catch(err => { console.log("Append Failed: " + err);});
      })
      .catch(err => { console.log("Read Error: " +err);})  
      
}




export default saveMsgs