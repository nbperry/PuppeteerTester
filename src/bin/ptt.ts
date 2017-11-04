import * as program from 'commander';

program
  .version('0.0.1')
  .command('snapshot', 'Snapshot a website')
  .command('diff', 'Diff a set of snapshots')
  .parse(process.argv);
