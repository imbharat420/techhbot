// import { RequestInfo, RequestInit } from 'node-fetch';
// const fetch = (url: RequestInfo, init?: RequestInit) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(url, init));

import axios, { AxiosRequestConfig } from 'axios';

import FormData from 'form-data';
import fs from 'fs';
const MusicHumming = async (fileURL: string) => {
  console.log(fileURL);

  const formData = new FormData();
  formData.append('size', '137898');
  formData.append('file', fs.createReadStream(fileURL));

  try {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: process.env.HUMMING as string,
      data: formData,
      headers: {
        ...formData.getHeaders(),
      },
    };
    const { data } = await axios(config);
    const message = `Song Name: ${data.data.title} \nArtist: ${data.data.artists}`;
    return message;
  } catch (err) {
    console.log(err);
  }
};

export default MusicHumming;

/*

  // await fetch(process.env.HUMMING as string, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     ...formData.getHeaders(),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // const message = `Song Name: ${data.data.title} \nArtist: ${data.data.artists}`;
    //     console.log(res, fileURL);
    //     return fileURL;
    //   });








[
  { key: 'size', value: '137898', type: 'text', enabled: true },
  {
    key: 'file',
    type: 'file',
    enabled: true,
    value: ['/C:/Users/tech/Downloads/ganesh-hindi-mehendi-mohdhage-new-version-27.mp3'],
    warning:
      "This file isn't in your working directory. Teammates you share this request with won't be able to use this file. To make collaboration easier you can setup your working directory in Settings.",
  },
];



{
    "data": {
        "acrid": "2ed35535e21db4e690ed20254bf575a8",
        "artists": "A.R. Rahman, Alka Yagnik",
        "title": "Mehndi Hai Rachnewali (From \"Zubeidaa\")"
    }
}

*/
