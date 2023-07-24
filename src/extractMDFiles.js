import path from 'path';
import fs from 'fs';

// ------------------------FUNCIÓN RECURSIVA EXTRAE ARCHIVOS MD DE DIRECTORIO ------------------
const extractMDFiles = (recievedPath) => {
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

const directorio = 'UserstorrDesktopproyectos-laboratoriaDEV007-md-linksPRUEBAPS';
const mdArr = extractMDFiles(directorio);
console.log('ARRAY MD FILES:', mdArr);

export default extractMDFiles;
