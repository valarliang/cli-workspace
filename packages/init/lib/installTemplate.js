import path from "node:path"
import { log } from '@lion66/utils'
import fse from 'fs-extra'
import ora from 'ora'

function copyFile(targetPath, template, installDir) {
  const src = path.resolve(targetPath, 'node_modules', template.npmName)
  const spinner = ora('正在拷贝文件...').start()
  fse.copySync(src, installDir)
  spinner.stop()
  log.success('模板拷贝成功')
}

export default function installTemplate(selectedTemplate, opts) {
  const { force } = opts
  const { targetPath, name, template } = selectedTemplate
  const installDir = path.resolve(`${process.cwd()}/${name}`)
  if (fse.pathExistsSync(installDir)) {
    if (force) {
      fse.removeSync(installDir)
      fse.ensureDirSync(installDir)
    } else {
      log.error(`当前目录已存在 ${installDir} 文件夹`)
      return
    }
  } else {
    fse.ensureDirSync(installDir)
  }
  copyFile(targetPath, template, installDir)
}