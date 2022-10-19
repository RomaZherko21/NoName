export interface Book {
  id: number
  name: string
  description: string
  authors: Author[]
  genres: Genre[]
  publisher: string
  quantity: number
}

export interface Author {
  id: number
  name: string
  description: string
  surname: string
  date_of_birth: string
  date_of_death: string | null
}

export interface Genre {
  id: number
  name: string
}
