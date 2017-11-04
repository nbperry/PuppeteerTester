import * as path from 'path';

const configuration = {
  output: {
    diffPath: path.join(process.cwd(), 'snapshots', 'diff'),
    format: 'jpg',
    path: path.join(process.cwd(), 'snapshots', 'output')
  },
  snapshot: [
    // {
    //   breakpoints: [
    //     { width: 1920, height: 1080, name: 'BIG_SCREEN' },
    //     { width: 480, height: 640, name: 'Smaller_screen' }
    //   ],
    //   outputName: 'mwiah-test',
    //   url: 'https://www.mwiah.com/'
    // },
    // {
    //   breakpoints: [
    //     { width: 1920, height: 1080, name: 'BIG_SCREEN' },
    //     { width: 1366, height: 768 },
    //     { width: 480, height: 640, name: 'Smaller_screen' }
    //   ],
    //   outputName: 'cubix-test',
    //   url: 'https://www.cubixxsolutions.com/'
    // },
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 1366, height: 768 },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'hackernews',
      url: 'https://news.ycombinator.com/'
    }
    // {
    //   breakpoints: [
    //     { width: 1920, height: 1080, name: 'BIG_SCREEN' },
    //     { width: 1366, height: 768 },
    //     { width: 480, height: 640, name: 'Smaller_screen' }
    //   ],
    //   outputName: 'arms',
    //   url: 'http://dev.armsconnect.org/'
    // }
  ]
};

export default configuration;
