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
 * @export
 * @param {string} url Url to navigate to for taking a screenshot
 * @param {string} name the name of the image to save
 * @param {PT.Breakpoint} breakpoint Object containing the resolutions for the browser viewport
 * @param {string} outdir Output directory
 * @param {PT.OutputFormat} [format=DEFAULT_OUTPUT_FORMAT] the image format to use
 */
export async function writeSnapshot(
  url: string,
  name: string,
  breakpoint: PT.Breakpoint,
  outdir: string,
  format: PT.OutputFormat = DEFAULT_OUTPUT_FORMAT
) {
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
}

/**
 * Run using a configuration
 *
 * @export
 * @param {PT.Configuration} configuration configuration for executing snapshot functionality
 */
export async function runConfiguration(configuration: PT.Configuration) {
  runSnapshot(
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
 */
export async function runSnapshot(
  entryOrEntries: PT.Snapshot | PT.Snapshot[],
  outdir: string = '',
  format?: PT.OutputFormat
) {
  if (isArray(entryOrEntries)) {
    entryOrEntries.forEach(entry => executeSnapshot(entry, outdir, format));
  } else {
    executeSnapshot(entryOrEntries, outdir, format);
  }
}

/**
 * Execute a snapshot entry
 *
 * @export
 * @param {PT.Snapshot} entry A single snapshot entry
 * @param {string} outdir the output directory for all snapshots for the given entry
 * @param {PT.OutputFormat} [format] the image format to use
 */
export async function executeSnapshot(
  entry: PT.Snapshot,
  outdir: string,
  format?: PT.OutputFormat
) {
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
  entry.breakpoints.forEach(element =>
    writeSnapshot(entry.url, entry.outputName, element, targetDir, format)
  );
}
