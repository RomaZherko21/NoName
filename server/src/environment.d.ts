declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_API_PROTOCOL: string
      NODE_API_HOST: string
      NODE_API_PORT: string

      CLIENT_PROTOCOL: string
      CLIENT_HOST: string
      CLIENT_PORT: string

      MYSQL_DATABASE: string
      MYSQL_USERNAME: string
      MYSQL_PASSWORD: string
      MYSQL_HOST: string

      TOKEN_SECRET: string
      ACCESS_TOKEN_EXPIRED_TIME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
