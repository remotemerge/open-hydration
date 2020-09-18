// init fs module
const fs = require('fs');

// generate chrome manifest
const Manifest = require('./src/manifest/index');
fs.existsSync('./dist') || fs.mkdirSync('./dist');
fs.createWriteStream('./dist/manifest.json', 'utf-8').write(
  JSON.stringify(new Manifest())
);
