import * as path from 'path';

// This path is used to the output of the tests
export const TEST_SNAPSHOT_OUTPUT_DIRECTORY = path.join(process.cwd(), 'ouput');
// This path contains example configurations to test against
export const TEST_MOCK_CONFIG_DIRECTORY = path.join('tests', 'mock-config');

// Mock config file paths
export const CONFIG_BASIC_JSON = path.join(
  TEST_MOCK_CONFIG_DIRECTORY,
  'example-config.json'
);
export const CONFIG_INVALID_JSON = path.join(
  TEST_MOCK_CONFIG_DIRECTORY,
  'invalid-config.json'
);
