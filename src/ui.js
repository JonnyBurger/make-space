const {h, Component, Color, Fragment, Underline} = require('ink');
const {max, padStart, padEnd, sum, sortBy} = require('lodash');
const figures = require('figures');
const Spinner = require('ink-spinner');
const prettyBytes = require('pretty-bytes');
const strategies = require('./strategies');
const List = require('./helpers/ink-checkbox-list/list');
const ListItem = require('./helpers/ink-checkbox-list/list-item');

class Strategy extends Component {
	componentDidMount() {
		if (this.props.mayStart && !this.progress.started) {
			this.probe();
		}
	}
	async probe() {
		try {
			this.props.onStart();
			let probing = this.props.strategy.probe();
			if (probing.onProgress) {
				probing = probing.onProgress(size => {
					this.props.onProgress(size);
				});
			}
			const size = await probing;
			this.props.onFinish(size);
		} catch (err) {
			this.props.onError(err);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.mayStart && !this.progress.started) {
			this.probe();
		}
	}
	get progress() {
		return (
			this.props.progress || {
				started: false,
				size: 0,
				err: null,
				final: false
			}
		);
	}
	render() {
		return (
			<Fragment>
				{this.progress.started && !this.progress.final ? (
					<Fragment>
						<Spinner gray />
					</Fragment>
				) : (
					<span> </span>
				)}
				{this.progress.size ? (
					<Color
						gray={!this.progress.final || this.progress.err}
						blue={this.progress.final && !this.progress.err}
					>
						{padStart(prettyBytes(this.progress.size), 9, ' ')}
					</Color>
				) : (
					<Fragment>{' '.repeat(9)}</Fragment>
				)}
				{'  '}
				<Color gray={this.progress.err}>
					{padEnd(this.props.strategy.name, this.props.nameWidth + 2, ' ')}{' '}
				</Color>
				{this.progress.err ? (
					<Color gray>
						{(this.progress.err.message || this.progress.err)
							.toString()
							.substr(0, 70)
							.replace(/\n/g, '')}
					</Color>
				) : (
					<span>
						<Color dim>$</Color>{' '}
						<Color gray>{this.props.strategy.command()}</Color>
					</span>
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
			progress: {},
			stopped: false,
			checked: []
		};
	}
	componentDidMount() {
		this._stopHandler = this.stopHandler.bind(this);
		process.stdin.on('keypress', this._stopHandler);
	}
	componentWillUnmount() {
		process.stdin.removeListener('keypress', this._stopHandler);
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
		return sum(this.tasks.filter(s => s.size).map(s => s.size));
	}
	get doneSearching() {
		return (
			this.state.stopped ||
			this.finishedTasks.length === this.state.strategies.length
		);
	}
	stopHandler(ch, key) {
		if (key.name === 's') {
			this.setState({
				stopped: true
			});
		}
	}
	render() {
		return (
			<Fragment>
				<div />
				<div>
					Welcome to <Underline>more-space</Underline>! You can save up to{' '}
					<Color blue>{prettyBytes(this.totalPotential)}</Color>.
				</div>
				<div>
					<span>
						{this.doneSearching ? (
							<Color gray>
								({figures.arrowDown} {figures.arrowUp}) Move up / down
								{' '.repeat(8)}
								(space) Select item
								{' '.repeat(8)}
								(enter) Execute
							</Color>
						) : (
							<span>
								Press <Color gray>s</Color> to stop searching.
							</span>
						)}
					</span>
				</div>
				<div />
				<div />
				<List
					onCheck={key => {
						const {checked} = this.state;
						if (checked.includes(key)) {
							this.setState({
								checked: this.state.checked.filter(c => c !== key)
							});
						} else {
							this.setState({
								checked: this.state.checked.concat(key)
							});
						}
					}}
					onSubmit={() => {}}
					items={this.state.strategies.map((strategy, i) => ({
						disabled:
							!this.state.progress[strategy.key] ||
							!this.state.progress[strategy.key].final ||
							this.state.progress[strategy.key].err,
						checked: this.state.checked.includes(strategy.key),
						key: strategy.key,
						content: (
							<ListItem key={strategy.key} value={strategy.key}>
								<Strategy
									progress={this.state.progress[strategy.key]}
									strategy={strategy}
									onStart={() => {
										this.setState({
											progress: Object.assign({}, this.state.progress, {
												[strategy.key]: Object.assign(
													{},
													this.state.progress[strategy.key],
													{
														started: true
													}
												)
											})
										});
									}}
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
									mayStart={
										!this.state.stopped && this.finishedTasks.length + 1 >= i
									}
								/>
							</ListItem>
						)
					}))}
				/>
			</Fragment>
		);
	}
}

module.exports = Ui;
