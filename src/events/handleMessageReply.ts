import EVENTS from './EVENTS';
import handleAttachments from './handleAttachments';
const handleMessageReply = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReply', event);
  const body: string = event.body;
  if (body.startsWith('!findSong')) {
    console.log('!findSong');
    handleAttachments(event, customListen);
  }

  if (body.startsWith('!findAnime')) {
    console.log('!findAnime');
    handleAttachments(event, customListen);
  }
};

export default handleMessageReply;
