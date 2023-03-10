//https://audio.api.speechify.dev/generateAudioFiles
import axios, { AxiosRequestConfig } from 'axios';
import errorHandler from '../utils/errorHandler';
import UserAgent from 'user-agents';
function getVoiceParams(type: string) {
  switch (type) {
    case 'teen':
      return {
        name: 'Snoop',
        engine: 'resemble',
        languageCode: 'en-US',
      };
    case 'adult':
      return {
        name: 'Matthew',
        engine: 'neural',
        languageCode: 'en-US',
      };
    case 'women':
      return {
        name: 'Gwyneth',
        engine: 'resemble',
        languageCode: 'en',
      };
    case 'narrator':
      return {
        name: 'Narrator',
        engine: 'resemble',
        languageCode: 'en',
      };
      console.log('default');
    default:
      return {
        name: 'Gwyneth',
        engine: 'resemble',
        languageCode: 'en',
      };
  }
}

const TextAudio = async (body: string, type: string) => {
  const userAgent = new UserAgent({ deviceCategory: 'mobile' });

  try {
    console.log('TextAudio', body, type);
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://audio.api.speechify.dev/generateAudioFiles',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent.toString(),
      },
      data: {
        audioFormat: 'mp3', //ogg
        paragraphChunks: [body],
        voiceParams: getVoiceParams(type),
      },
    };
    const { data } = await axios(config);
    return data['audioStream'];
  } catch (err) {
    return errorHandler(err);
  }
};

export default TextAudio;

/*
{
    "audioFormat": "ogg",
    "paragraphChunks": [
        "Speechify is the #1 text-to-speech program that turns any written text into spoken words in natural-sounding language. We have both free and premium subscriptions and over 150,000 5-star reviews. You can use our text editor, our Google Chrome Extension, our iOS app, our Mac Desktop app, or our Android app. Speechify users are students, working professionals, and people who like speed-listening"
    ],
    "voiceParams": {
        "name": "Snoop",
        "engine": "resemble",
        "languageCode": "en-US"
    }
}

{
    "audioFormat": "ogg",
    "paragraphChunks": [
        "Hello sir"
    ],
    "voiceParams": {
        "name": "Matthew",
        "engine": "neural",
        "languageCode": "en-US"
    }
}

{
    "audioFormat": "ogg",
    "paragraphChunks": [
        "Speechify is the #1 text-to-speech program that turns any written text into spoken words in natural-sounding language"
    ],
    "voiceParams": {
        "name": "Gwyneth",
        "engine": "resemble",
        "languageCode": "en"
    }
}


{
    "audioFormat": "ogg",
    "paragraphChunks": [
        "Speechify is the #1 text-to-speech program that turns any written text into spoken words in natural-sounding language"
    ],
    "voiceParams": {
        "name": "Narrator",
        "engine": "resemble",
        "languageCode": "en-US"
    }
}


*/
