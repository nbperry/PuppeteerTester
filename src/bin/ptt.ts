/* External Imports */

import * as program from 'commander';

program
  .version('0.0.1')
  .command('snapshot', 'Snapshot a website')
  .command('diff', 'Diff a set of snapshots')
  .command('run', 'Perform a snapshot then a diff')
  .parse(process.argv);
