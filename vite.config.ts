import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import NutUIResolver from '@nutui/nutui/dist/resolver'
// import VitePluginCss from ''
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        VantResolver(),
        NutUIResolver(),
      //   VitePluginCss({
      //   postcss: true, // 确保启用了PostCSS
      // })
      ,],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-zjnu-vvr.goliveplus.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`
      }
    }
  }
})
