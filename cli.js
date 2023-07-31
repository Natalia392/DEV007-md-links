#!/usr/bin/env node
import chalk from 'chalk';
import mdLinks from './src/md-links.js';
import { truncateText } from './src/index.js';

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
      console.log(chalk.red.bold('The total link stats in your route are:'));
      console.log(chalk.bgGrey('total: ', links.total));
      console.log(chalk.bgGrey('unique: ', links.unique));
      console.log(chalk.green('working: ', links.working));
      console.log(chalk.red('broken: ', links.broken));
    } else if (options.validate) {
      console.log(chalk.red.bold('Your links info:'));
      links.forEach((link) => {
        console.log(chalk.yellowBright(`
        href: ${link.href}
        text: ${truncateText(link.text)}
        file: ${link.file}
        status: ${link.status}
        ok: ${link.ok}`));
      });
    } else if (options.stats) {
      console.log(chalk.red.bold('The link stats in your route are:'));
      console.log(chalk.bgGrey('total: ', links.total));
      console.log(chalk.bgGrey('unique: ', links.unique));
    } else {
      console.log(chalk.red.bold('Your links:'));
      links.forEach((link) => {
        console.log(chalk.yellow(`
        href: ${link.href}
        text: ${truncateText(link.text)}
        file: ${link.file}
        `));
      });
    }
  })
  .catch((error) => {
    console.error((error.message));
  });
