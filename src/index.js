const {h, render} = require('ink');
const Main = require('./components/main');

// We need a few more listeners than 10, one for each strategy.
// So slightly raise the listener limit to disable the memory leak
// warning but not too high.
process.stdin.setMaxListeners(20);

module.exports = async () => {
	global.unmount = render(<Main />);
};
