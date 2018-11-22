const execa = require('execa');
const splitargs = require('splitargs');

module.exports = async strategy => {
	const startDate = Date.now();
	try {
		const commandSplit = splitargs(strategy.feasible);
		await execa(commandSplit[0], commandSplit.slice(1));
		const endDate = Date.now();
		if (endDate - startDate > 150) {
			console.log('Slow startup caused:', strategy.key, endDate - startDate);
		}
		return true;
	} catch (err) {
		const endDate = Date.now();
		if (endDate - startDate > 150) {
			console.log('Slow startup caused:', strategy.key, endDate - startDate);
		}
		return false;
	}
};
