import axios, { AxiosRequestConfig } from 'axios';
import errorHandler from '../utils/errorHandler';
import fs from 'fs';
import FormData from 'form-data';
//'520fdb6592237be077cf99eb'

const RenderImg = async (body: string, effectId: string) => {
  const formData = new FormData();
  console.log(body);
  formData.append('photoId', body);
  formData.append('effectId', effectId);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.FILTER_RENDER as string,
    data: formData,
    headers: {
      ...formData.getHeaders(),
    },
  };

  try {
    const { data } = await axios(config);
    console.log(data);
    return data['url'];
  } catch (err) {
    console.log({ err });
  }
};

const UploadImg = async (url: string) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(url));
  formData.append('name', '6769fe204bfaf8f211e47e41659b3759.jpg');

  try {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: process.env.FILTER_UPLOAD as string,
      data: formData,
      headers: {
        ...formData.getHeaders(),
      },
    };
    const { data } = await axios(config);
    console.log(data);
    return data['id'];
  } catch (err) {
    return errorHandler(err);
  }
};

export { UploadImg, RenderImg };

// const filterImg = (api: any, event: any) => {
//   const { body, threadID, messageID, attachments } = event;

//   const [command, photoId, effectId] = body.split(' ');

//   if (!photoId || !effectId) return api.sendMessage('Missing arguments', threadID, messageID);

//   api.sendMessage(
//     {
//       body: 'Processing...',
//       attachment: fs.createReadStream(__dirname + '/assets/processing.gif'),
//     },
//     threadID,
//     (err: any, info: any) => {
//       if (err) return console.log(err);
//       apply({ url: attachments[0].url, filepath: 'img', fileName: 'me.png', effectId }).then((location) => {
//         if(!location) return api.sendMessage('Error', threadID, messageID);
//         api.sendMessage({
//           body: 'Done!',
//           attachment: fs.createReadStream(location),
//         });
//       });
//     },
//   );
// };
