import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import request from "request"

// import saveOnFile from "./utils/saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
import axios from "axios";
import FormData from 'form-data';

import dotenv from "dotenv";

dotenv.config();

// import photomania from "./config/photomania.json"





// let url ="https://www.useblackbox.io/autocomplete"

// axios({
//       method:"POST",
//       url:url,
//       headers: {"Content-Type": "application/json"},
//       data:JSON.stringify({
//             "userId": "",
//             "textInput": "write webgl shaders code",
//             "source": "webapp"
//         })
// })




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

// upload()









import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA:",
  temperature: 0,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\n"],
});

console.log(response.data);






/*


let url = "https://ttsmp3.com/makemp3_new.php";

var ttsPost = async  ()=>{
  try{
      let res = await axios({
        method:"POST",
        url:"https://ttsmp3.com/makemp3_new.php",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: {msg:"I LOVE YOU",lang:"Raveena",source:"ttsmp3"}     
      })
      console.log(res.data);
  }catch(err){
      console.log("error",err.data);
  }
}

ttsPost();

*/



// const tts = (api,event)=>{
//     download(url,"./sounds/me.mp3",()=>{
//       console.log(url);
//     })
// }



// var download = function(uri, filename, callback){
//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
// };





/*
//UPLOAD BINARY
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

const formData = new FormData()
formData.append('files[]', JSON.stringify({ to: [{ phoneNumber: process.env.RINGCENTRAL_RECEIVER }] }), 'test.json')
formData.append('files[]', fs.createReadStream(path.join(__dirname, 'test.png')), 'test.png')
await rc.post('/restapi/v1.0/account/~/extension/~/fax', formData, {
  headers: formData.getHeaders()
})
*/











/*
//Text For MSGS

let users = [
      {
            isGroup:true,
            folder:"24-10-2022",
            file:"1.json",
            object:{me:"1"}
      },
      {
            isGroup:false,
            folder:"24-10-2022",
            file:"2.json",
            object:{me:"4"}
      },
      {
            isGroup:true,
            folder:"24-10-2022",
            file:"3.json",
      },
      {
            isGroup:true,
            folder:"24-10-2022",
            file:"3.json",
            object:{me:"2"}
      },
      {
            isGroup:true,
            folder:"24-10-2022",
            file:"2.json",
            object:{me:"4"}
      },
      {
            isGroup:1,
            folder:"25-10-2022",
            file:"1.json",
            object:{me:"2"}
      },
]

let msgs = [
      {
            isGroup:true,
            folder:"24-10-2022",
            file:"1.json",
            object:{me:"1"}
      },
      {
            isGroup:false,
            folder:"24-10-2022",
            file:"1.json",
            object:{me:"2"}
      },
      {
            isGroup:false,
            folder:"24-10-2022",
            file:"3.json",
            object:{me:"1"}
      },
      {
            isGroup:true,
            folder:"25-10-2022",
            file:"1.json",
            object:{me:"2"}
      },
      {
            isGroup:true,
            folder:"25-10-2022",
            file:"2.json",
            object:{me:"4"}
      },
      {
            isGroup:true,
            folder:"25-10-2022",
            file:"1.json",
            object:{me:"5"}
      },
]
let saveOnFile = (folderName,fileName,object) =>{
      if(!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{ recursive: true });          
      }

      if(!fs.existsSync(fileName)){
            fs.writeFileSync(fileName,"[]",(err,res)=>{
               if(err) console.log(err) 
            });      
      }

      fs.promises.readFile(fileName, 'utf8') 
      .then(data => { 
            let json = JSON.parse(data);
            json.push(object);
            fs.writeFileSync(fileName, JSON.stringify(json))
                  .then(  () => { console.log('Append Success'); })
                  .catch(err => { console.log("Append Failed: " + err);});
                  fs.writeFileSync(fileName,"[]",(err,res)=>{
                        if(err) console.log(err) 
                     }); 
      })
      .catch(err => { console.log("Read Error: " +err);}) 
}


msgs.map((items)=>{
      let {folder,file,object,isGroup}=items;
      var folderName,fileName; 
      if(isGroup){
            folderName = path.join(__dirname, 'data','msgs','groups', folder);
            fileName  = path.resolve(folderName, `${file}`)
      }else{
            folderName = path.join(__dirname, 'data','msgs','users', folder);
            fileName  = path.resolve(folderName, `${file}`)
      }
      saveOnFile(folderName,fileName,object);
})
*/

// var {
//       outputName,
//       outputUrl,
//     } = ({
//       pdf: {
//         outputName: 'OutputPDF',
//         outputUrl: CLIENT_PDF_BUCKET,
//       },
//       zip: {
//         outputName: 'OutputZIP',
//         outputUrl: CLIENT_ZIP_BUCKET,
//       },
//     }[type]);

//     let resultUrl = {
//       pdf: resultPdfUrl,
//       zip: resultZipUrl,
//     }[type] || (() => { throw new Error('no known type: ' + type )})();