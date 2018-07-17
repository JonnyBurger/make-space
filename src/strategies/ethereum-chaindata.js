const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Remove Ethereum mainnet chain data',
	key: 'ethereum-chaindata',
	command: `rm -rfv ${os.homedir()}/Library/Ethereum/geth/chaindata`,
	feasible: `ls ${os.homedir()}/Library/Ethereum/geth/chaindata`,
	probe: () => getFolderSize(`${os.homedir()}/Library/Ethereum/geth/chaindata`)
};
