import { makeAutoObservable } from 'mobx'

import { BillingStatus } from 'shared/types'

class BillingModel {
  billingStatus = BillingStatus.startup

  constructor() {
    makeAutoObservable(this)
  }
}

const model = new BillingModel()

export default model
