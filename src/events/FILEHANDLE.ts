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
