#!/usr/bin/env node

var resolve = require('resolve');

try {
  var localHacker = resolve.sync('hacker', {basedir: process.cwd()});
  console.log('Found hacker at', localHacker);
} catch (e) {
  console.log('Unable to find a local installation of hacker.');
  process.exit(1);
}


