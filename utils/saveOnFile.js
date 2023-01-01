import fs from "fs";

async function saveOnFile(folderName, fileName, object) {
  try {
    await fs.promises.access(folderName);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.promises.mkdir(folderName, { recursive: true });
    } else {
      throw err;
    }
  }

  try {
    await fs.promises.appendFile(fileName, JSON.stringify(object));
  } catch (err) {
    console.error(err);
  }
}

export default saveOnFile;

/*
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
*/