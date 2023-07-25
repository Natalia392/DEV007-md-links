// ------------EXTRAER LOS LINKS Y DEVOLVER OBJETO CON URL, TEXT Y RUTA --------------
const extractLinks = (objectWithMDDataArray) => {
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

export default extractLinks;
