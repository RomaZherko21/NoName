import { makeAutoObservable } from 'mobx'

import { RootStore } from 'stores/Root'

enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

class NotificationModel {
  readonly rootStore: RootStore

  isOpen: boolean = false

  message: string = ''

  severity: keyof typeof Severity = 'warning'

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setError(msg: string, severity: keyof typeof Severity) {
    this.isOpen = true
    this.message = msg
    this.severity = severity
    setTimeout(() => {
      this.isOpen = false
      this.message = ''
      this.severity = 'warning'
    }, 5000)
  }
}

export default NotificationModel
