import createInitCommand from "@lion66/init";
import createCLI from "./createCLI.js";
import "./exception.js"; // 报错格式化

export default function (args) {
  const program = createCLI(); // 脚手架注册、全局选项、钩子等注册，返回cli实例
  createInitCommand(program); // 定义 init 指令
  program.parse(args); // 解析并执行用户输入
}
