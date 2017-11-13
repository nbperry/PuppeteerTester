import * as path from 'path';

import { TEST_OUTPUT_DIRECTORY } from '../constants';

const configuration = {
  output: {
    diffPath: path.join(TEST_OUTPUT_DIRECTORY, 'snapshots', 'diff'),
    format: 'png',
    path: path.join(TEST_OUTPUT_DIRECTORY, 'snapshots', 'output')
  },
  snapshot: [
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 1366, height: 768 },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'hackernews',
      url: 'https://news.ycombinator.com/',
      generateDiff: true
    }
  ]
};

export default configuration;
