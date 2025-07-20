<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView />
  <div class="test">
    test scss
  </div>
</template>
<style scoped lang="scss">
  .test{
    color: $priceColor;
  }
</style>