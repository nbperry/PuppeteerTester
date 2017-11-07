import * as message from '../lib/message';

/**
 * Tests whether argument is a `Breakpoint`.
 *
 * @param obj
 */
export function isBreakpoint(obj: any): obj is PT.Breakpoint {
  // message.log(`Guards.isBreakpoint - typeof obj === 'object': ${typeof obj === 'object'}`);
  // message.log(`Guards.isBreakpoint - obj.height === 'number': ${obj.height === 'number'}`);
  // message.log(`Guards.isBreakpoint - typeof obj.width === 'number': ${typeof obj.width === 'number'}`);
  // message.log(`Guards.isBreakpoint - !obj.name || typeof obj.name === 'string'): ${!obj.name || typeof obj.name === 'string'}`);

  return (
    typeof obj === 'object' &&
    typeof obj.height === 'number' &&
    typeof obj.width === 'number' &&
    (!obj.name || typeof obj.name === 'string')
  );
}

/**
 * Tests whether argument is an `Output`.
 *
 * @param obj
 */
export function isOutput(obj: any): obj is PT.Output {
  // message.log(`Guards.isOutput - typeof obj === 'object': ${typeof obj === 'object'}`);
  // message.log(`Guards.isOutput - (!obj.diffPath || typeof obj.diffPath === 'string'): ${(!obj.diffPath || typeof obj.diffPath === 'string')}`);
  // message.log(`Guards.isOutput - (!obj.format || typeof obj.format === 'string') : ${ (!obj.format || typeof obj.format === 'string') }`);
  // message.log(`Guards.isOutput - typeof obj.path === 'string'): ${typeof obj.path === 'string'}`);

  return (
    typeof obj === 'object' &&
    (!obj.diffPath || typeof obj.diffPath === 'string') &&
    (!obj.format || typeof obj.format === 'string') &&
    typeof obj.path === 'string'
  );
}

/**
 * Tests whether argument is a `Snapshot`.
 *
 * @param obj
 */
export function isSnapshot(obj: any): obj is PT.Snapshot {
  // message.log(`Guards.isSnapshot - typeof obj === 'object': ${typeof obj === 'object'}`);
  // message.log(`Guards.isSnapshot - typeof obj.outputName === 'string': ${typeof obj.outputName === 'string'}`);
  // message.log(`Guards.isSnapshot - Array.isArray(obj.breakpoints) : ${Array.isArray(obj.breakpoints)}`);
  // message.log(`Guards.isSnapshot - typeof obj.path === 'string'): ${typeof obj.path === 'string'}`);

  return (
    typeof obj === 'object' &&
    typeof obj.outputName === 'string' &&
    typeof obj.url === 'string' &&
    (Array.isArray(obj.breakpoints) &&
      obj.breakpoints.every((breakpoint: any) => isBreakpoint(breakpoint)))
  );
}

/**
 * Tests whether argument is a `Snapshot[]`.
 *
 * @param obj
 */
export function isArrayOfSnapshot(obj: any): obj is PT.Snapshot[] {
  return (
    Array.isArray(obj) && obj.every((snapshot: any) => isSnapshot(snapshot))
  );
}

/**
 * Tests whether argument is a `Configuration`.
 * @param obj
 */
export function isConfiguration(obj: any): obj is PT.Configuration {
  message.log(
    `does the configuration object contain output information: ${isOutput(
      obj.output
    )}`
  );
  message.log(
    `does the configuration object contain a snapshot or snapshots object/array:` +
      ` ${isSnapshot(obj.snapshot) || isArrayOfSnapshot(obj.snapshot)}`
  );

  return (
    typeof obj === 'object' &&
    isOutput(obj.output) &&
    (isSnapshot(obj.snapshot) || isArrayOfSnapshot(obj.snapshot))
  );
}
