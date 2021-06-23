const { program } = require("commander");
const path = require("path");

const pkgConfig = require(path.resolve(__dirname, "../package.json"));

program.version(pkgConfig.version);

// program.parse(process.argv);
var argv = process.argv.slice(2);
var mainCmd = argv[0];
var args = argv.slice(1);
// const options = program.opts();
// console.log(mainCmd);
if (mainCmd === "init") {
  const projectName = args[0];
  require("./commands/init")(projectName);
}

// init

// 模板放在 github 组织中
// 把项目代码下载下来
// 项目中有问题配置
// 根据配置询问一些问题
// 项目名 作者（读取npm） git用户名（读取git）

// version
