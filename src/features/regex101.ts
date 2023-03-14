import errorHandler from '../utils/errorHandler';
import axios from 'axios';
const Regex101 = async (query: string) => {
  try {
    const { data } = await axios.get(`https://regex101.com/api/library/1/?orderBy=MOST_POINTS&search=${query}`);

    if (data['data'].length == 0) return errorHandler('No results found!');
    console.log(data);
    const res = await axios.get(`https://regex101.com/api/library/details/${data['data'][0].permalinkFragment}`);

    let message = '';
    if (res.data?.title) message += `**Title:** ${res.data.title}\n`;
    if (res.data?.regex) message += `**Regex:** ${res.data?.regex}\n`;
    if (res.data?.description) message += `**Description:** ${res.data.description}\n`;
    if (message == '') return errorHandler('No results found!');
    return message;
  } catch (err) {
    console.log(err);
    return errorHandler(err);
  }
};

export default Regex101;

/*
[data:[ {
            "title": "get specific value from html tag",
            "description": "",
            "dateModified": "2016-09-25T06:08:33.000Z",
            "author": "A.ROA",
            "flavor": "pcre",
            "version": 1,
            "permalinkFragment": "kA9mL8",
            "rel_title": 2.45357608795166,
            "rel_author": 0,
            "rel_desc": 0,
            "upvotes": 5,
            "downvotes": 0,
            "userVote": null,
            "isFavorite": 0
        },
        {
            "title": "Html tag parser",
            "description": "This regex will help you to parse html tag.\n\nExample\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Title</title>\n</head>\n<body>\n    <picture>\n        <source srcset=\"mobile.png\" ></source>\n        <source srcset=\"tablet.png\" ></source>\n        <source srcset=\"desktop.png\" ></source>\n        <img srcset=\"default.png\">\n    </picture>\n</body>\n</html>\n```\n\nOutput\n```html\n<picture>\n    <source srcset=\"mobile.png\" ></source>\n    <source srcset=\"tablet.png\" ></source>\n    <source srcset=\"desktop.png\" ></source>\n    <img srcset=\"default.png\">\n</picture>\n```",
            "dateModified": "2021-08-27T09:22:33.000Z",
            "author": "denchiklut",
            "flavor": "pcre2",
            "version": 1,
            "permalinkFragment": "e7twfZ",
            "rel_title": 2.45357608795166,
            "rel_author": 0,
            "rel_desc": 15.163455963134766,
            "upvotes": 2,
            "downvotes": 0,
            "userVote": null,
            "isFavorite": 0
        }]



        {
    "title": "Html tag parser",
    "description": "This regex will help you to parse html tag.\n\nExample\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Title</title>\n</head>\n<body>\n    <picture>\n        <source srcset=\"mobile.png\" ></source>\n        <source srcset=\"tablet.png\" ></source>\n        <source srcset=\"desktop.png\" ></source>\n        <img srcset=\"default.png\">\n    </picture>\n</body>\n</html>\n```\n\nOutput\n```html\n<picture>\n    <source srcset=\"mobile.png\" ></source>\n    <source srcset=\"tablet.png\" ></source>\n    <source srcset=\"desktop.png\" ></source>\n    <img srcset=\"default.png\">\n</picture>\n```",
    "dateModified": "2021-08-27T09:22:33.000Z",
    "author": "denchiklut",
    "flavor": "pcre2",
    "regex": "(?=(<picture>))(\\w|\\W)*(?<=<\/picture>)",
    "delimiter": "/",
    "flags": "gm",
    "isFavorite": 0,
    "version": 1,
    "upvotes": 2,
    "downvotes": 0,
    "userVote": null,
    "permalinkFragment": "e7twfZ"
}
        */
