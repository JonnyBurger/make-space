const os = require('os');
const getFolderSize = require('../helpers/get-folder-size');

module.exports = {
	name: 'Remove Ethereum testnet chain data',
	key: 'ethereum-chaindata-testnet',
	command: `rm -rfv ${os.homedir()}/Library/Ethereum/testnet/geth/chaindata`,
	feasible: `ls ${os.homedir()}/Library/Ethereum/testnet/geth/chaindata`,
	probe: () =>
		getFolderSize(`${os.homedir()}/Library/Ethereum/testnet/geth/chaindata`)
};
