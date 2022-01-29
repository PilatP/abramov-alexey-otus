import { readFile, writeFile } from 'fs/promises';

const numbers = (
  await readFile('./data/random-file', { encoding: 'utf8' })
).split('\n');
numbers.sort((a, b) => +a - +b);

await writeFile('./data/random-file-sorted', numbers.join('\n'), {
  encoding: 'utf8',
});
