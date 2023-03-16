//https://ttsmp3.com/makemp3_new.php

import request from 'request';
import FormData from 'form-data';
import errorHandler from '../utils/errorHandler';
import { COUNTRY_TTS } from '../constants/country_tts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
const CountryTTS = async (body: string, tye: string, cb: Function) => {
  const lang = COUNTRY_TTS[Math.floor(Math.random() * COUNTRY_TTS.length)]['lang'];
  try {
    const data = request.post(
      {
        url: process.env.COUNTRYTTS as string,
        form: {
          msg: body,
          lang,
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

export default CountryTTS;

/*

  const formData = new FormData();
  formData.append('msg', 'you look cute bro hello');
  formData.append('lang', 'Takumi');
  formData.append('source', 'ttsmp3');


 const config: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://ttsmp3.com/makemp3_new.php',
    data: formData,
    headers: {
      ...formData.getHeaders(),
    },
  };
  try {
    const { data } = await axios(config);
    console.log(data);
    return data['URL'];
  } catch (err) {
    return errorHandler(err);
  }





fetch('https://ttsmp3.com/makemp3_new.php', {
  method: "POST",
  body: formData
})
  .then(res => res.json())
  .then(da => console.log(da))
  .catch(err => console.log(err))



msg: hello
lang: Mizuki
source: ttsmp3


Accept-Encoding: gzip, deflate, br
Accept-Language: en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6
Cache-Control: no-cache
Connection: keep-alive
Content-Length: 35
Content-type: application/x-www-form-urlencoded
Cookie: _ga=GA1.2.1381894617.1678389203; _gid=GA1.2.1349701018.1678389203
Host: ttsmp3.com
Origin: https://ttsmp3.com
Pragma: no-cache
Referer: https://ttsmp3.com/
sec-ch-ua: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36


//[{"key":"msg","value":"you look cute bro","type":"text","enabled":true},{"key":"lang","value":"Takumi","type":"text","enabled":true},{"key":"source","value":"ttsmp3","type":"text","enabled":true}]
*/
