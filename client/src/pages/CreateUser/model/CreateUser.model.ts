import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { BasicUserInfo, MetaUserInfo, UserCredentials } from 'shared/types'
import LoadingModel from 'models/Loading'

class CreateUserModel {
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async create(user: BasicUserInfo & MetaUserInfo & UserCredentials, onSuccess: () => void) {
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

const model = new CreateUserModel()

export default model
