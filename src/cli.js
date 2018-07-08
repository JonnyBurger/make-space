#!/usr/bin/env node
'use strict';
const meow = require('meow');
const freeSpace = require('.');

const cli = meow(`
	Usage
	  $ more-space [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ more-space
	  unicorns & rainbows
	  $ more-space ponies
	  ponies & rainbows
`);

freeSpace(cli.input[0] || 'unicorns')
	.then(() => {})
	.catch(err => console.log(err));
