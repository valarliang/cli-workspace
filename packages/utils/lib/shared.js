export function isDebug () {
  return process.argv.some(i => ['--debug', '-d'].includes(i))
}