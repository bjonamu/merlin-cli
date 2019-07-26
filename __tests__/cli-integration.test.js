const { system, filesystem } = require('gluegun')
const tempy = require('tempy')
const stripANSI = require('strip-ansi')

const wd = filesystem.path(__dirname, '..')

jest.setTimeout(10 * 60 * 1000)

const originalDir = process.cwd()

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

const cli = async cmd =>
  system.run('node ' + filesystem.path(wd, 'bin', 'merlin-cli') + ` ${cmd}`)

test('generates component', async () => {
  const outputANSI = await cli('comp foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated component Foo')
})

test('generates container', async () => {
  const outputANSI = await cli('cont foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated container Foo')
})

test('generates hook', async () => {
  const outputANSI = await cli('hk foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated hook useFoo')
})

test('generates layout', async () => {
  const outputANSI = await cli('l foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated layout FooLayout')
})

test('generates redux', async () => {
  const outputANSI = await cli('r foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated redux FooRedux')
})

test('generates saga', async () => {
  const outputANSI = await cli('s foo')
  const output = stripANSI(outputANSI)
  expect(output).toContain('Generated saga FooSagas')
})
