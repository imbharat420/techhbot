import sounds from "../config/mp3.json";
import fs from "fs";

let url = "https://ttsmp3.com/";

const tts = (api,event)=>{
    download(result,path,()=>{
        api.event({ 
            body: result.title,
            attachment:fs.createReadStream(p)
        },tID,mID)
    })
}



var download = function(uri, filename, callback){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};