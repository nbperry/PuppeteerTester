import * as interpret from 'interpret';
import * as path from 'path';
import * as message from './message';

/**
 * Loads a configuration
 *
 * @param configFile
 */
export function loadConfiguration(
  configFile?: string
): PT.Configuration | undefined {
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
      return config.default ? config.default as PT.Configuration : config;
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
 * @param moduleDescriptor
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
