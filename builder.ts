const exe = require('@angablue/exe'); // npm i @angablue/exe

const version = "1.0.0";
const Appname = "i2n"
const filename = `${Appname}.exe`;

const build = exe({
    entry: './i2n.js',
    out: `./build-${version}/i2n.exe`,
    pkg: ['-C', 'GZip'], // Specify extra pkg arguments
    version: version,
    target: 'latest-win-x64',
    icon: 'i2n.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: `ip address converter from ip to number and number to ip & ip range generator.`,
        ProductName: Appname,
        LegalCopyright: 'All rights reserved to SecVirus',
        OriginalFilename: filename
    }
});

build.then(() => console.log(`${Appname} built successfully!\nOutput: ${filename}`));
