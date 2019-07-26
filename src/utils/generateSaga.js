const shouldGenerate = require('./shouldGenerate')

const generateSaga = async (toolbox, sagaName) => {
  const {
    parameters: { first: paramName },
    print,
    template: { generate },
    strings: { isBlank, pascalCase, kebabCase }
  } = toolbox

  // validation
  if (!sagaName && isBlank(paramName)) {
    print.info(`${toolbox.runtime.brand} saga <name>\n`)
    print.info('A name is required.')
    return
  }

  let name = pascalCase(sagaName || paramName)

  if (!name.endsWith('Sagas')) {
    name = `${name}Sagas`
  }

  const filename = kebabCase(name)

  const target = `src/sagas/${filename}.js`

  const { gen } = await shouldGenerate(target, toolbox)

  if (gen) {
    await generate({
      target,
      template: 'saga.ejs',
      props: { name, filename: filename.replace('saga', 'redux') }
    })

    print.info(`Generated saga ${print.colors.yellow(name)}`)
  }
}

module.exports = generateSaga
