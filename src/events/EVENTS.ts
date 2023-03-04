import OPERATIONS from './OPERATIONS';

const wait = (ms: number) => {
  if (ms > 2000) ms = 10000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
// TODO: ALL BASIC FUNCTIONALITY SHOULD BE IN THIS CLASS
class EVENTS {
  #api: any;
  #op: OPERATIONS;
  constructor(api: any) {
    this.#api = api;
    this.#op = new OPERATIONS();
  }

  react(reaction: string, event: any): void {
    this.#api.setMessageReaction(reaction, event.messageID, (err: any): void => {}, true);
  }

  //Desc: Send a message with a reaction
  do(reaction: string, event: any): void {
    this.#api.setMessageReaction(':love:', event.messageID, (err: any, data: any) => {
      this.#api.sendMessage('Hello', event.threadID, event.messageID);
    });
  }
  async error_msg(event: any, msg?: string): Promise<void> {
    if (msg) msg = 'There was an error :' + msg;
    else msg = 'There was an error';
    this.react('😎', event);
    this.send('Sorry for the inconvenience⚠️😢\n' + msg, event);
  }
  async sorry(event: any, msg: string): Promise<void> {
    this.react('😎', event);
    this.send(msg, event);
  }

  async send(msg: string, event: any): Promise<void> {
    if (typeof msg === 'string' && msg !== '' && msg !== undefined) {
      console.log(msg);
      await wait(1000 * msg.length * 0.2);
      this.#api.sendMessage(msg, event.threadID, event.messageID);
      return;
    }

    this.#api.sendMessage('Sorry the message is empty 😢 because of error', event.threadID, event.messageID);
  }
}

export default EVENTS;