/* External Imports */

import * as program from 'commander';

/* Internal Imports */

import { loadConfiguration } from '../lib/configuration';
import { runDiffConfiguration } from '../lib/diff';
import * as message from '../lib/message';
import { runSnapshotConfiguration } from '../lib/snapshot';
import { isConfiguration } from '../types/internal/guards';

program
  .alias('pt run')
  .usage('[options]')
  .description('Create snapshots then perform a diff according to the config')
  .option('-c, --config <config>', 'Use a specific config file')
  .parse(process.argv);

/**
 * Executes the diff cli
 *
 * @returns
 */
function run() {
  const { config } = program;

  if (config) {
    const configuration = loadConfiguration(config);
    if (!configuration) {
      return message.error(`Could not find configuration at ${config}.`);
    } else if (!isConfiguration(configuration)) {
      return message.error(`Configuration at ${config} malformed.`);
    }

    message.log('Running with a valid configuration.');

    message.info('Starting snapshots');
    runSnapshotConfiguration(configuration).then(() => {
      message.info('Performing diffs');
      runDiffConfiguration(configuration);
    });
  }
}

run();
