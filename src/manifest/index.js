class Manifest {
  constructor() {
    return {
      'manifest_version': 2,
      'name': process.env.npm_package_app_name,
      'short_name': process.env.npm_package_app_name_short,
      'description': process.env.npm_package_description,
      'default_locale': 'en',
      'version': process.env.npm_package_version,
      'minimum_chrome_version': JSON.stringify(56),
      'author': process.env.npm_package_author_name,
      'icons': {
        '16': 'assets/img/16.png',
        '48': 'assets/img/48.png',
        '128': 'assets/img/128.png',
      },
      'browser_action': {
        'default_icon': {
          '19': 'assets/img/19.png',
          '38': 'assets/img/38.png',
        },
        'default_popup': 'popup.html',
      },
      'options_page': 'option.html',
      'background': {
        'page': 'background.html',
        'persistent': false,
      },
      'content_scripts': [
        {
          'matches': [
            '<all_urls>',
          ],
          'js': [
            `js/content.js`,
          ],
          'match_about_blank': false,
          'all_frames': false,
        },
      ],
      'permissions': [
        'tabs',
        '<all_urls>',
      ],
      'web_accessible_resources': [],
    };

  }
}

// export configs
module.exports = Manifest;
