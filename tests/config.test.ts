import * as rimraf from 'rimraf';

import { loadConfiguration } from '../src/lib/configuration';
import { isConfiguration } from '../src/types/internal/guards';
import { runSnapshotConfiguration } from '../src/lib/snapshot';
import {
  CONFIG_BASIC_JSON,
  CONFIG_INVALID_JSON,
  TEST_OUTPUT_DIRECTORY
} from './constants';

describe('Configuration', () => {
  beforeEach(() => {
    // Clean out the test ouput directory prior to each test
    rimraf.sync(TEST_OUTPUT_DIRECTORY);
  });

  afterAll(() => {
    // Clean out the test ouput directory after all tests
    rimraf.sync(TEST_OUTPUT_DIRECTORY);
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

  it('Should be able to perform snapshots for a valid configuration from a JSON file', async () => {
    const configuration = loadConfiguration(CONFIG_BASIC_JSON);

    expect(isConfiguration(configuration)).toBeTruthy();

    // TODO: check that the running the snapshot configuration is infact valid
  });
});
