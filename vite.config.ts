import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'
import { VantResolver } from '@vant/auto-import-resolver';


const buildConfig = {
  outDir: 'dist/activitysupport_wap',
  terserOptions: {
    compress: {
      drop_console: true, // 生产环境移除console
      drop_debugger: true // 生产环境移除debugger
    }
  },
  rollupOptions: {
    output: {
      manualChunks: {
      }
    }
  }
}

export default defineConfig({
  base: "/activitysupport_wap",
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
      "/activitysupport_wap/api": {
        target: "https://dev-zjnu-vvr.goliveplus.cn/vvr_api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/activitysupport_wap\/api/, ""),
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
