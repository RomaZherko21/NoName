import { makeAutoObservable } from 'mobx'

import { BillingStatus, CreditCard } from 'shared/types'
import { API } from 'services'
import { toast } from 'react-toastify'
class BillingModel {
  billingStatus = BillingStatus.startup


  creditCardInfo: CreditCard = {}


  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    try {
      const data = await API.user.get()
      this.creditCardInfo = data.credit_card


    } catch (err: any) {
      toast.error(err)
    }


  }
  async putBilling(user: CreditCard) {
    try {
      await API.user.updateCardInfo(user)
      this.fetch()
    } catch (err: any) {
      toast.error(err)
    }
  }

}

const model = new BillingModel()

export default model
