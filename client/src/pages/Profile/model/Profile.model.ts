import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { Connection, ConnectionStatus, Gender, Roles, User, Post, CreditCard } from 'shared/types'
import LoadingModel from 'models/Loading'
import { API } from 'services'
import { PostsFilters } from 'pages/Posts/model'

export enum ConnectionOptions {
  connections = 'connections',
  sentConnections = 'sentConnections',
  receivedConnections = 'receivedConnections'
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

  connectionStatus: ConnectionOptions = ConnectionOptions.connections

  loading: LoadingModel

  creditCardInfo: CreditCard = {} //!

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await API.user.get()

      this.creditCardInfo = data.credit_card
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }

  async updateCreditCardInfo(cardInfo: CreditCard) {
    try {
      await API.user.updateCardInfo(cardInfo)
      console.log(cardInfo)

      await this.fetchUser(this.id)
    } catch (err: any) {
      toast.error(err)
    }
  }

  onConnectionStatusChange(status: ConnectionOptions) {
    if (status === ConnectionOptions.connections) {
      this.connectionStatus = ConnectionOptions.connections
      this.fetchConnections({
        isSent: true,
        isReceived: true,
        status: ConnectionStatus.accept,
        hidden: true
      })
    }
    if (status === ConnectionOptions.sentConnections) {
      this.connectionStatus = ConnectionOptions.sentConnections
      this.fetchConnections({ isSent: true, isReceived: false, hidden: true })
    }
    if (status === ConnectionOptions.receivedConnections) {
      this.connectionStatus = ConnectionOptions.receivedConnections
      this.fetchConnections({ isSent: false, isReceived: true, hidden: true })
    }
  }

  async fetchUser(id: number) {
    try {
      this.loading.begin()

      const data = await API.users.getById(id)
      console.log(data)

      this.id = id

      this.fromJSON(data)
      console.log(data)
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
    hidden = false
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
        status,
        isReceived,
        isSent,
        userId: this.id
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
    hidden = false
  }: {
    filters?: PostsFilters
    hidden?: boolean
  }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.posts.list({
        searchParams: { ...searchParams, user_id: String(this.id) }
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

  async toggleLike({ postId, filters }: { postId: number; filters?: PostsFilters }) {
    try {
      await API.posts.like(postId)

      this.fetchPosts({ filters, hidden: true })
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
    this.id = user.basic.id ?? 0
    this.name = user.basic.name
    this.surname = user.basic.surname
    this.middle_name = user.basic.middle_name
    this.tel_number = user.basic.tel_number
    this.email = user.basic.email
    this.role = user.basic.role

    this.date_of_birth = user.meta.date_of_birth
    this.gender = user.meta.gender
    this.avatar = user.meta.avatar
    this.job_title = user.meta.job_title

    this.native_country = user.place.native_country
    this.native_city = user.place.native_city
    this.residence_country = user.place.residence_country
    this.residence_city = user.place.residence_city

    this.card_number = user.credit_card.card_number
    this.name_on_card = user.credit_card.name_on_card
    this.valid_thru = user.credit_card.valid_thru
    this.cvv = user.credit_card.cvv
  }
}

const model = new ProfileModel()

export default model
