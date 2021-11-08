import { Writable } from 'stream';
import fs from 'fs';
import { v1 as uuid } from 'uuid';

class FileStream extends Writable {
  _size = 0;
  _data = [];
  constructor(tmpDir, numberDelimiter, maxFileSize) {
    super();
    this.tmpDir = tmpDir;
    this.numberDelimiter = numberDelimiter;
    this.maxFileSize = maxFileSize;
  }
  _write(chunk, encoding, callback) {
    this._size += chunk.length;
    this._data.push(chunk);
    if (this._size >= this.maxFileSize) {
      const filePath = `${this.tmpDir}/${uuid()}`;
      const data = Buffer.concat(this._data)
        .toString('utf8')
        .split(this.numberDelimiter);
      data.sort((a, b) => +a - +b);
      fs.writeFile(
        filePath,
        Buffer.from(data.join(this.numberDelimiter, 'utf8')),
        callback
      );
      this._data = [];
      this._size = 0;
    } else callback();
  }
}

export { FileStream };
