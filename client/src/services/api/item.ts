import fetch from 'services/fetch'
import { Item } from 'types/item'

export const create = (item: Item) => fetch.post<Item>('/item/create', item)
