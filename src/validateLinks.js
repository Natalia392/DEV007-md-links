import axios from 'axios';

// ------------------- VALIDAR LINKS -------------------------------------
const validateLinks = (objectLinksArray) => {
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
      if (error.response) {
        return {
          ...objectLink,
          status: error.response.status,
          ok: 'FAIL',
        };
      }
      return objectLink;
    }));
  return Promise.all(promises);
};

export default validateLinks;
