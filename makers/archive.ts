import { createWriteStream } from 'fs';
import { join } from 'path';
import archiver from 'archiver';

// Create a file to stream
const output = createWriteStream(join(process.cwd(), 'output', 'dist.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 },
});

// Listen for all archive data to be written
archive.pipe(output);

// Add files from a directory
archive.directory(join(process.cwd(), 'dist'), false);

// Finalize the archive
archive.finalize().then(() => console.log('The package file is generated.'));
