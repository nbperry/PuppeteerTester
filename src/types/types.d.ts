// Internal Type Definitions

declare namespace PT {
  /**
   * A viewport configuration
   */
  interface Breakpoint {
    /**
     * Viewport height to use for generating a snapshot
     */
    height: number;
    /**
     * Viewport width to use for generating a snapshot
     */
    width: number;
    /**
     * Suffix used for the generated snapshot
     *
     * TODO: If not provided we should default this to {width}x{height}
     */
    name?: string;
  }

  /**
   * Supported output formats
   */
  type OutputFormat = 'png' | 'jpeg';

  /**
   * An output configuration
   */
  interface Output {
    /**
     * The diff output folder path
     */
    diffPath?: string;
    /**
     * Output format
     */
    format?: OutputFormat;
    /**
     * The output folder path
     */
    path: string;
  }

  /**
   * A snapshot configuration
   */
  interface Snapshot {
    /**
     * The file location the images will be outputed too
     */
    outputName: string;
    /**
     * The url to navigate to
     */
    url: string;
    /**
     * A list of breakpoints
     */
    breakpoints: Breakpoint[];
  }

  /**
   * Tester configuration
   */
  interface Configuration {
    /**
     * Target folders and file names
     */
    output: Output;
    /**
     * A single or list of snapshot entries
     */
    snapshot: Snapshot | Snapshot[];
  }
}
