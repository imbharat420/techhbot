import axios, { AxiosRequestConfig } from 'axios';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
// import fetch from 'node-fetch';
import request from 'request';
import { Stream } from 'stream';
import errorHandler from '../utils/errorHandler';

// function to encode file data to base64 encoded string
async function base64_encode(file: string) {
  // read binary data
  const bitmap = await fs.readFile(file, 'base64');
  console.log('base64 Change');
  return bitmap;
}

function doRequest(url: string, base64: string) {
  console.log('doRequest');
  return new Promise(function (resolve, reject) {
    request.post(
      {
        url: 'https://api.deep-nude.co/',
        headers: {
          'Content-Type': 'text/plain',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Encoding': 'br',
        },
        body: `data:image/png;base64,${base64}`,
      },
      function (error: any, res: any, body: any) {
        console.log(body);
        if (!error && res.statusCode === 200) {
          console.log(
            '200 body------------***********************************************************************',
            body,
          );
          resolve(body);
        } else {
          console.log(
            'error------------***********************************************************************',
            error,
          );
          reject(error);
        }
      },
    );
  });
}

const DeepNude = async (url: string) => {
  console.log('BASE64', url);
  try {
    const base64 = await base64_encode(url);
    console.log('base64 base64_encode');
    const { data } = await axios.post(process.env.URL as string, `data:image/png;base64,${base64}`, {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Encoding': 'br',
      },
    });
    console.log('res DeepNude');

    return data['imgData'];
  } catch (err) {
    console.log(err);
    // return errorHandler(err);
  }
};

export default DeepNude;

// const response = await fetch(process.env.URL as string, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'text/plain',
//     Accept: '*/*',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Content-Encoding': 'br',
//   },
//   body: base64,
// });
// if (!response.ok) {
//   throw new Error('response');
// }

// if (response.status === 200) {
//   console.log('200');
// }
