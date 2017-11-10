import { loadConfiguration } from './lib/configuration';
import * as message from './lib/message';
import * as snapshot from './lib/snapshot';
import * as guards from './types/internal/guards';

// TODO: Currently this is used for testing during development, we should refactor this out into tests

/**
 * Entry point to directly running the snapshot with TypeScript config
 */
export function run() {
  const configPath = 'example-config.json';
  const configuration = loadConfiguration(configPath);

  message.log(`Configuration object: ${JSON.stringify(configuration)}`);
  if (!configuration) {
    throw new Error(`Could not find configuration at ${configPath}.`);
  } else if (!guards.isConfiguration(configuration)) {
    throw new Error(`Configuration at ${configPath} malformed.`);
  }

  snapshot.runConfiguration(configuration);
}

run();
