import { makeAutoObservable } from 'mobx'

export enum BillingStatus {
  startup = 'startup',
  standard = 'standard',
  business = 'business',
}

class BillingModel {
  billingStatus = BillingStatus.startup

  constructor() {
    makeAutoObservable(this)
  }
}

export default new BillingModel()
