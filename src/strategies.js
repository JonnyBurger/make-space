module.exports = [
	require('./strategies/xcode-deriveddata'),
	require('./strategies/xcode-archives'),
	require('./strategies/empty-trash'),
	require('./strategies/npm-cache'),
	require('./strategies/yarn-cache'),
	require('./strategies/docker-dangling'),
	require('./strategies/dmg-downloads'),
	require('./strategies/after-effects-caches'),
	require('./strategies/brew-cleanup'),
	require('./strategies/ethereum-chaindata'),
	require('./strategies/ethereum-chaindata-testnet'),
	require('./strategies/old-typescript-caches')
];
