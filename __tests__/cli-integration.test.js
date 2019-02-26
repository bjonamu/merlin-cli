const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const cli = async cmd =>
	system.run('node ' + filesystem.path(src, 'bin', 'merlin-cli') + ` ${cmd}`);

test('outputs version', async () => {
	const output = await cli('--version');
	expect(output).toContain('0.0.1');
});

test('outputs help', async () => {
	const output = await cli('--help');
	expect(output).toContain('0.0.1');
});

test('generates component', async () => {
	const output = await cli('comp foo');

	expect(output).toContain('Generated component foo');

	// cleanup artifact
	filesystem.remove('src/components');
});

test('generates container', async () => {
	const output = await cli('cont foo');

	expect(output).toContain('Generated container foo');

	// cleanup artifact
	filesystem.remove('src/containers');
});
