import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { UserBasic, UserMeta, UserPassword } from 'shared/types'
import LoadingModel from 'models/Loading'

class CreateUserModel {
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async create(user: UserBasic & UserMeta & UserPassword, onSuccess: () => void) {
    try {
      this.loading.begin()

      await API.users.create(user)

      onSuccess()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }
}

export default new CreateUserModel()
