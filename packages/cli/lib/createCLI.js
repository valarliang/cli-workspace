import path from 'node:path'
import { program } from 'commander' // cli构建框架
import { dirname } from 'dirname-filename-esm'
import fse from 'fs-extra' // ESM不能直接引用json文件，需用此库读取文件
import semver from 'semver' // 版本校验库
import chalk from 'chalk'
import { log } from '@lion66/utils'

const __dirname = dirname(import.meta)
const pkg = fse.readJsonSync(path.resolve(__dirname, '../package.json'))
const LOWEST_NODE_VERSION = '14.0.0'

function checkNodeVersion() {
  if (semver.lte(process.version, LOWEST_NODE_VERSION)) {
    log.verbose('node version', process.version)
    throw Error(chalk.red(`Node版本需>=${LOWEST_NODE_VERSION}`))
  }
}

function preAction() {
  checkNodeVersion() // node版本检查
}

export default function createCLI() {
  log.info('version', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启调试模式', false)
    .hook('preAction', preAction) // 执行命令前的钩子

  program.on('option:debug', () => { // 监听某个选项
    log.verbose('debug', 'launch debug mode')
  })
  program.on('command:*', param => { // 监听未知命令，自定义未知命令提示
    log.error('未知的命令:', param.join(' '))
  })
  
  return program
}