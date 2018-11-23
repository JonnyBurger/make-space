const rl = require('readline');
const execa = require('execa');
const ProgressProgress = require('./p-progress');

const getSize = number => {
	return parseInt(number.replace(/,/g, '.'), 10) * 1024;
};

module.exports = (dir, {filter = Boolean} = {}) => {
	return new ProgressProgress((resolve, reject, progress) => {
		let cleanup = null;
		let interval = null;
		let reader = null;
		let spawned = null;
		try {
			spawned = execa('du', ['-ak', dir]);

			const killHandler = (ch, key) => {
				if (key.name === 's') {
					spawned.kill();
					reject('Stopped');
					cleanup();
				}
			};
			cleanup = () => {
				process.stdin.removeListener('keypress', killHandler);
				if (interval) {
					clearInterval(interval);
				}
				if (reader) {
					reader.removeAllListeners();
				}
				if (spawned && spawned.stderr) {
					spawned.stderr.removeAllListeners();
				}
			};
			process.stdin.on('keypress', killHandler);

			reader = rl.createInterface(spawned.stdout);
			let isRejected = false;
			spawned.stderr.on('data', data => {
				const string = data.toString();
				if (!isRejected) {
					if (string.match(/No such file/)) {
						reject("Directory doesn't exist");
					} else {
						reject(string);
					}
					isRejected = true;
					cleanup();
				}
			});
			let size = 0;
			let lastPath = '';
			spawned.stderr.on('close', () => {
				if (!isRejected) {
					resolve(size);
					cleanup();
				}
			});
			reader.on('line', data => {
				const [number, path] = data.split('\t');
				if (!lastPath.startsWith(path) && filter(path)) {
					size += getSize(number);
				}
				if (data) {
					lastPath = path;
				}
			});
			interval = setInterval(() => {
				progress(size);
			}, 100);
		} catch (err) {
			reject(err);
			if (cleanup) {
				cleanup();
			}
		}
	});
};
