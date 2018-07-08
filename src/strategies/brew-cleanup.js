const rl = require('readline');
const bytes = require('bytes');
const {last} = require('lodash');
const execa = require('execa');
const PProgress = require('../helpers/p-progress');

module.exports = {
	name: 'Cleanup Homebrew',
	key: 'brew-cleanup',
	probe: () => {
		return new PProgress((resolve, reject, progress) => {
			try {
				const stream = execa('brew', ['cleanup', '-n']).stdout;
				const reader = rl.createInterface(stream);
				const lines = [];
				let size = 0;
				reader.on('line', data => {
					lines.push(data);
					const match = data.match(/([0-9A-Z.]+)\)/);
					if (match) {
						size += bytes.parse(match[1]) / 1.024;
						progress(size);
					}
				});
				reader.on('close', () => {
					const match = last(lines).match(
						/free approximately ([0-9A-Z.]+) of disk space/
					);
					resolve(size);
					resolve(bytes.parse(match[1]) / 1.024);
				});
			} catch (err) {
				reject(err);
			}
		});
	},
	command: () => 'brew cleanup'
};
