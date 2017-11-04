import * as program from 'commander';
import { loadConfiguration } from '../lib/configuration';
import { runConfiguration, runSnapshot } from '../lib/snapshot';
import * as guards from '../types/guards';

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

const {
  breakpoint,
  config,
  height,
  outdir,
  snapshotName,
  url,
  width
} = program;

if (!url && !breakpoint && !height && !snapshotName && !outdir && !width) {
  const configuration = loadConfiguration(config);
  if (!configuration) {
    throw new Error(`Could not find configuration at ${config}.`);
  } else if (!guards.isConfiguration(configuration)) {
    throw new Error(`Configuration at ${config} malformed.`);
  }
  // tslint:disable-next-line no-console
  console.log('Running with a valid configuration.');
  runConfiguration(configuration);
} else {
  const snapshot: PT.Snapshot = {
    breakpoints: [{ height, name: breakpoint, width }],
    outputName: snapshotName,
    url
  };
  if (!guards.isSnapshot(snapshot)) {
    throw new Error('You must specify url in conjunction with name, height');
  }
  // tslint:disable-next-line no-console
  console.log('Running with valid configuration options.');
  runSnapshot(snapshot, outdir);
}
