import mdLinks from './md-links.js';

const route = process.argv[2];

const optionValidate = process.argv.includes('--validate');

const optionStats = process.argv.includes('--stats');

const options = {
  validate: optionValidate,
  stats: optionStats,
};

mdLinks(route, options)
  .then((links) => {
    if (options.validate && options.stats) {
      console.log('total: ', links.total);
      console.log('unique: ', links.unique);
      console.log('working: ', links.working);
      console.log('broken: ', links.broken);
    } else if (options.validate) {
      links.forEach((link) => {
        console.log(`
        href: ${link.href}
        text: ${link.text}
        file: ${link.file}
        status: ${link.status}
        ok: ${link.ok}`);
      });
    } else if (options.stats) {
      console.log('total: ', links.total);
      console.log('unique: ', links.unique);
    } else {
      links.forEach((link) => {
        console.log(`
        file: ${link.file}
        href: ${link.href}
        text: ${link.text}`);
      });
    }
  })
  .catch((error) => {
    console.error((error.message));
  });
