import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import LoadingModel from 'models/Loading'
import { Author } from 'shared/types'

class AuthorModel {
  id: number | undefined

  name: string = ''

  surname: string = ''

  description: string = ''

  date_of_birth: string = ''

  date_of_death: string | null = ''

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch(id: number) {
    try {
      this.loading.begin()

      const data = await GO_API.authors.get(id)

      this.fromJSON(data.author)

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(author: Author) {
    this.id = author.id
    this.name = author.name
    this.surname = author.surname
    this.description = author.description
    this.date_of_birth = author.date_of_birth
    this.date_of_death = author.date_of_death
  }
}

export default new AuthorModel()
