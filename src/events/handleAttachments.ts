import MusicHumming from '../features/music_humming';
import EVENTS from './EVENTS';
import OPERATIONS from './OPERATIONS';
const op: OPERATIONS = new OPERATIONS();
const handleAttachments = async (event: any, customListen: EVENTS) => {
  const { attachments } = event.messageReply;
  console.log(attachments);

  if (attachments[0].filename === 'audio') {
    customListen.send('Only Audio type needed for find song', event);
    return;
  }

  attachments.forEach(async (attachment: any) => {
    console.log(attachment);
    const { url, type, filename } = attachment;
    const filePath = op.downloadFile(url, type, filename, (file: string, path: string) => {
      MusicHumming(path).then((res: any) => {
        console.log(res);
        customListen.send(res, event);
      });
    });
  });
};

export default handleAttachments;
