module.exports = {
	name: 'merlin',
	description: '🧙 Is a legendary and magical CLI tool for React development',
	run: async toolbox => {
		const { print } = toolbox;

		print.info('What would you like merlin to make for you!');
	}
};
