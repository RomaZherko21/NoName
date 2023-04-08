/*eslint-disable no-console, unicorn/no-hex-escape, unicorn/escape-case*/
class Log {
  positive(msg: string) {
    const blue = '\x1b[34m%s\x1b[0m'
    console.log(blue, msg)
  }

  negative(msg: string) {
    const red = '\x1b[31m%s\x1b[0m'
    console.log(red, msg)
  }

  neutral(msg: string) {
    const yellow = '\x1b[33m%s\x1b[0m'
    console.log(yellow, msg)
  }
}

export default new Log()
