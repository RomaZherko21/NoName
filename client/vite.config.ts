import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ command, mode, ssrBuild }): any => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const { VITE_SERVER_URL, VITE_SERVER_API, VITE_CLIENT_HOST, VITE_CLIENT_PORT } = process.env

  if (command === 'serve') {
    return {
      plugins: [
        react(),
        viteTsconfigPaths(),
        checker({
          typescript: true
        }),
        eslint()
      ],
      server: {
        host: VITE_CLIENT_HOST,
        port: VITE_CLIENT_PORT,
        strictPort: true,
        open: true,
        proxy: {
          [String(VITE_SERVER_API)]: {
            target: VITE_SERVER_URL,
            changeOrigin: true,
            rewrite: (path: any) => path.replace(/^\/api/, '')
          }
        }
      }
    }
  } else {
    return {
      plugins: [
        react(),
        viteTsconfigPaths(),
        checker({
          typescript: true
        }),
        eslint()
      ]
    }
  }
})
