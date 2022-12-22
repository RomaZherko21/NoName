import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import LoadingModel from 'models/Loading'
import { Book, Subscriber } from 'shared/types'

class SubscriberModel {
  id?: number

  name: string = ''

  surname: string = ''

  middle_name: string = ''

  date_of_birth: string = ''

  tel_number: string = ''

  subscriptions: Book[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch(id: number) {
    try {
      this.loading.begin()

      const data = await GO_API.subscribers.get(id)

      this.fromJSON(data.data.subscriber)

      this.subscriptions = data.data.books

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(subscriber: Subscriber) {
    this.id = subscriber.id
    this.name = subscriber.name
    this.surname = subscriber.surname
    this.middle_name = subscriber.middle_name
    this.date_of_birth = subscriber.date_of_birth
    this.tel_number = subscriber.tel_number
  }
}

export default new SubscriberModel()