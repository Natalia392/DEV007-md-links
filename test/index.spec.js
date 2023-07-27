import {
  routeExists,
  toAbsolutePath,
  isMD,
  isDirectory,
} from '../src/index.js';

describe('routeExists', () => {
  it('Should return true for existingPath', () => {
    const existingPath = 'PRUEBA';
    expect(routeExists(existingPath)).toBe(true);
  });
  it('Should return false for nonExistingPath', () => {
    const nonExistingPath = 'FalsePath';
    expect(routeExists(nonExistingPath)).toBe(false);
  });
});

describe('toAbsolutePath', () => {
  it('Should turn a relative path into an absolute path', () => {
    const relativePath = 'PRUEBA';
    const expectedResult = toAbsolutePath(relativePath);
    expect(toAbsolutePath(relativePath)).toBe(expectedResult);
  });
  it('Should return the same path, if the route is already absolute', () => {
    const absolutePath = 'C:/Users/ntorr/Desktop/proyectos-laboratoria/DEV007-md-links/PRUEBA';
    expect(toAbsolutePath(absolutePath)).toBe(absolutePath);
  });
});

describe('isMD', () => {
  it('Should return an array with the file if the route is an md file', () => {
    const mdFile = 'md.md';
    expect(isMD(mdFile)).toEqual(['md.md']);
  });
  it('Should return an empty array if the route is not an md file', () => {
    const notMD = 'hola.js';
    expect(isMD(notMD)).toEqual([]);
  });
});

describe('isDirectory', () => {
  it('Should return true for a path that leads to a directory', () => {
    const aDirectory = 'PRUEBA';
    expect(isDirectory(aDirectory)).toBe(true);
  });
  it('Should return false for a path that does not lead to a directory', () => {
    const notDirectory = 'PRUEBA/prueba2/prueba3/md.md';
    expect(isDirectory(notDirectory)).toBe(false);
  });
});
