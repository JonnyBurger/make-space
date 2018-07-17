const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Clear Spotify cache',
	key: 'spotify-cache',
	command: `rm -rfv "${os.homedir()}/Library/Caches/com.spotify.client/Data"`,
	feasible: `ls "${os.homedir()}/Library/Caches/com.spotify.client/Data"`,
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Caches/com.spotify.client/Data`)
};
