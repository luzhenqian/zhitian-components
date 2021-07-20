import chalk from "chalk";
import logSymbols from "log-symbols";

function error(message: string) {
  console.log(logSymbols.error, chalk.red(message));
}

function success(message: string) {
  console.log(logSymbols.success, chalk.green(message));
}

export { error, success };
export default { error, success };
