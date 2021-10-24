import { tree } from './getTree';
import { jest } from '@jest/globals';
import fs from 'fs/promises';

// jest.mock('fs', () => ({ readdir: (dir) => [{}] } ));
jest.spyOn(fs, 'readdir');

// jest.mock('fs/promises', () => ({ readdir: jest.fn() }));
describe('tree', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it.each`
    element      | result
    ${undefined} | ${'InvalidArgumentException'}
    ${null}      | ${'InvalidArgumentException'}
    ${''}        | ${'InvalidArgumentException'}
  `('should throw exception if argument is empty', () => {
    expect(() => tree()).rejects.toThrow('InvalidArgumentException');
  });

  it('should return files only', async () => {
    fs.readdir.mockReturnValue([
      { name: 'file1.ext', isFile: jest.fn(() => true) },
      { name: 'file2.ext', isFile: jest.fn(() => true) },
      { name: 'file3.ext', isFile: jest.fn(() => true) },
    ]);
    const pathWithFilesOnly = '/folder/subfolder';
    const { files, folders } = await tree(pathWithFilesOnly);

    expect(files).toHaveLength(3);
    expect(folders).toHaveLength(0);
  });

  it('should return folders only', async () => {
    fs.readdir = jest
      .fn()
      .mockReturnValueOnce([
        {
          name: 'folder1',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
      ])
      .mockReturnValueOnce([
        {
          name: 'folder1_subfolder1',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
        {
          name: 'folder1_subfolder2',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
      ])
      .mockReturnValueOnce([
        {
          name: 'folder1_subfolder1_subfolder4',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
      ]);
    const pathWithFoldersOnly = '/folder/subfolder';

    const { files, folders } = await tree(pathWithFoldersOnly);

    expect(files).toHaveLength(0);
    expect(folders).toHaveLength(4);
  });

  it('should return an empty tree', async () => {
    fs.readdir.mockReturnValueOnce = [];

    const pathWithEmptyFolder = '/folder/subfolder';

    const { files, folders } = await tree(pathWithEmptyFolder);

    expect(files).toHaveLength(0);
    expect(folders).toHaveLength(0);
  });

  it('should return files and folders', async () => {
    fs.readdir = jest
      .fn()
      .mockReturnValueOnce([
        {
          name: 'folder1',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
      ])
      .mockReturnValueOnce([
        {
          name: 'folder1_file1.ext',
          isFile: jest.fn(() => true),
          isDirectory: jest.fn(() => false),
        },
        {
          name: 'folder2',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
      ])
      .mockReturnValueOnce([
        {
          name: 'folder3',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
        {
          name: 'folder4',
          isFile: jest.fn(() => false),
          isDirectory: jest.fn(() => true),
        },
        {
          name: 'folder1_folder2_file1.ext',
          isFile: jest.fn(() => true),
          isDirectory: jest.fn(() => false),
        },
      ]);
    const pathWithFoldersAndFiles = '/folder/subfolder';

    const { files, folders } = await tree(pathWithFoldersAndFiles);

    expect(files).toHaveLength(2);
    expect(folders).toHaveLength(4);
  });
});
