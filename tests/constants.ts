import * as path from 'path';

export const TEST_OUTPUT_DIRECTORY = path.join(process.cwd(), 'tests', 'ouput');
export const TEST_MOCK_CONFIG_DIRECTORY = path.join('tests', 'mock-config');

export const CONFIG_BASIC_JSON = path.join(
  TEST_MOCK_CONFIG_DIRECTORY,
  'example-config.json'
);
export const CONFIG_INVALID_JSON = path.join(
  TEST_MOCK_CONFIG_DIRECTORY,
  'invalid-config.json'
);
