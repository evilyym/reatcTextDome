declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}

declare module "*.ts" {
  import type { DefineComponent } from "ts";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}
