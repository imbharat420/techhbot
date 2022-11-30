import fs from "fs";
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
            if(data == undefined && data == null) data = [];
            let json = JSON.parse(data);
            json.push(object);
            fs.writeFileSync(fileName, JSON.stringify(json),(err,res)=>{
                  if(err) console.log(err) 
                  console.log("Append Data");
            })    
      })
      .catch(err => { console.log("Read Error: " +err);}) 
}

export default saveOnFile;