import path from 'path';
import fs from 'fs';

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
