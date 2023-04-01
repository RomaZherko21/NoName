import { makeAutoObservable } from 'mobx'

import LoadingModel from 'models/Loading'
import PaginationModel from 'models/Pagination'

class TeamModel {
  users: any = [
    {
      name: 'Johnny',
      surname: 'Donald',
      middle_name: 'Johnson',
      role: 'admin'
    },
    { name: 'Bruce', surname: 'Jones', middle_name: 'Ingram', role: 'user' }
  ]

  loading: LoadingModel
  pagination: PaginationModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
    this.pagination = new PaginationModel()
  }
}

const model = new TeamModel()

export default model
