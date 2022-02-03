const chalk = require('chalk')

class Log {
  constructor() {}

  positive(msg) {
    console.log(chalk.greenBright.bold(msg))
  }

  negative(msg) {
    console.log(chalk.red.bold(msg))
  }

  neutral(msg) {
    console.log(chalk.blueBright.bold(msg))
  }
}

module.exports = new Log()
