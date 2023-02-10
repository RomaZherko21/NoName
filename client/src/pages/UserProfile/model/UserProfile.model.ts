import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { API } from 'services'
import { User, Roles, Gender } from 'shared/types'

class UserProfileModel {
  id: number = 0
  name: string = ''
  surname: string = ''
  middle_name: string = ''
  password?: string = ''
  confirmPassword?: string = ''

  email: string = ''
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

      this.id = id

      this.fromJSON(data)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async removeById() {
    try {
      this.loading.begin()

      await API.users.remove(this.id)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
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

export default new UserProfileModel()
