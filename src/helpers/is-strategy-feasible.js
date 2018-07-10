const execa = require('execa');
const splitargs = require('splitargs');

module.exports = async strategy => {
	try {
		const commandSplit = splitargs(strategy.feasible);
		await execa(commandSplit[0], commandSplit.slice(1));
		return true;
	} catch (err) {
		return false;
	}
};
