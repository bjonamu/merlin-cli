const shouldGenerate = require('./shouldGenerate');

const generateComponent = async (toolbox, componentName) => {
	const {
		print,
		filesystem,
		template: { generate },
		parameters: { first: paramName },
		strings: { isBlank, pascalCase, kebabCase }
	} = toolbox;

	// validation
	if (!componentName && isBlank(paramName)) {
		print.info(`${toolbox.runtime.brand} component <name>\n`);
		print.info('Please provide a component name.');
		return;
	}

	const tempName = componentName || paramName;
	const name = pascalCase(tempName);
	const filename = kebabCase(tempName);
	const folder = `src/components/${filename}`;

	const { exists, overwrite } = await shouldGenerate(folder, toolbox);

	if (!exists || overwrite) {
		await generate({
			target: `${folder}/index.jsx`,
			template: 'component.ejs',
			props: { name }
		});

		await generate({
			template: 'story.ejs',
			target: `${folder}/${filename}.story.jsx`,
			props: { name }
		});

		if (!exists) {
			filesystem.append(
				'src/components/index.js',
				`export { default as ${name} } from './${filename}';\n`
			);
		}

		print.info(`Generated component ${print.colors.yellow(name)}`);
	}
};

module.exports = generateComponent;
