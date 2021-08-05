// init node modules
const fs = require('fs');
const path = require('path');

const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, '/output/dist.zip'));
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
archive
  .finalize()
  .then(() => console.log('The package file is generated.'))
  .catch((e) => {
    console.log(e);
  });
