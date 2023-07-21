import mdLinks from './md-links.js';

const route = process.argv[2];

// ----ESTO LUEGO IRÁ EN CLI ---------------------
mdLinks(route)
  .then((rutaAbsoluta) => {
    console.log('.then:', (rutaAbsoluta), -1);
  })
  .catch((error) => {
    console.log('.catch: LA RUTA NO EXISTE', -2);
    console.error((error));
  });
