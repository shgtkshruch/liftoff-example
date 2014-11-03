#!/usr/bin/env node

var resolve = require('resolve');
var findup = require('findup-sync');
var path = require('path');
var cwd = process.cwd();

var configFile = findup('Hackerfile.js', {cwd: cwd});
if (configFile) {
  console.log('Found Hackerfile:', configFile);
  cwd = path.dirname(configFile);
  console.log('Setting current working directory:', cwd);
} else {
  console.log('No Hackerfile found.');
  process.exit(1);
}

try {
  var localHacker = resolve.sync('hacker', {basedir: process.cwd()});
  console.log('Found hacker at', localHacker);
} catch (e) {
  console.log('Unable to find a local installation of hacker.');
  process.exit(1);
}


