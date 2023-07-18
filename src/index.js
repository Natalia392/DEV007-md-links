import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];
// Se verifica si la ruta existe
export const routeExist = (recievedPath) => (fs.existsSync(recievedPath));

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

// Llamar la función para ver qué va pasando con el flujo
const mdLinks = (recievedPath) => {
  // ¿Existe la ruta?
  if (routeExist(recievedPath)) {
    // Cambiar a absoluta de no ser absoluta
    toAbsolutePath(recievedPath);
  } else {
    // ERROR: si la ruta no existe, se lanza mensaje "no existe la ruta"
    console.log(chalk.bgRed.bold('La ruta no existe'));
  }

  // Se verifica si es archivo MD
  // Si es MD se guarda en un array
  // Si no es MD, se verifica si es directorio
};

mdLinks(route);
