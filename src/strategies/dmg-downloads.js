const os = require('os');
const glob = require('glob');
const getFolderSize = require('../helpers/get-folder-size');

const homedir = os.homedir();
const matchingFiles = glob
	.sync(`${homedir}/Downloads/**/*.dmg`)
	.concat(glob.sync(`${homedir}/Downloads/*.dmg`));

const command =
	matchingFiles.length === 0
		? ''
		: `rm -rfv ${matchingFiles.map(s => `"${s}"`).join(' ')}`;

module.exports = {
	name: 'Delete .dmg from Downloads',
	key: 'dmg-downloads',
	probe: () =>
		getFolderSize(`${homedir}/Downloads`, {
			filter: line => line.endsWith('.dmg')
		}),
	feasible: `ls ${homedir}/Downloads`,
	command
};
