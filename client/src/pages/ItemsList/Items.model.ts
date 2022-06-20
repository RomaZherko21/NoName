import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'
import { Item } from 'types'
import rootStore from 'stores/Root'

class ItemsModel {
  private _items: Item[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set items(data: Item[]) {
    this._items = data
  }

  get items() {
    return this._items
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await API.item.list(
        this.pagination.perPage,
        this.pagination.offset,
        rootStore.user.id
      )

      this.items = data.items
      this.pagination.count = data.count

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async create(item: {
    name: string
    description: string
    image: string
    userId: number
  }) {
    try {
      this.loading.begin()

      const createdAt = Date.now()

      await API.item.create({ ...item, createdAt })
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async remove(id: number) {
    try {
      this.loading.begin()

      console.log('fucck', id)
      await API.item.remove(id)
      this.fetch()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new ItemsModel()
