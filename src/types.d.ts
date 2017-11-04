// Internal Type Definitions

//TODO: Need to likely build typeguards for these for ensure runtime compliance with the configuration

declare interface BrowseNode {
  /**
     * The file location the images will be outputed too
     */
  outputName: string;
  /**
     * The url to navigate to
     */
  url: string;

  /**
     *
     */
  breakpoints?: Breakpoint[];
}

declare interface Breakpoint {
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
