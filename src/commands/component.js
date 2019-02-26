const generateComponent = require('../utils/generateComponent');

module.exports = {
	name: 'component',
	alias: ['comp'],
	description: '✨ Generates a React function component (presentational).',
	run: generateComponent
};
