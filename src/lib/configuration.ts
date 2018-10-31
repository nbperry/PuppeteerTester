/* External Imports */

import * as interpret from 'interpret';
import * as path from 'path';

/* Internal Imports */

import * as message from './message';

/**
 *  Loads a configuration
 *
 * Currently confirmed to support: .json, .ts, .js
 *
 * @export
 * @param {string} [configFile] path to the config file
 * @returns {(Visualizer.Configuration | undefined)}
 */
export function loadConfiguration(
  configFile?: string
): Visualizer.Configuration | undefined {
  try {
    // If the configuration file exists
    if (configFile) {
      const compiler = interpret.extensions[path.extname(configFile)];
      try {
        registerCompiler(compiler);
      } catch (e) {
        message.error(e);
      }

      // Log the configuration file path
      message.log(`Config filepath: ${path.join(process.cwd(), configFile)}`);

      const config = require(path.join(process.cwd(), configFile));
      // return the configuration object
      return config.default
        ? config.default as Visualizer.Configuration
        : config;
    }
  } catch (e) {
    message.error(e);
    return undefined;
  }
}

/**
 * Register the appropriate compiler for the extension of configuration file.  Uses
 * node-inspect to support a wide range of source formats.
 *
 * @param {interpret.Descriptor} [moduleDescriptor]
 */
function registerCompiler(moduleDescriptor?: interpret.Descriptor) {
  if (moduleDescriptor) {
    if (typeof moduleDescriptor === 'string') {
      require(moduleDescriptor);
    } else if (!Array.isArray(moduleDescriptor)) {
      moduleDescriptor.register(require(moduleDescriptor.module));
    } else {
      for (const descriptor of moduleDescriptor) {
        try {
          registerCompiler(descriptor);
          break;
        } catch (e) {
          message.error(e);
        }
      }
    }
  }
}
