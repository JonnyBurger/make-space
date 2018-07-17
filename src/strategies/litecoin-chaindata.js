const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Delete Litecoin chaindata',
	key: 'litecoin-chaindata',
	command: `rm -rfv "${os.homedir()}/Library/Application Support/Litecoin/blocks"`,
	feasible: `ls "${os.homedir()}/Library/Application Support/Litecoin/blocks"`,
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Application Support/Litecoin/blocks`)
};
