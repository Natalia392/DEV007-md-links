import {
  routeExists,
  toAbsolutePath,
  isMD,
  isDirectory,
  truncateText,
} from '../src/index.js';

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
