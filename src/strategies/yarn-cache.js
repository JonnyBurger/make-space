const execa = require('execa');
const PProgress = require('../helpers/p-progress');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
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
	feasible: 'which yarn',
	command: `yarn cache clean`
};
