import { makeAutoObservable } from 'mobx'

import LoadingModel from 'models/Loading'
import { BillingStatus, CreditCard } from 'shared/types'
import { API } from 'services'
import { toast } from 'react-toastify'
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
      console.log(this.creditCardInfo.card_number)


    } catch (err: any) {
      toast.error(err)
    }
    finally {
      this.loading.end()
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
