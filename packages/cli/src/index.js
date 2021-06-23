const { program } = require("commander");
const path = require("path");
const dev = require("../src/dev/index");
const pkgConfig = require(path.resolve(__dirname, "../package.json"));
const version = pkgConfig.version;

program.option("-v, --version", "output the version number").action(() => {
  console.log(`${pkgConfig.name} ${version}`);
});

program
  .command("init <component-lib-name>")
  .description("create a new component lib")
  .action((componentLibName) => {
    require("./init")(componentLibName);
  });

program
  .command("create <component-name>")
  .description("create a new component")
  .action((componentName) => {
    require("./create")(componentName);
  });

program
  .command("dev [framework]")
  .description(
    "serve a .ztc, .jsx or .vue file in development mode with zero config"
  )
  .action((framework = "") => {
    console.log("framework:", framework);
    if (framework === "") {
      dev();
    }
  });

program.parse(process.argv);

// 模板放在 github 组织中
// 把项目代码下载下来
// 项目中有问题配置
// 根据配置询问一些问题
// 项目名 作者（读取npm） git用户名（读取git）
