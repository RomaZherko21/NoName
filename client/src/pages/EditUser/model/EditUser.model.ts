import { makeAutoObservable } from 'mobx'

import LoadingModel from 'models/Loading'
import { API } from 'services'
import { User, Roles, Gender } from 'shared/types'

class EditUserModel {
  name: string = ''
  surname: string = ''
  middle_name: string = ''
  email: string = ''
  password?: string = ''
  confirmPassword?: string = ''
  role: Roles = Roles.user
  date_of_birth?: string = ''
  tel_number?: string = ''
  gender?: Gender = Gender.man
  avatar?: string = ''

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetchUser(id: number) {
    try {
      this.loading.begin()

      const data = await API.users.getById(id)

      this.fromJSON(data)

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async updateUser(user: User, id: number) {
    try {
      this.loading.begin()

      await API.users.update(user, id)

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(user: User) {
    this.name = user.name
    this.surname = user.surname
    this.middle_name = user.middle_name
    this.email = user.email
    this.password = user.password
    this.confirmPassword = user.confirmPassword
    this.role = user.role
    this.date_of_birth = user.date_of_birth
    this.tel_number = user.tel_number
    this.gender = user.gender
    this.avatar = user.avatar
  }
}

export default new EditUserModel()
