<template>
  <div class="not-found-page flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <!-- 图标和标题 -->
    <div class="text-center mb-6">
      <i class="fas fa-exclamation-triangle text-yellow-500 text-6xl mb-4"></i>
      <h1 class="text-7xl font-bold text-gray-800">404</h1>
      <p class="text-xl mt-4">抱歉，您访问的页面不存在！</p>
    </div>

    <!-- 返回首页按钮 -->
    <router-link to="/" class="home-link px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
      <i class="fas fa-home mr-2"></i> 返回首页
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
