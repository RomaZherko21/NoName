import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { Connection, ConnectionStatus, Gender, Roles, User } from 'shared/types'
import LoadingModel from 'models/Loading'
import { API } from 'services'
import { PostsFilters } from 'pages/Posts/model'
import { Post } from 'shared/types'

export enum CONNECTION_OPTIONS {
  connections = 'connections',
  sentConnections = 'sentConnections',
  receivedConnections = 'receivedConnections',
}

class ProfileModel {
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

  connections: Connection[] = []
  posts: Post[] = []

  comment: string = ''
  editCommentId: number = 0
  isEditActive: boolean = false

  connectionStatus: CONNECTION_OPTIONS = CONNECTION_OPTIONS.connections

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  onConnectionStatusChange(status: CONNECTION_OPTIONS) {
    if (status === CONNECTION_OPTIONS.connections) {
      this.connectionStatus = CONNECTION_OPTIONS.connections
      this.fetchConnections({
        isSent: true,
        isReceived: true,
        status: ConnectionStatus.accept,
        hidden: true,
      })
    }
    if (status === CONNECTION_OPTIONS.sentConnections) {
      this.connectionStatus = CONNECTION_OPTIONS.sentConnections
      this.fetchConnections({ isSent: true, isReceived: false, hidden: true })
    }
    if (status === CONNECTION_OPTIONS.receivedConnections) {
      this.connectionStatus = CONNECTION_OPTIONS.receivedConnections
      this.fetchConnections({ isSent: false, isReceived: true, hidden: true })
    }
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

  async fetchConnections({
    isSent,
    isReceived,
    status = ConnectionStatus.pending,
    hidden = false,
  }: {
    isSent: boolean
    isReceived: boolean
    status?: ConnectionStatus
    hidden?: boolean
  }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.connections.get({
        status: status,
        isReceived: isReceived,
        isSent: isSent,
        user_id: this.id,
      })

      this.connections = data
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async fetchPosts({
    filters: searchParams,
    hidden = false,
  }: {
    filters?: PostsFilters
    hidden?: boolean
  }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.posts.list({
        searchParams: { ...searchParams, user_id: String(this.id) },
      })

      this.posts = data.posts
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async updateConnectionStatus({ id, status }: { id: number; status: ConnectionStatus }) {
    try {
      await API.connections.update(id, status)

      this.fetchConnections({ isSent: false, isReceived: true, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async removeConnectionRequest(id: number) {
    try {
      await API.connections.remove(id)

      this.fetchConnections({ isSent: true, isReceived: false, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async toggleLike({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    try {
      await API.posts.like(post_id)

      this.fetchPosts({ filters: filters, hidden: true })
    } catch (err: any) {
      toast.error(err)
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

export default new ProfileModel()
