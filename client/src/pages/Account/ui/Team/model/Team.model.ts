import { makeAutoObservable } from 'mobx'

import { User } from 'shared/types'
import LoadingModel from 'models/Loading'
import PaginationModel from 'models/Pagination'

class TeamModel {
  private _users: any = [
    { name: 'Johnny', surname: 'Donald', middle_name: 'Johnson', role: 'admin' },
    { name: 'Bruce', surname: 'Jones', middle_name: 'Ingram', role: 'user' },
  ]

  loading: LoadingModel

  pagination: PaginationModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
    this.pagination = new PaginationModel()
  }

  set users(data: User[]) {
    this._users = data
  }

  get users() {
    return this._users
  }
}

export default new TeamModel()
