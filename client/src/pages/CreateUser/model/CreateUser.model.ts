import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { Gender, Roles } from 'shared/types'
import LoadingModel from 'models/Loading'

class CreateUserModel {
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async create(
    user: {
      name: string
      middle_name: string
      surname: string
      email: string
      tel_number: string
      role: Roles
      gender: Gender
      date_of_birth: string
      password: string
      confirmPassword: string
      avatar: any
    },
    onSuccess: () => void
  ) {
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
