/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 09:43:44
 */
import path from 'path'; //这个path用到了上面安装的@types/node

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/

export default ({ mode }) => {
  const fileName = loadEnv(mode, process.cwd()).VITE_NODE_ENV == 'staging' ? 'testdist' : 'dist';

  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASE,
    plugins: [
      legacy({
        targets: ['defaults', 'ie>=11', 'chrome 57'],  //需要兼容的目标列表，可以设置多个
        // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // renderLegacyChunks: true,
        // polyfills: [
        //   'es.symbol',
        //   'es.array.filter',
        //   'es.promise',
        //   'es.promise.finally',
        //   'es/map',
        //   'es/set',
        //   'es.array.for-each',
        //   'es.object.define-properties',
        //   'es.object.define-property',
        //   'es.object.get-own-property-descriptor',
        //   'es.object.get-own-property-descriptors',
        //   'es.object.keys',
        //   'es.object.to-string',
        //   'web.dom-collections.for-each',
        //   'esnext.global-this',
        //   'esnext.string.match-all'
        // ]
      }),
      react(),
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
    build: {
      outDir: fileName + loadEnv(mode, process.cwd()).VITE_BASE, //process.env.VITE_BASE,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd'],
          },
        },
      },
    },
    // define: { 'process.env': {} },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: false,
      hmr: true,
      proxy: {
        '/api': {
          target: 'https://dev-charging-pile-car.goliveplus.cn',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
        '/sapi': {
          target: 'https://dev-saas-api.goliveplus.cn',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/sapi/, ''),
        },
      },
    },
  });
};
