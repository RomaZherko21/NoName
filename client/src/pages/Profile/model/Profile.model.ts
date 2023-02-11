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

  email: string = ''
  role: Roles = Roles.user
  date_of_birth?: string = ''
  tel_number?: string = ''
  gender?: Gender = Gender.man
  avatar?: string = ''
  job_title?: string = ''

  native_country?: string = ''
  native_city?: string = ''
  residence_country?: string = ''
  residence_city?: string = ''

  card_number?: string = ''
  name_on_card?: string = ''
  valid_thru?: string = ''
  cvv?: string = ''

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
    this.role = user.role
    this.date_of_birth = user.date_of_birth
    this.tel_number = user.tel_number
    this.gender = user.gender
    this.avatar = user.avatar
    this.job_title = user.job_title

    this.native_country = user.native_country
    this.native_city = user.native_city
    this.residence_country = user.residence_country
    this.residence_city = user.residence_city

    this.card_number = user.card_number
    this.name_on_card = user.name_on_card
    this.valid_thru = user.valid_thru
    this.cvv = user.cvv
  }
}

export default new ProfileModel()
