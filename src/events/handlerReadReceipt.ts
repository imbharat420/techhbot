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
  '100037131918629': {
    body: '👀 Why yen you read my message so late\nI always wait for your reply 🥲🥲🥲',
    isNotSent: true,
    lastSeen: 0,
  },
  '100081936620905': {
    body: '👀 Why yen you read my message so late\nI always wait for your reply 🥲🥲🥲',
    isNotSent: true,
    lastSeen: 0,
  },
  '5819745318103902': {
    body: '👀 Why yen you read my message so late\nI always wait for your reply 🥲🥲🥲',
    isNotSent: true,
    lastSeen: 0,
  },
};

const handleReadReceipt = (event: any, customListen: EVENTS) => {
  console.log('handleReadReceipt', event);
  const { reader, time, threadID } = event;

  const user = readers[reader as keyof typeof readers];
  if (!user) return;

  const isGap = DateChecker(+user['lastSeen']).isGap('3s');
  console.log('isGap', isGap);

  user['lastSeen'] = time;
  console.log('user', user, time);
  if (DateChecker(+user['lastSeen']).isGap('5s')) {
    user['isNotSent'] = true;
  }
  if (Object.keys(readers).includes(reader) && isGap && user['isNotSent']) {
    user['lastSeen'] = time;
    user['isNotSent'] = false;
    changeUnsentMessage(threadID, time);
    console.log("I'm here in read receipt reading messages");
    customListen.send(user['body'], event);
  }
};

export default handleReadReceipt;

const changeUnsentMessage = (threadID: string, time: number) => {
  setTimeout(() => {
    const user = readers[threadID as keyof typeof readers];
    if (!user) return;
    user['lastSeen'] = time;
    user['isNotSent'] = true;
  }, 5000);
};

/*
we can put more checking like hasPreviousMessages and isGap between the last message and the current message
*/
