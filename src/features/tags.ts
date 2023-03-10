//rapidtags.io/api/generator?query=hello&type=TikTok
/*
    type=tiktok/instagram/youtube
*/
import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const SuggestTag = async (body: string, type: string) => {
  try {
    const { data } = await axios.get(`https://rapidtags.io/api/generator`, {
      params: {
        query: body,
        type: type,
      },
    });
    console.log(data);
    let message = '';
    message += `*${data.query}*\n`;
    if (data['tags'].length == 0) return `No tags found for ${body}`;
    data['tags'].forEach((tag: any) => {
      message += tag + ' ';
    });
    return message;
  } catch (err) {
    return errorHandler(err);
  }
};

export default SuggestTag;
