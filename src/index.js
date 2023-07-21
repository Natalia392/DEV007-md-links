import path from 'path';
import fs from 'fs';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];

// constantes para probar
// eslint-disable-next-line no-useless-escape, no-unused-vars
const rutaAbsoluta = 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\PRUEBA';
// eslint-disable-next-line no-unused-vars
const rutaRelativa = 'README.md';
// eslint-disable-next-line no-unused-vars
const rutaADirectorio = 'PRUEBA';

// ---------------------------VERIFICA SI EXISTE LA RUTA-------------------------------------
export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));

// ---------SI ES ABSOLUTA O NO, QUEDA ABSOLUTA ----------------------------
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    console.log(1, ('LA RUTA YA ES ABSOLUTA'));
    return recievedPath;
  }
  console.log(2, ('CAMBIANDO A RUTA ABSOLUTA'));
  console.log(3, ('Tu ruta absoluta es:'), (path.resolve(recievedPath)));
  return path.resolve(recievedPath);
};

console.log(0, 'ESTA CORRIENDO index.js');

// -----------------REVISAR SI ES MD (retorna array con archivo MD) ------------------------------
export const isMD = (file) => {
  const arrMDFile = [];
  if (path.extname(file) === '.md') {
    arrMDFile.push(file);
    console.log('Soy un archivo MD');
  }
  return arrMDFile;
};

// isMD(route);

// ---------------------------------SI ES DIRECTORIO ------------------------------------------
export const isDirectory = (recievedPath) => {
  const statsPath = fs.statSync(recievedPath);
  return statsPath.isDirectory();
};

// isDirectory(route);

export const extractMDFiles = (recievedPath) => {
  // crear array para recibir archivos md que se encuentren
  let arrayMDFiles = [];
  // Primero se revisa el contenido del directorio
  const elementsInDirectory = fs.readdirSync(recievedPath);
  console.log(6, 'ELEMENTOS en DIR:', elementsInDirectory);
  // Un forEach para analizar cada elemento encontrado en el directorio
  elementsInDirectory.forEach((element) => {
    // por cada elemento, se crea su nuevo path
    const newPath = path.join(recievedPath, element);
    // Y se ven sus stats, para ver si son o no directorios
    const newPathStats = fs.statSync(newPath);
    // Si alguna es md file, se agrega al array
    if (path.extname(newPath) === '.md') {
      arrayMDFiles.push(newPath);
    } else if (newPathStats.isDirectory()) {
      console.log(100000, 'elemento actual', newPath);
      arrayMDFiles = arrayMDFiles.concat(extractMDFiles(newPath));
    }
  });
  return arrayMDFiles;
};

// --------PARA HACER LA PRUEBA CON LA LECTURA DE FILES ---------------------

const arraydeMD = () => {
  let arrayMD = [];

  if (isDirectory(route)) {
    console.log(10, 'Es directorio:');
    arrayMD = extractMDFiles(route);
    console.log(arrayMD);
  } else if (isMD(route)) {
    console.log(11, 'Es 1 md file');
    arrayMD = isMD(route);
    console.log(arrayMD);
  }
  return arrayMD;
};

// console.log('CAMINANDO POR LA CAELLE', arraydeMD());
const arrPrueba = arraydeMD();

// ------------------------LECTURA ARCHIVOS MD EN ARRAY-------------------------------
export const readMarkdownFiles = (arrayFiles) => {
  const dataMDArray = [];
  arrayFiles.forEach((file) => {
    const fileData = fs.readFileSync(file, 'utf8');
    dataMDArray.push(fileData);
  });
  return dataMDArray;
};

const dataInMD = readMarkdownFiles(arrPrueba);
console.log(typeof dataInMD);
// console.log(dataInMD);
// console.log(88888888, dataInMD);

export const extractLinks = (dataArray) => {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  dataArray.forEach((markdownText) => {
    let match = regex.exec(markdownText);
    while (match !== null) {
      const link = {
        text: match[1],
        url: match[2],
      };
      links.push(link);
      match = regex.exec(markdownText);
    }
  });
  return links;
};

console.log(extractLinks(dataInMD));
