import { log, isDebug } from '@lion66/utils'

function printErrLog(err, type) {
  if (isDebug()) {
    log.error(type, err)
  } else {
    log.error(type, err.message)
  }
}

process.on('uncaughtException', e => printErrLog(e, 'error')) // 监听处理常规报错throw Error
process.on('unhandledRejection', e => printErrLog(e, 'promise')) // 监听处理未捕获的 Promise 报错