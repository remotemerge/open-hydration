import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

// use vars from package config
import pc from '../package.json' assert { type: 'json' };

// format manifest
const manifest = {
  manifest_version: 3,
  name: '__MSG_extName__',
  short_name: '__MSG_extShortName__',
  description: '__MSG_extDescription__',
  default_locale: 'en',
  version: pc.version,
  minimum_chrome_version: JSON.stringify(88),
  author: pc.author.name,
  icons: {
    16: '/icons/16.png',
    48: '/icons/48.png',
    128: '/icons/128.png',
  },
  action: {
    default_icon: {
      16: '/icons/16.png',
      24: '/icons/24.png',
      32: '/icons/32.png',
    },
    default_title: '__MSG_extName__',
    default_popup: 'popup.html',
  },
  options_page: 'option.html',
  background: {
    service_worker: 'js/worker.js',
  },
  permissions: ['notifications'],
};

// generate chrome manifest
const publicPath = join(resolve(), 'dist');
await mkdir(publicPath, { recursive: true });
await writeFile(join(publicPath, 'manifest.json'), JSON.stringify(manifest), 'utf-8');
