const test = require('ava');
const {uniq} = require('lodash');
const strategies = require('./src/strategies');

test('All strategies should have a unique key', t => {
	const keys = Object.keys(strategies);
	t.is(keys.length, uniq(keys).length);
});
