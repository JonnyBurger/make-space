const {h, Component, Color, Fragment, Underline} = require('ink');
const {max, padStart, padEnd} = require('lodash');
const {List, ListItem} = require('@jonny/ink-checkbox-list');
const Spinner = require('ink-spinner');
const prettyBytes = require('pretty-bytes');
const strategies = require('./strategies');

class Strategy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			started: false,
			size: 0,
			final: false
		};
	}
	componentDidMount() {
		if (this.props.mayStart) {
			this.probe();
		}
	}
	async probe() {
		this.setState({
			started: true
		});
		try {
			let probing = this.props.strategy.probe();
			if (probing.onProgress) {
				probing = probing.onProgress(size => {
					this.setState({size});
				});
			}
			const size = await probing;
			this.props.onFinish();
			this.setState({size, final: true});
		} catch (err) {
			console.log(err);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.mayStart && !this.state.started) {
			this.probe();
		}
	}
	render() {
		return (
			<Fragment>
				{this.state.started && !this.state.final ? (
					<Fragment>
						<Spinner gray />
					</Fragment>
				) : (
					<span> </span>
				)}
				{this.state.size ? (
					<Color gray={this.state.final === false} blue={this.state.final}>
						{padStart(prettyBytes(this.state.size), 9, ' ')}
					</Color>
				) : (
					<Fragment>{' '.repeat(9)}</Fragment>
				)}
				{'  '}
				{padEnd(this.props.strategy.name, this.props.nameWidth + 2, ' ')}{' '}
				<Color gray>`{this.props.strategy.command()}`</Color>
			</Fragment>
		);
	}
}

class Ui extends Component {
	constructor() {
		super();
		this.state = {
			strategies,
			progress: {}
		};
	}
	get tasks() {
		return Object.keys(this.state.progress).map(k => {
			return this.state.progress[k];
		});
	}
	get finishedTasks() {
		return this.tasks.filter(t => t.final);
	}
	get nameWidth() {
		return max(this.state.strategies.map(s => s.name.length));
	}
	render() {
		return (
			<Fragment>
				<div />
				Welcome to <Underline>more-space</Underline>! Here are some ideas:
				<div />
				<div />
				<List onSubmit={() => {}}>
					{strategies.map((strategy, i) => {
						return (
							<ListItem key={strategy.key} value={strategy.key}>
								<Strategy
									strategy={strategy}
									onFinish={() => {
										this.setState({
											progress: Object.assign({}, this.state.progress, {
												[strategy.key]: Object.assign(
													{},
													this.state.progress[strategy.key],
													{
														final: true
													}
												)
											})
										});
									}}
									nameWidth={this.nameWidth}
									mayStart={this.finishedTasks.length + 1 >= i}
								/>
							</ListItem>
						);
					})}
				</List>
			</Fragment>
		);
	}
}

module.exports = Ui;
