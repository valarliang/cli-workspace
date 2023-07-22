#!/usr/bin/env node

import importLocal from 'import-local'
import { log } from '@lion66/utils'
import entry from '../lib/index.js'
import { filename } from 'dirname-filename-esm'

const __filename = filename(import.meta)

if (importLocal(__filename)) { // 项目本地是否安装有此库（作为项目依赖），有则去调用项目下的当前库
  log.info('cli', '使用本地版本')
} else {
  entry(process.argv) // 运行当前lib
}

