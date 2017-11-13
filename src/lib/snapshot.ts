/* External Imports */

import { format as dateFormat } from 'date-fns';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { isArray } from 'util';

/* Internal Imports */

import { DEFAULT_OUTPUT_FORMAT } from './constants';
import * as message from './message';

/**
 * Convert output format to output extension.
 *
 * @param {PT.OutputFormat} format image format
 * @returns
 */
function formatToExtension(format: PT.OutputFormat) {
  switch (format) {
    case 'jpeg':
      return 'jpg';
    default:
      return format;
  }
}

/**
 * Take a screenshot from a url at a given breakpoint and write it out to a file
 *
 * @param {string} url Url to navigate to for taking a screenshot
 * @param {string} name the name of the image to save
 * @param {PT.Breakpoint} breakpoint Object containing the resolutions for the browser viewport
 * @param {string} outdir Output directory
 * @param {PT.OutputFormat} [format=DEFAULT_OUTPUT_FORMAT] the image format to use
 */
async function writeSnapshot(
  url: string,
  name: string,
  breakpoint: PT.Breakpoint,
  outdir: string,
  format: PT.OutputFormat = DEFAULT_OUTPUT_FORMAT
): Promise<string> {
  const extension = formatToExtension(format);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the url and wait for the load event is fired
  await page.goto(url, { waitUntil: 'load' });

  // Adjust the viewport to the snapshot's height & width
  await page.setViewport({
    height: breakpoint.height,
    width: breakpoint.width
  });

  // Create the filepath for the generated snapshot
  const filepath = path.join(
    outdir,
    breakpoint.name
      ? `${breakpoint.name}-${breakpoint.width}x${breakpoint.height}.${extension}`
      : `${breakpoint.width}x${breakpoint.height}.${extension}`
  );

  await page.screenshot({
    fullPage: true,
    path: filepath,
    type: format
  });

  await browser.close();

  // return the filepath for the screen that was generated
  return filepath;
}

/**
 * Run using a configuration
 *
 * @export
 * @param {PT.Configuration} configuration configuration for executing snapshot functionality
 */
export async function runSnapshotConfiguration(
  configuration: PT.Configuration
): Promise<void | string[]> {
  return runSnapshot(
    configuration.snapshot,
    configuration.output.snapshotPath,
    configuration.output.format
  );
}

/**
 *  Run using a snapshot and an output directory
 *
 * @export
 * @param {(PT.Snapshot | PT.Snapshot[])} entryOrEntriesA single snapshot or multiple snapshot entries
 * @param {string} [outdir=''] the output directory for all snapshots
 * @param {PT.OutputFormat} [format] the image format to use
 *
 */
export async function runSnapshot(
  entryOrEntries: PT.Snapshot | PT.Snapshot[],
  outdir: string = '',
  format?: PT.OutputFormat
): Promise<void | string[]> {
  if (isArray(entryOrEntries)) {
    const snapshotPromises: Array<Promise<string[]>> = [];

    entryOrEntries.forEach(entry =>
      snapshotPromises.push(executeSnapshot(entry, outdir, format))
    );

    // flatten the array of string[] into a single string array
    return Promise.all(snapshotPromises).then(arrays => {
      return arrays.reduce((a, b) => {
        return a.concat(b);
      });
    });
  } else {
    return executeSnapshot(entryOrEntries, outdir, format);
  }
}

/**
 * Execute a snapshot entry
 *
 * @param {PT.Snapshot} entry A single snapshot entry
 * @param {string} outdir the output directory for all snapshots for the given entry
 * @param {PT.OutputFormat} [format] the image format to use
 *
 * @returns {Promise<void>} resolves when all of the breakpoints for the snapshot entry have been snapshotted
 */
async function executeSnapshot(
  entry: PT.Snapshot,
  outdir: string,
  format?: PT.OutputFormat
) {
  message.log('Output directory', outdir);
  if (!entry.breakpoints) {
    message.error(
      `No breakpoints were set for the entry ${entry.outputName} - ${entry.url}`
    );
    throw new Error('No default breakpoint set');
  }

  const datedir = dateFormat(new Date(), 'YYYYMMDD-HHMMSS');
  const targetDir = path.join(outdir, entry.outputName, datedir);

  try {
    await new Promise(resolve => mkdirp(targetDir, resolve));
  } catch (e) {
    // directory already exists
  }

  // generate the snapshot for each breakpoint
  const snapshotPromises: Array<Promise<string>> = [];

  // generate the snapshot for each breakpoint
  entry.breakpoints.forEach(element =>
    snapshotPromises.push(
      writeSnapshot(entry.url, entry.outputName, element, targetDir, format)
    )
  );

  return Promise.all(snapshotPromises).then(filepaths => {
    return Promise.resolve(filepaths);
  });
}
