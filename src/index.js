import path from 'path';
import fs from 'fs';
import axios from 'axios';

// Introducir en la terminal node ./src/index.js README.md para correr la app.
const route = process.argv[2];

// constantes para probar
// eslint-disable-next-line no-useless-escape, no-unused-vars
const rutaAbsoluta = 'C:\Users\ntorr\Desktop\proyectos-laboratoria\DEV007-md-links\PRUEBA\README.md';
// eslint-disable-next-line no-unused-vars
const rutaRelativa = 'README.md';
// eslint-disable-next-line no-unused-vars
const rutaADirectorio = 'PRUEBA';

// ---------------------------VERIFICA SI EXISTE LA RUTA-------------------------------------
export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));
console.log(18, '¿Existe la ruta?:', routeExists(route));

// ---------SI ES ABSOLUTA O NO, QUEDA ABSOLUTA ----------------------------
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    console.log(23, ('LA RUTA YA ES ABSOLUTA'));
    return recievedPath;
  }
  console.log(26, ('CAMBIANDO A RUTA ABSOLUTA'));
  console.log(27, ('Tu ruta absoluta es:'), (path.resolve(recievedPath)));
  return path.resolve(recievedPath);
};

console.log(toAbsolutePath(route));
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

// ------------------------FUNCIÓN RECURSIVA EXTRAE ARCHIVOS MD DE DIRECTORIO ------------------
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
const arrPrueba = arraydeMD(rutaAbsoluta);

// ------------------------LECTURA ARCHIVOS MD EN ARRAY-------------------------------
export const readMarkdownFiles = (arrayFiles) => {
  console.log('FILE', arrayFiles);
  const dataMDArray = [];
  arrayFiles.forEach((file) => {
    const fileRoute = path.resolve(file);
    const fileData = fs.readFileSync(file, 'utf8');
    dataMDArray.push({ fileData, file: fileRoute });
  });
  console.log(107, 'OBJETO CON DATA Y RUTA', dataMDArray);
  return dataMDArray;
};

const dataInMD = readMarkdownFiles(arrPrueba);
// console.log(110, dataInMD);
// console.log(dataInMD);
// console.log(88888888, dataInMD);

// ------------EXTRAER LOS LINKS Y DEVOLVER OBJETO CON URL, TEXT Y RUTA --------------
export const extractLinks = (dataArray) => {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  dataArray.forEach((data) => {
    // dataArray[0].fileData encuentra la ubicación del contenido del achivo MD.
    let match = regex.exec(data.fileData);
    console.log(123, match[0])
    while (match !== null) {
      links.push({
        href: match[2],
        text: match[1],
        file: data.file,
      });
      match = regex.exec(data.fileData);
    }
  });
  console.log(134, 'Consologueará el objeto con sus propiedades?', links);
  return links;
};

const linksInMdFiles = extractLinks(dataInMD);
// Función para validar los enlaces encontrados
function validateLinks(links) {
  const promises = links.map((link) => {
    return axios
      .head(link.href)
      .then((response) => {
        const isValid = response.status >= 200 && response.status < 400;
        return { ...link, isValid: isValid };
      })
      .catch(() => {
        return { ...link, isValid: false };
      });
  });
  return Promise.all(promises);
}

// Llamar a la función para validar los enlaces
validateLinks(linksInMdFiles)
  .then((validatedLinksInMdFiles) => {
    // Mostrar los enlaces validados en la consola
    console.log('Enlaces válidos y falsos encontrados en los archivos MD:');
    console.log(validatedLinksInMdFiles);
  })
  .catch((error) => {
    console.error('Ocurrió un error al validar los enlaces:', error);
  });
