import path from 'path';
import fs from 'fs';

// ------------------------LECTURA ARCHIVOS MD EN ARRAY-------------------------------
export const readMarkdownFiles = (arrayMDFiles) => {
  console.log('FILE', arrayMDFiles);
  const objectLinksArray = [];
  arrayMDFiles.forEach((file) => {
    const fileRoute = path.resolve(file);
    const fileData = fs.readFileSync(file, 'utf8');
    objectLinksArray.push({ fileData, file: fileRoute });
  });
  console.log('OBJETO CON DATA Y RUTA', objectLinksArray);
  return objectLinksArray;
};

export default readMarkdownFiles;
