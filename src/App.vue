<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import 'vant/es/toast/style'; //4.8 版本bug 按需引入对此组件失效

import { ref, provide, watch } from "vue";

const $active = ref(parseInt(sessionStorage.getItem('$active')) || 0);

provide('$active', $active)

watch($active, (val) => {
  sessionStorage.setItem('$active', val)
})

</script>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  background-color: #fff;
  color-scheme: unset;
  font-size: 14px;
  height: 100%;
}

.blue {
  color: #1677FF;
}

.green {
  color: #24B25F;
}

.red {
  color: #FF3333;
}

.van-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
