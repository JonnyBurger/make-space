const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Delete Xcode Archives',
	key: 'xcode-archives',
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Developer/Xcode/Archives`),
	command: `rm -rfv ${os.homedir()}/Library/Developer/Xcode/Archives`,
	feasible: `ls ${os.homedir()}/Library/Developer/Xcode/Archives`
};
