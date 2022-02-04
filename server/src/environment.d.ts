declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PROTOCOL: string
      SERVER_HOST: string
      SERVER_PORT: string

      CLIENT_PROTOCOL: string
      CLIENT_HOST: string
      CLIENT_PORT: string

      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_DIALECT: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
