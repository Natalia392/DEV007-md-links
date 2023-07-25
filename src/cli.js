import mdLinks from './md-links.js';

const route = process.argv[2];

const optionValidate = process.argv.includes('--validate');

const optionStats = process.argv.includes('--stats');

let options = {
  validate: optionValidate,
  stats: optionStats,
};

console.log('CONSOLOGOPTIONS', options);

if (process.argv[3] === '--validate' || process.argv[4] === '--validate') {
  options = { validate: true };
} else {
  options = { validate: false };
}

// ----ESTO LUEGO IRÁ EN CLI ---------------------
mdLinks(route, options)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error((error));
  });
