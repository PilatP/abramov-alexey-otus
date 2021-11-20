import fs from 'fs';
import path from 'path';
import { SplitTransformer } from './SplitTransformer.js';
import { performance } from 'perf_hooks';
import { numberDelimiter, tmpDir } from './config.js';
import { cleanup } from './helper.js';
import { once } from 'events';

const splitFile = (filePath, maxFileSize, done) => {
  const readStream = fs.createReadStream(filePath);
  const splitTransformer = new SplitTransformer(
    tmpDir,
    numberDelimiter,
    maxFileSize
  );
  readStream.pipe(splitTransformer).on('end', () => {
    console.log('The file is split');
    if (done) done();
  });
};

const mergeSortedFilesFromDir = async (currentDir) => {
  const merge = async (isEnd) => {
    while (true) {
      const streamWithMinValue = streamsData
        .filter((sd) => sd.data.length > 0)
        .reduce((prev, curr) => (+prev.data[0] < +curr.data[0] ? prev : curr), {
          data: [],
        });
      const minValue = streamWithMinValue.data.shift();
      const result = outputStream.write(`${minValue}${numberDelimiter}`);
      if (!result) {
        await once(outputStream, 'drain');
      }
      if (isEnd && streamsData.every((sd) => sd.data.length === 0)) {
        break;
      } else if (streamWithMinValue.data.length === 0 && !isEnd) {
        streamWithMinValue.stream.resume();
        break;
      }
    }
  };

  const tStart = performance.now();
  console.log('The merge is started');
  const files = (await fs.promises.readdir(currentDir)).filter(
    (file) => file !== 'output'
  );
  const outputStream = fs.createWriteStream(path.join(tmpDir, 'output'));
  let streamsData = [];
  let filesToProcess = files.length;
  files.forEach((file) => {
    const stream = fs.createReadStream(path.join(currentDir, file), {
      objectMode: true,
    });
    stream.on('data', async (chunk) => {
      stream.pause();
      const sd = streamsData.find((s) => s.stream === stream);
      if (sd) {
        const buf = sd.invalidData.length
          ? Buffer.concat([sd.invalidData, chunk])
          : chunk;
        const lastDelimiterIndex = buf.lastIndexOf(numberDelimiter);
        sd.data = buf
          .slice(0, lastDelimiterIndex)
          .toString('utf8')
          .split(numberDelimiter);
        sd.invalidData = buf.slice(lastDelimiterIndex + 1);
      } else {
        const lastDelimiterIndex = chunk.lastIndexOf(numberDelimiter);
        streamsData.push({
          data: chunk
            .slice(0, lastDelimiterIndex)
            .toString('utf8')
            .split(numberDelimiter),
          stream,
          invalidData: chunk.slice(lastDelimiterIndex + 1),
        });
      }
      if (streamsData.length === filesToProcess) {
        await merge();
      }
    });
    stream.on('end', async () => {
      const completedStreamData = streamsData.find(
        (sd) => sd.stream === stream
      );
      if (completedStreamData && completedStreamData.invalidData.length > 0) {
        completedStreamData.data.push(
          ...completedStreamData.invalidData
            .toString('utf8')
            .split(numberDelimiter)
        );
        completedSD.invalidData = [];
      }

      await merge(true);
    });
  });
};

// clean the tmp dir up
await cleanup(tmpDir);

splitFile('./data/random-file', 2.5 * 1024 * 1024, async () => {
  // merge files into the output file
  await mergeSortedFilesFromDir(tmpDir);
});
