import fs from "fs"
import axios  from 'axios'
import FormData  from 'form-data'

import wait from './wait'

import {PM_RESPONSE,DOWNLOAD_ARG} from '../types'  
import errorHandle from "./errorHandler";
import  download  from './download';

/**
 * @param filepath,fileName
 * @desc //!UPLOAD IMAGE
 */

const getResponse = async ({location}:DOWNLOAD_ARG): Promise<PM_RESPONSE> => {
   const formFile = new FormData();
   formFile.append('file', fs.createReadStream(String(location)));
   formFile.append('name', 'fileName.png');
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
       throw new Error('FILTER UPLOAD => ' + err);
   }
};

/**
 * @param photoId,effectId
 * @desc //!FILTER IMAGE
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
 

const filter = async ({
   location,
   filepath, 
   fileName,
   effectId,
   url,
}:DOWNLOAD_ARG) => {
   return Promise.resolve()
      .then(() => getResponse({location})) 
      .then((data) =>getEffect(data.id, effectId))
      .then((data) =>download({url:data.url, filepath, fileName}))
      .then((paths) =>String(paths.location))
      .catch((err) => {
         console.log('err');
         errorHandle(err);
      });
};


export default filter