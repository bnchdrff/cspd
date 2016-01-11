/* global Package, Npm */
'use strict';

Package.describe({
  name: 'app-deps',
  version: '0.0.1',
  summary: 'Private package that loads NPM dependencies for the app',
  git: '',
  documentation: null
});

// NPM dependenices are listed here, with explicit versions. These can then be
// `required()`d in `client.browserify.js` and `server.js`.

Npm.depends({
  'classnames': '2.1.2',
  'moment': '2.10.3',
  'history': '2.0.0-rc2',
  'react-bootstrap': '0.28.2',
  'react-date-picker': '4.0.6',
  'react-router': '2.0.0-rc4',
  'react-router-bootstrap': '0.20.0',
  'exposify': '0.5.0',
  'externalify': '0.1.0',
  'lodash': '3.10.0',
  'bootbox': '4.4.0',
  'fixed-data-table': '0.4.7',
});

// Note specific package versions embedded below as well.

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'cosmos:browserify',
    'react',
  ], 'client');

  api.use([
    'universe:modules@0.4.1',
  ]);

  api.addFiles([
    'client.browserify.js',
    'client.browserify.options.json'
  ], 'client');

  api.addFiles([
    'server.js',
  ], 'server');

  api.addFiles([
    'main.import.jsx',
    'system-config.js'
  ]);

});
