import log from "./log.js"

export function isDebug () {
  return process.argv.some(i => ['--debug', '-d'].includes(i))
}

export function printErrLog(err, type) {
  if (isDebug()) {
    log.error(type, err)
  } else {
    log.error(type, err.message)
  }
}