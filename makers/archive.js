import { createWriteStream } from 'fs';
import { join } from 'path';
import archiver from 'archiver';

// create a file to stream
const output = createWriteStream(join(process.cwd(), 'output', 'dist.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 },
});

// listen for all archive data to be written
archive.pipe(output);

// add files from a directory
archive.directory(join(process.cwd(), 'dist'), false);

// finalize the archive
archive.finalize().then(() => console.log('The package file is generated.'));
