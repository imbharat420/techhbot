//https://play.ht/api/transcribe

import axios, { AxiosRequestConfig } from 'axios';
import errorHandler from '../utils/errorHandler';
import { TTS_ACCENT } from '../constants/tts_accent';
import wait from '../utils/wait';

const randomAccent = () => {
  const accents = Object.keys(TTS_ACCENT);
  const randomIndex = Math.floor(Math.random() * accents.length);
  return accents[randomIndex];
};

const PlayHT = async (body: string, type: string) => {
  const accent = TTS_ACCENT[randomAccent() as keyof typeof TTS_ACCENT];

  try {
    console.log('TextAudio', body, type);
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: process.env.PLAYHT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userId: 'public-access',
        platform: 'landing_demo',
        ssml: `<speak><p>${body}</p></speak>`,
        voice: accent['value'],
        narrationStyle: 'regular',
      },
    };
    const res = await axios(config);

    await wait(3000);
    const { data } = await axios(config);
    console.log(data);
    return data['file'];
  } catch (err) {
    return errorHandler(err);
  }
};

export default PlayHT;

/*
{
    "userId": "public-access",
    "platform": "landing_demo",
    "ssml": "<speak><p>hello</p></speak>",
    "voice": "en-US-AmberNeural",
    "narrationStyle": "regular"
}
*/
