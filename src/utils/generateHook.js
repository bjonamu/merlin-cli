const shouldGenerate = require('./shouldGenerate');

const generateHook = async (toolbox, hookName) => {
	const {
		print,
		template: { generate },
		parameters: { first: paramName },
		strings: { isBlank, pascalCase, kebabCase }
	} = toolbox;

	// validation
	if (!hookName && isBlank(paramName)) {
		print.info(`${toolbox.runtime.brand} hook <name>\n`);
		print.info('A name is required.');
		return;
	}

	const tempName = hookName || paramName;
	const name = pascalCase(tempName);
	const filename = kebabCase(tempName);
	const folder = 'src/hooks';
	const target = `${folder}/use-${filename}.js`;

	const { gen } = await shouldGenerate(folder, toolbox);

	if (gen) {
		await generate({
			target,
			template: 'hook.ejs',
			props: { name }
		});
		print.info(`Generated hook ${print.colors.yellow(filename)}`);
	}
};

module.exports = generateHook;
