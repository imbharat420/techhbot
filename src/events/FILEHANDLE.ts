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
  async base64ToFile(base64: string, type: string, name: string, callback: any) {
    const location: string = this.filePath(type);
    const filename: string = this.ext(type, name);
    const path = `${location}/${filename}`;
    console.log('base64ToFile', path, filename, location, path);
    const base64Image = base64.split(';base64,').pop();
    if (!base64Image) {
      return console.log('base64Image is empty');
    }
    fs.mkdirSync(location, { recursive: true });
    fs.writeFile(path, base64Image, { encoding: 'base64' }, function (err) {
      if (err) return console.log('Error base64ToFile', err);
      callback(path);
    });
  }

  downloadAllFile(lists: string[], type: string, callback: any) {
    lists.forEach((url: string) => {
      const location: string = this.filePath(type);
      const name = url.split('/').pop();
      if (!name) return console.log('name is empty');
      const filename: string = this.ext(type, name[0]);
      const path = `${location}/${filename}`;
      console.log('downloadAllFile ---------', name, filename, path);
      return this.download(url, type, filename, callback);
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

  /**
   *
   * @param PATHOFFILE according to type of file
   * @returns PATH
   */

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
        return path.join(__dirname, '..', '/static/animated_images/');
      default:
        return path.join(__dirname, '..', '/static/unknown');
    }
  }

  /**
   *
   * @param EXTENSION  according to type of file type
   * @returns filename with extension
   */

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
