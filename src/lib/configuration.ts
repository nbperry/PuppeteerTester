import * as interpret from 'interpret';
import * as path from 'path';

const DEFAULT_FILE_NAME = 'ptt.config.js';

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
        //
      }
    }
    return require(path.join(process.cwd(), configPath || DEFAULT_FILE_NAME))
      .default as PT.Configuration;
  } catch (e) {
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
          // do nothing
        }
      }
    }
  }
}
