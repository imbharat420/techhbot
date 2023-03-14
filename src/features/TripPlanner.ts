//10 days max
//Format : 15-days schedule for visiting India

/*
{
    "error": {
        "code": "app-runs-limit-reached"
    }
}
*/

import axios, { AxiosResponse } from 'axios';
import errorHandler from '../utils/errorHandler';

const TripPlanner = async (body: string) => {
  const content = {
    userInput: body,
  };

  try {
    const { data } = await axios.post<Promise<AxiosResponse<any, any>>>(process.env.TRIPPLANNER as string, content);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
};

export default TripPlanner;
