declare module 'pixelmatch' {
  /** PixelMatch image data type */
  type PMImageData = Buffer | Uint8Array | ImageData;

  /** PixelMatch image diff options */
  interface Options {
    /** Matching threshold, ranges from `0` to `1`. Smaller values make the comparison more sensitive. `0.1` by default. */
    threshold?: 0 | 1;
    /** If `true`, disables detecting and ignoring anti-aliased pixels. `false` by default. */
    includeAA?: boolean;
  }

  // /**
  //  * Create a difference between two images.
  //  *
  //  * @param in1
  //  * @param in2
  //  * @param out
  //  * @param width
  //  * @param height
  //  * @param options
  //  */
  function pixelmatch(
    in1: PMImageData,
    in2: PMImageData,
    out: PMImageData,
    width: number,
    height: number,
    options?: Options
  ): void;

  namespace pixelmatch {

  }

  export = pixelmatch;
}

// declare namespace pixelmatch {
//   /** PixelMatch image data type */
//   type ImageData = Buffer | Uint8Array;

//   /** PixelMatch image diff options */
//   interface Options {
//     /** Matching threshold, ranges from `0` to `1`. Smaller values make the comparison more sensitive. `0.1` by default. */
//     threshold?: 0 | 1;
//     /** If `true`, disables detecting and ignoring anti-aliased pixels. `false` by default. */
//     includeAA?: boolean;
//   }
// }
