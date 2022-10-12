/*eslint-disable no-console*/
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk')

class Log {
  positive(msg: string) {
    console.log(chalk.greenBright.bold(msg))
  }

  negative(msg: string) {
    console.log(chalk.red.bold(msg))
  }

  neutral(msg: string) {
    console.log(chalk.blueBright.bold(msg))
  }
}

export default new Log()
