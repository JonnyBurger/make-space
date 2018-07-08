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
			const stream = execa('du', ['-ak', dir]).stdout;
			const reader = rl.createInterface(stream);
			let size = 0;
			let lastPath = '';
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
				resolve(size);
			});
		} catch (err) {
			reject(err);
		}
	});
};
