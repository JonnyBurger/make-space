const os = require('os');
const flatten = require('lodash.flatten');
const execa = require('execa');
const getFolderSize = require('../helpers/get-folder-size');
const PProgress = require('../helpers/p-progress');

module.exports = {
	name: 'Delete unavailable Xcode simulators',
	key: 'xcode-simulators',
	command: 'xcrun simctl delete unavailable',
	feasible: 'xcrun -h',
	probe: () => {
		return new PProgress(async (resolve, reject, progress) => {
			try {
				const json = await execa('xcrun', ['simctl', 'list', '-j']);
				const devices = JSON.parse(json.stdout);
				const unavailable = flatten(
					Object.keys(devices.devices).map(d => devices.devices[d])
				).filter(r => !r.isAvailable);
				let totalSize = 0;
				for (let device of unavailable) {
					const size = await getFolderSize(
						`${os.homedir()}/Library/Developer/CoreSimulator/Devices/${
							device.udid
						}`
					);
					totalSize += size;
					progress(totalSize);
				}
				resolve(totalSize);
			} catch (err) {
				reject(err);
			}
		});
	}
};
