/* External Imports */

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';

/* Internal Imports */

import { loadConfiguration } from '../lib/configuration';
import { diff, runDiffConfiguration } from '../lib/diff';
import * as message from '../lib/message';
import { isConfiguration } from '../types/internal/guards';

program
  .alias('pt diff')
  .usage('[options] | <oldFilePath> <newFilePath> <outPath>')
  .description(
    'Create a diff of two images and write it to a file.  Inputs must be .png or .jpg, and output will be .png.'
  )
  .option('-c, --config <config>', 'Use a specific config file')
  .parse(process.argv);

if (program.args.length !== 3 && !program.config) {
  program.help();
}

/**
 * Executes the diff cli
 *
 * @returns
 */
function run() {
  const { config } = program;

  // If we are not using a configuration file then perform the diff for the single file
  if (!config) {
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
  if (config) {
    const configuration = loadConfiguration(config);
    if (!configuration) {
      return message.error(`Could not find configuration at ${config}.`);
    } else if (!isConfiguration(configuration)) {
      return message.error(`Configuration at ${config} malformed.`);
    }
    message.log('Running with a valid configuration.');
    runDiffConfiguration(configuration);
  }
}

run();
