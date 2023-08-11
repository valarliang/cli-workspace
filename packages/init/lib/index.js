import Command from '@lion66/command'
import { log } from '@lion66/utils'
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'
import { ADD_TEMPLATE, ADD_TYPE } from './createTemplate.js'

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }
  get description() {
    return 'init project'
  }
  get options() {
    return [
      ['-f --force', '是否强制更新', false],
      ['-t --type <type>', `创建类型(${ADD_TYPE.map(t => t.value)})`],
      ['-tpl --template <template>', `选择模板(${ADD_TEMPLATE.map(t => t.value)})`],
    ]
  }
  async action(name, opts) {
    const selectedTemplate = await createTemplate(name, opts) // 选择模板，生成项目信息
    log.verbose('selectedTemplate', selectedTemplate)
    await downloadTemplate(selectedTemplate) // 通过npm下载模板到缓存目录
    await installTemplate(selectedTemplate, opts) // 从缓存目录拷贝到开发目录
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

export default Init