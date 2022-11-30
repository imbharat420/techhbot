import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import saveOnFile from "./utils/saveOnFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));



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