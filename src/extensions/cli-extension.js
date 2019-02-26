// add your CLI-specific functionality here, which will then be accessible
// to your commands

module.exports = toolbox => {
	// enable this if you want to read configuration in from
	// the current folder's package.json (in a "merlin-cli" property),
	// merlin-cli.config.json, etc.
	// toolbox.config = {
	//   ...toolbox.config,
	//   ...toolbox.config.loadConfig(process.cwd(), "merlin-cli")
	// }
};
