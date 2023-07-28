import extractMDFiles from '../src/extractMDFiles.js';

describe('extractMDFiles', () => {
  it('should get the md files inside a directory', () => {
    const testDirectoryPath = 'C:/Users/ntorr/Desktop/proyectos-laboratoria/DEV007-md-links/PRUEBA';
    const mdFilesInTestDirectory = extractMDFiles(testDirectoryPath);
    expect(mdFilesInTestDirectory).toStrictEqual(extractMDFiles(testDirectoryPath));
  });
});
