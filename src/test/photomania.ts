import fs  from 'fs'
import path  from 'path'
import axios  from 'axios'
import {FormData}  from 'form-data'
import {PM_RESPONSE,DOWNLOAD_ARG} from './types'  
import wait from '../utils/wait'
 console.log(process.env.FILTER_UPLOAD)


const errorHandle = (error:any) => { 
   if (error.response) { 
      console.log(`Error Data: ${error.response.data}`);
      console.log(`Error Status: ${error.response.status}`);
   } else if (error.request) {
      console.log(`Error Request: ${error.request}`);
   } else {
      console.log(`Error Message: ${error.message}`);
   }
};
  
  


/**
 * @param filepath,fileName
 * @desc !UPLOAD IMAGE
 */

const getResponse = async ({location}:DOWNLOAD_ARG): Promise<PM_RESPONSE> => {
   const formFile = new FormData();
   formFile.append('file', fs.createReadStream(String(location)));
   formFile.append('name', 'fileName.png');
        console.log(formFile)
   try {
       const { data } = await axios({
         method: 'POST',
         url: process.env.FILTER_UPLOAD,
         data: formFile,
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
   
      return data;
   } catch (err:any) {
      console.log("getResponse",err)
       throw new Error('FILTER UPLOAD => ' + err);
   }
};

/**
 * @param photoId,effectId
 * @desc !FILTER IMAGE
 */
const getEffect = async (photoId:string, effectId:unknown): Promise<PM_RESPONSE> => {
   console.log(photoId, effectId)
   const formData = new FormData();
   formData.append('photoId', photoId);
   formData.append('effectId', effectId); //"520fdb6592237be077cf99eb"
   try {
      await wait(3000);
      const { data } = await axios({
         method: 'POST',
         url: process.env.FILTER_RENDER,
         data: formData,
      });
      
      return data;
   } catch (err) {
      throw new Error('FILTER APPLY => ' + err);
   }
};

const download = async ({
   url,
   filepath,
   fileName,   
}:DOWNLOAD_ARG) => {    
    try {
      if(!filepath || !fileName){ 
         throw new Error('DOWNLOAD => filepath or fileName is not defined')
      }
      const location = path.join(__dirname ,"../../" , filepath,fileName);
       fs.mkdirSync(filepath, { recursive: true });
        const response = await axios({
            method: 'GET',
            url,
            responseType: 'stream',
        });
        response.data.pipe(fs.createWriteStream(location));

        const  data={location,fileName,filepath};

        return data
    } catch (err) {
        throw new Error('DOWNLOAD => ' + err);
    }
};










const filter = async ({
   location,
   filepath, 
   fileName,
   effectId,
}:DOWNLOAD_ARG) => {

   console.log("filter",location);
   try{
      const data = await getResponse({location})
      
      if(data){
         const effect = await getEffect(data.id, effectId)
         console.log(effect)
         if(effect){
            const data = await download({url:effect.url, filepath, fileName})
            if(data){
               return String(data.location)
            }
         }
      }
   }catch(err){
      console.log('ERROR',err);
         errorHandle(err);
   }

   //  return Promise.resolve()
   //    .then(() =>) 
   //    .then((data) =>getEffect(data.id, effectId))
   //    .then((data) =>download({url:data.url, filepath, fileName}))
   //    .then((paths) =>String(paths.location))
   //    .catch((err) => {
   //       console.log('err');
   //       errorHandle(err);
   //    });
};




  

// const filter = async ({
//    location,
//    filepath, 
//    fileName,
//    effectId,
// }:DOWNLOAD_ARG) => {
//    console.log(location)
//     return Promise.resolve()
//       .then(() => getResponse({location})) 
//       .then((data) =>getEffect(data.id, effectId))
//       .then((data) =>download({url:data.url, filepath, fileName}))
//       .then((paths) =>String(paths.location))
//       .catch((err) => {
//          console.log('err');
//          errorHandle(err);
//       });
// };
 
export {filter,download}

