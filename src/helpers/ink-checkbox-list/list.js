const {h, Component} = require('ink');
const figures = require('figures');
const CheckBox = require('./check-box');
const Cursor = require('./cursor');

const stdin = process.stdin;

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cursor: 0
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	get cursor() {
		return this.state.cursor;
	}

	componentDidMount() {
		stdin.on('keypress', this.handleKeyPress);
	}

	componentWillUnMount() {
		stdin.removeListener('keypress', this.handleKeyPress);
	}

	moveUp() {
		const {cursor} = this.state;
		const {length} = this.props.items;
		if (cursor - 1 < 0) {
			this.setState({cursor: length - 1});
			return;
		}
		this.setState({cursor: cursor - 1});
	}

	moveDown() {
		const {cursor} = this.state;
		const {length} = this.props.items;
		if (cursor + 1 >= length) {
			this.setState({cursor: 0});
			return;
		}
		this.setState({cursor: cursor + 1});
	}

	toggleCurrentCursor() {
		const {cursor} = this.state;
		if (this.props.items[cursor].disabled) {
			return;
		}
		this.props.onCheck(this.props.items[cursor].key);
	}

	submit() {
		this.setState({cursor: -1});
		stdin.removeListener('keypress', this.handleKeyPress);
		if (this.props.onSubmit) {
			this.props.onSubmit();
		}
	}

	handleKeyPress(ch, key) {
		const pressedKey = key.name;
		switch (pressedKey) {
			case 'up': {
				this.moveUp();
				break;
			}
			case 'down': {
				this.moveDown();
				break;
			}
			case 'space': {
				this.toggleCurrentCursor();
				break;
			}
			case 'return': {
				this.submit();
				break;
			}
			default: {
				// Do nothing
				break;
			}
		}
	}

	render(props) {
		const {cursor} = this.state;
		const {cursorCharacter, checkedCharacter, uncheckedCharacter} = props;
		return (
			<span>
				{props.items.map((item, i) => {
					return (
						<span key={item.key}>
							<Cursor
								isActive={cursor === i}
								cursorCharacter={cursorCharacter}
							/>
							<CheckBox
								isChecked={item.checked}
								checkedCharacter={checkedCharacter}
								uncheckedCharacter={uncheckedCharacter}
								disabled={item.disabled}
							/>
							{item.content}
						</span>
					);
				})}
			</span>
		);
	}
}

List.defaultProps = {
	cursorCharacter: figures.pointer,
	checkedCharacter: figures.radioOn,
	uncheckedCharacter: figures.radioOff
};

module.exports = List;
