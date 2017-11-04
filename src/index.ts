import * as fs from 'fs';
import * as puppeteer from 'puppeteer';

/*
    TBD:
    jpg, png, or PDF not really sure or fully customizable?
    what level Level of customizability
*/
/**
 * This function is used for taking a screenshot
 *
 * @param url Url to navigate to for taking a screenshot
 * @param filename the name of the image to save
 * @param breakpoint Object containing the resolutions for the browser viewport
 */
async function screenshotPage(
  url: string,
  filename: string,
  breakpoint: Breakpoint
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
  const filepath: string = `./output/${filename}/${filename}-${breakpoint.width}x${breakpoint.height}.jpg`;

  await page.screenshot({ path: filepath, fullPage: true });

  await browser.close();
}

// TODO: Improve this...
export function performScreenshotSnapshot() {
  // TODO: Pull this from a configuration file that can be passed in
  const configuration: BrowseNode[] = [
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'mwiah-test',
      url: 'https://www.mwiah.com/'
    },
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 1366, height: 768 },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'cubix-test',
      url: 'https://www.cubixxsolutions.com/'
    },
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 1366, height: 768 },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'hackernews',
      url: 'https://news.ycombinator.com/'
    },
    {
      breakpoints: [
        { width: 1920, height: 1080, name: 'BIG_SCREEN' },
        { width: 1366, height: 768 },
        { width: 480, height: 640, name: 'Smaller_screen' }
      ],
      outputName: 'arms',
      url: 'http://dev.armsconnect.org/'
    }
  ];

  // loop through every node for each breakpoint and grab a snapshot
  configuration.forEach(node => {
    // TODO: make a new property for describing filename vs output directory
    if (!fs.existsSync(`./output/${node.outputName}`)) {
      fs.mkdirSync(`./output/${node.outputName}`);
    }

    // TODO: Add default breakpoints to implement
    if (node.breakpoints) {
      node.breakpoints.forEach(element => {
        screenshotPage(node.url, node.outputName, element);
      });
    }
  });
}

performScreenshotSnapshot();
/*
    A small set of default breakpoints
    2560x1600
    2560x1440
    1920x1200
    1920x1080
    1680x1050
    1440x900
    1366x768
    1024x768
    480x800
    480x640
    480x320
    320x240
*/
