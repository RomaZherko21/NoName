import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig(({ command, mode, ssrBuild }): any => {
  if (command === 'serve') {
    return {
      plugins: [
        react(),
        viteTsconfigPaths(),
        checker({
          typescript: true,
        }),
      ],
      server: {
        host: 'localhost',
        port: '3000',
        strictPort: true,
        open: true,
        proxy: {
          '/api': {
            target: 'http://localhost:80/api',
            changeOrigin: true,
            ws: true,
            rewrite: (path: any) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  } else {
    return {
      plugins: [
        react(),
        viteTsconfigPaths(),
        checker({
          typescript: true,
        }),
      ],
    }
  }
})