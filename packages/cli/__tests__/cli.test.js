import path from 'node:path'
import { execa } from 'execa'

const CLI = path.join(__dirname, '../bin/cli.js')
const bin = () => (...args) => execa(CLI, args)

// 测试执行未知命令
test('run error command', async () => {
  const { stderr } = await bin()('test')
  expect(stderr).toContain('未知的命令: test')
})
// 测试help命令不报错
test('should not throw error when use --help', async () => {
  let err = null
  try {
    await bin()('--help')
  } catch(e) {
    err = e
  }
  expect(err).toBe(null)
})
// 测试version是否正确
test('show correct version', async () => {
  const { stdout } = await bin()('-V')
  expect(stdout).toContain(require('../package.json').version)
})
// 测试debug模式是否正确开启
test('show correct version', async () => {
  let err = null
  try {
    await bin()('-d') // cli -d 无命令commander会抛出错误
  } catch(e) {
    err = e
  }
  expect(err.message).toContain('launch debug mode')
})
