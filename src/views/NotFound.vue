<!-- src/views/NotFound.vue -->

<template>
  <div class="not-found-page">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在！</p>
    <router-link to="/" class="home-link">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #333;
}

.not-found-page h1 {
  font-size: 6rem;
  margin-bottom: 20px;
}

.not-found-page p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.home-link {
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
}

.home-link:hover {
  background-color: #36a275;
}
</style>
