import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { isArray } from 'util';

/*
    TBD:
    jpg, png, or PDF not really sure or fully customizable?
    what level Level of customizability
*/

/**
 * Take a screenshot from a url at a given breakpoint and write it out to a file
 *
 * @param url Url to navigate to for taking a screenshot
 * @param name the name of the image to save
 * @param breakpoint Object containing the resolutions for the browser viewport
 */
export async function writeSnapshot(
  url: string,
  name: string,
  breakpoint: PT.Breakpoint,
  outdir: string
) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load' });

  await page.setViewport({
    height: breakpoint.height,
    width: breakpoint.width
  });

  // TODO: use breakpoint.name with a default
  // TODO: make the output directory configurable
  const filepath = path.join(
    outdir,
    name,
    `${name}-${breakpoint.width}x${breakpoint.height}.jpg`
  );

  await page.screenshot({ path: filepath, fullPage: true });

  await browser.close();
}

/**
 * Run using a configuration
 *
 * @param configuration
 */
export async function runConfiguration(configuration: PT.Configuration) {
  runSnapshot(configuration.snapshot, configuration.output.path);
}

/**
 * Run using a snapshot and outdir
 *
 * @param entries
 */
export async function runSnapshot(
  entryOrEntries: PT.Snapshot | PT.Snapshot[],
  outdir: string = ''
) {
  if (isArray(entryOrEntries)) {
    entryOrEntries.forEach(entry => executeSnapshot(entry, outdir));
  } else {
    executeSnapshot(entryOrEntries, outdir);
  }
}

/**
 * Execute a snapshot entry
 *
 * @param entry
 */
export async function executeSnapshot(entry: PT.Snapshot, outdir: string) {
  // TODO: Add default breakpoints to implement
  if (!entry.breakpoints) {
    throw new Error('No default breakpoint set');
  }

  const targetDir = path.join(outdir, entry.outputName);
  try {
    await new Promise(resolve => mkdirp(targetDir, resolve));
  } catch (e) {
    // directory exists
  }

  entry.breakpoints.forEach(element =>
    writeSnapshot(entry.url, entry.outputName, element, outdir)
  );
}
