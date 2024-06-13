import { readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

// Use vars from package config
const pc = JSON.parse(readFileSync(`${resolve()}/package.json`, 'utf8'));

// Format manifest
const configs = {
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
    32: '/icons/32.png',
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

// Generate chrome manifest
const publicPath = join(resolve(), 'public');
await mkdir(publicPath, { recursive: true });
await writeFile(join(publicPath, 'manifest.json'), JSON.stringify(configs), 'utf-8');
