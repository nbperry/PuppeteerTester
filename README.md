# Visualizer

A visual regressing testing tool used for generating visual snapshots of webpages and perform visual differences.

This library is capable of being used for snapshotting, diffing, and a combination of these two.

### Warning: This project is not actively maintained

## Installation

Note: this library is not currently published on npm and as such the below installations will not work at the moment

To install globally as a CLI tool

```sh
npm install visualizer -g

or

yarn global add visualizer
```

## Usage

### Using a configuration file

This will perform only snapshots according to the configuration file

`visualizer snapshot -c example.json`

This will perform only diff comparisons according to the configuration file

`visualizer diff -c example.json`

This will perform snapshots then diff comparisons according to the configuration file

`visualizer run -c example.json`

### Snapshots cli

```
  Usage: ptt-snapshot|pt snapshot [options]

  Create a snapshot from a website URL.
```

- `-b, --breakpoint <breakpoint>` A name for a given width/height
- `-c, --config <config>` A configuration file to perform snapshots with
- `-h, --height <height>` Height of viewport
- `-w, --width <width>` Width of viewport
- `-n, --snapshotName <snapshotName>` Name of the outputed snapshot
- `-o, --outdir <outdir>` the directory in which the snapshot should be outputed
- `-u, --url <url>` Url of the website to snapshot
- `-h, --help` output help information

#### Examples

perform a snapshot via cli
`visualizer snapshot -h 1080 -w 1920 -b AwesomePicture -n GoogleSnapshots -o Snapshots -u https://google.com`

### Diffing CLI

```
Usage: ptt-diff|pt diff [options] | <oldFilePath> <newFilePath> <outPath>

Create a diff of two images and write it to a file.  Inputs must be .png or .jpg, and output will be .png.
```

- `-c, --config <config>` A configuration file to perform diff comparisons with
- `-h, --help` output help information

#### Examples

run via cli
`visualizer diff oldFile.png newerFile.png diff.png`

#### Example Configuration file

TODO: There must be a better way to document this

example.json

```
{
    "output": {
        "diffPath": "snapshots/diff",
        "format": "png",
        "snapshotPath": "snapshots/output"
    },
    "snapshot": [
        {
            "breakpoints": [
              { "width": 1920, "height": 1080, "name": "BIG_SCREEN" },
              { "width": 1366, "height": 768 },
              { "width": 480, "height": 640, "name": "Smaller_screen" }
            ],
            "outputName": "hackernews",
            "url": "https://news.ycombinator.com/",
            "generateDiff": true
        }
    ]
}
```

Explanation of json structure

```
ouput contains information regarding the tools output
    diffPath is an optional string representing the file path for storing diff comparisons
    format is an optional string representing the image format the files should be saved in (currently only support "png")
    snapshotPath is a required string representing the file path for storing snapshots
snapshot is a required array containing information pertaining explaining what should be snapshotted
    breakpoints is a required array containing information different browser viewport configurations to perform snapshots at
        width is a required number representing the width of the browser viewport
        height is a required number representing the height of the browser viewport
        name is an optional string representing a user friendly name for the snapshot
    ouputName is a required string representing the directory name for all snapshots
    url is a required string representing the url that will be snapshoted
    generateDiff is an optional boolean representing if a diff should be performed for the given snapshot (default: false)
```

[See Typescript Types for a more detailed information](https://github.com/nbperry/PuppeteerTester/blob/5327bcbf6ef16b679ad70962740fc697e2d91795/src/types/internal/types.d.ts#L121)

## Development

Developed using Node 8.9.1 (Current LTS version)

1. Clone the repository

2. `yarn install`

You should be good to go.

### Dependencies

- [chalk](https://github.com/chalk/chalk)
- [commander.js](https://github.com/tj/commander.js/)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [interpret](https://github.com/js-cli/js-interpret)
- [mkdirp](https://github.com/substack/node-mkdirp)
- [date-fns](https://github.com/date-fns/date-fns)
- [jpeg-js](https://github.com/eugeneware/jpeg-js)
- [pixelmatch](https://github.com/mapbox/pixelmatch)
- [pngjs](https://github.com/lukeapage/pngjs)

## License

MIT
