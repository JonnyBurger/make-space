const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const pProgress = require('p-progress');
const percentage = require('percentage');
const {sortBy, zip} = require('lodash');
const prettyBytes = require('pretty-bytes');
const strategies = require('./strategies');

module.exports = async input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}
	const spinner = ora('Finding ways to free up space... 0%');
	spinner.start();
	const sizes = await pProgress
		.all(
			strategies.map(strategy => {
				return strategy.probe();
			})
		)
		.onProgress(progress => {
			spinner.text = `Finding ways to free up space... ${percentage(progress)}`;
		});
	spinner.stop();
	const probeSorted = sortBy(
		zip(strategies, sizes).map(([strategy, size]) => ({
			strategy,
			size
		})),
		p => 0 - p.size
	);
	await inquirer.prompt([
		{
			name: `You can free up to ${prettyBytes(
				probeSorted.reduce((p, a) => a.size + p, 0)
			)} in space! Choose which strategies you would like to execute.`,
			type: 'checkbox',
			choices: probeSorted.map(({strategy, size}) => {
				return {
					name: `${chalk.default.greenBright(`[${prettyBytes(size)}]`)} ${
						strategy.name
					} ${chalk.gray(`\`${strategy.command()}\``)}`,
					value: strategy.key
				};
			})
		}
	]);
	return null;
};
