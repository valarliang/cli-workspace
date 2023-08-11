import { printErrLog } from '@lion66/utils'

process.on('uncaughtException', e => printErrLog(e, 'error')) // 监听处理常规报错throw Error
process.on('unhandledRejection', e => printErrLog(e, 'promise')) // 监听处理未捕获的 Promise 报错