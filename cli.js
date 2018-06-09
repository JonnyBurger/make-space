#!/usr/bin/env node
'use strict';
const meow = require('meow');
const freeSpace = require('.');

const cli = meow(`
	Usage
	  $ free-space [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ free-space
	  unicorns & rainbows
	  $ free-space ponies
	  ponies & rainbows
`);

console.log(freeSpace(cli.input[0] || 'unicorns'));
