import EVENTS from './EVENTS';
import ytsummarize from '../features/yt-summarize';
import OPERATIONS from './OPERATIONS';
import TripPlanner from '../features/TripPlanner';
import SentenceSpin from '../features/sentence_spin';
import MusicHumming from '../features/music_humming';
import handleAttachments from './handleAttachments';

const op: OPERATIONS = new OPERATIONS();

const handleMessageEvent = async (event: any, customListen: EVENTS) => {
  const command: string = event.body;
  console.log(event);
  if (command.startsWith('ytsummarize')) {
    const body: string = op.clean_cmd('ytsummarize', command);
    const isLink: boolean = op.is_link(body);
    console.log(isLink, body);
    if (isLink) {
      ytsummarize(body)
        .then((data: any) => {
          console.log('isLink', isLink, data);
          const cleanBody: string = op.clean_bad(data);
          customListen.send(cleanBody, event);
        })
        .catch((err: any) => {
          console.log(err);
          customListen.error_msg(event, err);
        });
    } else {
      customListen.sorry(event, 'Please provide a valid youtube link or follow the format');
    }
  }

  if (command.startsWith('tripplanner')) {
    const body: string = op.clean_cmd('tripplanner', command);
    const cleanBody: string = op.clean_bad(body);
    TripPlanner(cleanBody)
      .then((data: any) => {
        console.log(data);
        customListen.send(data, event);
      })
      .catch((err: any) => {
        console.log(err);
        customListen.error_msg(event, err);
      });
  }

  if (command.startsWith('!spinner')) {
    const body: string = op.clean_cmd('!spinner', command);
    const cleanBody: string = op.clean_bad(body);
    SentenceSpin(cleanBody)
      .then((data: any) => {
        console.log(data);
        customListen.send(data, event);
      })
      .catch((err: any) => {
        console.log(err);
        customListen.error_msg(event, err);
      });
  }

  if (command.startsWith('!findSong')) {
    handleAttachments(event, customListen);
  }

  if (command.startsWith('repeat')) {
    const body: string = op.clean_cmd('repeat', command);
    const cleanBody: string = op.clean_bad(body);
    customListen.send(cleanBody, event);
  }

  if (command == 'bot') {
    customListen.react('Hello World', event);
  }

  if (command == 'dog') {
    customListen.react('⚠️', event);
  }

  if (command == 'cat') {
    customListen.react('✨', event);
  }
};

export default handleMessageEvent;
