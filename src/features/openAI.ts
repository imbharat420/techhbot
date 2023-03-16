import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const OpenAI = async (text: string) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: text,
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(text, response.data.choices);
  return response.data.choices[0].text;
};

export default OpenAI;
