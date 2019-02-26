const generateComponent = require('../utils/generateComponent');
const generateContainer = require('../utils/generateContainer');
const generateRedux = require('../utils/generateRedux');
const generateSaga = require('../utils/generateSaga');

module.exports = {
	name: 'generate',
	alias: ['g'],
	description:
    '🔮 Generates any combo of components, containers, redux & sagas.',
	run: async toolbox => {
		const { parameters, print, strings } = toolbox;
		const { array: paramsArray } = parameters;
		const { isBlank } = strings;

		const validCommands = [
			'component',
			'comp',
			'container',
			'cont',
			'r',
			'redux',
			's',
			'saga'
		];

		const numberOfParameters = paramsArray.length;
		const lastIndex = numberOfParameters - 1;
		const name = paramsArray[lastIndex];

		// validation
		if (isBlank(name) || validCommands.indexOf(name) !== -1) {
			print.info('Please enter a valid name');
			return;
		}

		const alreadyRan = {};

		for (let i = 0; i < lastIndex; i++) {
			switch (paramsArray[i]) {
			case 'comp':
			case 'component':
				if (!alreadyRan.comp) {
					await generateComponent(toolbox, name);
					alreadyRan.comp = true;
				}
				break;
			case 'cont':
			case 'container':
				if (!alreadyRan.cont) {
					await generateContainer(toolbox, name);
					alreadyRan.cont = true;
				}
				break;
			case 'r':
			case 'redux':
				if (!alreadyRan.redux) {
					await generateRedux(toolbox, name);
					alreadyRan.redux = true;
				}
				break;
			case 's':
			case 'saga':
				if (!alreadyRan.saga) {
					await generateSaga(toolbox, name);
					alreadyRan.saga = true;
				}
				break;
			default:
				print.error(
					`${print.colors.yellow(paramsArray[i])} is not a valid command.`
				);
				break;
			}
		}
	}
};
