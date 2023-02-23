export interface File {
  id: number
  name: string
  type: string
  size: string
  count?: number
  created_at: string
  is_favourite: boolean
  tags: string[]
}
