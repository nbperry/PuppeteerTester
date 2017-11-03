import * as puppeteer from "puppeteer";
import * as fs from "fs";

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
async function ScreenshotPage(url: string, filename: string, breakpoint: Breakpoint){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'load'});

    await page.setViewport({width: breakpoint.width, height: breakpoint.height});

    //TODO: use breakpoint.name with a default
    //TODO: make the output directory configurable
    const filepath: string = `./output/${filename}/${filename}-${breakpoint.width}x${breakpoint.height}.jpg`;

    await page.screenshot({path: filepath, fullPage: true});

    await browser.close();
}

// TODO: Improve this...
export function PerformScreenshotSnapshot(){

    //TODO: Pull this from a configuration file that can be passed in
    const configuration: BrowseNode[] = [{
        url: 'https://www.mwiah.com/',
        outputName: 'mwiah-test',
        breakpoints: [
            {width:1920, height: 1080, name: "BIG_SCREEN"},
            {width:480, height:640, name: "Smaller_screen"},
        ]
    },
    {
        url: 'https://www.cubixxsolutions.com/',
        outputName: 'cubix-test',
        breakpoints: [
            {width:1920, height: 1080, name: "BIG_SCREEN"},
            {width:1366, height: 768},
            {width:480, height:640, name: "Smaller_screen"},
        ]
    },
    {
        url: 'https://news.ycombinator.com/',
        outputName: 'hackernews',
        breakpoints: [
            {width:1920, height: 1080, name: "BIG_SCREEN"},
            {width:1366, height: 768},
            {width:480, height:640, name: "Smaller_screen"},
        ]
    },
    {
        url: 'http://dev.armsconnect.org/',
        outputName: 'arms',
        breakpoints: [
            {width:1920, height: 1080, name: "BIG_SCREEN"},
            {width:1366, height: 768},
            {width:480, height:640, name: "Smaller_screen"},
        ]
    }
];


    //loop through every node for each breakpoint and grab a snapshot
    configuration.forEach((node) =>{

        // TODO: make a new property for describing filename vs output directory
        if(!fs.existsSync(`./output/${node.outputName}`)){
            fs.mkdirSync(`./output/${node.outputName}`);
        }

        // TODO: Add default breakpoints to implement
        if(node.breakpoints){
            
            node.breakpoints.forEach(element => {
                ScreenshotPage(node.url, node.outputName, element);
            });
        }
    });
}

PerformScreenshotSnapshot();


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
