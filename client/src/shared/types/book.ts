export interface Book {
  id: number
  name: string
  description: string
  authors: Author[]
  genres: Genre[]
  publisher: string
  quantity: number
  year: number
}

export interface Author {
  id: number
  name: string
  description: string
  surname: string
  date_of_birth: string
  date_of_death: string
}

export interface Genre {
  id: number
  name: string
}

export interface Subscriber {
  id: number
  name: string
  surname: string
  middle_name: string
  date_of_birth: string
  tel_number: string
}

export interface Subscribtion {
  id: number
  subscriber_id: number
  book_id: number
  start: string
  finish: string
  is_active: boolean
}
