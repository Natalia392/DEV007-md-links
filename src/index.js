import path from 'path';
import fs from 'fs';

// const route = process.argv[2];

// ---------------------------VERIFICA SI EXISTE LA RUTA-------------------------------------
export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));

// --------- TANTO SI ES ABSOLUTA O NO, QUEDA ABSOLUTA -------------------------
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    return recievedPath;
  }
  return path.resolve(recievedPath);
};

// -----------------REVISAR SI ES MD (retorna array con archivo MD) ------------------------------
export const isMD = (file) => {
  const arrMDFile = [];
  if (path.extname(file) === '.md') {
    arrMDFile.push(file);
  } else {
    return false;
  }
  return arrMDFile;
};

console.log(isMD('README.md'));
// ---------------------------------SI ES DIRECTORIO ------------------------------------------
export const isDirectory = (recievedPath) => {
  const statsPath = fs.statSync(recievedPath);
  return statsPath.isDirectory();
};

// --------PARA HACER LA PRUEBA CON LA LECTURA DE FILES ---------------------
// let arrayMD = [];

// if (isDirectory(absolutePath)) {
//   console.log(10, 'Es directorio:');
//   arrayMD = extractMDFiles(absolutePath);
//   console.log(arrayMD);
// } else if (isMD(absolutePath)) {
//   console.log(11, 'Es 1 md file');
//   arrayMD = isMD(absolutePath);
//   console.log(arrayMD);
// }

// const arrPrueba = arraydeMD(rutaAbsoluta);

// Esto era para implementar el uso de la función validateLinks

// const linksInMdFiles = validateLinks();

// // Llamar a la función para validar los enlaces
// validateLinks(linksInMdFiles)
//   .then((validatedLinksInMdFiles) => {
//     // Mostrar los enlaces validados en la consola
//     console.log('Enlaces válidos y falsos encontrados en los archivos MD:');
//     console.log(validatedLinksInMdFiles);
//   })
//   .catch((error) => {
//     console.error('Ocurrió un error al validar los enlaces:', error);
//   });
