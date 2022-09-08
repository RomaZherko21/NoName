import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { TCrypto } from 'shared/types'

class CryptoModel {
  private _items: TCrypto[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set items(data: TCrypto[]) {
    this._items = data
  }

  get items() {
    return this._items
  }

  async fetch() {
    try {
      this.loading.begin()

      const { data } = await API.crypto.list()

      console.log(data.data)

      this._items = data.data

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new CryptoModel()
