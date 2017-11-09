import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { diff } from '../lib/diff';
import * as message from '../lib/message';

program
  .alias('pt diff')
  .usage('<oldFilePath> <newFilePath> <outPath>')
  .description(
    'Create a diff of two images and write it to a file.  Inputs must be .png or .jpg, and output will be .png.'
  )
  .parse(process.argv);

if (program.args.length !== 3) {
  program.help();
}

function run() {
  const oldFilePath = path.resolve(program.args[0]);
  const newFilePath = path.resolve(program.args[1]);
  const outFilePath = path.resolve(program.args[2]);

  if (!fs.existsSync(oldFilePath)) {
    return message.error(`Old file path ${oldFilePath} does not exist.`);
  } else if (!fs.existsSync(newFilePath)) {
    return message.error(`New file path ${newFilePath} does not exist.`);
  }

  diff(oldFilePath, newFilePath, outFilePath)
    .then(() => message.info(`Saved image diff to ${outFilePath}.`))
    .catch(e => message.error('Error diffing image:\n', e.message));
}

run();
