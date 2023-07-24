import {
  routeExists,
  toAbsolutePath,
} from './index.js';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
// const route = process.argv[2];

const mdLinks = (path /*,options*/) => {
  return new Promise((resolve, reject) => {
    // Declarar ruta
    const pathExists = routeExists(path);
    // Identifica si la ruta existe y si es relativa, la cambia a absoluta
    if (pathExists) {
      myPath = toAbsolutePath(path);
    }
    // Se crea una constante arrayMDFiles para dos caminos dir o md.
    // Recibir ruta: verificar si es un archivo md. Si lo es, guardarlo en un array
    // Recibir ruta: Verificar si es un directorio. Si lo es, entrar y buscar md con recursividad
    // Sobre esa constante se aplica función que lee mds, Retorna dataMDArray (array de objetos)
    // Sobre dataMDArray se aplica función readMDFiles para extraer links. Retorna objectLinksArray
    // Sobre objectLinksArray se aplica validateLinks, devuelve promesa que se resuelve en array de objetos con links
    // LUEGO VIENE LO DE OPTIONS
    reject('La ruta no existe');
  });
};

export default mdLinks;
