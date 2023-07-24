import axios from 'axios';

// ------------------- VALIDAR LINKS -------------------------------------
const validateLinks = (objectLinksArray) => {
  const promises = objectLinksArray.map((objectLink) => axios
    .get(objectLink.href)
    .then((response) => {
      const isValid = response.status >= 200 && response.status < 400;
      return ({ ...objectLink, isValid });
    })
    .catch((error) => {
      console.error(149, error.message);
      return ({ ...objectLink, isValid: false });
    }));
  return Promise.all(promises);
};

export default validateLinks;
