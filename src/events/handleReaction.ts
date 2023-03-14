import EVENTS from './EVENTS';

const reacted = new Set();
const handleMessageReaction = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReaction', event);
  const { reaction, messageID, threadID, senderID } = event;
  if (reacted.has(messageID) && customListen.owner !== event.userID) return;

  console.log('---------------REACTED-----------------');

  (await customListen.delay(5000)).react(reaction, event);
  reacted.add(messageID);
};

export default handleMessageReaction;

/*
{
  type: 'message_reaction',
  threadID: '7244767385593438',
  messageID: 'mid.$gABm9E9p_pl6K1DLdCmEou2Tq3KT3',
  reaction: '❤',
  senderID: '100037131918629',
  userID: '100037131918629'
}
*/

/*
Bharat Singh 100046721985974;

Techh Jork 100037131918629;
*/
