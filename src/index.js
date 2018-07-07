const {h, render} = require('ink');
const Ui = require('./ui');

module.exports = async () => {
	render(<Ui />);
};
