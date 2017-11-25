import * as rimraf from 'rimraf';

import { loadConfiguration } from '../src/lib/configuration';
import { runDiffConfiguration } from '../src/lib/diff';
import { runSnapshotConfiguration } from '../src/lib/snapshot';
import { isConfiguration } from '../src/types/internal/guards';
import {
  CONFIG_BASIC_JSON,
  CONFIG_INVALID_JSON,
  TEST_SNAPSHOT_OUTPUT_DIRECTORY
} from './constants';

describe('Configuration Tests', () => {
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
  it('Should be able to handle an invalid configuration from a JSON file', () => {
    const configuration = loadConfiguration(CONFIG_INVALID_JSON);

    // tests type check
    expect(isConfiguration(configuration)).toBeFalsy();
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should be able to read a configuration from a JSON file', () => {
    const configuration = loadConfiguration(CONFIG_BASIC_JSON);

    expect(isConfiguration(configuration)).toBeTruthy();

    if (configuration) {
      expect(configuration.output.diffPath).toBe('snapshots/diff');
      expect(configuration.output.format).toBe('png');

      expect(configuration.snapshot).toHaveLength(1);
    }
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should be able to perform snapshots for a valid configuration from a JSON file', async () => {
    const configuration = loadConfiguration(CONFIG_BASIC_JSON);

    expect(isConfiguration(configuration)).toBeTruthy();
    expect(configuration).not.toBeUndefined();

    if (configuration) {
      const test = await runSnapshotConfiguration(configuration);

      expect(test).not.toBeUndefined();

      expect(test).toHaveLength(3);
    }
  });

  it('Should be able to perform snapshots and diff for a valid configuration from a JSON file', async () => {
    const configuration = loadConfiguration(CONFIG_BASIC_JSON);

    expect(isConfiguration(configuration)).toBeTruthy();
    expect(configuration).not.toBeUndefined();

    if (configuration) {
      const test = await runSnapshotConfiguration(configuration);

      expect(test).not.toBeUndefined();

      expect(test).toHaveLength(3);

      // TODO: Need to add more validation around this
      runDiffConfiguration(configuration);
    }
  });
});
