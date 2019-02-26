const shouldGenerate = require('./shouldGenerate');

const generateContainer = async (toolbox, layoutName) => {
	const {
		parameters,
		print,
		template: { generate },
		strings,
		filesystem
	} = toolbox;
	const { isBlank, pascalCase, kebabCase } = strings;
	const { first: paramName } = parameters;

	// validation
	if (!layoutName && isBlank(paramName)) {
		print.info(`${toolbox.runtime.brand} layout <name>\n`);
		print.info('A name is required.');
		return;
	}

	let name = pascalCase(layoutName || paramName);

	if (!name.endsWith('Layout')) {
		name = `${name}Layout`;
	}
	const filename = kebabCase(name);

	const target = `src/layouts/${filename}.jsx`;

	const { gen } = await shouldGenerate(target, toolbox);

	if (gen) {
		await generate({
			target,
			template: 'layout.ejs',
			props: { name }
		});

		print.info(`Generated layout ${print.colors.yellow(name)}`);
	}
};

module.exports = generateContainer;
