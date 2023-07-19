import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
// const route = process.argv[2];

// constantes para probar
// eslint-disable-next-line no-useless-escape, no-unused-vars
const rutaAbsoluta = 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\PRUEBA';
// eslint-disable-next-line no-unused-vars
const rutaRelativa = 'README.md';
// eslint-disable-next-line no-unused-vars
const rutaADirectorio = 'PRUEBA';

// ----------VERIFICA SI EXISTE LA RUTA-------------------------------------
export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));
// routeExists(rutaAbsoluta);

// ---------SI ES ABSOLUTA O NO, QUEDA ABSOLUTA ----------------------------
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    console.log(chalk.green.bold('toAbsolutePath: LA RUTA ES ABSOLUTA'));
    return recievedPath;
  }
  console.log(chalk.blue.bold('toAbsolutePath: CAMBIANDO A RUTA ABSOLUTA'));
  console.log(chalk.bgGray('Tu ruta absoluta es:'), chalk.bgGreen(path.resolve(recievedPath)));
  return path.resolve(recievedPath);
};
// toAbsolutePath(rutaAbsoluta);

// ---------SI ES DIRECTORIO -----------------------------------------------
export const fileOrDirectory = (recievedPath) => {
  const statsPath = fs.statSync(recievedPath);
  let arrayFiles = [];
  if (statsPath.isDirectory()) {
    // Entrar al directorio
    arrayFiles = fs.readdirSync(recievedPath);
    // console.log('Es directorio: leer', arrayFiles);
  } else if (statsPath.isFile()) {
    // Devolver array con ese único archivo
    arrayFiles.push(recievedPath);
    // console.log('Es un file: guarda en array', arrayFiles);
  }
  return arrayFiles;
};

// para leer     console.log(fs.readFileSync());

// console.log(fileOrDirectory(route));
// const mdLinks = (recievedPath /*,options*/ ) => new Promise((resolve, reject) => {
//   // Identifica si la ruta existe
//   if (routeExists(recievedPath)) {
//     resolve('La ruta existe', toAbsolutePath(recievedPath));
//   } else {
//     // Si la ruta no existe se rechaza la promesa
//     reject(Error);
//   }
// });

// mdLinks(route);

// fileOrDirectory(rutaADirectorio);
