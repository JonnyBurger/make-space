const os = require('os');
const {last} = require('lodash');
const execa = require('execa');
const bytes = require('bytes');

const getFolderSize = async dir => {
	const {stdout} = await execa('du', ['-sk', dir]);
	return (
		parseInt(
			last(stdout.split('\n'))
				.split('\t')[0]
				.replace(/,/g, '.'),
			10
		) * 1024
	);
};

module.exports = [
	{
		name: 'Empty trash',
		key: 'empty-trash',
		probe: () => getFolderSize(`${os.homedir()}/.Trash`),
		command: () => `${os.homedir()}/.Trash`
	},
	{
		name: 'brew cleanup',
		key: 'brew-cleanup',
		probe: async () => {
			const {stdout} = await execa('brew', ['cleanup', '-n']);
			const match = stdout.match(
				/free approximately ([0-9A-Z\.]+) of disk space/
			);
			return bytes.parse(match[1]) / 1.024;
		},
		command: () => 'brew cleanup'
	},
	{
		name: 'Delete Xcode Derived Data',
		key: 'xcode-deriveddata',
		probe: () =>
			getFolderSize(`${os.homedir()}/Library/Developer/Xcode/DerivedData`),
		command: () => `rm -rf ${os.homedir()}/Library/Developer/Xcode/DerivedData`
	},
	{
		name: 'Delete npm cache',
		key: 'npm-cache',
		probe: () => getFolderSize(`${os.homedir()}/.npm`),
		command: () => `npm cache clean`
	},
	{
		name: 'Delete yarn cache',
		key: 'yarn-cache',
		probe: async () => {
			const {stdout} = await execa(`yarn`, ['cache', 'dir']);
			return getFolderSize(stdout);
		},
		command: () => `yarn cache clean`
	},
	{
		name: 'Delete .dmg from Downloads',
		key: 'dmg-downloads',
		probe: async () => {
			const {stdout} = await execa('du', ['-ak', `${os.homedir()}/Downloads`]);
			const onlyDmg = stdout.split('\n').filter(line => line.endsWith('.dmg'));
			const space = onlyDmg.reduce(
				(a, dmg) => parseInt(dmg.split('\t')[0], 10) + a,
				0
			);
			return space * 1024;
		},
		command: () => 'rm -rf ~/Downloads/*.dmg'
	}
];
