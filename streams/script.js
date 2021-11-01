import { Transform } from 'stream';
import fs from 'fs';
import path, { delimiter } from 'path';
import { FileStream } from './FileStream.js';
import { v1 as uuid } from 'uuid';
import { performance } from 'perf_hooks';

const populateFileWithRandomNumbers = (maxSize = 100, done) => {
  const outputStream = fs.createWriteStream('./data/random-file');

  outputStream.on('close', () => {
    done();
  });
  let index = 0;
  while (true) {
    index++;
    const number = `${Math.floor(Math.random() * 10000)}${numberDelimiter}`;
    outputStream.write(number, (err) => {
      if (err) console.error(err);
    });
    if (
      index % 1000 === 0 &&
      Math.floor(outputStream.writableLength / 1024 / 1024) >= maxSize
    ) {
      console.log(
        `A file with random numbers is populated, size: ${outputStream.writableLength} bytes`
      );
      outputStream.close();
      break;
    }
  }
};

const numberDelimiter = '\r\n';
const tmpDir = './data/tmp';
const cleanup = async (dir) => {
  if (!fs.existsSync(dir)) await fs.promises.mkdir(dir);
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    await fs.promises.unlink(path.join(dir, file));
  }
};

const splitFile = (filePath, maxFileSize, done) => {
  const readStream = fs.createReadStream(filePath);
  const fileStream = new FileStream(tmpDir, numberDelimiter, maxFileSize);
  readStream.pipe(fileStream).on('close', () => {
    console.log('The file is splitted');
    done();
  });
};

const mergeSortedFilesFromDir = (currentDir) => {
  const tStart = performance.now();
  console.log('The merge is started');
  fs.readdir(currentDir, (err, files) => {
    if (err) throw new Error(err);
    const outputStream = fs.createWriteStream(path.join(tmpDir, 'output'));
    const streams = [];
    for (const file of files) {
      if (file === 'output') continue;

      const readStream = fs.createReadStream(path.join(currentDir, file));
      streams.push(readStream);
    }
    let streamsData = [];
    let finishedStreams = 0;
    for (let index = 0; index < streams.length; index++) {
      let stream = streams[index];
      stream
        .on('data', (chunk) => {
          stream.pause();
          const tmpStream =
            streamsData.find((s) => s.stream === stream)?.values || [];
          streamsData.push({
            values: [
              ...tmpStream,
              ...chunk.toString('utf8').split(numberDelimiter),
            ],
            stream,
          });
          if (streamsData.length === streams.length) {
            streamsData = mergeChunks(streamsData, outputStream);
          }
        })
        .on('end', () => {
          finishedStreams++;
          // console.log(`${stream.path} is completed`, finishedStreams);
          const _streamData = streamsData.find((s) => s.stream.isPaused());
          if (_streamData) _streamData.stream.resume();

          if (streamsData.every((s) => !s.stream.isPaused())) {
            streamsData = mergeChunks(streamsData, outputStream);
            const rest =
              streamsData.find((s) => s.values.length > 0)?.values || [];
            for (const n of rest) {
              outputStream.write(`${n}${numberDelimiter}`);
            }
          }
          if (finishedStreams === streams.length) {
            const tEnd = performance.now();
            console.log(
              `The merge is finished with ${(tEnd - tStart)
                .toFixed(3)
                .toString()}ms`
            );
          }
        });
    }
  });
};
const mergeChunks = (streamsData, outputStream) => {
  while (true) {
    const streamWithMinValue = streamsData.reduce((prev, curr) =>
      +prev.values[0] < +curr.values[0] ? prev : curr
    );
    const minValue = streamWithMinValue.values.shift();
    outputStream.write(`${minValue}${numberDelimiter}`);
    if (streamWithMinValue.values.length === 0) {
      streamsData = streamsData.filter(
        (s) => s.values !== streamWithMinValue.values
      );
      streamWithMinValue.stream.resume();
      break;
    }
  }
  return streamsData;
};

// clean the tmp dir up
await cleanup(tmpDir);
// populate file with random data & split the file up
// populateFileWithRandomNumbers(100);
splitFile('./data/random-file', 10 * 1024 * 1024, () => {
  // merge files into the output file
  mergeSortedFilesFromDir(tmpDir);
});
