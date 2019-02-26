const generateSaga = require('../utils/generateSaga');

module.exports = {
	name: 'saga',
	alias: ['s'],
	description: '🕹 Generates sagas.',
	run: generateSaga
};
