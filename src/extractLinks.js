// ------------EXTRAER LOS LINKS Y DEVOLVER OBJETO CON URL, TEXT Y RUTA --------------
const extractLinks = (objectWithMDDataArray) => {
  const objectLinksArray = [];
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  objectWithMDDataArray.forEach((objectWithMDData) => {
    // dataArray[0].fileData encuentra la ubicación del contenido del achivo MD.
    let match = regex.exec(objectWithMDData.fileData);
    console.log(123, match[0]);
    while (match !== null) {
      objectLinksArray.push({
        href: match[2],
        text: match[1],
        file: objectWithMDData.file,
      });
      match = regex.exec(objectWithMDData.fileData);
    }
  });
  console.log(134, 'Consologueará el objeto con sus propiedades?', objectLinksArray);
  return objectLinksArray;
};

export default extractLinks;
