const rl = require('readline');
const bytes = require('bytes');
const {last} = require('lodash');
const execa = require('execa');
const PProgress = require('../helpers/p-progress');

module.exports = {
	name: 'Cleanup Homebrew',
	key: 'brew-cleanup',
	feasible: 'hash brew',
	probe: () => {
		return new PProgress((resolve, reject, progress) => {
			let cleanup = null;
			let spawned = null;
			let reader = null;
			try {
				spawned = execa('brew', ['cleanup', '-n']);
				let isRejected = false;
				const killHandler = (ch, key) => {
					if (key.name === 's') {
						spawned.kill();
						isRejected = true;
						reject('Stopped');
						cleanup();
					}
				};
				cleanup = () => {
					process.stdin.removeListener('keypress', killHandler);
					if (spawned && spawned.stderr) {
						spawned.stderr.removeAllListeners();
					}
					if (reader) {
						reader.removeAllListeners();
					}
				};
				process.stdin.on('keypress', killHandler);

				reader = rl.createInterface(spawned.stdout);

				spawned.stderr.on('data', data => {
					const string = data.toString();
					if (!isRejected) {
						reject(string);
						isRejected = true;
						cleanup();
					}
				});

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
					if (isRejected) {
						return;
					}
					if (lines.length === 0) {
						return resolve(0);
					}
					const match = last(lines).match(
						/free approximately ([0-9A-Z.]+) of disk space/
					);
					resolve(bytes.parse(match[1]) / 1.024);
				});
			} catch (err) {
				reject(err);
				if (cleanup) {
					cleanup();
				}
			}
		});
	},
	command: 'brew cleanup'
};
