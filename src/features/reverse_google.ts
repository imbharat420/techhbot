import google from 'googlethis';
import fs from 'fs';
import errorHandler from '../utils/errorHandler';

const ReverseGoogle = async (url: string) => {
  // Reverse Image Search
  const my_awesome_image = fs.readFileSync(url);
  try {
    const reverse = await google.search(my_awesome_image, { ris: true });
    if (reverse?.results.length == 0) {
      return 'no results';
    }
    return reverse.results[0];
  } catch (err) {
    return errorHandler(err);
  }
};

export default ReverseGoogle;
