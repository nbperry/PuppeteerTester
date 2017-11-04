/**
 * @TODO
 */

import * as program from 'commander';

program.option('-f, --force', 'force').parse(process.argv);

// tslint:disable no-console

const pkgs = program.args;

if (!pkgs.length) {
  console.error('packages required');
  process.exit(1);
}

console.log();
if (program.force) {
  console.log('  force: install');
}
pkgs.forEach(pkg => console.log('  install : %s', pkg));
console.log();
