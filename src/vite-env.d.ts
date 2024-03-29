/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-05 10:29:04
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
