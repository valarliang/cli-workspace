import Command from '@lion66/command'
import { log } from '@lion66/utils'

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
    ]
  }
  action(name, opts) {
    return log.verbose('action log:', name, opts)
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

export default Init