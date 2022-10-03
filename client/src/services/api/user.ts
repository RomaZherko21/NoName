import { fetch } from 'services'
import { User } from 'shared/types'

export const create = (user: User) => fetch.post<User>('/user/create', user)

export const update = (user: User) => fetch.post('/user/update', user)

export const selfUpdate = (user: any) => fetch.post('/user/selfUpdate', user)

export const remove = (id: number) => fetch.post('/user/remove', { id })

export const list = ({
  limit,
  offset,
  filters,
}: {
  limit: number
  offset: number
  filters?: any
}) =>
  fetch.post<{ users: User[]; count: number }>('/user/list', {
    filters,
    limit,
    offset,
  })

export const uploadPhoto = async (avatar: any, id: number) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  formData.append('id', String(id))
  return fetch.post<any>('/user/uploadPhoto', formData)
}

export const self = () => fetch.get<User>('/user/self')
