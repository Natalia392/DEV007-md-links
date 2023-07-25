import path from 'path';
import fs from 'fs';

// ------------------------LECTURA ARCHIVOS MD EN ARRAY-------------------------------
const readMarkdownFiles = (arrayMDFiles) => {
  const objectLinksArray = [];
  arrayMDFiles.forEach((file) => {
    const fileRoute = path.resolve(file);
    const fileData = fs.readFileSync(file, 'utf8');
    objectLinksArray.push({ fileData, file: fileRoute });
  });
  return objectLinksArray;
};

export default readMarkdownFiles;
