const { VITE_SERVER_API } = import.meta.env

export const API_URL = VITE_SERVER_API

export const NODE_API_USER_AVATAR_URL = `${API_URL}/uploads/avatar`
export const NODE_API_POST_IMAGES_URL = `${API_URL}/uploads/post`
