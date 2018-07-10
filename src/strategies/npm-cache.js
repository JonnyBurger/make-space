const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Delete npm cache',
	key: 'npm-cache',
	probe: () => getFolderSize(`${os.homedir()}/.npm`),
	command: `rm -rfv ${os.homedir()}/.npm`,
	feasible: `ls ${os.homedir()}/.npm`
};
