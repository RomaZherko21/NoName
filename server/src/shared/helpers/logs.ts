// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk')

class Log {
  positive(msg: string) {
    // eslint-disable-next-line no-console
    console.log(chalk.greenBright.bold(msg))
  }

  negative(msg: string) {
    // eslint-disable-next-line no-console
    console.log(chalk.red.bold(msg))
  }

  neutral(msg: string) {
    // eslint-disable-next-line no-console
    console.log(chalk.blueBright.bold(msg))
  }
}

export default new Log()
