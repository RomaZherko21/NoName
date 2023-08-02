import { makeAutoObservable } from 'mobx'

import { BillingStatus, CreditCard } from 'shared/types'
import { API } from 'services'
import { toast } from 'react-toastify'
class BillingModel {
  billingStatus = BillingStatus.startup

  card_number: string = ''
  name_on_card: string = ''
  valid_thru: string = ''
  cvv: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  async getBilling() {
    try {
      const data = await API.user.get()
      this.card_number = data.credit_card.card_number ?? ''
      this.name_on_card = data.credit_card.name_on_card ?? ''
      this.valid_thru = data.credit_card.valid_thru ?? ''
      this.cvv = data.credit_card.cvv ?? ''

    } catch (err: any) {
      toast.error(err)
    }


  }
  async putBilling(user: CreditCard) {
    try {
      await API.user.updateCardInfo(user)
    } catch (error) {

    }
  }

}

const model = new BillingModel()

export default model
