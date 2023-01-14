import { makeAutoObservable } from 'mobx'

import { RootStore } from 'stores'
import { NODE_API } from 'services'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'
import { Gender, Roles, User } from 'shared/types'

import FileModel from './File'

class UserModel {
  readonly rootStore: typeof RootStore

  id: number = 0

  name: string = ''

  surname: string = ''

  middle_name: string = ''

  tel_number: string = ''

  gender: Gender = Gender.man

  date_of_birth: string = ''

  email: string = ''

  avatar: FileModel

  role: Roles = Roles.user

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.avatar = new FileModel()
    this.init()
  }

  async init() {
    const {
      id = 0,
      name,
      surname,
      middle_name,
      email,
      gender = Gender.man,
      tel_number = '',
      date_of_birth = '',
      role,
      avatar = '',
    } = await NODE_API.user.get()

    this.rootStore.authorization.isAuthorized = true

    this.id = id
    this.name = name
    this.surname = surname
    this.middle_name = middle_name
    this.date_of_birth = date_of_birth
    this.tel_number = tel_number
    this.gender = gender
    this.email = email
    this.role = role
    this.avatar.url = avatar
  }

  getPhotoUrl() {
    return `${NODE_API_USER_AVATAR_URL}/${this.avatar.url}`
  }

  async uploadPhoto(file: File) {
    this.rootStore.loading.begin()
    try {
      const { url } = await NODE_API.user.uploadPhoto(file)
      this.avatar.setFileData(file, url)
      this.rootStore.loading.end()
    } catch {
      this.rootStore.loading.end()
    }
  }

  async update(values: User) {
    this.rootStore.loading.begin()
    try {
      await NODE_API.user.update(values)
      await this.init()
      this.rootStore.loading.end()
    } catch {
      this.rootStore.loading.end()
    }
  }

  async remove() {
    this.rootStore.loading.begin()
    try {
      await NODE_API.user.remove()
      this.rootStore.authorization.unauthorize()
      this.rootStore.loading.end()
    } catch {
      this.rootStore.loading.end()
    }
  }
}

export default UserModel
