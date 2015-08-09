Package.describe({
  name: 'okland:camera-ui',
  version: '0.0.2',
  summary: 'Take photos with UI one function call on desktop and mobile. Choose between camera to photoLibrary.',
  git: 'https://github.com/okland/camera-ui',
  documentation: 'README.md'
});

Cordova.depends({
  "nl.x-services.plugins.actionsheet": "https://github.com/EddyVerbruggen/cordova-plugin-actionsheet/tarball/df5e89e54d5142c964c1139db6fe813a01125825",
  "org.apache.cordova.device": "0.3.0"
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.export('MeteorCameraUI');
  api.use('mdg:camera@1.1.4');
  api.addFiles('camera-ui.js');
  api.addFiles('camera-ui-client.js', ['web.browser', 'web.cordova']);
  api.addFiles('camera-ui-browser.js', ['web.browser']);
  api.addFiles('camera-ui-cordova.js', ['web.cordova']);

});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('okland:camera-ui');
  api.addFiles('camera-ui-tests.js');
});
