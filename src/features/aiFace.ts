import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const type = {
  eye_color: ['brown', 'Grey', 'Blue', 'Green'],
  emotion: ['joy', 'neutral'],
  face: ['all', 'natural', 'beautified'],
  head_pose: ['front-facing', 'left-facing', 'right-facing'],
  gender: ['male', 'female'],
  age: ['young-adult', 'adult', 'child', 'elderly', 'infant'],
  ethnicity: ['white', 'black', 'latino', 'asian'],
  hair_color: ['brown', 'black', 'blond', 'gray'],
  hair_length: ['short', 'medium', 'long'],
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomType(key: string) {
  return type[key as keyof typeof type][
    getRandomInt(0, type[key as keyof typeof type].length)
  ] as unknown as keyof typeof type;
}
//?page=1&per_page=30&face=beautified&head_pose=front-facing&age=young-adult&ethnicity=white&hair_color=blond&hair_length=long&emotion=joy&gender=female&eye_color=brown
const AI_FACE = async (types: string) => {
  try {
    const url = process.env.AI_FACE;
    if (!url) throw new Error('AI_FACE is not defined in .env file');
    const regex = new RegExp(`\\b(${Object.keys(type).join('|')})\\b`, 'gi');
    const keysInBody = types.match(regex)?.map((match) => match.toLowerCase());
    console.log(keysInBody);
    const { data } = await axios.get(process.env.AI_FACE as string, {
      params: {
        page: 1,
        per_page: 30,
        ...(keysInBody?.includes('eye_color') && { eye_color: getRandomType('eye_color') }),
        ...(keysInBody?.includes('emotion') && { emotion: getRandomType('emotion') }),
        ...(keysInBody?.includes('head_pose') && { head_pose: getRandomType('head_pose') }),
        ...(keysInBody?.includes('age') && { age: getRandomType('age') }),
        ...(keysInBody?.includes('face') && { face: getRandomType('face') }),
        ...(keysInBody?.includes('ethnicity') && { ethnicity: getRandomType('ethnicity') }),
        ...(keysInBody?.includes('hair_color') && { hair_color: getRandomType('hair_color') }),
        ...(keysInBody?.includes('gender') && { gender: getRandomType('gender') }),
        ...(keysInBody?.includes('hair_length') && { hair_length: getRandomType('hair_length') }),
      },
      headers: {
        authorization: 'API-Key Cph30qkLrdJDkjW-THCeyA',
      },
    });
    return data['images'][getRandomInt(1, 30)]['thumb_url'];
  } catch (err) {
    return errorHandler(err);
  }
};

export default AI_FACE;

/*


Joy;
Neutral

Face

All
Natural
NEW
Beautified

Head Pose

Front facing
Left facing
Right facing

Sex

Female
Male

Age

Young adult
Adult
Child
Elderly
Infant

Ethnicity

White
Black
Latino
Asian

Eye Color

Brown
Grey
Blue
Green

Hair Color

Brown
Black
Blond
Gray

Hair Length

Short
Medium
Long

Emotion

Joy
Neutral



 let el = {
               
                        filters: [{
                            name: c,
                            values: [{
                                name: "natural",
                                count: 1575783,
                                disabled:false
                            }, {
                                name: "beautified",
                                count: 1101199,
                                disabled:false
                            }],
                            slug: c
                        }, {
                            name: "head_pose",
                            values: [{
                                name: "front-facing",
                                count: 754719,
                                disabled:false
                            }, {
                                name: "left-facing",
                                count: 499396,
                                disabled:false
                            }, {
                                name: "right-facing",
                                count: 155951,
                                disabled:false
                            }],
                            slug: "head-pose"
                        }, {
                            name: J,
                            values: [{
                                name: e,
                                count: 1731656,
                                disabled:false
                            }, {
                                name: m,
                                count: 945326,
                                disabled:false
                            }],
                            slug: J
                        }, {
                            name: K,
                            values: [{
                                name: g,
                                count: 2219396,
                                disabled:false
                            }, {
                                name: i,
                                count: 337222,
                                disabled:false
                            }, {
                                name: p,
                                count: 105086,
                                disabled:false
                            }, {
                                name: G,
                                count: 15272,
                                disabled:false
                            }, {
                                name: "infant",
                                count: 6,
                                disabled:false
                            }],
                            slug: K
                        }, {
                            name: "ethnicity",
                            values: [{
                                name: d,
                                count: 2070398,
                                disabled:false
                            }, {
                                name: s,
                                count: 221989,
                                disabled:false
                            }, {
                                name: "latino",
                                count: 204037,
                                disabled:false
                            }, {
                                name: "asian",
                                count: 180558,
                                disabled:false
                            }],
                            slug: "race"
                        }, {
                            name: "eye_color",
                            values: [{
                                name: a,
                                count: 2320887,
                                disabled:false
                            }, {
                                name: r,
                                count: 267906,
                                disabled:false
                            }, {
                                name: y,
                                count: 60434,
                                disabled:false
                            }, {
                                name: "green",
                                count: 27755,
                                disabled:false
                            }],
                            slug: "eyes"
                        }, {
                            name: "hair_color",
                            values: [{
                                name: a,
                                count: 2316465,
                                disabled:false
                            }, {
                                name: s,
                                count: 352715,
                                disabled:false
                            }, {
                                name: C,
                                count: 4432,
                                disabled:false
                            }, {
                                name: "gray",
                                count: 3370,
                                disabled:false
                            }],
                            slug: "hair"
                        }, {
                            name: "hair_length",
                            values: [{
                                name: j,
                                count: 1336937,
                                disabled:false
                            }, {
                                name: h,
                                count: 764526,
                                disabled:false
                            }, {
                                name: n,
                                count: 575519,
                                disabled:false
                            }],
                            slug: "hair-length"
                        }
                     */
