const rl = require('readline');
const execa = require('execa');
const {last} = require('lodash');
const PProgress = require('./p-progress');

const getSize = number => {
	return parseInt(number.replace(/,/g, '.'), 10) * 1024;
};

module.exports = (dir, {filter = Boolean} = {}) => {
	return new PProgress((resolve, reject, progress) => {
		try {
			const {stdout, stderr} = execa('du', ['-ak', dir]);
			const reader = rl.createInterface(stdout);
			const errOutput = [];
			let isRejected = false;
			stderr.on('data', data => {
				const string = data.toString();
				errOutput.push(string);
				if (!isRejected) {
					if (string.match(/No such file/)) {
						reject("Directory doesn't exist");
					} else {
						reject(string);
					}
					isRejected = true;
				}
			});
			let size = 0;
			let lastPath = '';
			stderr.on('close', () => {
				if (!isRejected) {
					resolve(size);
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
			let interval = setInterval(() => {
				progress(size);
			}, 100);
			reader.on('close', () => {
				clearInterval(interval);
			});
		} catch (err) {
			reject(err);
		}
	});
};
