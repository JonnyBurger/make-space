const {h, Component, Color, Fragment, Underline} = require('ink');
const {max, padStart, padEnd, sum} = require('lodash');
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
		if (this.props.mayStart && !this.state.started) {
			this.setState({
				started: true
			});
			this.probe();
		}
	}
	async probe() {
		try {
			this.setState({
				started: true
			});
			let probing = this.props.strategy.probe();
			if (probing.onProgress) {
				probing = probing.onProgress(size => {
					this.props.onProgress(size);
					this.setState({size});
				});
			}
			const size = await probing;
			this.props.onFinish(size);
			this.setState({size, final: true});
		} catch (err) {
			this.props.onError(err);
			this.setState({
				final: true,
				err
			});
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
				<Color gray={this.state.err}>
					{padEnd(this.props.strategy.name, this.props.nameWidth + 2, ' ')}{' '}
				</Color>
				{this.state.err ? (
					<Color gray>{this.state.err}</Color>
				) : (
					<Color gray>`{this.props.strategy.command()}`</Color>
				)}
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
	get totalPotential() {
		return sum(this.tasks.filter(s => !s.err).map(s => s.size));
	}
	render() {
		return (
			<Fragment>
				<div />
				Welcome to <Underline>more-space</Underline>! You can save up to{' '}
				<Color blue>{prettyBytes(this.totalPotential)}</Color>:
				<div />
				<div />
				<List onSubmit={() => {}}>
					{strategies.map((strategy, i) => {
						return (
							<ListItem key={strategy.key} value={strategy.key}>
								<Strategy
									strategy={strategy}
									onError={err => {
										this.setState({
											progress: Object.assign({}, this.state.progress, {
												[strategy.key]: Object.assign(
													{},
													this.state.progress[strategy.key],
													{
														final: true,
														err
													}
												)
											})
										});
									}}
									onFinish={size => {
										this.setState({
											progress: Object.assign({}, this.state.progress, {
												[strategy.key]: Object.assign(
													{},
													this.state.progress[strategy.key],
													{
														final: true,
														size
													}
												)
											})
										});
									}}
									onProgress={size => {
										this.setState({
											progress: Object.assign({}, this.state.progress, {
												[strategy.key]: Object.assign(
													{},
													this.state.progress[strategy.key],
													{
														size
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
