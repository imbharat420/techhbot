import { UploadImg, RenderImg } from '../features/filterImg';
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

  // if (attachments[0].filename === 'audio') {
  //   customListen.send('Only Audio type needed for find song', event);

  //   // attachments.forEach(async (attachment: any) => {
  //   // console.log(attachment);
  //   const { url, type, filename } = attachments[0];
  //   op.downloadFile(url, type, filename, (file: string, path: string) => {
  //     MusicHumming(path).then((res: any) => {
  //       console.log(res);
  //       customListen.send(res, event);
  //     });
  //   });
  // });
  // }

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
          customListen.send('Sorry the message is empty 😢 because of error', event);
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
        customListen.send('Sorry the message is empty 😢 because of error', event);
      });
  }
};

export default handleAttachments;
