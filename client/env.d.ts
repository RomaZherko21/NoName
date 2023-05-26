/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_HOST: string
  readonly VITE_CLIENT_PORT: string

  readonly VITE_SERVER_API: string
  readonly VITE_SERVER_URL: string
  readonly VITE_SERVER_WS_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
