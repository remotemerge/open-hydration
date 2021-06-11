class Manifest {
  constructor() {
    return {
      manifest_version: 3,
      name: process.env.npm_package_app_name,
      short_name: process.env.npm_package_app_name_short,
      description: process.env.npm_package_description,
      default_locale: 'en',
      version: process.env.npm_package_version,
      minimum_chrome_version: JSON.stringify(88),
      author: process.env.npm_package_author_name,
      icons: {
        16: 'assets/img/16.png',
        48: 'assets/img/48.png',
        128: 'assets/img/128.png',
      },
      action: {
        default_icon: {
          16: 'assets/img/16.png',
          24: 'assets/img/24.png',
          32: 'assets/img/32.png',
        },
        default_title: process.env.npm_package_app_name_short,
        default_popup: 'popup.html',
      },
      options_page: 'option.html',
      background: {
        service_worker: 'js/worker.js',
      },
      content_scripts: [
        {
          matches: ['<all_urls>'],
          js: [`js/content.js`],
          match_about_blank: false,
          all_frames: false,
        },
      ],
      permissions: ['tabs'],
      host_permissions: ['<all_urls>'],
      web_accessible_resources: [],
    };
  }
}

// export configs
module.exports = Manifest;
