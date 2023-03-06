import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const Excuse = async (body: string) => {
  const messup = body;
  const target = 'Girlfriend';

  const data = {
    '0': {
      json: {
        messup,
        request: '',
        professionalism: 10,
        target,
      },
    },
  };
  console.log(process.env.EXCUSES);
  try {
    const response = await axios.post(process.env.EXCUSES as string, data);
    console.log(response);
    const message = response.data[0]?.result?.data?.json?.generation;
    return message;
  } catch (error) {
    return errorHandler(error);
  }
};
export default Excuse;

/*
{
    "0": {
        "json": {
            "messup": "i forget to message you",
            "request": "",
            "professionalism": 10,
            "target": "Coworker"
        }
    }
}
*/
