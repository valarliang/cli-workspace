// 命令生成器 command builder
class Command {
  constructor(instance) {
    if (!instance) {
      throw Error("command instance can't be null!");
    }
    this.program = instance;
    const cmd = this.program.command(this.command); // 定义指令
    // cmd.alias('i') // 定义指令别名
    cmd.description(this.description); // 给指令添加帮助描述
    if (this.options.length) {
      // 定义附加选项
      this.options.forEach((opt) => {
        cmd.option(...opt);
      });
    }
    cmd.action(this.action); // 指令执行的流程逻辑
    cmd.hook("preAction", this.preAction);
    cmd.hook("postAction", this.postAction);
  }
  get command() {
    throw Error("command neets to be implemented!"); // 子类没有实现command则报错
  }
  get description() {
    throw Error("description neets to be implemented!");
  }
  get options() {
    return [];
  }
  get action() {
    throw Error("there is no preset action");
  }
  preAction() {}
  postAction() {}
}

export default Command;
