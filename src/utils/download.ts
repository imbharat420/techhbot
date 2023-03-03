
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { DOWNLOAD_ARG } from '../types';

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

        const data={location,fileName,filepath};

        return data
    } catch (err) {
        throw new Error('DOWNLOAD => ' + err);
    }
};

export default download