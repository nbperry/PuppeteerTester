import * as interpret from 'interpret';
import * as path from 'path';
import * as message from './message';

/**
 * Loads a configuration
 *
 * @param configPath
 */
export function loadConfiguration(
  configPath?: string
): PT.Configuration | undefined {
  try {
    if (configPath) {
      const compiler = interpret.extensions[path.extname(configPath)];

      try {
        registerCompiler(compiler);
      } catch (e) {
        message.error(e);
      }

      message.log(`Config filepath: ${path.join(process.cwd(), configPath)}`);

      const configFile = require(path.join(process.cwd(), configPath));

      // test for a default export
      return configFile.default
        ? configFile.default as PT.Configuration
        : configFile;
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
