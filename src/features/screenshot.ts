import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import errorHandler from '../utils/errorHandler';

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const ScreenShot = async (url: string): Promise<string[]> => {
  if (isValidUrl(url) === false) return errorHandler('Invalid URL');
  try {
    const link: string[] = (await Promise.all([fetchScreenshotMobile(url), fetchScreenshotDesktop(url)])) as string[];
    if (!link) return [];
    return link;
  } catch (err) {
    return errorHandler(err);
  }
};

const fetchScreenshotMobile = async (url: string): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append('url', url);
  formData.append('device', '2');
  formData.append('flag', 'main');
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.SCREENSHOT as string,
    data: formData,
    headers: {
      ...formData.getHeaders(),
    },
  };
  const { data } = await axios(config);
  console.log(data);
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      if (data.status === 'finished') {
        clearInterval(intervalId);
        resolve(data.image_url);
      } else if (Date.now() - startTime > 60000) {
        clearInterval(intervalId);
        reject('Screenshot taking too long');
      }
    }, 1000);
  });
};

const fetchScreenshotDesktop = async (url: string): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append('url', url);
  formData.append('device', '6');
  formData.append('flag', 'main');
  const config: AxiosRequestConfig = {
    method: 'post',
    url: process.env.SCREENDDSHOT as string,
    data: formData,
    headers: {
      ...formData.getHeaders(),
    },
  };
  const { data } = await axios(config);
  console.log(data);
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      if (data.status === 'finished') {
        clearInterval(intervalId);
        resolve(data.image_url);
      } else if (Date.now() - startTime > 60000) {
        clearInterval(intervalId);
        reject('Screenshot taking too long');
      }
    }, 1000);
  });
};

export default ScreenShot;

/*

success
{"status":"finished","image_url":"https://page2images.b-cdn.net/ccimages/56/4a/hjCwOM1ecEUrS0eA.png","duration":1,"left_calls":"999995488","mobileok":"yes","ori_url":"https:\/\/www.facebook.com\/melvinjonesrepol"}
process
{"status":"processing","estimated_need_time":50}

[{"key":"url","value":"https://www.facebook.com/melvinjonesrepol","description":"","type":"text","enabled":true},{"key":"device","value":"2","description":"","type":"text","enabled":true},{"key":"flag","value":"main","description":"","type":"text","enabled":true}]
*/
