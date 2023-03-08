import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { API } from 'services'
import { User, Roles, Gender, BasicUserInfo, MetaUserInfo, UserCredentials } from 'shared/types'

class EditUserModel {
  id: number = 0
  name: string = ''
  surname: string = ''
  middle_name: string = ''

  email: string = ''
  role: Roles = Roles.user
  date_of_birth?: string = ''
  tel_number?: string = ''
  gender?: Gender = Gender.man
  avatar?: string = ''

  password?: string = ''
  confirmPassword?: string = ''

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
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async updateUser(user: BasicUserInfo & MetaUserInfo & UserCredentials, id: number) {
    try {
      this.loading.begin()

      await API.users.update(user, id)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  private fromJSON(user: User) {
    this.id = user.basic.id ?? 0
    this.name = user.basic.name
    this.surname = user.basic.surname
    this.middle_name = user.basic.middle_name
    this.email = user.basic.email
    this.role = user.basic.role
    this.tel_number = user.basic.tel_number

    this.date_of_birth = user.meta.date_of_birth
    this.gender = user.meta.gender
    this.avatar = user.meta.avatar

    this.password = user.password
    this.confirmPassword = user.confirmPassword
  }
}

const model = new EditUserModel()

export default model
