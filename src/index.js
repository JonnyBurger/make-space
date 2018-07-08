const {h, render} = require('ink');
const Main = require('./components/main');

module.exports = async () => {
	global.unmount = render(<Main />);
};
