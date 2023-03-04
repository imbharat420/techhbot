import axios from 'axios';
import _ from 'lodash';
import errorHandler from '../utils/errorHandler';
type ROLLUPS = {
  rollups: object;
  title: string;
};

type DATA = {
  url: string;
  deviceId: string;
  idToken: string | null;
};

function shuffleString(str: string) {
  const arr: string[] = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

const YTSummarize = async (url: string) => {
  const userData: DATA = {
    url: url,
    deviceId: '-_' + shuffleString('zFzyQGbYkqDDTceOnqn'),
    idToken: null,
  };

  try {
    const { data } = await axios.post<ROLLUPS>(process.env.SUMMARIZE as string, userData);
    const rollups: any = data.rollups;
    const title = data.title;

    const allVideo: string = Object.keys(rollups[0]['children'])
      .sort()
      .map((key) => rollups['0']['children'][key])
      .join('\n');

    const summary = rollups['0']['summary'];
    const message = `Title: ${title}\n\n${allVideo} \n\n ==SUMMARY==\n${summary}`;
    return message;
  } catch (err: any) {
    return errorHandler(err);
  }
};

export default YTSummarize;

/*
{
    "message": "This video does not have subtitles and cannot be summarized.",
    "isRateLimited": false
}
*/
/*
{
    "rollups": {
        "0": {
            "children": {
                "0": "In this song, called \"Closer\", an ex-couple seems to run into each other in a hotel bar after not seeing each other for a few years. The lyrics are sung from the perspective of both parties as they reminisce about their relationship and wonder why they broke up. The driving beat and catchy melody of the song contrast with the nostalgia and wistfulness of the lyrics."
            },
            "summary": "In \"Closer\", The Chainsmokers and Halsey sing about an ex-couple who meet in a hotel bar after years apart. The lyrics reflect on their past relationship and question why they broke up, while the upbeat melody and catchy beat provide a contrasting tone to the nostalgia and wistfulness."
        }
    },
    "title": "The Chainsmokers - Closer (Lyric) ft. Halsey"
}
*/
