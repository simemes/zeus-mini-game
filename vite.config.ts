import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
// import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    // obfuscatorPlugin({
    //   include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
    //   exclude: [/node_modules/],
    //   apply: "build",
    //   debugger: true,
    //   options: {
    //     debugProtection: true,
    //   },
    // }),
  ],
  base: './',
  server: {
    host: '127.0.0.1',
    allowedHosts: ['2635-203-121-229-38.ngrok-free.app'],
    // port: 3000,
    open: true // 啟動後自動開瀏覽器
  }
})
