module.exports = class Manifest {
  constructor() {
    return {
      manifest_version: 3,
      name: '__MSG_extName__',
      short_name: '__MSG_extShortName__',
      description: '__MSG_extDescription__',
      default_locale: 'en',
      version: process.env.npm_package_version,
      minimum_chrome_version: JSON.stringify(88),
      author: process.env.npm_package_author_name,
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
        service_worker: 'worker.js',
      },
      permissions: ['notifications'],
      host_permissions: ['<all_urls>'],
      web_accessible_resources: [],
    };
  }
};
