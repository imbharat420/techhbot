const wait = (ms: number) => {
  if (ms < 20000) ms = 10000;
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
  constructor(api: any) {
    this.#api = api;
  }

  prefix_clean(body: any): string {
    return body.substr(1);
  }

  clean_cmd(cmd: string, body: any): string {
    return body.replace(cmd, '').trim();
  }

  is_link(link: string): boolean {
    return isValidUrl(link);
  }

  react(reaction: string, event: any): void {
    this.#api.setMessageReaction(':love:', event.messageID, (err: any, data: any) => {
      this.#api.sendMessage('Hello', event.threadID, event.messageID);
    });
  }

  do(reaction: string, event: any): void {
    this.#api.setMessageReaction(':love:', event.messageID, (err: any, data: any) => {
      this.#api.sendMessage('Hello', event.threadID, event.messageID);
    });
  }

  sorry(event: any): void {
    this.#api.sendMessage("Sorry, I don't understand", event.threadID, event.messageID);
  }

  async send(msg: string, event: any): Promise<void> {
    await wait((10000 * msg.length) / 1000);
    this.#api.sendMessage(msg, event.threadID, event.messageID);
  }
}

export default EVENTS;
