import fs from 'fs';
import OPERATIONS from '../events/OPERATIONS';
const op: OPERATIONS = new OPERATIONS();

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const Pointer = (cb: any) => {
  const number = `${random(0, 710)}`;
  const url = `https://pointerpointer.com/images/${number}.jpg`;

  op.downloadFile(url, 'photo', number, (filename: string, path: string) => {
    cb(path);
  });
};

export default Pointer;

/*
BR 527
TR 0
TL 402
BL 462
*/
