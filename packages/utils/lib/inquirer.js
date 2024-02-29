import inquirer from "inquirer";

export function enquiry(options) {
  const question = {
    type: "list", // 提示类型（list：选项列表）
    name: "name", // 用户answer对象的键
    // message, // 问题
    // default, // 默认值
    // choices, // 提供的选项
    require: true,
    // validate, // 校验用户输入的函数
    // ...
  };
  return inquirer
    .prompt({ ...question, ...options })
    .then((answer) => answer.name);
}
