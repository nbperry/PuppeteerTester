import { loadConfiguration } from './lib/configuration';
import * as message from './lib/message';
import * as snapshot from './lib/snapshot';
import * as guards from './types/guards';

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
  snapshot.runSnapshot(configuration.snapshot, configuration.output.path);
}

run();
