import { routeExists, toAbsolutePath } from './index.js';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];

const mdLinks = (path /*,options*/ ) => new Promise((resolve, reject) => {
  // Identifica si la ruta existe
  if (routeExists(path)) {
    resolve('La ruta existe', toAbsolutePath(path));
  } else {
    // Si la ruta no existe se rechaza la promesa
    reject(Error);
  }
});

mdLinks(route);
console.log('HOLA');

export default mdLinks;
