const test = require('ava');
const uniq = require('lodash.uniq');
const strategies = require('./src/strategies');

test('All strategies should have a unique key', t => {
	const keys = Object.keys(strategies);
	t.is(keys.length, uniq(keys).length);
});

test('All strategies should have same structure', t => {
	const keys = Object.keys(strategies);
	keys.forEach(k => {
		t.true(typeof strategies[k].name === 'string');
		t.true(typeof strategies[k].probe === 'function');
		t.true(typeof strategies[k].command === 'string');
		t.true(typeof strategies[k].feasible === 'string');
	});
});
