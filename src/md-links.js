import {
  routeExists,
  toAbsolutePath,
  isDirectory,
  isMD,
} from './index.js';

import extractMDFiles from './extractMDFiles.js';
import readMarkdownFiles from './readMarkdownFiles.js';
import extractLinks from './extractLinks.js';
import validateLinks from './validateLinks.js';
import getLinksStats from './getStats.js';
// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];

const mdLinks = (path /*,options*/) => new Promise((resolve, reject) => {
  let absolutePath = '';
  // Declarar ruta y verifica si existe
  const pathExists = routeExists(path);
  // Identifica si la ruta existe y si es relativa, la cambia a absoluta
  if (pathExists) {
    absolutePath = toAbsolutePath(path);
    console.log('Tu ruta absoluta:', absolutePath);
  }
  // Verificar si es directorio o MD: Se crea una constante arrayMDFiles para dos caminos dir o md.
  let arrayMDFiles = [];
  if (isDirectory(absolutePath)) {
    // Recibir ruta: Verificar si es un directorio. Si lo es, entrar y buscar md con recursividad
    arrayMDFiles = extractMDFiles(absolutePath);
  } else if (isMD(absolutePath)) {
    arrayMDFiles = isMD(absolutePath);
  }
  // Sobre ese array se aplica función que lee mds, Retorna dataMDArray (array de objetos)
  const dataMDArray = readMarkdownFiles(arrayMDFiles);
  // Sobre dataMDArray se aplica función extractMDFiles para extraer links. Retorna objectLinksArray
  const objectLinksArray = extractLinks(dataMDArray);
  validateLinks(objectLinksArray)
    .then((validatedLinks) => {
      console.log(39, 'LINKS VALIDADOS', validatedLinks);
      return getLinksStats(validatedLinks);
    })
    .then((linkStats) => {
      console.log(linkStats);
    })
    .catch((error) => {
      console.error('Ocurió un error al validar los enlaces:', error);
    });
  resolve(console.log('Links:', objectLinksArray));
  // hasta aquí sería SIN OPTIONS
  // a objectLinksArray se aplica validateLinks, devuelve prom a resolver en array de objs con links
  // LUEGO VIENE LO DE OPTIONS
  reject('La ruta no existe');
});

mdLinks(route);
export default mdLinks;
