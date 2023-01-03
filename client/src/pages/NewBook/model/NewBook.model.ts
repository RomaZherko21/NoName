import { makeAutoObservable } from 'mobx'

export const genres = [
  'Poetry',
  'Programming',
  'Psychology',
  'Science',
  'Classic',
  'Fantasy',
  'Science Fiction',
  'Dystopian',
  'Action & Adventure',
  'Mystery',
  'Horror',
  'Thriller & Suspense',
  'Historical Fiction ',
  'Romance',
  'Contemporary Fiction',
  'Fiction',
]
class NewBookModel {
  constructor() {
    makeAutoObservable(this)
  }
}

export default new NewBookModel()
