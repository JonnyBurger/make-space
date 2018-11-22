const bytes = require('bytes');
const execa = require('execa');

module.exports = {
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
	feasible: 'hash docker',
	command: 'docker rmi $(docker images -f dangling=true -q)'
};
