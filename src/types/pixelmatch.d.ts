declare module 'pixelmatch' {
  /** PixelMatch image data type */
  export type ImageData = Buffer | Uint8Array;

  /** PixelMatch image diff options */
  export interface Options {
    /** Matching threshold, ranges from `0` to `1`. Smaller values make the comparison more sensitive. `0.1` by default. */
    threshold?: 0 | 1;
    /** If `true`, disables detecting and ignoring anti-aliased pixels. `false` by default. */
    includeAA?: boolean;
  }

  /**
   * Create a difference between two images.
   *
   * @param in1
   * @param in2
   * @param out
   * @param width
   * @param height
   * @param options
   */
  function diff(
    in1: ImageData,
    in2: ImageData,
    out: ImageData,
    width: number,
    height: number,
    options?: Options
  ): void;

  export default diff;
}
