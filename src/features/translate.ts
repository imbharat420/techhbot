import axios from 'axios';
import errorHandler from '../utils/errorHandler';
//https://t8.translatedict.com/1.php?p1=auto&p2=ja&p3=hello+sir+how+are+you
const Translate = async (body: string) => {
  try {
    console.log(body);
    // const res = await axios.get(process.env.TRANSLATION as string, {
    //   params: {
    //     p1: 'auto',
    //     p2: 'ja',
    //     p3: body,
    //   },
    // });

    const res = await axios.get(`https://t8.translatedict.com/1.php?p1=auto&p2=en&p3=${body}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return errorHandler(err);
  }
};

export default Translate;
