const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './dist/cli.js',
	output: {
		path: path.resolve(__dirname, 'bundled'),
		filename: 'bundle.js'
	},
	target: 'node',
	mode: 'development',
	plugins: [
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true
		})
	]
};
