import * as fs from 'fs';
import * as jpeg from 'jpeg-js';
import * as path from 'path';
// import pixelmatch, { ImageData as PMImageData } from 'pixelmatch';
import * as pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// const PMImageData = pixelmatch.ImageData;

/** The image data and dimensions of a loaded image of some type */
export interface LoadedImage {
  /** Compatible pixelmatch ImageData */
  data: Buffer | Uint8Array | ImageData;
  /** The width of the image */
  width: number;
  /** The height of the image */
  height: number;
}

/**
 * Load a PNG image and return a `LoadedImage` representation.
 *
 * @param filePath
 */
async function loadPNG(filePath: string): Promise<LoadedImage> {
  return new Promise<LoadedImage>((resolve, reject) => {
    const image = fs.createReadStream(filePath).pipe(new PNG());

    image.on('parsed', () => {
      resolve({
        data: image.data,
        height: image.height,
        width: image.width
      });
    });
  });
}

/**
 * Load a JPEG image and return a `LoadedImage` representation.
 *
 * @param filePath
 */
async function loadJPEG(filePath: string): Promise<LoadedImage> {
  const file = fs.readFileSync(filePath);
  return jpeg.decode(file);
}

/**
 * Load a supported image by path.  Currently support '.jpg' and '.png';
 *
 * @param filePath
 */
async function loadImage(filePath: string) {
  const extension = path.extname(filePath);
  switch (extension) {
    case '.png':
      return loadPNG(filePath);
    case '.jpg':
      return loadJPEG(filePath);
    default:
      throw new Error(
        `Provided image, ${filePath}, is not compatible.  We currently support .jpg and .png.`
      );
  }
}

/**
 * Create an image difference of two images and write it to a path.  Currently
 * only .png output.
 *
 * @param inPath1
 * @param inPath2
 * @param outPath
 */
export async function diff(inPath1: string, inPath2: string, outPath: string) {
  const in1 = await loadImage(inPath1);
  const in2 = await loadImage(inPath2);

  if (!in1) {
    throw new Error('Could not load first input file.');
  } else if (!in2) {
    throw new Error('Could not load second input file.');
  } else if (in1.width !== in2.width || in1.height !== in2.height) {
    throw new Error('Image dimensions are not identical.');
  }

  const width = in1.width;
  const height = in1.height;

  const out = new PNG({ width, height });

  pixelmatch(in1.data, in2.data, out.data, width, height);

  return new Promise((resolve, reject) => {
    out
      .pack()
      .pipe(fs.createWriteStream(outPath))
      .on('parsed', () => resolve());
  });
}
