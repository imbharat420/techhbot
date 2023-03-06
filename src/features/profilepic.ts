import axios, { AxiosRequestConfig } from 'axios';
import errorHandler from '../utils/errorHandler';

const ProfilePic = async (senderID: string) => {
  const url = `https://graph.facebook.com/${senderID}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
    };
    const { data } = await axios(config);
  } catch (err) {
    return errorHandler(err);
  }
};

export default ProfilePic;
