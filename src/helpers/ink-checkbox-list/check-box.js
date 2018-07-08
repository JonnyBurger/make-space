const {h, Color} = require('ink');

function CheckBox({checkedCharacter, uncheckedCharacter, isChecked, disabled}) {
	const mark = isChecked === true ? checkedCharacter : uncheckedCharacter;
	return (
		<Color blue={!disabled} gray={Boolean(disabled)}>{` ${mark}  `}</Color>
	);
}

module.exports = CheckBox;
