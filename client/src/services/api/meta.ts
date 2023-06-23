import fetch from './fetch'

export const getMeta = async () =>
  await fetch.get<{ kanban_boards: { id: number; name: string }[] }>(`/meta`)
