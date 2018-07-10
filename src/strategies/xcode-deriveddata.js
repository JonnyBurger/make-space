const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Delete Xcode Derived Data',
	key: 'xcode-deriveddata',
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Developer/Xcode/DerivedData`),
	command: `rm -rfv ${os.homedir()}/Library/Developer/Xcode/DerivedData`
};
