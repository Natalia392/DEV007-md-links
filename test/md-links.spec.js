import mdLinks from '../src/md-links.js';

describe('mdLinks', () => {
  it('Should reject the promise when the path does not exist', () => {
    return mdLinks('redme.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });
});
