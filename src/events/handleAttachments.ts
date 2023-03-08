import DeepNude from '../features/deepnude';
import { UploadImg, RenderImg } from '../features/filterImg';
import FindAnime from '../features/findAnime';
import MusicHumming from '../features/music_humming';
import EVENTS from './EVENTS';
import OPERATIONS from './OPERATIONS';
const op: OPERATIONS = new OPERATIONS();

const filters = [
  {
    id: '520fdb6592237be077cf99eb',
    name: 'sketch',
  },
  {
    id: '520a50c892237b823ae31aaf',
    name: 'poster',
  },
  {
    id: '520907ee92237baf21e766e6',
    name: 'wanted',
  },
  {
    id: '520907ee92237baf21e766e6',
    name: 'wanted',
  },
  {
    id: '520fb27e92237bdd77b09ebe',
    name: '3d',
  },
  {
    id: '520fa25792237bdc776664ea',
    name: 'locket',
  },
  {
    id: '53a010df7115cf964e8b4567',
    name: 'forever',
  },
];

const handleAttachments = async (event: any, customListen: EVENTS) => {
  console.log('handleMessageReply', event);
  const body: string = event.body;
  const { attachments } = event.messageReply;
  console.log(attachments);
  try {
    if (body.startsWith('!findSong')) {
      const { url, type, filename } = attachments[0];
      op.downloadFile(url, type, filename, (file: string, path: string) => {
        MusicHumming(path).then((res: any) => {
          console.log(res);
          customListen.send(res, event);
        });
      });
    }
    if (body.startsWith('!uploadImg')) {
      const { url, type, filename } = attachments[0];
      console.log(url, type, filename);
      op.downloadFile(url, type, filename, (file: string, path: string) => {
        console.log('downloadFile !uploadImg', file, path);
        UploadImg(path)
          .then((id: any) => {
            console.log('!uploadImg...', id);
            customListen.send('Reply to my 👇 message with filter ID', event);
            customListen.send(id, event);
          })
          .catch((err: any) => {
            console.log(err);
            customListen.sendReply('Sorry the message is empty 😢 because of error', event);
          });
      });
    }

    if (body.startsWith('!renderImg')) {
      const clean_body = op.clean_cmd('!renderImg', body);
      const data = filters.find((filter) => clean_body.includes(filter.name));
      const id = event.messageReply.body;
      console.log(id);
      if (!data) {
        customListen.sorry('sorry filter not found', event);
      }
      RenderImg(id, data?.id ?? filters[0].id)
        .then((res: any) => {
          console.log(res);
          customListen.sendByURL(res, event);
        })
        .catch((err: any) => {
          console.log(err);
          customListen.sendReply('Sorry the message is empty 😢 because of error', event);
        });
    }

    if (body.startsWith('!undress')) {
      const { url, type, filename } = attachments[0];
      console.log(url, type, filename);
      op.downloadFile(url, type, filename, async (file: string, path: string) => {
        console.log('downloadFile !undress', file, path);
        const base64 = await DeepNude(path);
        if (!base64) {
          customListen.send(event, 'Sorry the message is empty 😢 because of error');
          return;
        }
        console.log('!undress ==========================', base64.length);
        op.base64ToImg(base64, 'photo', filename, (path: string) => {
          console.log('!undress... 2');
          customListen.sendAttachment(path, event);
        });
      });
    }

    if (body.startsWith('!findAnime')) {
      const { url, type, filename } = attachments[0];
      console.log(url, type, filename);
      op.downloadFile(url, type, filename, async (file: string, path: string) => {
        console.log('downloadFile !findAnime', file, path);
        const animesList = await FindAnime(path);

        if (!animesList.length || !animesList[0].video) {
          customListen.sendReply(event, 'Sorry the message is empty 😢 because of error');
          return;
        }

        // op.downloadAllFile(animesList, 'video', (file: string, path: string) => {
        //   console.log('downloadFile !findAnime', file, path);
        //   customListen.sendAttachment(path, event);
        // });

        customListen.sendAttachment(animesList, event);
      });
    }
  } catch (err) {
    console.log(err);
    // customListen.sorry(event, 'Sorry the message is empty 😢 because of error');
  }
};

export default handleAttachments;
