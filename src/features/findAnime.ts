import fs from 'fs';
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

const FindAnime = async (fileURL: string) => {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(fileURL));

  try {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: process.env.ANIME_FINDER as string,
      data: formData,
      headers: {
        ...formData.getHeaders(),
      },
    };

    const { data } = await axios(config);

    if (data['error']) return data['error'];
    if (data['result'].length === 0) return 'No anime found! (╯°□°）╯︵ ┻━┻';
    let message = '';
    const animes = data['result'].map((res: any) => {
      message += `Title: ${res.filename} \nSimilarity: ${res.similarity} \n`;
      return res.video;
    });
    animes['message'] = message;

    console.log(animes);
    return animes;
  } catch (err) {
    console.log(err);
  }
};

export default FindAnime;
