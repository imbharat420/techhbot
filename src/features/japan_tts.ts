//https://ttsmp3.com/makemp3_new.php

import request from 'request';
import FormData from 'form-data';
import errorHandler from '../utils/errorHandler';
import { COUNTRY_TTS } from '../constants/country_tts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
const JapanTTS = async (body: string, tye: string, cb: Function) => {
  try {
    const data = request.post(
      {
        url: process.env.COUNTRYTTS as string,
        form: {
          msg: body,
          lang: 'Takumi',
          source: 'ttsmp3',
        },
      },
      function (err, httpResponse, body) {
        const data = JSON.parse(body);
        console.log(data);
        cb(data['URL']);
      },
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export default JapanTTS;
