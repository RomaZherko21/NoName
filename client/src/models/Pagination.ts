import { makeAutoObservable } from 'mobx'

class PaginationModel {
  totalCount: number = 0

  limit: number = 10

  currentPage: number = 0

  perPageArr: number[] = [2, 10, 15, 20]

  constructor() {
    makeAutoObservable(this)
  }

  get offset() {
    return this.limit * this.currentPage
  }
}

export default PaginationModel
