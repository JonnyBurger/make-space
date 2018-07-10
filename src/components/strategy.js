const {h, Component, Color, Fragment} = require('ink');
const Spinner = require('ink-spinner');
const {padStart, padEnd} = require('lodash');
const prettyBytes = require('pretty-bytes');

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
				<Color
					gray={!this.progress.final || this.progress.err}
					blue={this.progress.final && !this.progress.err}
				>
					{padStart(prettyBytes(this.progress.size || 0), 9, ' ')}
				</Color>
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
						<Color gray>$</Color>{' '}
						<Color dim>{this.props.strategy.command.substr(0, 70)}</Color>
					</span>
				)}
			</Fragment>
		);
	}
}

module.exports = Strategy;
