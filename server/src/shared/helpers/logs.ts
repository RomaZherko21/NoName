/*eslint-disable no-console*/
import chalk from 'chalk'

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
