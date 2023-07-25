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

// const route = process.argv[2];

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let absolutePath = '';
  // Declarar ruta y verifica si existe
  const pathExists = routeExists(path);
  // Identifica si la ruta existe y si es relativa, la cambia a absoluta
  if (pathExists) {
    absolutePath = toAbsolutePath(path);
  } else {
    console.log('Tu ruta no existe');
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
  // Un if para validar si está la opción validate y su alternativa si no lo está.
  if (options.validate && options.stats) {
    validateLinks(objectLinksArray).then((linksToValidate) => {
      getLinksStats(linksToValidate, options.validate).then((res) => resolve(res));
    });
  } else if (options.validate) {
    validateLinks(objectLinksArray).then((res) => resolve(res));
  } else if (options.stats) {
    getLinksStats(objectLinksArray, options.validate).then((res) => resolve(res));
  } else {
    resolve(objectLinksArray);
  }
});

export default mdLinks;
