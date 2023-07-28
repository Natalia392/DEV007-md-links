import path from 'path';
import fs from 'fs';
import axios from 'axios';

// ---------------------------VERIFICA SI EXISTE LA RUTA-------------------------------------
export const routeExists = (recievedPath) => (fs.existsSync(recievedPath));

// --------- TANTO SI ES ABSOLUTA O NO, QUEDA ABSOLUTA -------------------------
export const toAbsolutePath = (recievedPath) => {
  if (path.isAbsolute(recievedPath)) {
    return recievedPath;
  }
  return path.resolve(recievedPath);
};

// ----------------- PARA UNA RUTA QUE ES UN MD GUARDA EN ARRAY ------------------------------
export const isMD = (file) => {
  const arrMDFile = [];
  if (path.extname(file) === '.md') {
    arrMDFile.push(file);
  }
  return arrMDFile;
};

// ---------------------------------SI ES DIRECTORIO ------------------------------------------
export const isDirectory = (recievedPath) => {
  const statsPath = fs.statSync(recievedPath);
  return statsPath.isDirectory();
};

// ------------------------FUNCIÓN RECURSIVA EXTRAE ARCHIVOS MD DE DIRECTORIO ------------------

export const extractMDFiles = (recievedPath) => {
  // crear array para recibir archivos md que se encuentren
  let arrayMDFiles = [];
  // Primero se revisa el contenido del directorio
  const elementsInDirectory = fs.readdirSync(recievedPath);
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
      arrayMDFiles = arrayMDFiles.concat(extractMDFiles(newPath));
    }
  });
  return arrayMDFiles;
};

// ------------------------LECTURA ARCHIVOS MD EN ARRAY-------------------------------

export const readMarkdownFiles = (arrayMDFiles) => {
  const objectLinksArray = [];
  arrayMDFiles.forEach((file) => {
    const fileRoute = path.resolve(file);
    const fileData = fs.readFileSync(file, 'utf8');
    objectLinksArray.push({ fileData, file: fileRoute });
  });
  return objectLinksArray;
};

// ------------EXTRAER LOS LINKS Y DEVOLVER OBJETO CON URL, TEXT Y RUTA --------------

export const extractLinks = (objectWithMDDataArray) => {
  const objectLinksArray = [];
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  objectWithMDDataArray.forEach((objectWithMDData) => {
    let match = regex.exec(objectWithMDData.fileData);
    while (match !== null) {
      objectLinksArray.push({
        href: match[2],
        text: match[1],
        file: objectWithMDData.file,
      });
      match = regex.exec(objectWithMDData.fileData);
    }
  });
  return objectLinksArray;
};

// ------------------- VALIDAR LINKS -------------------------------------
export const validateLinks = (objectLinksArray) => {
  const promises = objectLinksArray.map((objectLink) => axios
    .get(objectLink.href)
    .then((response) => {
      const isValid = response.status >= 200 && response.status < 400;
      return {
        ...objectLink,
        status: response.status,
        ok: isValid ? 'OK' : 'FAIL',
      };
    })
    .catch((error) => {
      let status = null;
      if (error.response) {
        status = error.response.status;
      }
      return {
        ...objectLink,
        status,
        ok: 'FAIL',
      };
    }));
  return Promise.all(promises);
};

//  --------------- Función para obtener las estadísticas de los enlaces -----------------
export const getLinksStats = (links, optionValidate) => new Promise((resolve, reject) => {
  try {
    const stats = {
      total: links.length,
      unique: new Set(links.map((link) => link.href)).size,
    };
    if (optionValidate) {
      stats.broken = links.filter((link) => link.ok === 'FAIL').length;
      stats.working = links.filter((link) => link.ok === 'OK').length;
    }
    resolve(stats);
  } catch (error) {
    reject(error.message);
  }
});

// ----------------------------TRUNCA EL TEXTO QUE ACOMPAÑA AL LINK EN CLI -------------
export const truncateText = (text) => {
  if (text.length > 50) {
    return `${text.substring(0, 50)} + ...`;
  }
  return text;
};
