import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'

export enum AccessRoute {
  users = 'users',
  posts = 'posts',
  chat = 'chat',
  files = 'files',
  kanban = 'kanban',
}

export enum Operation {
  get = 'get',
  create = 'post',
  update = 'put',
  delete = 'delete',
}

class PermissionsModel {
  _permissions: {
    [key: string]: string[]
  } = {}

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  async init() {
    try {
      const data = await API.user.getPermissions()

      this._permissions = data
    } catch (err: any) {
      toast.error(err)
    }
  }

  hasAccess(operation: Operation, route: AccessRoute) {
    return this._permissions?.[route]?.includes(operation)
  }

  get getUsers() {
    return this._permissions?.[AccessRoute.users]?.includes(Operation.get)
  }

  get createUsers() {
    return this._permissions?.[AccessRoute.users]?.includes(Operation.create)
  }

  get updateUsers() {
    return this._permissions?.[AccessRoute.users]?.includes(Operation.update)
  }

  get deleteUsers() {
    return this._permissions?.[AccessRoute.users]?.includes(Operation.delete)
  }

  get getPosts() {
    return this._permissions?.[AccessRoute.posts]?.includes(Operation.get)
  }

  get createPosts() {
    return this._permissions?.[AccessRoute.posts]?.includes(Operation.create)
  }

  get updatePosts() {
    return this._permissions?.[AccessRoute.posts]?.includes(Operation.update)
  }

  get deletePosts() {
    return this._permissions?.[AccessRoute.posts]?.includes(Operation.delete)
  }

  get getChat() {
    return this._permissions?.[AccessRoute.chat]?.includes(Operation.get)
  }

  get createChat() {
    return this._permissions?.[AccessRoute.chat]?.includes(Operation.create)
  }

  get updateChat() {
    return this._permissions?.[AccessRoute.chat]?.includes(Operation.update)
  }

  get deleteChat() {
    return this._permissions?.[AccessRoute.chat]?.includes(Operation.delete)
  }

  get getFiles() {
    return this._permissions?.[AccessRoute.files]?.includes(Operation.get)
  }

  get createFiles() {
    return this._permissions?.[AccessRoute.files]?.includes(Operation.create)
  }

  get updateFiles() {
    return this._permissions?.[AccessRoute.files]?.includes(Operation.update)
  }

  get deleteFiles() {
    return this._permissions?.[AccessRoute.files]?.includes(Operation.delete)
  }

  get getKanban() {
    return this._permissions?.[AccessRoute.kanban]?.includes(Operation.get)
  }

  get createKanban() {
    return this._permissions?.[AccessRoute.kanban]?.includes(Operation.create)
  }

  get updateKanban() {
    return this._permissions?.[AccessRoute.kanban]?.includes(Operation.update)
  }

  get deleteKanban() {
    return this._permissions?.[AccessRoute.kanban]?.includes(Operation.delete)
  }
}

export default PermissionsModel
