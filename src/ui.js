const {h, Component, Color, Fragment, Underline} = require('ink');
const leftPad = require('left-pad');
const {List, ListItem} = require('@jonny/ink-checkbox-list');
const Spinner = require('ink-spinner');
const prettyBytes = require('pretty-bytes');

const strategies = require('./strategies');

class Strategy extends Component {
	async componentDidMount() {
		const size = await this.props.strategy.probe();
		this.setState({
			size
		});
	}
	render() {
		return (
			<Fragment>
				{this.state.size ? (
					<Color gray>
						{leftPad(`[${prettyBytes(this.state.size)}]`, 10, '')}
					</Color>
				) : (
					<Fragment>
						{' '.repeat(9)}
						<Spinner gray />
					</Fragment>
				)}
				{'  '}
				{this.props.strategy.name}{' '}
				<Color gray>`{this.props.strategy.command()}`</Color>
			</Fragment>
		);
	}
}

class Picker extends Component {
	constructor() {
		super();

		this.state = {
			strategies
		};
	}
	render() {
		return (
			<Fragment>
				<div />
				Welcome to <Underline>free-space</Underline>! Here are some ideas:
				<div />
				<div />
				<List onSubmit={() => {}}>
					{strategies.map(strategy => {
						return (
							<ListItem key={strategy.key} value={strategy.key}>
								<Strategy strategy={strategy} />
							</ListItem>
						);
					})}
				</List>
			</Fragment>
		);
	}
}

module.exports = Picker;
