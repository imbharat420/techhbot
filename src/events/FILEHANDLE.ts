import OPERATIONS from './OPERATIONS';
import request from 'request';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// const __dirname = process.cwd();

class FILEHANDLE {
  public downloadFile(url: any, type: string, name: string, callback: any) {
    console.log(url, type, name);
    const location: string = this.filePath(type);
    const filename: string = this.ext(type, name);
    const path = `${location}/${filename}`;
    return this.download(url, location, filename, async () => {
      return callback(filename, path);
    });
  }
  async base64ToImg(base64: string, type: string, name: string, callback: any) {
    const location: string = this.filePath(type);
    const filename: string = this.ext(type, name);
    const path = `${location}/${filename}`;
    console.log('base64ToImg', path, filename, location, path);
    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    // const buffer = Buffer.from(base64, 'base64');
    const base64Image = base64.split(';base64,').pop();
    if (!base64Image) {
      return console.log('base64Image is empty');
    }
    fs.mkdirSync(location, { recursive: true });
    fs.writeFile(path, base64Image, { encoding: 'base64' }, function (err) {
      callback(path);
    });
    // fs.writeFile(
    //   path,
    //   bitmap,
    //   {
    //     encoding: 'utf8',
    //   },
    //   (err: any) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log('base64 --------------------------', path);
    //     return callback(path);
    //   },
    // );
  }

  // downloadAllFile(list:, 'video', (file: string, path: string) => {
  //   console.log('downloadFile !findAnime', file, path);

  // });

  download(uri: any, location: string, filename: string, callback: any) {
    fs.mkdirSync(location, { recursive: true });
    const path = `${location}/${filename}`;
    request(uri).pipe(fs.createWriteStream(path)).on('close', callback);
  }

  checkExt(fname: string) {
    return fname.slice(((fname.lastIndexOf('.') - 1) >>> 0) + 2);
  }

  filePath(type: string) {
    switch (type) {
      case 'photo':
      case 'sticker':
        return path.join(__dirname, '..', '/static/images/');
      case 'video':
        return path.join(__dirname, '..', '/static/video');
      case 'audio':
        return path.join(__dirname, '..', '/static/audio');
      case 'file':
        return path.join(__dirname, '..', '/static/file');
      case 'animated_image':
        return __dirname + '/files/images/';
      default:
        return './files/unknown';
    }
  }

  ext(type: string, name: string) {
    switch (type) {
      case 'photo':
      case 'sticker':
        return name + '.png';
      case 'video':
      case 'audio':
      case 'file':
        return name;
      case 'animated_image':
        return name + '.gif';
      default:
        return name;
    }
  }
}

export default FILEHANDLE;
function callback(filename: string, path: string) {
  throw new Error('Function not implemented.');
}
