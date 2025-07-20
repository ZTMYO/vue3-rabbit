<template>
  <div class="layout-container">
    <nav class="navbar">
      <!-- 导航链接：跳转到首页 -->
      <RouterLink to="/">首页</RouterLink>
      
      <!-- 导航链接：跳转到分类页 -->
      <RouterLink to="/category">分类</RouterLink>
      
      <!-- 导航链接：跳转到登录页 -->
      <RouterLink to="/login">登录</RouterLink>
    </nav>
    我是首页
    <!-- 二级路由出口 -->
    <RouterView />
  </div>
</template>

<script>
    export default {
        
    }
</script>

