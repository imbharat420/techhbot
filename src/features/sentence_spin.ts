import axios from 'axios';
import FormData from 'form-data';
import errorHandler from '../utils/errorHandler';

const SentenceSpin = async (body: string) => {
  const formData = new FormData();
  formData.append('data', body);
  formData.append('settings[Language]', 'English');
  formData.append('settings[Tone]', 'Neutral');
  formData.append('settings[Unique]', 'Yes');
  formData.append('settings[summarySize]', '30');
  formData.append('settings[articleURL]', '');
  formData.append('settings[tool]', 'Rewriter');
  formData.append('skip', '0');

  try {
    const { data } = await axios.post(process.env.SENTENCESPIN as string, formData);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
};

export default SentenceSpin;
