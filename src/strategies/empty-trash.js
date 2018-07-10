const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Empty trash',
	key: 'empty-trash',
	probe: () => getFolderSize(`${os.homedir()}/.Trash`),
	command: `rm -rfv ${os.homedir()}/.Trash`,
	feasible: `ls ${os.homedir()}/.Trash`
};
