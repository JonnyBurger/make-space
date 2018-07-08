const {h, Component, Fragment, Color} = require('ink');
const {sum, max} = require('lodash');
const Gradient = require('ink-gradient');
const Spinner = require('ink-spinner');
const figures = require('figures');
const prettyBytes = require('pretty-bytes');
const execute = require('../execute');
const strategies = require('../strategies');
const List = require('../helpers/ink-checkbox-list/list');
const ListItem = require('../helpers/ink-checkbox-list/list-item');
const Strategy = require('./strategy');

class Main extends Component {
	constructor() {
		super();
		this.state = {
			strategies,
			progress: {},
			stopped: false,
			checked: [],
			submitted: false
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
					{' '.repeat(2)}
					<Gradient name="teen">make-space</Gradient>
				</div>
				<div>
					{' '.repeat(2)}
					You can save up to{' '}
					{this.doneSearching ? null : (
						<Color blue>
							<Spinner />{' '}
						</Color>
					)}
					<Color blue>{prettyBytes(this.totalPotential)}</Color>.
				</div>

				<div>
					<span>
						{' '.repeat(2)}
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
					onSubmit={() => {
						global.unmount();
						execute(this.state.checked);
					}}
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

module.exports = Main;
