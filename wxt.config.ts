import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  entrypointsDir: 'src',
  zip: {
    artifactTemplate: 'v{{version}}-{{browser}}.zip',
    sourcesTemplate: 'v{{version}}-sources.zip',
  },
  manifest: {
    name: '__MSG_extName__',
    short_name: '__MSG_extShortName__',
    description: '__MSG_extDescription__',
    default_locale: 'en',
  },
});
