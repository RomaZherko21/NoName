/* eslint-disable  @typescript-eslint/naming-convention */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PROTOCOL: string
      SERVER_HOST: string
      SERVER_PORT_INNER: string

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
