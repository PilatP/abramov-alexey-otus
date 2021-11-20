import { numberDelimiter, tmpDir } from './config.js';
import fs from 'fs';
import { cleanup } from './helper.js';
import { once } from 'events';

const populateFileWithRandomNumbers = async (maxSize = 100, done) => {
  const outputStream = fs.createWriteStream('./data/random-file');

  outputStream.on('close', () => {
    if (done) done();
  });
  let index = 0;
  while (true) {
    index++;
    const number = `${Math.floor(Math.random() * 10000)}${numberDelimiter}`;
    const result = outputStream.write(number);
    if (!result) {
      await once(outputStream, 'drain');
    }
    if (
      index % 1000 === 0 &&
      Math.floor(outputStream.bytesWritten / 1024 / 1024) >= maxSize
    ) {
      console.log(
        `A file with random numbers is populated, size: ${outputStream.bytesWritten} bytes`
      );
      break;
    }
  }
};

await cleanup(tmpDir);

await populateFileWithRandomNumbers(100);
