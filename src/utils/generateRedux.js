const shouldGenerate = require('./shouldGenerate');

const generateComponent = async (toolbox, reduxName) => {
	const {
		print,
		template: { generate },
		parameters: { first: paramName },
		strings: { isBlank, pascalCase, kebabCase }
	} = toolbox;

	// validation
	if (!reduxName && isBlank(paramName)) {
		print.info(`${toolbox.runtime.brand} redux <name>\n`);
		print.info('A name is required.');
		return;
	}

	let name = pascalCase(reduxName || paramName);

	if (!name.endsWith('Redux')) {
		name = `${name}Redux`;
	}
	const filename = kebabCase(name);

	const target = `src/store/${filename}.js`;

	const { gen } = await shouldGenerate(target, toolbox);

	if (gen) {
		await generate({
			target,
			template: 'redux.ejs',
			props: { name }
		});

		print.info(`Generated redux ${print.colors.yellow(filename)}`);
	}
};

module.exports = generateComponent;
