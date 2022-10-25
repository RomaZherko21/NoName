const { REACT_APP_SERVER_API, REACT_APP_SERVER_GO_API } = process.env

export const NODE_API_URL = REACT_APP_SERVER_API
export const GO_API_URL = REACT_APP_SERVER_GO_API

export const GO_API_BOOK_IMAGES_URL = `${REACT_APP_SERVER_GO_API}/uploads/book`
export const GO_API_AUTHOR_IMAGES_URL = `${REACT_APP_SERVER_GO_API}/uploads/author`
