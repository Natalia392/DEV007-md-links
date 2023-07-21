import {
  routeExists,
  toAbsolutePath,
} from './index.js';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
// const route = process.argv[2];

const mdLinks = (path /*,options*/ ) => {
  return new Promise((resolve, reject) => {
    let myPath = path;
    // Identifica si la ruta existe y si es relativa, la cambia a absoluta
    if (routeExists(path)) {
      myPath = toAbsolutePath(path);
      resolve('La ruta existe');
    } else {
      // Si la ruta no existe se rechaza la promesa
    }
    
    reject('La ruta no existe');
  });
};

export default mdLinks;
