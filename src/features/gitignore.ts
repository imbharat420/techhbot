import axios from 'axios';
import { template } from '../constants/template';
import errorHandler from '../utils/errorHandler';

const Gitignore = async (body: string) => {
  let has = false;
  template.forEach((item) => {
    if (item.text.toLowerCase() == body.toLowerCase()) {
      body = item.id;
      has = true;
    }
  });

  if (!has) return `No tags found for ${body}`;
  const id = body.toLowerCase().replace(/ /g, ''); // remove spaces

  try {
    const { data } = await axios.get(`https://www.toptal.com/developers/gitignore/api/${id}`);
    let message = `Here is your .gitignore file for ${body}:`;
    message += `\`\`\`${data}\`\`\``;
    return message;
  } catch (err) {
    return errorHandler(err);
  }
};

export default Gitignore;
