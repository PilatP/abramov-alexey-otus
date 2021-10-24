import path from 'path';
import fs from 'fs/promises';

export const tree = async (currentFolder) => {
  if (!currentFolder) throw Error('InvalidArgumentException');

  return await processFolder(currentFolder);
};

const processFolder = async (currentFolder, files = [], folders = []) => {
  const folderContent = await fs.readdir(currentFolder, {
    withFileTypes: true,
  });

  if (!folderContent || !folderContent.length) return { files, folders };

  for (let index = 0; index < folderContent.length; index++) {
    const item = folderContent[index];
    const itemPath = path.join(currentFolder, item.name);
    if (item.isFile()) files.push(itemPath);
    else if (item.isDirectory()) {
      folders.push(itemPath);
      await processFolder(itemPath, files, folders);
    }
  }

  return { files, folders };
};

console.log(await tree(process.argv[2]));
