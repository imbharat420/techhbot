import axios from 'axios';
import errorHandler from '../utils/errorHandler';

//www.smartprix.com/ui/api/product-suggest?q=xiaomi&categoryId=13
//https://cdn1.smartprix.com/rx-i6D54hgVA-w420-h420/Asus-ROG-Phone-5s-5G.webp
/*
https://cdn1.smartprix.com/rx-i${imageId}-w420-h420/${name.replace(" ","-")}.webp

*/

const imageMaker = (idx: number, imageId: string, name: string) => {
  return `https://cdn1.smartprix.com/rx-i${imageId}-w1000-h1000/${name.replace(/\s/g, '-')}.webp`;
};

const SuggestMobile = async (body: string) => {
  try {
    const { data } = await axios.get(process.env.PRODUCT_SUGGEST as string, {
      params: {
        q: body,
        categoryId: 13,
      },
    });
    if (data['data'].length === 0) return 'No data found';
    let message = '';
    message += `*${data['data'].length} results found for ${body}*\n\n`;
    const productsArr = data['data'].map((item: any, index: number) => {
      message += `*${item.name}*\n`;
      message += `*Price:* ₹${item.price}\n`;
      message += `*Rating:* ${item.rating}\n`;
      message += `*Category:* ${item.category.name}`;
      if (data['data'].length - 1 !== index) message += `\n-------------------------\n`;
      return imageMaker(0, item.imageId, item.name);
    });
    productsArr['message'] = message;
    if (productsArr.length === 0) return 'No data found';
    return productsArr;
  } catch (err) {
    return errorHandler(err);
  }
};

export default SuggestMobile;
/*
!no data
{
    "status": "success",
    "data": []
}

!data

{
    "status": "success",
    "data": [
        {
            "id": "pd1mhj6y50p",
            "name": "Xiaomi Redmi Note 13 Pro 5G",
            "url": "/mobiles/xiaomi-redmi-note-13-pro-5g-ppd1mhj6y50p",
            "imageId": "61hGIvmU",
            "price": 17990,
            "rating": 82,
            "category": {
                "id": 13,
                "name": "Mobile Phones"
            }
        },
    ]
}


*/
