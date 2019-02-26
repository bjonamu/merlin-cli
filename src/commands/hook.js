const generateHook = require('../utils/generateHook');

module.exports = {
	name: 'hook',
	alias: ['hk'],
	description: '🎣 Generates a custom React hook.',
	run: generateHook
};
