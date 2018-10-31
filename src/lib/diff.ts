/* External Imports */

import * as fs from 'fs';
import * as jpeg from 'jpeg-js';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { isArray } from 'util';

/* Internal Imports */

import * as message from './message';

/**
 * The image data and dimensions of a loaded image of some type
 *
 * @export
 * @interface LoadedImage
 */
export interface LoadedImage {
  /**
   * Compatible pixelmatch ImageData
   *
   * @type {(Buffer | Uint8Array | ImageData)}
   * @memberof LoadedImage
   */
  data: Buffer | Uint8Array | ImageData;

  /**
   * The width of the image
   *
   * @type {number}
   * @memberof LoadedImage
   */
  width: number;

  /**
   * The height of the image
   *
   * @type {number}
   * @memberof LoadedImage
   */
  height: number;
}

/**
 * Load a PNG image and return a `LoadedImage` representation.
 *
 * @param {string} filePath
 * @returns {Promise<LoadedImage>}
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
 * @param {string} filePath
 * @returns {Promise<LoadedImage>}
 */
async function loadJPEG(filePath: string): Promise<LoadedImage> {
  const file = fs.readFileSync(filePath);
  return jpeg.decode(file);
}

/**
 * Load a supported image by path.  Currently support '.jpg' and '.png';
 *
 * @param {string} filePath
 * @returns
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
 * @export
 * @param {string} inPath1 first image to compare
 * @param {string} inPath2 second image to compare
 * @param {string} outPath the result of the comparison
 * @returns
 */
export async function diff(inPath1: string, inPath2: string, outPath: string) {
  const in1 = await loadImage(inPath1);
  const in2 = await loadImage(inPath2);

  message.log(`File1 path: ${inPath1}`);
  message.log(`File2 path: ${inPath2}`);

  // Validate first and second input file
  if (!in1) {
    throw new Error('Could not load first input file.');
  } else if (!in2) {
    throw new Error('Could not load second input file.');
  }

  const width = in1.width;
  const height = in1.height;

  const out = new PNG({ width, height });

  // Create the image diff
  const percentage =
    pixelmatch(in1.data, in2.data, out.data, width, height) /
    (width * height) *
    100;

  // output the information
  // TODO: review the message for this
  message.info(
    `The difference between ${inPath1} & ${inPath2} is ${percentage.toFixed(
      2
    )} %`
  );

  return new Promise((resolve, reject) => {
    out
      .pack()
      .pipe(fs.createWriteStream(outPath))
      .on('parsed', () => resolve());
  });
}

/**
 * Get the intersection of two arrays.
 *
 * @TODO: Consider moving this to a utiity library or replacing with library in future
 * @param a
 * @param b
 */
const intersect = (a: any[], b: any[]) =>
  Array.from(new Set(a)).filter(x => new Set(b).has(x));

/**
 * Get the last two directory paths
 *
 * TODO: review documentation wording
 *
 * @param {string} dirPath
 * @returns {([string, string] | null)} tuple containing `[new, old]` directory paths
 */
function getLastTwoDirs(dirPath: string): [string, string] | null {
  const source = path.resolve(dirPath);

  message.log(`Getting the two latest directories in ${dirPath}`);

  const sorted = fs
    .readdirSync(source)
    .map(i => path.resolve(source, i))
    .filter(i => fs.lstatSync(i).isDirectory && i.indexOf('.DS_Store') === -1)
    // @TODO: Potentially sort by date time instead, or optionally?
    // .sort((a, b) => fs.lstatSync(a).mtime.getTime() >= fs.lstatSync(b).mtime.getTime() ? 1 : -1)
    .reverse();
  return sorted.length >= 2 ? [sorted[0], sorted[1]] : null;
}

/**
 * Get all of the image paths in a directory.
 *
 * @param {string} dirPath
 * @returns
 */
function getImages(dirPath: string) {
  return fs
    .readdirSync(dirPath)
    .map(i => path.resolve(dirPath, i))
    .filter(
      i =>
        (fs.lstatSync(i).isFile && path.extname(i) === '.png') ||
        path.extname(i) === '.jpg'
    );
}

/**
 * Get the name of the last directory on the path.
 *
 * @param dirPath
 */
const getLastDirName = (dirPath: string) =>
  path
    .resolve(dirPath)
    .split(path.sep)
    .pop();

/**
 * Get the file name by removing the extension from the base name
 *
 * @param baseName
 */
const getFileName = (baseName: string) =>
  baseName.indexOf('.') > 1
    ? baseName.substring(0, baseName.lastIndexOf('.'))
    : baseName;

/**
 * Get a difference of the last two subdirectories at a directory path and outputs the diff to the output directory
 *
 * TODO: Review documentation wording
 *
 * @param {string} dirPath
 * @param {string} [outputDirectory]
 * @returns
 */
export function diffLastTwo(dirPath: string, outputDirectory?: string) {
  const lastTwoDirs = getLastTwoDirs(dirPath);
  if (lastTwoDirs === null) {
    message.error(
      `Can not diff last two because there are less than two directories at ${dirPath}.`
    );
    return Promise.resolve();
  }
  const [newDir, oldDir] = lastTwoDirs;

  const sameFiles = intersect(
    getImages(oldDir).map(file => `${path.basename(file)}`),
    getImages(newDir).map(file => `${path.basename(file)}`)
  );
  if (sameFiles.length === 0) {
    message.error(
      `Directories ${oldDir} and ${newDir} don't contain any of the same files.`
    );

    return Promise.resolve();
  }

  // Coerced - we know these are valid paths
  const oldSubDirName = getLastDirName(oldDir) as string;
  const newSubDirName = getLastDirName(newDir) as string;
  // Create a new directory at the same level as `dirPath` appended with `-diff`.
  // @TODO: Consider other options for this

  const outdir = !outputDirectory
    ? path.join(
        `${path.resolve(dirPath)}-diff`,
        `${newSubDirName}-vs-${oldSubDirName}`
      )
    : path.join(outputDirectory, `${newSubDirName}-vs-${oldSubDirName}`);

  const diffPromises: Array<Promise<{}>> = [];

  mkdirp(outdir, () =>
    sameFiles.forEach(file => {
      const baseName = path.basename(file);
      const oldPath = path.join(oldDir, `${baseName}`);
      const newPath = path.join(newDir, `${baseName}`);
      const outPath = path.join(outdir, `${getFileName(baseName)}.png`);
      diffPromises.push(diff(oldPath, newPath, outPath));
    })
  );

  return Promise.all(diffPromises).then(() => Promise.resolve());
}

/**
 *  Executes a diff based on the configuration
 *
 * @export
 * @param {Visualizer.Configuration} configuration
 */
export function runDiffConfiguration(configuration: Visualizer.Configuration) {
  const diffPromises: Array<Promise<void>> = [];

  if (isArray(configuration.snapshot)) {
    // Take a diff of every directory in the configuration for every snapshot that the generateDiff flag is true
    configuration.snapshot
      .filter(value => value.generateDiff)
      .forEach(snapshot =>
        diffPromises.push(
          diffLastTwo(
            `${configuration.output.snapshotPath}/${snapshot.outputName}`,
            configuration.output.diffPath
          )
        )
      );
  } else {
    // if the generateDiff flag is true generate a diff for the snapshot
    if (configuration.snapshot.generateDiff) {
      diffPromises.push(
        diffLastTwo(
          `${configuration.output.snapshotPath}/${configuration.snapshot
            .outputName}`,
          configuration.output.diffPath
        )
      );
    }
  }

  return Promise.all(diffPromises).then(() => Promise.resolve());
}
