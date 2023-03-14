import path from 'path';
import DateChecker from '../utils/dateChecker';
import EVENTS from './EVENTS';

type IReaders = {
  [key: string]: {
    body: string;
    isNotSent: boolean;
    lastSeen: number;
    username: string;
  };
};

const readers: IReaders = {
  //'100037131918629': {
  //   body: '👀 CHECKING .... \u200ETECHH JORK',
  //   isNotSent: true,
  //   lastSeen: 0,
  //   username: 'TECHH JORK',
  // },
  // '100071743848974': {
  //   body: '👀 CHECKING .... Melvin',
  //   isNotSent: true,
  //   lastSeen: 0,
  //   username: '@Melvin',
  // },
  // '100080934841785': {
  //   body: '👀 CHECKING .... PUSSY EATER',
  //   isNotSent: true,
  //   lastSeen: 0,
  //   username: 'PUSSY EATER',
  // },
  '100081936620905': {
    body: '👀 CHECKING .... \u200EYEN',
    isNotSent: true,
    lastSeen: 0,
    username: 'YEN',
  },
  // '5819745318103902': {
  //   body: '👀 CHECKING .... **HOC GROUP**',
  //   isNotSent: true,
  //   lastSeen: 0,
  //   username: '**HOC GROUP**',
  // },
};

const timeTemplate = (obj: any): string => {
  let message = obj.body + '\n\n';
  for (const key in obj) {
    if (key === 'body') continue;
    if (key === 'lastSeen') {
      message += `\nTIME : ${DateChecker(+obj['lastSeen']).format('mm:ss')}\n`;
      continue;
    }
    message += `\n${key}: ${obj[key]}`;
  }

  return message;
};

const handleReadReceipt = async (event: any, customListen: EVENTS) => {
  console.log('handleReadReceipt', event);
  const { reader, time, threadID } = event;

  const user = readers[reader as keyof typeof readers];
  if (!user) return;

  const isGap = DateChecker(+user['lastSeen']).isGap('1m');
  console.log('isGap', isGap);

  console.log('user', { isGap, user, time });

  if (isGap === false) {
    user['lastSeen'] = time;
  }
  if (Object.keys(readers).includes(reader) && isGap && user['isNotSent']) {
    user['lastSeen'] = time;
    user['isNotSent'] = false;
    changeUnsentMessage(user, time);
    console.log(
      "------------------------------------I'm here in read receipt reading messages ---------------------------",
    );
    (await customListen.delay(1000)).msgWithMention(timeTemplate(user), reader, threadID, user['username']);
    const url = path.join(__dirname, 'assets', 'video', 'noActivity1.mp4');
    (await customListen.delay(1000)).sendAttachment(url, event);
  }
};

export default handleReadReceipt;

const changeUnsentMessage = (user: any, time: number) => {
  setTimeout(() => {
    if (!user) return;
    user['lastSeen'] = time;
    user['isNotSent'] = true;
    console.log("I'm here in changeUnsentMessage reading messages ---------------------------###############");
  }, 10000);
};

/*
we can put more checking like hasPreviousMessages and isGap between the last message and the current message
*/
