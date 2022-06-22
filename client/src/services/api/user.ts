import { fetch } from 'services'
import { TUserMeta } from 'shared/types'

export const create = (user: TUserMeta) =>
  fetch.post<TUserMeta>('/user/create', user)

export const update = (user: TUserMeta) => fetch.post('/user/update', user)

export const remove = (id: number) => fetch.post('/user/remove', { id })

export const list = (limit: number, offset: number) =>
  fetch.post<{ users: TUserMeta[]; count: number }>('/user/list', {
    limit,
    offset,
  })

export const uploadPhoto = async (avatar: any, id: number) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  formData.append('id', String(id))
  return fetch.post<any>('/user/uploadPhoto', formData)
}

export const self = () => fetch.get<TUserMeta>('/user/self')
