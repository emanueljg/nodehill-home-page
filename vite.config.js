import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig({
  css: {
    // show source maps for sass/scss in browser
    devSourcemap: true
  },
  plugins: [
    react(),
    // listen to changes in markdown and hot reload
    {
      name: 'custom-hmr',
      enforce: 'post',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.md')) {
          console.log('  ➜  markdown change, hot reload');
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      },
    }
  ],
});
