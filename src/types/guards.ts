/**
 * Tests whether argument is a `Breakpoint`.
 *
 * @param obj
 */
export function isBreakpoint(obj: any): obj is PT.Breakpoint {
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
  return (
    typeof obj === 'object' &&
    isOutput(obj.output) &&
    (isSnapshot(obj.snapshot) || isArrayOfSnapshot(obj.snapshot))
  );
}
