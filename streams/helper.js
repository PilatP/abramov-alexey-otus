import fs from 'fs';
import path from 'path';

export const cleanup = async (dir) => {
  if (!fs.existsSync(dir)) await fs.promises.mkdir(dir);
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    await fs.promises.unlink(path.join(dir, file));
  }
};
