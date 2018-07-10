const path = require('path');

module.exports = {
	entry: './dist/cli.js',
	output: {
		path: path.resolve(__dirname, 'bundled'),
		filename: 'bundle.js'
	},
	target: 'node',
	mode: 'development'
};
