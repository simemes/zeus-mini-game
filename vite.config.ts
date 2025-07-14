import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
import javascriptObfuscator from 'javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    // 使用 javascript-obfuscator'
    {
      name: 'obfuscator',
      generateBundle(_options, bundle) {
        for (const fileName of Object.keys(bundle)) {
          if (fileName.endsWith('.js')) {
            const chunk = bundle[fileName]
            if (chunk.type === 'chunk') {
              const obfuscated = javascriptObfuscator.obfuscate(chunk.code, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                stringArray: true,
                stringArrayThreshold: 1,
                renameGlobals: true,
                // debugProtection: true,
              })
              chunk.code = obfuscated.getObfuscatedCode()
            }
          }
        }
      }
    }
  ],
  base: './',
  server: {
    host: '127.0.0.1',
    allowedHosts: ['2635-203-121-229-38.ngrok-free.app'],
    // port: 3000,
    open: true // 啟動後自動開瀏覽器
  }
})
