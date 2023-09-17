import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { BillingStatus, CreditCard } from 'shared/types'
import { API } from 'services'

class BillingModel {
  billingStatus = BillingStatus.startup

  creditCardInfo: CreditCard = {}

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)
    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()
      const data = await API.user.get()
      this.creditCardInfo = data.credit_card
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async updateCreditCardInfo(cardInfo: CreditCard) {
    try {
      await API.user.updateCardInfo(cardInfo)
      this.fetch()
    } catch (err: any) {
      toast.error(err)
    }
  }
}

const model = new BillingModel()

export default model
