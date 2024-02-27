import path from 'node:path';
import { homedir } from 'node:os'; // 获取当前系统用户的主目录方法
import ora from 'ora'
import { log, enquiry, getLatestVersion, request } from "@lion66/utils";

export const ADD_TYPE = [
  {
    name: '项目',
    value: 'project',
  },
  {
    name: '页面',
    value: 'page',
  }
]
const TEMP_HOME = '.cli-template'

async function getTemplates() {
  try {
    const data = await request({
      url: '/project',
      method: 'get',
    })
    log.verbose('Templates:', data)
    return data
  } catch (error) {
    log.error(error)
    return null
  }
}
function getAddType() {
  return enquiry({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    default: 'project',
  })
}
function getAddName() {
  return enquiry({
    type: 'input',
    message: '请输入项目名称',
    default: '',
    validate(value) {
      return value ? true : '项目名称不能为空'
    }
  })
}
function getAddTemplate(choices) {
  return enquiry({
    choices,
    message: '请选择初始化模版',
  })
}
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'templates')
}

export default async function createTemplate(name, opts) {
  const ADD_TEMPLATE = await getTemplates()
  if (!ADD_TEMPLATE) throw Error('项目模板不存在！')
  let { type, template } = opts
  if (!type) type = await getAddType() // 创建类型
  if (!ADD_TYPE.some(t => t.value === type)) throw Error(`创建类型 ${type} 不存在！`)
  log.verbose('addType', type)
  if (type === 'project') {
    if (!name) {
      name = await getAddName() // 命令参数未定义名称则需输入项目名称
      log.verbose('name', name)
    }
    if (!template) template = await getAddTemplate(ADD_TEMPLATE) // 选择的模板
    log.verbose('addTemplate', template)
    const selectedTemplate = ADD_TEMPLATE.find(t => t.value === template)
    if (!selectedTemplate) throw Error(`选择的模板 ${template} 不存在！`)
    log.verbose('selectedTemplate', selectedTemplate)
    const spinner = ora('获取最新版本号').start()
    const latestVersion = await getLatestVersion(selectedTemplate.npmName)
    spinner.stop()
    log.info(template + '最新版本', latestVersion)
    selectedTemplate.version = latestVersion // 获取最新版本
    const targetPath = makeTargetPath() // 设置缓存模板的路径（/Users/leo66/.cli-template/templates）
    return {
      type,
      name,
      template: selectedTemplate,
      targetPath,
    }
  }
}