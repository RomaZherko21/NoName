const { VITE_SERVER_API } = import.meta.env

export const API_URL = VITE_SERVER_API

export const API_USER_AVATAR_URL = `${API_URL}/uploads/avatar`
export const API_POST_IMAGES_URL = `${API_URL}/uploads/post`
