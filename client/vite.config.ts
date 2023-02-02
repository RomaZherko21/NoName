import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig(({ command, mode, ssrBuild }): any => {
  if (command === 'serve') {
    // dev
    return {
      plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
      server: {
        // watch: {
        //   usePolling: true,
        // },
        // host: '0.0.0.0',
        host: 'localhost',
        port: '3000',
        strictPort: true,
        open: true,
        proxy: {
          '/api': {
            target: 'http://localhost:80/api',
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  } else {
    // build
    return {}
  }
})
