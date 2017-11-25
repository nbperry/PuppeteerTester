import * as rimraf from 'rimraf';

import { runSnapshot } from '../src/lib/snapshot';
import { TEST_SNAPSHOT_OUTPUT_DIRECTORY } from './constants';

describe('Snapshot tests', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    // Clean out the test ouput directory prior to each test
    rimraf.sync(TEST_SNAPSHOT_OUTPUT_DIRECTORY);
  });

  afterAll(() => {
    // Clean out the test ouput directory after all tests
    rimraf.sync(TEST_SNAPSHOT_OUTPUT_DIRECTORY);
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should run a basic snapshot with a single breakpoint', async () => {
    const snapshot: PT.Snapshot = {
      outputName: 'Test',
      url: 'https://news.ycombinator.com/',
      breakpoints: [
        {
          name: 'snapshot',
          width: 1920,
          height: 1080
        }
      ]
    };

    const snapshotArray = await runSnapshot(
      snapshot,
      TEST_SNAPSHOT_OUTPUT_DIRECTORY,
      'png'
    );

    expect(snapshotArray).not.toBeUndefined();
    expect(snapshotArray).toHaveLength(1);

    // TODO: We should probably mock fs to test the files are actually being written
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should run a basic snapshot with a single breakpoint without a name', async () => {
    const snapshot: PT.Snapshot = {
      outputName: 'Test',
      url: 'https://news.ycombinator.com/',
      breakpoints: [
        {
          width: 1920,
          height: 1080
        }
      ]
    };

    const snapshotArray = await runSnapshot(
      snapshot,
      TEST_SNAPSHOT_OUTPUT_DIRECTORY,
      'png'
    );

    expect(snapshotArray).not.toBeUndefined();
    expect(snapshotArray).toHaveLength(1);

    // TODO: We should probably mock fs to test the files are actually being written
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should run a basic snapshot with multiple breakpoints', async () => {
    const snapshot: PT.Snapshot = {
      outputName: 'Test',
      url: 'https://news.ycombinator.com/',
      breakpoints: [
        {
          name: 'test-snapshot',
          width: 1920,
          height: 1080
        },
        {
          name: 'better-snapshot',
          width: 1366,
          height: 768
        }
      ]
    };

    const snapshotArray = await runSnapshot(
      snapshot,
      TEST_SNAPSHOT_OUTPUT_DIRECTORY,
      'png'
    );

    expect(snapshotArray).not.toBeUndefined();
    expect(snapshotArray).toHaveLength(2);

    // TODO: We should probably mock fs to test the files are actually being written
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should run a multiple snapshots with multiple breakpoints', async () => {
    const snapshots: PT.Snapshot[] = [
      {
        outputName: 'Jest',
        url: 'http://facebook.github.io/jest/',
        breakpoints: [
          {
            name: 'test-snapshot',
            width: 1920,
            height: 1080
          },
          {
            name: 'better-snapshot',
            width: 1366,
            height: 768
          }
        ]
      },
      {
        outputName: 'HackerNews',
        url: 'https://news.ycombinator.com/',
        breakpoints: [
          {
            name: 'test-snapshot',
            width: 1920,
            height: 1080
          },
          {
            name: 'better-snapshot',
            width: 1366,
            height: 768
          }
        ]
      }
    ];

    const snapshotArray = await runSnapshot(
      snapshots,
      TEST_SNAPSHOT_OUTPUT_DIRECTORY,
      'png'
    );

    expect(snapshotArray).not.toBeUndefined();
    expect(snapshotArray).toHaveLength(4);

    // TODO: We should probably mock fs to test the files are actually being written
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should run a multiple snapshots with multiple breakpoints with different breakpoints', async () => {
    const snapshots: PT.Snapshot[] = [
      {
        outputName: 'Jest',
        url: 'http://facebook.github.io/jest/',
        breakpoints: [
          {
            width: 1920,
            height: 1080
          },
          {
            name: 'better-snapshot',
            width: 1366,
            height: 768
          },
          {
            width: 1650,
            height: 1050
          }
        ]
      },
      {
        outputName: 'HackerNews',
        url: 'https://news.ycombinator.com/',
        breakpoints: [
          {
            width: 1920,
            height: 1080
          },
          {
            name: 'better-snapshot',
            width: 1366,
            height: 768
          }
        ]
      }
    ];

    const snapshotArray = await runSnapshot(
      snapshots,
      TEST_SNAPSHOT_OUTPUT_DIRECTORY,
      'png'
    );

    expect(snapshotArray).not.toBeUndefined();
    expect(snapshotArray).toHaveLength(5);

    // TODO: We should probably mock fs to test the files are actually being written
  });
});
