const shouldGenerate = require('./shouldGenerate')

const generateContainer = async (toolbox, containerName) => {
  const {
    parameters: {
      first: paramName,
      options: { p, path }
    },
    print,
    template: { generate },
    strings: { isBlank, pascalCase, kebabCase }
  } = toolbox

  // validation
  if (!containerName && isBlank(paramName)) {
    print.info(`${toolbox.runtime.brand} container <name>\n`)
    print.info('A name is required.')
    return
  }

  const tempName = containerName || paramName
  const name = pascalCase(tempName)
  const filename = kebabCase(tempName)
  const base = p || path
  const folder = `src/containers${base ? `/${base}` : ''}/${filename}`

  const { gen } = await shouldGenerate(folder, toolbox)

  if (gen) {
    await generate({
      target: `${folder}/index.jsx`,
      template: 'container.ejs',
      props: { name }
    })

    print.info(`Generated container ${print.colors.yellow(name)}`)
  }
}

module.exports = generateContainer
