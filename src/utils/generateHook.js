const shouldGenerate = require('./shouldGenerate')

const generateHook = async (toolbox, hookName) => {
  const {
    print,
    template: { generate },
    parameters: { first: paramName },
    strings: { isBlank, camelCase, kebabCase }
  } = toolbox

  // validation
  if (!hookName && isBlank(paramName)) {
    print.info(`${toolbox.runtime.brand} hook <name>\n`)
    print.info('A name is required.')
    return
  }

  let tempName = hookName || paramName

  if (!tempName.startsWith('use')) {
    tempName = `use ${hookName || paramName}`
  }

  const name = camelCase(tempName)
  const filename = kebabCase(tempName)
  const folder = 'src/hooks'
  const target = `${folder}/${filename}.js`

  const { gen } = await shouldGenerate(target, toolbox)

  if (gen) {
    await generate({
      target,
      template: 'hook.ejs',
      props: { name }
    })
    print.info(`Generated hook ${print.colors.yellow(name)}`)
  }
}

module.exports = generateHook
