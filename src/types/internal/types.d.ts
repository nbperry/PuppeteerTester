// Internal Type Definitions

declare namespace Visualizer {
  /**
   * A viewport configuration
   *
   * we used the word breakpoint as this is the common word used to describe CSS media queries
   *
   * @interface Breakpoint
   */
  interface Breakpoint {
    /**
     *  Viewport height to use for generating a snapshot
     *
     * @type {number}
     * @memberof Breakpoint
     */

    height: number;
    /**
     * Viewport width to use for generating a snapshot
     *
     * @type {number}
     * @memberof Breakpoint
     */
    width: number;

    /**
     * Optional Prefix used for the generated snapshot
     *
     * if a name is provided the file name will look like {name}-{width}x{height}.{ext}
     *
     * if a name is not provided the file name will look like {width}x{height}.{ext}
     *
     * @type {string}
     * @memberof Breakpoint
     */
    name?: string;
  }

  /**
   * Supported image output formats
   */
  type OutputFormat = 'png' | 'jpeg';

  /**
   * An output configuration
   *
   * @interface Output
   */
  interface Output {
    /**
     * The diff output folder path
     *
     * @type {string}
     * @memberof Output
     */
    diffPath?: string;

    /**
     * output format
     *
     * @type {OutputFormat}
     * @memberof Output
     */
    format?: OutputFormat;

    /**
     * The snapshot output folder path
     *
     * @type {string}
     * @memberof Output
     */
    snapshotPath: string;
  }

  /**
   * A snapshot configuration
   *
   * @interface Snapshot
   */
  interface Snapshot {
    /**
     * The file location the images will be outputed too
     *
     * @type {string}
     * @memberof Snapshot
     */
    outputName: string;

    /**
     * The url to navigate to
     *
     * @type {string}
     * @memberof Snapshot
     */
    url: string;

    /**
     * A list of breakpoints
     *
     * @type {Breakpoint[]}
     * @memberof Snapshot
     */
    breakpoints: Breakpoint[];

    /**
     *  Should a diff be generated for this snapshot
     *
     * @type {boolean}
     * @memberof Snapshot
     */
    generateDiff?: boolean;
  }

  /**
   * Tester configuration
   *
   * @interface Configuration
   */
  interface Configuration {
    /**
     * Target folders and file names
     *
     * @type {Output}
     * @memberof Configuration
     */
    output: Output;

    /**
     * A single or list of snapshot entries
     *
     * @type {(Snapshot | Snapshot[])}
     * @memberof Configuration
     */
    snapshot: Snapshot | Snapshot[];
  }
}
