import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import NutUIResolver from '@nutui/nutui/dist/resolver'
// import VitePluginCss from ''
// https://vitejs.dev/config/

const buildConfig = {
  outDir: 'dist/vvr_wap',
  terserOptions: {
    compress: {
      drop_console: true, // 生产环境移除console
      drop_debugger: true // 生产环境移除debugger
    }
  },
  rollupOptions: {
    output: {
      manualChunks: {
        // echarts: ['echarts']
      }
    }
  }
}

export default defineConfig({
  base: "/vvr_wap/",
  build: { ...buildConfig},
  plugins: [vue(),
    Components({
      resolvers: [
        VantResolver(),
        NutUIResolver(),
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
