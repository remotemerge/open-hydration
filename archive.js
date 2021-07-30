// init fs module
const fs = require('fs');

const archiver = require('archiver');

const output = fs.createWriteStream(__dirname + '/output/dist.zip');
const archive = archiver('zip', {
  zlib: {
    level: 9,
  },
});

// pipe archive
archive.pipe(output);

// append files
archive.directory('dist/', false);

// finalize the archive
archive.finalize().then(() => console.log('The package file is generated.'));
