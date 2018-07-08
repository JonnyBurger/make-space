const os = require('os');
const execa = require('execa');
const bytes = require('bytes');
const PProgress = require('./helpers/p-progress');
const getFolderSize = require('./helpers/get-folder-size');
const brewCleanup = require('./strategies/brew-cleanup');
const dmgDownloads = require('./strategies/dmg-downloads');

module.exports = [
	{
		name: 'Delete Xcode Derived Data',
		key: 'xcode-deriveddata',
		probe: () =>
			getFolderSize(`${os.homedir()}/Library/Developer/Xcode/DerivedData`),
		command: `rm -rfv ${os.homedir()}/Library/Developer/Xcode/DerivedData`
	},
	{
		name: 'Delete npm cache',
		key: 'npm-cache',
		probe: () => getFolderSize(`${os.homedir()}/.npm`),
		command: `rm -rfv ${os.homedir()}/.npm`
	},
	{
		name: 'Delete yarn cache',
		key: 'yarn-cache',
		probe: PProgress.fn(async progress => {
			const {stdout} = await execa(`yarn`, ['cache', 'dir']);
			const p = getFolderSize(stdout);
			p.onProgress(prog => {
				progress(prog);
			});
			return p;
		}),
		command: `yarn cache clean`
	},
	{
		name: 'Delete Premiere caches',
		key: 'premiere-cache',
		command: 'rm -rfv ~/Library/Caches/Adobe/Premiere Pro',
		probe: () =>
			getFolderSize(`${os.homedir()}/Library/Caches/Adobe/Premiere Pro`)
	},
	dmgDownloads,
	brewCleanup,
	{
		name: 'Empty trash',
		key: 'empty-trash',
		probe: () => getFolderSize(`${os.homedir()}/.Trash`),
		command: `rm -rfv ${os.homedir()}/.Trash`
	},
	{
		name: 'Random command, should fail',
		key: 'test-fail',
		command: 'fsdfdsfds',
		probe: () => getFolderSize(`fskajdölfjdslakfjdas`)
	},
	{
		name: 'Clear After Effects disk cache',
		key: 'after-effects-caches',
		command: 'rm -rfv ~/Library/Caches/Adobe/After Effects',
		probe: () =>
			getFolderSize(`${os.homedir()}/Library/Caches/Adobe/After Effects`)
	},
	{
		name: 'Delete dangling Docker images',
		key: 'docker-dangling',
		probe: async () => {
			const {stdout} = await execa('docker', [
				'images',
				'--filter',
				'dangling=true'
			]);
			const [, ...images] = stdout.split('\n');
			const size = images
				.map(i => {
					const split = i.split(' ');
					return split[split.length - 1];
				})
				.map(b => bytes.parse(b.toLowerCase()));
			return size.reduce((a, b) => a + b, 0);
		},
		command: 'docker rmi $(docker images -f dangling=true -q)'
	}
];
