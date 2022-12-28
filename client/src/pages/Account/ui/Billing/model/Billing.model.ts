import { makeAutoObservable } from 'mobx'

class BillingModel {
  planStatus = {
    isStartupActive: false,
    isStandardActive: false,
    isBusinessActive: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setIsStartupActive() {
    this.planStatus = {
      isStartupActive: true,
      isStandardActive: false,
      isBusinessActive: false,
    }
  }

  setIsStandardActive() {
    this.planStatus = {
      isStartupActive: false,
      isStandardActive: true,
      isBusinessActive: false,
    }
  }

  setIsBusinessActive() {
    this.planStatus = {
      isStartupActive: false,
      isStandardActive: false,
      isBusinessActive: true,
    }
  }
}

export default new BillingModel()
