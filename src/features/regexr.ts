import request from 'request';
import axios from 'axios';
import errorHandler from '../utils/errorHandler';
import FormData from 'form-data';
const Regexr = async (query: string, cb: any) => {
  const formData = new FormData();
  formData.append('query', 'html');
  formData.append('startIndex', '0');
  formData.append('limit', '4');
  formData.append('action', 'patterns/search');

  try {
    const { data } = await axios.post('https://regexr.com/server/api.php', formData, {
      headers: {
        ...formData.getHeaders(),
        Accept: '*/*',
      },
    });

    if (data == undefined) return cb('No results found!');

    if (data.success === false) return cb('No results found!');
    if (data?.results.length === 0) return cb('No results found!');
    let message = '';

    for (let i = 0; i < 4; i++) {
      message += `**📌 ${data.results[i].name}**\n`;
      message += `**Description:** ${data.results[i].description}\n`;
      message += `**Expression:** ${data.results[i].expression}\n\n`;
    }

    return message;
    // request.post(
    //   {
    //     url: 'https://regexr.com/server/api.php',
    //     form: formData,
    //     headers: {
    //       ...formData.getHeaders(),
    //       'Accept-Encoding': 'gzip, deflate, br',
    //       Connection: 'keep-alive',
    //     },
    //   },
    //   function (err, httpResponse, body) {
    //     if (err) return errorHandler(err);

    //     if (body == undefined) return cb('No results found!');
    //     const data = JSON.parse(body);
    //     if (data.success === false) return cb('No results found!');
    //     if (data?.results.length === 0) return cb('No results found!');
    //     let message = '';

    //     for (let i = 0; i < 4; i++) {
    //       message += `**📌 ${data.results[i].name}**\n`;
    //       message += `**Description:** ${data.results[i].description}\n`;
    //       message += `**Expression:** ${data.results[i].expression}\n\n`;
    //     }
    //     cb(message);
    //   },
    // );
  } catch (err) {
    return errorHandler(err);
  }
};

export default Regexr;

/*
[{"key":"query","value":"html","description":"","type":"text","enabled":true},{"key":"startIndex","value":"0","description":"","type":"text","enabled":true},{"key":"limit","value":"1","description":"","type":"text","enabled":true},{"key":"action","value":"patterns/search","description":"","type":"text","enabled":true}]





"results": [
            {
                "id": "38u02",
                "keywords": null,
                "name": "Match Links in HTML",
                "description": "Matches all from <a... to </a>",
                "dateAdded": 1401408000000,
                "flavor": "js",
                "expression": 
                "text": "Ähnlich dem <b>Betrag</b> von <a href=\\\"http://www.vektor.de\\\">Vektoren</a> (Länge eines Vektors) ist das Maß einer Menge sozusagen die Größe oder das <a href=\\\"http://www.vektor.de/\\\">Volumen</a> der Menge.",
                "tool": null,
                "rating": 3.56,
                "userId": 0,
                "author": "Robert Sass",
                "userRating": "0",
                "favorite": false,
                "access": "public",
                "mode": "text",
                "tests": null
            },
        ]

*/
