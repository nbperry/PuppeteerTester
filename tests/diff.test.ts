import * as rimraf from 'rimraf';
import * as path from 'path';

import {
  DIFF_IMAGE_1,
  DIFF_IMAGE_2,
  DIFF_PATH_1,
  TEST_DIFF_OUTPUT_DIRECTORY
} from './constants';
import { diff, diffLastTwo } from '../src/lib/diff';

describe('Diff Tests', () => {
  beforeEach(() => {
    // Clean out the test ouput directory prior to each test
    // rimraf.sync(TEST_DIFF_OUTPUT_DIRECTORY);
  });

  afterAll(() => {
    // Clean out the test ouput directory after all tests
    // rimraf.sync(TEST_DIFF_OUTPUT_DIRECTORY);
  });

  // tslint:disable-next-line only-arrow-functions
  it('Should be able to perform a diff on two images', async () => {
    // TODO:
  });
  // tslint:disable-next-line only-arrow-functions
  it('Should be able to perform a diff on the two latest directories', async () => {
    // TODO:
  });
});
