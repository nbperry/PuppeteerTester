# PuppeteerTestingtool (To be renamed)

This is a cli tool to enable the ability to quickly take visual snapshots of webpages. The  the purpose of this is to enable an automated method to perform regression testing on visual designs.

## Installation

```sh
npm install {TO BE DETERMINED} -g
```

## Usage

TBD

### Snapshots

TBD

### Diffing

TBD

## Arguments

TBD

### Snapshots

* `-c, --config <config>` A configuration file to perform snapshots with
* `-b, --breakpoint <breakpoint>` A name for a given width/height
* `-h, --height <height>` Height of viewport
* `-w, --width <width>` Width of viewport
* `-n, --snapshotName <snapshotName>`  Name of the outputed snapshot
* `-o, --outdir <outdir>` the directory in which the snapshot should be outputed
* `-u, --url <url>` Url of the website to snapshot

### Diffing

TBD

### Dependencies

* [Chalk](https://github.com/chalk/chalk)
* [Commander.js](https://github.com/tj/commander.js/)
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* [interpret](https://github.com/js-cli/js-interpret)
* [mkdirp](https://github.com/substack/node-mkdirp)

### Development

TBD


## License

MIT