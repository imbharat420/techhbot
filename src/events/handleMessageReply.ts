import EVENTS from './EVENTS';
import handleAttachments from './handleAttachments';
import OPERATIONS from './OPERATIONS';

const op: OPERATIONS = new OPERATIONS();

const handleMessageReply = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReply', event);
  const body: string = event.body;
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
};

export default handleMessageReply;
