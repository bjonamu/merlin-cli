const generateContainer = require('../utils/generateContainer');

module.exports = {
	name: 'container',
	alias: ['cont'],
	description: '🦄 Generates a container component (Smart component).',
	run: generateContainer
};
