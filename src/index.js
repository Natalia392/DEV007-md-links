import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];

// constantes para probar
// eslint-disable-next-line no-useless-escape, no-unused-vars
const rutaAbsoluta = 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\README.md';
// eslint-disable-next-line no-unused-vars
const rutaRelativa = 'README.md';
// eslint-disable-next-line no-unused-vars
const rutaADirectorio = 'PRUEBA';
// Se verifica si la ruta existe

export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));
// Se transforma la ruta a absoluta de no serlo
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    console.log(chalk.green.bold('LA RUTA ES ABSOLUTA'));
    return recievedPath;
  }
  console.log(chalk.blue.bold('CAMBIANDO A RUTA ABSOLUTA'));
  console.log('TU RUTA ABOLUTA ES:', chalk.bgWhite(path.resolve(recievedPath)));
  return path.resolve(recievedPath);
};

export const fileOrDirectory = (recievedPath) => {
  const statsPath = fs.statSync(recievedPath);
  if (statsPath.isDirectory()) {
    // Entrar al directorio
    console.log('Es directorio', fs.readdirSync(recievedPath));
    fs.readdirSync(recievedPath);
  } else if (statsPath.isFile()) {
    // Leer file
    console.log('Es file');
    console.log(fs.readFileSync());
  }
  console.log(statsPath.isDirectory(), 'HOLAAAAAA');
};

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
