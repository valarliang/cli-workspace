import path from 'node:path'
import fse from 'fs-extra'
import ora from 'ora'
import { execa } from 'execa'
import { log, printErrLog } from '@lion66/utils'

function makeCacheDir(targetPath) {
  const cacheDir = path.resolve(targetPath, 'node_modules') // 运行npm install需要有node_modules目录
  if (!fse.pathExistsSync(cacheDir)) {
    fse.ensureDirSync(cacheDir) // 目录不存在就创建（包括路径）
  }
}

async function download(targetPath, template) {
  const { npmName, version } = template
  const args = ['install', `${npmName}@${version}`]
  log.verbose('npm arguments', args)
  await execa('npm', args, { cwd: targetPath })
}

export default async function downloadTemplate(selectedTemplate) {
  const { targetPath, template } = selectedTemplate
  makeCacheDir(targetPath)
  const spinner = ora(`正在下载模板...`).start()
  try {
    await download(targetPath, template)
    spinner.stop()
    log.success(`下载成功（缓存目录：${targetPath}）`)
  } catch (error) {
    spinner.stop()
    printErrLog(error)
  }
}