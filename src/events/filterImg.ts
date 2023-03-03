import fs from 'fs';
import axios from 'axios';
import { DOWNLOAD_ARG } from '../types';
import download from '../utils/download';
import filter from '../utils/filter';

//'520fdb6592237be077cf99eb'

async function apply({ url, filepath, fileName, effectId }: DOWNLOAD_ARG) {
  try {
    const { location } = await download({
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      filepath: 'img',
      fileName: 'me.png',
    });

    const loc = await filter({
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      location,
      filepath: 'img',
      fileName: 'me.png',
      effectId,
    });
    return loc;
  } catch (err) {
    console.log({ err });
  }
}

const filterImg = (api: any, event: any) => {
  const { body, threadID, messageID, attachments } = event;

  const [command, photoId, effectId] = body.split(' ');

  if (!photoId || !effectId) return api.sendMessage('Missing arguments', threadID, messageID);

  api.sendMessage(
    {
      body: 'Processing...',
      attachment: fs.createReadStream(__dirname + '/assets/processing.gif'),
    },
    threadID,
    (err: any, info: any) => {
      if (err) return console.log(err);
      apply({ url: attachments[0].url, filepath: 'img', fileName: 'me.png', effectId }).then((location) => {
        if(!location) return api.sendMessage('Error', threadID, messageID);
        api.sendMessage({
          body: 'Done!',
          attachment: fs.createReadStream(location),
        });
      });
    },
  );
};

export default filterImg;
