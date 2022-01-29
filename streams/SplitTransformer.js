import { Transform } from 'stream';
import fs from 'fs';
import { v1 as uuid } from 'uuid';

export class SplitTransformer extends Transform {
  _size = 0;
  _data = [];
  constructor(tmpDir, numberDelimiter, maxFileSize) {
    super();
    this.tmpDir = tmpDir;
    this.numberDelimiter = numberDelimiter;
    this.maxFileSize = maxFileSize;
  }

  async _transform(chunk, encoding, done) {
    if (this._size + chunk.length >= this.maxFileSize) {
      const lastDelimiterIndex = chunk.lastIndexOf(this.numberDelimiter);
      let restChunk;
      if (lastDelimiterIndex !== chunk.length - 1) {
        const validChunk = chunk.slice(0, lastDelimiterIndex + 1);
        this._data.push(validChunk);
        restChunk = chunk.slice(lastDelimiterIndex + 1);
      }

      await this.sortAndWriteFile(this._data);
      this._data = restChunk ? [restChunk] : [];
      this._size = 0;
    } else {
      this._size += chunk.length;
      this._data.push(chunk);
    }
    done();
  }

  async _flush(done) {
    if (this._data && this._data.length)
      await this.sortAndWriteFile(this._data);
    done();
  }

  async sortAndWriteFile(buffers) {
    const filePath = `${this.tmpDir}/${uuid()}`;
    const data = Buffer.concat(buffers)
      .toString('utf8')
      .split(this.numberDelimiter);
    data.sort((a, b) => +a - +b);
    // if (data[data.length - 1] === '') data.pop();
    await fs.promises.writeFile(
      filePath,
      Buffer.from(
        data.filter((d) => d !== '').join(this.numberDelimiter, 'utf8')
      )
    );
  }
}
