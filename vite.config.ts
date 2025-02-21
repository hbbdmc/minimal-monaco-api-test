import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'
// import { optimizeDeps } from 'vite/dist/node'

// https://vite.dev/config/
export default defineConfig({
  worker: {
    format: 'es'
  },
  plugins: [vue()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps:{
    esbuildOptions: {
      plugins: [importMetaUrlPlugin]
    },
    include:['vscode-textmate', 'vscode-oniguruma']
  }
})
