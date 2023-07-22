import log from 'npmlog' // 日志打印库
import { isDebug } from './shared.js'

if (isDebug()) {
  log.level = 'verbose' // 打印等级为1000（不重要的冗余信息）
} else log.level = 'info' // info：log默认打印等级（2000）

log.heading = 'cli-0'
log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log