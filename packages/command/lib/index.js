// 命令生成器 command builder
class Command {
  constructor(instance) {
    if (!instance) {
      throw Error("command instance can't be null!")
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    if (this.options.length) {
      this.options.forEach(opt => {
        cmd.option(...opt)
      })
    }
    cmd.action(this.action)
    cmd.hook('preAction', this.preAction)
    cmd.hook('postAction', this.postAction)
  }
  get command() {
    throw Error('command neets to be implemented!') // 子类没有实现command则报错
  }
  get description() {
    throw Error('description neets to be implemented!')
  }
  get options() {
    return []
  }
  get action() {
    throw Error('there is no preset action')
  }
  preAction() {}
  postAction() {}
}

export default Command