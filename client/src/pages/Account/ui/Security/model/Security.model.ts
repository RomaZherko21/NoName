import { makeAutoObservable } from 'mobx'

import LoadingModel from 'models/Loading'
import PaginationModel from 'models/Pagination'

class SecurityModel {
  entrances: any = [
    {
      login_type: 'Credential login',
      date: '14:36 PM 02/08/2023',
      ip_address: '95.130.17.84',
      client: 'Chrome, Mac OS 10.15.7',
    },
    {
      login_type: 'Credential login',
      date: '12:16 PM 02/08/2023',
      ip_address: '95.130.17.84',
      client: 'Chrome, Mac OS 10.15.7',
    },
  ]

  loading: LoadingModel
  pagination: PaginationModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
    this.pagination = new PaginationModel()
  }
}

export default new SecurityModel()
