#!/usr/bin/env node

var resolve = require('resolve');
var findup = require('findup-sync');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var cwd = argv.cwd ? argv.cwd : process.cwd();
var requires = argv.require;

if (requires) {
  if (!Array.isArray(requires)) {
    requires = [requires];
  }
  requires.forEach(function (module) {
    try {
      require(resolve.sync(module, {basedir: cwd}));
      console.log('Loading external module:', module);
    } catch (e) {
      console.log('Unable to load:', module, e);
    }
  });
}

var validExtensions = Object.keys(require.extensions).join(',');
var configNameRegex = 'Hackerfile' + '{' + validExtensions + '}';

var configFile = findup(configNameRegex, {cwd: cwd});
if (configFile) {
  console.log('Found Hackerfile:', configFile);
  cwd = path.dirname(configFile);
  console.log('Setting current working directory:', cwd);
} else {
  console.log('No Hackerfile found.');
  process.exit(1);
}

try {
  var localModule = resolve.sync('hacker', {basedir: cwd});
  if (localModule) {
    console.log('Found hacker at', localModule);
  }
} catch (e) {
  console.log('Unable to find a local installation of hacker.');
  process.exit(1);
}

