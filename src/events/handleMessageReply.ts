import EVENTS from './EVENTS';
import handleAttachments from './handleAttachments';
import OPERATIONS from './OPERATIONS';
import ProfilePic from '../features/profilepic';

const op: OPERATIONS = new OPERATIONS();

const handleMessageReply = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReply', event);
  const body: string = event.body;
  const rbody: string = event.messageReply.body;

  if (body.startsWith('!findSong')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!findAnime')) {
    console.log('!findAnime');
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!uploadImg')) {
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!renderImg')) {
    handleAttachments(event, customListen);
  }

  if (body === 'pp') {
    const { senderID } = event.messageReply;
    const filename = `${senderID}.jpg`;
    const url = `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
    op.downloadFile(url, 'photo', filename, (file: string, path: string) => {
      customListen.sendAttachment(path, event);
    });
  }
};

export default handleMessageReply;
