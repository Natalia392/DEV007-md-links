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

// Busca y valida links en archivos md dentro de un directorio
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let absolutePath = '';

  const pathExists = routeExists(path);

  if (pathExists) {
    absolutePath = toAbsolutePath(path);
  } else {
    reject(new Error('Tu ruta no existe'));
  }

  let arrayMDFiles = [];
  if (isDirectory(absolutePath)) {
    arrayMDFiles = extractMDFiles(absolutePath);
  } else if (isMD(absolutePath)) {
    arrayMDFiles = isMD(absolutePath);
  }

  if (arrayMDFiles.length === 0) {
    reject(new Error('No se encontraron archivos md'));
  }

  const dataMDArray = readMarkdownFiles(arrayMDFiles);

  const objectLinksArray = extractLinks(dataMDArray);

  if (objectLinksArray.length === 0) {
    reject(new Error('No se encontraron links'));
  }

  // Ya en las opciones se ejecuta:  con --validate y --stats
  if (options.validate && options.stats) {
    validateLinks(objectLinksArray).then((linksToValidate) => {
      getLinksStats(linksToValidate, options.validate)
        .then((res) => resolve(res))
        .catch(() => reject(new Error('Hubo un problema al validar y contar los links')));
    });

  // con --validate
  } else if (options.validate) {
    validateLinks(objectLinksArray)
      .then((res) => resolve(res))
      .catch(() => new Error('Hubo un problema al validar los links'));

  // con --stats
  } else if (options.stats) {
    getLinksStats(objectLinksArray)
      .then((res) => resolve(res))
      .catch(() => new Error('Hubo un problema al obtener los stats'));

  // sin ninguna opción
  } else {
    resolve(objectLinksArray);
  }
});

export default mdLinks;
