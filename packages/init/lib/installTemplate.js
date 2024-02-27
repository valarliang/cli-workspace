import path from "node:path"
import { log, enquiry } from '@lion66/utils'
import fse from 'fs-extra'
import ora from 'ora'

function shouldOverwrite() {
  return enquiry({
    type: 'confirm',
    message: '是否强制写入模板？',
    default: true,
  })
}

function copyFile(targetPath, template, installDir) {
  const src = path.resolve(targetPath, 'node_modules', template.npmName, 'template')
  const spinner = ora('正在拷贝文件...').start()
  fse.copySync(src, installDir)
  spinner.stop()
  log.success('模板创建成功')
}

export default async function installTemplate(selectedTemplate, opts) {
  const { force } = opts
  const { targetPath, name, template } = selectedTemplate
  const installDir = path.resolve(`${process.cwd()}/${name}`)
  if (fse.pathExistsSync(installDir)) {
    if (force) fse.removeSync(installDir)
    else {
      log.error(`当前目录已存在 ${name} 文件夹`)
      const overwrite = await shouldOverwrite()
      if (overwrite) fse.removeSync(installDir)
      else return
    }
  }
  fse.ensureDirSync(installDir)
  copyFile(targetPath, template, installDir)
}