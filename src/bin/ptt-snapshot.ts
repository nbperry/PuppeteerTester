/* External Imports */

import * as program from 'commander';

/* Internal Imports */

import { loadConfiguration } from '../lib/configuration';
import * as message from '../lib/message';
import { runSnapshot, runSnapshotConfiguration } from '../lib/snapshot';
import { isConfiguration, isSnapshot } from '../types/internal/guards';

program
  .alias('pt snapshot')
  .usage('[options]')
  .description('Create a snapshot from a website URL.')
  .option('-b, --breakpoint <breakpoint>', 'Breakpoint name')
  .option('-c, --config <config>', 'Use a specific config file')
  .option('-h, --height <height>', 'Height of the viewport')
  .option('-n, --snapshotName <snapshotName>', 'Snapshot name')
  .option('-o, --outdir <outdir>', 'Output path')
  .option('-u, --url <url>', 'Website URL')
  .option('-w, --width <width>', 'Width of the viewport')
  .parse(process.argv);

/**
 * Executes the snapshot cli
 *
 * @returns
 */
function run() {
  const {
    breakpoint,
    config,
    height,
    outdir,
    snapshotName,
    url,
    width
  } = program;

  if (
    !url &&
    !breakpoint &&
    !height &&
    !snapshotName &&
    !outdir &&
    !width &&
    !config
  ) {
    program.outputHelp();
  } else if (
    !url &&
    !breakpoint &&
    !height &&
    !snapshotName &&
    !outdir &&
    !width
  ) {
    const configuration = loadConfiguration(config);
    if (!configuration) {
      return message.error(`Could not find configuration at ${config}.`);
    } else if (!isConfiguration(configuration)) {
      return message.error(`Configuration at ${config} malformed.`);
    }
    message.log('Running with a valid configuration.');
    runSnapshotConfiguration(configuration);
  } else {
    const snapshot: Visualizer.Snapshot = {
      breakpoints: [
        {
          height: Number(height),
          name: String(breakpoint),
          width: Number(width)
        }
      ],
      outputName: String(snapshotName),
      url: String(url)
    };
    if (!isSnapshot(snapshot)) {
      return message.error(
        'You must specify url, snapshotName, width, height, and outdir.'
      );
    }
    message.log('Running with valid configuration options.');
    runSnapshot(snapshot, outdir);
  }
}

run();
