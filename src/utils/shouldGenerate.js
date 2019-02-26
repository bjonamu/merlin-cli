module.exports = async (target, context) => {
	const exists = context.filesystem.exists(target);
	if (!exists) return { exists, gen: true };
	const overwrite = await context.prompt.confirm(`overwrite ${target}`);
	return { exists, overwrite, gen: !exists || overwrite };
};
