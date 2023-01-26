const { REACT_APP_SERVER_API, REACT_APP_SERVER_GO_API } = process.env

// export const NODE_API_URL = REACT_APP_SERVER_API
export const NODE_API_URL = 'http://localhost/api'
export const GO_API_URL = REACT_APP_SERVER_GO_API

export const NODE_API_USER_AVATAR_URL = `${NODE_API_URL}/uploads/avatar`
export const NODE_API_POST_IMAGES_URL = `${NODE_API_URL}/uploads/post`

export const GO_API_BOOK_IMAGES_URL = `${REACT_APP_SERVER_GO_API}/uploads/book`
export const GO_API_AUTHOR_IMAGES_URL = `${REACT_APP_SERVER_GO_API}/uploads/author`
