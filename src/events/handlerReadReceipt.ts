import DateChecker from '../utils/dateChecker';
import EVENTS from './EVENTS';

type IReaders = {
  [key: string]: {
    body: string;
    isNotSent: boolean;
    lastSeen: number;
  };
};

const readers: IReaders = {
  // '100037131918629': {
  //   body: '👀 CHECKING .... TECHH JORK',
  //   isNotSent: true,
  //   lastSeen: 0,
  // },
  '100081936620905': {
    body: '👀 CHECKING .... YEN',
    isNotSent: true,
    lastSeen: 0,
  },
  '5819745318103902': {
    body: '👀 CHECKING .... **HOC GROUP**',
    isNotSent: true,
    lastSeen: 0,
  },
};

const timeTemplate = (obj: any): string => {
  let message = obj.body + '\n\n';
  for (const key in obj) {
    if (key === 'body') continue;
    if (key === 'lastSeen') continue;
    message += `\n${key}: ${obj[key]}`;
  }

  message += `\nTIME : ${DateChecker(+obj['lastSeen']).format('yyyy-mm-dd hh:mm:ss')}\n`;
  message += `📌 should be 1 minute ago`;
  return message;
};

const handleReadReceipt = async (event: any, customListen: EVENTS) => {
  console.log('handleReadReceipt', event);
  const { reader, time, threadID } = event;

  const user = readers[reader as keyof typeof readers];
  if (!user) return;

  const isGap = DateChecker(+user['lastSeen']).isGap('1m');
  console.log('isGap', isGap);

  user['lastSeen'] = time;
  console.log('user', user, time);
  if (DateChecker(+user['lastSeen']).isGap('5s')) {
    user['isNotSent'] = true;
  }
  if (Object.keys(readers).includes(reader) && isGap && user['isNotSent']) {
    user['lastSeen'] = time;
    user['isNotSent'] = false;
    changeUnsentMessage(user, time);
    console.log(
      "------------------------------------I'm here in read receipt reading messages ---------------------------",
    );
    (await customListen.delay(1000)).send(timeTemplate(user), event);
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
