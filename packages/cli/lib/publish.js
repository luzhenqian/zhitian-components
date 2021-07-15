module.exports = () => {
  // TODO 向知天后台发布数据
  require("child_process").exec("npm publish");
};
