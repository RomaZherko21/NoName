import { makeAutoObservable } from 'mobx'

import { BillingStatus } from 'shared/types'

class BillingModel {
  billingStatus = BillingStatus.startup

  constructor() {
    makeAutoObservable(this)
  }
}

export default new BillingModel()
