import * as path from 'path';

const configuration = {
  output: {
    diffPath: path.join(process.cwd(), 'snapshots', 'diff'),
    format: 'png',
    path: path.join(process.cwd(), 'snapshots', 'output')
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
