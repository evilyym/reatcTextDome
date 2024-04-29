import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path'


const buildConfig = {
  outDir: 'dist/msupervision_wap',
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
  base: "/msupervision_wap",
  build: { ...buildConfig},
  plugins: [vue(),
    Components({
      resolvers: [
        VantResolver(),
        NutUIResolver(),
      ,],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      "/msupervision_wap/api": {
        target: "https://dev-zjnu-vvr.goliveplus.cn/vvr_api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/msupervision_wap\/api/, ""),
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
