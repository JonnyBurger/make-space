const ms = require('ms');
const colors = require('colors/safe');
const execa = require('execa');
const splitargs = require('splitargs');
const getStream = require('get-stream');
const strategies = require('./strategies');

const executeSingle = async strategy => {
	const strat = strategies.find(s => s.key === strategy);
	console.log(colors.underline(strat.name));
	console.log(colors.gray(strat.command));
	const command = strat.command;
	const commandSplit = splitargs(command);
	const exec = execa(commandSplit[0], commandSplit.slice(1));
	exec.stdout.pipe(process.stdout);
	await getStream(exec.stdout);
};

module.exports = async strategies => {
	process.stdout.write('\x1b[2J');
	for (let strategy of strategies) {
		try {
			const startDate = Date.now();
			await executeSingle(strategy);
			const endDate = Date.now();
			console.log(colors.gray(`Done! (${ms(endDate - startDate)})`));
		} catch (err) {
			console.log({err});
		}
	}
	console.log('\n' + colors.blue('All tasks executed!'));
	process.exit(0);
};
