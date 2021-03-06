Package.describe({
  name: 'monbro:soundcloud-nodejs-api-wrapper',
  summary: 'Meteor wrapper for npm package soundcloud-nodejs-api-wrapper.',
  version: '0.2.6',
  git: 'https://github.com/monbro/meteor-soundcloud-nodejs-api-wrapper-package/'
});

function configurePackage(api) {

  if(api.versionsFrom) {
    api.versionsFrom('METEOR@1.0');
  }

  Npm.depends({
      "soundcloud-nodejs-api-wrapper": "0.3.0",
    });

  api.addFiles('server.js', 'server');

  api.export('NpmSoundcloud');
  api.export('Soundcloud');
}

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);

  api.use('tinytest');
  // api.addFiles('tests.js');
});