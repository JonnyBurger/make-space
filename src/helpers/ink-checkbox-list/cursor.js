const {h} = require('ink');

function Cursor({cursorCharacter, isActive}) {
	const c =
		isActive === true
			? `${cursorCharacter} `
			: '\u00A0'.repeat(cursorCharacter.length + 1);
	return <span>{c}</span>;
}

module.exports = Cursor;
