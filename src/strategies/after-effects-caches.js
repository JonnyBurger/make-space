const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Clear After Effects disk cache',
	key: 'after-effects-caches',
	command: 'rm -rfv ~/Library/Caches/Adobe/After Effects',
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Caches/Adobe/After Effects`)
};
