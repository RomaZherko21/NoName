export const ROUTES = {
  AUTH: 'auth',
  USER: 'user',
  SECURITY: 'security',
  USERS: 'users',
  POSTS: 'posts',
  GENRES: 'genres',
  COMMENTS: 'comments',
  CONNECTIONS: 'connections',
  CHAT: 'chat',
  FILES: 'files',
}

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type Permission = { [key in Role]: { [key: string]: string[] } }

export const permission: Permission = {
  admin: {
    [ROUTES.USERS]: ['get', 'post', 'put', 'delete'],
    [ROUTES.POSTS]: ['get', 'post', 'put', 'delete'],
    [ROUTES.CHAT]: ['get', 'post', 'put', 'delete'],
    [ROUTES.FILES]: ['get', 'post', 'put', 'delete'],
  },
  user: {
    [ROUTES.USERS]: ['get'],
    [ROUTES.POSTS]: ['get', 'post'],
    [ROUTES.CHAT]: ['get', 'post'],
    [ROUTES.FILES]: ['get', 'post', 'put'],
  },
}
