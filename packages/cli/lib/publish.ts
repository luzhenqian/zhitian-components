import childProcess from "child_process";

export default () => {
  console.log("publish start");
  // TODO 向知天后台发布数据
  childProcess.exec("npm publish");
};
