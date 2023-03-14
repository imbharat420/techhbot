const REGEXP = (text: string, type: string): boolean => {
  if (!type && !text) return false;
  return {
    yt: new RegExp(
      /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g,
    ).test(text ?? ''),
    '': false,
  }[type ?? ''];
};

export default REGEXP;
