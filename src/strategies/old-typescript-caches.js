const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Delete Typescript cache',
	key: 'typescript-caches',
	probe: () => getFolderSize(`${os.homedir()}/Library/Caches/typescript`),
	command: `rm -rfv ${os.homedir()}/Library/Caches/typescript`,
	feasible: `ls ${os.homedir()}/Library/Caches/typescript`
};
