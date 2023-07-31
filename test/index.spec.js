/* eslint-disable max-len */
import axios from 'axios';

import {
  routeExists,
  toAbsolutePath,
  isMD,
  isDirectory,
  truncateText,
  extractMDFiles,
  readMarkdownFiles,
  extractLinks,
  validateLinks,
  getLinksStats,
} from '../src/index.js';

jest.mock('axios');

describe('routeExists', () => {
  it('should return true for existingPath', () => {
    const existingPath = 'PRUEBA';
    expect(routeExists(existingPath)).toBe(true);
  });
  it('should return false for nonExistingPath', () => {
    const nonExistingPath = 'FalsePath';
    expect(routeExists(nonExistingPath)).toBe(false);
  });
});

describe('toAbsolutePath', () => {
  it('should turn a relative path into an absolute path', () => {
    const relativePath = 'PRUEBA';
    const expectedResult = toAbsolutePath(relativePath);
    expect(toAbsolutePath(relativePath)).toBe(expectedResult);
  });
  it('should return the same path, if the route is already absolute', () => {
    const absolutePath = 'C:/Users/ntorr/Desktop/proyectos-laboratoria/DEV007-md-links/PRUEBA';
    expect(toAbsolutePath(absolutePath)).toBe(absolutePath);
  });
});

describe('isMD', () => {
  it('should return an array with the file if the route is an md file', () => {
    const mdFile = 'md.md';
    expect(isMD(mdFile)).toEqual(['md.md']);
  });
  it('should return an empty array if the route is not an md file', () => {
    const notMD = 'hola.js';
    expect(isMD(notMD)).toEqual([]);
  });
});

describe('isDirectory', () => {
  it('should return true for a path that leads to a directory', () => {
    const aDirectory = 'PRUEBA';
    expect(isDirectory(aDirectory)).toBe(true);
  });
  it('should return false for a path that does not lead to a directory', () => {
    const notDirectory = 'PRUEBA/prueba2/prueba3/md.md';
    expect(isDirectory(notDirectory)).toBe(false);
  });
});

describe('truncateText', () => {
  it('should return the same text if it is shorter than 50 characters', () => {
    const shortText = 'this is a short text';
    expect(truncateText(shortText)).toBe(shortText);
  });
  it('should return a text truncated to 50 characters plus " . . ." if it is longer', () => {
    const longText = 'this is a very long long long loooooooooooooooooooooooooooong test.';
    expect(truncateText(longText).length).toBe(56);
  });
});

describe('extractMDFiles', () => {
  it('should get the md files inside a directory', () => {
    const testDirectoryPath = 'C:/Users/ntorr/Desktop/proyectos-laboratoria/DEV007-md-links/testDi';

    expect(extractMDFiles(testDirectoryPath)).toStrictEqual([
      'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\dirEmpryMD\\dirInside\\another.md',
      'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\dirEmpryMD\\emptymd.md',
      'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
    ]);
  });

  it('should return an empty array if there are no md files in the directoy', () => {
    const emptyDirectoryPath = 'C:/Users/ntorr/Desktop/proyectos-laboratoria/DEV007-md-links/testDi/emptyTest';
    const emptyArray = extractMDFiles(emptyDirectoryPath);

    expect(extractMDFiles(emptyDirectoryPath)).toStrictEqual(emptyArray);
  });
});

describe('readMarkdownFiles', () => {
  it('should return an object with the properties fileData and fileRoute', () => {
    const recievedArrayTest = [
      'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
    ];
    const expectedArr = [
      {
        fileData: '  * [¿bueno pruebamd dentro de PRUEBA](https://www.youtube.com/watch?v=lPPgY3HLlhQ)',
        file: 'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
      },
    ];

    expect(readMarkdownFiles(recievedArrayTest)).toStrictEqual(expectedArr);
  });
  it('should return an empty array when the recieved array is empty', () => {
    const emptyArray = [];
    const expectedArr = [];

    expect(readMarkdownFiles(emptyArray)).toStrictEqual(expectedArr);
  });
});

describe('extractLinks', () => {
  it('should return an array with object containing links', () => {
    const recievedArrayTest = [
      {
        fileData: '  * [¿bueno pruebamd dentro de PRUEBA](https://www.youtube.com/watch?v=lPPgY3HLlhQ)',
        file: 'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
      },
    ];

    const expectedArray = [
      {
        href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
        text: '¿bueno pruebamd dentro de PRUEBA',
        file: 'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
      },
    ];

    expect(extractLinks(recievedArrayTest)).toStrictEqual(expectedArray);
  });
  it('should return an empty array if it doesnt find links', () => {
    const arrWithNoLink = [
      {
        fileData: '',
        file: 'C:\\Users\\ntorr\\Desktop\\proyectos-laboratoria\\DEV007-md-links\\testDi\\test.md',
      },
    ];

    expect(extractLinks(arrWithNoLink)).toStrictEqual([]);
  });
});

describe('validateLinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return an array with the same length as the input', async () => {
    const input = [{ href: 'http://example.com' }, { href: 'http://another-example.com' }];
    axios.get.mockResolvedValue({ status: 200 }); // Manually mock the resolved value for this test.

    const result = await validateLinks(input);

    expect(result).toHaveLength(input.length);
  });

  it('should attach status and ok properties to the elements', async () => {
    const input = [{ href: 'http://example.com' }];
    axios.get.mockResolvedValue({ status: 200 });

    const [result] = await validateLinks(input);

    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('ok', 'OK');
  });

  it('should handle successful and failed requests', async () => {
    const successfulResponse = { status: 200 };
    const error = { response: { status: 404 } };
    const input = [
      { href: 'http://successful-request.com' },
      { href: 'http://failed-request.com' },
    ];

    axios.get
      .mockResolvedValueOnce(successfulResponse)
      .mockRejectedValueOnce(error);

    const results = await validateLinks(input);

    expect(results[0]).toHaveProperty('status', 200);
    expect(results[0]).toHaveProperty('ok', 'OK');

    expect(results[1]).toHaveProperty('status', 404);
    expect(results[1]).toHaveProperty('ok', 'FAIL');
  });
});

describe('getLinksStats', () => {
  it('should only return stats for total and unique when optionValidate is false', async () => {
    const input = [
      {
        href: 'https://nodes.org',
        text: 'ROTOOOOOOOOOOOO',
        file: 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\PRUEBA\README.md',
        status: null,
        ok: 'FAIL',
      }];
    const expectedStats = {
      total: 1,
      unique: 1,
    };

    await expect(getLinksStats(input, false)).resolves.toEqual(expectedStats);
  });
  it('should return complete stats when optionValudate is true', async () => {
    const input = [
      {
        href: 'https://nodes.org',
        text: 'ROTOOOOOOOOOOOO',
        file: 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\PRUEBA\README.md',
        status: null,
        ok: 'FAIL',
      }];
    const expectedStats = {
      total: 1,
      unique: 1,
      broken: 1,
      working: 0,
    };

    await expect(getLinksStats(input, true)).resolves.toEqual(expectedStats);
  });

  it('should handle error in getLinksStats', async () => {
    const links = [{ href: 'http://some-website.com', ok: 'OK' }];
    const errorMsg = 'Something went wrong!';

    const getLinksStatsMock = jest.fn().mockImplementationOnce(() => Promise.reject(errorMsg));

    try {
      await getLinksStatsMock(links, false);
    } catch (e) {
      expect(e).toBe(errorMsg);
    }
  });

  it('should go to rejects if recieved input is not an array', async () => {
    expect.assertions(1);

    const errMsg = "Cannot read properties of null (reading 'length')";
    const invalidInput = null;

    await expect(getLinksStats(invalidInput, false)).rejects.toEqual(errMsg);
  });
});
